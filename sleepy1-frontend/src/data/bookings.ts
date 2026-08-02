import type { Booking, BookingExtra, TimeSlot } from '@/types/booking'

export const bookingExtras: BookingExtra[] = [
  { id: 'extra-pillow', label: 'Extra Pillow', description: 'A second memory-foam pillow for added support.', price: 49, icon: 'pillow' },
  { id: 'extra-blanket', label: 'Premium Blanket', description: 'Weighted, temperature-regulating blanket.', price: 79, icon: 'blanket' },
  { id: 'extra-eyemask', label: 'Eye Mask', description: 'Contoured blackout eye mask, yours to keep.', price: 39, icon: 'eyemask' },
  { id: 'extra-coffee', label: 'Coffee Voucher', description: 'Redeemable at any partnered café.', price: 99, icon: 'coffee' },
  { id: 'extra-locker', label: 'Locker Access', description: 'Secure locker for extra luggage during your stay.', price: 129, icon: 'locker' },
  { id: 'extra-shower', label: 'Shower Access', description: 'Private shower suite access, where available.', price: 199, icon: 'shower' },
]

export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = []
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const label = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      const available = !((hour === 13 && minute === 30) || (hour === 14 && minute === 0) || (hour === 22 && minute === 30))
      slots.push({ time: label, available })
    }
  }
  return slots
}

export const mockBookings: Booking[] = [
  {
    id: 'bk-1',
    reference: 'SLPY-91824',
    locationId: 'loc-ndls',
    locationName: 'New Delhi Railway Station',
    terminal: 'Passenger Terminal',
    podTypeId: 'pod-solo-rest',
    podLabel: 'Pod 4',
    podImage: 'pod-interior-1',
    date: '2026-08-14',
    checkIn: '10:00',
    durationHours: 2,
    extras: [bookingExtras[2]],
    guest: {
      fullName: 'Rupesh Kumar',
      email: 'enquiry_idrp@iiitdwd.ac.in',
      phone: '+91 98765 43210',
      emergencyContactName: 'Amit Kumar',
      emergencyContactPhone: '+91 91234 56789',
      specialRequests: '',
    },
    price: {
      basePrice: 998,
      extrasTotal: 39,
      serviceFee: 49,
      taxes: 168,
      discount: 0,
      creditsApplied: 0,
      couponDiscount: 0,
      totalPayable: 1254,
    },
    paymentMethod: 'direct',
    status: 'upcoming',
    createdAt: '2026-07-20T09:12:00+05:30',
    qrValue: 'SLEEPY1-BOOKING-SLPY-91824',
  },
  {
    id: 'bk-2',
    reference: 'SLPY-77042',
    locationId: 'loc-bvb-campus-hubli',
    locationName: 'BVB Campus Hubli',
    terminal: 'Campus Hub',
    podTypeId: 'pod-solo-work',
    podLabel: 'Pod 8',
    podImage: 'pod-desk-2',
    date: '2026-05-12',
    checkIn: '21:00',
    durationHours: 3,
    extras: [],
    guest: {
      fullName: 'Rupesh Kumar',
      email: 'enquiry_idrp@iiitdwd.ac.in',
      phone: '+91 98765 43210',
      emergencyContactName: 'Amit Kumar',
      emergencyContactPhone: '+91 91234 56789',
      specialRequests: 'Late check-in possible by 10 minutes.',
    },
    price: {
      basePrice: 1647,
      extrasTotal: 0,
      serviceFee: 49,
      taxes: 245,
      discount: 100,
      creditsApplied: 420,
      couponDiscount: 100,
      totalPayable: 1421,
    },
    paymentMethod: 'hybrid',
    status: 'completed',
    createdAt: '2026-05-01T18:40:00+05:30',
    qrValue: 'SLEEPY1-BOOKING-SLPY-77042',
  },
]
