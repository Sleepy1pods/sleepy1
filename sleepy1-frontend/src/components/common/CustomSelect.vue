<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: string
  options: { value: string; label: string }[]
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)
const selectContainer = ref<HTMLElement | null>(null)

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function selectOption(value: string) {
  emit('update:modelValue', value)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (selectContainer.value && !selectContainer.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="relative" ref="selectContainer">
    <button
      type="button"
      @click="toggle"
      :disabled="disabled"
      class="flex min-h-[44px] w-full items-center justify-between rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-left text-ivory-50 transition-colors focus:border-brand-400 focus:outline-none"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      <span v-if="!modelValue" class="text-ivory-100/50">{{ placeholder || 'Select an option' }}</span>
      <span v-else>{{ options.find(o => o.value === modelValue)?.label || modelValue }}</span>
      <svg class="h-4 w-4 text-ivory-100/50 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
    </button>
    
    <div v-if="isOpen" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-ink-900 shadow-lg p-1 custom-scrollbar">
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.value)"
        class="cursor-pointer rounded-lg px-4 py-2 text-ivory-50 hover:bg-brand-500/20 transition-colors"
        :class="{ 'bg-brand-500/30 text-brand-300': option.value === modelValue }"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255,255,255,0.1);
  border-radius: 10px;
}
</style>
