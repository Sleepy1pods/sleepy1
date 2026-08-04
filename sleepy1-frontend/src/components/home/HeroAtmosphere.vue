<script setup lang="ts">
const stars = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() < 0.8 ? 1 : 1.5,
  duration: `${4 + Math.random() * 4}s`,
  delay: `${Math.random() * 5}s`,
}))
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- Stars -->
    <span
      v-for="star in stars"
      :key="star.id"
      class="absolute rounded-full bg-ivory-100 motion-safe:animate-twinkle"
      :style="{
        top: star.top,
        left: star.left,
        width: `${star.size}px`,
        height: `${star.size}px`,
        animationDuration: star.duration,
        animationDelay: star.delay,
      }"
    />

    <!-- Vignette -->
    <div class="absolute inset-0" style="background: radial-gradient(120% 90% at 50% 15%, transparent 45%, rgba(7,8,11,0.55) 100%)" />
  </div>
</template>
