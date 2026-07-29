<script setup lang="ts">
import { ref } from 'vue'
import { useParallax } from '@/composables/useParallax'

/** A softly glowing crescent moon — the hero's product-adjacent visual. Pure SVG/CSS, no 3D engine. */
withDefaults(defineProps<{ parallax?: boolean }>(), { parallax: true })

const rootEl = ref<HTMLElement | null>(null)
useParallax(rootEl, 10)
</script>

<template>
  <div ref="rootEl" class="relative mx-auto aspect-square w-full max-w-md" role="img" aria-label="A softly glowing crescent moon, representing calm and rest">
    <div
      class="absolute inset-0 will-change-transform"
      :style="parallax ? { transform: 'translate3d(var(--parallax-x, 0), var(--parallax-y, 0), 0)' } : undefined"
    >
      <svg viewBox="0 0 400 400" class="h-full w-full overflow-visible motion-safe:animate-breathe">
        <defs>
          <radialGradient id="moon-halo" cx="50%" cy="46%" r="55%">
            <stop offset="0%" stop-color="#8fd0dd" stop-opacity="0.35" />
            <stop offset="45%" stop-color="#a08ce0" stop-opacity="0.16" />
            <stop offset="100%" stop-color="#07080b" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="moon-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fffdf9" />
            <stop offset="60%" stop-color="#faf6ef" />
            <stop offset="100%" stop-color="#e0dcf5" />
          </linearGradient>
          <clipPath id="moon-crescent">
            <path d="M200 60a140 140 0 100 280 170 170 0 010-280z" />
          </clipPath>
        </defs>

        <circle cx="200" cy="200" r="190" fill="url(#moon-halo)" />

        <g clip-path="url(#moon-crescent)">
          <circle cx="200" cy="200" r="140" fill="url(#moon-body)" />
          <circle cx="150" cy="150" r="22" fill="#0b0d12" opacity="0.05" />
          <circle cx="230" cy="240" r="14" fill="#0b0d12" opacity="0.05" />
          <circle cx="170" cy="255" r="9" fill="#0b0d12" opacity="0.04" />
        </g>

        <g opacity="0.8">
          <circle cx="90" cy="80" r="2" fill="#faf6ef" />
          <circle cx="330" cy="110" r="1.6" fill="#faf6ef" opacity="0.7" />
          <circle cx="320" cy="300" r="2.2" fill="#faf6ef" opacity="0.6" />
          <circle cx="70" cy="290" r="1.4" fill="#faf6ef" opacity="0.5" />
        </g>
      </svg>
    </div>
  </div>
</template>
