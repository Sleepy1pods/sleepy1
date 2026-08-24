<script setup lang="ts">
// Origin story & how the idea came to our minds
</script>

<template>
  <div class="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
    <!-- Left Narrative Column (7 cols) -->
    <div class="lg:col-span-7">
      <div class="inline-flex items-center gap-2 rounded-full border border-theme bg-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Origin Story
      </div>

      <h1 class="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl lg:leading-tight">
        How the idea came to our minds.
      </h1>

      <p class="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
        Sleepy1 was born out of pure personal exhaustion. As college students and frequent travellers, we spent countless nights stranded during endless exam preps, delayed night trains, and long hospital vigils.
      </p>

      <p class="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
        We saw the same painful reality everywhere: people curled up uncomfortably on cold metal benches, using backpacks as makeshift pillows, desperately trying to sleep under harsh fluorescent lights and constant public noise.
      </p>

      <!-- The Realization Card -->
      <div class="card-surface mt-6 p-6">
        <div class="flex items-center gap-2.5">
          <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">?</span>
          <h3 class="text-xs font-bold uppercase tracking-wider text-primary">The Question That Sparked It All</h3>
        </div>
        <p class="mt-3 font-display text-lg font-medium italic text-primary sm:text-xl">
          "Why is sleep binary? Why must you either pay ₹4,000+ for a 24-hour hotel room you barely need, or suffer exhausted in public?"
        </p>
        <p class="mt-3 text-xs leading-relaxed text-secondary">
          We realized that millions of people don't need a luxury suite — they just need 60 to 120 minutes of complete silence, a clean memory-foam bed, fresh air, and absolute privacy right where they are.
        </p>
      </div>
    </div>

    <!-- Right Framed Architectural Pod Showcase (5 cols) -->
    <div class="lg:col-span-5">
      <div
        class="card-surface group relative overflow-hidden p-4 shadow-soft transition-all duration-500 hover:shadow-lg"
      >
        <!-- Architectural Spec Header Bar -->
        <div class="mb-3 flex items-center justify-between px-1">
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span class="text-[11px] font-semibold uppercase tracking-wider text-secondary">
              Gen-1 Smart Pod · Architecture
            </span>
          </div>
          <span
            class="rounded-full border border-theme bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary"
          >
            Built In-House
          </span>
        </div>

        <!-- Framed Pod Visual -->
        <div class="relative overflow-hidden rounded-2xl border border-theme bg-surface">
          <img 
            src="/pod3.jpeg" 
            alt="Sleepy1 Gen-1 Rest Pod Exterior" 
            class="h-full min-h-[320px] w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          <div class="absolute bottom-4 left-4 right-4 text-xs text-white">
            <p class="font-display font-bold">Private Sanctuary Pod</p>
            <p class="text-white/80 text-[11px] mt-0.5">Designed, engineered, and fabricated for maximum rest efficiency.</p>
          </div>
        </div>

        <!-- Architectural Footer Spec Bar -->
        <div class="mt-3 flex items-center justify-between border-t border-theme px-1 pt-3 text-xs text-secondary">
          <span>Acoustic Glass · Smart QR Lock</span>
          <span class="font-mono text-[11px] text-primary font-semibold">2.2m × 1.4m Footprint</span>
        </div>
      </div>
    </div>
  </div>
</template>
