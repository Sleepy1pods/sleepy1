<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { termsSections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Terms & Conditions', description: 'Read the Sleepy1 Terms & Conditions governing booking, pod usage, and account conduct.' })
</script>

<template>
  <LegalPageLayout title="Terms & Conditions" :sections="termsSections" />
</template>
