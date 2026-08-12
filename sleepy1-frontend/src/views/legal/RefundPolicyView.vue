<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { refundPolicySections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Refund Policy', description: 'Read the Sleepy1 Refund Policy to understand how eligible refunds are credited to your Sleepy1 Credits wallet.' })
</script>

<template>
  <LegalPageLayout title="Refund Policy" :sections="refundPolicySections" />
</template>
