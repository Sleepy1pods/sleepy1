<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import PricingCalculator from '@/components/common/PricingCalculator.vue'
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page">
      <SectionHeading eyebrow="Try It Yourself" title="Build your stay and see the price instantly" align="center" class="mx-auto" description="An interactive preview of the Sleepy1 booking experience — pick a pod, duration, and add-ons to estimate your total." />
      <div class="mx-auto mt-12 max-w-4xl">
        <PricingCalculator />
      </div>
    </div>
  </section>
</template>
