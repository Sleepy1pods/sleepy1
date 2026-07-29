<script setup lang="ts">
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
</script>

<template>
  <section class="section-pad relative overflow-hidden">
    <div class="absolute inset-0">
      <PodVisual id="pod-exterior-1" variant="exterior" class="h-full w-full opacity-40" rounded="rounded-none" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/60" />
    </div>
    <div class="container-page relative text-center">
      <SectionHeading
        title="Your next layover deserves better than a chair."
        description="Book a Sleepy1 pod in under two minutes and turn wasted transit time into real rest."
        align="center"
        class="mx-auto"
      />
      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton as="RouterLink" to="/book" size="lg">Book Your Pod →</PrimaryButton>
        <router-link to="/locations" class="text-sm font-semibold text-ivory-100/70 underline underline-offset-4 hover:text-ivory-50">
          or browse locations first
        </router-link>
      </div>
    </div>
  </section>
</template>
