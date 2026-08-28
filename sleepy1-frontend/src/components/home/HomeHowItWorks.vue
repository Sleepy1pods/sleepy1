<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const steps = [
  {
    stepNumber: '01',
    title: 'Choose a pod',
    description: 'Pick a location, date, and how long you need.',
    image: '/step1.jpeg',
    imageClass: 'object-center',
  },
  {
    stepNumber: '02',
    title: 'Scan to enter',
    description: 'Show your QR code at the door. No desk, no keys.',
    image: '/step2.jpeg',
    imageClass: 'object-center',
  },
  {
    stepNumber: '03',
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
      <div class="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }"
          class="card-surface group relative flex flex-col overflow-hidden rounded-2xl border border-theme bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
        >
          <!-- Image container with smooth hover zoom & step badge -->
          <div class="relative h-56 sm:h-60 w-full overflow-hidden bg-black/5 dark:bg-white/5">
            <img
              :src="step.image"
              :alt="step.title"
              class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              :class="step.imageClass"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            <!-- Floating Step Badge -->
            <span class="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/65 backdrop-blur-md px-3 py-1 text-[11px] font-bold tracking-widest text-white uppercase shadow-md">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Step {{ i + 1 }}
            </span>
          </div>

          <!-- Card Content -->
          <div class="flex flex-1 flex-col p-6 sm:p-7">
            <h3 class="font-display text-xl font-bold text-primary transition-colors group-hover:text-brand-400">
              {{ step.title }}
            </h3>
            <p class="mt-2.5 text-sm leading-relaxed text-secondary">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-14 flex justify-center">
        <PrimaryButton as="RouterLink" to="/how-it-works" size="lg">See the full guide</PrimaryButton>
      </div>
    </div>
  </section>
</template>
