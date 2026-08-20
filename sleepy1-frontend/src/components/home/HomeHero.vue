<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import HeroAtmosphere from '@/components/home/HeroAtmosphere.vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

const prefersReducedMotion = useReducedMotion()

const fullText = "Your Pod,\nYour Mood"
const displayedText = ref('')
const showCursor = ref(true)

let charIndex = 0
let typingTimer: ReturnType<typeof setTimeout> | null = null
let cursorTimer: ReturnType<typeof setInterval> | null = null

const typeStep = () => {
  if (charIndex < fullText.length) {
    charIndex++
    displayedText.value = fullText.slice(0, charIndex)
    typingTimer = setTimeout(typeStep, 60 + Math.random() * 50)
  }
}

onMounted(() => {
  if (prefersReducedMotion.value) {
    displayedText.value = fullText
    showCursor.value = false
    return
  }
  typingTimer = setTimeout(typeStep, 400)
  cursorTimer = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
})

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer)
  if (cursorTimer) clearInterval(cursorTimer)
})
</script>

<template>
  <section class="relative overflow-hidden pt-20 sm:pt-28 lg:pt-32">
    <HeroAtmosphere />

    <div class="container-page relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div class="reveal pb-20 sm:pb-28 lg:col-span-5 lg:pb-36">
        <p class="eyebrow mb-7">Smart Rest Network</p>
        <h1
          class="font-display text-5xl font-bold leading-[1.2] sm:text-6xl lg:text-[4.5rem] min-h-[2.4em] lg:min-h-[2.4em]"
          aria-label="Your Pod, Your Mood"
        >
          <span class="whitespace-pre-line text-primary">{{ displayedText }}</span>
          <span
            class="ml-1 inline-block h-[0.78em] w-[4px] translate-y-[0.08em] rounded-full bg-brand-500 shadow-[0_0_12px_rgba(91,103,216,0.8)] transition-opacity duration-150"
            :class="showCursor ? 'opacity-100' : 'opacity-0'"
            aria-hidden="true"
          ></span>
        </h1>
        <p class="mt-7 max-w-md text-lg leading-relaxed text-secondary">
          Smart, private rest pods across universities, corporate parks, hospitals, and railway stations.
        </p>
        <div class="mt-11 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton as="RouterLink" to="/quick-book" size="lg">Book Now</PrimaryButton>
        </div>
      </div>

      <div class="reveal pb-20 [animation-delay:120ms] sm:pb-28 lg:col-span-7 lg:pb-36">
        <div class="animate-float mx-auto aspect-[4149/3638] w-full overflow-hidden rounded-3xl shadow-premium hover:shadow-[0_20px_50px_rgba(91,103,216,0.25)] transition-shadow duration-700 group">
          <img src="/pod1.png" alt="Sleepy1 smart rest pod" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}
</style>
