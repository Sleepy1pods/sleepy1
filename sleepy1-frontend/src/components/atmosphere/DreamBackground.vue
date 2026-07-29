<script setup lang="ts">
import StarField from './StarField.vue'

/**
 * Reusable atmospheric backdrop: star field + soft drifting nebula glows + a moonlight wash.
 * `tone` nudges the palette across the page's night → morning journey without extra components.
 */
withDefaults(
  defineProps<{
    tone?: 'void' | 'dusk' | 'depth'
    density?: 'low' | 'medium' | 'high'
    shootingStars?: boolean
  }>(),
  { tone: 'void', density: 'medium', shootingStars: true },
)
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div
      class="absolute inset-0"
      :class="{
        'bg-ink-950': tone === 'void',
        'bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950': tone === 'dusk',
        'bg-ink-900': tone === 'depth',
      }"
    />
    <div class="absolute inset-0 opacity-80">
      <StarField :density="density" :shooting-stars="shootingStars" />
    </div>
    <div
      class="absolute -left-1/4 top-[-10%] h-[55vh] w-[55vh] rounded-full bg-brand-500/15 blur-[120px] motion-safe:animate-drift-slow"
    />
    <div
      class="absolute -right-1/4 top-[20%] h-[50vh] w-[50vh] rounded-full bg-lavender-500/15 blur-[130px] motion-safe:animate-drift-slow [animation-delay:-8s]"
    />
    <div
      class="absolute bottom-[-15%] left-1/3 h-[45vh] w-[45vh] rounded-full bg-moon-500/10 blur-[130px] motion-safe:animate-drift-slow [animation-delay:-14s]"
    />
    <div class="absolute inset-0 bg-grain opacity-30" />
  </div>
</template>
