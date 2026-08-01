<script setup lang="ts">
import { heroStats } from '@/data/statistics'
import { useCountUp } from '@/composables/useCountUp'
import { useParallax } from '@/composables/useParallax'
import { ref, onMounted, onUnmounted } from 'vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import MoonScene from '@/components/atmosphere/MoonScene.vue'

const statDisplays = heroStats.map((stat) => useCountUp(stat.value))

const visualEl = ref<HTMLElement | null>(null)
useParallax(visualEl, 8)

// ---------------------------------------------------------------------------
// High-Tech Luxury Typing Animation for "Rest. Recharge. Rise Again."
// ---------------------------------------------------------------------------
const fullLine1 = 'Rest. Recharge.'
const fullLine2 = 'Rise Again.'

const typedLine1 = ref('')
const typedLine2 = ref('')
const currentTypingLine = ref<1 | 2>(1)
const isTypingDone = ref(false)

let typeTimer: ReturnType<typeof setTimeout> | null = null

function typeNextChar() {
  if (currentTypingLine.value === 1) {
    if (typedLine1.value.length < fullLine1.length) {
      typedLine1.value += fullLine1[typedLine1.value.length]
      typeTimer = setTimeout(typeNextChar, 55)
    } else {
      // Pause briefly before typing line 2
      typeTimer = setTimeout(() => {
        currentTypingLine.value = 2
        typeNextChar()
      }, 250)
    }
  } else if (currentTypingLine.value === 2) {
    if (typedLine2.value.length < fullLine2.length) {
      typedLine2.value += fullLine2[typedLine2.value.length]
      typeTimer = setTimeout(typeNextChar, 65)
    } else {
      isTypingDone.value = true
    }
  }
}

onMounted(() => {
  // Start typing after a short initial delay for visual punch
  typeTimer = setTimeout(typeNextChar, 300)
})

onUnmounted(() => {
  if (typeTimer) clearTimeout(typeTimer)
})
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
    <div class="pointer-events-none absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

    <div class="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
      <div class="animate-fade-up">
        <p class="eyebrow mb-6">Premium Rest, On Demand</p>
        
        <!-- Typed Title with stable min-height to prevent layout shift -->
        <h1 class="text-balance text-4xl font-semibold leading-[1.1] text-ivory-50 sm:text-5xl lg:text-6xl min-h-[2.3em]">
          <!-- Line 1: Rest. Recharge. -->
          <span class="inline-block">
            {{ typedLine1 }}
            <span
              v-if="currentTypingLine === 1"
              class="inline-block w-[3px] h-[0.88em] ml-1 align-middle bg-brand-300 animate-pulse shadow-[0_0_10px_#f6c98b]"
            />
          </span>
          <br />
          <!-- Line 2: Rise Again. -->
          <span class="inline-block bg-gradient-to-r from-brand-300 via-moon-400 to-lavender-400 bg-clip-text text-transparent">
            {{ typedLine2 }}
          </span>
          <span
            v-if="currentTypingLine === 2 || isTypingDone"
            class="inline-block w-[3px] h-[0.88em] ml-1 align-middle bg-lavender-400 animate-pulse shadow-[0_0_10px_#c084fc]"
          />
        </h1>

        <p class="mt-6 max-w-lg text-base leading-relaxed text-ivory-100/65 sm:text-lg">
          Sleepy1 places private, hotel-grade sleep pods in the places life makes you wait — so you can rest,
          freshen up, or simply escape the crowd, on your own schedule.
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton as="RouterLink" to="/book" size="lg">Find a Sleep Pod →</PrimaryButton>
          <SecondaryButton as="RouterLink" to="/pod-experience" size="lg">Explore the Experience</SecondaryButton>
        </div>
        <p class="mt-5 text-sm text-ivory-100/45">
          Available across selected Hubli and Dharwad hubs, from campuses to the railway station and Hubli Airport.
        </p>

        <dl class="mt-12 grid grid-cols-2 gap-6 border-t border-white/8 pt-8 sm:grid-cols-4">
          <div v-for="(stat, i) in heroStats" :key="stat.id">
            <dt class="sr-only">{{ stat.label }}</dt>
            <dd class="text-2xl font-semibold text-ivory-50 sm:text-3xl">{{ statDisplays[i].display.value }}</dd>
            <p class="mt-1 text-xs text-ivory-100/45">{{ stat.label }}</p>
          </div>
        </dl>
      </div>

      <div ref="visualEl" class="relative animate-fade-up [animation-delay:150ms]">
        <div
          class="pointer-events-none absolute inset-0 -z-10 scale-125 opacity-80"
          style="transform: translate3d(var(--parallax-x, 0), var(--parallax-y, 0), 0)"
        >
          <MoonScene :parallax="false" />
        </div>
        <div
          class="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2.5rem] shadow-premium sm:max-w-md motion-safe:animate-float-slow"
          style="transform: translate3d(var(--parallax-x, 0), var(--parallax-y, 0), 0)"
        >
          <PodVisual id="pod-interior-1" variant="interior" class="h-full w-full" rounded="rounded-[2.5rem]" />
        </div>
        <div class="absolute -bottom-6 -left-6 hidden w-52 rounded-2xl border border-white/10 bg-ink-800/90 p-4 shadow-premium backdrop-blur sm:block">
          <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">Smart Check-in</p>
          <p class="mt-1 text-sm text-ivory-100/70">Scan &amp; unlock in under 60 seconds — no desk, no keys.</p>
        </div>
      </div>
    </div>
  </section>
</template>
