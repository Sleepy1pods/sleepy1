<script setup lang="ts">
// Origin story & how the idea came to our minds
</script>

<template>
  <div class="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
    <!-- Left Narrative Column (7 cols) -->
    <div class="lg:col-span-7">


      <h1
        class="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl lg:leading-tight">
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

    <!-- Right Seamless Architectural Pod Showcase (5 cols) -->
    <div class="lg:col-span-5 flex items-center justify-center">
      <div class="relative w-[320px] sm:w-[380px] lg:w-[420px] h-[380px] rounded-lg sm:h-[440px] lg:h-[480px] overflow-hidden flex items-center justify-center about-pod-container">
        <!-- Light Theme Image: p4.png -->
        <img
          src="/p4.png"
          alt="Sleepy1 Gen-1 Rest Pod Exterior"
          class="h-full w-full object-cover object-center scale-[1.1] dark:hidden block select-none transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <!-- Dark Theme Image: p3.png -->
        <img
          src="/p3.png"
          alt="Sleepy1 Gen-1 Rest Pod Exterior"
          class="h-full w-full object-cover object-center scale-[1.1] dark:block hidden select-none transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-pod-container {
  -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 65%, transparent 100%);
  mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 65%, transparent 100%);
}
</style>
