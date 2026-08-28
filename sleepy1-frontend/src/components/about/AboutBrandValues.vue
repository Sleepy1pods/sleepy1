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
]
</script>

<template>
  <div class="mt-14 grid gap-6 md:grid-cols-3">
    <div
      v-for="v in values"
      :key="v.title"
      class="card-surface group relative flex flex-col justify-between overflow-hidden p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 sm:p-7"
    >
      <!-- Subtle Background Watermark Numeral -->
      <span
        class="pointer-events-none absolute -right-2 -top-3 select-none font-display text-7xl font-black tracking-tighter opacity-5 text-primary"
        aria-hidden="true"
      >
        {{ v.number }}
      </span>

      <div>
        <!-- Top Row: Number Badge & Tag Pill -->
        <div class="flex items-center justify-between">
          <span
            class="inline-flex h-8 items-center justify-center rounded-full border border-theme bg-surface px-3 text-xs font-bold tracking-widest text-primary"
          >
            {{ v.number }}
          </span>
          <span class="text-[11px] font-semibold uppercase tracking-wider text-muted">
            {{ v.tag }}
          </span>
        </div>

        <!-- Title & Description -->
        <h3 class="mt-8 font-display text-xl font-bold text-primary">
          {{ v.title }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-secondary">
          {{ v.description }}
        </p>
      </div>
    </div>
  </div>
</template>
