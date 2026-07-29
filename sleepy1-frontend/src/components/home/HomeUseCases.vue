<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PodVisual from '@/components/common/PodVisual.vue'

const useCases = [
  { id: 'sleep', label: 'Sleep & Rest', image: 'pod-interior-1', description: 'Deep, uninterrupted sleep between flights or long layovers — on an ergonomic mattress, not an airport chair.' },
  { id: 'unwind', label: 'Relax & Unwind', image: 'pod-desk-1', description: 'Watch your favourite shows, listen to music, or simply sit somewhere quiet, away from the terminal noise.' },
  { id: 'escape', label: 'A Quiet Escape', image: 'pod-interior-2', description: 'A private moment away from the crowd when you just need some calm, even if you don\'t plan to sleep.' },
  { id: 'refresh', label: 'Recharge & Freshen Up', image: 'pod-detail-1', description: 'Charge your devices, freshen up, and reset before your next boarding call or connection.' },
]

const active = ref(useCases[0].id)
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page">
      <SectionHeading eyebrow="Built For Every Kind Of Traveller" title="One private pod, many reasons to book" description="Sleepy1 is not merely a place to sleep — it is an on-demand private space for whatever your journey needs next." />

      <div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <div class="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
          <button
            v-for="uc in useCases"
            :key="uc.id"
            type="button"
            class="flex-1 rounded-2xl border px-5 py-4 text-left transition-colors lg:flex-none"
            :class="active === uc.id ? 'border-brand-400 bg-brand-400/10' : 'border-white/10 hover:border-white/25'"
            @click="active = uc.id"
          >
            <span class="text-sm font-semibold" :class="active === uc.id ? 'text-brand-200' : 'text-ivory-50'">{{ uc.label }}</span>
            <p v-if="active === uc.id" class="mt-1.5 text-sm text-ivory-100/60">{{ uc.description }}</p>
          </button>
        </div>

        <div class="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-premium">
          <TransitionGroup name="fade">
            <PodVisual
              v-for="uc in useCases.filter((u) => u.id === active)"
              :key="uc.id"
              :id="uc.image"
              class="absolute inset-0 h-full w-full"
              rounded="rounded-3xl"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-leave-active { position: absolute; }
</style>
