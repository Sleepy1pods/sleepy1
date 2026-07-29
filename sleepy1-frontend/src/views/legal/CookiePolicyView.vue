<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { cookiePolicySections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Cookie Policy', description: 'Sleepy1 Cookie Policy — placeholder content pending legal review.' })
</script>

<template>
  <LegalPageLayout title="Cookie Policy" :sections="cookiePolicySections" />
</template>
