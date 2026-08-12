<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { cancellationPolicySections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Cancellation Policy', description: 'Read the Sleepy1 Cancellation Policy to understand cancellation windows, no-shows, and rescheduling.' })
</script>

<template>
  <LegalPageLayout title="Cancellation Policy" :sections="cancellationPolicySections" />
</template>
