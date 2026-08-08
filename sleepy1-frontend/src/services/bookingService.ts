import { mockBookings, bookingExtras, generateTimeSlots } from '@/data/bookings'
import type { Booking, BookingDraft, TimeSlot } from '@/types/booking'
import { getLocationBySlug } from '@/data/locations'
import { getPodTypeById } from '@/data/pods'
import { delay } from '@/utils/delay'
import { formatDate, generateBookingReference } from '@/utils/format'
import { calculatePricing, getPodPriceForLocation } from '@/utils/pricing'
import { creditService } from '@/services/creditService'

let sessionBookings: Booking[] = [...mockBookings]

export const bookingService = {
  async getExtras() {
    return delay(bookingExtras)
  },

  async getBookedSlots(date: string): Promise<string[]> {
    try {
      const res = await fetch(`https://sleepy1-backend.onrender.com/api/bookings/availability?date=${date}`)
      if (!res.ok) throw new Error('Failed to fetch availability')
      const json = await res.json()
      return json.data || []
    } catch (e) {
      console.error('Error fetching availability:', e)
      return []
    }
  },

  async getAvailability(_locationId: string, date: string): Promise<TimeSlot[]> {
    const baseSlots = generateTimeSlots()
    const bookedTimes = await this.getBookedSlots(date)
    return baseSlots.map((slot) => ({
      ...slot,
      available: slot.available && !bookedTimes.includes(slot.time),
    }))
  },

  async getMyBookings(): Promise<Booking[]> {
    try {
      const res = await fetch('https://sleepy1-backend.onrender.com/api/bookings', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if (!res.ok) throw new Error('Failed to fetch bookings')
      const json = await res.json()
      
      const backendBookings = json.data || []
      return backendBookings.map((b: any) => ({
        id: b._id,
        reference: b._id.substring(b._id.length - 8).toUpperCase(),
        locationId: 'iit-dharwad',
        locationName: 'IIIT Dharwad',
        terminal: '',
        podTypeId: 'pod-solo-rest',
        podLabel: 'Standard Pod',
        podImage: 'pod-interior-1',
        date: b.checkInDate,
        checkIn: b.checkInTime,
        checkOutDate: b.checkOutDate,
        checkOutTime: b.checkOutTime,
        durationHours: 0.5,
        extras: [],
        guest: {
          fullName: b.name,
          email: b.email,
          phone: b.phone,
          emergencyContactName: '',
          emergencyContactPhone: '',
          specialRequests: `Gender: ${b.gender}`
        },
        price: {
          basePrice: 500,
          extrasTotal: 0,
          serviceFee: 0,
          taxes: 0,
          discount: 0,
          creditsApplied: 0,
          couponDiscount: 0,
          totalPayable: 500
        },
        paymentMethod: 'direct',
        status: 'upcoming',
        createdAt: b.createdAt,
        qrValue: `SLEEPY1-${b._id}`
      }))
    } catch (e) {
      console.error('Error fetching bookings:', e)
      return []
    }
  },

  async getById(id: string): Promise<Booking | undefined> {
    try {
      const res = await fetch(`https://sleepy1-backend.onrender.com/api/bookings/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if (!res.ok) throw new Error('Booking not found')
      const json = await res.json()
      
      const b = json.data
      if (!b) return undefined

      return {
        id: b._id,
        reference: b._id.substring(b._id.length - 8).toUpperCase(),
        locationId: 'iit-dharwad',
        locationName: 'IIIT Dharwad',
        terminal: '',
        podTypeId: 'pod-solo-rest',
        podLabel: 'Standard Pod',
        podImage: 'pod-interior-1',
        date: b.checkInDate,
        checkIn: b.checkInTime,
        checkOutDate: b.checkOutDate,
        checkOutTime: b.checkOutTime,
        durationHours: 0.5,
        extras: [],
        guest: {
          fullName: b.name,
          email: b.email,
          phone: b.phone,
          emergencyContactName: '',
          emergencyContactPhone: '',
          specialRequests: `Gender: ${b.gender}`
        },
        price: {
          basePrice: 500,
          extrasTotal: 0,
          serviceFee: 0,
          taxes: 0,
          discount: 0,
          creditsApplied: 0,
          couponDiscount: 0,
          totalPayable: 500
        },
        paymentMethod: 'direct',
        status: 'upcoming',
        createdAt: b.createdAt,
        qrValue: `SLEEPY1-${b._id}`
      }
    } catch (e) {
      console.error('Error fetching booking by ID:', e)
      return undefined
    }
  },

  async createFromDraft(draft: BookingDraft): Promise<Booking> {
    const location = draft.locationId ? getLocationBySlug(draft.locationId) : undefined
    const podType = draft.podTypeId ? getPodTypeById(draft.podTypeId) : undefined

    const basePrice = getPodPriceForLocation(draft.podTypeId, draft.locationId) * draft.durationHours
    const extrasList = bookingExtras.filter((e) => draft.extraIds.includes(e.id))
    const extrasTotal = extrasList.reduce((sum, e) => sum + e.price, 0)
    const price = calculatePricing({
      basePrice,
      extrasTotal,
      couponCode: draft.couponCode,
      creditsToApply: draft.creditsToApply,
    })

    const booking: Booking = {
      id: `bk-${Date.now()}`,
      reference: generateBookingReference(),
      locationId: location?.id ?? 'loc-ndls',
      locationName: location?.name ?? 'New Delhi Railway Station',
      terminal: location?.terminal,
      podTypeId: podType?.id ?? 'pod-solo-rest',
      podLabel: `Pod ${Math.floor(Math.random() * 20) + 1}`,
      podImage: podType?.image ?? 'pod-interior-1',
      date: draft.date ?? formatDate(new Date().toISOString()),
      checkIn: draft.checkIn ?? '10:00',
      durationHours: draft.durationHours,
      extras: extrasList,
      guest: draft.guest ?? {
        fullName: '',
        email: '',
        phone: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        specialRequests: '',
      },
      price,
      paymentMethod: draft.paymentMethod,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      qrValue: `SLEEPY1-BOOKING-PENDING-${Date.now()}`,
    }
    booking.qrValue = `SLEEPY1-BOOKING-${booking.reference}`

    sessionBookings = [booking, ...sessionBookings]
    return delay(booking, 500)
  },

  async cancel(id: string): Promise<Booking | undefined> {
    const target = sessionBookings.find((b) => b.id === id)
    if (target && target.status !== 'cancelled' && target.price.creditsApplied > 0) {
      await creditService.refund(
        target.price.creditsApplied,
        `Refund for cancelled booking ${target.reference}`,
        target.reference,
      )
    }
    sessionBookings = sessionBookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    return delay(sessionBookings.find((b) => b.id === id))
  },

  async reschedule(id: string, date: string, checkIn: string): Promise<Booking | undefined> {
    sessionBookings = sessionBookings.map((b) => (b.id === id ? { ...b, date, checkIn, status: 'upcoming' } : b))
    return delay(sessionBookings.find((b) => b.id === id))
  },
}
