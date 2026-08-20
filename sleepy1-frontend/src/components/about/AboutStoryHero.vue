<script setup lang="ts">
import PodVisual from '@/components/common/PodVisual.vue'
</script>

<template>
  <div class="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
    <!-- Left Narrative Column (7 cols) -->
    <div class="lg:col-span-7">
      <span class="eyebrow">The Beginning</span>
      <h2 class="mt-3 font-display text-3xl font-bold tracking-tight text-ivory-50 sm:text-4xl">
        Built for those who wait.
      </h2>
      <p class="mt-4 text-base leading-relaxed text-ivory-100/70 sm:text-lg">
        Sleepy1 started with a simple observation: people spend countless hours in high-footfall places
        with no access to private, comfortable rest. We began with universities and are building toward
        every campus, corporate park, hospital, and railway station where people need real rest.
      </p>

      <!-- Minimalist Founding Principle Box -->
      <div class="mt-8 border-l-2 border-theme pl-5">
        <p class="font-display text-base italic text-ivory-50">
          "Sleep is an investment in the energy you need to be effective tomorrow."
        </p>
        <p class="mt-2 text-xs font-semibold uppercase tracking-widest text-ivory-100/40">
          — Tom Roth
        </p>
      </div>
    </div>

    <!-- Right Framed Architectural Pod Showcase (5 cols) -->
    <div class="lg:col-span-5">
      <div
        class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-3 shadow-soft transition-all duration-300 hover:border-white/20 sm:p-4"
      >
        <!-- Architectural Spec Header Bar -->
        <div class="mb-3 flex items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span class="text-[11px] font-semibold uppercase tracking-wider text-ivory-100/60">
              Gen-1 Rest Pod · Exterior
            </span>
          </div>
          <span
            class="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-300"
          >
            Acoustic Glass
          </span>
        </div>

        <!-- Framed Pod Visual -->
        <div class="relative overflow-hidden rounded-2xl border border-white/5 bg-ink-950/80">
          <PodVisual
            id="pod-exterior-about-hero"
            variant="exterior"
            class="h-full min-h-[320px] w-full"
            rounded="rounded-2xl"
          />
        </div>

        <!-- Architectural Footer Spec Bar -->
        <div class="mt-3 flex items-center justify-between border-t border-white/5 px-2 pt-3 text-xs text-ivory-100/50">
          <span>Soundproof · Climate Controlled</span>
          <span class="font-mono text-[11px] text-ivory-100/40">2.2m × 1.4m</span>
        </div>
      </div>
    </div>
  </div>
</template>
