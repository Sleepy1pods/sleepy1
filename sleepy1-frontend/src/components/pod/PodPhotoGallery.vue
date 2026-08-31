<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
</script>

<template>
  <section class="section-pad bg-ink-950">
    <div class="container-page">
      <SectionHeading 
        eyebrow="Gallery" 
        title="Inside & Out" 
        description="A closer look at the Sleepy1 Pod's design and features." 
        align="center" 
        class="mx-auto"
      />

      <!-- Photo Gallery Grid -->
      <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-ink-900 border border-white/5">
          <img src="/pod1.png" alt="Pod Exterior Front" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div class="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p class="text-sm font-semibold tracking-wider text-ivory-50 uppercase">Exterior Profile</p>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-ink-900 border border-white/5">
          <img src="/pod2.png" alt="Pod Exterior Side" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div class="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p class="text-sm font-semibold tracking-wider text-ivory-50 uppercase">Side Entry</p>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-ink-900 border border-white/5">
          <img src="/pod3.jpeg" alt="Pod Interior" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div class="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p class="text-sm font-semibold tracking-wider text-ivory-50 uppercase">Cabin Interior</p>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-ink-900 border border-white/5">
          <img src="/pod4.png" alt="Pod Entertainment" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div class="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p class="text-sm font-semibold tracking-wider text-ivory-50 uppercase">Entertainment System</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
