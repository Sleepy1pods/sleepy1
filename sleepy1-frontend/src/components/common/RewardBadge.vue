<script setup lang="ts">
withDefaults(defineProps<{ label: string; tone?: 'brand' | 'gold' | 'success' }>(), { tone: 'brand' })

const toneClasses: Record<string, string> = {
  brand: 'bg-brand-400/15 text-brand-300 border-brand-400/30',
  gold: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  success: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
}
</script>

<template>
  <span :class="['inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold', toneClasses[tone]]">
    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 6.6L21 10l-5 4.4L17.5 21 12 17.3 6.5 21 8 14.4 3 10l6.6-1.4L12 2z" /></svg>
    {{ label }}
  </span>
</template>
