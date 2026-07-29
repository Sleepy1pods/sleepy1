<script setup lang="ts">
import { locationEnvironments } from '@/data/environments'
import SectionHeading from '@/components/common/SectionHeading.vue'
import LocationEnvironmentCard from '@/components/common/LocationEnvironmentCard.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const revealTargets = locationEnvironments.map((_, i) => useScrollReveal(0.15, (i % 5) * 70))
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="A Growing Network"
          title="Designed for high-footfall locations"
          description="Sleepy1 pods are built to fit wherever people are made to wait — airports today, with a broader network of high-footfall locations planned ahead."
        />
        <SecondaryButton as="RouterLink" to="/locations" class="w-fit shrink-0">See Current & Planned Locations →</SecondaryButton>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div v-for="(env, i) in locationEnvironments" :key="env.id" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }">
          <LocationEnvironmentCard :environment="env" />
        </div>
      </div>
    </div>
  </section>
</template>
