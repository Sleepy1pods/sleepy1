<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBodyScrollLock } from '@/composables/useBodyScrollLock'
import { useFocusTrap } from '@/composables/useFocusTrap'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    maxWidth?: string
  }>(),
  { maxWidth: 'max-w-lg' },
)

const emit = defineEmits<{ close: [] }>()

const dialogRef = ref<HTMLElement | null>(null)
const isOpen = ref(props.open)
const { activate, deactivate } = useFocusTrap(dialogRef)
useBodyScrollLock(isOpen)

watch(
  () => props.open,
  (value) => {
    isOpen.value = value
    if (value) activate()
    else deactivate()
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4" @keydown="onKeydown">
        <div class="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" @click="emit('close')" />
        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          class="relative w-full max-h-[85vh] flex flex-col card-surface p-5 sm:p-7 shadow-premium animate-fade-up"
          :class="maxWidth"
        >
          <div class="mb-4 flex shrink-0 items-start justify-between gap-4 border-b border-white/10 pb-3">
            <h2 class="text-xl font-semibold text-ivory-50">{{ title }}</h2>
            <button
              type="button"
              aria-label="Close dialog"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ivory-100/60 transition-colors hover:bg-white/10 hover:text-ivory-100"
              @click="emit('close')"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="no-scrollbar flex-1 overflow-y-auto pr-1">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
