<script setup lang="ts">
import { computed } from 'vue'
import type { Booking } from '@/types/booking'
import { formatDate } from '@/utils/format'
import PodVisual from './PodVisual.vue'
import StatusBadge from './StatusBadge.vue'
import SecondaryButton from './SecondaryButton.vue'

const props = defineProps<{ booking: Booking }>()
defineEmits<{ cancel: []; reschedule: []; invoice: [] }>()

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
      <p class="mt-1 text-sm text-ivory-100/55">{{ formatDate(booking.date) }} · {{ booking.checkIn }} · {{ booking.durationHours }}h stay</p>
      <p class="mt-1 text-xs text-ivory-100/40">Ref: {{ booking.reference }}</p>
      <div class="mt-3"><StatusBadge :status="booking.status" /></div>
    </div>
    <div class="flex shrink-0 flex-col gap-2 sm:w-40">
      <SecondaryButton as="RouterLink" :to="`/bookings/${booking.id}`" size="sm">View Details</SecondaryButton>
      <SecondaryButton v-if="isPast" size="sm" @click="$emit('invoice')">Invoice</SecondaryButton>
      <template v-else>
        <SecondaryButton size="sm" @click="$emit('reschedule')">Reschedule</SecondaryButton>
        <button type="button" class="min-h-[36px] text-xs font-semibold text-rose-300 hover:text-rose-200" @click="$emit('cancel')">
          Cancel Booking
        </button>
      </template>
    </div>
  </article>
</template>
