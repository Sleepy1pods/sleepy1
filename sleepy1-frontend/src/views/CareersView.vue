<script setup lang="ts">
import { ref } from 'vue'
import { jobOpenings } from '@/data/careers'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

usePageMeta({
  title: 'Careers',
  description: 'Join Sleepy1 — open roles across engineering, operations, design, and business development.',
})

const ui = useUiStore()
const activeJobId = ref<string | null>(null)
const activeJob = () => jobOpenings.find((j) => j.id === activeJobId.value)

function applyNow() {
  ui.pushToast({ type: 'success', title: 'Application received', description: 'Our talent team will be in touch. (Simulated for this demo.)' })
  activeJobId.value = null
}
</script>

<template>
  <div class="container-page max-w-4xl py-16">
    <SectionHeading level="h1" eyebrow="Careers" title="Build the future of rest with us" align="center" class="mx-auto" description="Sleepy1 is a small team solving a problem every traveller understands. Here's where we're hiring." />

    <div class="mt-12 divide-y divide-white/8 rounded-2xl border border-white/8">
      <div v-for="job in jobOpenings" :key="job.id" class="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="font-semibold text-ivory-50">{{ job.title }}</h3>
          <p class="mt-1 text-sm text-ivory-100/50">{{ job.department }} · {{ job.location }} · {{ job.type }}</p>
        </div>
        <SecondaryButton size="sm" class="shrink-0" @click="activeJobId = job.id">View & Apply</SecondaryButton>
      </div>
    </div>

    <ModalDialog :open="activeJobId !== null" :title="activeJob()?.title ?? ''" @close="activeJobId = null">
      <p v-if="activeJob()" class="text-sm text-ivory-100/50">{{ activeJob()!.department }} · {{ activeJob()!.location }} · {{ activeJob()!.type }}</p>
      <p v-if="activeJob()" class="mt-4 text-sm leading-relaxed text-ivory-100/70">{{ activeJob()!.description }}</p>
      <PrimaryButton full-width class="mt-6" @click="applyNow">Submit Application</PrimaryButton>
    </ModalDialog>
  </div>
</template>
