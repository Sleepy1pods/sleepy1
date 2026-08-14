<template>
  <!-- Compact pill toggle for navbar -->
  <div
    class="relative flex items-center rounded-full p-0.5 w-16 h-8 cursor-pointer flex-shrink-0"
    style="background-color: var(--border); border: 1px solid var(--border);"
    @click="toggle"
    role="button"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sliding knob -->
    <div
      class="absolute top-0.5 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ease-out"
      :style="{
        transform: isDark ? 'translateX(32px)' : 'translateX(0)',
        backgroundColor: 'var(--cta-bg)',
      }"
    >
      <!-- Sun (light mode) -->
      <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ color: 'var(--cta-text)' }">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      <!-- Moon (dark mode) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--cta-text)' }">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    </div>

    <!-- Background icon (opposite of active) -->
    <div class="flex w-full items-center justify-between px-1.5 pointer-events-none">
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ color: 'var(--text-primary)' }">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      </svg>
      <span v-if="!isDark" class="w-3.5 h-3.5"></span>
      <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 opacity-40" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--text-primary)' }">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
      <span v-if="isDark" class="w-3.5 h-3.5"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const THEME_KEY = 'sleepy1-theme-v2'

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}



const toggle = () => {
  isDark.value = !isDark.value
  applyTheme()
}

onMounted(() => {
  const saved = localStorage.getItem(THEME_KEY)
  // Default: LIGHT MODE (#FFFFFF background)
  isDark.value = saved === 'dark'
  applyTheme()
})
</script>
