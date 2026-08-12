<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
</script>

<template>
  <section class="section-pad">
    <div class="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div class="order-2 mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl lg:order-1">
        <img src="/pod3.png" alt="Sleepy1 pod exterior" class="h-full w-full object-cover" />
      </div>
      <div class="order-1 lg:order-2">
        <SectionHeading eyebrow="The Pod" title="Step inside, and the world outside goes quiet." description="Sealed, silent, and yours alone — every detail is built for one purpose: real rest, on your schedule." />
        <SecondaryButton as="RouterLink" to="/pod-experience" class="mt-8 w-fit">Explore the pod →</SecondaryButton>
      </div>
    </div>
  </section>
</template>
