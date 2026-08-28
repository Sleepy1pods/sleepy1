<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

const leftReveal = useScrollReveal(0.15, 0)
const rightReveal = useScrollReveal(0.15, 100)

const specs = [
  {
    title: '40dB Acoustic Isolation',
    desc: 'Multi-layer composite soundproofing blocks public ambient noise.',
    icon: 'volume-off',
  },
  {
    title: 'HEPA Fresh Air Flow',
    desc: 'Continuous filtered ventilation keeps air pristine and climate-controlled.',
    icon: 'wind',
  },
  {
    title: 'Smart Ambient Lighting',
    desc: 'Customizable warm lighting and star ceiling for instant deep relaxation.',
    icon: 'sparkles',
  },
  {
    title: 'Keyless QR Check-in',
    desc: 'Instant unlock with your phone. Zero check-in counters, 100% private.',
    icon: 'lock',
  },
]
</script>

<template>
  <section class="pod-exp-canvas relative w-full overflow-hidden select-none min-h-[620px] sm:min-h-[700px] lg:min-h-[820px] xl:min-h-[900px] flex items-center justify-center">
    <!-- Pure, original studio images displayed in full (object-contain) so no part of the pod or wheels is trimmed -->
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

    <!-- Container Content: Balanced dual-side alignment flanking the center pod -->
    <div class="relative z-20 max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-10 sm:py-14 lg:py-16 my-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        
        <!-- Left Side: Title, narrative and CTAs (Vertically centered with the pod) -->
        <div ref="leftReveal" class="lg:col-span-4 xl:col-span-4 max-w-sm sm:max-w-md lg:max-w-none flex flex-col justify-center my-auto">
          <!-- Eyebrow Pill -->
          <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] pod-exp-badge mb-5 backdrop-blur-md shadow-sm">
            <span class="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            <span>The Pod</span>
          </div>

          <!-- Headline -->
          <h2 class="pod-exp-heading font-display uppercase tracking-tight leading-[0.95]">
            <span class="block text-3xl sm:text-4xl lg:text-[40px] xl:text-5xl font-black">
              Step inside,
            </span>
            <span class="block text-xl sm:text-2xl lg:text-[24px] xl:text-3xl font-light tracking-[0.04em] mt-2 opacity-95">
              and the world outside goes quiet.
            </span>
          </h2>

          <!-- Description -->
          <p class="pod-exp-desc mt-4 text-xs sm:text-sm lg:text-[14px] leading-relaxed font-normal">
            Sealed, silent, and yours alone — every detail is built for one purpose: real rest, on your schedule.
          </p>

          <!-- Buttons -->
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <router-link
              to="/quick-book"
              class="pod-exp-primary-btn group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 hover:scale-105 shadow-md"
            >
              <span>Book Now</span>
              <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>

            <router-link
              to="/pod-experience"
              class="pod-exp-secondary-btn inline-flex items-center gap-2 rounded-full backdrop-blur-md px-5 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <span>Explore</span>
              <span>&rarr;</span>
            </router-link>
          </div>
        </div>

        <!-- Center Column (Pod Space): Left open so the centered pod is fully visible -->
        <div class="hidden lg:block lg:col-span-4 xl:col-span-4 pointer-events-none min-h-[300px]" />

        <!-- Right Side: Pod Specifications & Key Features (Centered vertically with the pod image) -->
        <div ref="rightReveal" class="lg:col-span-4 xl:col-span-4 max-w-sm sm:max-w-md lg:max-w-none lg:ml-auto w-full flex flex-col justify-center my-auto">
          <div class="flex flex-col gap-2.5 sm:gap-3 my-auto">
            <div
              v-for="spec in specs"
              :key="spec.title"
              class="pod-spec-card group relative p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="flex items-start gap-3">
                <!-- Icon Dot -->
                <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full pod-spec-icon">
                  <svg v-if="spec.icon === 'volume-off'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  <svg v-else-if="spec.icon === 'wind'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <svg v-else-if="spec.icon === 'sparkles'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>

                <!-- Text -->
                <div>
                  <h4 class="text-xs sm:text-sm font-bold tracking-tight pod-spec-title">
                    {{ spec.title }}
                  </h4>
                  <p class="mt-0.5 text-[11px] sm:text-xs leading-relaxed pod-spec-desc">
                    {{ spec.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
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

.pod-exp-canvas .pod-exp-desc {
  color: #3f3f46 !important;
}

.pod-exp-canvas .pod-exp-badge {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #18181b;
}

.pod-exp-canvas .pod-exp-primary-btn {
  background-color: #09090b !important;
  color: #ffffff !important;
}
.pod-exp-canvas .pod-exp-primary-btn:hover {
  background-color: #18181b !important;
}

.pod-exp-canvas .pod-exp-secondary-btn {
  color: #09090b !important;
  border: 1px solid rgba(0, 0, 0, 0.18);
  background-color: rgba(255, 255, 255, 0.85);
}
.pod-exp-canvas .pod-exp-secondary-btn:hover {
  border-color: rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
}

.pod-exp-canvas .pod-spec-card {
  background-color: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
}
.pod-exp-canvas .pod-spec-card:hover {
  border-color: rgba(0, 0, 0, 0.18);
  background-color: rgba(255, 255, 255, 0.95);
}

.pod-exp-canvas .pod-spec-icon {
  background-color: rgba(0, 0, 0, 0.06);
  color: #09090b;
}

.pod-exp-canvas .pod-spec-title {
  color: #09090b;
}

.pod-exp-canvas .pod-spec-desc {
  color: #52525b;
}

/* Dark Theme */
html.dark .pod-exp-canvas .pod-exp-heading,
.dark .pod-exp-canvas .pod-exp-heading {
  color: #ffffff !important;
}

html.dark .pod-exp-canvas .pod-exp-desc,
.dark .pod-exp-canvas .pod-exp-desc {
  color: #e2e8f0 !important;
}

html.dark .pod-exp-canvas .pod-exp-badge,
.dark .pod-exp-canvas .pod-exp-badge {
  background-color: rgba(18, 20, 26, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #f8fafc;
}

html.dark .pod-exp-canvas .pod-exp-primary-btn,
.dark .pod-exp-canvas .pod-exp-primary-btn {
  background-color: #ffffff !important;
  color: #000000 !important;
}
html.dark .pod-exp-canvas .pod-exp-primary-btn:hover,
.dark .pod-exp-canvas .pod-exp-primary-btn:hover {
  background-color: #f4f4f5 !important;
}

html.dark .pod-exp-canvas .pod-exp-secondary-btn,
.dark .pod-exp-canvas .pod-exp-secondary-btn {
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: rgba(18, 20, 26, 0.7);
}
html.dark .pod-exp-canvas .pod-exp-secondary-btn:hover,
.dark .pod-exp-canvas .pod-exp-secondary-btn:hover {
  border-color: rgba(255, 255, 255, 0.6);
  background-color: rgba(18, 20, 26, 0.9);
}

html.dark .pod-exp-canvas .pod-spec-card,
.dark .pod-exp-canvas .pod-spec-card {
  background-color: rgba(18, 20, 26, 0.75);
  border-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
}
html.dark .pod-exp-canvas .pod-spec-card:hover,
.dark .pod-exp-canvas .pod-spec-card:hover {
  border-color: rgba(255, 255, 255, 0.28);
  background-color: rgba(18, 20, 26, 0.9);
}

html.dark .pod-exp-canvas .pod-spec-icon,
.dark .pod-exp-canvas .pod-spec-icon {
  background-color: rgba(255, 255, 255, 0.1);
  color: #38bdf8;
}

html.dark .pod-exp-canvas .pod-spec-title,
.dark .pod-exp-canvas .pod-spec-title {
  color: #ffffff;
}

html.dark .pod-exp-canvas .pod-spec-desc,
.dark .pod-exp-canvas .pod-spec-desc {
  color: #94a3b8;
}
</style>
