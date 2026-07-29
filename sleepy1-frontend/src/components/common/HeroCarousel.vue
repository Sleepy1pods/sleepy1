<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HubVisual from './HubVisual.vue'
import type { Location } from '@/types/location'

const props = withDefaults(defineProps<{ slides: Location[]; intervalMs?: number }>(), { intervalMs: 5000 })

const active = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function go(index: number) {
  active.value = (index + props.slides.length) % props.slides.length
}

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(() => go(active.value + 1), props.intervalMs)
  }
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl">
    <div class="relative h-72 sm:h-96">
      <TransitionGroup name="fade">
        <div v-for="(slide, i) in slides" v-show="i === active" :key="slide.id" class="absolute inset-0">
          <HubVisual :hub-type="slide.hubType" :id="slide.heroImage" class="h-full w-full" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
          <div class="absolute bottom-6 left-6 right-6">
            <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">{{ slide.city }}</p>
            <h3 class="mt-1 text-xl font-semibold text-ivory-50">{{ slide.name }}</h3>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div class="absolute bottom-4 right-6 flex gap-2">
      <button
        v-for="(slide, i) in slides"
        :key="slide.id"
        type="button"
        :aria-label="`Show slide ${i + 1}`"
        class="h-2 rounded-full transition-all"
        :class="i === active ? 'w-6 bg-brand-400' : 'w-2 bg-white/30'"
        @click="go(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
