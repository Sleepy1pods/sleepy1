<script setup lang="ts">
interface ValueItem {
  number: string
  title: string
  description: string
  tag: string
}

const values: ValueItem[] = [
  {
    number: '01',
    title: 'Hospitality first',
    tag: '5-Star Stay',
    description: 'Every decision starts with one question: would this feel like a five-star stay, however short?',
  },
  {
    number: '02',
    title: 'Radical privacy',
    tag: 'Zero Intrusion',
    description: 'No shared curtains, no cameras inside pods — your rest is genuinely your own.',
  },
  {
    number: '03',
    title: 'Built for speed',
    tag: 'Seconds, Not Mins',
    description: 'Booking, check-in, and check-out are designed to take seconds, not minutes.',
  },
  {
    number: '04',
    title: 'Everywhere you wait',
    tag: 'Hub Expansion',
    description: 'Campuses first, then stations, malls, and business districts.',
  },
]
</script>

<template>
  <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="v in values"
      :key="v.title"
      class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] sm:p-7"
    >
      <!-- Subtle Background Watermark Numeral -->
      <span
        class="pointer-events-none absolute -right-2 -top-3 select-none font-display text-7xl font-black tracking-tighter text-white/[0.03] transition-colors duration-300 group-hover:text-brand-300/[0.06]"
        aria-hidden="true"
      >
        {{ v.number }}
      </span>

      <div>
        <!-- Top Row: Number Badge & Tag Pill -->
        <div class="flex items-center justify-between">
          <span
            class="inline-flex h-8 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-xs font-bold tracking-widest text-brand-300 transition-colors group-hover:border-brand-400/30 group-hover:bg-brand-400/10"
          >
            {{ v.number }}
          </span>
          <span class="text-[11px] font-semibold uppercase tracking-wider text-ivory-100/40 transition-colors group-hover:text-ivory-100/70">
            {{ v.tag }}
          </span>
        </div>

        <!-- Title & Description -->
        <h3 class="mt-8 font-display text-xl font-bold text-ivory-50 transition-colors group-hover:text-brand-200">
          {{ v.title }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-ivory-100/60">
          {{ v.description }}
        </p>
      </div>

      <!-- Minimalist Bottom Architectural Spec Line -->
      <div class="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
        <span class="text-[11px] font-medium uppercase tracking-wider text-ivory-100/35">
          Core Pillar
        </span>
        <span class="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-brand-300" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>
