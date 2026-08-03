<script setup lang="ts">
import { ref, computed } from 'vue'

type ViewMode = 'star' | 'moon'
const activeView = ref<ViewMode>('star')

const viewMeta = computed(() => {
  if (activeView.value === 'star') {
    return {
      label: 'Star View',
      tagline: 'Drift off under a gentle starfield',
      description:
        'The ceiling transforms into a soft constellation canopy — warm amber and lavender pinpoints of light that slowly pulse and dim, guiding your breathing rhythm into deep relaxation.',
      features: ['Constellation LED ceiling', 'Warm amber glow accents', 'Gradual dim-to-dark cycle', 'Pulse-sync breathing rhythm'],
    }
  }
  return {
    label: 'Moon View',
    tagline: 'Rest in the glow of soft moonlight',
    description:
      'A serene crescent moon bathes the pod interior in cool silver-blue light, evoking the calm of a cloudless night sky. Ideal for winding down before a flight or transit.',
    features: ['Crescent moonlight projection', 'Cool silver-blue ambience', 'Night sky gradient walls', 'Ultra-quiet atmosphere'],
  }
})
</script>

<template>
  <section id="pod-interior-views" class="section-pad relative overflow-hidden">
    <!-- Subtle background shift between ambient modes -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div
        class="absolute inset-0 transition-colors duration-[1200ms] ease-in-out"
        :class="activeView === 'star' ? 'bg-ink-900' : 'bg-ink-950'"
      />
    </div>

    <div class="container-page relative z-10">
      <!-- Section Header -->
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow mb-4">Pod Interior</p>
        <h2 class="text-3xl font-semibold text-ivory-50 sm:text-4xl lg:text-5xl text-balance leading-[1.1]">
          Step inside your private sanctuary
        </h2>
        <p class="mt-5 text-base text-ivory-100/70 sm:text-lg leading-relaxed">
          Every Sleepy1 pod offers two curated ambient modes — switch between them to match your mood and create your ideal rest atmosphere.
        </p>
      </div>

      <!-- Main Visual + Info Grid -->
      <div class="mt-16 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <!-- Left: Immersive Pod Interior SVG Illustration -->
        <div class="relative overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
          <!-- Star View Interior -->
          <Transition name="view-fade" mode="out-in">
            <div v-if="activeView === 'star'" key="star" class="aspect-[16/10] w-full">
              <svg viewBox="0 0 800 500" class="h-full w-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="star-ambient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#f6c98b" stop-opacity="0.12" />
                    <stop offset="40%" stop-color="#a08ce0" stop-opacity="0.06" />
                    <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
                  </radialGradient>
                  <linearGradient id="star-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#12111f" />
                    <stop offset="100%" stop-color="#0a0912" />
                  </linearGradient>
                  <linearGradient id="star-wall-l" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#1a1728" />
                    <stop offset="100%" stop-color="#14111f" />
                  </linearGradient>
                  <linearGradient id="star-wall-r" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stop-color="#1a1728" />
                    <stop offset="100%" stop-color="#14111f" />
                  </linearGradient>
                  <radialGradient id="star-ceiling-glow" cx="50%" cy="0%" r="60%">
                    <stop offset="0%" stop-color="#d4a5ff" stop-opacity="0.08" />
                    <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
                  </radialGradient>
                  <filter id="star-softglow">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </defs>

                <!-- Room background -->
                <rect width="800" height="500" fill="url(#star-bg)" />
                <rect width="800" height="500" fill="url(#star-ambient)" />

                <!-- Ceiling -->
                <path d="M80 60 L400 20 L720 60 L720 80 L80 80 Z" fill="#16132a" opacity="0.9" />
                <rect x="80" y="70" width="640" height="6" fill="#2a2445" opacity="0.5" />
                <rect width="800" height="120" fill="url(#star-ceiling-glow)" />

                <!-- Star constellation on ceiling -->
                <g class="pod-stars">
                  <circle cx="200" cy="35" r="2.5" fill="#f6c98b" opacity="0.9"><animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" /></circle>
                  <circle cx="320" cy="28" r="3" fill="#e8d5b5" opacity="0.85"><animate attributeName="opacity" values="0.85;0.3;0.85" dur="4s" repeatCount="indefinite" /></circle>
                  <circle cx="480" cy="32" r="2.5" fill="#c9b3f5" opacity="0.8"><animate attributeName="opacity" values="0.8;0.35;0.8" dur="3.5s" repeatCount="indefinite" /></circle>
                  <circle cx="600" cy="38" r="2" fill="#f6c98b" opacity="0.75"><animate attributeName="opacity" values="0.75;0.3;0.75" dur="4.5s" repeatCount="indefinite" /></circle>
                  <!-- Constellation lines -->
                  <line x1="200" y1="35" x2="320" y2="28" stroke="#c9b3f5" stroke-opacity="0.12" stroke-width="0.8" />
                  <line x1="320" y1="28" x2="480" y2="32" stroke="#c9b3f5" stroke-opacity="0.12" stroke-width="0.8" />
                  <line x1="480" y1="32" x2="600" y2="38" stroke="#f6c98b" stroke-opacity="0.1" stroke-width="0.8" />
                </g>

                <!-- Walls & floor -->
                <path d="M0 80 L80 60 L80 440 L0 480 Z" fill="url(#star-wall-l)" />
                <path d="M800 80 L720 60 L720 440 L800 480 Z" fill="url(#star-wall-r)" />
                <rect x="82" y="80" width="4" height="360" fill="#f6c98b" opacity="0.25" rx="2"><animate attributeName="opacity" values="0.25;0.15;0.25" dur="6s" repeatCount="indefinite" /></rect>
                <rect x="714" y="80" width="4" height="360" fill="#f6c98b" opacity="0.25" rx="2"><animate attributeName="opacity" values="0.25;0.15;0.25" dur="6s" repeatCount="indefinite" begin="1s" /></rect>
                <rect x="80" y="430" width="640" height="70" fill="#0e0c18" opacity="0.9" />

                <!-- Bed -->
                <rect x="140" y="310" width="520" height="120" rx="20" fill="#1e1a2e" opacity="0.7" />
                <rect x="160" y="300" width="480" height="110" rx="18" fill="#e9e4da" opacity="0.88" />
                <rect x="180" y="280" width="120" height="40" rx="16" fill="#f0ebe2" opacity="0.85" />
                <path d="M160 370 Q400 340 640 370 L640 410 Q400 380 160 410 Z" fill="#d5cfc5" opacity="0.35" />

                <!-- Controls -->
                <rect x="95" y="300" width="35" height="60" rx="8" fill="#1e1a2e" opacity="0.8" />
                <rect x="670" y="300" width="35" height="60" rx="8" fill="#1e1a2e" opacity="0.8" />

                <rect x="320" y="460" width="160" height="24" rx="12" fill="#1e1a2e" opacity="0.6" />
                <text x="400" y="476" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="#e9e4da" opacity="0.5" letter-spacing="4">STAR VIEW</text>
              </svg>
            </div>
          </Transition>

          <!-- Moon View Interior -->
          <Transition name="view-fade" mode="out-in">
            <div v-if="activeView === 'moon'" key="moon" class="aspect-[16/10] w-full">
              <svg viewBox="0 0 800 500" class="h-full w-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="moon-ambient" cx="65%" cy="25%" r="55%">
                    <stop offset="0%" stop-color="#c4d4f5" stop-opacity="0.12" />
                    <stop offset="50%" stop-color="#7b93c8" stop-opacity="0.05" />
                    <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
                  </radialGradient>
                  <linearGradient id="moon-bg" x1="0" y1="0" x2="0.3" y2="1">
                    <stop offset="0%" stop-color="#0c1020" />
                    <stop offset="100%" stop-color="#080a14" />
                  </linearGradient>
                  <linearGradient id="moon-wall-l" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#111728" />
                    <stop offset="100%" stop-color="#0c1020" />
                  </linearGradient>
                  <linearGradient id="moon-wall-r" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stop-color="#111728" />
                    <stop offset="100%" stop-color="#0c1020" />
                  </linearGradient>
                  <radialGradient id="moon-glow" cx="65%" cy="15%" r="30%">
                    <stop offset="0%" stop-color="#e0e8ff" stop-opacity="0.18" />
                    <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
                  </radialGradient>
                  <filter id="moon-blur">
                    <feGaussianBlur stdDeviation="4" />
                  </filter>
                </defs>

                <!-- Room background -->
                <rect width="800" height="500" fill="url(#moon-bg)" />
                <rect width="800" height="500" fill="url(#moon-ambient)" />
                <rect width="800" height="300" fill="url(#moon-glow)" />

                <!-- Ceiling -->
                <path d="M80 60 L400 20 L720 60 L720 80 L80 80 Z" fill="#0f1428" opacity="0.9" />
                <rect x="80" y="70" width="640" height="6" fill="#1c2540" opacity="0.5" />

                <!-- Crescent Moon -->
                <g transform="translate(520, 40)">
                  <circle cx="0" cy="0" r="35" fill="#c4d4f5" opacity="0.06" filter="url(#moon-blur)" />
                  <path d="M-12,-22 A25,25 0 1,1 -12,22 A18,18 0 1,0 -12,-22" fill="#d8e4ff" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;0.5;0.7" dur="8s" repeatCount="indefinite" />
                  </path>
                </g>

                <!-- Walls & floor -->
                <path d="M0 80 L80 60 L80 440 L0 480 Z" fill="url(#moon-wall-l)" />
                <path d="M800 80 L720 60 L720 440 L800 480 Z" fill="url(#moon-wall-r)" />
                <rect x="82" y="80" width="4" height="360" fill="#7b93c8" opacity="0.2" rx="2"><animate attributeName="opacity" values="0.2;0.1;0.2" dur="7s" repeatCount="indefinite" /></rect>
                <rect x="714" y="80" width="4" height="360" fill="#7b93c8" opacity="0.2" rx="2"><animate attributeName="opacity" values="0.2;0.1;0.2" dur="7s" repeatCount="indefinite" begin="1.5s" /></rect>
                <rect x="80" y="430" width="640" height="70" fill="#080a14" opacity="0.9" />

                <!-- Bed -->
                <rect x="140" y="310" width="520" height="120" rx="20" fill="#121830" opacity="0.7" />
                <rect x="160" y="300" width="480" height="110" rx="18" fill="#e0e4ee" opacity="0.85" />
                <rect x="180" y="280" width="120" height="40" rx="16" fill="#eaecf4" opacity="0.82" />
                <path d="M160 370 Q400 340 640 370 L640 410 Q400 380 160 410 Z" fill="#c8ccdc" opacity="0.3" />

                <!-- Controls -->
                <rect x="95" y="300" width="35" height="60" rx="8" fill="#121830" opacity="0.8" />
                <rect x="670" y="300" width="35" height="60" rx="8" fill="#121830" opacity="0.8" />

                <rect x="320" y="460" width="160" height="24" rx="12" fill="#121830" opacity="0.6" />
                <text x="400" y="476" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="#d8e4ff" opacity="0.5" letter-spacing="4">MOON VIEW</text>
              </svg>
            </div>
          </Transition>
        </div>

        <!-- Right: View Info Panel -->
        <div class="space-y-6">
          <Transition name="info-fade" mode="out-in">
            <div :key="activeView" class="space-y-5">
              <!-- Active view badge -->
              <div class="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                :class="activeView === 'star'
                  ? 'border-amber-400/25 bg-amber-500/10 text-amber-300'
                  : 'border-blue-400/25 bg-blue-500/10 text-blue-300'"
              >
                <span>{{ activeView === 'star' ? '✦' : '☽' }}</span>
                <span>{{ viewMeta.label }}</span>
              </div>

              <h3 class="text-2xl font-semibold text-ivory-50 sm:text-3xl">
                {{ viewMeta.tagline }}
              </h3>

              <p class="text-sm leading-relaxed text-ivory-100/60 sm:text-base">
                {{ viewMeta.description }}
              </p>

              <!-- Features list -->
              <ul class="space-y-3 pt-2">
                <li
                  v-for="(feat, i) in viewMeta.features"
                  :key="i"
                  class="flex items-center gap-3 text-sm text-ivory-100/75"
                >
                  <span
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    :class="activeView === 'star'
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-blue-500/15 text-blue-300'"
                  >
                    {{ i + 1 }}
                  </span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Bottom: Simple view toggles -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          type="button"
          class="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300"
          :class="activeView === 'star'
            ? 'bg-amber-400/15 text-amber-200 border border-amber-400/30'
            : 'bg-white/5 text-ivory-100/50 border border-white/10 hover:bg-white/10 hover:text-ivory-100/80'"
          @click="activeView = 'star'"
        >
          <span class="text-base">✦</span>
          <span>Star View</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300"
          :class="activeView === 'moon'
            ? 'bg-blue-400/15 text-blue-200 border border-blue-400/30'
            : 'bg-white/5 text-ivory-100/50 border border-white/10 hover:bg-white/10 hover:text-ivory-100/80'"
          @click="activeView = 'moon'"
        >
          <span class="text-base">☽</span>
          <span>Moon View</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.view-fade-enter-active,
.view-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.view-fade-enter-from {
  opacity: 0;
  transform: scale(0.97);
}
.view-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

.info-fade-enter-active,
.info-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.info-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.info-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
