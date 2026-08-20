<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLocationsStore } from '@/stores/locations'
import { usePageMeta } from '@/composables/usePageMeta'
import { locationEnvironments } from '@/data/environments'
import SectionHeading from '@/components/common/SectionHeading.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import FilterChips from '@/components/common/FilterChips.vue'
import LocationCard from '@/components/common/LocationCard.vue'
import LocationMap from '@/components/common/LocationMap.vue'
import LocationEnvironmentCard from '@/components/common/LocationEnvironmentCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import { useRouter } from 'vue-router'

usePageMeta({
  title: 'Locations',
  description: 'Find Sleepy1 private rest pods across universities, corporate parks, hospitals, and railway stations nationwide. Search by city, browse the map, and book instantly.',
})

const store = useLocationsStore()
const router = useRouter()

onMounted(() => store.fetchAll())

function handleMapSelect(slug: string) {
  router.push(`/locations/${slug}`)
}

const availableLocations = computed(() => store.filtered)
</script>

<template>
  <div>
    <div class="container-page pb-16 pt-16">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        :model-value="store.searchQuery"
        placeholder="Search by location or city..."
        class="w-full sm:max-w-lg"
        @update:model-value="store.setSearchQuery($event)"
      />
      <FilterChips :options="store.cities" :model-value="store.selectedCity" @update:model-value="store.setCity($event)" />
    </div>

    <div class="mt-10">
      <LoadingSkeleton v-if="store.isLoading && store.all.length === 0" :count="1" variant="card" />
      <LocationMap v-else :locations="store.filtered" height="380px" @select="handleMapSelect" />
    </div>

    <div class="mt-10">
      <LoadingSkeleton v-if="store.isLoading && store.all.length === 0" :count="6" />
      <EmptyState
        v-else-if="store.filtered.length === 0"
        title="No locations match your search"
        description="Try a different city or clear your filters to see all Sleepy1 locations."
        action-label="Clear Filters"
        @action="store.clearFilters()"
      />
      <template v-else>
        <section v-if="availableLocations.length > 0">
          <h2 class="text-lg font-semibold text-ivory-50">Locations</h2>
          <p class="mt-1 text-sm text-ivory-100/55">Sleepy1 pod locations across universities, corporate parks, hospitals, and railway stations.</p>
          <div 
            class="mt-8 gap-6"
            :class="availableLocations.length === 1 ? 'flex justify-center' : 'grid sm:grid-cols-2 lg:grid-cols-3'"
          >
            <div 
              v-for="loc in availableLocations" 
              :key="loc.id"
              :class="{ 'w-full max-w-[26rem]': availableLocations.length === 1 }"
            >
              <LocationCard :location="loc" class="h-full w-full" />
            </div>
          </div>
        </section>
      </template>
    </div>

    <section class="mt-20">
      <SectionHeading eyebrow="Building the Network" title="Environments where Sleepy1 can operate" />
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <LocationEnvironmentCard v-for="env in locationEnvironments" :key="env.id" :environment="env" />
      </div>
    </section>

    <section class="card-surface mt-16 flex flex-col items-center gap-4 p-8 text-center sm:p-12">
      <h2 class="text-xl font-semibold text-ivory-50 sm:text-2xl">Don't see Sleepy1 near you yet?</h2>
      <p class="max-w-lg text-sm text-ivory-100/60">
        Sleepy1 is working to expand into more high-footfall locations. Tell us where you'd like to see a pod next,
        or let us know if you manage a space that could host one.
      </p>
      <div class="mt-2 flex flex-col gap-3 sm:flex-row">
        <PrimaryButton as="RouterLink" to="/contact">Request Sleepy1 in Your Area</PrimaryButton>
        <SecondaryButton as="RouterLink" to="/corporate">Host a Sleepy1 Location</SecondaryButton>
      </div>
    </section>
    </div>
  </div>
</template>
