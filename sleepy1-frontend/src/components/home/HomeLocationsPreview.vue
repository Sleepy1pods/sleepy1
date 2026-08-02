<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getFeaturedLocations } from '@/data/locations'
import SectionHeading from '@/components/common/SectionHeading.vue'
import LocationCard from '@/components/common/LocationCard.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const featured = getFeaturedLocations().slice(0, 3)
const router = useRouter()

function handleSelect(slug: string) {
  router.push(`/locations/${slug}`)
}
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Pod Locations" title="Find Sleepy1 near you" description="Browse Sleepy1 locations including campuses, hospitals, railway stations, and corporate parks." />
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <LocationCard v-for="loc in featured" :key="loc.id" :location="loc" />
      </div>

      <div class="mt-10 flex justify-center">
        <SecondaryButton as="RouterLink" to="/locations" class="w-fit">View All Locations →</SecondaryButton>
      </div>
    </div>
  </section>
</template>
