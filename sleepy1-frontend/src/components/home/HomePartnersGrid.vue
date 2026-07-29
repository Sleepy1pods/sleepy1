<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'

const cards = [
  {
    title: 'Corporate Solutions',
    description: 'Bulk credit programs and priority booking for teams whose employees travel often.',
    cta: 'Explore Corporate Plans',
    to: '/corporate',
    icon: 'M4 21V7a2 2 0 012-2h4v16M14 21V3h4a2 2 0 012 2v16M4 21h16M9 9h.01M9 13h.01M9 17h.01',
  },
  {
    title: 'Gift Sleep Credits',
    description: 'Send Sleepy1 Credits to someone travelling soon — a thoughtful gift for frequent flyers.',
    cta: 'Send a Gift',
    to: '/gift-credits',
    icon: 'M20 12v9H4v-9M2 7h20v5H2V7zm10 0V4a2.5 2.5 0 10-2.5 2.5H12zm0 0V4a2.5 2.5 0 112.5 2.5H12z',
  },
  {
    title: 'Become a Partner',
    description: 'Own or manage a high-footfall space? Bring Sleepy1 pods to your location.',
    cta: 'Start a Conversation',
    to: '/corporate',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
]
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Beyond The Booking" title="More ways to bring Sleepy1 with you" align="center" class="mx-auto" />
      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <router-link
          v-for="card in cards"
          :key="card.title"
          :to="card.to"
          class="card-surface group flex flex-col p-7 transition-transform duration-300 hover:-translate-y-1"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-500/15 text-lavender-400">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"><path :d="card.icon" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <h3 class="mt-5 text-lg font-semibold text-ivory-50">{{ card.title }}</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-ivory-100/60">{{ card.description }}</p>
          <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition-transform group-hover:translate-x-1">
            {{ card.cta }} →
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>
