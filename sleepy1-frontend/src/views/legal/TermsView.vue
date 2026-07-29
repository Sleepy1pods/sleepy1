<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { termsSections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Terms & Conditions', description: 'Sleepy1 Terms & Conditions — placeholder content pending legal review.' })
</script>

<template>
  <LegalPageLayout title="Terms & Conditions" :sections="termsSections" />
</template>
