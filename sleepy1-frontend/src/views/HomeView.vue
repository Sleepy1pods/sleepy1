<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomePodExperience from '@/components/home/HomePodExperience.vue'
import HomeHowItWorks from '@/components/home/HomeHowItWorks.vue'
import HomeTrustedStrip from '@/components/home/HomeTrustedStrip.vue'

usePageMeta({
  title: 'Sleepy1',
  description: 'Sleepy1 places private, smart rest pods across universities, corporate parks, hospitals, and railway stations nationwide. Book by the hour to rest and recharge.',
})
</script>

<template>
  <div class="relative z-10">
    <!-- 1. Hero Section -->
    <HomeHero />

    <!-- 2. Features Section (Placed directly above) -->
    <HomeFeatures />

    <!-- 3. Pod Experience -->
    <HomePodExperience />

    <!-- 4. How It Works -->
    <HomeHowItWorks />

    <!-- 5. Sleepy1 Credits 1-2 Line Overview Snippet -->
    <section class="py-12 sm:py-16">
      <div class="container-page">
        <div class="card-surface relative overflow-hidden rounded-3xl p-8 sm:p-12 border border-white/10 backdrop-blur-xl">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="max-w-2xl">
              <div class="inline-flex items-center gap-2 rounded-full border border-theme bg-surface px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                <span>Sleepy1 Credits</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-primary font-display">
                Recharge faster with Sleepy1 Credits.
              </h2>
              <p class="mt-2 text-sm sm:text-base text-secondary leading-relaxed">
                Top up your digital wallet to unlock instant, keyless pod check-ins across any hub nationwide, complete with discounted hourly rates and zero transaction delays.
              </p>
            </div>
            <div class="flex shrink-0 items-center gap-3">
              <router-link
                to="/quick-book"
                class="btn-base bg-cta-fill text-cta-text px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md hover:scale-105"
              >
                Book with Credits →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Currently At Strip (At the last of homepage) -->
    <HomeTrustedStrip />
  </div>
</template>

