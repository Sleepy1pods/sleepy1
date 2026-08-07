<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { primaryNav } from '@/data/navigation'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import UserMenu from '@/components/layout/UserMenu.vue'

const auth = useAuthStore()
const ui = useUiStore()
const isScrolled = ref(false)
let ticking = false

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = window.scrollY
      // 40px hysteresis gap (activate above 50px, deactivate below 10px)
      // Prevents padding/height shifts from causing a scroll-oscillation glitch loop
      if (!isScrolled.value && y > 50) {
        isScrolled.value = true
      } else if (isScrolled.value && y < 10) {
        isScrolled.value = false
      }
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
          ? 'max-w-full rounded-none border-b border-white/10 bg-ink-950/95 px-6 py-3.5 backdrop-blur-2xl shadow-xl sm:px-10'
          : 'max-w-6xl rounded-2xl border border-white/15 bg-ink-950/80 px-6 py-3.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] sm:px-8',
      ]"
    >
      <router-link to="/" class="flex items-center gap-2 text-lg font-semibold tracking-[0.15em] text-ivory-50">
        <img src="/Logo.png" alt="Sleepy1 Icon" class="h-9 w-9 object-contain" />
        <img src="/Logo-text.png" alt="Sleepy1 Text" class="h-6 object-contain" />
      </router-link>

      <nav class="hidden items-center gap-7 xl:gap-9 lg:flex" aria-label="Primary">
        <router-link
          v-for="item in primaryNav"
          :key="item.to"
          :to="item.to"
          class="link-underline text-sm font-medium text-ivory-100/70 transition-colors hover:text-ivory-50"
          active-class="text-ivory-50 !bg-[length:100%_1px]"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="hidden items-center gap-5 lg:flex">
        <UserMenu v-if="auth.isAuthenticated" />
        <router-link
          v-else
          to="/login"
          aria-label="Login"
          class="flex h-10 w-10 items-center justify-center rounded-full text-ivory-100/70 transition-colors hover:bg-white/5 hover:text-ivory-50"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </router-link>
        <PrimaryButton as="RouterLink" to="/quick-book" size="sm">Book Now</PrimaryButton>
      </div>

      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full text-ivory-100 transition-colors hover:bg-white/5 lg:hidden"
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
