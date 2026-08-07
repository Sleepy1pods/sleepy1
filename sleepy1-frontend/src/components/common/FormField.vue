<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    type?: string
    placeholder?: string
    error?: string
    hint?: string
    required?: boolean
    autocomplete?: string
    as?: 'input' | 'textarea'
    rows?: number
    disabled?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
    hint: '',
    required: false,
    autocomplete: 'off',
    as: 'input',
    rows: 4,
    disabled: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const fieldId = useId()
const hasError = computed(() => Boolean(props.error))

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement | HTMLTextAreaElement).value)
}
</script>

<template>
  <div>
    <label :for="fieldId" class="mb-2 block text-sm font-medium text-ivory-100/80">
      {{ label }}<span v-if="required" class="text-brand-300"> *</span>
    </label>
    <textarea
      v-if="as === 'textarea'"
      :id="fieldId"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :aria-invalid="hasError"
      :aria-describedby="hasError ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined"
      :disabled="disabled"
      class="w-full resize-none rounded-xl border bg-ink-800/60 px-4 py-3 text-ivory-50 placeholder:text-ivory-100/30 transition-colors focus:border-brand-400"
      :class="[hasError ? 'border-rose-400/60' : 'border-white/10', disabled ? 'opacity-50 cursor-not-allowed' : '']"
      @input="onInput"
    />
    <input
      v-else
      :id="fieldId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="hasError"
      :aria-describedby="hasError ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined"
      :disabled="disabled"
      class="min-h-[44px] w-full rounded-xl border bg-ink-800/60 px-4 py-3 text-ivory-50 placeholder:text-ivory-100/30 transition-colors focus:border-brand-400"
      :class="[hasError ? 'border-rose-400/60' : 'border-white/10', disabled ? 'opacity-50 cursor-not-allowed' : '']"
      @input="onInput"
    />
    <p v-if="hasError" :id="`${fieldId}-error`" class="mt-1.5 text-xs font-medium text-rose-300">{{ error }}</p>
    <p v-else-if="hint" :id="`${fieldId}-hint`" class="mt-1.5 text-xs text-ivory-100/40">{{ hint }}</p>
  </div>
</template>
