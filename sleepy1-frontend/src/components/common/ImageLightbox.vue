<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { GalleryImage } from '@/types/common'
import { useFocusTrap } from '@/composables/useFocusTrap'
import PodVisual from './PodVisual.vue'

const props = defineProps<{ images: GalleryImage[]; index: number }>()
const emit = defineEmits<{ close: []; 'update:index': [value: number] }>()

const current = computed(() => props.images[props.index])

const rootEl = ref<HTMLElement | null>(null)
const { activate, deactivate } = useFocusTrap(rootEl)
onMounted(activate)
onUnmounted(deactivate)

function next() {
  emit('update:index', (props.index + 1) % props.images.length)
}
function prev() {
  emit('update:index', (props.index - 1 + props.images.length) % props.images.length)
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft') prev()
}
</script>

<template>
  <Teleport to="body">
    <div
      ref="rootEl"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-950/95 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      tabindex="-1"
      @keydown="onKeydown"
      @click.self="emit('close')"
    >
      <button type="button" aria-label="Close gallery" class="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ivory-100 hover:bg-white/20" @click="emit('close')">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
      </button>
      <div class="relative w-full max-w-3xl">
        <div class="aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <PodVisual :id="current.src" class="h-full w-full" />
        </div>
        <p v-if="current.caption" class="mt-4 text-center text-sm text-ivory-100/60">{{ current.caption }}</p>
        <button type="button" aria-label="Previous image" class="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-ink-950/60 text-ivory-100 hover:bg-ink-950/90" @click="prev">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <button type="button" aria-label="Next image" class="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-ink-950/60 text-ivory-100 hover:bg-ink-950/90" @click="next">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>
