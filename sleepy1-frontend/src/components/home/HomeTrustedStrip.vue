<script setup lang="ts">
import { computed, ref } from 'vue'
import { locations } from '@/data/locations'

const MIN_LOCATIONS_FOR_MARQUEE = 6

const isMarquee = computed(() => locations.length >= MIN_LOCATIONS_FOR_MARQUEE)

const repeatedLocations = Array(15).fill(locations).flat()
const marqueeSets = computed(() => [repeatedLocations, repeatedLocations, repeatedLocations])

const marqueeOffset = ref(0)
const isDragging = ref(false)
let dragStartX = 0
let dragStartOffset = 0

function handlePointerDown(event: PointerEvent) {
  if (event.pointerType === 'mouse') return

  isDragging.value = true
  dragStartX = event.clientX
  dragStartOffset = marqueeOffset.value
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function handlePointerMove(event: PointerEvent) {
  if (!isDragging.value) return

  marqueeOffset.value = dragStartOffset + event.clientX - dragStartX
}

function handlePointerEnd(event: PointerEvent) {
  if (!isDragging.value) return

  isDragging.value = false
  ;(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId)
}
</script>

<template>
  <section class="border-y border-white/8 py-10">
    <div class="container-page mb-5 flex items-center justify-between">
      <p class="eyebrow">Currently at</p>
      <router-link to="/locations" class="link-underline text-xs font-medium text-ivory-100/60 hover:text-ivory-50">View all locations →</router-link>
    </div>
    <div
      v-if="isMarquee"
      class="marquee-mask no-scrollbar overflow-hidden"
      aria-label="Sleepy1 locations"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerEnd"
      @pointercancel="handlePointerEnd"
      @pointerleave="handlePointerEnd"
    >
      <div
        class="marquee-track flex w-max select-none gap-10"
        :class="{ 'is-dragging': isDragging }"
        :style="{ '--drag-offset': `${marqueeOffset}px` }"
        aria-hidden="true"
      >
        <template v-for="(set, setIndex) in marqueeSets" :key="setIndex">
          <span
            v-for="loc in set"
            :key="`${loc.id}-${setIndex}`"
            class="whitespace-nowrap text-lg font-medium text-ivory-100/55"
          >
            {{ loc.name }}
          </span>
        </template>
      </div>
    </div>
    <div v-else class="container-page flex justify-center py-4" aria-label="Sleepy1 locations">
      <router-link
        v-for="loc in locations"
        :key="loc.id"
        :to="`/locations/${loc.slug}`"
        class="group relative block w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-premium transition-all duration-300 hover:border-brand-500/30 hover:shadow-[0_8px_30px_rgba(139,155,251,0.12)] hover:-translate-y-1"
      >
        <div class="aspect-[21/9] w-full overflow-hidden sm:aspect-[21/8]">
          <img
            :src="loc.heroImage || '/iiit_dharwad.png'"
            :alt="loc.name"
            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent opacity-95"></div>
        
        <div class="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
          <div class="flex items-end justify-between">
            <div>
              <div class="mb-3 flex items-center gap-2">
                <span class="rounded-full bg-brand-500/20 border border-brand-400/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-300 backdrop-blur-md">
                  {{ loc.hubType || 'University' }}
                </span>
                <span v-if="loc.availablePods > 0" class="flex items-center gap-1.5 text-xs font-medium text-emerald-400 backdrop-blur-md bg-ink-950/30 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span class="relative flex h-2 w-2">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Available
                </span>
              </div>
              <h3 class="font-display text-2xl font-semibold text-ivory-50 sm:text-3xl">
                {{ loc.name }}
              </h3>
              <p class="mt-1 text-sm text-ivory-100/70">
                {{ loc.city }}, {{ loc.state }}
              </p>
            </div>
            
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ivory-50 backdrop-blur-md transition-all duration-300 group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:text-ink-950 group-hover:shadow-[0_0_20px_rgba(139,155,251,0.4)] shrink-0">
              <span class="text-xl leading-none transition-transform duration-300 group-hover:-rotate-45">→</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.marquee-mask {
  cursor: grab;
  touch-action: pan-y;
}

.marquee-mask:active {
  cursor: grabbing;
}

.marquee-track {
  --drag-offset: 0px;
  animation: marquee 36s linear infinite;
  transform: translateX(var(--drag-offset));
  will-change: transform;
}

.marquee-mask:hover .marquee-track,
.marquee-track.is-dragging {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(var(--drag-offset)); }
  to { transform: translateX(calc(-33.333% + var(--drag-offset))); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
