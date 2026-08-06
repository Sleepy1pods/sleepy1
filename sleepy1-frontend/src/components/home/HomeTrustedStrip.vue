<script setup lang="ts">
import { computed, ref } from 'vue'
import { locations } from '@/data/locations'

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
