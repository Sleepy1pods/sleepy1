<script setup lang="ts">
import { impactStats, milestones } from '@/data/statistics'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import DreamBackground from '@/components/atmosphere/DreamBackground.vue'

usePageMeta({
  title: 'About Sleepy1',
  description: 'Sleepy1 is working to make safe, private rest more accessible in places where people travel, wait, and spend long hours — starting with airports, and expanding to more high-footfall locations.',
})

const values = [
  { title: 'Hospitality First', description: 'Every design decision starts with the question: would this feel like a five-star stay, however short?' },
  { title: 'Radical Privacy', description: 'No shared curtains, no cameras inside pods — your rest is genuinely your own.' },
  { title: 'Built For Speed', description: 'Travellers are time-constrained. Booking, check-in, and check-out are designed to take seconds, not minutes.' },
  { title: 'Everywhere You Wait', description: 'Airports first, then railway stations, malls, and business districts — wherever people wait, we belong.' },
]
</script>

<template>
  <div>
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
              airports without access to private, comfortable rest spaces. Whether it's a delayed flight, an overnight
              layover, a business trip, or an early morning departure, travellers deserve a peaceful environment to
              recharge. Our mission began with one idea — bring premium sleep pods directly into airports across
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
        <SectionHeading eyebrow="What We're Solving" title="Waiting shouldn't mean discomfort" description="Plastic chairs, bright terminal lighting, and constant announcements make real rest nearly impossible — whether it's a long layover, a red-eye connection, a delayed train, or a long wait during a hospital visit. Sleepy1 exists to remove that trade-off entirely." />
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

    <section class="section-pad">
      <div class="container-page">
        <SectionHeading eyebrow="Milestones" title="Our journey so far" align="center" class="mx-auto" />
        <div class="mx-auto mt-12 max-w-2xl space-y-8 border-l border-white/10 pl-8">
          <div v-for="m in milestones" :key="m.year" class="relative">
            <span class="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-brand-400" />
            <p class="text-sm font-semibold uppercase tracking-wide text-brand-300">{{ m.year }}</p>
            <h3 class="mt-1 font-semibold text-ivory-50">{{ m.title }}</h3>
            <p class="mt-1 text-sm text-ivory-100/60">{{ m.description }}</p>
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
        <SectionHeading eyebrow="Design Philosophy" title="Where hospitality meets engineering" description="Every pod blends hotel-grade materials — memory foam, blackout finishes, acoustic panelling — with the technology of a smart hotel room: QR access, climate control, and an in-pod entertainment panel. As we expand beyond airports into stations, malls, and campuses, this same standard travels with us." />
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
