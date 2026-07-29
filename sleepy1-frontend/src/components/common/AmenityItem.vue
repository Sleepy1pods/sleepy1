<script setup lang="ts">
import type { Amenity } from '@/types/common'
import AmenityIcon from './AmenityIcon.vue'

withDefaults(defineProps<{ amenity: Amenity; compact?: boolean }>(), { compact: false })
</script>

<template>
  <div :class="['flex items-start gap-3', compact ? '' : 'rounded-2xl border border-white/8 bg-white/[0.02] p-4']">
    <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-brand-300">
      <AmenityIcon :icon="amenity.icon" />
    </span>
    <div>
      <p class="text-sm font-semibold text-ivory-50">{{ amenity.label }}</p>
      <p v-if="!compact" class="mt-0.5 text-sm text-ivory-100/55">{{ amenity.description }}</p>
    </div>
  </div>
</template>
