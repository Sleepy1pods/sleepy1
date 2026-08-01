export type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled'

export interface BookingExtra {
  id: string
  label: string
  description: string
  price: number
  icon: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface GuestInfo {
  fullName: string
  email: string
  phone: string
  emergencyContactName: string
  emergencyContactPhone: string
  specialRequests: string
}

export type PaymentMethod = 'direct' | 'credits' | 'hybrid' | 'razorpay'

export interface PriceBreakdown {
  basePrice: number
  extrasTotal: number
  serviceFee: number
  taxes: number
  discount: number
  creditsApplied: number
  couponCode?: string
  couponDiscount: number
  totalPayable: number
}

export interface Booking {
  id: string
  reference: string
  locationId: string
  locationName: string
  terminal?: string
  podTypeId: string
  podLabel: string
  podImage: string
  date: string
  checkIn: string
  durationHours: number
  extras: BookingExtra[]
  guest: GuestInfo
  price: PriceBreakdown
  paymentMethod: PaymentMethod
  status: BookingStatus
  createdAt: string
  qrValue: string
}

export interface BookingDraft {
  locationId: string | null
  podTypeId: string | null
  date: string | null
  checkIn: string | null
  durationHours: number
  extraIds: string[]
  guest: GuestInfo | null
  couponCode: string | null
  paymentMethod: PaymentMethod
  creditsToApply: number
}
