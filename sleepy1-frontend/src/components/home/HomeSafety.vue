<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'

const pillars = [
  { title: 'Safety', description: 'Smart locks respond only to your unique booking QR code, and every hub is covered by on-site security.', icon: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z' },
  { title: 'Hygiene', description: 'A full housekeeping reset — fresh linen, sanitised surfaces, and air exchange — happens after every single stay.', icon: 'M5 4l14 14M8 4h8l2 5H6l2-5zM4 12h16l-1.5 8h-13L4 12z' },
  { title: 'Privacy', description: 'Fully enclosed pods, zero cameras or microphones inside — your rest stays entirely your own.', icon: 'M6 11V8a6 6 0 1112 0v3M5 11h14v10H5V11z' },
]
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <div class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <SectionHeading eyebrow="Safety, Hygiene & Privacy" title="Your rest, protected end to end" description="Every part of the Sleepy1 experience is engineered around one principle: your time in the pod belongs entirely to you." />
        <div class="grid gap-4 sm:grid-cols-3">
          <div v-for="p in pillars" :key="p.title" class="card-surface p-6">
            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path :d="p.icon" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
            <h3 class="mt-4 text-base font-semibold text-ivory-50">{{ p.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ p.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
