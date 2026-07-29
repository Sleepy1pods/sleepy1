<script setup lang="ts">
import { ref } from 'vue'
import type { GalleryImage } from '@/types/common'
import PodVisual from './PodVisual.vue'
import ImageLightbox from './ImageLightbox.vue'

defineProps<{ images: GalleryImage[] }>()

const activeIndex = ref<number | null>(null)
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <button
        v-for="(image, i) in images"
        :key="image.id"
        type="button"
        class="group relative h-32 overflow-hidden rounded-xl sm:h-36"
        :aria-label="`Open image: ${image.alt}`"
        @click="activeIndex = i"
      >
        <PodVisual :id="image.src" class="h-full w-full transition-transform duration-500 group-hover:scale-110" />
        <span class="absolute inset-0 bg-ink-950/0 transition-colors group-hover:bg-ink-950/20" />
      </button>
    </div>
    <ImageLightbox
      v-if="activeIndex !== null"
      :images="images"
      :index="activeIndex"
      @close="activeIndex = null"
      @update:index="activeIndex = $event"
    />
  </div>
</template>
