import type { PriceBreakdown } from '@/types/booking'
import { getLocationBySlug } from '@/data/locations'

export function getPodPriceForLocation(podTypeId: string | null | undefined, locationSlug: string | null | undefined): number {
  const location = locationSlug ? getLocationBySlug(locationSlug) : undefined
  const basePrice = location?.startingPricePerHour ?? 0

  switch (podTypeId) {
    case 'pod-solo-work':
      return basePrice + 0
    case 'pod-twin-lounge':
      return basePrice + 0
    case 'pod-premium-suite':
      return basePrice + 0
    case 'pod-solo-rest':
    default:
      return basePrice
  }
}

const SERVICE_FEE = 0
const TAX_RATE = 0.12
const FIRST_BOOKING_COUPON = 'FIRSTSLEEP'
const FIRST_BOOKING_DISCOUNT_RATE = 0.2

/** Single source of truth for booking price math — used by both the live booking flow and the mock booking service, so a confirmed booking always matches what the customer saw at checkout. */
export function calculatePricing(input: {
  basePrice: number
  extrasTotal: number
  couponCode: string | null
  creditsToApply: number
}): PriceBreakdown {
  const { basePrice, extrasTotal, couponCode, creditsToApply } = input
  const taxable = basePrice + extrasTotal + SERVICE_FEE
  const taxes = Math.round(taxable * TAX_RATE)
  const couponDiscount = couponCode === FIRST_BOOKING_COUPON ? Math.round(basePrice * FIRST_BOOKING_DISCOUNT_RATE) : 0
  const payableBeforeCredits = Math.max(0, taxable + taxes - couponDiscount)
  const creditsApplied = Math.min(Math.max(0, creditsToApply), payableBeforeCredits)
  const totalPayable = Math.max(0, payableBeforeCredits - creditsApplied)

  return {
    basePrice,
    extrasTotal,
    serviceFee: SERVICE_FEE,
    taxes,
    discount: 0,
    couponCode: couponCode ?? undefined,
    couponDiscount,
    creditsApplied,
    totalPayable,
  }
}
