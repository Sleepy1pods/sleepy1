<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import HeroAtmosphere from '@/components/home/HeroAtmosphere.vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

const prefersReducedMotion = useReducedMotion()

const phrases = [
  'right where you already are.',
  'between classes & meetings.',
  'when you need a recharge.',
  'on your own schedule.',
  'without leaving campus.',
]

const phraseIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const displayedText = ref('')
const showCursor = ref(true)

let typingTimer: ReturnType<typeof setTimeout> | null = null
let cursorTimer: ReturnType<typeof setInterval> | null = null

const getRandomSpeed = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const typeStep = () => {
  const currentPhrase = phrases[phraseIndex.value]

  if (!isDeleting.value) {
    if (charIndex.value < currentPhrase.length) {
      charIndex.value++
      displayedText.value = currentPhrase.slice(0, charIndex.value)
      showCursor.value = true
      typingTimer = setTimeout(typeStep, getRandomSpeed(45, 75))
    } else {
      typingTimer = setTimeout(() => {
        isDeleting.value = true
        typeStep()
      }, 2800)
    }
  } else {
    if (charIndex.value > 0) {
      charIndex.value--
      displayedText.value = currentPhrase.slice(0, charIndex.value)
      showCursor.value = true
      typingTimer = setTimeout(typeStep, 25)
    } else {
      isDeleting.value = false
      phraseIndex.value = (phraseIndex.value + 1) % phrases.length
      typingTimer = setTimeout(typeStep, 400)
    }
  }
}

onMounted(() => {
  if (prefersReducedMotion.value) {
    displayedText.value = phrases[0]
    showCursor.value = false
    return
  }
  typingTimer = setTimeout(typeStep, 350)
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
      <div class="reveal pb-20 sm:pb-28 lg:col-span-7 lg:pb-36">
        <p class="eyebrow mb-7">Smart Rest Network</p>
        <h1
          class="font-display text-4xl font-bold leading-[1.1] text-ivory-50 sm:text-5xl lg:text-[3.75rem]"
          aria-label="Your Pod, Your Mode, right where you already are."
        >
          <span class="block">Your Pod, Your Mode,</span>
          <span class="block min-h-[2.4em] sm:min-h-[2.2em] lg:min-h-[2.2em]">
            <span class="bg-gradient-to-r from-gold-200 via-gold-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(220,192,136,0.18)]">{{ displayedText }}</span>
            <span
              class="ml-1 inline-block h-[0.78em] w-[3px] sm:w-[3.5px] translate-y-[0.08em] rounded-full bg-gradient-to-b from-gold-300 to-gold-400 shadow-[0_0_10px_rgba(220,192,136,0.8)] transition-opacity duration-150"
              :class="showCursor ? 'opacity-100' : 'opacity-0'"
              aria-hidden="true"
            ></span>
          </span>
        </h1>
        <p class="mt-7 max-w-md text-lg leading-relaxed text-ivory-100/55">
          Smart, private rest pods across universities, corporate parks, hospitals, and railway stations.
        </p>
        <div class="mt-11 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton as="RouterLink" to="/quick-book" size="lg">Book Now</PrimaryButton>
          <SecondaryButton as="RouterLink" to="/locations" size="lg">Find a Pod</SecondaryButton>
        </div>
        <p class="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-ivory-100/35">
          IIIT Dharwad Campus
        </p>
      </div>

      <div class="reveal pb-20 [animation-delay:120ms] sm:pb-28 lg:col-span-5 lg:pb-36">
        <div class="mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl shadow-premium">
          <PodVisual id="pod-interior-1" variant="interior" class="h-full w-full" rounded="rounded-3xl" />
        </div>
      </div>
    </div>
  </section>
</template>
