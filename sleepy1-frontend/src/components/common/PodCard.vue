<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PodTypeDefinition } from '@/types/pod'
import { getAmenitiesByIds } from '@/data/amenities'
import PodVisual from './PodVisual.vue'
import AmenityIcon from './AmenityIcon.vue'
import ModalDialog from './ModalDialog.vue'
import PrimaryButton from './PrimaryButton.vue'
import SecondaryButton from './SecondaryButton.vue'

const props = withDefaults(
  defineProps<{ pod: PodTypeDefinition; selected?: boolean; pricePerHour?: number }>(),
  { selected: false },
)

const emit = defineEmits<{ select: [] }>()

const isModalOpen = ref(false)

const amenityPreview = computed(() => getAmenitiesByIds(props.pod.amenityIds).slice(0, 4))
const allAmenities = computed(() => getAmenitiesByIds(props.pod.amenityIds))

function handleSelectFromModal() {
  isModalOpen.value = false
  emit('select')
}
</script>

<template>
  <div
    class="card-surface group relative flex w-full flex-col overflow-hidden text-left transition-all duration-300 hover:scale-[1.02]"
    :class="selected ? 'border-brand-400 ring-2 ring-brand-400/40 bg-brand-900/20' : ''"
  >
    <!-- Compact Image Header (h-28 = 112px) -->
    <div class="relative h-28 overflow-hidden cursor-pointer" @click="$emit('select')">
      <PodVisual :id="pod.image" class="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
      <span class="absolute right-2.5 top-2.5 rounded-full bg-ink-950/75 px-2 py-0.5 text-[11px] font-semibold text-ivory-100 backdrop-blur">
        {{ pod.occupancy }} guest{{ pod.occupancy > 1 ? 's' : '' }}
      </span>
      <span v-if="selected" class="absolute left-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-400 text-ink-950 shadow-soft">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
    </div>

    <!-- Minimum Necessary Content -->
    <div class="flex flex-1 flex-col justify-between p-4">
      <div>
        <!-- Name & Price in one compact row -->
        <div class="flex items-start justify-between gap-2">
          <h3 class="text-base font-bold text-ivory-50 group-hover:text-brand-300 transition-colors cursor-pointer" @click="$emit('select')">
            {{ pod.name }}
          </h3>
          <span class="text-sm font-bold text-brand-300 whitespace-nowrap">
            ₹{{ pricePerHour ?? pod.pricePerHour }}<span class="text-xs font-normal text-ivory-100/50">/hr</span>
          </span>
        </div>
        <!-- 1-line concise tagline -->
        <p class="mt-1 text-xs text-ivory-100/60 truncate" :title="pod.tagline">{{ pod.tagline }}</p>

        <!-- Compact 4 Amenity Icon Badges -->
        <div class="mt-3 flex items-center gap-1.5">
          <span
            v-for="a in amenityPreview"
            :key="a.id"
            class="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-ivory-100/70 hover:bg-white/10 hover:text-brand-300 transition-colors"
            :title="a.label"
            :aria-label="a.label"
          >
            <AmenityIcon :icon="a.icon" size="h-3.5 w-3.5" />
          </span>
          <span v-if="pod.amenityIds.length > 4" class="text-[11px] font-medium text-ivory-100/40">
            +{{ pod.amenityIds.length - 4 }}
          </span>
        </div>
      </div>

      <!-- Action Row: View Details Button + Select Button -->
      <div class="mt-4 flex items-center justify-between gap-1.5 border-t border-white/10 pt-3">
        <button
          type="button"
          class="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-ivory-100/70 transition-colors hover:bg-white/10 hover:text-ivory-50 whitespace-nowrap"
          @click.stop="isModalOpen = true"
        >
          <span>Details</span>
          <svg class="h-3.5 w-3.5 text-brand-300 shrink-0" viewBox="0 0 24 24" fill="none"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>

        <button
          type="button"
          class="rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap shrink-0"
          :class="
            selected
              ? 'bg-brand-400 text-ink-950 shadow-soft ring-1 ring-brand-300'
              : 'bg-white/10 text-ivory-50 hover:bg-brand-400 hover:text-ink-950'
          "
          @click="$emit('select')"
        >
          {{ selected ? 'Selected ✓' : 'Select →' }}
        </button>
      </div>
    </div>

    <!-- View Details Modal -->
    <ModalDialog :open="isModalOpen" :title="pod.name" max-width="max-w-2xl" @close="isModalOpen = false">
      <div class="space-y-4">
        <!-- High-Res Visual Header -->
        <div class="relative h-44 w-full overflow-hidden rounded-xl bg-ink-900">
          <PodVisual :id="pod.image" class="h-full w-full" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
          <span class="absolute right-3 top-3 rounded-full bg-ink-950/80 px-2.5 py-1 text-xs font-semibold text-ivory-50 backdrop-blur-md">
            {{ pod.occupancy }} guest{{ pod.occupancy > 1 ? 's' : '' }} max
          </span>
          <span class="absolute bottom-3 left-3 rounded-full bg-brand-400 px-3 py-1 text-xs font-bold text-ink-950 shadow-soft">
            ₹{{ pricePerHour ?? pod.pricePerHour }}/hour
          </span>
        </div>

        <!-- Tagline & Description -->
        <div>
          <h4 class="text-sm font-semibold text-brand-300">{{ pod.tagline }}</h4>
          <p class="mt-1.5 text-xs sm:text-sm leading-relaxed text-ivory-100/80">{{ pod.description }}</p>
        </div>

        <!-- Best For Chips -->
        <div v-if="pod.bestFor && pod.bestFor.length">
          <p class="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ivory-100/50">Ideal For:</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="item in pod.bestFor"
              :key="item"
              class="rounded-full border border-brand-400/30 bg-brand-400/10 px-2.5 py-0.5 text-xs font-medium text-brand-200"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <!-- Included Amenities Grid -->
        <div>
          <p class="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ivory-100/50">Included Pod Features:</p>
          <div class="grid gap-2 sm:grid-cols-2">
            <div
              v-for="a in allAmenities"
              :key="a.id"
              class="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5"
            >
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-brand-300">
                <AmenityIcon :icon="a.icon" size="h-3.5 w-3.5" />
              </span>
              <div>
                <p class="text-xs font-semibold text-ivory-50">{{ a.label }}</p>
                <p class="mt-0.5 text-[11px] leading-relaxed text-ivory-100/50">{{ a.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Action Footer -->
        <div class="flex items-center justify-between border-t border-white/10 pt-3">
          <SecondaryButton type="button" size="sm" @click="isModalOpen = false">Close</SecondaryButton>
          <PrimaryButton type="button" size="sm" @click="handleSelectFromModal">
            Select This Pod (₹{{ pricePerHour ?? pod.pricePerHour }}/hr) →
          </PrimaryButton>
        </div>
      </div>
    </ModalDialog>
  </div>
</template>
