<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getFeaturedLocations, locations } from '@/data/locations'
import SectionHeading from '@/components/common/SectionHeading.vue'
import LocationCard from '@/components/common/LocationCard.vue'
import LocationMap from '@/components/common/LocationMap.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import HeroCarousel from '@/components/common/HeroCarousel.vue'

const featured = getFeaturedLocations()
const router = useRouter()

function handleSelect(slug: string) {
  router.push(`/locations/${slug}`)
}
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Pod Locations" title="Find Sleepy1 near your gate" description="Currently live across major Indian airports, with railway and metro hubs expanding soon." />
        <SecondaryButton as="RouterLink" to="/locations" class="w-fit shrink-0">View All Locations →</SecondaryButton>
      </div>

      <div class="mt-10">
        <HeroCarousel :slides="locations" />
      </div>

      <div class="mt-8">
        <LocationMap :locations="locations" height="360px" @select="handleSelect" />
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <LocationCard v-for="loc in featured" :key="loc.id" :location="loc" />
      </div>
    </div>
  </section>
</template>
