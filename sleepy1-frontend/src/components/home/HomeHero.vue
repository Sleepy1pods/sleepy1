<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { locale, t } = useI18n()

// Typing Animation
const displayedLine1 = ref('')
const displayedLine2 = ref('')
let activeTimeouts: ReturnType<typeof setTimeout>[] = []

function clearTimeouts() {
  activeTimeouts.forEach(clearTimeout)
  activeTimeouts = []
}

function getSegments(text: string, lang: string): string[] {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter(lang, { granularity: 'grapheme' })
      return Array.from(segmenter.segment(text)).map((s) => s.segment)
    } catch {
      // fallback
    }
  }
  return Array.from(text)
}

function startTyping() {
  clearTimeouts()
  displayedLine1.value = ''
  displayedLine2.value = ''

  const line1Text = t('hero.line1')
  const line2Text = t('hero.line2')
  const lang = locale.value || 'en'

  const seg1 = getSegments(line1Text, lang)
  const seg2 = getSegments(line2Text, lang)

  let i = 0
  let j = 0
  const typeSpeed = 70

  const typeLine1 = () => {
    if (i < seg1.length) {
      displayedLine1.value += seg1[i]
      i++
      activeTimeouts.push(setTimeout(typeLine1, typeSpeed))
    } else {
      activeTimeouts.push(setTimeout(typeLine2, 160))
    }
  }

  const typeLine2 = () => {
    if (j < seg2.length) {
      displayedLine2.value += seg2[j]
      j++
      activeTimeouts.push(setTimeout(typeLine2, typeSpeed))
    }
  }

  activeTimeouts.push(setTimeout(typeLine1, 150))
}

onMounted(() => {
  startTyping()
})

onUnmounted(() => {
  clearTimeouts()
})

// Re-run typing smoothly if language changes while on page
watch(locale, () => {
  startTyping()
})
</script>

<template>
  <section class="hero-canvas relative w-full overflow-hidden select-none min-h-[88vh] lg:min-h-[92vh] flex items-center">
    <!-- Background Image: pure and crisp studio render for light & dark -->
    <div class="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <!-- Light Theme Image -->
      <img
        src="/p2.jpeg"
        alt="Sleepy1 Smart Rest Pod"
        class="w-full h-full object-cover object-right lg:object-[center_right] dark:hidden block"
        fetchpriority="high"
        decoding="async"
      />
      <!-- Dark Theme Image -->
      <img
        src="/p1.png"
        alt="Sleepy1 Smart Rest Pod"
        class="w-full h-full object-cover object-right lg:object-[center_right] dark:block hidden"
        fetchpriority="high"
        decoding="async"
      />
    </div>

    <!-- Smooth top transition that seamlessly merges with navbar / page background -->
    <div class="hero-top-blend absolute top-0 inset-x-0 h-24 sm:h-36 pointer-events-none z-10" />

    <!-- Mobile gradient overlay for perfect readability on smaller screens -->
    <div class="absolute inset-0 z-0 bg-gradient-to-r from-[#f1f1f1]/95 via-[#f1f1f1]/70 to-transparent dark:from-[#0c0e12]/95 dark:via-[#0c0e12]/70 dark:to-transparent lg:hidden pointer-events-none" />

    <!-- Smooth bottom transition that seamlessly matches both light & dark themes -->
    <div class="hero-bottom-blend absolute bottom-0 inset-x-0 h-24 sm:h-32 pointer-events-none z-10" />

    <!-- Container Content -->
    <div class="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-24 flex flex-col justify-center">
      <div class="max-w-2xl">
        <!-- Headline with Multilingual Typing Animation -->
        <h1 class="hero-heading uppercase leading-[0.95] font-display notranslate select-none" translate="no">
          <span class="hero-title-main block text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
            {{ displayedLine1 }}
          </span>
          <span class="hero-title-sub block text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.16em] mt-2">
            {{ displayedLine2 }}
          </span>
        </h1>

        <!-- Description -->
        <p class="hero-desc mt-6 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
          {{ t('hero.desc') }}
        </p>

        <!-- Action Buttons -->
        <div class="mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
          <router-link
            to="/quick-book"
            class="hero-book-btn group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:scale-105 shadow-lg shadow-black/15 dark:shadow-black/40 notranslate"
            translate="no"
          >
            <span>{{ t('hero.bookNow') }}</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>

          <router-link
            to="/pod-experience"
            class="hero-explore-btn inline-flex items-center gap-2 rounded-full backdrop-blur-md px-6 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-sm notranslate"
            translate="no"
          >
            <span>{{ t('hero.explorePod') }}</span>
            <span>&rarr;</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-canvas {
  background-color: #f1f1f1;
  min-height: 88vh;
}

