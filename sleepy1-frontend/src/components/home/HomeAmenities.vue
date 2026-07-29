<script setup lang="ts">
import { amenities } from '@/data/amenities'
import SectionHeading from '@/components/common/SectionHeading.vue'
import AmenityItem from '@/components/common/AmenityItem.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const revealTargets = amenities.map((_, i) => useScrollReveal(0.15, (i % 6) * 60))
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page">
      <SectionHeading eyebrow="Designed For Technological Serenity" title="Every pod, fully equipped" description="We've combined premium hospitality materials with smart technology to build a resting space that feels like the future of rest." align="center" class="mx-auto" />
      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(amenity, i) in amenities" :key="amenity.id" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }">
          <AmenityItem :amenity="amenity" />
        </div>
      </div>
    </div>
  </section>
</template>
