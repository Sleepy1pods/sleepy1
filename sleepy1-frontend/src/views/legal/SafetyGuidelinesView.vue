<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { safetyGuidelinesSections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({
  title: 'Safety Guidelines',
  description: 'Review important in-pod safety guidelines, ventilation standards, and emergency release procedures.',
})
</script>

<template>
  <LegalPageLayout title="Safety Guidelines" :sections="safetyGuidelinesSections" />
</template>
