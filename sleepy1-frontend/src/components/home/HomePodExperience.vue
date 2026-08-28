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
  <section class="pod-exp-canvas relative w-full overflow-hidden select-none min-h-[550px] sm:min-h-[640px] lg:min-h-[780px] xl:min-h-[860px] flex items-center justify-center">
    <!-- Pure, studio image displayed in center -->
    <div class="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center pointer-events-none">
      <!-- Light Theme Image: p4.png -->
      <img
        src="/p4.png"
        alt="Sleepy1 Smart Rest Pod - Light Studio"
        class="w-full h-full object-contain object-center dark:hidden block"
      />
      <!-- Dark Theme Image: p3.png -->
      <img
        src="/p3.png"
        alt="Sleepy1 Smart Rest Pod - Dark Studio"
        class="w-full h-full object-contain object-center dark:block hidden"
      />
    </div>

    <!-- Flanking Text Layout: Left text, Center Pod space, Right text -->
    <div class="relative z-20 max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 py-12 lg:py-16 my-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
        
        <!-- Left Side: First Line "STEP INSIDE," -->
        <div 
          :ref="setLeftRef" 
          class="lg:col-span-4 flex flex-col justify-center text-left lg:text-right"
        >
          <h2 class="pod-exp-heading font-display uppercase tracking-tight">
            <span class="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[0.95]">
              Step inside,
            </span>
          </h2>
        </div>

        <!-- Center Column (Pod Visual Space) -->
        <div class="hidden lg:block lg:col-span-4 min-h-[360px] pointer-events-none" />

        <!-- Right Side: Second Line "AND THE WORLD OUTSIDE GOES QUIET." -->
        <div 
          :ref="setRightRef" 
          class="lg:col-span-4 flex flex-col justify-center text-left"
        >
          <h2 class="pod-exp-heading font-display uppercase tracking-tight">
            <span class="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light tracking-[0.03em] leading-tight opacity-95">
              and the world outside goes quiet.
            </span>
          </h2>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.pod-exp-canvas {
  background-color: #f1f1f1;
}

html.dark .pod-exp-canvas,
.dark .pod-exp-canvas {
  background-color: #0c0e12;
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
