<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeTrustedStrip from '@/components/home/HomeTrustedStrip.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomePodExperience from '@/components/home/HomePodExperience.vue'
import HomeHowItWorks from '@/components/home/HomeHowItWorks.vue'

usePageMeta({
  title: 'Sleepy1 — Your Pod, Your Mode',
  description: 'Sleepy1 places private, smart rest pods across universities, corporate parks, hospitals, and railway stations nationwide. Book by the hour to rest and recharge.',
})
</script>

<template>
  <div class="relative z-10">
    <HomeHero />
    <HomeTrustedStrip />
    <HomeFeatures />
    <HomePodExperience />
    <HomeHowItWorks />
  </div>
</template>
