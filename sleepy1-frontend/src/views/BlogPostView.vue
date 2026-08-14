<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blogPosts } from '@/data/blog'
import { formatDate } from '@/utils/format'
import { usePageMeta } from '@/composables/usePageMeta'
import { useStructuredData } from '@/composables/useStructuredData'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import HomeNewsletter from '@/components/home/HomeNewsletter.vue'

const route = useRoute()
const router = useRouter()
const post = computed(() => blogPosts.find((p) => p.slug === route.params.slug))

usePageMeta(() => ({
  title: post.value?.title ?? 'Blog Post',
  description: post.value?.excerpt ?? 'A Sleepy1 travel tips article.',
}))

useStructuredData(() =>
  post.value
    ? {
        '@type': 'BlogPosting',
        headline: post.value.title,
        description: post.value.excerpt,
        datePublished: post.value.publishedAt,
        author: { '@type': 'Person', name: post.value.author },
      }
    : null,
)
</script>

<template>
  <div v-if="post" class="container-page max-w-2xl py-16">
    <Breadcrumbs :items="[{ label: 'Blog', to: '/blog' }, { label: post.title }]" />
    <p class="mt-6 text-xs font-semibold uppercase tracking-wide text-brand-300">{{ post.category }}</p>
    <h1 class="mt-2 text-3xl font-semibold text-ivory-50 sm:text-4xl">{{ post.title }}</h1>
    <p class="mt-3 text-sm text-ivory-100/45">{{ post.author }} · {{ formatDate(post.publishedAt) }} · {{ post.readMinutes }} min read</p>

    <div class="mt-8 aspect-video overflow-hidden rounded-2xl">
      <PodVisual :id="post.coverImage" class="h-full w-full" />
    </div>

    <div class="prose-invert mt-8 space-y-5">
      <p v-for="(para, i) in post.content" :key="i" class="text-[15px] leading-relaxed text-ivory-100/75">{{ para }}</p>
    </div>

    <div class="mt-12 border-t border-white/10 pt-8 text-center">
      <PrimaryButton as="RouterLink" to="/quick-book">Book a Pod For Your Next Trip →</PrimaryButton>
    </div>

    <HomeNewsletter class="mt-8" />
  </div>
  <EmptyState
    v-else
    class="container-page py-24"
    title="Article not found"
    description="This blog post may have moved."
    action-label="Back to Blog"
    @action="router.push('/blog')"
  />
</template>
