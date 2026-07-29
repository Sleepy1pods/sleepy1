<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { useCreditsStore } from '@/stores/credits'
import { useUiStore } from '@/stores/ui'
import type { PaymentMethod } from '@/types/booking'
import { formatInr } from '@/utils/format'
import PriceSummary from '@/components/common/PriceSummary.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const flow = useBookingFlowStore()
const credits = useCreditsStore()
const ui = useUiStore()
const isPaying = ref(false)

onMounted(() => credits.fetchWallet())

const walletBalance = computed(() => credits.wallet?.balance ?? 0)
const balanceAfterRedemption = computed(() => walletBalance.value - flow.draft.creditsToApply)

const methods: { id: PaymentMethod; label: string; description: string }[] = [
  { id: 'direct', label: 'Direct Payment', description: 'Simulated card / UPI payment — no real transaction occurs.' },
  { id: 'credits', label: 'Sleepy1 Credits', description: 'Pay fully using your wallet balance.' },
  { id: 'hybrid', label: 'Credits + Payment', description: 'Apply available credits, pay the remaining balance directly.' },
]

function selectMethod(method: PaymentMethod) {
  flow.setPaymentMethod(method)
  if (method === 'direct') flow.setCreditsToApply(0)
  if (method === 'credits') flow.setCreditsToApply(walletBalance.value)
  if (method === 'hybrid' && flow.draft.creditsToApply === 0) {
    flow.setCreditsToApply(Math.min(walletBalance.value, Math.round(flow.pricing.totalPayable / 2)))
  }
}

async function payNow() {
  isPaying.value = true
  try {
    if (flow.draft.creditsToApply > 0) {
      await credits.redeemCredits(flow.draft.creditsToApply, `Redeemed for ${flow.selectedLocation?.name ?? 'Sleepy1 booking'}`)
    }
    await flow.confirmBooking()
    ui.pushToast({ type: 'success', title: 'Booking confirmed', description: 'Your pod is reserved. Simulated payment complete.' })
  } finally {
    isPaying.value = false
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-ivory-50">Payment</h2>
    <p class="mt-1 text-sm text-ivory-100/55">
      This is a simulated checkout for demo purposes. No real payment is processed.
    </p>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <button
          v-for="method in methods"
          :key="method.id"
          type="button"
          class="card-surface flex w-full items-start gap-3 p-5 text-left transition-colors"
          :class="flow.draft.paymentMethod === method.id ? 'border-brand-400 ring-2 ring-brand-400/30' : ''"
          :aria-pressed="flow.draft.paymentMethod === method.id"
          @click="selectMethod(method.id)"
        >
          <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border" :class="flow.draft.paymentMethod === method.id ? 'border-brand-400 bg-brand-400' : 'border-white/25'">
            <span v-if="flow.draft.paymentMethod === method.id" class="h-2 w-2 rounded-full bg-ink-950" />
          </span>
          <div>
            <p class="text-sm font-semibold text-ivory-50">{{ method.label }}</p>
            <p class="mt-0.5 text-xs text-ivory-100/50">{{ method.description }}</p>
          </div>
        </button>

        <div v-if="flow.draft.paymentMethod !== 'direct'" class="card-surface p-5">
          <div class="flex items-center justify-between text-sm">
            <span class="text-ivory-100/60">Wallet balance</span>
            <span class="font-semibold text-ivory-50">{{ walletBalance.toLocaleString('en-IN') }} credits</span>
          </div>
          <label for="credits-range" class="mb-2 mt-4 block text-sm font-medium text-ivory-100/70">
            Credits to apply: {{ flow.draft.creditsToApply.toLocaleString('en-IN') }}
          </label>
          <input
            id="credits-range"
            type="range"
            min="0"
            :max="walletBalance"
            step="10"
            :value="flow.draft.creditsToApply"
            class="w-full accent-brand-400"
            :disabled="flow.draft.paymentMethod === 'credits'"
            @input="flow.setCreditsToApply(Number(($event.target as HTMLInputElement).value))"
          />
          <p class="mt-3 text-xs text-ivory-100/50">
            Balance after redemption: <span class="font-medium text-ivory-100/80">{{ balanceAfterRedemption.toLocaleString('en-IN') }} credits</span>
          </p>
        </div>
      </div>

      <PriceSummary
        :base-price="flow.pricing.basePrice"
        :extras-total="flow.pricing.extrasTotal"
        :service-fee="flow.pricing.serviceFee"
        :taxes="flow.pricing.taxes"
        :coupon-discount="flow.pricing.couponDiscount"
        :coupon-code="flow.draft.couponCode"
        :credits-applied="flow.pricing.creditsApplied"
        :total-payable="flow.pricing.totalPayable"
      />
    </div>

    <div class="mt-10 flex justify-between">
      <SecondaryButton @click="flow.previousStep()">← Back</SecondaryButton>
      <PrimaryButton :loading="isPaying" @click="payNow">
        Pay {{ formatInr(flow.pricing.totalPayable) }} →
      </PrimaryButton>
    </div>
  </div>
</template>
