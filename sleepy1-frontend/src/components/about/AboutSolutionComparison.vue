<script setup lang="ts">
interface ComparisonRow {
  id: string
  beforeTitle: string
  beforeDesc: string
  afterTitle: string
  afterDesc: string
}

const comparisons: ComparisonRow[] = [
  {
    id: 'comfort',
    beforeTitle: 'A waiting chair',
    beforeDesc: 'Hard public seating in open view without lumbar support or privacy.',
    afterTitle: 'A private pod',
    afterDesc: 'Ergonomic full-length reclining bed in your own locked sanctuary.',
  },
  {
    id: 'environment',
    beforeTitle: 'Bright, noisy terminals',
    beforeDesc: 'Overhead fluorescent glare and constant crowd clamor.',
    afterTitle: 'Ambient light, acoustic isolation',
    afterDesc: 'Dimmable warm lighting and sound-dampened walls for undisturbed rest.',
  },
  {
    id: 'security',
    beforeTitle: 'Nowhere to leave your bags',
    beforeDesc: 'Constant vigilance required; sleeping means risking your belongings.',
    afterTitle: 'A locked space that is yours alone',
    afterDesc: 'Secure digital QR entry with ample luggage storage right beside you.',
  },
  {
    id: 'time',
    beforeTitle: "Time you can't get back",
    beforeDesc: 'Exhausting transit hours that leave you drained before your day starts.',
    afterTitle: 'Real, recoverable rest',
    afterDesc: 'Wake up refreshed, recharged, and ready for whatever comes next.',
  },
]
</script>

<template>
  <div class="mx-auto max-w-4xl">
    <div class="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
      <!-- Header Row -->
      <div class="grid grid-cols-1 border-b border-white/10 bg-white/[0.03] sm:grid-cols-2 sm:divide-x sm:divide-white/10">
        <div class="p-6 sm:p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-ivory-100/40">Before</p>
          <p class="mt-1 text-sm text-ivory-100/60">Traditional waiting in public terminals</p>
        </div>
        <div class="border-t border-white/10 p-6 sm:border-t-0 sm:p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">After</p>
          <p class="mt-1 text-sm font-medium text-ivory-50">The Sleepy1 private rest pod</p>
        </div>
      </div>

      <!-- Comparison Rows -->
      <div class="divide-y divide-white/10">
        <div
          v-for="row in comparisons"
          :key="row.id"
          class="group grid grid-cols-1 transition-colors duration-200 hover:bg-white/[0.03] sm:grid-cols-2 sm:divide-x sm:divide-white/10"
        >
          <!-- Before Column -->
          <div class="flex items-start gap-3.5 p-6 sm:p-7">
            <span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-ivory-100/35" aria-hidden="true">—</span>
            <div>
              <p class="font-medium text-ivory-100/70">{{ row.beforeTitle }}</p>
              <p class="mt-1 text-xs leading-relaxed text-ivory-100/45">{{ row.beforeDesc }}</p>
            </div>
          </div>

          <!-- After Column -->
          <div class="flex items-start gap-3.5 border-t border-white/10 p-6 sm:border-t-0 sm:p-7">
            <span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-brand-300" aria-hidden="true">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <div>
              <p class="font-semibold text-ivory-50 group-hover:text-brand-200 transition-colors">{{ row.afterTitle }}</p>
              <p class="mt-1 text-xs leading-relaxed text-ivory-100/65">{{ row.afterDesc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
