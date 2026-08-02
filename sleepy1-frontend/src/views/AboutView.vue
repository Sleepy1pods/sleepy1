<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { impactStats, milestones } from '@/data/statistics'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import DreamBackground from '@/components/atmosphere/DreamBackground.vue'

usePageMeta({
  title: 'About Sleepy1',
  description: 'Sleepy1 is working to make safe, private rest more accessible in places where people travel, wait, and spend long hours — starting with campuses and hospitals, and expanding to more high-footfall locations.',
})

const values = [
  { title: 'Hospitality First', description: 'Every design decision starts with the question: would this feel like a five-star stay, however short?' },
  { title: 'Radical Privacy', description: 'No shared curtains, no cameras inside pods — your rest is genuinely your own.' },
  { title: 'Built For Speed', description: 'Travellers are time-constrained. Booking, check-in, and check-out are designed to take seconds, not minutes.' },
  { title: 'Everywhere You Wait', description: 'Campuses first, then railway stations, malls, and business districts — wherever people wait, we belong.' },
]

const beforeAfterRows = [
  { before: 'Tired Traveller', after: 'Relaxed Traveller' },
  { before: 'Bright Lights', after: 'Ambient Lighting' },
  { before: 'Noise', after: 'Acoustic Isolation' },
  { before: 'Waiting', after: 'Comfortable Rest' },
]

const milestoneDetails = milestones.map((milestone, index) => ({
  ...milestone,
  step: String(index + 1).padStart(2, '0'),
  label: ['Founded', 'First Pods', 'Expansion', 'Future'][index] ?? milestone.title,
}))

const timelineSection = ref<HTMLElement | null>(null)
const timelineProgress = ref(0)
const activeMilestone = computed(() => {
  const maxIndex = milestoneDetails.length - 1
  return Math.min(maxIndex, Math.floor(timelineProgress.value * (maxIndex + 0.85)))
})

function updateTimelineProgress() {
  if (!timelineSection.value) return

  const rect = timelineSection.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const start = viewportHeight * 0.72
  const end = viewportHeight * 0.22
  const progress = (start - rect.top) / (start - end + rect.height * 0.35)

  timelineProgress.value = Math.min(1, Math.max(0, progress))
}

onMounted(() => {
  updateTimelineProgress()
  window.addEventListener('scroll', updateTimelineProgress, { passive: true })
  window.addEventListener('resize', updateTimelineProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateTimelineProgress)
  window.removeEventListener('resize', updateTimelineProgress)
})
</script>

