<script setup lang="ts">
import { ref } from 'vue'
import PodVisual from '@/components/common/PodVisual.vue'
import AmenityIcon from '@/components/common/AmenityIcon.vue'
import type { AmenityIcon as AmenityIconType } from '@/types/common'

// ---------------------------------------------------------------------------
// Center Pod Anatomy — All Features Revealed At Once (No Scroll Trapping)
// Displays The Sleep Pod in the center with 3 minimal feature cards on the LEFT
// and 3 minimal feature cards on the RIGHT, all connected simultaneously by
// high-tech angled SVG circuit lines.
// ---------------------------------------------------------------------------

interface PodFeatureNode {
  id: string
  number: string
  name: string
  description: string
  icon: AmenityIconType
  side: 'left' | 'right'
  // Coordinates on a 1200x750 viewBox where the Center Pod is at X=380..820, Y=140..590
  dotX: number
  dotY: number
  // Target Y coordinate where the line meets the card edge (left edge at X=320 or right edge at X=880)
  cardY: number
}

const features: PodFeatureNode[] = [
  // 3 LEFT-SIDE FEATURES (Cards at left=0..320)
  {
    id: 'lighting',
    number: '01',
    name: 'Circadian LED Lighting',
    description: 'Automated warm amber lighting that mimics natural twilight to promote effortless sleep.',
    icon: 'lighting',
    side: 'left',
    dotX: 520,
    dotY: 200,
    cardY: 125,
  },
  {
    id: 'noise',
    number: '02',
    name: 'Acoustic Isolation Shell',
    description: 'Multi-layered acoustic damping panels and whisper-quiet door seals mute terminal noise outside.',
    icon: 'noise',
    side: 'left',
    dotX: 440,
    dotY: 360,
    cardY: 350,
  },
  {
    id: 'lock',
    number: '03',
    name: 'Keyless QR Access Lock',
    description: 'Hold your dynamic mobile QR code at the scanner to unlock your pod instantly.',
    icon: 'lock',
    side: 'left',
    dotX: 460,
    dotY: 510,
    cardY: 575,
  },

  // 3 RIGHT-SIDE FEATURES (Cards at left=880..1200)
  {
    id: 'ventilation',
    number: '04',
    name: 'Fresh-Air HEPA Ventilation',
    description: 'Active laminar airflow circulates fresh, temperature-regulated air every 90 seconds.',
    icon: 'ventilation',
    side: 'right',
    dotX: 680,
    dotY: 210,
    cardY: 125,
  },
  {
    id: 'wifi',
    number: '05',
    name: 'High-Speed WiFi',
    description: 'Ultra-fast dedicated fiber WiFi inside every pod for seamless work and streaming.',
    icon: 'wifi',
    side: 'right',
    dotX: 740,
    dotY: 360,
    cardY: 350,
  },
  {
    id: 'mattress',
    number: '06',
    name: 'Zero-G Memory Mattress',
    description: 'Ergonomic memory-foam mattress with organic cotton sheets, freshly sanitized after every stay.',
    icon: 'mattress',
    side: 'right',
    dotX: 720,
    dotY: 500,
    cardY: 575,
  },
]

// Calculates a futuristic angled circuit path connecting (dotX, dotY) on Pod
// to either LEFT card edge at (320, cardY) or RIGHT card edge at (880, cardY)
function getConnectingPath(feat: PodFeatureNode): string {
  const x1 = feat.dotX
  const y1 = feat.dotY
  const yTarget = feat.cardY

  if (feat.side === 'left') {
    // 1. Go left by 25px
    const x2 = x1 - 25
    const y2 = y1
    // 2. Make an angled bend to X=355, Y=yTarget
    const x3 = 355
    const y3 = yTarget
    // 3. Horizontal line into Left card edge at X=320, Y=yTarget
    const x4 = 320
    const y4 = yTarget
    return `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`
  } else {
    // 1. Go right by 25px
    const x2 = x1 + 25
    const y2 = y1
    // 2. Make an angled bend to X=845, Y=yTarget
    const x3 = 845
    const y3 = yTarget
    // 3. Horizontal line into Right card edge at X=880, Y=yTarget
    const x4 = 880
    const y4 = yTarget
    return `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`
  }
}

