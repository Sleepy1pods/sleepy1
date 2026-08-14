<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodFeatureAnatomy from '@/components/pod/PodFeatureAnatomy.vue'
import PodInteriorViews from '@/components/pod/PodInteriorViews.vue'

usePageMeta({
  title: 'The Sleep Pod — Features & 360° View',
  description: 'Explore the Sleepy1 sleep pod — star ceiling, entertainment capabilities, smart control, climate control, and modular mobility.',
})
</script>

<template>
  <div>
    <!-- Essential Features Anatomy -->
    <PodFeatureAnatomy id="all-amenities" />

    <!-- 360-Degree View Section (Interior & Exterior) -->
    <PodInteriorViews />

    <!-- Hero Section -->
    <section class="py-20 sm:py-28">
      <div class="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="eyebrow mb-4">The Sleep Pod</p>
          <h1 class="text-balance text-4xl font-semibold text-ivory-50 sm:text-5xl">Engineered for real rest, wherever you are.</h1>
          <p class="mt-5 max-w-lg text-lg leading-relaxed text-ivory-100/65">
            Every Sleepy1 pod combines essential smart features, hospitality-grade hygiene, and modular mobility — built purely around one thing: genuine, uninterrupted rest.
          </p>
          <PrimaryButton as="RouterLink" to="/quick-book" size="lg" class="mt-8">Book a Pod →</PrimaryButton>
        </div>
        <div class="overflow-hidden rounded-3xl shadow-premium">
          <img src="/pod4.png" alt="Pod Interior" class="aspect-[4/3] w-full object-cover rounded-3xl" />
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
   
  </div>
</template>
