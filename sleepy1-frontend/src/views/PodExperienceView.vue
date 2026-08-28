<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PodModes from '@/components/pod/PodModes.vue'
import PodInteriorViews from '@/components/pod/PodInteriorViews.vue'

usePageMeta({
  title: 'The Sleep Pod — Features & 360° View',
  description: 'Explore the Sleepy1 sleep pod — star ceiling, entertainment capabilities, smart control, climate control, and modular mobility.',
})
</script>

<template>
  <div>
    <!-- 3 Modes Section (Blue, Red, White Star Ceiling Modes) -->
    <PodModes />

    <!-- 360-Degree View Section (Interior & Exterior) -->
    <PodInteriorViews />
  </div>
</template>
