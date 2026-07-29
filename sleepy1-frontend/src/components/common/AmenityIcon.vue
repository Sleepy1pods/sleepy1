<script setup lang="ts">
import type { AmenityIcon } from '@/types/common'

withDefaults(defineProps<{ icon: AmenityIcon; size?: string }>(), { size: 'h-5 w-5' })

const paths: Record<AmenityIcon, string> = {
  wifi: 'M5 13a11 11 0 0114 0M8 16.5a6.5 6.5 0 018 0M12 20h.01M2 9.5a16 16 0 0120 0',
  lighting: 'M9 18h6M10 22h4M12 2a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 2z',
  charging: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
  lock: 'M6 11V8a6 6 0 1112 0v3M5 11h14v10H5V11z',
  ventilation: 'M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8-2l-2 2M6 18l2-2m8 2l-2-2M12 8a4 4 0 100 8 4 4 0 000-8z',
  mattress: 'M3 10h18v9H3v-9zM3 10a4 4 0 014-4h10a4 4 0 014 4M7 14h3',
  noise: 'M11 5L6 9H3v6h3l5 4V5zM16 8a5 5 0 010 8',
  shower: 'M4 12h16M6 12V7a4 4 0 018 0v1M8 16v2m4-2v2m4-2v2',
  climate: 'M12 2v20M5 7l14 10M19 7L5 17M12 12a2 2 0 100 .01',
  housekeeping: 'M5 4l14 14M8 4h8l2 5H6l2-5zM4 12h16l-1.5 8h-13L4 12z',
  display: 'M3 4h18v13H3V4zM8 21h8M12 17v4',
}
</script>

<template>
  <svg :class="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path :d="paths[icon]" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
