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
  balance: 1240,
  lifetimePurchased: 3600,
  lifetimeRedeemed: 2360,
  expiringCredits: 250,
  expiryDate: '2026-10-31',
  transactions: [
    { id: 'tx1', type: 'purchased', amount: 500, description: '500 Credits Pack + 50 bonus', date: '2026-07-02', bookingRef: undefined },
    { id: 'tx2', type: 'redeemed', amount: -650, description: 'Redeemed for Pod 4 · Hubli Airport', date: '2026-06-20', bookingRef: 'SLPY-88213' },
    { id: 'tx3', type: 'promotional', amount: 100, description: 'Welcome bonus credits', date: '2026-05-14' },
    { id: 'tx4', type: 'redeemed', amount: -420, description: 'Redeemed for Pod 8 · BVB Campus Hubli', date: '2026-05-12', bookingRef: 'SLPY-77042' },
    { id: 'tx5', type: 'purchased', amount: 250, description: '250 Credits Pack + 15 bonus', date: '2026-04-02' },
    { id: 'tx6', type: 'refunded', amount: 180, description: 'Cancellation refund · IIIT Dharwad Research Park', date: '2026-03-22', bookingRef: 'SLPY-65590' },
  ],
}
