<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    status: 'upcoming' | 'active' | 'completed' | 'cancelled' | 'high' | 'medium' | 'low' | 'full'
  }>(),
  {},
)

const config: Record<string, { label: string; classes: string }> = {
  upcoming: { label: 'Upcoming', classes: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30' },
  active: { label: 'Active', classes: 'bg-brand-400/15 text-brand-300 border-brand-400/30' },
  completed: { label: 'Completed', classes: 'bg-white/10 text-ivory-100/70 border-white/15' },
  cancelled: { label: 'Cancelled', classes: 'bg-rose-400/15 text-rose-300 border-rose-400/30' },
  high: { label: 'High Availability', classes: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30' },
  medium: { label: 'Limited Availability', classes: 'bg-amber-400/15 text-amber-300 border-amber-400/30' },
  low: { label: 'Few Pods Left', classes: 'bg-orange-400/15 text-orange-300 border-orange-400/30' },
  full: { label: 'Fully Booked', classes: 'bg-rose-400/15 text-rose-300 border-rose-400/30' },
}

const current = computed(() => config[props.status] ?? config.completed)
</script>

<template>
  <span :class="['inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold', current.classes]">
    <span class="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
    {{ current.label }}
  </span>
</template>
