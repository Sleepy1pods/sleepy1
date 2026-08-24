<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { journeyTimeline } from '@/data/statistics'

const journeyItems = journeyTimeline.map((item, index) => ({
  ...item,
  stepIndex: String(index + 1).padStart(2, '0'),
  displayOrder: index + 1,
}))

const timelineRef = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])
const scrollProgress = ref(0)
const activeIndex = ref(0)

const setItemRef = (el: any, index: number) => {
  if (el) {
    itemRefs.value[index] = el as HTMLElement
  }
}

const updateScrollProgress = () => {
  if (!timelineRef.value) return
  const rect = timelineRef.value.getBoundingClientRect()
  const winH = window.innerHeight

  const startY = winH * 0.70
  const endY = winH * 0.30
  const totalRange = rect.height + (startY - endY)
  const currentScrolled = startY - rect.top

  let p = currentScrolled / totalRange
  if (p < 0) p = 0
  if (p > 1) p = 1
  scrollProgress.value = p

  const triggerLine = winH * 0.65
  let currentActive = 0
  itemRefs.value.forEach((el, idx) => {
    if (el) {
      const itemRect = el.getBoundingClientRect()
      if (itemRect.top <= triggerLine) {
        currentActive = idx
      }
    }
  })
  activeIndex.value = currentActive
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  window.addEventListener('resize', updateScrollProgress, { passive: true })
  setTimeout(updateScrollProgress, 50)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener('resize', updateScrollProgress)
})
</script>

<template>
  <div ref="timelineRef" class="relative mx-auto mt-10 max-w-4xl pb-4">
    <!-- Header Indicator / Direction Pill -->
    <div class="mb-8 flex items-center justify-center gap-2">
      <span class="inline-flex items-center gap-2 rounded-full border border-theme bg-surface px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        2025 Inception &rarr; 2027 Horizon
      </span>
    </div>

    <!-- Base Timeline Spine Line -->
    <div
      class="pointer-events-none absolute bottom-6 left-4 top-16 w-px -translate-x-1/2 bg-black/10 dark:bg-white/10 sm:left-28"
      aria-hidden="true"
    />

    <!-- Scroll-Driven Animated Active Progress Line with Glowing Gradient -->
    <div
      class="pointer-events-none absolute left-4 top-16 w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-300 via-brand-400 to-brand-500 shadow-[0_0_14px_rgba(139,155,251,0.9)] transition-all duration-150 ease-out sm:left-28"
      :style="{ height: `${Math.round(scrollProgress * 100)}%`, maxHeight: 'calc(100% - 72px)' }"
      aria-hidden="true"
    />

    <!-- Timeline Entries (2025 up to 2027) -->
    <div class="space-y-6 sm:space-y-8">
      <div
        v-for="(item, index) in journeyItems"
        :key="item.year + item.title"
        :ref="(el) => setItemRef(el, index)"
        class="group relative flex items-start transition-all duration-300"
      >
        <!-- Left Column: Year & Badge (Desktop only) -->
        <div class="hidden w-28 shrink-0 pr-8 text-right sm:block">
          <p
            class="font-display text-2xl transition-all duration-300"
            :class="[
              index === activeIndex
                ? 'scale-105 font-bold text-brand-400 dark:text-brand-300'
                : 'font-semibold text-muted',
            ]"
          >
            {{ item.year }}
          </p>
          <p class="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            {{ item.badge || `Stage ${item.stepIndex}` }}
          </p>
        </div>

        <!-- Node on the Spine with Glowing Accent -->
        <div
          class="absolute left-4 top-5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border transition-all duration-300 sm:left-28"
          :class="[
            index === activeIndex
              ? 'scale-125 border-brand-300 bg-brand-400/25 shadow-[0_0_18px_rgba(139,155,251,0.7)]'
              : index < activeIndex
                ? 'border-brand-300/60 bg-brand-400/10'
                : 'border-black/20 dark:border-white/20 bg-surface',
          ]"
        >
          <span
            class="h-2 w-2 rounded-full transition-colors"
            :class="index <= activeIndex ? 'bg-brand-400 dark:bg-brand-300 shadow-[0_0_8px_#8B9BFB]' : 'bg-muted/40'"
          />
        </div>

        <!-- Right Column: Card Content -->
        <div
          class="card-surface relative ml-10 flex-1 overflow-hidden p-6 transition-all duration-300 sm:ml-12 sm:p-7"
          :class="[
            index === activeIndex
              ? '-translate-y-1 border-brand-400/40 dark:border-brand-300/40 shadow-lg shadow-brand-500/5'
              : 'opacity-90',
          ]"
        >
          <!-- Subtle Watermark Year in Top Right -->
          <span
            class="pointer-events-none absolute -top-2 right-6 select-none font-display text-5xl font-black tracking-tighter opacity-10 sm:text-6xl text-primary"
            aria-hidden="true"
          >
            {{ item.year }}
          </span>

          <!-- Mobile-only Year & Badge Header -->
          <div class="mb-3 flex items-center justify-between sm:hidden">
            <span class="font-display text-lg font-bold text-primary">
              {{ item.year }}
            </span>
            <span class="rounded-full border border-theme bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {{ item.badge || `Stage ${item.stepIndex}` }}
            </span>
          </div>

          <div class="relative z-10">
            <div class="flex items-center gap-2">
              <span v-if="item.subtitle" class="text-xs font-semibold uppercase tracking-wider text-secondary">
                {{ item.subtitle }}
              </span>
            </div>

            <h3 class="mt-1 font-display text-xl font-bold text-primary">
              {{ item.title }}
            </h3>

            <p class="mt-2.5 text-sm leading-relaxed text-secondary">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
