<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodFeatureAnatomy from '@/components/pod/PodFeatureAnatomy.vue'
import PodInteriorViews from '@/components/pod/PodInteriorViews.vue'
import PodModes from '@/components/pod/PodModes.vue'
import PodPhotoGallery from '@/components/pod/PodPhotoGallery.vue'

usePageMeta({
  title: 'The Sleep Pod — Features & 360° View',
  description: 'Explore the Sleepy1 sleep pod — star ceiling, entertainment capabilities, smart control, climate control, and modular mobility.',
})
</script>

<template>
  <div>
    <!-- Modes Section -->
    <PodModes />

    <!-- Essential Features Anatomy -->
    <PodFeatureAnatomy id="all-amenities" />

    <!-- 360-Degree View Section (Interior & Exterior) -->
    <PodInteriorViews />

    <!-- Photo Gallery -->
    <PodPhotoGallery />
  </div>
</template>
