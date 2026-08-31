<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const steps = [
  {
    stepNumber: '1',
    title: 'Choose a pod',
    description: 'Pick a location, date, and how long you need.',
    image: '/step1.jpeg',
    imageClass: 'object-center',
  },
  {
    stepNumber: '2',
    title: 'Scan to enter',
    description: 'Show your QR code at the door. No desk, no keys.',
    image: '/step2.jpeg',
    imageClass: 'object-center',
  },
  {
    stepNumber: '3',
    title: 'Rest, then go',
    description: 'The pod locks behind you and checks you out automatically.',
    image: '/step3.png',
    imageClass: 'object-[center_32%] brightness-105',
  },
]

const revealTargets = steps.map((_, i) => useScrollReveal(0.15, i * 100))
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Booking Guide" title="Three steps to rest" align="center" class="mx-auto" />
      
      <div class="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 xl:gap-16">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }"
          class="group flex flex-col items-center text-center"
        >
          <!-- Circular Image Container -->
          <div class="relative mx-auto aspect-square w-48 sm:w-56 md:w-52 lg:w-64 xl:w-72 overflow-hidden rounded-full border-2 border-white/10 dark:border-white/15 bg-black/5 dark:bg-white/5 shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:border-brand-400/40 group-hover:shadow-2xl">
            <img
              :src="step.image"
              :alt="step.title"
              class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              :class="step.imageClass"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 bg-black/10 dark:bg-black/20 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
          </div>

          <!-- Centered Content Below -->
          <div class="mt-6 sm:mt-8 flex flex-col items-center">
            <h3 class="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary transition-colors duration-300 group-hover:text-brand-400">
              {{ i + 1 }}. {{ step.title }}
            </h3>
            <p class="mt-2.5 sm:mt-3 max-w-xs text-sm sm:text-base leading-relaxed text-secondary">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-14 sm:mt-16 flex justify-center">
        <PrimaryButton as="RouterLink" to="/how-it-works" size="lg">See the full guide</PrimaryButton>
      </div>
    </div>
  </section>
</template>

