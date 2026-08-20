<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/common/SectionHeading.vue'

type Mode = {
  id: string
  name: string
  color: string
  gradient: string
  description: string
}

const modes: Mode[] = [
  {
    id: 'blue',
    name: 'Blue Mode',
    color: '#3b82f6',
    gradient: 'from-blue-900 via-blue-950 to-black',
    description: 'Entertainment capabilities — watch movies or shows with premium ANC headphones.',
  },
  {
    id: 'red',
    name: 'Red Mode',
    color: '#ef4444',
    gradient: 'from-red-900 via-red-950 to-black',
    description: 'Work mode — plug in your laptop or other device and stay focused.',
  },
  {
    id: 'white',
    name: 'White Mode',
    color: '#ffffff',
    gradient: 'from-zinc-700 via-zinc-900 to-black',
    description: 'Sleep mode — drift off comfortably with an eye mask and gentle ambient glow.',
  },
]

const activeMode = ref<Mode>(modes[0])
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading 
        eyebrow="Pod Modes" 
        title="Set Your Perfect Environment" 
        description="Switch between different lighting and capability modes to suit your needs." 
        align="center" 
        class="mx-auto"
      />

      <div class="mt-12 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-16">
        <!-- Interactive Visualizer -->
        <div class="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-premium lg:flex-1">
          <div class="aspect-[16/9] w-full transition-colors duration-1000 ease-in-out bg-gradient-to-b" :class="activeMode.gradient">
            <!-- Simulated Stars -->
            <div class="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZyBmaWxsPSIjZmZmIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMjAiIHI9IjAuNSIvPjxjaXJjbGUgY3g9IjM1MCIgY3k9Ijc1IiByPSIxLjUiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNTAiIHI9IjEiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjI1MCIgcj0iMC41Ii8+PGNpcmNsZSBjeD0iMzIwIiBjeT0iMzIwIiByPSIxIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMzgwIiByPSIxLjUiLz48L2c+PC9zdmc+')] bg-repeat" />
            <div class="absolute inset-0 bg-black/20 mix-blend-overlay" />
          </div>
        </div>

        <!-- Mode Selectors -->
        <div class="flex w-full max-w-sm flex-col gap-4 lg:w-96">
          <button
            v-for="mode in modes"
            :key="mode.id"
            @click="activeMode = mode"
            class="group relative flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-300"
            :class="[
              activeMode.id === mode.id 
                ? 'border-white/20 bg-white/5 shadow-glow' 
                : 'border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.02]'
            ]"
          >
            <div class="flex items-center gap-3">
              <span class="flex h-6 w-6 items-center justify-center rounded-full shadow-inner" :style="{ backgroundColor: mode.color }">
                <span v-if="activeMode.id === mode.id" class="h-2 w-2 rounded-full bg-black/50" />
              </span>
              <h3 class="font-display text-lg font-bold text-ivory-50 transition-colors" :class="{ 'text-primary': activeMode.id === mode.id }">{{ mode.name }}</h3>
            </div>
            <p class="text-sm leading-relaxed text-ivory-100/70 transition-opacity" :class="activeMode.id === mode.id ? 'opacity-100' : 'opacity-60'">
              {{ mode.description }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
