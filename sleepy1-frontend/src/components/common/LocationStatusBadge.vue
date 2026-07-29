<script setup lang="ts">
import { computed } from 'vue'
import type { LocationDeploymentStatus } from '@/data/environments'

const props = defineProps<{ status: LocationDeploymentStatus }>()

const config: Record<LocationDeploymentStatus, { label: string; classes: string }> = {
  current: { label: 'Current Location', classes: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30' },
  planned: { label: 'Coming Soon', classes: 'bg-brand-400/15 text-brand-300 border-brand-400/30' },
  suitable: { label: 'Suitable Environment', classes: 'bg-white/8 text-ivory-100/60 border-white/15' },
}

const current = computed(() => config[props.status])
</script>

<template>
  <span :class="['inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur', current.classes]">
    <span class="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
    {{ current.label }}
  </span>
</template>
