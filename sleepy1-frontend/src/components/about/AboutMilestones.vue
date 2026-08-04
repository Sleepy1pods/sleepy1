<script setup lang="ts">
import { milestones } from '@/data/statistics'

const milestoneDetails = milestones.map((milestone, index) => ({
  ...milestone,
  step: String(index + 1).padStart(2, '0'),
}))
</script>

<template>
  <div class="relative mx-auto mt-14 max-w-4xl">
    <!-- Vertical Spine Line -->
    <div
      class="pointer-events-none absolute bottom-6 left-4 top-6 w-px bg-gradient-to-b from-brand-400/50 via-white/15 to-transparent sm:left-28"
      aria-hidden="true"
    />

    <!-- Timeline Entries -->
    <div class="space-y-8 sm:space-y-10">
      <div
        v-for="m in milestoneDetails"
        :key="m.year"
        class="group relative flex items-start"
      >
        <!-- Left Column: Year & Step (Desktop only) -->
        <div class="hidden w-28 shrink-0 pr-8 text-right sm:block">
          <p class="font-display text-2xl font-bold text-ivory-50 transition-colors group-hover:text-brand-300">
            {{ m.year }}
          </p>
          <p class="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ivory-100/40">
            Phase {{ m.step }}
          </p>
        </div>

        <!-- Node on the Spine -->
        <div
          class="absolute left-4 top-5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-ink-950 transition-all duration-300 group-hover:scale-125 group-hover:border-brand-300 group-hover:shadow-[0_0_12px_rgba(139,155,251,0.4)] sm:left-28"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-white/40 transition-colors group-hover:bg-brand-300" />
        </div>

        <!-- Right Column: Card Content -->
        <div
          class="relative ml-10 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/20 group-hover:bg-white/[0.035] sm:ml-12 sm:p-7"
        >
          <!-- Subtle Watermark Step Number in Top Right -->
          <span
            class="pointer-events-none absolute -top-1 right-6 select-none font-display text-5xl font-black tracking-tighter text-white/[0.03] transition-colors duration-300 group-hover:text-brand-300/[0.06] sm:text-6xl"
            aria-hidden="true"
          >
            {{ m.step }}
          </span>

          <!-- Mobile-only Year & Phase Header -->
          <div class="mb-3 flex items-center justify-between sm:hidden">
            <span class="font-display text-lg font-bold text-ivory-50">
              {{ m.year }}
            </span>
            <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">
              Phase {{ m.step }}
            </span>
          </div>

          <div class="relative z-10">
            <h3 class="font-display text-xl font-bold text-ivory-50 transition-colors group-hover:text-brand-200">
              {{ m.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">
              {{ m.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
