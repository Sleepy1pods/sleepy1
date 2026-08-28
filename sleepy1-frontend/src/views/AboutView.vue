<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import AboutJourney from '@/components/about/AboutJourney.vue'
import AboutStoryHero from '@/components/about/AboutStoryHero.vue'
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

    <!-- 2. The People Who Built It: The Team -->
    <section class="section-pad border-t border-theme">
      <div class="container-page">
        <AboutTeam />
      </div>
    </section>

    <!-- 4. Mission & Vision -->
    <section class="section-pad border-t border-theme">
      <div class="container-page">
        <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 class="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              Our Mission
            </h2>
            <p class="mt-2 text-lg font-semibold text-brand-400 sm:text-xl">
              Instant Sanctuary
            </p>
            <p class="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
              To give every student, commuter, patient attendant, and traveller instant access to a private, soundproof space to rest — whenever and wherever exhaustion strikes.
            </p>
          </div>

          <div>
            <h2 class="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              Our Vision
            </h2>
            <p class="mt-2 text-lg font-semibold text-brand-400 sm:text-xl">
              The Universal Rest Network
            </p>
            <p class="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
              To make micro-rest as ubiquitous and accessible as grabbing a coffee — through seamless IoT booking, medical-grade clean pods, and intelligent public infrastructure.
            </p>
          </div>
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
