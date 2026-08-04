<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { usePageMeta } from '@/composables/usePageMeta'
import BookingStepper from '@/components/booking/BookingStepper.vue'
import BookingStepSelect from '@/components/booking/BookingStepSelect.vue'
import BookingStepCustomize from '@/components/booking/BookingStepCustomize.vue'
import BookingStepCheckout from '@/components/booking/BookingStepCheckout.vue'
import BookingStepConfirmation from '@/components/booking/BookingStepConfirmation.vue'

usePageMeta({
  title: 'Book a Pod',
  description: 'Book a Sleepy1 private rest pod in minutes — choose your location, pod type, schedule, and pay with credits or simulated direct payment.',
})

const route = useRoute()
const flow = useBookingFlowStore()

const steps = [
  { key: 'select', label: 'Select Pod' },
  { key: 'customize', label: 'Guest & Extras' },
  { key: 'checkout', label: 'Payment' },
  { key: 'confirmation', label: 'Confirmed' },
]

const stepComponents = {
  select: BookingStepSelect,
  customize: BookingStepCustomize,
  checkout: BookingStepCheckout,
  confirmation: BookingStepConfirmation,
} as const

const activeComponent = computed(() => stepComponents[flow.currentStep])

onMounted(() => {
  // Only clear a prior draft once a booking has actually been confirmed — otherwise
  // navigating away mid-flow and back (e.g. via header nav) would silently wipe progress.
  if (flow.confirmedBooking) flow.reset()
})

watchEffect(() => {
  const locationSlug = route.query.location as string | undefined
  const podId = route.query.pod as string | undefined
  const hours = route.query.hours as string | undefined
  if (locationSlug) {
    flow.setLocation(locationSlug)
  } else if (!flow.draft.locationId) {
    flow.setLocation('iit-delhi')
  }
  if (podId) {
    flow.setPod(podId)
  } else if (!flow.draft.podTypeId) {
    flow.setPod('pod-solo-rest')
  }
  if (hours) {
    flow.draft.durationHours = Number(hours) || 2
  }
  if (!flow.draft.date) {
    flow.draft.date = new Date().toISOString().slice(0, 10)
  }
  if (!flow.draft.checkIn) {
    flow.draft.checkIn = '14:00'
  }
})
</script>

<template>
  <div class="container-page max-w-5xl py-14">
    <div v-if="flow.currentStep !== 'confirmation'" class="mb-10">
      <h1 class="text-2xl font-semibold text-ivory-50 sm:text-3xl">Book Your Sleepy1 Pod</h1>
      <p class="mt-1 text-sm text-ivory-100/55">A guided, hospitality-grade booking experience — all data shown is for demo purposes.</p>
      <div class="mt-6">
        <BookingStepper :steps="steps" :current-index="flow.currentStepIndex" @step-click="flow.currentStepIndex = $event" />
      </div>
    </div>

    <Transition name="step" mode="out-in">
      <component :is="activeComponent" :key="flow.currentStep" />
    </Transition>
  </div>
</template>

<style scoped>
.step-enter-active, .step-leave-active { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
.step-enter-from { opacity: 0; transform: translateX(16px); }
.step-leave-to { opacity: 0; transform: translateX(-16px); }
</style>
