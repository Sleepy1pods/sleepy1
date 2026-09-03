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
  <section
    class="pod-exp-canvas relative w-full overflow-hidden select-none min-h-[580px] xs:min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] xl:min-h-[860px] flex flex-col justify-between items-center py-10 sm:py-14 lg:py-0 bg-[var(--bg)] transition-colors duration-500">

    <!-- Full-Bleed Studio Image Backdrop with soft feathered edge mask for seamless continuity -->
    <div
      class="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center pointer-events-none pod-img-container">
      <!-- Light Theme Image: p4.png -->
      <img src="/p4.png" alt="Sleepy1 Smart Rest Pod"
        class="w-full h-full object-contain object-center dark:hidden block transition-transform duration-700 max-w-[1400px]"
        loading="lazy" decoding="async" />
      <!-- Dark Theme Image: p3.png -->
      <img src="/p3.png" alt="Sleepy1 Smart Rest Pod"
        class="w-full h-full object-contain object-center dark:block hidden transition-transform duration-700 max-w-[1400px]"
        loading="lazy" decoding="async" />

      <!-- Atmospheric edge vignettes for seamless blend on left, right, top, bottom -->
      <div
        class="absolute inset-y-0 left-0 w-24 sm:w-44 lg:w-72 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent pointer-events-none z-10" />
      <div
        class="absolute inset-y-0 right-0 w-24 sm:w-44 lg:w-72 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/80 to-transparent pointer-events-none z-10" />
      <div
        class="absolute inset-x-0 top-0 h-24 sm:h-36 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/80 to-transparent pointer-events-none z-10" />
      <div
        class="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent pointer-events-none z-10" />
    </div>

    <!-- ═══════════════════════════════════════════════════════
         DESKTOP FLANKING LAYOUT (lg+)
         ═══════════════════════════════════════════════════════ -->
    <div
      class="hidden lg:grid relative z-20 max-w-[1500px] mx-auto w-full px-8 lg:px-14 grid-cols-12 gap-6 items-center my-auto">
      <!-- Left Side: "STEP INSIDE," -->
      <div :ref="setLeftRef" class="col-span-4 flex flex-col justify-center text-right pr-4 lg:pr-8">
        <h2 class="pod-exp-heading font-display uppercase tracking-tight">
          <span
            class="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] drop-shadow-sm text-[var(--text-primary)]">
            STEP<br />INSIDE,
          </span>
        </h2>
      </div>

      <!-- Center Column (Pod Visual Clearance Space) -->
      <div class="col-span-4 min-h-[460px] pointer-events-none" />

      <!-- Right Side: "AND THE WORLD OUTSIDE GOES QUIET." -->
      <div :ref="setRightRef" class="col-span-4 flex flex-col justify-center text-left pl-4 lg:pl-8">
        <h2 class="pod-exp-heading font-display uppercase tracking-tight">
          <span
            class="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light tracking-[0.04em] leading-snug opacity-95 text-[var(--text-primary)] drop-shadow-sm">
            AND THE WORLD<br />OUTSIDE GOES QUIET.
          </span>
        </h2>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         MOBILE & TABLET POSTER LAYOUT (< lg)
         ═══════════════════════════════════════════════════════ -->
    <div
      class="lg:hidden relative z-20 w-full h-full flex flex-col justify-between items-center text-center px-5 sm:px-8 py-8 flex-1">

      <!-- Top Header: STEP INSIDE, -->
      <div :ref="setLeftRef" class="w-full flex flex-col items-center pt-2">
        <h2 class="pod-exp-heading font-display uppercase tracking-tight">
          <span
            class="block text-3xl xs:text-4xl sm:text-5xl font-black leading-tight text-[var(--text-primary)] drop-shadow-sm">
            STEP INSIDE,
          </span>
        </h2>
      </div>

      <!-- Center Spacer (Clean view of the entire pod) -->
      <div class="flex-1 w-full min-h-[260px] xs:min-h-[300px] sm:min-h-[360px] pointer-events-none" />

      <!-- Bottom Tagline: AND THE WORLD OUTSIDE GOES QUIET. -->
      <div :ref="setRightRef" class="w-full flex flex-col items-center pb-4">
        <h2 class="pod-exp-heading font-display uppercase tracking-tight">
          <span
            class="block text-lg xs:text-xl sm:text-2xl font-light tracking-[0.03em] leading-snug text-[var(--text-primary)]">
            AND THE WORLD<br />OUTSIDE GOES QUIET.
          </span>
        </h2>
      </div>

    </div>

  </section>
</template>

<style scoped>
.pod-exp-canvas {
  background-color: var(--bg);
}

.pod-img-container img {
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 95%);
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 95%);
}
</style>
