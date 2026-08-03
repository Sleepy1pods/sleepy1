<script setup lang="ts">
import { impactStats, milestones } from '@/data/statistics'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import DreamCard from '@/components/common/DreamCard.vue'
import HomeNewsletter from '@/components/home/HomeNewsletter.vue'

usePageMeta({
  title: 'About Sleepy1',
  description: 'Sleepy1 is working to make safe, private rest more accessible in places where people travel, wait, and spend long hours — starting with campuses and hospitals, and expanding to more high-footfall locations.',
})

const values = [
  { title: 'Hospitality first', description: 'Every decision starts with one question: would this feel like a five-star stay, however short?' },
  { title: 'Radical privacy', description: 'No shared curtains, no cameras inside pods — your rest is genuinely your own.' },
  { title: 'Built for speed', description: 'Booking, check-in, and check-out are designed to take seconds, not minutes.' },
  { title: 'Everywhere you wait', description: 'Campuses first, then stations, malls, and business districts.' },
]

const beforeAfterRows = [
  { before: 'A waiting chair', after: 'A private pod' },
  { before: 'Bright, noisy terminals', after: 'Ambient light, acoustic isolation' },
  { before: 'Nowhere to leave your bags', after: 'A locked space that is yours alone' },
  { before: 'Time you can\'t get back', after: 'Real, recoverable rest' },
]

const milestoneDetails = milestones.map((milestone, index) => ({
  ...milestone,
  step: String(index + 1).padStart(2, '0'),
}))
</script>

<template>
  <div class="about-page">
    <section class="section-pad">
      <div class="container-page text-center">
        <h1 class="text-balance font-display text-4xl font-medium text-ivory-50 sm:text-5xl">About Sleepy1</h1>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-ivory-100/65">
          Making safe, private rest accessible wherever life makes people wait.
        </p>
      </div>

      <div class="container-page mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 class="text-xl font-semibold text-ivory-50">Our story</h2>
          <p class="mt-4 leading-relaxed text-ivory-100/65">
            Sleepy1 started with a simple observation: people spend countless hours waiting in transit hubs
            with no access to private, comfortable rest. We began with campuses across Hubli and Dharwad, and
            we're building toward every high-footfall place travellers pass through.
          </p>
        </div>
        <div class="overflow-hidden rounded-3xl">
          <PodVisual id="pod-exterior-1" variant="exterior" class="h-full min-h-[280px] w-full" rounded="rounded-3xl" />
        </div>
      </div>
    </section>

    <section class="section-pad border-t border-white/8">
      <div class="container-page grid gap-6 sm:grid-cols-2">
        <DreamCard :glow="false" class="p-8">
          <h2 class="text-lg font-semibold text-ivory-50">Mission</h2>
          <p class="mt-3 text-sm leading-relaxed text-ivory-100/65">
            To give every traveller instant access to a private, comfortable space to rest — wherever their
            journey takes them.
          </p>
        </DreamCard>
        <DreamCard :glow="false" class="p-8">
          <h2 class="text-lg font-semibold text-ivory-50">Vision</h2>
          <p class="mt-3 text-sm leading-relaxed text-ivory-100/65">
            To become the most trusted rest network — smart booking, premium pod design, and a seamless
            experience across every major transit hub.
          </p>
        </DreamCard>
      </div>
    </section>

    <section class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading eyebrow="What we're solving" title="Waiting shouldn't mean discomfort" align="center" class="mx-auto" />

        <div class="mx-auto mt-12 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
          <div class="bg-ink-950 p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-ivory-100/40">Before</p>
            <ul class="mt-6 space-y-4">
              <li v-for="row in beforeAfterRows" :key="row.before" class="text-sm text-ivory-100/55">{{ row.before }}</li>
            </ul>
          </div>
          <div class="bg-ink-950 p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">After</p>
            <ul class="mt-6 space-y-4">
              <li v-for="row in beforeAfterRows" :key="row.after" class="text-sm font-medium text-ivory-50">{{ row.after }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading eyebrow="Brand Values" title="What guides every Sleepy1 pod" align="center" class="mx-auto" />
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="v in values" :key="v.title">
            <h3 class="font-semibold text-ivory-50">{{ v.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ v.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading eyebrow="Milestones" title="Our journey so far" align="center" class="mx-auto" />
        <div class="mx-auto mt-14 max-w-3xl divide-y divide-white/8 border-t border-white/8">
          <div v-for="m in milestoneDetails" :key="m.year" class="flex flex-col gap-1 py-6 sm:flex-row sm:gap-8">
            <p class="w-20 shrink-0 text-sm font-semibold text-ivory-100/40">{{ m.step }} · {{ m.year }}</p>
            <div>
              <h3 class="text-base font-semibold text-ivory-50">{{ m.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-ivory-100/60">{{ m.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading eyebrow="Impact" title="Sleepy1 by the numbers" align="center" class="mx-auto" />
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in impactStats" :key="stat.id" class="text-center">
            <p class="font-display text-3xl font-medium text-ivory-50">{{ stat.value }}</p>
            <p class="mt-1 text-sm text-ivory-100/50">{{ stat.label }}</p>
            <p v-if="!stat.isVerified" class="mt-2 text-[10px] uppercase tracking-wide text-ivory-100/35">Illustrative estimate</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad border-t border-white/8">
      <div class="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading eyebrow="Design Philosophy" title="Where hospitality meets engineering" description="Every pod blends hotel-grade materials with the technology of a smart hotel room — QR access, climate control, and an in-pod entertainment panel. As we expand into stations, malls, and campuses, this standard travels with us." />
        <div class="overflow-hidden rounded-3xl">
          <PodVisual id="pod-detail-2" variant="detail" class="h-full min-h-[260px] w-full" rounded="rounded-3xl" />
        </div>
      </div>
    </section>

    <HomeNewsletter />

    <section class="border-t border-white/8 py-24 text-center">
      <div class="container-page">
        <h2 class="text-balance font-display text-3xl font-medium text-ivory-50 sm:text-4xl">Join us in redefining rest.</h2>
        <p class="mx-auto mt-3 max-w-lg text-ivory-100/65">Book your first Sleepy1 pod, or reach out about bringing Sleepy1 to your location.</p>
        <div class="mt-8 flex justify-center">
          <PrimaryButton as="RouterLink" to="/book" size="lg">Book a pod</PrimaryButton>
        </div>
      </div>
    </section>
  </div>
</template>
