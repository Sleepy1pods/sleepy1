import { bookingExtras, generateTimeSlots } from '@/data/bookings'
import type { Booking, BookingDraft, TimeSlot } from '@/types/booking'
import { delay } from '@/utils/delay'

// No more local session mock logic
function calculateDurationHours(inDateStr: string, inTimeStr: string, outDateStr: string, outTimeStr: string): number {
  if (!inDateStr || !inTimeStr || !outDateStr || !outTimeStr) return 1;
  try {
    const parseAmPm = (timeStr: string, dateStr: string) => {
      let [h, m, period] = [0, 0, ''];
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (match) {
        h = parseInt(match[1]);
        m = parseInt(match[2]);
        period = match[3] ? match[3].toUpperCase() : '';
      } else {
        return new Date();
      }
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      
      const d = new Date(`${dateStr}T00:00:00`);
      d.setHours(h, m, 0, 0);
      return d;
    };
    const inDate = parseAmPm(inTimeStr, inDateStr);
    const outDate = parseAmPm(outTimeStr, outDateStr);
    const diff = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60);
    return diff > 0 ? diff : 1;
  } catch (e) {
    return 1;
  }
}

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
          durationHours: calculateDurationHours(dbB.checkInDate, dbB.checkInTime, dbB.checkOutDate, dbB.checkOutTime),
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
      durationHours: calculateDurationHours(dbBooking.checkInDate, dbBooking.checkInTime, dbBooking.checkOutDate, dbBooking.checkOutTime),
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

  addMockBooking(_date: string, _checkIn: string) {
    // Deprecated. Do nothing.
  },

  async cancel(_id: string): Promise<Booking | undefined> {
    // API logic for cancel goes here. For now, we mock it by returning undefined since we don't have a backend route for it yet.
    return undefined
  },

  async reschedule(_id: string, _date: string, _checkIn: string): Promise<Booking | undefined> {
    // API logic for reschedule goes here.
    return undefined
  },
}
