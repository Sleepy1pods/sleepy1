<script setup lang="ts">
import type { Location } from '@/types/location'
import HubVisual from '@/components/common/HubVisual.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'

defineProps<{ location: Location }>()
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 h-[420px]">
      <img v-if="location.heroImage.startsWith('/')" :src="location.heroImage" class="h-full w-full object-cover" alt="Location hero image" loading="lazy" decoding="async" />
      <HubVisual v-else :hub-type="location.hubType" :id="location.heroImage" class="h-full w-full" rounded="rounded-none" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
    </div>
    <div class="container-page relative flex min-h-[420px] flex-col justify-end pb-10 pt-24">
      <Breadcrumbs :items="[{ label: 'Locations', to: '/locations' }, { label: location.shortName }]" />
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <StatusBadge :status="location.availability" />
        <span v-if="location.isDemoData" class="rounded-full bg-ink-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ivory-100/70 backdrop-blur">
          Demo Data
        </span>
      </div>
      <h1 class="mt-4 text-balance text-3xl font-semibold text-ivory-50 sm:text-4xl lg:text-5xl">{{ location.name }}</h1>
      <p class="mt-2 text-ivory-100/60">{{ location.city }}, {{ location.state }}<span v-if="location.terminal"> · {{ location.terminal }}</span></p>
    </div>
  </section>
</template>
