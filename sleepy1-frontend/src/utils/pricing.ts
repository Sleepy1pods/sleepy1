import type { PriceBreakdown } from '@/types/booking'

const SERVICE_FEE = 49
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
