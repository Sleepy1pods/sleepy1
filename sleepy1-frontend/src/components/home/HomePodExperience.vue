<script setup lang="ts">
import { useRouter } from 'vue-router'
import { podTypes } from '@/data/pods'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PodCard from '@/components/common/PodCard.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const router = useRouter()
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Our Pods" title="The Sanctuary Experience" description="Every Sleepy1 pod is a marvel of engineering — a peaceful oasis amid outside chaos, designed for comfort, privacy, and deep relaxation." />
        <SecondaryButton as="RouterLink" to="/pod-experience" class="w-fit shrink-0">Explore The Pod →</SecondaryButton>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <PodCard
          v-for="pod in podTypes"
          :key="pod.id"
          :pod="pod"
          @select="router.push(`/pod-experience#${pod.type}`)"
        />
      </div>
    </div>
  </section>
</template>
