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
  <div class="relative">
    <svg class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ivory-100/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
      <path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <input
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      class="min-h-[44px] w-full rounded-full border border-white/10 bg-ink-800/60 py-3 pl-12 pr-4 text-ivory-50 placeholder:text-ivory-100/40 transition-colors focus:border-brand-400"
      :aria-label="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
