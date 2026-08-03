<script setup lang="ts">
import { ref } from 'vue'
import PodVisual from '@/components/common/PodVisual.vue'
import AmenityIcon from '@/components/common/AmenityIcon.vue'
import type { AmenityIcon as AmenityIconType } from '@/types/common'

// ---------------------------------------------------------------------------
// Center Pod Anatomy — All Features Revealed At Once (No Scroll Trapping)
// Displays The Sleep Pod in the center with 5 minimal feature cards on the LEFT
// and 5 minimal feature cards on the RIGHT, all connected simultaneously by
// high-tech angled SVG circuit lines.
// ---------------------------------------------------------------------------

interface PodFeatureNode {
  id: string
  number: string
  name: string
  description: string
  icon: AmenityIconType
  side: 'left' | 'right'
  // Coordinates on a 1200x900 viewBox where the Center Pod is at X=380..820, Y=225..675
  dotX: number
  dotY: number
  // Target Y coordinate where the line meets the card edge (left edge at X=320 or right edge at X=880)
  cardY: number
}

const features: PodFeatureNode[] = [
  // 5 LEFT-SIDE FEATURES (Cards exactly at Y=135, 255, 375, 495, 615)
  {
    id: 'noise',
    number: '01',
    name: 'Noise Insulation',
    description: 'Acoustic damping panels and door seals mute terminal noise outside.',
    icon: 'noise',
    side: 'left',
    dotX: 470,
    dotY: 210,
    cardY: 135,
  },
  {
    id: 'climate',
    number: '02',
    name: 'Smart Climate Control',
    description: 'Active laminar airflow circulates temperature-regulated air.',
    icon: 'climate',
    side: 'left',
    dotX: 410,
    dotY: 300,
    cardY: 255,
  },
  {
    id: 'lighting',
    number: '03',
    name: 'Ambient Lighting',
    description: 'Automated warm amber lighting mimics natural twilight.',
    icon: 'lighting',
    side: 'left',
    dotX: 490,
    dotY: 390,
    cardY: 375,
  },
  {
    id: 'entertainment',
    number: '04',
    name: 'Entertainment',
    description: 'Immersive display system for streaming your favorite content.',
    icon: 'display',
    side: 'left',
    dotX: 430,
    dotY: 480,
    cardY: 495,
  },
  {
    id: 'charging',
    number: '05',
    name: 'Power Charging',
    description: 'Universal power outlets and fast-charging USB ports.',
    icon: 'charging',
    side: 'left',
    dotX: 510,
    dotY: 560,
    cardY: 615,
  },

  // 5 RIGHT-SIDE FEATURES (Cards perfectly mirrored at Y=135, 255, 375, 495, 615)
  {
    id: 'starview',
    number: '06',
    name: 'Starview & Moonview',
    description: 'Experience the night sky from the comfort of your pod.',
    icon: 'lighting',
    side: 'right',
    dotX: 630,
    dotY: 210,
    cardY: 135,
  },
  {
    id: 'air-quality',
    number: '07',
    name: 'Air Quality Monitoring',
    description: 'Continuous HEPA monitoring ensures a pure breathing environment.',
    icon: 'ventilation',
    side: 'right',
    dotX: 690,
    dotY: 300,
    cardY: 255,
  },
  {
    id: 'mattress',
    number: '08',
    name: 'Comfort Mattress',
    description: 'Ergonomic memory-foam mattress with organic cotton sheets.',
    icon: 'mattress',
    side: 'right',
    dotX: 730,
    dotY: 390,
    cardY: 375,
  },
  {
    id: 'lock',
    number: '09',
    name: 'Secure Locking',
    description: 'Hold your dynamic mobile QR code at the scanner to unlock.',
    icon: 'lock',
    side: 'right',
    dotX: 750,
    dotY: 480,
    cardY: 495,
  },
  {
    id: 'nfc',
    number: '10',
    name: 'NFC card lock',
    description: 'Tap-and-go NFC card access for a keyless entry experience.',
    icon: 'lock',
    side: 'right',
    dotX: 650,
    dotY: 560,
    cardY: 615,
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
  <section class="py-16 sm:py-24">
    <div class="container-page">

      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <p class="eyebrow justify-center">Pod Feature Anatomy</p>
        <h2 class="mt-4 font-display text-3xl font-medium text-ivory-50 sm:text-4xl lg:text-5xl">
          What's included in every pod
        </h2>
        <p class="mt-3 text-sm sm:text-base text-ivory-100/65">
          Designed from the inside out for genuine uninterrupted rest, high-speed productivity, and airport privacy.
        </p>
      </div>

      <!-- ----------------------------------------------------------------- -->
      <!-- DESKTOP VIEW: Center Pod + 5 Left Cards + 5 Right Cards At Once -->
      <!-- ----------------------------------------------------------------- -->
      <div class="relative w-full max-w-7xl mx-auto aspect-[16/10] max-h-[780px] hidden lg:block">
        
        <!-- 1. CENTER SLEEP POD ILLUSTRATION (Centered X=380..820, Y=140..590) -->
        <div class="absolute top-[140px] left-[380px] w-[440px] h-[450px] rounded-3xl overflow-hidden border border-white/15 bg-ink-900">
          <PodVisual id="pod-interior-1" variant="interior" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-ink-950/30 pointer-events-none" />

          <!-- SLEEPY1 POD watermark badge -->
          <div class="absolute top-4 left-0 right-0 text-center pointer-events-none">
            <span class="text-[11px] font-semibold tracking-[0.35em] uppercase text-ivory-100/50">
              SLEEPY1 POD
            </span>
          </div>
        </div>

        <!-- 2. SVG OVERLAY: 10 ANGLED CONNECTING LINES & PULSING BEACON DOTS -->
        <svg
          class="absolute inset-0 h-full w-full pointer-events-none z-20"
          viewBox="0 0 1200 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Draw All Connecting Lines -->
          <g v-for="feat in features" :key="feat.id">
            <!-- Angled Line -->
            <path
              :d="getConnectingPath(feat)"
              stroke="#8b9bfb"
              :stroke-width="activeHoverId === feat.id ? '2.5' : '1.5'"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-all duration-300"
              :class="activeHoverId && activeHoverId !== feat.id ? 'opacity-20' : 'opacity-60'"
            />

            <!-- Core Dot on Pod -->
            <circle
              :cx="feat.dotX"
              :cy="feat.dotY"
              r="4"
              fill="#faf6ef"
            />

            <!-- Terminal Connection Dot at Card Edge -->
            <circle
              :cx="feat.side === 'left' ? 320 : 880"
              :cy="feat.cardY"
              r="4"
              class="fill-brand-300"
            />
          </g>
        </svg>

        <!-- 3. THE 10 MINIMAL FEATURE CARDS (5 Left, 5 Right) -->
        <div
          v-for="feat in features"
          :key="feat.id"
          @mouseenter="activeHoverId = feat.id"
          @mouseleave="activeHoverId = null"
          class="absolute w-[290px] cursor-pointer transition-all duration-300"
          :class="activeHoverId === feat.id ? 'z-50' : 'z-30'"
          :style="{
            left: feat.side === 'left' ? '30px' : '885px',
            top: `${feat.cardY - 28}px`
          }"
        >
          <!-- Main Box (Expands on hover to show description) -->
          <div
            class="relative z-30 rounded-xl border bg-ink-900/98 p-3 transition-all duration-300 overflow-hidden shadow-lg"
            :class="
              activeHoverId && activeHoverId !== feat.id
                ? 'opacity-55 scale-[0.98] border-white/10'
                : activeHoverId === feat.id 
                  ? 'border-brand-400/70 shadow-[0_0_20px_rgba(139,155,251,0.25)] opacity-100 scale-100 bg-ink-950'
                  : 'border-white/10 hover:border-white/20 opacity-100 scale-100'
            "
          >
            <!-- Header Row -->
            <div class="flex items-center gap-3">
              <!-- Icon -->
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-300 transition-colors duration-300"
                   :class="activeHoverId === feat.id ? 'bg-brand-400/10 border-brand-400/30' : ''">
                <AmenityIcon :icon="feat.icon" size="h-4 w-4" />
              </div>
              <!-- Title -->
              <div class="flex-1">
                <h3 class="text-[15px] font-display font-medium tracking-wide text-ivory-50 leading-tight pt-0.5">
                  {{ feat.name }}
                </h3>
              </div>
              <!-- Badge -->
              <span class="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-ivory-100/60 transition-colors duration-300"
                    :class="activeHoverId === feat.id ? 'border-brand-400/30 text-brand-200 bg-brand-400/10' : ''">
                {{ feat.number }}
              </span>
            </div>

            <!-- Expanded Description Area inside the same card -->
            <div
              class="grid transition-all duration-300 ease-in-out"
              :class="activeHoverId === feat.id ? 'grid-rows-[1fr] mt-2.5 pt-2.5 border-t border-white/10 opacity-100' : 'grid-rows-[0fr] mt-0 pt-0 border-t border-transparent opacity-0'"
            >
              <div class="overflow-hidden">
                <p class="text-xs text-ivory-100/80 leading-relaxed">
                  {{ feat.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ----------------------------------------------------------------- -->
      <!-- MOBILE / TABLET VIEW (< 1024px): Pod + 2-Column Responsive Grid -->
      <!-- ----------------------------------------------------------------- -->
      <div class="lg:hidden flex flex-col gap-8">
        
        <!-- Pod Image with all Beacon Dots -->
        <div class="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden border border-white/15 bg-ink-900">
          <PodVisual id="pod-interior-1" variant="interior" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent pointer-events-none" />

          <!-- All Dots on Mobile Pod -->
          <div
            v-for="feat in features"
            :key="feat.id"
            class="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            :style="{
              top: `${((feat.dotY - 140) / 450) * 100}%`,
              left: `${((feat.dotX - 380) / 440) * 100}%`
            }"
          >
            <span class="flex h-6 w-6 items-center justify-center rounded-full border border-brand-300 bg-brand-400 text-ink-950 text-[10px] font-semibold">
              {{ feat.number }}
            </span>
          </div>

          <div class="absolute bottom-3 left-0 right-0 text-center text-xs font-semibold tracking-widest text-ivory-100/60 uppercase">
            SLEEPY1 POD ANATOMY
          </div>
        </div>

        <!-- 10 Minimal Cards Grid (2 columns on sm, 1 column on xs) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mx-auto">
          <div
            v-for="feat in features"
            :key="feat.id"
            @mouseenter="activeHoverId = feat.id"
            @mouseleave="activeHoverId = null"
            @click="activeHoverId = activeHoverId === feat.id ? null : feat.id"
            class="rounded-xl border bg-ink-900/98 p-3 text-left transition-all duration-300 cursor-pointer overflow-hidden"
            :class="
              activeHoverId === feat.id
                ? 'border-brand-400/70 shadow-[0_0_15px_rgba(139,155,251,0.15)] bg-ink-950'
                : 'border-white/10 hover:border-white/20'
            "
          >
            <!-- Header Row -->
            <div class="flex items-center gap-3">
              <!-- Icon -->
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-300 transition-colors duration-300"
                   :class="activeHoverId === feat.id ? 'bg-brand-400/10 border-brand-400/30' : ''">
                <AmenityIcon :icon="feat.icon" size="h-4 w-4" />
              </div>
              <!-- Title -->
              <div class="flex-1">
                <h3 class="text-sm font-medium text-ivory-50 leading-tight">
                  {{ feat.name }}
                </h3>
              </div>
              <!-- Badge -->
              <span class="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-ivory-100/60 transition-colors duration-300"
                    :class="activeHoverId === feat.id ? 'border-brand-400/30 text-brand-200 bg-brand-400/10' : ''">
                {{ feat.number }}
              </span>
            </div>

            <!-- Expanded Description Area inside the same card -->
            <div
              class="grid transition-all duration-300 ease-in-out"
              :class="activeHoverId === feat.id ? 'grid-rows-[1fr] mt-2.5 pt-2.5 border-t border-white/10 opacity-100' : 'grid-rows-[0fr] mt-0 pt-0 border-t border-transparent opacity-0'"
            >
              <div class="overflow-hidden">
                <p class="text-xs text-ivory-100/80 leading-relaxed">
                  {{ feat.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
