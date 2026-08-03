import { mockBookings, bookingExtras, generateTimeSlots } from '@/data/bookings'
import type { Booking, BookingDraft, TimeSlot } from '@/types/booking'
import { getLocationBySlug } from '@/data/locations'
import { getPodTypeById } from '@/data/pods'
import { delay } from '@/utils/delay'
import { formatDate, generateBookingReference } from '@/utils/format'
import { calculatePricing } from '@/utils/pricing'
import { creditService } from '@/services/creditService'

let sessionBookings: Booking[] = [...mockBookings]

export const bookingService = {
  async getExtras() {
    return delay(bookingExtras)
  },

  async getAvailability(_locationId: string, _date: string): Promise<TimeSlot[]> {
    return delay(generateTimeSlots(), 300)
  },

  async getMyBookings(): Promise<Booking[]> {
    return delay([...sessionBookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
  },

  async getById(id: string): Promise<Booking | undefined> {
    return delay(sessionBookings.find((b) => b.id === id || b.reference === id))
  },

  async createFromDraft(draft: BookingDraft): Promise<Booking> {
    const location = draft.locationId ? getLocationBySlug(draft.locationId) : undefined
    const podType = draft.podTypeId ? getPodTypeById(draft.podTypeId) : undefined

    const basePrice = (podType?.pricePerHour ?? 499) * draft.durationHours
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
