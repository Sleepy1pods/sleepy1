<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Typing Animation
const line1Text = 'YOUR POD'
const line2Text = 'YOUR MODE.'
const displayedLine1 = ref('')
const displayedLine2 = ref('')

onMounted(() => {
  let i = 0
  let j = 0
  const typeSpeed = 75

  const typeLine1 = () => {
    if (i < line1Text.length) {
      displayedLine1.value += line1Text.charAt(i)
      i++
      setTimeout(typeLine1, typeSpeed)
    } else {
      setTimeout(typeLine2, 160)
    }
  }

  const typeLine2 = () => {
    if (j < line2Text.length) {
      displayedLine2.value += line2Text.charAt(j)
      j++
      setTimeout(typeLine2, typeSpeed)
    }
  }

  setTimeout(typeLine1, 200)
})
</script>

<template>
  <section class="hero-canvas relative w-full overflow-hidden select-none min-h-[88vh] lg:min-h-[92vh] flex items-center">
    <!-- Background Image: pure and crisp studio render -->
    <div class="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <img
        src="/p1.png"
        alt="Sleepy1 Smart Rest Pod"
        class="w-full h-full object-cover object-right lg:object-[center_right]"
      />
    </div>

    <!-- Smooth bottom transition that seamlessly matches both light & dark themes -->
    <div class="hero-bottom-blend absolute bottom-0 inset-x-0 h-24 sm:h-32 pointer-events-none z-10" />

    <!-- Container Content -->
    <div class="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-24 flex flex-col justify-center">
      <div class="max-w-2xl">
        <!-- Eyebrow Pill -->
        <div class="hero-eyebrow inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-1.5 mb-6">
          <span class="h-2 w-2 rounded-full bg-white animate-pulse" />
          <p class="hero-eyebrow-text text-xs sm:text-sm font-bold tracking-[0.25em] uppercase">
            Smart Rest Network
          </p>
        </div>

        <!-- Headline with Typing Animation (Strictly Black and White) -->
        <h1 class="hero-heading uppercase leading-[0.95] font-display">
          <span class="hero-title-main block text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
            {{ displayedLine1 }}
          </span>
          <span class="hero-title-sub block text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.16em] mt-2">
            {{ displayedLine2 }}
          </span>
        </h1>

        <!-- Description -->
        <p class="hero-desc mt-6 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
          Smart, private rest pods across universities, corporate parks, hospitals, and railway stations nationwide. Reserve in seconds, sleep in complete silence.
        </p>

        <!-- Action Buttons (Strictly Black and White) -->
        <div class="mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
          <router-link
            to="/quick-book"
            class="hero-book-btn group relative inline-flex items-center gap-3 bg-white hover:bg-zinc-100 text-black px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:scale-105 shadow-lg shadow-black/30"
          >
            <span>Book Now</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>

          <router-link
            to="/pod-experience"
            class="hero-explore-btn inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:border-white/70 hover:bg-white/20 hover:scale-105"
          >
            <span>Explore The Pod</span>
            <span>&rarr;</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-canvas {
  background-color: #0c0e12;
  min-height: 88vh;
}

@media (min-width: 1024px) {
  .hero-canvas {
    min-height: 92vh;
  }
}

/* Explicit high-contrast text styling - pure black and white */
.hero-canvas .hero-heading,
.hero-canvas .hero-title-main {
  color: #FFFFFF !important;
}

.hero-canvas .hero-title-sub {
  color: #FFFFFF !important;
  opacity: 0.95;
}

.hero-canvas .hero-eyebrow-text {
  color: #FFFFFF !important;
}

.hero-canvas .hero-desc {
  color: #E2E8F0 !important;
}

.hero-canvas .hero-explore-btn {
  color: #FFFFFF !important;
}

/* Seamless bottom gradient blend for light and dark modes */
.hero-bottom-blend {
  background: linear-gradient(to bottom, rgba(12, 14, 18, 0) 0%, var(--bg) 100%);
}
</style>
