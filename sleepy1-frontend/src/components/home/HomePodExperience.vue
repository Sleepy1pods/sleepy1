<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

const leftEl = useScrollReveal(0.15, 0)
const rightEl = useScrollReveal(0.15, 100)

function setLeftRef(el: any) {
  if (el) leftEl.value = el as HTMLElement
}

function setRightRef(el: any) {
  if (el) rightEl.value = el as HTMLElement
}
</script>

<template>
  <section class="pod-exp-canvas relative w-full overflow-hidden select-none min-h-[580px] xs:min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] xl:min-h-[860px] flex flex-col justify-between items-center py-10 sm:py-14 lg:py-0">
    
    <!-- Full-Bleed Studio Image Backdrop (Covers the entire screen seamlessly) -->
    <div class="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center pointer-events-none">
      <!-- Light Theme Image: p4.png -->
      <img
        src="/p4.png"
        alt="Sleepy1 Smart Rest Pod - Light Studio"
        class="w-full h-full object-cover lg:object-contain object-center dark:hidden block transition-transform duration-700"
      />
      <!-- Dark Theme Image: p3.png -->
      <img
        src="/p3.png"
        alt="Sleepy1 Smart Rest Pod - Dark Studio"
        class="w-full h-full object-cover lg:object-contain object-center dark:block hidden transition-transform duration-700"
      />

      <!-- Atmospheric subtle gradient vignettes for smooth section transition -->
      <div class="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[var(--bg)] to-transparent opacity-60 pointer-events-none" />
      <div class="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-60 pointer-events-none" />
    </div>

    <!-- ═══════════════════════════════════════════════════════
         DESKTOP FLANKING LAYOUT (lg+)
         ═══════════════════════════════════════════════════════ -->
    <div class="hidden lg:grid relative z-20 max-w-[1500px] mx-auto w-full px-8 lg:px-14 grid-cols-12 gap-6 items-center my-auto">
      <!-- Left Side: "STEP INSIDE," -->
      <div 
        :ref="setLeftRef" 
        class="col-span-4 flex flex-col justify-center text-right pr-4"
      >
        <div class="inline-block">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-black/5 dark:bg-white/10 text-ivory-100 border border-black/10 dark:border-white/15 backdrop-blur-md mb-4 shadow-sm">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            Sleepy1 Pod Experience
          </span>
          <h2 class="pod-exp-heading font-display uppercase tracking-tight">
            <span class="block text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.92] drop-shadow-sm">
              Step inside,
            </span>
          </h2>
        </div>
      </div>

      <!-- Center Column (Pod Visual Clearance Space) -->
      <div class="col-span-4 min-h-[460px] pointer-events-none" />

      <!-- Right Side: "AND THE WORLD OUTSIDE GOES QUIET." -->
      <div 
        :ref="setRightRef" 
        class="col-span-4 flex flex-col justify-center text-left pl-4"
      >
        <h2 class="pod-exp-heading font-display uppercase tracking-tight">
          <span class="block text-2xl lg:text-3xl xl:text-4xl font-light tracking-[0.04em] leading-snug opacity-95 text-balance drop-shadow-sm">
            and the world outside goes quiet.
          </span>
        </h2>
        <p class="mt-4 text-xs lg:text-sm text-ivory-100 max-w-sm leading-relaxed font-normal opacity-80">
          Engineered acoustic insulation and intelligent climate controls create your personal haven of silence.
        </p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         MOBILE & TABLET FULL-SCREEN POSTER LAYOUT (< lg)
         ═══════════════════════════════════════════════════════ -->
    <div class="lg:hidden relative z-20 w-full h-full flex flex-col justify-between items-center text-center px-5 sm:px-8 py-5 sm:py-8 flex-1">
      
      <!-- Top Header -->
      <div :ref="setLeftRef" class="w-full flex flex-col items-center pt-1 sm:pt-3">
        <h2 class="pod-exp-heading font-display uppercase tracking-tight">
          <span class="block text-3xl xs:text-4xl sm:text-5xl font-black leading-tight text-[#09090b] dark:text-white drop-shadow-sm">
            Step inside,
          </span>
        </h2>
      </div>

      <!-- Center Spacer (Clean view of the entire pod) -->
      <div class="flex-1 w-full min-h-[260px] xs:min-h-[320px] sm:min-h-[380px] pointer-events-none" />

      <!-- Bottom Tagline Card -->
      <div :ref="setRightRef" class="w-full max-w-sm sm:max-w-md pb-2 sm:pb-4">
        <div class="rounded-2xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#12141a]/85 backdrop-blur-md p-4 sm:p-5 shadow-xl transition-colors duration-300">
          <h2 class="pod-exp-heading font-display uppercase tracking-tight">
            <span class="block text-base xs:text-lg sm:text-xl font-bold tracking-[0.03em] leading-snug text-[#09090b] dark:text-white">
              and the world outside goes quiet.
            </span>
          </h2>
          <p class="mt-1 text-[11px] sm:text-xs text-[#52525b] dark:text-zinc-300 leading-relaxed font-medium">
            Ultra-low noise floor with active acoustic dampening.
          </p>
        </div>
      </div>

    </div>

  </section>
</template>

<style scoped>
.pod-exp-canvas {
  background-color: #f4f4f4;
}

html.dark .pod-exp-canvas,
.dark .pod-exp-canvas {
  background-color: #0b0c0f;
}

/* Light Theme */
.pod-exp-canvas .pod-exp-heading {
  color: #09090b !important;
}

/* Dark Theme */
html.dark .pod-exp-canvas .pod-exp-heading,
.dark .pod-exp-canvas .pod-exp-heading {
  color: #ffffff !important;
}
</style>
