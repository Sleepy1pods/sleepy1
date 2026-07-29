<script setup lang="ts">
import { bookingExtras } from '@/data/bookings'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const flow = useBookingFlowStore()

const iconPaths: Record<string, string> = {
  pillow: 'M4 12a8 4 0 1116 0 8 4 0 01-16 0z',
  blanket: 'M3 4h18v16H3V4zM3 10h18M9 10v10',
  eyemask: 'M2 10c2-3 6-4 10-4s8 1 10 4c-2 3-6 4-10 4s-8-1-10-4z',
  coffee: 'M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 9h1a3 3 0 010 6h-1M6 2v2M10 2v2M14 2v2',
  locker: 'M4 4h16v16H4V4zM12 4v16M8 10h.01M16 10h.01',
  shower: 'M4 12h16M6 12V7a4 4 0 018 0v1M8 16v2m4-2v2m4-2v2',
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-ivory-50">Add optional extras</h2>
    <p class="mt-1 text-sm text-ivory-100/55">Enhance your stay — skip this step if you don't need anything extra.</p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <button
        v-for="extra in bookingExtras"
        :key="extra.id"
        type="button"
        class="card-surface flex items-start gap-3 p-5 text-left transition-colors"
        :class="flow.draft.extraIds.includes(extra.id) ? 'border-brand-400 ring-2 ring-brand-400/30' : ''"
        :aria-pressed="flow.draft.extraIds.includes(extra.id)"
        @click="flow.toggleExtra(extra.id)"
      >
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-brand-300">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path :d="iconPaths[extra.icon] ?? ''" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        <div class="flex-1">
          <div class="flex items-center justify-between gap-2">
            <p class="text-sm font-semibold text-ivory-50">{{ extra.label }}</p>
            <span
              class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
              :class="flow.draft.extraIds.includes(extra.id) ? 'border-brand-400 bg-brand-400 text-ink-950' : 'border-white/20'"
            >
              <svg v-if="flow.draft.extraIds.includes(extra.id)" class="h-3 w-3" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </div>
          <p class="mt-1 text-xs text-ivory-100/50">{{ extra.description }}</p>
          <p class="mt-2 text-sm font-medium text-brand-300">₹{{ extra.price }}</p>
        </div>
      </button>
    </div>

    <div class="mt-10 flex justify-between">
      <SecondaryButton @click="flow.previousStep()">← Back</SecondaryButton>
      <PrimaryButton @click="flow.nextStep()">Continue →</PrimaryButton>
    </div>
  </div>
</template>
