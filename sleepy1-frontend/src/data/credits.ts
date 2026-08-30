import type { CreditPackage, CreditWallet } from '@/types/user'

export const creditPackages: CreditPackage[] = [
  { id: 'pack-100', credits: 100, bonusCredits: 0, priceInr: 100, gstPercent: 18 },
  { id: 'pack-250', credits: 250, bonusCredits: 15, priceInr: 240, gstPercent: 18, badge: 'Popular' },
  { id: 'pack-500', credits: 500, bonusCredits: 50, priceInr: 460, gstPercent: 18, badge: 'Best Value' },
  { id: 'pack-1000', credits: 1000, bonusCredits: 150, priceInr: 899, gstPercent: 18, badge: 'Max Bonus' },
]

/** 1 credit ≈ ₹1 of booking value, for mock pricing-calculator purposes only. */
export const CREDIT_TO_INR = 1

export const mockWallet: CreditWallet = {
  balance: 0,
  lifetimePurchased: 0,
  lifetimeRedeemed: 0,
  expiringCredits: 0,
  expiryDate: '',
  transactions: [],
}
