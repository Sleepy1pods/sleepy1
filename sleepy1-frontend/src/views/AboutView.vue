<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import AboutJourney from '@/components/about/AboutJourney.vue'
import AboutStoryHero from '@/components/about/AboutStoryHero.vue'
import AboutTeam from '@/components/about/AboutTeam.vue'
import AboutBrandValues from '@/components/about/AboutBrandValues.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

usePageMeta({
  title: 'About Us',
  description: 'Meet the creators behind Sleepy1, discover how the idea came to our minds, how we engineered our rest pods, and explore our journey.',
})
</script>

<template>
  <div class="about-page">
    <!-- 1. Origin Story: How the idea came to our minds -->
    <section class="section-pad transition-colors duration-500 overflow-hidden">
      <div class="container-page">
        <AboutStoryHero />
      </div>
    </section>

    <!-- 2. Mission & Vision -->
    <section class="section-pad">
      <div class="container-page max-w-5xl">
        <div class="space-y-16 lg:space-y-20">
          <!-- Mission -->
          <div>
            <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-400">{{ t('about.missionBadge') }}</span>
            <h2 class="mt-2 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {{ t('about.missionTitle') }}
            </h2>
            <p class="mt-5 text-lg font-normal leading-relaxed text-secondary sm:text-xl lg:text-2xl text-balance">
              {{ t('about.missionDesc') }}
            </p>
          </div>

          <!-- Vision -->
          <div>
            <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-400">{{ t('about.visionBadge') }}</span>
            <h2 class="mt-2 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {{ t('about.visionTitle') }}
            </h2>
            <p class="mt-5 text-lg font-normal leading-relaxed text-secondary sm:text-xl lg:text-2xl text-balance">
              {{ t('about.visionDesc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. The People Who Built It: The Team -->
    <section class="section-pad">
      <div class="container-page">
        <AboutTeam />
      </div>
    </section>

    <!-- 4. Brand Values -->
    <section class="section-pad">
      <div class="container-page">
        <SectionHeading :eyebrow="t('about.brandValuesEyebrow')" :title="t('about.brandValuesTitle')" align="center" class="mx-auto" />
        <AboutBrandValues />
      </div>
    </section>

    <!-- 5. Our Journey (Starting from 2025 up to 2027) -->
    <section class="section-pad">
      <div class="container-page">
        <SectionHeading :eyebrow="t('about.journeyEyebrow')" :title="t('about.journeyTitle')" align="center" class="mx-auto" />
        <AboutJourney />
      </div>
    </section>

    <!-- 6. Call To Action -->
    <section class="py-20 text-center">
      <div class="container-page">
        <h2 class="text-balance font-display text-3xl font-bold text-primary sm:text-4xl">{{ t('about.ctaTitle') }}</h2>
        <p class="mx-auto mt-3 max-w-lg text-secondary">{{ t('about.ctaDesc') }}</p>
        <div class="mt-8 flex justify-center gap-4">
          <PrimaryButton as="RouterLink" to="/quick-book" size="lg">{{ t('about.ctaBtn') }}</PrimaryButton>
        </div>
      </div>
    </section>
  </div>
</template>