const activeHoverId = ref<string | null>(null)
</script>

<template>
  <section class="relative overflow-hidden py-16 sm:py-24 bg-[#090b12]">
    <!-- Background atmospheric glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

    <div class="container-page relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-indigo-300 mb-3">
          <span class="h-2 w-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_#818cf8]" />
          <span>Pod Feature Anatomy</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-ivory-50 tracking-tight">
          What's included in every pod
        </h2>
        <p class="mt-3 text-sm sm:text-base text-ivory-100/65">
          Designed from the inside out for genuine uninterrupted rest, high-speed productivity, and airport privacy.
        </p>
      </div>

      <!-- ----------------------------------------------------------------- -->
      <!-- DESKTOP VIEW: Center Pod + 3 Left Cards + 3 Right Cards At Once -->
      <!-- ----------------------------------------------------------------- -->
      <div class="relative w-full max-w-7xl mx-auto aspect-[16/10] max-h-[780px] hidden lg:block">
        
        <!-- 1. CENTER SLEEP POD ILLUSTRATION (Centered X=380..820, Y=140..590) -->
        <div class="absolute top-[140px] left-[380px] w-[440px] h-[450px] rounded-3xl overflow-hidden border border-white/15 bg-[#0b0d17] shadow-[0_0_90px_rgba(129,140,248,0.22)] transition-all duration-500">
          <PodVisual id="pod-interior-1" variant="interior" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#090b12]/90 via-transparent to-[#090b12]/30 pointer-events-none" />
          
          <!-- SLEEPY1 POD watermark badge -->
          <div class="absolute top-4 left-0 right-0 text-center pointer-events-none">
            <span class="text-[11px] font-black tracking-[0.35em] uppercase text-ivory-100/70">
              SLEEPY1 POD
            </span>
          </div>

          <!-- Bottom subtle accent strip -->
          <div class="absolute bottom-4 left-16 right-16 h-0.5 rounded-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_#818cf8] pointer-events-none" />
        </div>

        <!-- 2. SVG OVERLAY: 6 ANGLED CONNECTING LINES & PULSING BEACON DOTS -->
        <svg
          class="absolute inset-0 h-full w-full pointer-events-none z-20"
          viewBox="0 0 1200 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#818cf8" />
              <stop offset="50%" stop-color="#a855f7" />
              <stop offset="100%" stop-color="#818cf8" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" flood-color="#818cf8" flood-opacity="0.8" />
            </filter>
          </defs>

          <!-- Draw All 6 Connecting Lines -->
          <g v-for="feat in features" :key="feat.id">
            <!-- Angled Line -->
            <path
              :d="getConnectingPath(feat)"
              :stroke="activeHoverId === feat.id ? '#c084fc' : 'url(#lineGrad)'"
              :stroke-width="activeHoverId === feat.id ? '3' : '2'"
              stroke-linecap="round"
              stroke-linejoin="round"
              :filter="activeHoverId === feat.id ? 'url(#glowFilter)' : 'none'"
              class="transition-all duration-300"
              :class="activeHoverId && activeHoverId !== feat.id ? 'opacity-35' : 'opacity-85'"
            />

            <!-- Outer Radar Ping on Pod Dot -->
            <circle
              :cx="feat.dotX"
              :cy="feat.dotY"
              r="14"
              class="fill-indigo-400/20 animate-pulse"
            />

            <!-- Middle Halo Ring -->
            <circle
              :cx="feat.dotX"
              :cy="feat.dotY"
              r="8"
              class="fill-indigo-500/40 stroke-indigo-300 stroke-1"
            />

            <!-- Inner Core Dot on Pod -->
            <circle
              :cx="feat.dotX"
              :cy="feat.dotY"
              r="4"
              class="fill-white shadow-[0_0_10px_#fff]"
            />

            <!-- Terminal Connection Dot at Card Edge -->
            <circle
              :cx="feat.side === 'left' ? 320 : 880"
              :cy="feat.cardY"
              r="4.5"
              class="fill-indigo-300 stroke-white stroke-1"
            />
          </g>
        </svg>

        <!-- 3. THE 6 MINIMAL FEATURE CARDS (3 Left, 3 Right) -->
        <div
          v-for="feat in features"
          :key="feat.id"
          @mouseenter="activeHoverId = feat.id"
          @mouseleave="activeHoverId = null"
          class="absolute w-[310px] z-30 transition-all duration-300 cursor-pointer"
          :style="{
            left: feat.side === 'left' ? '5px' : '885px',
            top: `${feat.cardY - 65}px`
          }"
          :class="
            activeHoverId && activeHoverId !== feat.id
              ? 'opacity-55 scale-[0.98]'
              : 'opacity-100 scale-100'
          "
        >
          <div
            class="rounded-2xl border bg-[#111424]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-2xl text-left transition-all duration-300"
            :class="
              activeHoverId === feat.id
                ? 'border-indigo-400 shadow-[0_0_35px_rgba(129,140,248,0.35)]'
                : 'border-white/15 hover:border-white/30'
            "
          >
            <!-- Header Row: Icon + Badge -->
            <div class="flex items-center justify-between">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-300">
                <AmenityIcon :icon="feat.icon" size="h-5 w-5" />
              </div>
              <span class="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] font-extrabold tracking-wider text-ivory-100/75 font-mono">
                {{ feat.number }}
              </span>
            </div>

            <!-- Minimal Bold Title -->
            <h3 class="mt-2.5 text-base sm:text-lg font-black text-ivory-50">
              {{ feat.name }}
            </h3>

            <!-- 1-Sentence Description -->
            <p class="mt-1 text-xs sm:text-sm text-ivory-100/75 leading-relaxed">
              {{ feat.description }}
            </p>
          </div>
        </div>

      </div>

      <!-- ----------------------------------------------------------------- -->
      <!-- MOBILE / TABLET VIEW (< 1024px): Pod + 2-Column Responsive Grid -->
      <!-- ----------------------------------------------------------------- -->
      <div class="lg:hidden flex flex-col gap-8">
        
        <!-- Pod Image with all 6 Beacon Dots -->
        <div class="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden border border-white/15 bg-ink-900 shadow-2xl">
          <PodVisual id="pod-interior-1" variant="interior" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent pointer-events-none" />

          <!-- All 6 Pulsing Dots on Mobile Pod -->
          <div
            v-for="feat in features"
            :key="feat.id"
            class="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            :style="{
              top: `${(feat.dotY / 750) * 100}%`,
              left: `${((feat.dotX - 380) / 440) * 100}%`
            }"
          >
            <span class="absolute -inset-2.5 rounded-full bg-indigo-400/30 animate-ping" />
            <span class="relative flex h-6 w-6 items-center justify-center rounded-full border border-indigo-300 bg-indigo-500 text-ivory-50 text-[10px] font-black shadow-[0_0_12px_#818cf8]">
              {{ feat.number }}
            </span>
          </div>

          <div class="absolute bottom-3 left-0 right-0 text-center text-xs font-black tracking-widest text-ivory-100/75 uppercase">
            SLEEPY1 POD ANATOMY
          </div>
        </div>

        <!-- 6 Minimal Cards Grid (2 columns on sm, 1 column on xs) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
          <div
            v-for="feat in features"
            :key="feat.id"
            class="rounded-2xl border border-white/15 bg-[#111424]/95 p-4 sm:p-5 shadow-xl backdrop-blur-xl text-left flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-300">
                  <AmenityIcon :icon="feat.icon" size="h-5 w-5" />
                </div>
                <span class="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] font-extrabold text-ivory-100/75 font-mono">
                  {{ feat.number }}
                </span>
              </div>
              <h3 class="mt-2.5 text-base sm:text-lg font-black text-ivory-50">
                {{ feat.name }}
              </h3>
              <p class="mt-1 text-xs sm:text-sm text-ivory-100/75 leading-relaxed">
                {{ feat.description }}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
