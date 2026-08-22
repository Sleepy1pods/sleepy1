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
  <section class="hero-canvas relative w-full overflow-hidden select-none transition-colors duration-300">
    <!-- Container Grid: Left Content + Right Crystal-Clear 3D Pod -->
    <div
      class="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-8 min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-between">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center flex-1 my-auto">

        <!-- Left Column: Automotive Showcase Typography -->
        <div class="lg:col-span-5 z-20">
          <!-- Eyebrow -->
          <div class="flex items-center gap-3 mb-4">
            <span class="h-[2px] w-6 bg-zinc-900 dark:bg-white"></span>
            <p class="text-xs sm:text-sm font-bold tracking-[0.25em] text-zinc-600 dark:text-zinc-300 uppercase">
              Smart Rest Network
            </p>
          </div>

          <!-- Headline with Typing Animation ending in "." -->
          <h1 class="uppercase leading-[0.95] font-display">
            <span
              class="block text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-primary whitespace-nowrap">
              {{ displayedLine1 }}
            </span>
            <span
              class="block text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.18em] text-secondary mt-2 whitespace-nowrap">
              {{ displayedLine2 }}
            </span>
          </h1>

          <!-- Description -->
          <p class="mt-5 text-sm sm:text-base text-secondary leading-relaxed max-w-md font-light">
            Smart, private rest pods across universities, corporate parks, hospitals, and railway stations.
          </p>

          <!-- Action Buttons with Curved Pill Borders -->
          <div class="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <router-link to="/quick-book"
              class="group relative inline-flex items-center gap-3 border-2 border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-xl">
              <span>Book Now</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Right Column: Clean & Unobstructed 3D Pod (No Labels) -->
        <div class="lg:col-span-7 relative flex items-center justify-center lg:justify-end overflow-visible">
          <div
            class="relative w-full max-w-6xl lg:max-w-none min-h-[360px] sm:min-h-[440px] lg:min-h-[560px] xl:min-h-[620px] flex items-center justify-center lg:justify-end">

            <!-- Light Mode: High-Res Transparent 3D Pod -->
            <img src="/pod-hero2.png" alt="Sleepy1 Smart Rest Pod"
              class="block dark:hidden relative z-10 w-full h-full object-contain scale-[1.5] sm:scale-[2] lg:scale-[1.8] xl:scale-[1.7] filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.14)] transition-transform duration-700 ease-out -translate-y-4 sm:-translate-y-6 lg:-translate-y-10 xl:-translate-y-12 lg:translate-x-6 xl:translate-x-8" />

            <!-- Dark Mode: Studio 3D Pod Render -->
            <img src="/pod-hero2.png" alt="Sleepy1 Smart Rest Pod"
              class="hidden dark:block relative z-10 w-full h-full object-contain scale-[1.5] sm:scale-[2] lg:scale-[1.8] xl:scale-[1.7] filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] opacity-95 transition-transform duration-700 ease-out -translate-y-4 sm:-translate-y-6 lg:-translate-y-10 xl:-translate-y-12 lg:translate-x-6 xl:translate-x-8" />
          </div>
        </div>

      </div>

      <!-- Bottom Disclaimer -->
      <div class="w-full flex justify-end pt-4">
        <p class="text-[11px] sm:text-xs text-muted font-mono text-right opacity-90">
          *Instant booking • Available 24/7 • University & Corporate Hubs
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-canvas {
  background-color: var(--bg) !important;
  color: var(--text-primary) !important;
  min-height: 85vh;
}

@media (min-width: 1024px) {
  .hero-canvas {
    min-height: 88vh;
  }
}
</style>
