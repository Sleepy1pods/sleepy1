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
    <div class="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300">
      <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
      Placeholder content — requires legal review before production launch
    </div>

    <div class="mt-10 space-y-8">
      <section v-for="section in sections" :key="section.heading">
        <h2 class="text-lg font-semibold text-ivory-50">{{ section.heading }}</h2>
        <p v-for="(para, i) in section.body" :key="i" class="mt-3 text-sm leading-relaxed text-ivory-100/65">{{ para }}</p>
      </section>
    </div>
  </div>
</template>
