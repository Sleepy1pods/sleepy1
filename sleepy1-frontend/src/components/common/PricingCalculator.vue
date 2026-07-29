<script setup lang="ts">
import { ref, computed } from 'vue'
import { podTypes } from '@/data/pods'
import { bookingExtras } from '@/data/bookings'
import { formatInr } from '@/utils/format'
import PrimaryButton from './PrimaryButton.vue'

const selectedPodId = ref(podTypes[0].id)
const duration = ref(2)
const selectedExtraIds = ref<string[]>([])

const selectedPod = computed(() => podTypes.find((p) => p.id === selectedPodId.value) ?? podTypes[0])
const extrasTotal = computed(() =>
  bookingExtras.filter((e) => selectedExtraIds.value.includes(e.id)).reduce((sum, e) => sum + e.price, 0),
)
const basePrice = computed(() => selectedPod.value.pricePerHour * duration.value)
const serviceFee = 49
const taxes = computed(() => Math.round((basePrice.value + extrasTotal.value + serviceFee) * 0.12))
const total = computed(() => basePrice.value + extrasTotal.value + serviceFee + taxes.value)

function toggleExtra(id: string) {
  selectedExtraIds.value = selectedExtraIds.value.includes(id)
    ? selectedExtraIds.value.filter((e) => e !== id)
    : [...selectedExtraIds.value, id]
}
</script>

<template>
  <div class="card-surface grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
    <div>
      <label class="mb-2 block text-sm font-medium text-ivory-100/70">Pod type</label>
      <select
        v-model="selectedPodId"
        class="min-h-[44px] w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-ivory-50 focus:border-brand-400"
      >
        <option v-for="pod in podTypes" :key="pod.id" :value="pod.id">{{ pod.name }} · ₹{{ pod.pricePerHour }}/hr</option>
      </select>

      <label class="mb-2 mt-6 block text-sm font-medium text-ivory-100/70">Duration: {{ duration }} hour{{ duration > 1 ? 's' : '' }}</label>
      <input v-model.number="duration" type="range" min="1" max="8" step="1" class="w-full accent-brand-400" />

      <p class="mb-2 mt-6 text-sm font-medium text-ivory-100/70">Add-ons</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="extra in bookingExtras"
          :key="extra.id"
          type="button"
          class="min-h-[40px] rounded-full border px-3.5 py-2 text-xs font-medium transition-colors"
          :class="selectedExtraIds.includes(extra.id) ? 'border-brand-400 bg-brand-400/15 text-brand-200' : 'border-white/10 text-ivory-100/60 hover:border-white/25'"
          @click="toggleExtra(extra.id)"
        >
          {{ extra.label }} · ₹{{ extra.price }}
        </button>
      </div>
    </div>

    <div class="rounded-2xl bg-white/[0.03] p-6">
      <p class="text-sm font-semibold uppercase tracking-wide text-ivory-100/50">Live Estimate</p>
      <dl class="mt-4 space-y-2 text-sm">
        <div class="flex justify-between"><dt class="text-ivory-100/60">Base ({{ duration }}h)</dt><dd class="text-ivory-50">{{ formatInr(basePrice) }}</dd></div>
        <div class="flex justify-between"><dt class="text-ivory-100/60">Extras</dt><dd class="text-ivory-50">{{ formatInr(extrasTotal) }}</dd></div>
        <div class="flex justify-between"><dt class="text-ivory-100/60">Service fee</dt><dd class="text-ivory-50">{{ formatInr(serviceFee) }}</dd></div>
        <div class="flex justify-between"><dt class="text-ivory-100/60">Taxes (12%)</dt><dd class="text-ivory-50">{{ formatInr(taxes) }}</dd></div>
      </dl>
      <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span class="font-semibold text-ivory-50">Estimated total</span>
        <span class="text-2xl font-semibold text-ivory-50">{{ formatInr(total) }}</span>
      </div>
      <PrimaryButton as="RouterLink" :to="`/book?pod=${selectedPod.id}&hours=${duration}`" full-width class="mt-6">
        Book This Pod
      </PrimaryButton>
    </div>
  </div>
</template>
