<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { useCreditsStore } from '@/stores/credits'
import { useUiStore } from '@/stores/ui'
import type { PaymentMethod } from '@/types/booking'
import { formatInr, formatDateLong } from '@/utils/format'
import PriceSummary from '@/components/common/PriceSummary.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import HubVisual from '@/components/common/HubVisual.vue'

const flow = useBookingFlowStore()
const credits = useCreditsStore()
const ui = useUiStore()

const isPaying = ref(false)
const couponInput = ref(flow.draft.couponCode ?? '')

onMounted(() => credits.fetchWallet())

const walletBalance = computed(() => credits.wallet?.balance ?? 0)
const balanceAfterRedemption = computed(() => walletBalance.value - flow.draft.creditsToApply)

const methods: { id: PaymentMethod; label: string; description: string }[] = [
  { id: 'direct', label: 'Direct Payment', description: 'Simulated card / UPI payment — instant confirmation.' },
  { id: 'credits', label: 'Sleepy1 Credits', description: 'Pay fully using your wallet balance.' },
  { id: 'hybrid', label: 'Credits + Payment', description: 'Apply available credits, pay remaining balance directly.' },
]

function selectMethod(method: PaymentMethod) {
  flow.setPaymentMethod(method)
  if (method === 'direct') flow.setCreditsToApply(0)
  if (method === 'credits') flow.setCreditsToApply(walletBalance.value)
  if (method === 'hybrid' && flow.draft.creditsToApply === 0) {
    flow.setCreditsToApply(Math.min(walletBalance.value, Math.round(flow.pricing.totalPayable / 2)))
  }
}

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

