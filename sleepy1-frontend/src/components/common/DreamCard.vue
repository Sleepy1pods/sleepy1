<script setup lang="ts">
import { ref } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

/** Opt-in premium card treatment: builds on `.card-surface` and adds a subtle pointer-tilt + glow. */
withDefaults(defineProps<{ glow?: boolean }>(), { glow: true })

const rootEl = ref<HTMLElement | null>(null)
const prefersReducedMotion = useReducedMotion()
const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

function onPointerMove(event: PointerEvent) {
  if (prefersReducedMotion.value || !isFinePointer || !rootEl.value) return
  const rect = rootEl.value.getBoundingClientRect()
  const px = (event.clientX - rect.left) / rect.width - 0.5
  const py = (event.clientY - rect.top) / rect.height - 0.5
  rootEl.value.style.setProperty('--tilt-x', `${(-py * 5).toFixed(2)}deg`)
  rootEl.value.style.setProperty('--tilt-y', `${(px * 5).toFixed(2)}deg`)
  rootEl.value.style.setProperty('--glow-x', `${((px + 0.5) * 100).toFixed(1)}%`)
  rootEl.value.style.setProperty('--glow-y', `${((py + 0.5) * 100).toFixed(1)}%`)
}

function onPointerLeave() {
  rootEl.value?.style.setProperty('--tilt-x', '0deg')
  rootEl.value?.style.setProperty('--tilt-y', '0deg')
}
</script>

<template>
  <div
    ref="rootEl"
    class="dream-card card-surface relative isolate"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div v-if="glow" class="dream-card__glow" aria-hidden="true" />
    <slot />
  </div>
</template>

<style scoped>
.dream-card {
  transform: perspective(900px) translateY(0) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
}
.dream-card:hover {
  transform: perspective(900px) translateY(-4px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
}
.dream-card__glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(139, 155, 251, 0.16), transparent 60%);
  pointer-events: none;
}
.dream-card:hover .dream-card__glow {
  opacity: 1;
}
</style>
