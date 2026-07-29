<script setup lang="ts">
import type { OfferPromo } from '@/types/common'
import { formatDate } from '@/utils/format'

const props = defineProps<{ offer: OfferPromo }>()
const emit = defineEmits<{ copy: [code: string] }>()

function copyCode() {
  navigator.clipboard?.writeText(props.offer.code).catch(() => undefined)
  emit('copy', props.offer.code)
}
</script>

<template>
  <div class="card-surface flex flex-col p-6">
    <span class="w-fit rounded-full bg-brand-400/15 px-3 py-1 text-xs font-semibold text-brand-300">{{ offer.discountLabel }}</span>
    <h3 class="mt-4 text-lg font-semibold text-ivory-50">{{ offer.title }}</h3>
    <p class="mt-2 flex-1 text-sm text-ivory-100/60">{{ offer.description }}</p>
    <p class="mt-3 text-xs text-ivory-100/40">Valid till {{ formatDate(offer.validTill) }}</p>
    <button
      type="button"
      class="mt-5 flex min-h-[44px] items-center justify-between rounded-xl border border-dashed border-white/20 px-4 py-3 text-sm font-semibold text-ivory-100 transition-colors hover:border-brand-400"
      @click="copyCode"
    >
      <span class="font-mono tracking-widest">{{ offer.code }}</span>
      <span class="text-xs text-brand-300">Copy Code</span>
    </button>
  </div>
</template>
