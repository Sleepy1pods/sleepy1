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

function onScroll() {
  isScrolled.value = window.scrollY > 12
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-colors duration-300"
    :class="isScrolled ? 'border-b border-white/8 bg-ink-950' : 'bg-transparent'"
  >
    <div class="container-page flex h-18 items-center justify-between gap-4 py-4">
      <router-link to="/" class="flex items-center gap-2 text-lg font-semibold tracking-[0.15em] text-ivory-50">
        <img src="/Logo.png" alt="Sleepy1 Icon" class="h-9 w-9 object-contain" />
        SLEEPY1
      </router-link>

      <nav class="hidden items-center gap-7 lg:flex" aria-label="Primary">
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

      <div class="hidden items-center gap-3 lg:flex">
        <router-link
          v-if="auth.isAuthenticated"
          to="/bookings"
          class="link-underline text-sm font-medium text-ivory-100/70 transition-colors hover:text-ivory-50"
        >
          My Bookings
        </router-link>
        <UserMenu v-if="auth.isAuthenticated" />
        <router-link v-else to="/login" class="link-underline text-sm font-medium text-ivory-100/70 transition-colors hover:text-ivory-50">
          Login
        </router-link>
        <PrimaryButton as="RouterLink" to="/book" size="sm">Book a Pod</PrimaryButton>
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
