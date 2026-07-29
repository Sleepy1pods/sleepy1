<script setup lang="ts">
import { ref } from 'vue'
import type { Faq } from '@/types/common'

defineProps<{ items: Faq[] }>()

const openId = ref<string | null>(null)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="divide-y divide-white/8 rounded-2xl border border-white/8 bg-white/[0.02]">
    <div v-for="item in items" :key="item.id">
      <h3>
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-5 py-5 text-left min-h-[44px]"
          :aria-expanded="openId === item.id"
          :aria-controls="`faq-panel-${item.id}`"
          @click="toggle(item.id)"
        >
          <span class="text-sm sm:text-base font-medium text-ivory-50">{{ item.question }}</span>
          <svg
            class="h-5 w-5 shrink-0 text-ivory-100/50 transition-transform duration-300"
            :class="openId === item.id ? 'rotate-45' : ''"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </h3>
      <div
        :id="`faq-panel-${item.id}`"
        class="grid transition-all duration-300 ease-out"
        :style="{ gridTemplateRows: openId === item.id ? '1fr' : '0fr' }"
      >
        <div class="overflow-hidden">
          <p class="px-5 pb-5 text-sm leading-relaxed text-ivory-100/60">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
