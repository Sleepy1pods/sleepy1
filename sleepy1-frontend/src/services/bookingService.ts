import { mockBookings, bookingExtras, generateTimeSlots } from '@/data/bookings'
import type { Booking, BookingDraft, TimeSlot } from '@/types/booking'
import { getLocationBySlug } from '@/data/locations'
import { getPodTypeById } from '@/data/pods'
import { delay } from '@/utils/delay'
import { formatDate, generateBookingReference } from '@/utils/format'
import { calculatePricing, getPodPriceForLocation } from '@/utils/pricing'
import { creditService } from '@/services/creditService'

let sessionBookings: Booking[] = []

function loadSessionBookings() {
  try {
    const stored = localStorage.getItem('sleepy1_session_bookings')
    if (stored) {
      sessionBookings = JSON.parse(stored)
    } else {
      sessionBookings = [...mockBookings]
      saveSessionBookings()
    }
  } catch (e) {
    sessionBookings = [...mockBookings]
  }
}

function saveSessionBookings() {
  try {
    localStorage.setItem('sleepy1_session_bookings', JSON.stringify(sessionBookings))
  } catch (e) {
    console.error('Failed to save bookings to localStorage', e)
  }
}

loadSessionBookings()
export const bookingService = {
  async getExtras() {
    return delay(bookingExtras)
  },

  async getBookedSlots(date: string): Promise<string[]> {
    loadSessionBookings() // Ensure fresh data from localStorage
    return sessionBookings
      .filter(b => b.date === date && b.status !== 'cancelled')
      .map(b => b.checkIn)
  },

  async getAvailability(_locationId: string, date: string): Promise<TimeSlot[]> {
    const baseSlots = generateTimeSlots()
    const bookedTimes = await this.getBookedSlots(date)
    
    const today = new Date()
    const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
    const isToday = date === todayStr

    return baseSlots.map((slot) => {
      let isPast = false
      if (isToday) {
        const [hours, minutes] = slot.time.split(':').map(Number)
        const slotTime = new Date()
        slotTime.setHours(hours, minutes, 0, 0)
        isPast = slotTime <= today
      }
      return {
        ...slot,
        available: slot.available && !bookedTimes.includes(slot.time) && !isPast,
      }
    })
  },

  async getMyBookings(): Promise<Booking[]> {
    return sessionBookings
  },

  async getById(id: string): Promise<Booking | undefined> {
    return sessionBookings.find(b => b.id === id)
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

    try {
      const formatAmPm = (timeStr: string) => {
        if (!timeStr) return ''
        const [h, m] = timeStr.split(':').map(Number)
        const period = h >= 12 ? 'PM' : 'AM'
        const h12 = h % 12 || 12
        return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`
      }

      const payload = {
        access_key: '72e47201-4ef5-45f9-a7f8-6fb82f2f3c53',
        subject: 'New Pod Booking Request (Multi-Step Flow)',
        reference: booking.reference,
        location: booking.locationName,
        podType: booking.podLabel,
        checkInDate: booking.date,
        checkInTime: formatAmPm(booking.checkIn),
        durationHours: booking.durationHours,
        guestName: booking.guest.fullName,
        guestEmail: booking.guest.email,
        guestPhone: booking.guest.phone,
        totalPayable: booking.price.totalPayable,
        paymentMethod: booking.paymentMethod
      }

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    } catch (e) {
      console.error('Error submitting to Web3Forms:', e)
    }

    sessionBookings = [booking, ...sessionBookings]
    saveSessionBookings()
    return delay(booking, 500)
  },

  addMockBooking(date: string, checkIn: string) {
    sessionBookings.push({
      id: `mock-${Date.now()}`,
      reference: 'MOCK',
      locationId: 'mock',
      locationName: 'Mock',
      podTypeId: 'mock',
      podLabel: 'Mock',
      podImage: '',
      date,
      checkIn,
      durationHours: 0.5,
      extras: [],
      guest: { fullName: '', email: '', phone: '', specialRequests: '', emergencyContactName: '', emergencyContactPhone: '' },
      price: { basePrice: 0, extrasTotal: 0, serviceFee: 0, taxes: 0, discount: 0, creditsApplied: 0, couponDiscount: 0, totalPayable: 0 },
      paymentMethod: 'direct',
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      qrValue: ''
    })
    saveSessionBookings()
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
    saveSessionBookings()
    return delay(sessionBookings.find((b) => b.id === id))
  },

  async reschedule(id: string, date: string, checkIn: string): Promise<Booking | undefined> {
    sessionBookings = sessionBookings.map((b) => (b.id === id ? { ...b, date, checkIn, status: 'upcoming' } : b))
    saveSessionBookings()
    return delay(sessionBookings.find((b) => b.id === id))
  },
}
