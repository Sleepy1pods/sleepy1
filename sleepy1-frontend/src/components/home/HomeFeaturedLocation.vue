<script setup lang="ts">
import { getFeaturedLocations } from '@/data/locations'
import { getAmenitiesByIds } from '@/data/amenities'
import HubVisual from '@/components/common/HubVisual.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

const location = getFeaturedLocations()[0]
const amenities = getAmenitiesByIds(location.amenityIds).slice(0, 4)
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <div class="grid overflow-hidden rounded-3xl border border-white/10 shadow-premium lg:grid-cols-2">
        <div class="relative h-72 lg:h-auto">
          <HubVisual :hub-type="location.hubType" :id="location.heroImage" class="h-full w-full" rounded="rounded-none" />
          <span class="absolute left-5 top-5 rounded-full bg-ink-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-300 backdrop-blur">
            Flagship Location
          </span>
        </div>
        <div class="flex flex-col justify-center bg-ink-800/60 p-8 sm:p-12">
          <StatusBadge :status="location.availability" />
          <h3 class="mt-4 text-2xl font-semibold text-ivory-50 sm:text-3xl">{{ location.name }}</h3>
          <p class="mt-3 max-w-md text-sm leading-relaxed text-ivory-100/65">{{ location.description }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="a in amenities" :key="a.id" class="rounded-full bg-white/5 px-3 py-1.5 text-xs text-ivory-100/60">{{ a.label }}</span>
          </div>
          <div class="mt-6 flex items-center gap-6 border-t border-white/10 pt-6">
            <div>
              <p class="text-2xl font-semibold text-ivory-50">{{ location.availablePods }}/{{ location.podCount }}</p>
              <p class="text-xs text-ivory-100/45">Pods available</p>
            </div>
            <div>
              <p class="text-2xl font-semibold text-ivory-50">₹{{ location.startingPricePerHour }}</p>
              <p class="text-xs text-ivory-100/45">Starting per hour</p>
            </div>
          </div>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton as="RouterLink" :to="`/book?location=${location.slug}`">Book This Pod</PrimaryButton>
            <SecondaryButton as="RouterLink" :to="`/locations/${location.slug}`">View Details</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
