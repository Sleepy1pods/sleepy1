<script setup lang="ts">
import type { AmenityIcon as AmenityIconName } from '@/types/common'
import SectionHeading from '@/components/common/SectionHeading.vue'
import AmenityIcon from '@/components/common/AmenityIcon.vue'
import DreamCard from '@/components/common/DreamCard.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const features: { title: string; icon: AmenityIconName }[] = [
  { title: 'Noise Insulation', icon: 'noise' },
  { title: 'Smart Climate Control', icon: 'climate' },
  { title: 'Ambient Lighting', icon: 'lighting' },
  { title: 'Entertainment', icon: 'display' },
  { title: 'Power Charging', icon: 'charging' },
  { title: 'Air Quality Monitoring', icon: 'ventilation' },
  { title: 'Comfort Mattress', icon: 'mattress' },
  { title: 'Secure Locking', icon: 'lock' },
]

const revealTargets = features.map((_, i) => useScrollReveal(0.1, i * 60))
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Features" title="Every pod, fully equipped" align="center" class="mx-auto" description="Smart technology and hospitality-grade comfort, built into every Sleepy1 pod." />
      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(feature, i) in features" :key="feature.title" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }">
          <DreamCard :glow="false" class="flex h-full flex-col items-center gap-3 p-6 text-center">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-400/10 text-brand-300">
              <AmenityIcon :icon="feature.icon" size="h-6 w-6" />
            </span>
            <h3 class="text-sm font-semibold text-ivory-50">{{ feature.title }}</h3>
          </DreamCard>
        </div>
      </div>
    </div>
  </section>
</template>
