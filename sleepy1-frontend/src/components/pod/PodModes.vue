<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface ModeItem {
  id: string
  badge: string
  name: string
  description: string
  color: string
  glowColor: string
  image: string
  align: 'left' | 'right'
}

const modes: ModeItem[] = [
  {
    id: 'blue',
    badge: 'Mode 01 | Entertainment & Acoustic Immersion',
    name: 'Blue Mode',
    description: 'Entertainment capabilities - Watch movies or shows with premium Active Noise Cancelling (ANC) headphones under an immersive electric-blue fiber-optic star ceiling.',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    image: '/blue.png',
    align: 'left',
  },
  {
    id: 'red',
    badge: 'Mode 02 | Workstation & Focused Productivity',
    name: 'Red Mode',
    description: 'Work mode - Plug in your laptop or secondary device, stay fully focused with dedicated charging ports under a fiery-red fiber-optic star ceiling.',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    image: '/red.png',
    align: 'right',
  },
  {
    id: 'white',
    badge: 'Mode 03 | Sleep Mode & Deep Recovery',
    name: 'White Mode',
    description: 'Sleep mode - Drift off comfortably with an eye mask on, surrounded by a serene white fiber-optic starry night ceiling glow.',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    image: '/white.png',
    align: 'left',
  },
]

const visibleSections = ref<Record<string, boolean>>({})
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('data-mode-id')
        if (id && entry.isIntersecting) {
          visibleSections.value[id] = true
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )

  document.querySelectorAll('.mode-fullscreen-section').forEach((el) => {
    observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section class="w-full relative overflow-hidden bg-black text-white">
    <!-- Edge-to-Edge Full-Width Mode Sections -->
    <div class="w-full">
      <div
        v-for="mode in modes"
        :key="mode.id"
        :data-mode-id="mode.id"
        class="mode-fullscreen-section relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center overflow-hidden bg-black -mt-px first:mt-0"
        :class="mode.align === 'right' ? 'justify-end' : 'justify-start'"
      >
        <!-- Star Light Ceiling Image Layer -->
        <div 
          class="absolute inset-0 w-full h-full transition-all duration-1000 ease-out will-change-transform"
          :class="[
            visibleSections[mode.id]
              ? 'opacity-100 translate-x-0 scale-100'
              : (mode.align === 'right' ? 'opacity-0 -translate-x-20 scale-105' : 'opacity-0 translate-x-20 scale-105')
          ]"
        >
          <img 
            :src="mode.image" 
            :alt="`${mode.name} Star Light Ceiling`" 
            class="h-full w-full object-cover object-center select-none"
          />

          <!-- Directional Gradient Overlays for crisp readability -->
          <div 
            v-if="mode.align === 'left'"
            class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent w-full lg:w-3/4 left-0 pointer-events-none"
          />
          <div 
            v-else
            class="absolute inset-0 bg-gradient-to-l from-black/95 via-black/60 to-transparent w-full lg:w-3/4 right-0 pointer-events-none"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
        </div>

        <!-- Ambient Color Radial Glow -->
        <div 
          class="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen transition-opacity duration-1000"
          :style="{
            background: mode.align === 'right'
              ? `radial-gradient(circle at 65% 50%, ${mode.glowColor} 0%, transparent 65%)`
              : `radial-gradient(circle at 35% 50%, ${mode.glowColor} 0%, transparent 65%)`
          }"
        />

        <!-- Clean, Perfectly Aligned Text Overlay HUD -->
        <div 
          class="relative z-20 max-w-lg sm:max-w-xl py-12 px-6 sm:px-12 lg:px-16 transition-all duration-1000 ease-out will-change-transform"
          :class="[
            visibleSections[mode.id]
              ? 'opacity-100 translate-x-0'
              : (mode.align === 'right' ? 'opacity-0 translate-x-16' : 'opacity-0 -translate-x-16')
          ]"
        >
          <!-- Mode Top Badge -->
          <div class="flex items-center gap-2.5 mb-3">
            <span 
              class="flex h-2.5 w-2.5 rounded-full shadow-lg animate-ping-slow shrink-0"
              :style="{ backgroundColor: mode.color }"
            />
            <span 
              class="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.18em]"
              :style="{ color: mode.color }"
            >
              {{ mode.badge }}
            </span>
          </div>

          <!-- Mode Title -->
          <h3 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            {{ mode.name }}
          </h3>

          <!-- Mode Description -->
          <p class="mt-3.5 text-sm sm:text-base leading-relaxed text-zinc-200 font-normal drop-shadow max-w-lg">
            {{ mode.description }}
          </p>

          <!-- Action Button -->
          <div class="mt-6">
            <router-link
              to="/quick-book"
              class="inline-flex items-center gap-2 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 shadow-xl"
            >
              <span>Book {{ mode.name }}</span>
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes ping-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.5;
  }
}

.animate-ping-slow {
  animation: ping-slow 3s ease-in-out infinite;
}
</style>
