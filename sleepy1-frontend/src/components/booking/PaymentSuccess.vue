<script setup lang="ts">
import { onMounted, ref } from 'vue'

const visible = ref(false)
onMounted(() => {
  requestAnimationFrame(() => (visible.value = true))
})
</script>

<template>
  <div class="flex flex-col items-center py-6 text-center">
    <div
      class="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-400/15 transition-all duration-700"
      :class="visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'"
    >
      <svg class="h-12 w-12 text-emerald-300" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          :stroke-dasharray="24"
          :stroke-dashoffset="visible ? 0 : 24"
          style="transition: stroke-dashoffset 0.6s ease 0.2s"
        />
      </svg>
    </div>
    <h3 class="mt-6 text-2xl font-semibold text-ivory-50">Payment Successful</h3>
    <p class="mt-2 max-w-sm text-sm text-ivory-100/60">
      This is a simulated payment for demo purposes — no real transaction has occurred. Your pod is now reserved.
    </p>
  </div>
</template>
