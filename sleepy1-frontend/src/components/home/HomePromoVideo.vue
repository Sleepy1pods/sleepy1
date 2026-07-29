<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PodVisual from '@/components/common/PodVisual.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'

const isOpen = ref(false)
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Experience Sleepy1" title="See a Sleepy1 pod, from arrival to rest" align="center" class="mx-auto" />
      <button
        type="button"
        class="group relative mx-auto mt-12 block w-full max-w-4xl overflow-hidden rounded-3xl shadow-premium"
        aria-haspopup="dialog"
        @click="isOpen = true"
      >
        <div class="aspect-video w-full">
          <PodVisual id="pod-detail-1" variant="detail" class="h-full w-full" rounded="rounded-3xl" />
        </div>
        <div class="absolute inset-0 flex items-center justify-center bg-ink-950/30 transition-colors group-hover:bg-ink-950/40">
          <span class="flex h-20 w-20 items-center justify-center rounded-full bg-ivory-50/95 text-ink-950 shadow-premium transition-transform group-hover:scale-110">
            <svg class="ml-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z" /></svg>
          </span>
        </div>
        <span class="absolute bottom-5 left-5 rounded-full bg-ink-950/70 px-4 py-1.5 text-sm font-medium text-ivory-100 backdrop-blur">
          1:42 · Inside the Sleepy1 Pod
        </span>
      </button>
    </div>

    <ModalDialog :open="isOpen" title="Sleepy1 Brand Film" max-width="max-w-2xl" @close="isOpen = false">
      <div class="aspect-video overflow-hidden rounded-2xl">
        <PodVisual id="pod-interior-2" variant="interior" class="h-full w-full" />
      </div>
      <p class="mt-4 text-sm text-ivory-100/60">
        This preview is illustrative placeholder content for the MVP build. Replace with the production brand
        film before launch — see <code class="rounded bg-white/10 px-1.5 py-0.5 text-xs">ASSET_REQUIREMENTS.md</code> for specs.
      </p>
    </ModalDialog>
  </section>
</template>
