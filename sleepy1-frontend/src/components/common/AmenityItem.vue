<script setup lang="ts">
import type { Amenity } from '@/types/common'
import AmenityIcon from './AmenityIcon.vue'

withDefaults(defineProps<{ amenity: Amenity; compact?: boolean }>(), { compact: false })
</script>

<template>
  <div :class="['flex items-start gap-3', compact ? '' : 'rounded-2xl border border-black/10 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-4']">
    <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 bg-black/5 text-black dark:border-white/20 dark:bg-white/5 dark:text-white">
      <AmenityIcon :icon="amenity.icon" class="text-black dark:text-white" />
    </span>
    <div>
      <p class="text-sm font-semibold text-ivory-50">{{ amenity.label }}</p>
      <p v-if="!compact" class="mt-0.5 text-sm text-ivory-100/55">{{ amenity.description }}</p>
    </div>
  </div>
</template>
