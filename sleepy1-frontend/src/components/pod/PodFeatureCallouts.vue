<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface FeatureItem {
  id: string
  number: string
  title: string
  description: string
  icon: 'star' | 'display' | 'control' | 'projector' | 'mobility' | 'mattress'
  side: 'left' | 'right'
  targetX: number
  targetY: number
  topOffset: string // Fixed vertical position for slot
}

const leftFeatures: FeatureItem[] = [
  {
    id: 'star-ceiling',
    number: '01',
    title: 'Star Ceiling',
    description: 'Immersive starry night sky ceiling for deep relaxation and mood enhancement.',
    icon: 'star',
    side: 'left',
    targetX: 38,
    targetY: 10,
    topOffset: 'top-[12px]',
  },
  {
    id: 'entertainment',
    number: '02',
    title: 'Foldable Work Desk',
    description: 'Retractable desk for focused work; stows flush into the wall when not in use.',
    icon: 'display',
    side: 'left',
    targetX: 15,
    targetY: 48,
    topOffset: 'top-[235px]',
  },
  {
    id: 'mobility',
    number: '03',
    title: 'Mobility & Portability',
    description: 'Heavy-duty 360° caster wheels and modular frame engineered for effortless relocation and swift deployment.',
    icon: 'mobility',
    side: 'left',
    targetX: 28,
    targetY: 99,
    topOffset: 'top-[455px]',
  },
]

const rightFeatures: FeatureItem[] = [
  {
    id: 'projector',
    number: '04',
    title: 'HD Projector',
    description: 'Ceiling-mounted HD cinema projection system for immersive movies, entertainment, and ambient visuals.',
    icon: 'projector',
    side: 'right',
    targetX: 51,
    targetY: 17,
    topOffset: 'top-[12px]',
  },
  {
    id: 'smart-control',
    number: '05',
    title: 'Smart Control',
    description: 'Intuitive smart control to effortlessly adjust ambient mood lighting, airflow, and privacy locks.',
    icon: 'control',
    side: 'right',
    targetX: 71,
    targetY: 52,
    topOffset: 'top-[235px]',
  },
  {
    id: 'comfort-mattress',
    number: '06',
    title: 'Comfort Mattress',
    description: 'Hospitality-grade memory foam mattress with ergonomic head pillow and plush fleece blanket.',
    icon: 'mattress',
    side: 'right',
    targetX: 52,
    targetY: 76,
    topOffset: 'top-[455px]',
  },
]

const hoveredId = ref<string | null>(null)
const isDark = ref(false)

const containerRef = ref<HTMLElement | null>(null)
const anchorRefs = ref<Record<string, HTMLElement>>({})
const dotRefs = ref<Record<string, HTMLElement>>({})
const linePaths = ref<Record<string, string>>({})

function setAnchorRef(id: string, el: any) {
  if (el) anchorRefs.value[id] = el as HTMLElement
}

function setDotRef(id: string, el: any) {
  if (el) dotRefs.value[id] = el as HTMLElement
}

function updateTheme() {
  isDark.value = document.documentElement.classList.contains('dark')
}

function calculateFixedLines() {
  if (!containerRef.value) return
  const containerRect = containerRef.value.getBoundingClientRect()

  const all = [...leftFeatures, ...rightFeatures]
  const paths: Record<string, string> = {}

  all.forEach((item) => {
    const anchorEl = anchorRefs.value[item.id]
    const dotEl = dotRefs.value[item.id]
    if (!anchorEl || !dotEl) return

    const anchorRect = anchorEl.getBoundingClientRect()
    const dotRect = dotEl.getBoundingClientRect()

    const x1 = anchorRect.left + anchorRect.width / 2 - containerRect.left
    const y1 = anchorRect.top + anchorRect.height / 2 - containerRect.top
    const x2 = dotRect.left + dotRect.width / 2 - containerRect.left
    const y2 = dotRect.top + dotRect.height / 2 - containerRect.top

    // Clean bent line (horizontal elbow -> angled directly into pod hotspot)
    const bendX = x1 + (x2 - x1) * 0.44
    paths[item.id] = `M ${x1} ${y1} L ${bendX} ${y1} L ${x2} ${y2}`
  })

  linePaths.value = paths
}

let resizeObserver: ResizeObserver | null = null
let themeObserver: MutationObserver | null = null

onMounted(() => {
  updateTheme()
  themeObserver = new MutationObserver(updateTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  nextTick(() => {
    calculateFixedLines()
    setTimeout(calculateFixedLines, 50)
    setTimeout(calculateFixedLines, 150)
    setTimeout(calculateFixedLines, 400)
  })

  window.addEventListener('resize', calculateFixedLines)

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => calculateFixedLines())
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateFixedLines)
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
})

