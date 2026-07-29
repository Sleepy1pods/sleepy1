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
import DreamBackground from '@/components/atmosphere/DreamBackground.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import { useRouter } from 'vue-router'

usePageMeta({
  title: 'Locations',
  description: 'Find Sleepy1 private rest pods across major Indian airports today, with planned expansion into stations and other high-footfall locations. Search, filter by city, and book instantly.',
})

const store = useLocationsStore()
const router = useRouter()

onMounted(() => store.fetchAll())

function handleMapSelect(slug: string) {
  router.push(`/locations/${slug}`)
}

const availableNow = computed(() => store.filtered.filter((loc) => loc.hubType === 'airport'))
const comingSoon = computed(() => store.filtered.filter((loc) => loc.hubType !== 'airport'))
</script>

<template>
  <div>
    <section class="relative overflow-hidden pb-4 pt-16">
      <div class="absolute inset-0 z-0">
        <DreamBackground tone="depth" density="medium" />
      </div>
      <div class="container-page relative z-10">
        <SectionHeading level="h1" eyebrow="Pod Locations" title="Sleepy1 Rest Pod Locations" description="Search by city or browse the map to find your nearest Sleepy1 pod. Availability updates in real time once connected to live inventory." />
      </div>
    </section>

    <div class="container-page pb-16">
    <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        :model-value="store.searchQuery"
        placeholder="Search by airport or city..."
        class="sm:max-w-sm"
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
        <section v-if="availableNow.length > 0">
          <h2 class="text-lg font-semibold text-ivory-50">Available Now</h2>
          <p class="mt-1 text-sm text-ivory-100/55">Live Sleepy1 pod clusters you can book today.</p>
          <div class="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LocationCard v-for="loc in availableNow" :key="loc.id" :location="loc" />
          </div>
        </section>

        <section v-if="comingSoon.length > 0" class="mt-14">
          <h2 class="text-lg font-semibold text-ivory-50">Coming Soon</h2>
          <p class="mt-1 text-sm text-ivory-100/55">Planned expansion locations — shown as illustrative preview content, not yet operational.</p>
          <div class="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LocationCard v-for="loc in comingSoon" :key="loc.id" :location="loc" />
          </div>
        </section>
      </template>
    </div>

    <section class="mt-20">
      <SectionHeading eyebrow="Building the Network" title="Environments where Sleepy1 can operate" description="Beyond airports, these are the kinds of high-footfall spaces Sleepy1 is designed to fit — some already confirmed, most still ahead of us." />
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
