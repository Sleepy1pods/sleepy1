<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface ModeItem {
  id: string
  num: string
  name: string
  tagline: string
  description: string
  color: string
  accentBorder: string
  glowColor: string
  image: string
  align: 'left' | 'right'
  specs: string[]
}

const modes: ModeItem[] = [
  {
    id: 'blue',
    num: '01',
    name: 'Blue Mode',
    tagline: 'Entertainment & Acoustic Immersion',
    description: 'Entertainment capabilities — watch movies or shows with premium Active Noise Cancelling (ANC) headphones under an immersive electric-blue fiber-optic star ceiling.',
    color: '#3b82f6',
    accentBorder: 'border-blue-500/40',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    image: '/mode-star-blue.jpg',
    align: 'left',
    specs: ['Blue Star Ceiling', 'ANC Headphones', 'Cinema Screen', 'Acoustic Soundproofing'],
  },
  {
    id: 'red',
    num: '02',
    name: 'Red Mode',
    tagline: 'Workstation & Focused Productivity',
    description: 'Work mode — plug in your laptop or secondary device, stay fully focused with dedicated charging ports under a crimson-red fiber-optic star ceiling.',
    color: '#ef4444',
    accentBorder: 'border-rose-500/40',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    image: '/mode-star-red.jpg',
    align: 'right',
    specs: ['Red Star Ceiling', 'Laptop Workstation Desk', 'Rapid Power Outlets', 'Anti-Glare Lighting'],
  },
  {
    id: 'white',
    num: '03',
    name: 'White Mode',
    tagline: 'Sleep Mode & Deep Recovery',
    description: 'Sleep mode — drift off comfortably with an eye mask on, surrounded by a serene white fiber-optic starry night ceiling and gentle ambient perimeter glow.',
    color: '#f4f4f5',
    accentBorder: 'border-zinc-300/40 dark:border-white/30',
    glowColor: 'rgba(255, 255, 255, 0.3)',
    image: '/mode-star-white.jpg',
    align: 'left',
    specs: ['White Star Ceiling', 'Silk Eye Mask', 'Memory Foam Bed', 'Circadian Soft Glow'],
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
        class="mode-fullscreen-section relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center overflow-hidden border-t border-white/10"
        :class="mode.align === 'right' ? 'justify-end' : 'justify-start'"
      >
        <!-- 1. Star View Image Layer: Comes from RIGHT (for left content) or LEFT (for right content) -->
        <div 
          class="absolute inset-0 w-full h-full transition-all duration-1000 ease-out will-change-transform"
          :class="[
            visibleSections[mode.id]
              ? 'opacity-100 translate-x-0 scale-100'
              : (mode.align === 'right' ? 'opacity-0 -translate-x-24 scale-105' : 'opacity-0 translate-x-24 scale-105')
          ]"
        >
          <img 
            :src="mode.image" 
            :alt="`${mode.name} Star View`" 
            class="h-full w-full object-cover object-center select-none"
          />

          <!-- Directional Gradient Overlays for crisp contrast -->
          <div 
            v-if="mode.align === 'left'"
            class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent w-full lg:w-3/4 left-0"
          />
          <div 
            v-else
            class="absolute inset-0 bg-gradient-to-l from-black/95 via-black/60 to-transparent w-full lg:w-3/4 right-0"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
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

        <!-- 2. Minimalist Corner Text HUD (Not a card, stuck to bottom corner) -->
        <div 
          class="absolute bottom-8 sm:bottom-12 lg:bottom-14 z-20 max-w-md sm:max-w-lg transition-all duration-1000 ease-out will-change-transform"
          :class="[
            mode.align === 'right' 
              ? 'right-6 sm:right-12 lg:right-16 text-left' 
              : 'left-6 sm:left-12 lg:left-16 text-left',
            visibleSections[mode.id]
              ? 'opacity-100 translate-x-0'
              : (mode.align === 'right' ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20')
          ]"
        >
          <!-- Mode Indicator Badge -->
          <div class="flex items-center gap-3 mb-2.5">
            <span 
              class="flex h-2.5 w-2.5 rounded-full shadow-lg animate-ping-slow"
              :style="{ backgroundColor: mode.color }"
            />
            <span 
              class="font-mono text-xs font-bold uppercase tracking-[0.25em]"
              :style="{ color: mode.color }"
            >
              Mode {{ mode.num }}
            </span>
            <span class="h-3 w-px bg-white/20" />
            <span class="text-[11px] font-semibold tracking-widest uppercase text-zinc-400">
              {{ mode.tagline }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
            {{ mode.name }}
          </h3>

          <!-- Description -->
          <p class="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-300 font-light max-w-md drop-shadow">
            {{ mode.description }}
          </p>

          <!-- Compact Feature Specs Pills -->
          <div class="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            <span 
              v-for="spec in mode.specs" 
              :key="spec"
              class="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[11px] font-medium text-zinc-200 backdrop-blur-md"
            >
              <svg class="w-3 h-3" :style="{ color: mode.color }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              {{ spec }}
            </span>
          </div>

          <!-- Booking Action -->
          <div class="mt-5">
            <router-link
              to="/quick-book"
              class="inline-flex items-center gap-2 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 shadow-xl"
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
