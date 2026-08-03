<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import DreamCard from '@/components/common/DreamCard.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const pillars = [
  {
    title: 'Genuine comfort',
    description: 'Ergonomic mattresses, circadian lighting, and acoustic isolation — real rest, not a nap on a chair.',
    icon: 'M3 10h18v9H3v-9zM3 10a4 4 0 014-4h10a4 4 0 014 4',
  },
  {
    title: 'Complete privacy',
    description: 'A fully enclosed, camera-free space, yours alone for the hour.',
    icon: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z',
  },
  {
    title: 'No front desk',
    description: 'Scan, unlock, rest. Book and access a pod without ever speaking to staff.',
    icon: 'M6 11V8a6 6 0 1112 0v3M5 11h14v10H5V11z',
  },
]

const revealTargets = pillars.map((_, i) => useScrollReveal(0.15, i * 90))
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Why Sleepy1" title="Built for one thing" align="center" class="mx-auto" description="No lounges, no gyms, no meeting rooms competing for attention. Just a quiet place to rest." />
      <div class="mt-14 grid gap-5 sm:grid-cols-3">
        <div v-for="(pillar, i) in pillars" :key="pillar.title" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }">
          <DreamCard :glow="false" class="h-full p-8">
            <svg class="h-8 w-8 text-brand-300" viewBox="0 0 24 24" fill="none"><path :d="pillar.icon" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <h3 class="mt-6 text-lg font-semibold text-ivory-50">{{ pillar.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ pillar.description }}</p>
          </DreamCard>
        </div>
      </div>
    </div>
  </section>
</template>
