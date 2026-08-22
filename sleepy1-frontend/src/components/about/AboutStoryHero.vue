<script setup lang="ts">
// Using actual pod image instead of abstract PodVisual
</script>

<template>
  <div class="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
    <!-- Left Narrative Column (7 cols) -->
    <div class="lg:col-span-7">
      <span class="eyebrow">The Beginning</span>
      <h2 class="mt-3 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        Built for those who wait.
      </h2>
      <p class="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
        Sleepy1 started with a simple observation: people spend countless hours in high-footfall places
        with no access to private, comfortable rest. We began with universities and are building toward
        every campus, corporate park, hospital, and railway station where people need real rest.
      </p>

      <!-- Minimalist Founding Principle Box -->
      <div class="mt-8 border-l-2 border-theme pl-5">
        <p class="font-display text-base italic text-primary">
          "Sleep is an investment in the energy you need to be effective tomorrow."
        </p>
        <p class="mt-2 text-xs font-semibold uppercase tracking-widest text-muted">
          — Tom Roth
        </p>
      </div>
    </div>

    <!-- Right Framed Architectural Pod Showcase (5 cols) -->
    <div class="lg:col-span-5">
      <div
        class="group relative overflow-hidden rounded-3xl card-surface p-3 transition-all duration-300 hover:border-brand-500/30 sm:p-4"
      >
        <!-- Architectural Spec Header Bar -->
        <div class="mb-3 flex items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span class="text-[11px] font-semibold uppercase tracking-wider text-secondary">
              Gen-1 Rest Pod · Exterior
            </span>
          </div>
          <span
            class="rounded-full border border-theme bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-500 dark:text-brand-400"
          >
            Acoustic Glass
          </span>
        </div>

        <!-- Framed Pod Visual -->
        <div class="relative overflow-hidden rounded-2xl border border-theme bg-page group-hover:shadow-[0_10px_30px_rgba(91,103,216,0.15)] transition-shadow duration-500">
          <img 
            src="/pod3.jpeg" 
            alt="Sleepy1 Gen-1 Rest Pod Exterior" 
            class="h-full min-h-[320px] w-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
          />
        </div>

        <!-- Architectural Footer Spec Bar -->
        <div class="mt-3 flex items-center justify-between border-t border-theme px-2 pt-3 text-xs text-secondary">
          <span>Soundproof · Climate Controlled</span>
          <span class="font-mono text-[11px] text-muted">2.2m × 1.4m</span>
        </div>
      </div>
    </div>
  </div>
</template>

