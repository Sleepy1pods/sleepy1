<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import HubVisual from '@/components/common/HubVisual.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const steps = [
  { title: 'Choose Your Pod', description: 'Search by location, pick a pod type, and select your date, check-in time, and duration.', visual: 'airport-terminal-1', hub: 'airport' as const },
  { title: 'Smart Check-in', description: 'Walk up and scan your booking QR at the pod access panel — no desk, no keys, no waiting.', visual: 'pod-detail-1', hub: 'metro' as const },
  { title: 'Rest & Recharge', description: 'Enjoy your private pod, then check out automatically when your reserved time ends.', visual: 'pod-interior-1', hub: 'business-district' as const },
]

const revealTargets = steps.map((_, i) => useScrollReveal(0.15, i * 120))
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Booking Guide" title="How Sleepy1 booking works" align="center" class="mx-auto" />
      <div class="mt-14 grid gap-8 md:grid-cols-3">
        <div v-for="(step, i) in steps" :key="step.title" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }" class="relative">
          <div class="relative aspect-square overflow-hidden rounded-full shadow-premium">
            <HubVisual v-if="i !== 1" :hub-type="step.hub" :id="step.visual" rounded="rounded-full" class="h-full w-full" />
            <div v-else class="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-lavender-500">
              <svg class="h-16 w-16 text-ink-950" viewBox="0 0 24 24" fill="none"><path d="M6 11V8a6 6 0 1112 0v3M5 11h14v10H5V11z" stroke="currentColor" stroke-width="1.5" /></svg>
            </div>
            <span class="absolute -top-2 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-ivory-50 text-sm font-bold text-ink-950 shadow-soft">
              {{ i + 1 }}
            </span>
          </div>
          <h3 class="mt-6 text-center text-lg font-semibold text-ivory-50">{{ step.title }}</h3>
          <p class="mt-2 text-center text-sm leading-relaxed text-ivory-100/60">{{ step.description }}</p>
        </div>
      </div>
      <div class="mt-12 flex justify-center">
        <PrimaryButton as="RouterLink" to="/how-it-works" size="lg">See The Full Booking Guide</PrimaryButton>
      </div>
    </div>
  </section>
</template>
