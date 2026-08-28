<script setup lang="ts">
import type { LocationEnvironment } from '@/data/environments'
import HubVisual from './HubVisual.vue'
import LocationStatusBadge from './LocationStatusBadge.vue'

defineProps<{ environment: LocationEnvironment }>()
</script>

<template>
  <div class="card-surface group flex flex-col overflow-hidden transition-all duration-300 hover:border-brand-400/40 hover:shadow-premium hover:-translate-y-1">
    <div class="relative h-36 overflow-hidden bg-ink-950">
      <img
        v-if="environment.image"
        :src="environment.image"
        :alt="`${environment.label} environment`"
        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <HubVisual v-else :hub-type="environment.hubType" :id="environment.id" class="h-full w-full" rounded="rounded-none" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
      <div class="absolute left-3 top-3">
        <LocationStatusBadge :status="environment.status" />
      </div>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-semibold text-ivory-50 transition-colors group-hover:text-brand-300">{{ environment.label }}</h3>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-ivory-100/60">{{ environment.restNeed }}</p>
    </div>
  </div>
</template>
