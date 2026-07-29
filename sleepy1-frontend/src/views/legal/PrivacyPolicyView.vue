<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { privacyPolicySections } from '@/data/legal'
import LegalPageLayout from '@/components/common/LegalPageLayout.vue'

usePageMeta({ title: 'Privacy Policy', description: 'Sleepy1 Privacy Policy — placeholder content pending legal review.' })
</script>

<template>
  <LegalPageLayout title="Privacy Policy" :sections="privacyPolicySections" />
</template>
