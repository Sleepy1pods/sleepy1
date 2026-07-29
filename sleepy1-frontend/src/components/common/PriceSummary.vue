<script setup lang="ts">
import { formatInr } from '@/utils/format'

defineProps<{
  basePrice: number
  extrasTotal: number
  serviceFee: number
  taxes: number
  couponDiscount?: number
  couponCode?: string | null
  creditsApplied?: number
  totalPayable: number
}>()
</script>

<template>
  <div class="card-surface p-6">
    <h3 class="text-sm font-semibold uppercase tracking-wide text-ivory-100/50">Price Summary</h3>
    <dl class="mt-4 space-y-3 text-sm">
      <div class="flex justify-between"><dt class="text-ivory-100/60">Base price</dt><dd class="text-ivory-50">{{ formatInr(basePrice) }}</dd></div>
      <div v-if="extrasTotal > 0" class="flex justify-between"><dt class="text-ivory-100/60">Extras</dt><dd class="text-ivory-50">{{ formatInr(extrasTotal) }}</dd></div>
      <div class="flex justify-between"><dt class="text-ivory-100/60">Service fee</dt><dd class="text-ivory-50">{{ formatInr(serviceFee) }}</dd></div>
      <div class="flex justify-between"><dt class="text-ivory-100/60">Taxes</dt><dd class="text-ivory-50">{{ formatInr(taxes) }}</dd></div>
      <div v-if="couponDiscount" class="flex justify-between text-emerald-300">
        <dt>Coupon {{ couponCode ? `(${couponCode})` : '' }}</dt><dd>-{{ formatInr(couponDiscount) }}</dd>
      </div>
      <div v-if="creditsApplied" class="flex justify-between text-brand-300">
        <dt>Sleepy1 Credits applied</dt><dd>-{{ formatInr(creditsApplied) }}</dd>
      </div>
    </dl>
    <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
      <span class="text-base font-semibold text-ivory-50">Total payable</span>
      <span class="text-2xl font-semibold text-ivory-50">{{ formatInr(totalPayable) }}</span>
    </div>
  </div>
</template>
