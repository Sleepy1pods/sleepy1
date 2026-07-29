<script setup lang="ts">
import { blogPosts } from '@/data/blog'
import { usePageMeta } from '@/composables/usePageMeta'
import { formatDate } from '@/utils/format'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PodVisual from '@/components/common/PodVisual.vue'

usePageMeta({
  title: 'Travel Blog',
  description: 'Sleepy1 travel tips — jet lag recovery, working from airports, and the design thinking behind our rest pods.',
})
</script>

<template>
  <div class="container-page py-16">
    <SectionHeading level="h1" eyebrow="Travel Tips" title="The Sleepy1 Blog" align="center" class="mx-auto" />
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      <router-link
        v-for="post in blogPosts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="card-surface group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      >
        <div class="h-48 overflow-hidden">
          <PodVisual :id="post.coverImage" class="h-full w-full transition-transform duration-700 group-hover:scale-105" rounded="rounded-none" />
        </div>
        <div class="p-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">{{ post.category }}</p>
          <h3 class="mt-2 text-lg font-semibold text-ivory-50">{{ post.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ post.excerpt }}</p>
          <p class="mt-4 text-xs text-ivory-100/40">{{ formatDate(post.publishedAt) }} · {{ post.readMinutes }} min read</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
