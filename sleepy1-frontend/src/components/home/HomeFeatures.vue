<script setup lang="ts">
import type { AmenityIcon as AmenityIconName } from '@/types/common'
import SectionHeading from '@/components/common/SectionHeading.vue'
import AmenityIcon from '@/components/common/AmenityIcon.vue'
import DreamCard from '@/components/common/DreamCard.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const features: { title: string; icon: AmenityIconName }[] = [
  { title: 'Star Ceiling', icon: 'star' },
  { title: 'Entertainment Capabilities', icon: 'display' },
  { title: 'Smart Control', icon: 'smart' },
  { title: 'Climate Control', icon: 'climate' },
  { title: 'Mobility & Portability', icon: 'mobility' },
]

const revealTargets = features.map((_, i) => useScrollReveal(0.1, i * 60))
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Features" title="Every pod, fully equipped" align="center" class="mx-auto" description="Smart technology and hospitality-grade comfort, built into every Sleepy1 pod." />
      <div class="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div v-for="(feature, i) in features" :key="feature.title" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }">
          <DreamCard :glow="false" class="flex h-full flex-col items-center gap-3 p-6 text-center group hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
            <span class="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-black/5 text-black dark:border-white/20 dark:bg-white/5 dark:text-white transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <AmenityIcon :icon="feature.icon" size="h-6 w-6" class="text-black dark:text-white" />
            </span>
            <h3 class="text-sm font-semibold text-ivory-50">{{ feature.title }}</h3>
          </DreamCard>
        </div>
      </div>
    </div>
  </section>
</template>
