<script setup lang="ts">
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

const iconByType: Record<string, string> = {
  success: 'M5 13l4 4L19 7',
  error: 'M6 6l12 12M18 6L6 18',
  warning: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z',
  info: 'M12 8h.01M11 12h1v4h1',
}

const colorByType: Record<string, string> = {
  success: 'border-emerald-400/30 text-emerald-300',
  error: 'border-rose-400/30 text-rose-300',
  warning: 'border-amber-400/30 text-amber-300',
  info: 'border-brand-400/30 text-brand-300',
}
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4 sm:items-end sm:right-4 sm:left-auto">
      <TransitionGroup name="toast">
        <div
          v-for="toast in ui.toasts"
          :key="toast.id"
          class="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border bg-ink-800/95 p-4 shadow-premium backdrop-blur-xl"
          :class="colorByType[toast.type]"
          role="status"
        >
          <svg class="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path :d="iconByType[toast.type]" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="flex-1">
            <p class="text-sm font-semibold text-ivory-50">{{ toast.title }}</p>
            <p v-if="toast.description" class="mt-0.5 text-xs text-ivory-100/60">{{ toast.description }}</p>
          </div>
          <button type="button" aria-label="Dismiss notification" class="text-ivory-100/40 hover:text-ivory-100" @click="ui.dismissToast(toast.id)">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
.toast-enter-from { opacity: 0; transform: translateY(-12px); }
.toast-leave-to { opacity: 0; transform: translateX(12px); }
</style>
