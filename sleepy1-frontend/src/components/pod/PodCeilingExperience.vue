<script setup lang="ts">
import { ref } from 'vue'

type ViewMode = 'star' | 'moon'
const activeView = ref<ViewMode>('star')
</script>

<template>
  <section id="pod-interior-views" class="section-pad relative overflow-hidden">
    <div class="container-page">
      <!-- Minimal heading -->
      <div class="mx-auto max-w-xl text-center mb-10">
        <p class="eyebrow mb-3">Experience the Pod</p>
        <h2 class="text-2xl font-semibold text-ivory-50 sm:text-3xl text-balance leading-tight">
          Look up. This is your ceiling.
        </h2>
      </div>

      <!-- Pod Ceiling View — immersive first-person perspective -->
      <div class="relative mx-auto max-w-4xl">
        <!-- Pod shell frame (the rounded capsule border) -->
        <div class="relative overflow-hidden rounded-[2.5rem] border-[3px] border-white/[0.08] shadow-2xl shadow-black/40">
          <!-- The animated ceiling canvas -->
          <div class="relative aspect-[16/9] w-full overflow-hidden">
            <!-- === STAR VIEW CEILING === -->
            <div
              class="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
              :class="activeView === 'star' ? 'opacity-100' : 'opacity-0 pointer-events-none'"
            >
              <svg viewBox="0 0 960 540" class="h-full w-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="s-core" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stop-color="#1a1530" />
                    <stop offset="60%" stop-color="#100e1e" />
                    <stop offset="100%" stop-color="#08060f" />
                  </radialGradient>
                  <radialGradient id="s-warm" cx="50%" cy="45%" r="40%">
                    <stop offset="0%" stop-color="#f6c98b" stop-opacity="0.07" />
                    <stop offset="100%" stop-color="#08060f" stop-opacity="0" />
                  </radialGradient>
                  <filter id="s-glow">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                  <filter id="s-glow-sm">
                    <feGaussianBlur stdDeviation="1.5" />
                  </filter>
                </defs>

                <!-- Deep night background -->
                <rect width="960" height="540" fill="url(#s-core)" />
                <rect width="960" height="540" fill="url(#s-warm)" />

                <!-- Ceiling panel lines (subtle pod structure) -->
                <line x1="0" y1="0" x2="480" y2="270" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1" />
                <line x1="960" y1="0" x2="480" y2="270" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1" />
                <line x1="0" y1="540" x2="480" y2="270" stroke="#ffffff" stroke-opacity="0.015" stroke-width="1" />
                <line x1="960" y1="540" x2="480" y2="270" stroke="#ffffff" stroke-opacity="0.015" stroke-width="1" />
                <!-- Horizontal ceiling seam -->
                <ellipse cx="480" cy="270" rx="420" ry="230" fill="none" stroke="#ffffff" stroke-opacity="0.025" stroke-width="1" />

                <!-- ===== STARS ===== -->
                <!-- Bright constellation stars -->
                <circle cx="180" cy="120" r="3" fill="#f6c98b" filter="url(#s-glow)">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="320" cy="80" r="3.5" fill="#e8d5b5" filter="url(#s-glow)">
                  <animate attributeName="opacity" values="0.85;0.25;0.85" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="480" cy="140" r="4" fill="#c9b3f5" filter="url(#s-glow)">
                  <animate attributeName="opacity" values="0.95;0.35;0.95" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="640" cy="95" r="3" fill="#f6c98b" filter="url(#s-glow)">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="4.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="780" cy="160" r="3.5" fill="#e8d5b5" filter="url(#s-glow)">
                  <animate attributeName="opacity" values="0.85;0.3;0.85" dur="6s" repeatCount="indefinite" />
                </circle>

                <!-- Mid-tier stars -->
                <circle cx="120" cy="220" r="2.5" fill="#c9b3f5" filter="url(#s-glow-sm)">
                  <animate attributeName="opacity" values="0.7;0.15;0.7" dur="5.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="260" cy="200" r="2" fill="#f6c98b" filter="url(#s-glow-sm)">
                  <animate attributeName="opacity" values="0.65;0.2;0.65" dur="4.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="250" r="2.5" fill="#e8d5b5" filter="url(#s-glow-sm)">
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="550" cy="220" r="2" fill="#c9b3f5" filter="url(#s-glow-sm)">
                  <animate attributeName="opacity" values="0.6;0.15;0.6" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="700" cy="260" r="2.5" fill="#f6c98b" filter="url(#s-glow-sm)">
                  <animate attributeName="opacity" values="0.75;0.2;0.75" dur="6.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="840" cy="240" r="2" fill="#e8d5b5" filter="url(#s-glow-sm)">
                  <animate attributeName="opacity" values="0.6;0.15;0.6" dur="4.8s" repeatCount="indefinite" />
                </circle>

                <!-- Small distant stars -->
                <circle cx="90" cy="60" r="1.2" fill="#e8d5b5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="7s" repeatCount="indefinite" /></circle>
                <circle cx="210" cy="310" r="1" fill="#c9b3f5"><animate attributeName="opacity" values="0.4;0.08;0.4" dur="6s" repeatCount="indefinite" /></circle>
                <circle cx="350" cy="350" r="1.2" fill="#f6c98b"><animate attributeName="opacity" values="0.45;0.1;0.45" dur="5.5s" repeatCount="indefinite" /></circle>
                <circle cx="500" cy="380" r="1" fill="#e8d5b5"><animate attributeName="opacity" values="0.35;0.08;0.35" dur="7.5s" repeatCount="indefinite" /></circle>
                <circle cx="600" cy="350" r="1.3" fill="#c9b3f5"><animate attributeName="opacity" values="0.45;0.1;0.45" dur="4.5s" repeatCount="indefinite" /></circle>
                <circle cx="750" cy="380" r="1" fill="#f6c98b"><animate attributeName="opacity" values="0.4;0.08;0.4" dur="6.2s" repeatCount="indefinite" /></circle>
                <circle cx="870" cy="100" r="1.2" fill="#c9b3f5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="5.8s" repeatCount="indefinite" /></circle>

                <!-- Constellation lines -->
                <g opacity="0.12">
                  <line x1="180" y1="120" x2="260" y2="200" stroke="#c9b3f5" stroke-width="0.8" />
                  <line x1="260" y1="200" x2="320" y2="80" stroke="#c9b3f5" stroke-width="0.8" />
                  <line x1="320" y1="80" x2="480" y2="140" stroke="#c9b3f5" stroke-width="0.8" />
                  <line x1="480" y1="140" x2="400" y2="250" stroke="#e8d5b5" stroke-width="0.6" />
                  <line x1="640" y1="95" x2="700" y2="260" stroke="#f6c98b" stroke-width="0.6" />
                  <line x1="700" y1="260" x2="780" y2="160" stroke="#f6c98b" stroke-width="0.6" />
                  <line x1="550" y1="220" x2="640" y2="95" stroke="#e8d5b5" stroke-width="0.6" />
                </g>

                <!-- Soft nebula patches -->
                <circle cx="350" cy="180" r="80" fill="#a08ce0" opacity="0.015" filter="url(#s-glow)" />
                <circle cx="650" cy="300" r="100" fill="#f6c98b" opacity="0.012" filter="url(#s-glow)" />
              </svg>
            </div>

            <!-- === MOON VIEW CEILING === -->
            <div
              class="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
              :class="activeView === 'moon' ? 'opacity-100' : 'opacity-0 pointer-events-none'"
            >
              <svg viewBox="0 0 960 540" class="h-full w-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="m-core" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stop-color="#111828" />
                    <stop offset="60%" stop-color="#0c1020" />
                    <stop offset="100%" stop-color="#070a14" />
                  </radialGradient>
                  <radialGradient id="m-moonlight" cx="55%" cy="35%" r="35%">
                    <stop offset="0%" stop-color="#d0dcf8" stop-opacity="0.10" />
                    <stop offset="60%" stop-color="#8899cc" stop-opacity="0.04" />
                    <stop offset="100%" stop-color="#070a14" stop-opacity="0" />
                  </radialGradient>
                  <filter id="m-glow">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                </defs>

                <!-- Deep blue night background -->
                <rect width="960" height="540" fill="url(#m-core)" />
                <rect width="960" height="540" fill="url(#m-moonlight)" />

                <!-- Ceiling panel lines -->
                <line x1="0" y1="0" x2="480" y2="270" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1" />
                <line x1="960" y1="0" x2="480" y2="270" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1" />
                <line x1="0" y1="540" x2="480" y2="270" stroke="#ffffff" stroke-opacity="0.015" stroke-width="1" />
                <line x1="960" y1="540" x2="480" y2="270" stroke="#ffffff" stroke-opacity="0.015" stroke-width="1" />
                <ellipse cx="480" cy="270" rx="420" ry="230" fill="none" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1" />

                <!-- ===== CRESCENT MOON ===== -->
                <g transform="translate(480, 210)">
                  <!-- Outer halo -->
                  <circle cx="0" cy="0" r="100" fill="#c4d4f5" opacity="0.03" filter="url(#m-glow)" />
                  <circle cx="0" cy="0" r="60" fill="#d8e4ff" opacity="0.04" filter="url(#m-glow)" />
                  <!-- Crescent shape -->
                  <path d="M-20,-45 A50,50 0 1,1 -20,45 A35,35 0 1,0 -20,-45" fill="#d8e4ff" opacity="0.65">
                    <animate attributeName="opacity" values="0.65;0.45;0.65" dur="8s" repeatCount="indefinite" />
                  </path>
                </g>

                <!-- Dim scattered stars -->
                <circle cx="120" cy="80" r="1" fill="#c4d4f5" opacity="0.2"><animate attributeName="opacity" values="0.2;0.05;0.2" dur="8s" repeatCount="indefinite" /></circle>
                <circle cx="250" cy="50" r="0.8" fill="#d8e4ff" opacity="0.15"><animate attributeName="opacity" values="0.15;0.04;0.15" dur="9s" repeatCount="indefinite" /></circle>
                <circle cx="780" cy="70" r="1" fill="#c4d4f5" opacity="0.18"><animate attributeName="opacity" values="0.18;0.04;0.18" dur="7s" repeatCount="indefinite" /></circle>
              </svg>
            </div>
          </div>

          <!-- Two buttons at the bottom, inside the pod frame -->
          <div class="absolute bottom-6 inset-x-0 flex justify-center gap-4 z-20 pointer-events-auto">
            <button
              type="button"
              class="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-pointer"
              :class="activeView === 'star'
                ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                : 'bg-white/5 text-ivory-100/50 border border-white/10 hover:bg-white/10 hover:text-ivory-100/80'"
              @click="activeView = 'star'"
            >
              <span class="text-lg">✦</span>
              <span>Star</span>
            </button>
            <button
              type="button"
              class="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-pointer"
              :class="activeView === 'moon'
                ? 'bg-blue-400/20 text-blue-200 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                : 'bg-white/5 text-ivory-100/50 border border-white/10 hover:bg-white/10 hover:text-ivory-100/80'"
              @click="activeView = 'moon'"
            >
              <span class="text-lg">☽</span>
              <span>Moon</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ensure the parent allows pointer events while the SVG behind doesn't block it */
</style>
