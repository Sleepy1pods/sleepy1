<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const steps = [
  {
    title: 'Choose a pod',
    description: 'Pick a location, date, and how long you need.',
    icon: 'M12 21c-4.5-3-8-6.5-8-11a8 8 0 0116 0c0 4.5-3.5 8-8 11z M12 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  },
  {
    title: 'Scan to enter',
    description: 'Show your QR code at the door. No desk, no keys.',
    icon: 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm12 0h1v1m3 0h1v6h-6v-1m0-4h4',
  },
  {
    title: 'Rest, then go',
    description: 'The pod locks behind you and checks you out automatically.',
    icon: 'M4.5 4v16M4.5 4h11l-2.5 4 2.5 4h-11',
  },
]

const revealTargets = steps.map((_, i) => useScrollReveal(0.15, i * 100))
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Booking Guide" title="Three steps to rest" align="center" class="mx-auto" />
      <div class="mt-14 grid gap-10 md:grid-cols-3">
        <div v-for="(step, i) in steps" :key="step.title" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }" class="text-center">
          <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10">
            <svg class="h-6 w-6 text-brand-300" viewBox="0 0 24 24" fill="none"><path :d="step.icon" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <p class="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-ivory-100/40">Step {{ i + 1 }}</p>
          <h3 class="mt-2 text-lg font-semibold text-ivory-50">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ step.description }}</p>
        </div>
      </div>
      <div class="mt-14 flex justify-center">
        <PrimaryButton as="RouterLink" to="/how-it-works" size="lg">See the full guide</PrimaryButton>
      </div>
    </div>
  </section>
</template>
