<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import AmenityItem from '@/components/common/AmenityItem.vue'
import BookingJourneyExperience from '@/components/how-it-works/BookingJourneyExperience.vue'
import { getAmenitiesByIds } from '@/data/amenities'

usePageMeta({
  title: 'How It Works',
  description: 'A full walkthrough of the Sleepy1 booking journey — from choosing a pod to smart check-in, in-pod extras, and checkout.',
})
</script>

<template>
  <div>
    <section class="section-pad">
      <div class="container-page text-center">
        <SectionHeading level="h1" eyebrow="How It Works" title="The full Sleepy1 booking journey" align="center" class="mx-auto" description="From search to check-in, every step is designed to take seconds, not minutes." />
      </div>
    </section>

    <!-- Concept 2: 5-Node Horizontal Interactive Booking Journey -->
    <BookingJourneyExperience />

    <section class="section-pad bg-ink-900/40">
      <div class="container-page">
        <SectionHeading eyebrow="Smart Check-in" title="No desks. No keys. No waiting." align="center" class="mx-auto" />
        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <AmenityItem v-for="a in getAmenitiesByIds(['lock', 'display', 'housekeeping'])" :key="a.id" :amenity="a" />
        </div>
      </div>
    </section>

    <section class="py-20 text-center">
      <PrimaryButton as="RouterLink" to="/quick-book" size="lg">Start Your Booking →</PrimaryButton>
    </section>
  </div>
</template>
