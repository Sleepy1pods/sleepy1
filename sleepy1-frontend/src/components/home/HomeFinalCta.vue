<script setup lang="ts">
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
</script>

<template>
  <section class="section-pad relative overflow-hidden">
    <div class="absolute inset-0">
      <PodVisual id="pod-exterior-1" variant="exterior" class="h-full w-full opacity-25" rounded="rounded-none" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/70" />
    </div>
    <div class="container-page relative text-center">
      <SectionHeading
        title="Rest is waiting."
        description="Book a Sleepy1 pod in under two minutes."
        align="center"
        class="mx-auto"
      />
      <div class="mt-8 flex justify-center">
        <PrimaryButton as="RouterLink" to="/book" size="lg">Book your pod</PrimaryButton>
        <!-- <PrimaryButton as="a" href="https://docs.google.com/forms/your-form-link-here" target="_blank" size="lg">Book your pod</PrimaryButton> -->
      </div>
    </div>
  </section>
</template>
