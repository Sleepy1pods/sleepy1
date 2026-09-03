<script setup lang="ts">
// Origin story & how the idea came to our minds
</script>

<template>
  <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
    <!-- Left Narrative Column (6 cols) -->
    <div class="lg:col-span-6">
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

    <!-- Right Seamless Architectural Pod Showcase (6 cols) -->
    <div class="lg:col-span-6 flex items-center justify-center">
      <div
        class="relative w-full max-w-[660px] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center select-none pointer-events-none about-pod-stage">
        <!-- Light Theme Real Image: p4.png -->
        <img src="/p4.png" alt="Sleepy1 Gen-1 Rest Pod Exterior"
          class="w-full h-full object-contain object-center dark:hidden block transition-transform duration-700"
          loading="lazy" decoding="async" />
        <!-- Dark Theme Real Image: p3.png -->
        <img src="/p3.png" alt="Sleepy1 Gen-1 Rest Pod Exterior"
          class="w-full h-full object-contain object-center dark:block hidden transition-transform duration-700"
          loading="lazy" decoding="async" />

        <!-- Atmospheric edge blending that softly bridges studio edges into the section background -->
        <div class="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#e8e8ea] dark:from-[#0c0c0e] to-transparent pointer-events-none" />
        <div class="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#e8e8ea] dark:from-[#0c0c0e] to-transparent pointer-events-none" />
        <div class="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-[#e8e8ea] dark:from-[#0c0c0e] to-transparent pointer-events-none" />
        <div class="absolute inset-x-0 bottom-0 h-10 sm:h-14 bg-gradient-to-t from-[#e8e8ea] dark:from-[#0c0c0e] to-transparent pointer-events-none" />
      </div>
    </div>
  </div>
</template>
