<script setup lang="ts">
import { computed } from 'vue'
import type { PodTypeDefinition } from '@/types/pod'
import { getAmenitiesByIds } from '@/data/amenities'
import PodVisual from './PodVisual.vue'
import AmenityIcon from './AmenityIcon.vue'

const props = withDefaults(
  defineProps<{ pod: PodTypeDefinition; selected?: boolean }>(),
  { selected: false },
)

defineEmits<{ select: [] }>()

const amenityPreview = computed(() => getAmenitiesByIds(props.pod.amenityIds).slice(0, 4))
</script>

<template>
  <button
    type="button"
    class="card-surface group flex w-full flex-col overflow-hidden text-left transition-all duration-300 hover:-translate-y-1"
    :class="selected ? 'border-brand-400 ring-2 ring-brand-400/40' : ''"
    :aria-pressed="selected"
    @click="$emit('select')"
  >
    <div class="relative h-40 overflow-hidden">
      <PodVisual :id="pod.image" class="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      <span class="absolute right-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-xs font-semibold text-ivory-100 backdrop-blur">
        {{ pod.occupancy }} guest{{ pod.occupancy > 1 ? 's' : '' }}
      </span>
      <span v-if="selected" class="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-400 text-ink-950">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="text-lg font-semibold text-ivory-50">{{ pod.name }}</h3>
      <p class="mt-1 text-sm text-brand-300">{{ pod.tagline }}</p>
      <p class="mt-3 text-sm leading-relaxed text-ivory-100/60">{{ pod.description }}</p>
      <div class="mt-4 flex gap-2">
        <span v-for="a in amenityPreview" :key="a.id" class="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-ivory-100/60" :title="a.label" :aria-label="a.label">
          <AmenityIcon :icon="a.icon" size="h-4 w-4" />
        </span>
      </div>
      <div class="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
        <span class="text-sm text-ivory-100/50">Starting at</span>
        <span class="text-xl font-semibold text-ivory-50">₹{{ pod.pricePerHour }}<span class="text-sm font-normal text-ivory-100/50">/hr</span></span>
      </div>
    </div>
  </button>
</template>
