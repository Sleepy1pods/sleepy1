<script setup lang="ts">
import { computed, ref } from 'vue'
import { faqs, faqCategoryLabels } from '@/data/faqs'
import type { FaqCategory } from '@/types/common'
import { usePageMeta } from '@/composables/usePageMeta'
import { useStructuredData } from '@/composables/useStructuredData'
import SectionHeading from '@/components/common/SectionHeading.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import FAQAccordion from '@/components/common/FAQAccordion.vue'
import EmptyState from '@/components/common/EmptyState.vue'

usePageMeta({
  title: 'FAQs',
  description: 'Answers to common Sleepy1 questions on booking, check-in, payments, cancellation, safety, hygiene, privacy, luggage, airport access, and pod facilities.',
})

useStructuredData(() => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}))

const query = ref('')
const activeCategory = ref<FaqCategory | 'all'>('all')

const categories = Object.keys(faqCategoryLabels) as FaqCategory[]

const filtered = computed(() =>
  faqs.filter((f) => {
    const matchesCategory = activeCategory.value === 'all' || f.category === activeCategory.value
    const q = query.value.trim().toLowerCase()
    const matchesQuery = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  }),
)
</script>

<template>
  <div class="container-page max-w-3xl py-16">
    <SectionHeading level="h1" eyebrow="Support" title="Frequently Asked Questions" align="center" class="mx-auto" description="Search or browse by topic — booking, check-in, payments, safety, and more." />

    <div class="mt-8">
      <SearchInput v-model="query" placeholder="Search FAQs..." />
    </div>

    <div class="mt-5 flex flex-wrap gap-2">
      <button
        type="button"
        class="min-h-[40px] rounded-full border px-4 py-2 text-sm font-medium transition-colors"
        :class="activeCategory === 'all' ? 'border-brand-400 bg-brand-400/15 text-brand-200' : 'border-white/10 text-ivory-100/60 hover:border-white/25'"
        :aria-pressed="activeCategory === 'all'"
        @click="activeCategory = 'all'"
      >
        All Topics
      </button>
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        class="min-h-[40px] rounded-full border px-4 py-2 text-sm font-medium transition-colors"
        :class="activeCategory === cat ? 'border-brand-400 bg-brand-400/15 text-brand-200' : 'border-white/10 text-ivory-100/60 hover:border-white/25'"
        :aria-pressed="activeCategory === cat"
        @click="activeCategory = cat"
      >
        {{ faqCategoryLabels[cat] }}
      </button>
    </div>

    <div class="mt-10">
      <EmptyState v-if="filtered.length === 0" title="No matching questions" description="Try a different search term or topic." />
      <FAQAccordion v-else :items="filtered" />
    </div>

    <div class="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
      <h2 class="text-lg font-semibold text-ivory-50">Still need help?</h2>
      <p class="mt-2 text-sm text-ivory-100/60">Our support team can help with anything not covered here.</p>
      <router-link to="/contact" class="mt-5 inline-block text-sm font-semibold text-brand-300 hover:text-brand-200">Contact Support →</router-link>
    </div>
  </div>
</template>