function removeCoupon() {
  couponInput.value = ''
  flow.setCoupon(null)
  ui.pushToast({ type: 'info', title: 'Coupon removed', description: 'Promo discount has been removed.' })
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
    <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
      <div>
        <h2 class="text-2xl font-semibold text-ivory-50">3. Review & Complete Booking</h2>
        <p class="mt-1 text-sm text-ivory-100/55">Double-check your pod reservation and complete simulated checkout.</p>
      </div>
    </div>

    <div class="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <!-- Left Column: Order Summary + Coupon + Payment Methods -->
      <div class="space-y-6">
        <!-- Booking Overview Card with Jump Links -->
        <div class="card-surface overflow-hidden">
          <div class="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-4">
            <span class="text-sm font-semibold uppercase tracking-wide text-brand-300">Booking Summary</span>
            <button type="button" class="text-xs font-semibold text-ivory-100/60 hover:text-ivory-50" @click="flow.goToStep('select')">
              Edit Pod & Time ✎
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center gap-4">
              <div class="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <HubVisual
                  :hub-type="flow.selectedLocation?.hubType || 'airport'"
                  :id="flow.selectedLocation?.heroImage || 'airport-terminal-1'"
                  class="h-full w-full"
                  rounded="rounded-xl"
                />
              </div>
              <div>
                <p class="text-base font-semibold text-ivory-50">{{ flow.selectedLocation?.name || 'Delhi International Airport' }}</p>
                <p class="text-xs text-ivory-100/60">{{ flow.selectedLocation?.terminal || 'Terminal 3' }} · {{ flow.selectedLocation?.city || 'New Delhi' }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 rounded-xl bg-white/[0.03] p-4 text-xs">
              <div>
                <span class="block text-ivory-100/50">Pod Type</span>
                <span class="mt-0.5 block font-semibold text-ivory-50">{{ flow.selectedPod?.name || 'Solo Rest Pod' }}</span>
              </div>
              <div>
                <span class="block text-ivory-100/50">Check-in Date</span>
                <span class="mt-0.5 block font-semibold text-ivory-50">{{ flow.draft.date ? formatDateLong(flow.draft.date) : 'Today' }}</span>
              </div>
              <div>
                <span class="block text-ivory-100/50">Check-in Time</span>
                <span class="mt-0.5 block font-semibold text-ivory-50">{{ flow.draft.checkIn || '14:00' }}</span>
              </div>
              <div>
                <span class="block text-ivory-100/50">Duration</span>
                <span class="mt-0.5 block font-semibold text-ivory-50">{{ flow.draft.durationHours }} hour{{ flow.draft.durationHours > 1 ? 's' : '' }}</span>
              </div>
            </div>

            <div class="border-t border-white/10 pt-4 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-ivory-100/50">Guest & Extras</span>
                <button type="button" class="text-xs font-semibold text-ivory-100/60 hover:text-ivory-50" @click="flow.goToStep('customize')">
                  Edit Details ✎
                </button>
              </div>
              <div class="mt-2 text-ivory-50">
                <p class="font-medium">{{ flow.draft.guest?.fullName || 'Guest' }} ({{ flow.draft.guest?.email || 'No email' }})</p>
                <p class="mt-1 text-ivory-100/60">
                  Phone: {{ flow.draft.guest?.phone || 'N/A' }} ·
                  <span class="text-brand-300">
                    {{ flow.selectedExtras.length }} optional extra{{ flow.selectedExtras.length === 1 ? '' : 's' }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Coupon Card -->
        <div class="card-surface p-6">
          <label for="coupon" class="mb-2 block text-sm font-medium text-ivory-100/70">Have a Promo Coupon?</label>
          <div class="flex gap-2">
            <input
              id="coupon"
              v-model="couponInput"
              type="text"
              placeholder="Try 'FIRSTSLEEP' for 20% off"
              class="min-h-[44px] flex-1 rounded-xl border border-white/10 bg-ink-800/60 px-4 py-2.5 text-ivory-50 uppercase placeholder:normal-case placeholder:text-ivory-100/30 focus:border-brand-400"
            />
            <SecondaryButton v-if="!flow.draft.couponCode" type="button" @click="applyCoupon">Apply</SecondaryButton>
            <SecondaryButton v-else type="button" class="border-red-400/50 text-red-300" @click="removeCoupon">Remove</SecondaryButton>
          </div>
          <p v-if="flow.draft.couponCode" class="mt-2 text-xs font-semibold text-emerald-400">
            ✓ Code {{ flow.draft.couponCode }} applied — 20% discount included!
          </p>
        </div>

        <!-- Payment Methods Card -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-ivory-100/70">Select Payment Mode</p>
          <button
            v-for="method in methods"
            :key="method.id"
            type="button"
            class="card-surface flex w-full items-start gap-3.5 p-4 text-left transition-all hover:border-white/25"
            :class="flow.draft.paymentMethod === method.id ? 'border-brand-400 ring-2 ring-brand-400/30 bg-brand-950/20' : ''"
            :aria-pressed="flow.draft.paymentMethod === method.id"
            @click="selectMethod(method.id)"
          >
            <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border mt-0.5" :class="flow.draft.paymentMethod === method.id ? 'border-brand-400 bg-brand-400' : 'border-white/25'">
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
              Credits to apply: <span class="font-bold text-brand-300">{{ flow.draft.creditsToApply.toLocaleString('en-IN') }}</span>
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
      </div>

      <!-- Right Column: Price Summary + Instant Book Action -->
      <div class="space-y-6">
        <div class="sticky top-24">
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

          <div class="mt-6">
            <PrimaryButton
              size="lg"
              full-width
              :loading="isPaying"
              class="h-14 text-base font-bold shadow-premium"
              @click="payNow"
            >
              Confirm & Book Pod ({{ formatInr(flow.pricing.totalPayable) }}) →
            </PrimaryButton>
            <p class="mt-3 text-center text-xs text-ivory-100/50">
              🔒 Simulated checkout for demonstration · Instant QR access
            </p>
          </div>

          <div class="mt-6 flex justify-between border-t border-white/10 pt-4">
            <SecondaryButton size="sm" @click="flow.previousStep()">← Back to Guest Details</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
