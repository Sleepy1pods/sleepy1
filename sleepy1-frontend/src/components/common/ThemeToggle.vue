<template>
  <!-- Symmetrically aligned compact theme switch -->
  <button
    type="button"
    class="relative inline-flex h-[28px] w-[54px] flex-shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none theme-toggle-btn"
    :style="toggleStyle"
    @click="toggle"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Background Track with perfectly centered icons in two columns -->
    <span class="grid w-full h-full grid-cols-2 pointer-events-none items-center">
      <!-- Left icon (Sun background) -->
      <span class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-opacity duration-200" :class="isDark ? 'opacity-40 text-zinc-400' : 'opacity-0'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
      </span>

      <!-- Right icon (Moon background) -->
      <span class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-opacity duration-200" :class="!isDark ? 'opacity-40 text-zinc-600' : 'opacity-0'" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </span>
    </span>

    <!-- Sliding Knob (22px x 22px) -->
    <span
      class="absolute left-[2.5px] top-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-out pointer-events-none toggle-knob"
      :class="isDark ? 'translate-x-[25px]' : 'translate-x-0'"
    >
      <!-- Sun icon inside knob (Light mode) - Black icon -->
      <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-zinc-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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

      <!-- Moon icon inside knob (Dark mode) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-zinc-900" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

const isDark = ref(false)

const THEME_KEY = 'sleepy1-theme-v2'

const toggleStyle = computed(() => ({
  backgroundColor: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.07)',
  border: isDark.value ? '1.5px solid rgba(255, 255, 255, 0.75)' : '1.5px solid rgba(0, 0, 0, 0.2)',
  boxShadow: isDark.value ? '0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 2px rgba(0, 0, 0, 0.5)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
}))

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}



const toggle = (event: MouseEvent) => {
  const isAppearanceTransition = 'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    applyTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    applyTheme()
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    document.documentElement.animate(
      {
        clipPath: clipPath
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}

onMounted(() => {
  const saved = localStorage.getItem(THEME_KEY)
  // Default: LIGHT MODE (#FFFFFF background)
  isDark.value = saved === 'dark'
  applyTheme()
})
</script>

<style>
.theme-toggle-btn {
  width: 54px;
  height: 28px;
  background-color: rgba(0, 0, 0, 0.06);
  border: 1.5px solid rgba(0, 0, 0, 0.2) !important;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

html.dark .theme-toggle-btn,
.dark .theme-toggle-btn {
  background-color: rgba(255, 255, 255, 0.08) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.45) !important;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.4) !important;
}

html.dark .theme-toggle-btn:hover,
.dark .theme-toggle-btn:hover {
  border-color: rgba(255, 255, 255, 0.65) !important;
}

.toggle-knob {
  top: 2px;
  left: 2.5px;
  width: 22px;
  height: 22px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

html.dark .toggle-knob,
.dark .toggle-knob {
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
}
</style>
