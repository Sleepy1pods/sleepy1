<script setup lang="ts">
defineProps<{ steps: { key: string; label: string }[]; currentIndex: number }>()
const emit = defineEmits<{
  (e: 'step-click', index: number): void
}>()
</script>

<template>
  <nav aria-label="Booking progress">
    <ol class="no-scrollbar flex items-center gap-3 overflow-x-auto pb-2">
      <li v-for="(step, i) in steps" :key="step.key" class="flex shrink-0 items-center gap-3">
        <button
          type="button"
          :disabled="i > currentIndex"
          class="group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 transition-all"
          :class="
            i < currentIndex
              ? 'bg-brand-400/15 text-brand-300 hover:bg-brand-400/25 cursor-pointer'
              : i === currentIndex
                ? 'border border-brand-400/60 bg-brand-400/10 text-ivory-50 shadow-soft'
                : 'text-ivory-100/40 cursor-not-allowed'
          "
          :aria-current="i === currentIndex ? 'step' : undefined"
          @click="i <= currentIndex && emit('step-click', i)"
        >
          <div
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors"
            :class="
              i < currentIndex
                ? 'border-brand-400 bg-brand-400 text-ink-950'
                : i === currentIndex
                  ? 'border-brand-400 text-brand-300'
                  : 'border-white/15 text-ivory-100/30'
            "
          >
            <svg v-if="i < currentIndex" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="whitespace-nowrap text-xs font-semibold tracking-wide" :class="i === currentIndex ? 'text-ivory-50' : i < currentIndex ? 'text-brand-200' : 'text-ivory-100/40'">
            {{ step.label }}
          </span>
        </button>
        <span v-if="i < steps.length - 1" class="h-px w-6 bg-gradient-to-r from-white/20 to-white/5" aria-hidden="true" />
      </li>
    </ol>
  </nav>
</template>
