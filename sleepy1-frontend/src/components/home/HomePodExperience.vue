<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
</script>

<template>
  <section class="section-pad">
    <div class="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div class="order-2 aspect-[4/3] overflow-hidden rounded-3xl lg:order-1">
        <PodVisual id="pod-exterior-1" variant="exterior" class="h-full w-full" rounded="rounded-3xl" />
      </div>
      <div class="order-1 lg:order-2">
        <SectionHeading eyebrow="The Pod" title="Step inside, and the world outside goes quiet." description="Sealed, silent, and yours alone — every detail is built for one purpose: real rest, on your schedule." />
        <SecondaryButton as="RouterLink" to="/pod-experience" class="mt-8 w-fit">Explore the pod →</SecondaryButton>
      </div>
    </div>
  </section>
</template>
