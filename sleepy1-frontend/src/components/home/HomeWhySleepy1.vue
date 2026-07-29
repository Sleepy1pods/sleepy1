<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import DreamCard from '@/components/common/DreamCard.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const pillars = [
  {
    title: 'Premium Comfort',
    description: 'Ergonomic mattresses, circadian lighting, and acoustic isolation designed for genuine rest, not a nap on a chair.',
    icon: 'M3 10h18v9H3v-9zM3 10a4 4 0 014-4h10a4 4 0 014 4',
  },
  {
    title: 'Smart Technology',
    description: 'QR-based smart access, automated booking, and a connected in-pod panel — zero staff handovers required.',
    icon: 'M6 11V8a6 6 0 1112 0v3M5 11h14v10H5V11z',
  },
  {
    title: 'Privacy First',
    description: 'Every pod is a fully enclosed, camera-free private space — built for uninterrupted relaxation and focus.',
    icon: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z',
  },
  {
    title: 'Connected Experience',
    description: 'High-speed WiFi, universal charging, and smart climate control keep you and your devices ready to move.',
    icon: 'M5 13a11 11 0 0114 0M8 16.5a6.5 6.5 0 018 0M12 20h.01',
  },
]

const revealTargets = pillars.map((_, i) => useScrollReveal(0.15, i * 90))
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Why Sleepy1" title="A place built purely for rest" align="center" class="mx-auto" description="A premium on-demand private space to sleep, rest, and recharge — engineered for hospitality, privacy, and speed." />
      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(pillar, i) in pillars" :key="pillar.title" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }">
          <DreamCard class="h-full p-7">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-400/10 text-brand-300">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"><path :d="pillar.icon" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
            <h3 class="mt-5 text-lg font-semibold text-ivory-50">{{ pillar.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ pillar.description }}</p>
          </DreamCard>
        </div>
      </div>
    </div>
  </section>
</template>
