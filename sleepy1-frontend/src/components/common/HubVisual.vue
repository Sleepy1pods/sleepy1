<script setup lang="ts">
import { computed } from 'vue'
import type { HubType } from '@/types/location'
import { seedFromId } from '@/utils/visualSeed'

const props = withDefaults(
  defineProps<{
    hubType?: HubType
    id?: string
    rounded?: string
  }>(),
  {
    hubType: 'university',
    id: 'hub-1',
    rounded: 'rounded-2xl',
  },
)

const seed = computed(() => seedFromId(props.id))
const hueShift = computed(() => (seed.value % 20) - 10)
const gradId = computed(() => `hub-grad-${props.id}`)

const columnCount = computed(() => {
  switch (props.hubType) {
    case 'corporate': return 7
    case 'railway': return 5
    case 'bus-terminal': return 4
    case 'mall': return 8
    case 'business-district': return 5
    case 'hospital': return 3
    case 'university': return 5
    case 'convention-centre': return 8
    case 'tourist': return 4
    case 'highway-rest-stop': return 3
    default: return 6
  }
})

const columns = computed(() =>
  Array.from({ length: columnCount.value }, (_, i) => 30 + i * (340 / (columnCount.value - 1 || 1))),
)

const archHeight = computed(() =>
  props.hubType === 'mall' || props.hubType === 'convention-centre' ? 90 : 60,
)
</script>

<template>
  <div :class="['relative overflow-hidden', rounded]" role="img" :aria-label="`Illustration representing a ${hubType.replaceAll('-', ' ')} hub`">
    <svg viewBox="0 0 400 260" class="h-full w-full" :style="{ filter: `hue-rotate(${hueShift}deg)` }" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient :id="gradId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0b0d12" />
          <stop offset="100%" stop-color="#1a1d27" />
        </linearGradient>
        <linearGradient id="hub-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#242836" />
          <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" :fill="`url(#${gradId})`" />
      <rect width="400" height="140" fill="url(#hub-sky)" />

      <!-- Roofline arch -->
      <path
        :d="`M20 ${170 - archHeight} Q200 ${170 - archHeight - 60} 380 ${170 - archHeight}`"
        fill="none"
        stroke="#faf6ef"
        stroke-opacity="0.25"
        stroke-width="2"
      />

      <!-- Columns / structural rhythm -->
      <g v-for="(x, i) in columns" :key="i">
        <rect :x="x - 3" y="170" width="6" height="70" fill="#faf6ef" opacity="0.2" />
        <circle :cx="x" cy="168" r="3.5" fill="#7182f0" opacity="0.5" />
      </g>

      <!-- Ground line -->
      <rect x="0" y="240" width="400" height="2" fill="#faf6ef" opacity="0.12" />

      <!-- Distant figures for scale/life -->
      <g opacity="0.4">
        <circle cx="140" cy="228" r="5" fill="#7182f0" />
        <rect x="136" y="233" width="8" height="14" rx="3" fill="#7182f0" />
        <circle cx="260" cy="230" r="5" fill="#7182f0" opacity="0.6" />
        <rect x="256" y="235" width="8" height="12" rx="3" fill="#7182f0" opacity="0.6" />
      </g>
    </svg>
  </div>
</template>
