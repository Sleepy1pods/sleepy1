<script setup lang="ts">
defineProps<{
  options: string[]
  modelValue: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by city">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      :aria-pressed="modelValue === option"
      class="min-h-[40px] rounded-full border px-4 py-2 text-sm font-medium transition-colors"
      :class="
        modelValue === option
          ? 'border-brand-400 bg-brand-400/15 text-brand-200'
          : 'border-white/10 text-ivory-100/60 hover:border-white/25 hover:text-ivory-100'
      "
      @click="emit('update:modelValue', option)"
    >
      {{ option }}
    </button>
  </div>
</template>
