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
      if (!isScrolled.value && y > 20) isScrolled.value = true
      else if (isScrolled.value && y <= 20) isScrolled.value = false
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
    :class="isScrolled ? 'pt-2 px-3 sm:px-6' : 'pt-3 px-3 sm:pt-4 sm:px-6'"
  >
    <div
      class="mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 sm:px-6 sm:py-3.5 transition-all duration-300 backdrop-blur-2xl bg-white/80 dark:bg-[#121216]/85 border border-black/10 dark:border-white/10 shadow-lg dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
    >
      <!-- Left: Logo & Wordmark -->
      <router-link
        to="/"
        class="group flex items-center gap-2.5 text-lg font-semibold tracking-[0.15em] transition-opacity hover:opacity-90 flex-shrink-0"
      >
        <img
          src="/Logo.png"
          alt="Sleepy1 Icon"
          class="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105 dark:invert-0 invert"
        />
        <img
          src="/Logo-text.png"
          alt="Sleepy1 Text"
          class="h-6 object-contain dark:invert-0 invert"
        />
      </router-link>

      <!-- Center: Navigation Links in Glass Pill -->
      <nav class="hidden items-center gap-1 xl:gap-1.5 lg:flex rounded-full bg-black/[0.04] dark:bg-white/[0.05] p-1 border border-black/[0.05] dark:border-white/[0.08]" aria-label="Primary">
        <router-link
          v-for="item in primaryNav"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-3.5 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-all duration-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
          active-class="!text-black dark:!text-white !bg-black/10 dark:!bg-white/15 !font-semibold"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Right: Action Cluster -->
      <div class="hidden items-center gap-3 lg:flex flex-shrink-0">
        <!-- Customer User Menu OR Login Button -->
        <UserMenu v-if="auth.isAuthenticated && auth.user?.role !== 'admin'" />
        <router-link
          v-else
          to="/login"
          class="inline-flex items-center gap-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] px-4 py-1.5 text-sm font-semibold text-zinc-800 dark:text-zinc-100 border border-black/10 dark:border-white/15 transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20 hover:scale-105"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Login
        </router-link>

        <!-- Divider -->
        <div class="h-5 w-px bg-black/15 dark:bg-white/15" />

        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Book CTA Button -->
        <PrimaryButton as="RouterLink" to="/quick-book" size="sm" class="shadow-md hover:scale-105 transition-transform">
          Book
        </PrimaryButton>
      </div>

      <!-- Mobile Menu Hamburger -->
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:bg-black/5 dark:hover:bg-white/10 lg:hidden border border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-100"
        aria-label="Open menu"
        :aria-expanded="ui.isMobileMenuOpen"
        @click="ui.openMobileMenu()"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  </header>
</template>
