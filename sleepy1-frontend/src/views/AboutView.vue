<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import AboutJourney from '@/components/about/AboutJourney.vue'
import AboutStoryHero from '@/components/about/AboutStoryHero.vue'
import AboutHowWeBuiltIt from '@/components/about/AboutHowWeBuiltIt.vue'
import AboutTeam from '@/components/about/AboutTeam.vue'
import AboutBrandValues from '@/components/about/AboutBrandValues.vue'

usePageMeta({
  title: 'About Us',
  description: 'Meet the creators behind Sleepy1, discover how the idea came to our minds, how we engineered our rest pods, and explore our journey.',
})
</script>

<template>
  <div class="about-page">
    <!-- 1. Origin Story: How the idea came to our minds -->
    <section class="section-pad">
      <div class="container-page mt-4 sm:mt-8">
        <AboutStoryHero />
      </div>
    </section>

    <!-- 2. How We Built It: Engineering, IoT & Prototyping -->
    <section class="section-pad border-t border-theme">
      <div class="container-page">
        <AboutHowWeBuiltIt />
      </div>
    </section>

    <!-- 3. The People Who Built It: The Team -->
    <section class="section-pad border-t border-theme">
      <div class="container-page">
        <AboutTeam />
      </div>
    </section>

    <!-- 4. Mission & Vision -->
    <section class="section-pad border-t border-theme">
      <div class="container-page grid gap-6 sm:grid-cols-2">
        <div class="card-surface p-8 transition-all duration-300">
          <div class="mb-4 flex items-center justify-between border-b border-theme pb-3">
            <span class="eyebrow">01 · Mission</span>
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          </div>
          <h2 class="font-display text-xl font-bold text-primary">Instant Sanctuary</h2>
          <p class="mt-3 text-sm leading-relaxed text-secondary">
            To give every student, commuter, patient attendant, and traveller instant access to a private, soundproof space to rest — whenever and wherever exhaustion strikes.
          </p>
        </div>
        <div class="card-surface p-8 transition-all duration-300">
          <div class="mb-4 flex items-center justify-between border-b border-theme pb-3">
            <span class="eyebrow">02 · Vision</span>
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          </div>
          <h2 class="font-display text-xl font-bold text-primary">The Universal Rest Network</h2>
          <p class="mt-3 text-sm leading-relaxed text-secondary">
            To make micro-rest as ubiquitous and accessible as grabbing a coffee — through seamless IoT booking, medical-grade clean pods, and intelligent public infrastructure.
          </p>
        </div>
      </div>
    </section>

    <!-- 5. Brand Values -->
    <section class="section-pad border-t border-theme">
      <div class="container-page">
        <SectionHeading eyebrow="Brand Values" title="What guides every Sleepy1 pod" align="center" class="mx-auto" />
        <AboutBrandValues />
      </div>
    </section>

    <!-- 6. Our Journey (Starting from 2025 up to 2027) -->
    <section class="section-pad border-t border-theme">
      <div class="container-page">
        <SectionHeading eyebrow="Our Journey" title="From inception to our future horizons" align="center" class="mx-auto" />
        <AboutJourney />
      </div>
    </section>

    <!-- 7. Call To Action -->
    <section class="border-t border-theme py-20 text-center">
      <div class="container-page">
        <h2 class="text-balance font-display text-3xl font-bold text-primary sm:text-4xl">Join us in redefining rest.</h2>
        <p class="mx-auto mt-3 max-w-lg text-secondary">Experience our Gen-1 rest pods, or reach out about bringing Sleepy1 to your campus or facility.</p>
        <div class="mt-8 flex justify-center gap-4">
          <PrimaryButton as="RouterLink" to="/quick-book" size="lg">Book a pod</PrimaryButton>
        </div>
      </div>
    </section>
  </div>
</template>
