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
    class="sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300"
    :class="isScrolled ? 'border-white/8 bg-ink-950/70' : 'border-transparent bg-ink-950/20'"
  >
    <div class="container-page flex h-20 items-center justify-between gap-6 py-4">
      <router-link to="/" class="flex items-center gap-2 text-lg font-semibold tracking-[0.15em] text-ivory-50">
        <img src="/Logo.png" alt="Sleepy1 Icon" class="h-9 w-9 object-contain" />
        SLEEPY1
      </router-link>

      <nav class="hidden items-center gap-10 lg:flex" aria-label="Primary">
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
