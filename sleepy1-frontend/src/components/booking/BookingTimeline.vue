<script setup lang="ts">
import { computed } from 'vue'
import type { BookingStatus } from '@/types/booking'

const props = defineProps<{ status: BookingStatus }>()

const steps = ['Booked', 'Confirmed', 'Checked In', 'Completed']

const activeIndex = computed(() => {
  switch (props.status) {
    case 'upcoming': return 1
    case 'active': return 2
    case 'completed': return 3
    default: return -1
  }
})
</script>

<template>
  <div>
    <div v-if="status === 'cancelled'" class="flex items-center gap-3 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-300">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
      This booking was cancelled.
    </div>
    <ol v-else class="flex items-center">
      <li v-for="(step, i) in steps" :key="step" class="flex flex-1 items-center last:flex-none">
        <div class="flex flex-col items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold"
            :class="i <= activeIndex ? 'border-brand-400 bg-brand-400 text-ink-950' : 'border-white/15 text-ivory-100/40'"
          >
            <svg v-if="i < activeIndex" class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="text-xs" :class="i <= activeIndex ? 'text-ivory-50' : 'text-ivory-100/40'">{{ step }}</span>
        </div>
        <div v-if="i < steps.length - 1" class="mx-2 h-px flex-1" :class="i < activeIndex ? 'bg-brand-400' : 'bg-white/10'" />
      </li>
    </ol>
  </div>
</template>
