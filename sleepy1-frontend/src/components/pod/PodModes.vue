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

      <div class="mt-12 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
        <!-- Interactive Visualizer -->
        <div class="group relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-premium lg:flex-1 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <!-- Dynamic Background -->
          <div class="aspect-[16/9] w-full transition-all duration-1000 ease-in-out bg-gradient-to-b flex items-center justify-center relative overflow-hidden" :class="activeMode.gradient">
            
            <!-- Simulated Stars Background -->
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZyBmaWxsPSIjZmZmIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMjAiIHI9IjAuNSIvPjxjaXJjbGUgY3g9IjM1MCIgY3k9Ijc1IiByPSIxLjUiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNTAiIHI9IjEiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjI1MCIgcj0iMC41Ii8+PGNpcmNsZSBjeD0iMzIwIiBjeT0iMzIwIiByPSIxIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMzgwIiByPSIxLjUiLz48L2c+PC9zdmc+')] bg-repeat transition-opacity duration-1000" :class="activeMode.id === 'white' ? 'opacity-70' : 'opacity-30'" />
            <div class="absolute inset-0 bg-black/20 mix-blend-overlay transition-opacity duration-1000" :class="{ 'opacity-50': activeMode.id === 'blue' }" />

            <!-- Dynamic glowing orb behind pod -->
            <div 
              class="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-1000 ease-in-out"
              :class="activeMode.id === 'white' ? 'opacity-30' : 'opacity-60'"
              :style="{ backgroundColor: activeMode.color }"
            ></div>

            <!-- Pulsing Pod Image -->
            <div class="relative z-10 h-[85%] animate-pulse-subtle">
              <img 
                src="/pod.png" 
                alt="Sleepy1 Pod Visualizer" 
                class="h-full w-full object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                :style="{ filter: `drop-shadow(0 20px 40px ${activeMode.color}50)` }"
              />
            </div>
          </div>
        </div>

        <!-- Mode Selectors -->
        <div class="flex w-full max-w-sm flex-col gap-4 lg:w-96">
          <button
            v-for="mode in modes"
            :key="mode.id"
            @click="activeMode = mode"
            class="group relative flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-500 overflow-hidden"
            :class="[
              activeMode.id === mode.id 
                ? 'border-theme card-surface shadow-glow scale-[1.02]' 
                : 'border-transparent bg-transparent hover:border-theme hover:card-surface opacity-80 hover:opacity-100 hover:scale-[1.01]'
            ]"
          >
            <!-- Colored left indicator bar -->
            <div 
              class="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500 ease-in-out"
              :class="activeMode.id === mode.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'"
              :style="{ backgroundColor: mode.color }"
            ></div>

            <div class="flex items-center gap-3 pl-2">
              <span class="flex h-6 w-6 items-center justify-center rounded-full shadow-inner transition-transform duration-500" :class="activeMode.id === mode.id ? 'scale-110' : 'scale-100'" :style="{ backgroundColor: mode.color }">
                <span v-if="activeMode.id === mode.id" class="h-2 w-2 rounded-full bg-black/50" />
              </span>
              <h3 class="font-display text-lg font-bold transition-colors" :class="activeMode.id === mode.id ? 'text-primary' : 'text-primary'">{{ mode.name }}</h3>
            </div>
            <p class="pl-2 text-sm leading-relaxed transition-opacity" :class="activeMode.id === mode.id ? 'opacity-100 text-secondary' : 'opacity-60 text-muted'">
              {{ mode.description }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-pulse-subtle {
  animation: pulse-subtle 6s ease-in-out infinite;
}

@keyframes pulse-subtle {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}
</style>
