<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { useLocationsStore } from '@/stores/locations'
import { getFeaturedLocations } from '@/data/locations'
import SearchInput from '@/components/common/SearchInput.vue'
import FilterChips from '@/components/common/FilterChips.vue'
import HubVisual from '@/components/common/HubVisual.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const flow = useBookingFlowStore()
const store = useLocationsStore()

onMounted(() => store.fetchAll())

const featured = getFeaturedLocations()

const results = computed(() => (store.searchQuery || store.selectedCity !== 'All' ? store.filtered : featured))

function select(slug: string) {
  flow.setLocation(slug)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-ivory-50">Choose your location</h2>
    <p class="mt-1 text-sm text-ivory-100/55">Search by city or pick from our most popular hubs.</p>

    <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
      <SearchInput :model-value="store.searchQuery" placeholder="Search by location or city..." class="sm:max-w-xs" @update:model-value="store.setSearchQuery($event)" />
      <FilterChips :options="store.cities" :model-value="store.selectedCity" @update:model-value="store.setCity($event)" />
    </div>

    <EmptyState v-if="results.length === 0" title="No locations found" description="Try a different city." class="mt-8" />
    <div v-else class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <button
        v-for="loc in results"
        :key="loc.id"
        type="button"
        class="card-surface flex flex-col overflow-hidden text-left transition-all"
        :class="flow.draft.locationId === loc.slug ? 'border-brand-400 ring-2 ring-brand-400/40' : ''"
        :aria-pressed="flow.draft.locationId === loc.slug"
        @click="select(loc.slug)"
      >
        <div class="relative h-28">
          <img v-if="loc.heroImage.startsWith('/')" :src="loc.heroImage" class="h-full w-full object-cover" alt="Location hero image" />
          <HubVisual v-else :hub-type="loc.hubType" :id="loc.heroImage" class="h-full w-full" rounded="rounded-none" />
          <div class="absolute left-2 top-2"><StatusBadge :status="loc.availability" /></div>
        </div>
        <div class="p-4">
          <p class="text-sm font-semibold text-ivory-50">{{ loc.name }}</p>
          <p class="mt-0.5 text-xs text-ivory-100/50">{{ loc.city }} · From ₹{{ loc.startingPricePerHour }}/hr</p>
        </div>
      </button>
    </div>

    <div class="mt-10 flex justify-end">
      <PrimaryButton :disabled="!flow.draft.locationId" @click="flow.nextStep()">Continue →</PrimaryButton>
    </div>
  </div>
</template>
