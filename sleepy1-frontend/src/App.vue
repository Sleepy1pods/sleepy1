<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import ToastNotification from '@/components/common/ToastNotification.vue'
import StarryBackground from '@/components/common/StarryBackground.vue'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const ui = useUiStore()

watch(
  () => route.fullPath,
  () => ui.closeMobileMenu(),
)
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-black text-ivory-50">
    <StarryBackground />
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ivory-50 focus:px-4 focus:py-2 focus:text-ink-950">
      Skip to content
    </a>
    <AppHeader class="relative z-10" />
    <main id="main-content" class="relative z-10 flex-1">
      <RouterView v-slot="{ Component, route: currentRoute }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="currentRoute.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter class="relative z-20" />
    <MobileMenu />
    <ToastNotification />
  </div>
</template>

<style>
.page-enter-active, .page-leave-active { transition: opacity 0.15s ease; }
.page-enter-from, .page-leave-to { opacity: 0; }
</style>
