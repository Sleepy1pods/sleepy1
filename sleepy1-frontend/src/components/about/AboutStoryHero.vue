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
    </div>

    <!-- Right Framed Architectural Pod Showcase (5 cols) -->
    <div class="lg:col-span-5">
      <div
        class="card-surface group relative overflow-hidden p-2 sm:p-3 shadow-soft transition-all duration-500 hover:shadow-lg"
      >
        <!-- Framed Pod Visual -->
        <div class="relative overflow-hidden rounded-2xl border border-theme bg-surface">
          <img 
            src="/pod3.jpeg" 
            alt="Sleepy1 Gen-1 Rest Pod Exterior" 
            class="h-full min-h-[340px] w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
        </div>
      </div>
    </div>
  </div>
</template>
