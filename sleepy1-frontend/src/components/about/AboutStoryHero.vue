<script setup lang="ts">
// Origin story & how the idea came to our minds
</script>

<template>
  <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
    <!-- Left Narrative Column (7 cols) -->
    <div class="lg:col-span-7">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
        Origin Story
      </div>
      <h1
        class="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl lg:leading-tight">
        How the idea came to our minds.
      </h1>

      <p class="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
        Sleepy1 was born out of pure personal exhaustion. As college students and frequent travellers, we spent
        countless nights stranded during endless exam preps, delayed night trains, and long hospital vigils.
      </p>

      <p class="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
        We saw the same painful reality everywhere: people curled up uncomfortably on cold metal benches, using
        backpacks as makeshift pillows, desperately trying to sleep under harsh fluorescent lights and constant public
        noise.
      </p>
    </div>

    <!-- Right Pod Showcase (5 cols) -->
    <div class="lg:col-span-5 flex items-center justify-center">
      <div class="relative w-full max-w-[340px] sm:max-w-[380px] flex items-center justify-center select-none">
        <!-- Light Theme Real Image -->
        <img
          src="/about-pod-light.png"
          alt="Sleepy1 Gen-1 Rest Pod Exterior"
          class="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain dark:hidden block transition-transform duration-500 hover:scale-[1.02]"
          loading="eager"
          decoding="async"
        />
        <!-- Dark Theme Real Image -->
        <img
          src="/about-pod-dark.png"
          alt="Sleepy1 Gen-1 Rest Pod Exterior"
          class="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain dark:block hidden transition-transform duration-500 hover:scale-[1.02]"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  </div>
</template>
