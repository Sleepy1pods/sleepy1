<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomePodExperience from '@/components/home/HomePodExperience.vue'
import HomeHowItWorks from '@/components/home/HomeHowItWorks.vue'
import HomeTrustedStrip from '@/components/home/HomeTrustedStrip.vue'

usePageMeta({
  title: 'Sleepy1',
  description: 'Sleepy1 places private, smart rest pods across universities, corporate parks, hospitals, and railway stations nationwide. Book by the hour to rest and recharge.',
})
</script>

<template>
  <div class="relative z-10">
    <!-- 1. Hero Section -->
    <HomeHero />

    <!-- 2. Features Section (Placed directly above) -->
    <HomeFeatures />

    <!-- 3. Pod Experience -->
    <HomePodExperience />

    <!-- 4. How It Works -->
    <HomeHowItWorks />

    <!-- 5. Currently At Strip (At the last of homepage) -->
    <HomeTrustedStrip />
  </div>
</template>

