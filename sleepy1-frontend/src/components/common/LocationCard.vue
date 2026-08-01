<script setup lang="ts">
import { computed } from 'vue'
import type { Location } from '@/types/location'
import { getAmenitiesByIds } from '@/data/amenities'
import HubVisual from './HubVisual.vue'
import StatusBadge from './StatusBadge.vue'
import PrimaryButton from './PrimaryButton.vue'
import SecondaryButton from './SecondaryButton.vue'

const props = defineProps<{ location: Location }>()

const previewAmenities = computed(() => getAmenitiesByIds(props.location.amenityIds).slice(0, 3))
const mapUrl = computed(() => {
  const { lat, lng } = props.location.geo
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
})
</script>

<template>
  <article class="card-surface group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
    <div class="relative h-44 overflow-hidden">
      <HubVisual :hub-type="location.hubType" :id="location.heroImage" class="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      <div class="absolute left-3 top-3">
        <StatusBadge :status="location.availability" />
      </div>
      <span v-if="location.isDemoData" class="absolute right-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ivory-100/70 backdrop-blur">
        Demo Data
      </span>
    </div>
    <div class="flex flex-1 flex-col p-6">
      <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">{{ location.city }} · {{ location.hubType.replace('-', ' ') }}</p>
      <h3 class="mt-1.5 text-lg font-semibold text-ivory-50">{{ location.name }}</h3>
      <p v-if="location.terminal" class="mt-0.5 text-sm text-ivory-100/50">{{ location.terminal }}</p>

      <div class="mt-4 flex items-center gap-4 text-sm text-ivory-100/60">
        <span>{{ location.availablePods }}/{{ location.podCount }} pods free</span>
        <span aria-hidden="true">·</span>
        <span>From ₹{{ location.startingPricePerHour }}/hr</span>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="amenity in previewAmenities"
          :key="amenity.id"
          class="rounded-full bg-white/5 px-2.5 py-1 text-xs text-ivory-100/60"
        >
          {{ amenity.label }}
        </span>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-3">
        <SecondaryButton as="RouterLink" :to="`/locations/${location.slug}`" size="sm" class="justify-center">
          View Details
        </SecondaryButton>
        <SecondaryButton as="a" :href="mapUrl" size="sm" class="justify-center">
          View Location
        </SecondaryButton>
        <PrimaryButton as="RouterLink" :to="`/book?location=${location.slug}`" size="sm" class="col-span-2 justify-center">
          Book Now
        </PrimaryButton>
      </div>
    </div>
  </article>
</template>
