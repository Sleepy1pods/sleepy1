<script setup lang="ts">
defineProps<{ title: string; description: string; ctaLabel: string; ctaTo: string }>()
</script>

<template>
  <div class="rounded-3xl bg-brand-400 p-8 sm:p-10">
    <div class="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-xl font-semibold text-ink-950 sm:text-2xl">{{ title }}</h3>
        <p class="mt-2 max-w-md text-sm text-ink-950/70">{{ description }}</p>
      </div>
      <router-link :to="ctaTo" class="btn-base shrink-0 bg-ink-950 px-6 py-3 text-ivory-50 hover:bg-ink-900">
        {{ ctaLabel }}
      </router-link>
    </div>
  </div>
</template>
