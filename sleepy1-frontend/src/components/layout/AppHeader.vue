<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { primaryNav } from '@/data/navigation'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import UserMenu from '@/components/layout/UserMenu.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const auth = useAuthStore()
const ui = useUiStore()
const isScrolled = ref(false)
let ticking = false

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = window.scrollY
      if (!isScrolled.value && y > 50) isScrolled.value = true
      else if (isScrolled.value && y < 10) isScrolled.value = false
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full transition-all duration-300 ease-out"
    :class="isScrolled ? 'pt-0 px-0' : 'pt-3 px-3 sm:pt-4 sm:px-6'"
  >
    <div
      class="mx-auto flex items-center justify-between transition-all duration-300 ease-out"
      :class="[
        isScrolled
          ? 'max-w-full rounded-none px-6 py-3.5 backdrop-blur-2xl shadow-sm sm:px-10'
          : 'max-w-6xl rounded-2xl px-6 py-3.5 backdrop-blur-2xl shadow-soft sm:px-8',
      ]"
      :style="{
        backgroundColor: isScrolled ? 'rgba(var-color-bg, 0.97)' : 'var(--bg)',
        borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
        border: !isScrolled ? '1px solid var(--border)' : '',
      }"
      style="background-color: var(--bg); border-color: var(--border);"
    >
      <router-link to="/" class="flex items-center gap-2 text-lg font-semibold tracking-[0.15em]" :style="{ color: 'var(--text-primary)' }">
        <img src="/Logo.png" alt="Sleepy1 Icon" class="h-9 w-9 object-contain" />
        <img src="/Logo-text.png" alt="Sleepy1 Text" class="h-6 object-contain" />
      </router-link>

      <nav class="hidden items-center gap-7 xl:gap-9 lg:flex" aria-label="Primary">
        <router-link
          v-for="item in primaryNav"
          :key="item.to"
          :to="item.to"
          class="link-underline text-sm font-medium transition-colors"
          :style="{ color: 'var(--text-secondary)' }"
          active-class="!text-primary"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="hidden items-center gap-4 lg:flex">
        <UserMenu v-if="auth.isAuthenticated" />
        <ThemeToggle />
        <PrimaryButton as="RouterLink" to="/quick-book" size="sm">Book</PrimaryButton>
      </div>

      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5 lg:hidden"
        :style="{ color: 'var(--text-primary)' }"
        aria-label="Open menu"
        :aria-expanded="ui.isMobileMenuOpen"
        @click="ui.openMobileMenu()"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  </header>
</template>
