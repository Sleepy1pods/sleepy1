<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { cancellationPolicySections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Cancellation Policy', description: 'Sleepy1 Cancellation Policy — placeholder content pending legal review.' })
</script>

<template>
  <LegalPageLayout title="Cancellation Policy" :sections="cancellationPolicySections" />
</template>
