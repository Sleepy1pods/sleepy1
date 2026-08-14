<script setup lang="ts">
// HeroAtmosphere: subtle neutral ambient glows for both light and dark themes
</script>

<template>
  <!-- Subtle ambient glow — neutral enough for both light and dark -->
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full opacity-20 blur-[140px]" style="background-color: var(--border);" />
    <div class="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full opacity-10 blur-[130px] [animation-delay:-20s]" style="background-color: var(--border);" />
  </div>
</template>

