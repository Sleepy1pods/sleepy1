<script setup lang="ts">
import { pressMentions } from '@/data/press'
import { formatDate } from '@/utils/format'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'

usePageMeta({
  title: 'Press & Media',
  description: 'Sleepy1 press mentions and media resources. Placeholder coverage list for this MVP build.',
})
</script>

<template>
  <div class="container-page max-w-3xl py-16">
    <SectionHeading level="h1" eyebrow="Press & Media" title="Sleepy1 in the news" align="center" class="mx-auto" description="Placeholder coverage for this MVP — replace with verified press mentions before launch." />

    <div class="mt-12 divide-y divide-white/8 rounded-2xl border border-white/8">
      <div v-for="mention in pressMentions" :key="mention.id" class="p-6">
        <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">{{ mention.publication }} · {{ formatDate(mention.date) }}</p>
        <h3 class="mt-2 font-semibold text-ivory-50">{{ mention.title }}</h3>
      </div>
    </div>

    <div class="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-ivory-100/50">Media Enquiries</h3>
      <p class="mt-2 text-sm text-ivory-100/60">
        For interviews or press assets, contact <a href="mailto:sleepy1.pods@gmail.com" class="text-brand-300 hover:text-brand-200">sleepy1.pods@gmail.com</a>.
      </p>
    </div>
  </div>
</template>