html.dark .hero-canvas,
.dark .hero-canvas {
  background-color: #0c0e12;
}

@media (min-width: 1024px) {
  .hero-canvas {
    min-height: 92vh;
  }
}

/* Light Mode Text & Button Styling */
.hero-canvas .hero-heading,
.hero-canvas .hero-title-main {
  color: #09090b !important;
}

.hero-canvas .hero-title-sub {
  color: #18181b !important;
  opacity: 0.92;
}

.hero-canvas .hero-desc {
  color: #3f3f46 !important;
}

.hero-canvas .hero-book-btn {
  background-color: #09090b !important;
  color: #ffffff !important;
}
.hero-canvas .hero-book-btn:hover {
  background-color: #18181b !important;
}

.hero-canvas .hero-explore-btn {
  color: #09090b !important;
  border: 1px solid rgba(0, 0, 0, 0.18);
  background-color: rgba(255, 255, 255, 0.7);
}
.hero-canvas .hero-explore-btn:hover {
  border-color: rgba(0, 0, 0, 0.4);
  background-color: rgba(255, 255, 255, 0.9);
}

/* Dark Mode Text & Button Styling */
html.dark .hero-canvas .hero-heading,
html.dark .hero-canvas .hero-title-main,
.dark .hero-canvas .hero-heading,
.dark .hero-canvas .hero-title-main {
  color: #FFFFFF !important;
}

html.dark .hero-canvas .hero-title-sub,
.dark .hero-canvas .hero-title-sub {
  color: #FFFFFF !important;
  opacity: 0.95;
}

html.dark .hero-canvas .hero-desc,
.dark .hero-canvas .hero-desc {
  color: #E2E8F0 !important;
}

html.dark .hero-canvas .hero-book-btn,
.dark .hero-canvas .hero-book-btn {
  background-color: #FFFFFF !important;
  color: #000000 !important;
}
html.dark .hero-canvas .hero-book-btn:hover,
.dark .hero-canvas .hero-book-btn:hover {
  background-color: #F4F4F5 !important;
}

html.dark .hero-canvas .hero-explore-btn,
.dark .hero-canvas .hero-explore-btn {
  color: #FFFFFF !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
}
html.dark .hero-canvas .hero-explore-btn:hover,
.dark .hero-canvas .hero-explore-btn:hover {
  border-color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.2);
}

/* Top & Bottom seamless gradient blend with page background */
.hero-top-blend {
  background: linear-gradient(to bottom, var(--bg) 0%, rgba(241, 241, 241, 0) 100%);
}
html.dark .hero-top-blend,
.dark .hero-top-blend {
  background: linear-gradient(to bottom, var(--bg) 0%, rgba(12, 14, 18, 0) 100%);
}

.hero-bottom-blend {
  background: linear-gradient(to bottom, rgba(241, 241, 241, 0) 0%, var(--bg) 100%);
}
html.dark .hero-bottom-blend,
.dark .hero-bottom-blend {
  background: linear-gradient(to bottom, rgba(12, 14, 18, 0) 0%, var(--bg) 100%);
}
</style>
