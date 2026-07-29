<script setup lang="ts">
defineProps<{ steps: { key: string; label: string }[]; currentIndex: number }>()
</script>

<template>
  <nav aria-label="Booking progress">
    <ol class="no-scrollbar flex gap-2 overflow-x-auto pb-2">
    <li v-for="(step, i) in steps" :key="step.key" class="flex shrink-0 items-center gap-2">
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors"
        :class="
          i < currentIndex
            ? 'border-brand-400 bg-brand-400 text-ink-950'
            : i === currentIndex
              ? 'border-brand-400 text-brand-300'
              : 'border-white/15 text-ivory-100/40'
        "
        :aria-current="i === currentIndex ? 'step' : undefined"
      >
        <svg v-if="i < currentIndex" class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <span v-else>{{ i + 1 }}</span>
      </div>
      <span class="whitespace-nowrap text-xs font-medium" :class="i === currentIndex ? 'text-ivory-50' : 'text-ivory-100/40'">
        {{ step.label }}
      </span>
      <span v-if="i < steps.length - 1" class="mx-1 h-px w-6 bg-white/10" aria-hidden="true" />
    </li>
    </ol>
  </nav>
</template>
