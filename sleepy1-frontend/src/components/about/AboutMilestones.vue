<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { milestones } from '@/data/statistics'

const milestoneDetails = milestones.map((milestone, index) => ({
  ...milestone,
  step: String(index + 1).padStart(2, '0'),
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

  // Start filling line when timeline top reaches 65% of viewport height
  // Finish filling line when timeline bottom reaches 35% of viewport height
  const startY = winH * 0.65
  const endY = winH * 0.35
  const totalRange = rect.height + (startY - endY)
  const currentScrolled = startY - rect.top

  let p = currentScrolled / totalRange
  if (p < 0) p = 0
  if (p > 1) p = 1
  scrollProgress.value = p

  // Determine active item based on scroll position relative to trigger line
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
  <div ref="timelineRef" class="relative mx-auto mt-14 max-w-4xl pb-4">
    <!-- Base Timeline Spine Line -->
    <div
      class="pointer-events-none absolute bottom-6 left-4 top-6 w-px -translate-x-1/2 bg-white/10 sm:left-28"
      aria-hidden="true"
    />

    <!-- Scroll-Driven Animated Active Progress Line -->
    <div
      class="pointer-events-none absolute left-4 top-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-300 via-brand-400 to-brand-500 shadow-[0_0_10px_rgba(139,155,251,0.7)] transition-all duration-150 ease-out sm:left-28"
      :style="{ height: `${Math.round(scrollProgress * 100)}%`, maxHeight: 'calc(100% - 48px)' }"
      aria-hidden="true"
    />

    <!-- Timeline Entries -->
    <div class="space-y-8 sm:space-y-10">
      <div
        v-for="(m, index) in milestoneDetails"
        :key="m.year"
        :ref="(el) => setItemRef(el, index)"
        class="group relative flex items-start transition-all duration-500"
      >
        <!-- Left Column: Year & Step (Desktop only) -->
        <div class="hidden w-28 shrink-0 pr-8 text-right sm:block">
          <p
            class="font-display text-2xl transition-all duration-300"
            :class="[
              index === activeIndex
                ? 'scale-105 font-bold text-brand-300'
                : index < activeIndex
                  ? 'font-bold text-ivory-50'
                  : 'font-semibold text-ivory-100/40',
            ]"
          >
            {{ m.year }}
          </p>
          <p class="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ivory-100/40">
            Phase {{ m.step }}
          </p>
        </div>

        <!-- Node on the Spine -->
        <div
          class="absolute left-4 top-5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border transition-all duration-300 sm:left-28"
          :class="[
            index === activeIndex
              ? 'scale-125 border-brand-300 bg-brand-400/20 shadow-[0_0_16px_rgba(139,155,251,0.6)]'
              : index < activeIndex
                ? 'border-brand-300/60 bg-brand-400/10'
                : 'border-white/20 bg-ink-950',
          ]"
        >
          <span
            class="h-1.5 w-1.5 rounded-full transition-colors"
            :class="index <= activeIndex ? 'bg-brand-300' : 'bg-white/40'"
          />
        </div>

        <!-- Right Column: Card Content -->
        <div
          class="relative ml-10 flex-1 overflow-hidden rounded-3xl border p-6 transition-all duration-500 sm:ml-12 sm:p-7"
          :class="[
            index === activeIndex
              ? '-translate-y-1 border-brand-300/40 bg-white/[0.045] shadow-[0_0_30px_rgba(139,155,251,0.15)]'
              : index < activeIndex
                ? 'border-white/15 bg-white/[0.025] opacity-90'
                : 'border-white/10 bg-white/[0.015] opacity-60',
          ]"
        >
          <!-- Subtle Watermark Step Number in Top Right -->
          <span
            class="pointer-events-none absolute -top-1 right-6 select-none font-display text-5xl font-black tracking-tighter transition-all duration-500 sm:text-6xl"
            :class="index === activeIndex ? 'scale-105 text-brand-300/15' : 'text-white/[0.03]'"
            aria-hidden="true"
          >
            {{ m.step }}
          </span>

          <!-- Mobile-only Year & Phase Header -->
          <div class="mb-3 flex items-center justify-between sm:hidden">
            <span
              class="font-display text-lg font-bold"
              :class="index === activeIndex ? 'text-brand-300' : 'text-ivory-50'"
            >
              {{ m.year }}
            </span>
            <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">
              Phase {{ m.step }}
            </span>
          </div>

          <div class="relative z-10">
            <h3
              class="font-display text-xl font-bold transition-colors"
              :class="index === activeIndex ? 'text-brand-200' : 'text-ivory-50'"
            >
              {{ m.title }}
            </h3>
            <p
              class="mt-2 text-sm leading-relaxed transition-colors"
              :class="index === activeIndex ? 'text-ivory-100/80' : 'text-ivory-100/60'"
            >
              {{ m.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
