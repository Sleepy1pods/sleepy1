<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import DreamCard from '@/components/common/DreamCard.vue'
import FAQAccordion from '@/components/common/FAQAccordion.vue'
import HomeNewsletter from '@/components/home/HomeNewsletter.vue'
import type { Faq } from '@/types/common'

usePageMeta({
  title: 'Insider Club | Newsletter & Promo Codes',
  description:
    'Join the Sleepy1 Insider Club. Get weekly rest tips, circadian sleep science, and an instant welcome promo code for 100 free sleep credits.',
})

const clubBenefits = [
  {
    title: 'Instant 100 Welcome Credits',
    description: 'Receive promo code WELCOME-REST100 immediately upon joining, redeemable on your very first pod booking.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Curated Rest Tips',
    description: 'Weekly insider guides on recovery science, finding quiet spaces between commitments, and power-nap optimization.',
    icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
  {
    title: 'Priority Pod Hub Drops',
    description: 'Be the first to know when new pod locations open across universities, railway stations, and corporate parks.',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  },
]

const newsletterFaqs: Faq[] = [
  {
    id: 'faq-nl-1',
    category: 'booking',
    question: 'How do I redeem my 100 free welcome credits?',
    answer: 'Once you subscribe, you will immediately see code WELCOME-REST100. Enter this promo code at checkout during your next pod booking to automatically deduct ₹100 from your total.',
  },
  {
    id: 'faq-nl-2',
    category: 'booking',
    question: 'How often will I receive emails from Sleepy1?',
    answer: 'You can choose between our Weekly Digest or Major Drops Only. We keep every email concise, useful, and relevant wherever you rest.',
  },
  {
    id: 'faq-nl-3',
    category: 'privacy',
    question: 'Can I unsubscribe at any time?',
    answer: 'Yes! Every email includes a 1-click unsubscribe link at the footer. We guarantee zero spam and never share your email address with third parties.',
  },
  {
    id: 'faq-nl-4',
    category: 'booking',
    question: 'Can I use the welcome promo code along with membership perks?',
    answer: 'Yes, WELCOME-REST100 can be applied on top of your standard traveller or membership tier rates for your first booking.',
  },
]
</script>

<template>
  <div class="container-page py-16">
    <!-- Breadcrumbs -->
    <Breadcrumbs :items="[{ label: 'Newsletter Club' }]" />

    <!-- Page Hero Header -->
    <div class="mt-8 text-center">
      <p class="eyebrow justify-center">Sleepy1 Insider Club</p>

      <h1 class="mt-4 font-display text-3xl font-medium tracking-tight text-ivory-50 sm:text-5xl">
        Rest smarter. Wait less.<br />
        <span class="bg-gradient-to-r from-brand-300 via-ivory-50 to-brand-400 bg-clip-text text-transparent">
          Join 15,000+ Sleepy1 members.
        </span>
      </h1>

      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ivory-100/70">
        Get weekly curated rest tips, sleep science, and secret member-only promo drops delivered straight to your inbox.
      </p>

      <!-- Highlights row -->
      <div class="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-ivory-100/60">
        <span class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          Instant ₹100 Welcome Credits
        </span>
        <span class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          Rest &amp; Recovery Science
        </span>
        <span class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          1-Click Unsubscribe Guarantee
        </span>
      </div>
    </div>

    <!-- Interactive Newsletter Component -->
    <div class="mt-12">
      <HomeNewsletter />
    </div>

    <!-- Why Join / Club Benefits Grid -->
    <section class="mt-20">
      <SectionHeading
        eyebrow="Club Benefits"
        title="Why travellers love the Insider Club"
        align="center"
        class="mx-auto"
        description="We treat your inbox with the same care and hospitality as our private rest pods."
      />

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DreamCard v-for="benefit in clubBenefits" :key="benefit.title" class="h-full p-7">
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-400/10 text-brand-300">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path :d="benefit.icon" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <h3 class="mt-5 text-lg font-semibold text-ivory-50">{{ benefit.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">{{ benefit.description }}</p>
        </DreamCard>
      </div>
    </section>

    <!-- Newsletter FAQs -->
    <section class="mt-20 max-w-3xl mx-auto">
      <SectionHeading
        eyebrow="FAQs"
        title="Frequently asked questions"
        align="center"
        class="mx-auto mb-10"
      />
      <FAQAccordion :items="newsletterFaqs" />
    </section>
  </div>
</template>