<template>
  <div class="about-page">
    <section class="relative overflow-hidden section-pad">
      <div class="absolute inset-0 z-0">
        <DreamBackground tone="depth" density="medium" />
      </div>
      <div class="relative z-10">
        <div class="container-page text-center">
          <h1 class="text-balance text-4xl font-semibold text-ivory-50 sm:text-5xl">
            About <span class="bg-gradient-to-r from-brand-300 to-lavender-400 bg-clip-text text-transparent">Sleepy1</span>
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-ivory-100/65">
            Making safe, private rest accessible wherever life makes people wait.
          </p>
        </div>

        <div class="container-page mt-14 grid gap-8 lg:grid-cols-2">
          <div class="card-surface p-8 sm:p-10">
            <h2 class="text-xl font-semibold text-brand-300">Our Story</h2>
            <p class="mt-4 leading-relaxed text-ivory-100/70">
              Sleepy1 was born from a simple observation: millions of travellers spend countless hours waiting in
              hubs without access to private, comfortable rest spaces. Whether it's a delayed journey, an overnight
              layover, a business trip, or an early morning departure, travellers deserve a peaceful environment to
              recharge. Our mission began with one idea — bring premium sleep pods directly into hubs across
              India, and eventually into every high-footfall public space travellers pass through.
            </p>
          </div>
          <div class="overflow-hidden rounded-3xl shadow-premium">
            <PodVisual id="pod-exterior-1" variant="exterior" class="h-full min-h-[280px] w-full" rounded="rounded-3xl" />
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-ink-900/40">
      <div class="container-page grid gap-10 lg:grid-cols-2">
        <div class="card-surface p-8">
          <h2 class="text-lg font-semibold text-ivory-50">Mission</h2>
          <p class="mt-3 text-sm leading-relaxed text-ivory-100/65">
            To give every traveller instant access to a private, comfortable space to rest and recharge —
            wherever their journey takes them.
          </p>
        </div>
        <div class="card-surface p-8">
          <h2 class="text-lg font-semibold text-ivory-50">Vision</h2>
          <p class="mt-3 text-sm leading-relaxed text-ivory-100/65">
            To become the world's most trusted rest network — combining smart booking technology, premium pod
            design, and seamless traveller experiences across every major transit hub.
          </p>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-page">
        <SectionHeading eyebrow="What We're Solving" title="Waiting shouldn't mean discomfort" align="center" class="mx-auto" />

        <div class="before-after mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-ink-950/70 shadow-premium">
          <div class="grid md:grid-cols-2">
            <div class="comparison-side before-side p-6 sm:p-8">
              <p class="text-center text-xs font-semibold uppercase tracking-[0.22em] text-rose-200/75">Before</p>
              <div class="mt-7 flex flex-col items-center text-center">
                <span class="comparison-mark" aria-hidden="true">
                  <span class="comparison-mark-line" />
                  <span class="comparison-mark-seat" />
                </span>
                <h3 class="mt-4 text-2xl font-semibold text-ivory-50">Waiting Chair</h3>
              </div>

              <ul class="mt-8 space-y-3">
                <li
                  v-for="row in beforeAfterRows"
                  :key="row.before"
                  class="comparison-row border-white/10 bg-white/[0.03] text-ivory-100/62"
                >
                  {{ row.before }}
                </li>
              </ul>
            </div>

            <div class="comparison-side after-side p-6 sm:p-8">
              <p class="text-center text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">After</p>
              <div class="mt-7 flex flex-col items-center text-center">
                <span class="comparison-mark is-pod" aria-hidden="true">
                  <span class="comparison-pod-shell" />
                  <span class="comparison-pod-light" />
                </span>
                <h3 class="mt-4 text-2xl font-semibold text-ivory-50">Sleepy1 Pod</h3>
              </div>

              <ul class="mt-8 space-y-3">
                <li
                  v-for="row in beforeAfterRows"
                  :key="row.after"
                  class="comparison-row border-brand-300/20 bg-brand-400/10 text-ivory-50"
                >
                  {{ row.after }}
                </li>
              </ul>
            </div>
          </div>

          <div class="comparison-divider hidden md:block" />
        </div>
      </div>
    </section>

    <section class="section-pad bg-ink-900/40">
      <div class="container-page">
        <SectionHeading eyebrow="Brand Values" title="What guides every Sleepy1 pod" align="center" class="mx-auto" />
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="v in values" :key="v.title" class="card-surface p-6">
            <h3 class="font-semibold text-ivory-50">{{ v.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ v.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section ref="timelineSection" class="section-pad">
      <div class="container-page overflow-hidden">
        <SectionHeading eyebrow="Milestones" title="Our journey so far" align="center" class="mx-auto" />

        <div
          class="timeline-stage mx-auto mt-14 max-w-6xl"
          :style="{ '--timeline-progress': timelineProgress }"
        >
          <div class="relative px-4 sm:px-8">
            <div class="absolute left-8 right-8 top-8 h-px bg-white/10 sm:left-12 sm:right-12" />
            <div class="timeline-line absolute left-8 top-8 h-px bg-gradient-to-r from-brand-300 via-lavender-400 to-moon-400 sm:left-12" />

            <div class="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              <button
                v-for="(m, i) in milestoneDetails"
                :key="m.year"
                type="button"
                class="timeline-marker group text-center"
                :class="{ 'is-lit': i <= activeMilestone }"
                :style="{ '--marker-delay': `${i * 80}ms` }"
              >
                <span class="timeline-icon mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-ink-950 text-sm font-semibold tracking-[0.18em] text-ivory-100/55 shadow-soft transition duration-300 group-hover:-translate-y-1 group-active:scale-95">
                  {{ m.step }}
                </span>
                <span class="mt-4 block text-xs font-semibold uppercase tracking-[0.18em] text-brand-300/80">{{ m.label }}</span>
                <span class="mt-1 block text-sm text-ivory-100/45">{{ m.year }}</span>
              </button>
            </div>
          </div>

          <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <article
              v-for="(m, i) in milestoneDetails"
              :key="`${m.year}-card`"
              class="timeline-card card-surface p-6"
              :class="{ 'is-visible': i <= activeMilestone }"
              :style="{ '--card-delay': `${i * 90}ms` }"
            >
              <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">{{ m.year }}</p>
              <h3 class="mt-2 text-lg font-semibold text-ivory-50">{{ m.title }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-ivory-100/60">{{ m.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-ink-900/40">
      <div class="container-page">
        <SectionHeading eyebrow="Impact" title="Sleepy1 by the numbers" align="center" class="mx-auto" />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in impactStats" :key="stat.id" class="card-surface p-6 text-center">
            <p class="text-3xl font-semibold text-ivory-50">{{ stat.value }}</p>
            <p class="mt-1 text-sm text-ivory-100/50">{{ stat.label }}</p>
            <p v-if="!stat.isVerified" class="mt-2 text-[10px] uppercase tracking-wide text-amber-300/70">Illustrative estimate</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
        <SectionHeading eyebrow="Design Philosophy" title="Where hospitality meets engineering" description="Every pod blends hotel-grade materials — memory foam, blackout finishes, acoustic panelling — with the technology of a smart hotel room: QR access, climate control, and an in-pod entertainment panel. As we expand into stations, malls, and campuses, this same standard travels with us." />
        <div class="overflow-hidden rounded-3xl shadow-premium">
          <PodVisual id="pod-detail-2" variant="detail" class="h-full min-h-[260px] w-full" rounded="rounded-3xl" />
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden py-24 text-center">
      <div class="container-page relative">
        <h2 class="text-balance text-3xl font-semibold text-ivory-50 sm:text-4xl">Join us in redefining rest.</h2>
        <p class="mx-auto mt-3 max-w-lg text-ivory-100/65">Book your first Sleepy1 pod, or reach out if you'd like to bring Sleepy1 to your location.</p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton as="RouterLink" to="/book" size="lg">Book a Pod</PrimaryButton>
          <PrimaryButton as="RouterLink" to="/corporate" size="lg">Partner With Us</PrimaryButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page :deep(.card-surface:not(.timeline-card)) {
  transform: translateY(0) scale(1);
  transition:
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms ease,
    box-shadow 220ms ease,
    background-color 220ms ease;
}

.about-page :deep(.card-surface:not(.timeline-card):hover),
.about-page :deep(.card-surface:not(.timeline-card):focus-within) {
  border-color: rgba(167, 181, 253, 0.34);
  background-color: rgba(18, 20, 27, 0.86);
  transform: translateY(-8px) scale(1.012);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.07),
    0 24px 64px -32px rgba(139, 155, 251, 0.62);
}

.about-page :deep(.card-surface:not(.timeline-card):active) {
  transform: translateY(-3px) scale(0.992);
}

.before-after {
  position: relative;
  transform: translateY(0) scale(1);
  transition:
    transform 320ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.before-after:hover {
  border-color: rgba(167, 181, 253, 0.28);
  transform: translateY(-6px) scale(1.006);
  box-shadow: 0 34px 90px -46px rgba(139, 155, 251, 0.78);
}

.comparison-side {
  min-height: 520px;
  transition: background-color 260ms ease;
}

.before-side {
  background:
    radial-gradient(circle at 50% 20%, rgba(244, 63, 94, 0.1), transparent 38%),
    rgba(255, 255, 255, 0.02);
}

.after-side {
  background:
    radial-gradient(circle at 50% 20%, rgba(143, 208, 221, 0.16), transparent 40%),
    linear-gradient(180deg, rgba(139, 155, 251, 0.08), rgba(255, 255, 255, 0.02));
}

.before-after:hover .after-side {
  background:
    radial-gradient(circle at 50% 20%, rgba(143, 208, 221, 0.22), transparent 42%),
    linear-gradient(180deg, rgba(139, 155, 251, 0.13), rgba(255, 255, 255, 0.03));
}

.comparison-mark {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  width: 6rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(7, 8, 11, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.comparison-mark-line {
  position: absolute;
  height: 3.5rem;
  width: 0.35rem;
  border-radius: 9999px;
  background: rgba(250, 246, 239, 0.34);
  transform: translate(-0.95rem, 0.1rem) rotate(-16deg);
}

.comparison-mark-seat {
  position: absolute;
  height: 1.4rem;
  width: 3.4rem;
  border-radius: 9999px;
  border: 0.32rem solid rgba(250, 246, 239, 0.36);
  border-left-width: 0.48rem;
  transform: translate(0.45rem, 0.55rem) rotate(4deg);
}

.comparison-mark.is-pod {
  animation: restFloat 3.2s ease-in-out infinite;
  border-color: rgba(143, 208, 221, 0.28);
  background:
    radial-gradient(circle at 50% 35%, rgba(143, 208, 221, 0.16), transparent 54%),
    rgba(7, 8, 11, 0.76);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 42px -16px rgba(143, 208, 221, 0.9);
}

.comparison-pod-shell {
  position: absolute;
  height: 3.8rem;
  width: 4.6rem;
  border: 0.36rem solid rgba(191, 230, 238, 0.76);
  border-radius: 9999px 9999px 1.2rem 1.2rem;
  background: linear-gradient(180deg, rgba(143, 208, 221, 0.18), rgba(139, 155, 251, 0.08));
}

.comparison-pod-light {
  position: absolute;
  bottom: 1.7rem;
  height: 0.45rem;
  width: 2.4rem;
  border-radius: 9999px;
  background: rgba(250, 246, 239, 0.86);
  box-shadow: 0 0 18px rgba(191, 230, 238, 0.72);
}

.comparison-row {
  border-width: 1px;
  border-radius: 1rem;
  padding: 1rem 1.1rem;
  font-size: 0.95rem;
  font-weight: 600;
  transition:
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms ease,
    background-color 220ms ease;
}

.comparison-row:hover {
  transform: translateX(6px);
  border-color: rgba(167, 181, 253, 0.42);
  background-color: rgba(139, 155, 251, 0.13);
}

.comparison-divider {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  top: 2rem;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.18), transparent);
}

.timeline-stage {
  --timeline-progress: 0;
}

.timeline-line {
  width: calc((100% - 4rem) * var(--timeline-progress));
  box-shadow: 0 0 24px rgba(167, 181, 253, 0.45);
  transition: width 180ms ease-out;
}

.timeline-marker {
  animation: timelineRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--marker-delay);
}

.timeline-icon {
  filter: saturate(0.7);
}

.timeline-marker.is-lit .timeline-icon {
  border-color: rgba(167, 181, 253, 0.75);
  background: radial-gradient(circle at 50% 35%, rgba(184, 169, 240, 0.28), rgba(7, 8, 11, 0.92) 68%);
  box-shadow:
    0 0 0 1px rgba(167, 181, 253, 0.24),
    0 0 28px rgba(139, 155, 251, 0.45),
    0 14px 40px -22px rgba(143, 208, 221, 0.7);
  filter: saturate(1.15);
}

.timeline-card {
  opacity: 0.35;
  transform: translateY(28px) scale(0.98);
  transition:
    opacity 420ms ease,
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms ease,
    box-shadow 220ms ease;
  transition-delay: var(--card-delay);
}

.timeline-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.timeline-card:hover,
.timeline-card:focus-within {
  border-color: rgba(167, 181, 253, 0.36);
  transform: translateY(-8px) scale(1.015);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.07),
    0 24px 60px -30px rgba(139, 155, 251, 0.7);
}

.timeline-card:active {
  transform: translateY(-3px) scale(0.99);
}

@media (min-width: 640px) {
  .timeline-line {
    width: calc((100% - 6rem) * var(--timeline-progress));
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page :deep(.card-surface:not(.timeline-card)),
  .before-after,
  .comparison-mark,
  .comparison-row {
    animation: none;
    transition: none;
  }

  .timeline-line,
  .timeline-marker,
  .timeline-card {
    animation: none;
    transition: none;
  }

  .timeline-card {
    opacity: 1;
    transform: none;
  }
}

@keyframes restFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes timelineRise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
