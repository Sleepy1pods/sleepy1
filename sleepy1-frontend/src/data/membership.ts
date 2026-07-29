import type { MembershipTier } from '@/types/user'

/** Mock membership tiers — benefits are illustrative program design, not confirmed pricing. */
export const membershipTiers: MembershipTier[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    minLifetimeCredits: 0,
    monthlyPriceLabel: 'Free',
    benefits: [
      'Pay-as-you-go booking access',
      'Standard booking window (30 days)',
      'Email support',
    ],
    bonusCreditPercent: 0,
    priorityBooking: false,
    maxBookingHours: 4,
    color: 'slate',
  },
  {
    id: 'traveller',
    name: 'Traveller',
    minLifetimeCredits: 2000,
    monthlyPriceLabel: '₹0 · earned by usage',
    benefits: [
      '5% bonus credits on every purchase',
      'Extended booking duration up to 6 hours',
      'Priority customer support',
    ],
    bonusCreditPercent: 5,
    priorityBooking: false,
    maxBookingHours: 6,
    color: 'brand',
  },
  {
    id: 'frequent-traveller',
    name: 'Frequent Traveller',
    minLifetimeCredits: 6000,
    monthlyPriceLabel: '₹0 · earned by usage',
    benefits: [
      '10% bonus credits on every purchase',
      'Priority pod booking during peak hours',
      'Booking duration up to 8 hours',
      'Complimentary locker add-on',
    ],
    bonusCreditPercent: 10,
    priorityBooking: true,
    maxBookingHours: 8,
    color: 'lavender',
  },
  {
    id: 'elite',
    name: 'Elite',
    minLifetimeCredits: 15000,
    monthlyPriceLabel: 'Invite-based',
    benefits: [
      '15% bonus credits on every purchase',
      'Guaranteed priority booking, even at full availability',
      'Corporate lounge access where available',
      'Dedicated premium support line',
      'Exclusive seasonal discounts',
    ],
    bonusCreditPercent: 15,
    priorityBooking: true,
    maxBookingHours: 8,
    color: 'gold',
  },
]

export function getTierById(id: string): MembershipTier | undefined {
  return membershipTiers.find((t) => t.id === id)
}

export function getTierForLifetimeCredits(lifetimeCredits: number): MembershipTier {
  const eligible = [...membershipTiers].reverse().find((t) => lifetimeCredits >= t.minLifetimeCredits)
  return eligible ?? membershipTiers[0]
}
