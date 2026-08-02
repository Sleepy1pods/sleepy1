<script setup lang="ts">
import { ref } from 'vue'

type ViewMode = 'star' | 'moon'
const activeView = ref<ViewMode>('star')
</script>

<template>
  
</template>

<style scoped>
/* Ensure the parent allows pointer events while the SVG behind doesn't block it */
</style>
