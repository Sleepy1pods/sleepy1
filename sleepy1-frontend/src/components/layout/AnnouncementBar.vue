<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(sessionStorage.getItem('sleepy1_announcement_dismissed') !== 'true')

function dismiss() {
  isVisible.value = false
  sessionStorage.setItem('sleepy1_announcement_dismissed', 'true')
}
</script>

<template>
  <Transition name="collapse">
    <div v-if="isVisible" class="relative bg-gradient-to-r from-brand-700 via-brand-600 to-lavender-500 text-ink-950">
      <div class="container-page flex items-center justify-center gap-3 py-2.5 text-center text-xs font-medium sm:text-sm">
        <span>✦ New: Sleepy1 Credits &amp; Membership tiers are live — earn bonus credits on every stay.</span>
        <router-link to="/membership" class="underline underline-offset-2 hover:no-underline">Explore Membership</router-link>
        <button type="button" aria-label="Dismiss announcement" class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-ink-950/10" @click="dismiss">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.collapse-enter-active, .collapse-leave-active { transition: all 0.3s ease; }
.collapse-enter-from, .collapse-leave-to { opacity: 0; transform: translateY(-100%); }
</style>
