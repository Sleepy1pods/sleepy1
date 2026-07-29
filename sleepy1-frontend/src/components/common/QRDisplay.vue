<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'

withDefaults(defineProps<{ value: string; size?: number; reference?: string }>(), { size: 176 })
</script>

<template>
  <div class="flex flex-col items-center rounded-2xl bg-ivory-50 p-6">
    <QrcodeVue :value="value" :size="size" level="M" render-as="svg" />
    <p v-if="reference" class="mt-3 font-mono text-sm font-semibold tracking-wider text-ink-950">{{ reference }}</p>
    <p class="mt-1 text-xs text-ink-800/60">Scan at the pod access panel to check in</p>
  </div>
</template>
