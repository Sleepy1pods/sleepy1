<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
    <!-- Left Narrative Column (7 cols) -->
    <div class="lg:col-span-7">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
        {{ t('about.originBadge') }}
      </div>
      <h1
        class="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl lg:leading-tight">
        {{ t('about.storyTitle') }}
      </h1>

      <p class="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
        {{ t('about.storyP1') }}
      </p>

      <p class="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
        {{ t('about.storyP2') }}
      </p>
    </div>

    <!-- Right Pod Showcase (5 cols) -->
    <div class="lg:col-span-5 flex items-center justify-center">
      <div class="relative w-full max-w-[340px] sm:max-w-[380px] flex items-center justify-center select-none">
        <!-- Light Theme Real Image -->
        <img
          src="/about-pod-light.png?v=seamless"
          alt="Sleepy1 Gen-1 Rest Pod Exterior"
          class="seamless-pod-img w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain dark:hidden block transition-transform duration-500 hover:scale-[1.02]"
          loading="eager"
          decoding="async"
        />
        <!-- Dark Theme Real Image -->
        <img
          src="/about-pod-dark.png?v=seamless"
          alt="Sleepy1 Gen-1 Rest Pod Exterior"
          class="seamless-pod-img w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain dark:block hidden transition-transform duration-500 hover:scale-[1.02]"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.seamless-pod-img {
  -webkit-mask-image: radial-gradient(ellipse 72% 75% at 50% 50%, #000 48%, rgba(0, 0, 0, 0.8) 60%, transparent 88%);
  mask-image: radial-gradient(ellipse 72% 75% at 50% 50%, #000 48%, rgba(0, 0, 0, 0.8) 60%, transparent 88%);
}
</style>
