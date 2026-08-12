<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { cookiePolicySections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Cookie Policy', description: 'Read the Sleepy1 Cookie Policy to understand how we use browser storage to keep you signed in.' })
</script>

<template>
  <LegalPageLayout title="Cookie Policy" :sections="cookiePolicySections" />
</template>
