<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'card' | 'line' | 'circle'
    count?: number
  }>(),
  { variant: 'card', count: 1 },
)
</script>

<template>
  <div class="grid gap-5" :class="variant === 'card' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''">
    <div
      v-for="n in count"
      :key="n"
      class="overflow-hidden rounded-2xl border border-white/8 bg-ink-800/50"
      :class="variant === 'circle' ? 'h-16 w-16 rounded-full' : variant === 'line' ? 'h-4 w-full rounded-full' : 'h-72 w-full'"
    >
      <div class="h-full w-full animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  </div>
</template>
