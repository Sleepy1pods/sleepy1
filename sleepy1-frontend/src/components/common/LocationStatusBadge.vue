<script setup lang="ts">
import { computed } from 'vue'
import type { LocationDeploymentStatus } from '@/data/environments'

const props = defineProps<{ status: LocationDeploymentStatus }>()

const config: Record<LocationDeploymentStatus, { label: string; classes: string; dotClass: string; ping: boolean }> = {
  current: {
    label: 'Current Location',
    classes: 'bg-emerald-950/90 text-emerald-300 border-emerald-400/50 shadow-[0_0_12px_rgba(52,211,153,0.35)]',
    dotClass: 'bg-emerald-400',
    ping: true,
  },
  planned: {
    label: 'Coming Soon',
    classes: 'bg-brand-950/90 text-brand-200 border-brand-400/60 shadow-[0_0_14px_rgba(139,155,251,0.4)] ring-1 ring-brand-400/30',
    dotClass: 'bg-brand-300',
    ping: true,
  },
  suitable: {
    label: 'Suitable Environment',
    classes: 'bg-ink-950/90 text-ivory-100/80 border-white/25',
    dotClass: 'bg-ivory-100/60',
    ping: false,
  },
}

const current = computed(() => config[props.status] ?? config.planned)
</script>

<template>
  <span :class="['inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-all', current.classes]">
    <span class="relative flex h-2 w-2">
      <span v-if="current.ping" class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" :class="current.dotClass" />
      <span class="relative inline-flex h-2 w-2 rounded-full" :class="current.dotClass" />
    </span>
    {{ current.label }}
  </span>
</template>
