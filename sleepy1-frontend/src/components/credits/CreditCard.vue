<script setup lang="ts">
import type { CreditPackage } from '@/types/user'
import { formatInr } from '@/utils/format'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const props = defineProps<{ pack: CreditPackage }>()
defineEmits<{ purchase: [] }>()

const gstAmount = Math.round(props.pack.priceInr * (props.pack.gstPercent / 100))
</script>

<template>
  <div class="card-surface relative flex flex-col p-6" :class="pack.badge ? 'ring-1 ring-brand-400/40' : ''">
    <span v-if="pack.badge" class="absolute -top-3 left-6 rounded-full bg-brand-400 px-3 py-1 text-xs font-semibold text-ink-950">
      {{ pack.badge }}
    </span>
    <p class="text-sm text-ivory-100/50">Credit Pack</p>
    <p class="mt-1 text-3xl font-semibold text-ivory-50">{{ pack.credits.toLocaleString('en-IN') }}</p>
    <p v-if="pack.bonusCredits" class="mt-1 text-sm font-medium text-emerald-300">+{{ pack.bonusCredits }} bonus credits</p>
    <div class="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-sm text-ivory-100/60">
      <div class="flex justify-between"><span>Price</span><span class="text-ivory-50">{{ formatInr(pack.priceInr) }}</span></div>
      <div class="flex justify-between"><span>GST ({{ pack.gstPercent }}%)</span><span class="text-ivory-50">{{ formatInr(gstAmount) }}</span></div>
    </div>
    <div class="mt-4 flex items-center justify-between">
      <span class="text-sm text-ivory-100/50">Total</span>
      <span class="text-xl font-semibold text-ivory-50">{{ formatInr(pack.priceInr + gstAmount) }}</span>
    </div>
    <PrimaryButton full-width class="mt-6" @click="$emit('purchase')">Purchase Credits</PrimaryButton>
  </div>
</template>
