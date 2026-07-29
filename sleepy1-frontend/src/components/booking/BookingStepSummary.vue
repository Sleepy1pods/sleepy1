<script setup lang="ts">
import { ref } from 'vue'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { useUiStore } from '@/stores/ui'
import BookingSummary from '@/components/booking/BookingSummary.vue'
import PriceSummary from '@/components/common/PriceSummary.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const flow = useBookingFlowStore()
const ui = useUiStore()
const couponInput = ref(flow.draft.couponCode ?? '')

function applyCoupon() {
  const code = couponInput.value.trim().toUpperCase()
  if (!code) {
    flow.setCoupon(null)
    return
  }
  if (code === 'FIRSTSLEEP') {
    flow.setCoupon(code)
    ui.pushToast({ type: 'success', title: 'Coupon applied', description: '20% off your booking.' })
  } else {
    ui.pushToast({ type: 'error', title: 'Invalid coupon', description: 'Try FIRSTSLEEP for 20% off your first booking.' })
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-ivory-50">Review your booking</h2>
    <p class="mt-1 text-sm text-ivory-100/55">Check everything looks right before you continue to payment.</p>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <BookingSummary />
      <div class="space-y-4">
        <div class="card-surface p-6">
          <label for="coupon" class="mb-2 block text-sm font-medium text-ivory-100/70">Have a coupon?</label>
          <div class="flex gap-2">
            <input
              id="coupon"
              v-model="couponInput"
              type="text"
              placeholder="e.g. FIRSTSLEEP"
              class="min-h-[44px] flex-1 rounded-xl border border-white/10 bg-ink-800/60 px-4 py-2.5 text-ivory-50 uppercase placeholder:normal-case placeholder:text-ivory-100/30 focus:border-brand-400"
            />
            <SecondaryButton type="button" @click="applyCoupon">Apply</SecondaryButton>
          </div>
        </div>
        <PriceSummary
          :base-price="flow.pricing.basePrice"
          :extras-total="flow.pricing.extrasTotal"
          :service-fee="flow.pricing.serviceFee"
          :taxes="flow.pricing.taxes"
          :coupon-discount="flow.pricing.couponDiscount"
          :coupon-code="flow.draft.couponCode"
          :total-payable="flow.pricing.totalPayable"
        />
      </div>
    </div>

    <div class="mt-10 flex justify-between">
      <SecondaryButton @click="flow.previousStep()">← Back</SecondaryButton>
      <PrimaryButton @click="flow.nextStep()">Continue to Payment →</PrimaryButton>
    </div>
  </div>
</template>