function onHover(id: string) {
  hoveredId.value = id
}

function onLeave() {
  hoveredId.value = null
}
</script>

<template>
  <section class="relative w-full overflow-hidden bg-[var(--bg)] py-16 sm:py-24 select-none text-primary dark:text-white transition-colors duration-300">
    <div class="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
      
      <!-- Section Heading matching both themes -->
      <div class="text-center mb-10 sm:mb-14 lg:mb-16">
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-primary dark:text-white">
          SLEEPY1 POD
        </h2>
      </div>

      <!-- Desktop Interactive Showcase Layout (lg+) with Fixed Geometry -->
      <div ref="containerRef" class="hidden lg:flex items-center justify-between relative min-h-[560px] h-[560px] w-full">
        
        <!-- SVG Fixed Precision Connecting Lines (Z-30: Placed ABOVE Pod Image) -->
        <svg
          class="pointer-events-none absolute inset-0 h-full w-full z-30 overflow-visible"
        >
          <defs>
            <filter id="glow-white" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g v-for="item in [...leftFeatures, ...rightFeatures]" :key="`line-${item.id}`">
            <path
              v-if="linePaths[item.id]"
              :d="linePaths[item.id]"
              fill="none"
              :stroke="hoveredId === item.id ? (isDark ? '#ffffff' : '#0a0a0a') : (isDark ? '#727a9c' : '#94a3b8')"
              :stroke-width="hoveredId === item.id ? 2.2 : 1.4"
              :stroke-opacity="hoveredId === item.id ? 1 : hoveredId !== null ? 0.15 : (isDark ? 0.65 : 0.85)"
              :filter="hoveredId === item.id && isDark ? 'url(#glow-white)' : undefined"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-all duration-300"
            />
          </g>
        </svg>

        <!-- Left Column: 3 FIXED Position Slots (01, 02, 03) -->
        <div class="relative w-[280px] xl:w-[310px] h-[530px] z-20 shrink-0">
          <div
            v-for="item in leftFeatures"
            :key="item.id"
            class="absolute left-0 w-full"
            :class="item.topOffset"
          >
            <!-- Card Container (Fixed top, expands downwards only) -->
            <div
              @mouseenter="onHover(item.id)"
              @mouseleave="onLeave"
              class="relative rounded-2xl border transition-all duration-300 backdrop-blur-md cursor-pointer w-full"
              :class="[
                hoveredId === item.id
                  ? 'border-black/40 dark:border-white/50 bg-white dark:bg-[#161822] shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.9)] z-40 opacity-100'
                  : hoveredId !== null
                    ? 'border-theme/40 bg-surface/40 opacity-30 z-20'
                    : 'border-theme bg-surface/90 hover:border-black/25 dark:hover:border-white/25 opacity-100 z-20 shadow-soft'
              ]"
            >
              <!-- Right Edge Fixed Connection Anchor Dot (Aligned with 68px header center, 100% immovable) -->
              <div
                :ref="(el) => setAnchorRef(item.id, el)"
                class="absolute -right-[7px] top-[34px] -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 z-50 flex items-center justify-center pointer-events-none"
                :class="[
                  hoveredId === item.id
                    ? 'border-black dark:border-white bg-black dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)] dark:shadow-[0_0_12px_rgba(255,255,255,1)] scale-125'
                    : 'border-slate-400 dark:border-[#5a6280] bg-slate-200 dark:bg-[#7882a8]'
                ]"
              >
                <div class="h-1 w-1 rounded-full bg-white dark:bg-black" />
              </div>

              <!-- Card Header Row (Fixed 68px height) -->
              <div class="flex items-center justify-between gap-3 p-3.5 sm:p-4 h-[68px]">
                <div class="flex items-center gap-3 min-w-0">
                  <!-- Icon Box -->
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-theme bg-white dark:bg-[#1a1c26] text-secondary transition-colors"
                    :class="hoveredId === item.id ? 'border-black/30 dark:border-white/30 text-primary dark:text-white bg-black/5 dark:bg-white/10' : ''"
                  >
                    <!-- 01 Star Ceiling -->
                    <svg v-if="item.icon === 'star'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3C12 7.97 7.97 12 3 12C7.97 12 12 16.03 12 21C12 16.03 16.03 12 21 12C16.03 12 12 7.97 12 3Z" />
                    </svg>
                    <!-- 02/03 Mobility & Portability -->
                    <svg v-else-if="item.icon === 'mobility'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke-linecap="round" stroke-linejoin="round" />
                      <line x1="12" y1="22.08" x2="12" y2="12" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <!-- 02/03 Entertainment / Foldable desk -->
                    <svg v-else-if="item.icon === 'display'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <rect x="3" y="4" width="18" height="12" rx="2" stroke-linecap="round" stroke-linejoin="round" />
                      <line x1="8" y1="20" x2="16" y2="20" stroke-linecap="round" />
                      <line x1="12" y1="16" x2="12" y2="20" stroke-linecap="round" />
                    </svg>
                  </div>

                  <span class="font-display text-[14px] sm:text-[15px] font-semibold tracking-tight text-primary dark:text-white leading-snug">
                    {{ item.title }}
                  </span>
                </div>

                <!-- Number Capsule -->
                <span
                  class="flex h-6 px-2.5 shrink-0 items-center justify-center rounded-full border border-theme bg-surface text-[11px] font-mono font-medium text-secondary transition-all"
                  :class="hoveredId === item.id ? 'border-black/30 dark:border-white/30 text-primary dark:text-white bg-black/5 dark:bg-white/10' : ''"
                >
                  {{ item.number }}
                </span>
              </div>

              <!-- Expandable Description (Expands downwards into gap) -->
              <div
                class="overflow-hidden transition-all duration-300 px-4"
                :class="hoveredId === item.id ? 'max-h-28 pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'"
              >
                <div class="h-px w-full bg-black/10 dark:bg-white/10 mb-2.5" />
                <p class="text-xs leading-relaxed text-secondary font-normal">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Pod Column (Pod image + Hotspots) -->
        <div class="relative flex-1 flex items-center justify-center max-w-[460px] mx-4 h-[530px] z-10">
          
          <!-- Pod Image Container -->
          <div class="relative w-full max-w-[340px] rounded-[28px] overflow-hidden border border-theme bg-surface dark:bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <img
              src="/pod2.png"
              alt="Sleepy1 Pod"
              class="w-full h-auto object-cover select-none"
              loading="eager"
            />

            <!-- Hotspot Glowing Interactive Dots directly on the Pod Image (Z-40: On top of lines and image) -->
            <div
              v-for="item in [...leftFeatures, ...rightFeatures]"
              :key="`dot-${item.id}`"
              :ref="(el) => setDotRef(item.id, el)"
              class="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
              :style="{ left: `${item.targetX}%`, top: `${item.targetY}%` }"
            >
              <span class="relative flex h-4 w-4 items-center justify-center">
                <span
                  v-if="hoveredId === item.id"
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-85"
                />
                <span
                  class="relative inline-flex h-2.5 w-2.5 rounded-full border border-white/90 bg-white transition-transform"
                  :class="hoveredId === item.id ? 'scale-150 shadow-[0_0_12px_rgba(255,255,255,1)]' : 'shadow-sm'"
                />
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column: 3 FIXED Position Slots (04, 05, 06) -->
        <div class="relative w-[280px] xl:w-[310px] h-[530px] z-20 shrink-0">
          <div
            v-for="item in rightFeatures"
            :key="item.id"
            class="absolute left-0 w-full"
            :class="item.topOffset"
          >
            <!-- Card Container (Fixed top, expands downwards only) -->
            <div
              @mouseenter="onHover(item.id)"
              @mouseleave="onLeave"
              class="relative rounded-2xl border transition-all duration-300 backdrop-blur-md cursor-pointer w-full"
              :class="[
                hoveredId === item.id
                  ? 'border-black/40 dark:border-white/50 bg-white dark:bg-[#161822] shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.9)] z-40 opacity-100'
                  : hoveredId !== null
                    ? 'border-theme/40 bg-surface/40 opacity-30 z-20'
                    : 'border-theme bg-surface/90 hover:border-black/25 dark:hover:border-white/25 opacity-100 z-20 shadow-soft'
              ]"
            >
              <!-- Left Edge Fixed Connection Anchor Dot (Aligned with 68px header center, 100% immovable) -->
              <div
                :ref="(el) => setAnchorRef(item.id, el)"
                class="absolute -left-[7px] top-[34px] -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 z-50 flex items-center justify-center pointer-events-none"
                :class="[
                  hoveredId === item.id
                    ? 'border-black dark:border-white bg-black dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)] dark:shadow-[0_0_12px_rgba(255,255,255,1)] scale-125'
                    : 'border-slate-400 dark:border-[#5a6280] bg-slate-200 dark:bg-[#7882a8]'
                ]"
              >
                <div class="h-1 w-1 rounded-full bg-white dark:bg-black" />
              </div>

              <!-- Card Header Row (Fixed 68px height) -->
              <div class="flex items-center justify-between gap-3 p-3.5 sm:p-4 h-[68px]">
                <div class="flex items-center gap-3 min-w-0">
                  <!-- Icon Box -->
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-theme bg-white dark:bg-[#1a1c26] text-secondary transition-colors"
                    :class="hoveredId === item.id ? 'border-black/30 dark:border-white/30 text-primary dark:text-white bg-black/5 dark:bg-white/10' : ''"
                  >
                    <!-- 04 HD Projector -->
                    <svg v-if="item.icon === 'projector'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
                      <circle cx="9" cy="12" r="2.5" />
                      <path stroke-linecap="round" d="M16 10h2m-2 4h1" />
                    </svg>
                    <!-- 05 Smart Control -->
                    <svg v-else-if="item.icon === 'control'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
                      <circle cx="4" cy="12" r="2" fill="currentColor" />
                      <circle cx="12" cy="10" r="2" fill="currentColor" />
                      <circle cx="20" cy="14" r="2" fill="currentColor" />
                    </svg>
                    <!-- 06 Mattress -->
                    <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <rect x="3" y="6" width="18" height="12" rx="2" stroke-linecap="round" stroke-linejoin="round" />
                      <line x1="3" y1="12" x2="21" y2="12" stroke-linecap="round" />
                      <line x1="7" y1="9" x2="11" y2="9" stroke-linecap="round" />
                    </svg>
                  </div>

                  <span class="font-display text-[14px] sm:text-[15px] font-semibold tracking-tight text-primary dark:text-white leading-snug">
                    {{ item.title }}
                  </span>
                </div>

                <!-- Number Capsule -->
                <span
                  class="flex h-6 px-2.5 shrink-0 items-center justify-center rounded-full border border-theme bg-surface text-[11px] font-mono font-medium text-secondary transition-all"
                  :class="hoveredId === item.id ? 'border-black/30 dark:border-white/30 text-primary dark:text-white bg-black/5 dark:bg-white/10' : ''"
                >
                  {{ item.number }}
                </span>
              </div>

              <!-- Expandable Description (Expands downwards into gap) -->
              <div
                class="overflow-hidden transition-all duration-300 px-4"
                :class="hoveredId === item.id ? 'max-h-28 pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'"
              >
                <div class="h-px w-full bg-black/10 dark:bg-white/10 mb-2.5" />
                <p class="text-xs leading-relaxed text-secondary font-normal">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Mobile / Tablet Presentation (< lg) -->
      <div class="lg:hidden flex flex-col gap-6">
        <!-- Pod Image with interactive hotspots -->
        <div class="relative mx-auto w-full max-w-[320px] rounded-2xl overflow-hidden border border-theme bg-surface dark:bg-zinc-950 shadow-2xl">
          <img
            src="/pod2.png"
            alt="Sleepy1 Pod"
            class="w-full h-auto object-cover select-none"
          />
          <button
            v-for="item in [...leftFeatures, ...rightFeatures]"
            :key="item.id"
            type="button"
            @click="hoveredId = hoveredId === item.id ? null : item.id"
            class="absolute -translate-x-1/2 -translate-y-1/2 p-2 z-30 focus:outline-none"
            :style="{ left: `${item.targetX}%`, top: `${item.targetY}%` }"
          >
            <span class="relative flex h-5 w-5 items-center justify-center">
              <span
                v-if="hoveredId === item.id"
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-85"
              />
              <span
                class="relative inline-flex h-3 w-3 rounded-full border border-white bg-white"
                :class="hoveredId === item.id ? 'shadow-[0_0_10px_rgba(255,255,255,1)]' : 'opacity-80'"
              />
            </span>
          </button>
        </div>

        <!-- Cards List -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="item in [...leftFeatures, ...rightFeatures]"
            :key="item.id"
            type="button"
            @click="hoveredId = hoveredId === item.id ? null : item.id"
            class="text-left rounded-xl border p-4 transition-all duration-200 backdrop-blur-md"
            :class="[
              hoveredId === item.id
                ? 'border-black/40 dark:border-white/50 bg-white dark:bg-[#161822] text-primary dark:text-white shadow-lg'
                : hoveredId !== null
                  ? 'border-theme/40 bg-surface/40 opacity-40 text-muted'
                  : 'border-theme bg-surface/90 text-secondary'
            ]"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-display font-semibold text-sm text-primary dark:text-white">{{ item.title }}</span>
              <span class="font-mono text-xs text-secondary">#{{ item.number }}</span>
            </div>
            <p v-if="hoveredId === item.id" class="mt-2 text-xs leading-relaxed text-secondary">
              {{ item.description }}
            </p>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>
