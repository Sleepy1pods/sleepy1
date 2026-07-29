<script setup lang="ts">
import { locations } from '@/data/locations'

const loopedLocations = [...locations, ...locations]
</script>

<template>
  <section class="border-y border-white/8 bg-ink-900/60 py-8">
    <div class="container-page mb-4 flex items-center justify-between">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-ivory-100/40">Now Open Across India</p>
      <router-link to="/locations" class="text-xs font-medium text-brand-300 hover:text-brand-200">View all locations →</router-link>
    </div>
    <div class="no-scrollbar overflow-hidden" aria-hidden="true">
      <div class="flex w-max animate-[marquee_28s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
        <span
          v-for="(loc, i) in loopedLocations"
          :key="`${loc.id}-${i}`"
          class="whitespace-nowrap text-lg font-medium text-ivory-100/55"
        >
          {{ loc.name }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .animate-\[marquee_28s_linear_infinite\] { animation: none; }
}
</style>
