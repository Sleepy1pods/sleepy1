<script setup lang="ts">
import SecondaryButton from './SecondaryButton.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    actionLabel?: string
  }>(),
  { description: '', actionLabel: '' },
)

const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
    <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
      <svg class="h-7 w-7 text-ivory-100/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
        <path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-ivory-50">{{ title }}</h3>
    <p v-if="description" class="mt-2 max-w-sm text-sm text-ivory-100/50">{{ description }}</p>
    <SecondaryButton v-if="actionLabel" size="sm" class="mt-6" @click="emit('action')">{{ actionLabel }}</SecondaryButton>
  </div>
</template>
