<script setup lang="ts">
withDefaults(defineProps<{ glow?: boolean }>(), { glow: true })
</script>

<template>
  <div class="card-surface dream-card">
    <slot />
  </div>
</template>

<style scoped>
.dream-card {
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.dream-card:hover {
  transform: translateY(-2px);
}
</style>
