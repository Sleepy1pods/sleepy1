<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AnnouncementBar from '@/components/layout/AnnouncementBar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import ToastNotification from '@/components/common/ToastNotification.vue'
import DreamBackground from '@/components/atmosphere/DreamBackground.vue'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const ui = useUiStore()

watch(
  () => route.fullPath,
  () => ui.closeMobileMenu(),
)
</script>

<template>
  <div class="relative min-h-screen">
    <div class="fixed inset-0 z-0">
      <DreamBackground tone="dusk" density="low" />
    </div>
    <div class="relative z-10 flex min-h-screen flex-col">
      <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ivory-50 focus:px-4 focus:py-2 focus:text-ink-950">
        Skip to content
      </a>
      <AnnouncementBar />
      <AppHeader />
      <main id="main-content" class="flex-1">
        <RouterView v-slot="{ Component, route: currentRoute }">
          <Transition name="page" mode="out-in">
            <component :is="Component" :key="currentRoute.path" />
          </Transition>
        </RouterView>
      </main>
      <AppFooter />
      <MobileMenu />
      <ToastNotification />
    </div>
  </div>
</template>

<style>
.page-enter-active, .page-leave-active { transition: opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease; }
.page-enter-from, .page-leave-to { opacity: 0; filter: blur(6px); transform: translateY(8px); }
.page-enter-to, .page-leave-from { filter: blur(0); transform: translateY(0); }
</style>
