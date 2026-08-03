<script setup lang="ts">
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import HeroAtmosphere from '@/components/home/HeroAtmosphere.vue'
</script>

<template>
  <section class="relative overflow-hidden pt-20 sm:pt-28 lg:pt-32">
    <HeroAtmosphere />

    <div class="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
      <div class="reveal pb-20 sm:pb-28 lg:pb-36">
        <p class="eyebrow mb-7">Premium Rest, On Demand</p>
        <h1 class="text-balance font-display text-5xl font-medium leading-[1.08] text-ivory-50 sm:text-6xl lg:text-[4.25rem]">
          A quiet place to rest, right where you already are.
        </h1>
        <p class="mt-7 max-w-md text-lg leading-relaxed text-ivory-100/55">
          Private, hotel-grade sleep pods in the places life makes you wait.
        </p>
        <div class="mt-11">
          <PrimaryButton as="RouterLink" to="/book" size="lg">Find a Sleep Pod</PrimaryButton>
        </div>
      </div>

      <div class="reveal pb-20 [animation-delay:120ms] sm:pb-28 lg:pb-36">
        <div class="mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl shadow-premium">
          <PodVisual id="pod-interior-1" variant="interior" class="h-full w-full" rounded="rounded-3xl" />
        </div>
      </div>
    </div>
  </section>
</template>
