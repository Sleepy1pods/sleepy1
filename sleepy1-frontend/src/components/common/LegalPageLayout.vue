<script setup lang="ts">
defineProps<{
  title: string
  sections: { heading: string; body: string[] }[]
}>()
</script>

<template>
  <div class="container-page max-w-3xl py-16">
    <p class="eyebrow mb-4">Legal</p>
    <h1 class="text-3xl font-semibold text-ivory-50 sm:text-4xl">{{ title }}</h1>
    <p class="mt-3 text-sm font-medium text-ivory-100/50">Last updated: August 2026</p>

    <div class="mt-10 space-y-8">
      <section v-for="section in sections" :key="section.heading">
        <h2 class="text-lg font-semibold text-ivory-50">{{ section.heading }}</h2>
        <p v-for="(para, i) in section.body" :key="i" class="mt-3 text-sm leading-relaxed text-ivory-100/65">{{ para }}</p>
      </section>
    </div>
  </div>
</template>
