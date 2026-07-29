<script setup lang="ts">
import type { NearbyFacility } from '@/types/location'

defineProps<{ facilities: NearbyFacility[] }>()

const iconByType: Record<string, string> = {
  gate: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  lounge: 'M4 21V10l8-6 8 6v11M9 21v-6h6v6',
  food: 'M6 2v7a3 3 0 006 0V2M9 9v13M18 2v20M15 2v6a3 3 0 003 3',
  security: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z',
  transport: 'M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10M4 16a2 2 0 002 2h12a2 2 0 002-2M4 16h16M7 21h.01M17 21h.01',
  restroom: 'M9 4a2 2 0 104 0 2 2 0 00-4 0zM7 22v-8H5l2-6h8l2 6h-2v8',
}
</script>

<template>
  <ul class="grid gap-3 sm:grid-cols-2">
    <li v-for="facility in facilities" :key="facility.label" class="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-ivory-100/60">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path :d="iconByType[facility.type]" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
      <div>
        <p class="text-sm font-medium text-ivory-50">{{ facility.label }}</p>
        <p class="text-xs text-ivory-100/45">{{ facility.distanceMeters }}m away</p>
      </div>
    </li>
  </ul>
</template>
