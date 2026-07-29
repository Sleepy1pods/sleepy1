<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

usePageMeta({ title: 'Page Not Found', description: 'The page you are looking for could not be found on Sleepy1.' })
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">404</p>
    <h1 class="mt-4 text-3xl font-semibold text-ivory-50 sm:text-4xl">This page took a layover elsewhere</h1>
    <p class="mt-3 max-w-md text-ivory-100/60">The page you're looking for doesn't exist or may have moved.</p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <PrimaryButton as="RouterLink" to="/">Back to Home</PrimaryButton>
      <SecondaryButton as="RouterLink" to="/locations">Browse Locations</SecondaryButton>
    </div>
  </div>
</template>
