<script setup lang="ts">
import { podTypes, podFeatureComparison } from '@/data/pods'
import { getAmenitiesByIds } from '@/data/amenities'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import AmenityItem from '@/components/common/AmenityItem.vue'
import FeatureComparison from '@/components/common/FeatureComparison.vue'
import ImageGallery from '@/components/common/ImageGallery.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import DreamBackground from '@/components/atmosphere/DreamBackground.vue'
import PodFeatureAnatomy from '@/components/pod/PodFeatureAnatomy.vue'
import type { GalleryImage } from '@/types/common'

usePageMeta({
  title: 'The Sleep Pod',
  description: 'Explore the Sleepy1 sleep pod — ergonomic mattress, circadian lighting, smart access, acoustic isolation, and full amenities for genuine private rest.',
})

const gallery: GalleryImage[] = [
  { id: 'g1', src: 'pod-exterior-1', alt: 'Sleepy1 pod exterior' },
  { id: 'g2', src: 'pod-interior-1', alt: 'Sleepy1 pod interior in rest mode' },
  { id: 'g3', src: 'pod-desk-1', alt: 'Sleepy1 pod entertainment and control panel' },
  { id: 'g4', src: 'pod-detail-1', alt: 'Sleepy1 pod smart control panel' },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden py-20 sm:py-28">
      <div class="absolute inset-0 z-0">
        <DreamBackground tone="depth" density="medium" />
      </div>
      <div class="container-page relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="eyebrow mb-4">The Sleep Pod</p>
          <h1 class="text-balance text-4xl font-semibold text-ivory-50 sm:text-5xl">Engineered for real rest, wherever you are.</h1>
          <p class="mt-5 max-w-lg text-lg leading-relaxed text-ivory-100/65">
            Every Sleepy1 pod is a fully enclosed private structure combining ergonomic comfort, hospitality-grade
            hygiene, and smart technology — built purely around one thing: genuine, uninterrupted rest.
          </p>
          <PrimaryButton as="RouterLink" to="/book" size="lg" class="mt-8">Book a Pod →</PrimaryButton>
        </div>
        <div class="overflow-hidden rounded-3xl shadow-premium">
          <PodVisual id="pod-interior-2" variant="interior" class="aspect-[4/3] w-full" rounded="rounded-3xl" />
        </div>
      </div>
    </section>

    <section id="solo-rest" class="section-pad bg-ink-900/40">
      <div class="container-page">
        <SectionHeading eyebrow="Rest Mode" title="Deep sleep, uninterrupted" description="Ergonomic memory-foam mattress, circadian lighting that dims toward sleep, and acoustic isolation that mutes the terminal outside." />
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AmenityItem v-for="a in getAmenitiesByIds(['mattress', 'lighting', 'noise'])" :key="a.id" :amenity="a" />
        </div>
      </div>
    </section>

    <section id="solo-work" class="section-pad">
      <div class="container-page">
        <SectionHeading eyebrow="Wind Down" title="A private room to unwind" description="An in-pod entertainment panel, dependable WiFi for music or a call home, and smart climate control — everything you need to properly switch off." />
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AmenityItem v-for="a in getAmenitiesByIds(['display', 'wifi', 'climate'])" :key="a.id" :amenity="a" />
        </div>
      </div>
    </section>

    <section class="section-pad bg-ink-900/40">
      <div class="container-page">
        <SectionHeading eyebrow="Access, Safety & Hygiene" title="Every stay, reset to new" align="center" class="mx-auto" />
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AmenityItem v-for="a in getAmenitiesByIds(['lock', 'ventilation', 'housekeeping'])" :key="a.id" :amenity="a" />
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-page">
        <SectionHeading eyebrow="Pod Gallery" title="A closer look inside" align="center" class="mx-auto" />
        <div class="mt-10">
          <ImageGallery :images="gallery" />
        </div>
      </div>
    </section>

    <PodFeatureAnatomy id="all-amenities" />

    <section id="premium-suite" class="section-pad">
      <div class="container-page">
        <SectionHeading eyebrow="Compare Pods" title="Find the right pod for your stay" align="center" class="mx-auto" />
        <div class="mt-10">
          <FeatureComparison :rows="podFeatureComparison" />
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <span v-for="pod in podTypes" :key="pod.id" class="rounded-full bg-white/5 px-4 py-2 text-sm text-ivory-100/70">
            {{ pod.name }} · ₹{{ pod.pricePerHour }}/hr
          </span>
        </div>
      </div>
    </section>

    <section class="py-20 text-center">
      <PrimaryButton as="RouterLink" to="/book" size="lg">Book Your Pod →</PrimaryButton>
    </section>
  </div>
</template>
