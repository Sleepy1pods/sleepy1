<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  { placeholder: 'Search...' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="relative w-full">
    <svg class="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
      <path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <input
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      class="min-h-[50px] w-full rounded-full border border-theme bg-surface py-3.5 pl-14 pr-12 text-sm text-primary placeholder:text-muted transition-all duration-200 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20 shadow-soft"
      :aria-label="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      type="button"
      @click="emit('update:modelValue', '')"
      class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-primary transition-colors cursor-pointer"
      aria-label="Clear search"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
