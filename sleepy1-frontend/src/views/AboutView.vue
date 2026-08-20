<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import DreamCard from '@/components/common/DreamCard.vue'
import AboutMilestones from '@/components/about/AboutMilestones.vue'
import AboutStoryHero from '@/components/about/AboutStoryHero.vue'
import AboutBrandValues from '@/components/about/AboutBrandValues.vue'

usePageMeta({
  title: 'About',
  description: 'Sleepy1 is working to make safe, private rest more accessible in places where people travel, wait, and spend long hours — starting with campuses and hospitals, and expanding to more high-footfall locations.',
})
</script>

<template>
  <div class="about-page">
    <section class="section-pad">
      <div class="container-page mt-8 sm:mt-12">
        <AboutStoryHero />
      </div>
    </section>

    <section class="section-pad border-t border-white/8">
      <div class="container-page grid gap-6 sm:grid-cols-2">
        <DreamCard :glow="false" class="group relative overflow-hidden p-8 transition-all duration-300 hover:border-white/20">
          <div class="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
            <span class="eyebrow">01 · Mission</span>
            <span class="h-1.5 w-1.5 rounded-full bg-brand-400/80" aria-hidden="true" />
          </div>
          <h2 class="font-display text-xl font-bold text-ivory-50 transition-colors group-hover:text-brand-300">Instant Sanctuary</h2>
          <p class="mt-3 text-sm leading-relaxed text-ivory-100/70">
            To give every traveller instant access to a private, comfortable space to rest — wherever their
            journey takes them.
          </p>
        </DreamCard>
        <DreamCard :glow="false" class="group relative overflow-hidden p-8 transition-all duration-300 hover:border-white/20">
          <div class="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
            <span class="eyebrow">02 · Vision</span>
            <span class="h-1.5 w-1.5 rounded-full bg-brand-400/80" aria-hidden="true" />
          </div>
          <h2 class="font-display text-xl font-bold text-ivory-50 transition-colors group-hover:text-brand-300">The Trusted Rest Network</h2>
          <p class="mt-3 text-sm leading-relaxed text-ivory-100/70">
            To become the most trusted rest network — smart booking, premium pod design, and a seamless
            experience across every major transit hub.
          </p>
        </DreamCard>
      </div>
    </section>



    <section class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading eyebrow="Brand Values" title="What guides every Sleepy1 pod" align="center" class="mx-auto" />
        <AboutBrandValues />
      </div>
    </section>

    <section class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading eyebrow="Milestones" title="Our journey so far" align="center" class="mx-auto" />
        <AboutMilestones />
      </div>
    </section>



    <section class="border-t border-white/8 py-24 text-center">
      <div class="container-page">
        <h2 class="text-balance font-display text-3xl font-medium text-ivory-50 sm:text-4xl">Join us in redefining rest.</h2>
        <p class="mx-auto mt-3 max-w-lg text-ivory-100/65">Book your first Sleepy1 pod, or reach out about bringing Sleepy1 to your location.</p>
        <div class="mt-8 flex justify-center">
          <PrimaryButton as="RouterLink" to="/quick-book" size="lg">Book a pod</PrimaryButton>
        </div>
      </div>
    </section>
  </div>
</template>
