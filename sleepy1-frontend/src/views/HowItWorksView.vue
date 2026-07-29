<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import AmenityItem from '@/components/common/AmenityItem.vue'
import DreamBackground from '@/components/atmosphere/DreamBackground.vue'
import { getAmenitiesByIds } from '@/data/amenities'

usePageMeta({
  title: 'How It Works',
  description: 'A full walkthrough of the Sleepy1 booking journey — from choosing a pod to smart check-in, in-pod extras, and checkout.',
})

const journey = [
  { title: '1. Choose Location & Pod', description: 'Search by city or airport, compare pod types (Solo Rest, Solo Unwind, Twin Lounge, Premium Suite), and see live pricing.' },
  { title: '2. Pick Your Schedule', description: 'Select a date, check-in time, and duration from 1–8 hours, with live mock availability for each slot.' },
  { title: '3. Add Extras', description: 'Optionally add a pillow, blanket, eye mask, coffee voucher, locker, or shower access to your stay.' },
  { title: '4. Guest Details', description: 'Enter your contact and emergency information — used only for check-in and safety purposes.' },
  { title: '5. Review & Pay', description: 'Apply a coupon, review your itemised price, and pay by simulated direct payment, Sleepy1 Credits, or a mix of both.' },
  { title: '6. Smart Check-in', description: 'Scan your booking QR code at the pod access panel — the pod unlocks automatically for your reserved window.' },
  { title: '7. Manage Anytime', description: 'View, reschedule, or cancel any upcoming booking from My Bookings, and download invoices for past stays.' },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden section-pad">
      <div class="absolute inset-0 z-0">
        <DreamBackground tone="depth" density="medium" />
      </div>
      <div class="container-page relative z-10 text-center">
        <SectionHeading level="h1" eyebrow="How It Works" title="The full Sleepy1 booking journey" align="center" class="mx-auto" description="From search to check-in, every step is designed to take seconds, not minutes." />
      </div>
    </section>

    <section class="pb-20">
      <div class="container-page mx-auto max-w-2xl space-y-6">
        <div v-for="step in journey" :key="step.title" class="card-surface p-6">
          <h3 class="font-semibold text-ivory-50">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <section class="section-pad bg-ink-900/40">
      <div class="container-page">
        <SectionHeading eyebrow="Smart Check-in" title="No desks. No keys. No waiting." align="center" class="mx-auto" />
        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <AmenityItem v-for="a in getAmenitiesByIds(['lock', 'display', 'housekeeping'])" :key="a.id" :amenity="a" />
        </div>
      </div>
    </section>

    <section class="py-20 text-center">
      <PrimaryButton as="RouterLink" to="/book" size="lg">Start Your Booking →</PrimaryButton>
    </section>
  </div>
</template>
