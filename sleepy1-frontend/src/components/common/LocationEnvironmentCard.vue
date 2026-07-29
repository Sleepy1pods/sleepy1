<script setup lang="ts">
import type { LocationEnvironment } from '@/data/environments'
import HubVisual from './HubVisual.vue'
import LocationStatusBadge from './LocationStatusBadge.vue'

defineProps<{ environment: LocationEnvironment }>()
</script>

<template>
  <div class="card-surface flex flex-col overflow-hidden">
    <div class="relative h-32">
      <HubVisual :hub-type="environment.hubType" :id="environment.id" class="h-full w-full" rounded="rounded-none" />
      <div class="absolute left-3 top-3">
        <LocationStatusBadge :status="environment.status" />
      </div>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-semibold text-ivory-50">{{ environment.label }}</h3>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-ivory-100/60">{{ environment.restNeed }}</p>
    </div>
  </div>
</template>
