export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  avatarInitials: string
  memberSince: string
  membershipTier: MembershipTierId
  role?: 'user' | 'admin'
}

export type MembershipTierId = 'explorer' | 'traveller' | 'frequent-traveller' | 'elite'

export interface MembershipTier {
  id: MembershipTierId
  name: string
  minLifetimeCredits: number
  monthlyPriceLabel: string
  benefits: string[]
  bonusCreditPercent: number
  priorityBooking: boolean
  maxBookingHours: number
  color: string
}

export interface CreditPackage {
  id: string
  credits: number
  bonusCredits: number
  priceInr: number
  gstPercent: number
  badge?: string
}

export type CreditTransactionType = 'purchased' | 'redeemed' | 'expired' | 'refunded' | 'promotional'

export interface CreditTransaction {
  id: string
  type: CreditTransactionType
  amount: number
  description: string
  date: string
  bookingRef?: string
}

export interface CreditWallet {
  balance: number
  lifetimePurchased: number
  lifetimeRedeemed: number
  expiringCredits: number
  expiryDate: string
  transactions: CreditTransaction[]
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterPayload {
  fullName: string
  email: string
  phone: string
  password: string
}
