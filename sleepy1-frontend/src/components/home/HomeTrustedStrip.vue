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
  <section class="py-10">
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
        class="group relative block w-full max-w-3xl overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-black shadow-premium transition-all duration-300 hover:border-white/30 hover:shadow-[0_12px_36px_rgba(0,0,0,0.25)] hover:-translate-y-1"
      >
        <div class="aspect-[21/9] w-full overflow-hidden sm:aspect-[21/8]">
          <img
            :src="loc.heroImage || '/iiit_dharwad.png'"
            :alt="loc.name"
            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
        <!-- Dark gradient back shadow under the text so image remains vibrant and 100% visible -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>
        
        <div class="absolute bottom-0 left-0 p-6 sm:p-8 w-full z-10">
          <div class="flex items-end justify-between">
            <div>
              <div class="mb-3 flex items-center gap-2">
                <span class="rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-sm">
                  {{ loc.hubType || 'Institute' }}
                </span>
                <span v-if="loc.availablePods > 0" class="flex items-center gap-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md bg-black/50 px-2.5 py-1 rounded-full border border-emerald-400/30 shadow-sm">
                  <span class="relative flex h-2 w-2">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                  </span>
                  Available
                </span>
              </div>
              <h3 class="font-display text-2xl font-bold text-white sm:text-3xl drop-shadow-md">
                {{ loc.name }}
              </h3>
              <p class="mt-1 text-sm text-white/85 drop-shadow-sm font-medium">
                {{ loc.city }}, {{ loc.state }}
              </p>
            </div>
            
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:text-black group-hover:shadow-[0_0_25px_rgba(255,255,255,0.75)] group-hover:scale-105 group-active:bg-white group-active:border-white group-active:text-black hover:bg-white hover:border-white hover:text-black active:bg-white active:border-white active:text-black shrink-0">
              <span class="text-xl leading-none transition-transform duration-300 -rotate-45 font-bold">→</span>
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
