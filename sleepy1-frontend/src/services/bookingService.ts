import { mockBookings, bookingExtras, generateTimeSlots } from '@/data/bookings'
import type { Booking, BookingDraft, TimeSlot } from '@/types/booking'
import { getLocationBySlug } from '@/data/locations'
import { getPodTypeById } from '@/data/pods'
import { delay } from '@/utils/delay'
import { formatDate, generateBookingReference } from '@/utils/format'
import { calculatePricing, getPodPriceForLocation } from '@/utils/pricing'
import { creditService } from '@/services/creditService'

// No more local session mock logic

export const bookingService = {
  async getExtras() {
    return delay(bookingExtras)
  },

  async getBookedSlots(date: string): Promise<string[]> {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/availability?date=${date}`)
      if (!res.ok) return []
      const json = await res.json()
      return json.data || []
    } catch {
      return []
    }
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
    const token = localStorage.getItem('sleepy1_auth_token')
    if (!token) return []

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })

      if (!res.ok) {
        console.warn('Failed to fetch real bookings.')
        return []
      }

      const json = await res.json()
      const dbBookings = json.data || []
      
      const realBookings: Booking[] = dbBookings.map((dbB: any) => {
        const isPast = new Date(dbB.checkInDate) < new Date(new Date().toDateString())
        return {
          id: dbB._id,
          reference: `BK-${dbB._id.slice(-6).toUpperCase()}`,
          locationId: 'loc-iiit-dharwad',
          locationName: 'IIIT Dharwad Research Park',
          podTypeId: 'pod-solo-rest',
          podLabel: 'Pod 1',
          podImage: 'pod-interior-1',
          date: dbB.checkInDate,
          checkIn: dbB.checkInTime,
          checkOutDate: dbB.checkOutDate,
          checkOutTime: dbB.checkOutTime,
          durationHours: 1,
          extras: [],
          guest: {
            fullName: dbB.name,
            email: dbB.email,
            phone: dbB.phone,
            emergencyContactName: '',
            emergencyContactPhone: '',
            specialRequests: ''
          },
          price: {
            basePrice: 500,
            extrasTotal: 0,
            serviceFee: 50,
            taxes: 0,
            discount: 0,
            creditsApplied: 0,
            couponDiscount: 0,
            totalPayable: 550
          },
          paymentMethod: 'direct',
          status: isPast ? 'completed' : 'upcoming',
          createdAt: dbB.createdAt || new Date().toISOString(),
          qrValue: `SLEEPY1-BOOKING-${dbB._id}`
        }
      })
      
      return realBookings
    } catch (e) {
      console.error('Error fetching real bookings', e)
      return []
    }
  },

  async getById(id: string): Promise<Booking | undefined> {
    const bookings = await this.getMyBookings()
    return bookings.find(b => b.id === id)
  },

  async createFromDraft(draft: BookingDraft): Promise<Booking> {
    const token = localStorage.getItem('sleepy1_auth_token')
    if (!token) throw new Error('Must be logged in to book.')

    const payload = {
      name: draft.guest?.fullName || 'Guest',
      email: draft.guest?.email || 'guest@example.com',
      phone: draft.guest?.phone || '0000000000',
      checkInDate: draft.date,
      checkInTime: draft.checkIn,
      checkOutDate: draft.date,
      checkOutTime: draft.checkIn,
      gender: 'Not specified'
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Failed to create booking on backend')
    }
    
    const dbBooking = (await res.json()).data
    return {
      id: dbBooking._id,
      reference: `BK-${dbBooking._id.slice(-6).toUpperCase()}`,
      locationId: 'loc-iiit-dharwad',
      locationName: 'IIIT Dharwad Research Park',
      podTypeId: 'pod-solo-rest',
      podLabel: 'Pod 1',
      podImage: 'pod-interior-1',
      date: dbBooking.checkInDate,
      checkIn: dbBooking.checkInTime,
      checkOutDate: dbBooking.checkOutDate,
      checkOutTime: dbBooking.checkOutTime,
      durationHours: 1,
      extras: [],
      guest: draft.guest,
      price: {
        basePrice: 500, extrasTotal: 0, serviceFee: 50, taxes: 0, discount: 0, creditsApplied: 0, couponDiscount: 0, totalPayable: 550
      },
      paymentMethod: draft.paymentMethod,
      status: 'upcoming',
      createdAt: dbBooking.createdAt || new Date().toISOString(),
      qrValue: `SLEEPY1-BOOKING-${dbBooking._id}`
    } as Booking
  },

  addMockBooking(date: string, checkIn: string) {
    // Deprecated. Do nothing.
  },

  async cancel(id: string): Promise<Booking | undefined> {
    // API logic for cancel goes here. For now, we mock it by returning undefined since we don't have a backend route for it yet.
    return undefined
  },

  async reschedule(id: string, date: string, checkIn: string): Promise<Booking | undefined> {
    // API logic for reschedule goes here.
    return undefined
  },
}
