<script setup lang="ts">
import type { MembershipTier } from '@/types/user'

const props = withDefaults(defineProps<{ tier: MembershipTier; current?: boolean }>(), { current: false })

const toneClasses: Record<string, string> = {
  slate: 'tier-slate',
  brand: 'tier-brand',
  lavender: 'tier-lavender',
  gold: 'tier-gold',
}

</script>

<template>
  <div
    :class="[
      'membership-card group relative flex min-h-[32rem] flex-col overflow-hidden rounded-3xl border p-7 shadow-soft',
      toneClasses[props.tier.color] ?? toneClasses.slate,
      current ? 'is-current border-brand-300/80 ring-2 ring-brand-400/35' : 'border-white/10',
    ]"
  >
    <div class="card-atmosphere" aria-hidden="true" />
    <div class="card-sheen" aria-hidden="true" />
    <div class="edge-light" aria-hidden="true" />

    <div class="relative">
      <div class="flex min-h-8 items-center justify-between gap-3">
        <span class="tier-chip">{{ tier.monthlyPriceLabel }}</span>
        <span v-if="current" class="current-badge">Current</span>
      </div>
      <h3 class="mt-5 text-2xl font-semibold text-ivory-50">{{ tier.name }}</h3>
    </div>

    <p class="relative mt-4 text-xs uppercase tracking-wide text-ivory-100/45">
      Unlocked at {{ tier.minLifetimeCredits.toLocaleString('en-IN') }}+ lifetime credits
    </p>

    <ul class="mt-5 flex-1 space-y-3">
      <li v-for="benefit in tier.benefits" :key="benefit" class="benefit-row flex items-start gap-2 text-sm text-ivory-100/78">
        <span class="check-mark">
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        <span>{{ benefit }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.membership-card {
  isolation: isolate;
  background:
    linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 42%, rgba(255,255,255,0.06)),
    linear-gradient(180deg, rgba(18,20,27,0.94), rgba(7,8,11,0.96));
  transition:
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 420ms ease,
    box-shadow 420ms ease;
}

.membership-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background:
    radial-gradient(circle at 24% 12%, var(--tier-a), transparent 34%),
    radial-gradient(circle at 78% 8%, var(--tier-b), transparent 32%),
    linear-gradient(135deg, var(--tier-a), transparent 46%);
  opacity: 0.34;
  transition: opacity 420ms ease, transform 420ms ease;
}

.membership-card:hover {
  transform: translateY(-10px);
  border-color: rgba(255,255,255,0.28);
  box-shadow: 0 30px 80px -34px var(--tier-glow), 0 18px 44px -26px rgba(0,0,0,0.8);
}

.membership-card:hover::before {
  opacity: 0.56;
  transform: scale(1.06);
}

.card-atmosphere {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(120deg, transparent 0 36%, rgba(255,255,255,0.08) 48%, transparent 60%),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 34px);
  opacity: 0.16;
}

.card-sheen {
  position: absolute;
  inset: -45% -75%;
  z-index: 0;
  background: linear-gradient(115deg, transparent 36%, rgba(255,255,255,0.22) 49%, transparent 62%);
  opacity: 0;
  transform: translateX(-24%) rotate(8deg);
  transition: opacity 280ms ease;
  pointer-events: none;
}

.membership-card:hover .card-sheen {
  opacity: 1;
  animation: tierSheen 1.2s ease both;
}

.edge-light {
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border: 1px solid rgba(255,255,255,0.08);
  pointer-events: none;
}

.tier-chip,
.current-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  border-radius: 999px;
  padding: 0 13px;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.tier-chip {
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(7,8,11,0.22);
  color: rgba(250,246,239,0.66);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
}

.current-badge {
  border: 1px solid rgba(246,201,139,0.5);
  background: rgba(246,201,139,0.12);
  color: #f6c98b;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 30px -22px rgba(246,201,139,0.7);
}

.benefit-row {
  position: relative;
  transform: translateX(0);
  transition: transform 260ms ease, color 260ms ease;
}

.membership-card:hover .benefit-row {
  transform: translateX(3px);
}

.check-mark {
  display: inline-flex;
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  color: var(--tier-line);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
}

.tier-slate {
  --tier-a: rgba(143,208,221,0.2);
  --tier-b: rgba(139,155,251,0.18);
  --tier-line: #8fd0dd;
  --tier-glow: rgba(143,208,221,0.42);
}

.tier-brand {
  --tier-a: rgba(139,155,251,0.36);
  --tier-b: rgba(91,103,216,0.28);
  --tier-line: #8b9bfb;
  --tier-glow: rgba(139,155,251,0.52);
}

.tier-lavender {
  --tier-a: rgba(184,169,240,0.38);
  --tier-b: rgba(139,155,251,0.28);
  --tier-line: #b8a9f0;
  --tier-glow: rgba(184,169,240,0.56);
}

.tier-gold {
  --tier-a: rgba(246,201,139,0.34);
  --tier-b: rgba(160,140,224,0.22);
  --tier-line: #f6c98b;
  --tier-glow: rgba(246,201,139,0.5);
}

.is-current {
  box-shadow: 0 0 0 1px rgba(139,155,251,0.2), 0 30px 80px -42px rgba(139,155,251,0.68);
}

@keyframes tierSheen {
  from { transform: translateX(-24%) rotate(8deg); }
  to { transform: translateX(24%) rotate(8deg); }
}

@media (prefers-reduced-motion: reduce) {
  .membership-card,
  .membership-card::before,
  .benefit-row {
    transition: none;
  }

  .membership-card:hover {
    transform: none;
  }

  .membership-card:hover .card-sheen {
    animation: none;
  }
}
</style>
