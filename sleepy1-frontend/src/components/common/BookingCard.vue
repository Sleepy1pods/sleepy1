<script setup lang="ts">
import { computed } from 'vue'
import type { Booking } from '@/types/booking'
import { formatDate } from '@/utils/format'
import PodVisual from './PodVisual.vue'
import StatusBadge from './StatusBadge.vue'
import SecondaryButton from './SecondaryButton.vue'

const props = defineProps<{ booking: Booking }>()
defineEmits<{ cancel: []; reschedule: []; invoice: []; emergency: [] }>()


const isPast = computed(() => props.booking.status === 'completed' || props.booking.status === 'cancelled')
</script>

<template>
  <article class="card-surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
    <div class="h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32">
      <PodVisual :id="booking.podImage" class="h-full w-full" />
    </div>
    <div class="flex-1">
      <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">{{ booking.podLabel }}</p>
      <h3 class="mt-1 text-base font-semibold text-ivory-50">{{ booking.locationName }}<span v-if="booking.terminal"> · {{ booking.terminal }}</span></h3>
      <p class="mt-1 text-sm text-ivory-100/55">{{ formatDate(booking.date) }} · {{ booking.checkIn }} · {{ booking.durationHours === 0.5 ? '30m' : booking.durationHours + 'h' }} stay</p>
      <p class="mt-1 text-xs text-ivory-100/40">Ref: {{ booking.reference }}</p>
      <div class="mt-3"><StatusBadge :status="booking.status" /></div>
    </div>
    <div class="flex shrink-0 flex-col gap-2 sm:w-40">
      <SecondaryButton as="RouterLink" :to="`/bookings/${booking.id}`" size="sm">View Details</SecondaryButton>
      <SecondaryButton v-if="isPast" size="sm" @click="$emit('invoice')">Invoice</SecondaryButton>
      <template v-else>
        <SecondaryButton size="sm" @click="$emit('reschedule')">Reschedule</SecondaryButton>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 py-1.5 px-3 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 active:scale-95 transition-all"
          @click="$emit('emergency')"
        >
          <svg class="h-3.5 w-3.5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Emergency Call
        </button>
        <button type="button" class="min-h-[30px] text-xs font-medium text-rose-300/80 hover:text-rose-200" @click="$emit('cancel')">
          Cancel Booking
        </button>
      </template>
    </div>
  </article>
</template>
