<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeTrustedStrip from '@/components/home/HomeTrustedStrip.vue'
import HomeWhySleepy1 from '@/components/home/HomeWhySleepy1.vue'
import HomePodExperience from '@/components/home/HomePodExperience.vue'
import HomeHowItWorks from '@/components/home/HomeHowItWorks.vue'
import HomeFinalCta from '@/components/home/HomeFinalCta.vue'

usePageMeta({
  title: 'Premium Sleep Pods For Rest, Wherever You Wait',
  description: 'Sleepy1 places private, hotel-grade sleep pods across Hubli and Dharwad locations including campuses, railway stations, hospitals and corporate parks. Book by the hour to rest and recharge.',
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeTrustedStrip />
    <HomeWhySleepy1 />
    <HomePodExperience />
    <HomeHowItWorks />
    <HomeFinalCta />
  </div>
</template>
