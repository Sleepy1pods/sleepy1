<script setup lang="ts">
import { podTypes } from '@/data/pods'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import PodCard from '@/components/common/PodCard.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const flow = useBookingFlowStore()
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-ivory-50">Choose your pod</h2>
    <p class="mt-1 text-sm text-ivory-100/55">
      At {{ flow.selectedLocation?.name ?? 'your selected location' }} — pick the pod type that fits your journey.
    </p>

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <PodCard
        v-for="pod in podTypes"
        :key="pod.id"
        :pod="pod"
        :selected="flow.draft.podTypeId === pod.id"
        @select="flow.setPod(pod.id)"
      />
    </div>

    <div class="mt-10 flex justify-between">
      <SecondaryButton @click="flow.previousStep()">← Back</SecondaryButton>
      <PrimaryButton :disabled="!flow.draft.podTypeId" @click="flow.nextStep()">Continue →</PrimaryButton>
    </div>
  </div>
</template>
