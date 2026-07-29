<script setup lang="ts">
import { testimonials } from '@/data/testimonials'
import SectionHeading from '@/components/common/SectionHeading.vue'
import TestimonialCard from '@/components/common/TestimonialCard.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const featured = testimonials.slice(0, 3)
const revealTargets = featured.map((_, i) => useScrollReveal(0.15, i * 100))
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page">
      <SectionHeading eyebrow="Traveller Stories" title="Rest, trusted by frequent flyers" align="center" class="mx-auto" />
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(t, i) in featured" :key="t.id" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }">
          <TestimonialCard :testimonial="t" />
        </div>
      </div>
    </div>
  </section>
</template>
