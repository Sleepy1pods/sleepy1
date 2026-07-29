<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { refundPolicySections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Refund Policy', description: 'Sleepy1 Refund Policy — placeholder content pending legal review.' })
</script>

<template>
  <LegalPageLayout title="Refund Policy" :sections="refundPolicySections" />
</template>
