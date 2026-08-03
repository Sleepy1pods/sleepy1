import type { OfferPromo } from '@/types/common'

export const offers: OfferPromo[] = [
  { id: 'o1', code: 'FIRSTSLEEP', title: 'First Booking Offer', description: '20% off your first Sleepy1 pod booking, any location.', discountLabel: '20% OFF', validTill: '2026-12-31', segment: 'new-user' },
  { id: 'o2', code: 'ELITE10', title: 'Elite Member Discount', description: 'Elite members save an extra 10% on Premium Suite pods.', discountLabel: '10% OFF', validTill: '2026-12-31', segment: 'membership' },
  { id: 'o3', code: 'CORPSTAY', title: 'Corporate Travel Bundle', description: 'Bulk credit packs for teams booking 10+ stays a month.', discountLabel: 'Custom pricing', validTill: '2026-12-31', segment: 'corporate' },
  { id: 'o4', code: 'MONSOON50', title: 'Monsoon Rest Special', description: '₹50 flat off bookings during the monsoon season.', discountLabel: '₹50 OFF', validTill: '2026-09-30', segment: 'seasonal' },
]
