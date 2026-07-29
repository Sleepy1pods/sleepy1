<script setup lang="ts">
import type { MembershipTier } from '@/types/user'

const props = withDefaults(defineProps<{ tier: MembershipTier; current?: boolean }>(), { current: false })

const toneClasses: Record<string, string> = {
  slate: 'from-ink-700 to-ink-800',
  brand: 'from-brand-700 to-brand-900',
  lavender: 'from-lavender-500/60 to-brand-800',
  gold: 'from-amber-500/50 to-ink-800',
}
</script>

<template>
  <div
    class="relative flex flex-col rounded-3xl border p-7 shadow-soft"
    :class="current ? 'border-brand-400 ring-2 ring-brand-400/40' : 'border-white/10'"
  >
    <div :class="['absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br opacity-40', toneClasses[props.tier.color] ?? toneClasses.slate]" />
    <span v-if="current" class="w-fit rounded-full bg-brand-400 px-3 py-1 text-xs font-semibold text-ink-950">Your Tier</span>
    <h3 class="mt-3 text-2xl font-semibold text-ivory-50">{{ tier.name }}</h3>
    <p class="mt-1 text-sm text-ivory-100/60">{{ tier.monthlyPriceLabel }}</p>
    <p class="mt-4 text-xs uppercase tracking-wide text-ivory-100/40">
      Unlocked at {{ tier.minLifetimeCredits.toLocaleString('en-IN') }}+ lifetime credits
    </p>
    <ul class="mt-5 flex-1 space-y-3">
      <li v-for="benefit in tier.benefits" :key="benefit" class="flex items-start gap-2 text-sm text-ivory-100/75">
        <svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-300" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
        {{ benefit }}
      </li>
    </ul>
    <div class="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-center">
      <div>
        <p class="text-lg font-semibold text-ivory-50">{{ tier.bonusCreditPercent }}%</p>
        <p class="text-xs text-ivory-100/40">Bonus Credits</p>
      </div>
      <div>
        <p class="text-lg font-semibold text-ivory-50">{{ tier.maxBookingHours }}h</p>
        <p class="text-xs text-ivory-100/40">Max Duration</p>
      </div>
    </div>
  </div>
</template>
