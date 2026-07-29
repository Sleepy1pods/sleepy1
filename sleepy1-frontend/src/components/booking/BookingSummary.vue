<script setup lang="ts">
import { computed } from 'vue'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { formatDateLong } from '@/utils/format'
import PodVisual from '@/components/common/PodVisual.vue'

const flow = useBookingFlowStore()

const dateLabel = computed(() => (flow.draft.date ? formatDateLong(flow.draft.date) : 'Date not selected'))
</script>

<template>
  <div class="card-surface p-6">
    <h3 class="text-sm font-semibold uppercase tracking-wide text-ivory-100/50">Your Stay</h3>
    <div v-if="flow.selectedPod" class="mt-4 flex gap-4">
      <div class="h-20 w-24 shrink-0 overflow-hidden rounded-xl">
        <PodVisual :id="flow.selectedPod.image" class="h-full w-full" />
      </div>
      <div>
        <p class="font-semibold text-ivory-50">{{ flow.selectedPod.name }}</p>
        <p class="text-sm text-ivory-100/55">{{ flow.selectedLocation?.name ?? 'Location not selected' }}</p>
      </div>
    </div>
    <dl class="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
      <div class="flex justify-between"><dt class="text-ivory-100/60">Date</dt><dd class="text-ivory-50">{{ dateLabel }}</dd></div>
      <div class="flex justify-between"><dt class="text-ivory-100/60">Check-in</dt><dd class="text-ivory-50">{{ flow.draft.checkIn ?? '—' }}</dd></div>
      <div class="flex justify-between"><dt class="text-ivory-100/60">Duration</dt><dd class="text-ivory-50">{{ flow.draft.durationHours }} hour(s)</dd></div>
      <div v-if="flow.selectedExtras.length" class="flex justify-between">
        <dt class="text-ivory-100/60">Extras</dt>
        <dd class="text-right text-ivory-50">{{ flow.selectedExtras.map((e) => e.label).join(', ') }}</dd>
      </div>
    </dl>
  </div>
</template>
