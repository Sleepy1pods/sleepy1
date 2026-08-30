<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { primaryNav } from '@/data/navigation'
import UserMenu from '@/components/layout/UserMenu.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const auth = useAuthStore()
const ui = useUiStore()
const isScrolled = ref(false)
const isDark = ref(false)
let ticking = false

function checkDark() {
  isDark.value = document.documentElement.classList.contains('dark')
}

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

// Watch for theme changes via MutationObserver
let observer: MutationObserver | null = null

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  checkDark()
  observer = new MutationObserver(checkDark)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})

const navStyle = computed(() => ({
  border: isDark.value
    ? '1.5px solid rgba(255, 255, 255, 0.28)'
    : '1.5px solid rgba(0, 0, 0, 0.13)',
}))
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full transition-all duration-300 ease-out"
    :class="isScrolled ? 'pt-2 px-3 sm:px-6' : 'pt-3 px-3 sm:pt-4 sm:px-6'"
  >
    <!-- Floating Navbar with Visible Border (inline style) -->
    <div
      class="liquid-glass-nav mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 gap-3 backdrop-blur-md"
      :style="navStyle"
    >
      <!-- 1. Left: Logo & Wordmark -->
      <div class="flex items-center flex-shrink-0">
        <router-link
          to="/"
          class="group flex items-center gap-2.5 text-lg font-semibold tracking-[0.15em] transition-opacity hover:opacity-90"
        >
          <img
            src="/Logo.png"
            alt="Sleepy1 Icon"
            class="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105 dark:invert-0 invert drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
          />
          <img
            src="/Logo-text.png"
            alt="Sleepy1 Text"
            class="h-5 sm:h-5.5 object-contain dark:invert-0 invert"
          />
        </router-link>
      </div>

      <!-- 2. Center: Navigation Links -->
      <nav
        class="hidden lg:flex items-center gap-1 xl:gap-2"
        aria-label="Primary"
      >
        <router-link
          v-for="item in primaryNav"
          :key="item.to"
          :to="item.to"
          class="liquid-nav-link rounded-xl px-3.5 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-all duration-200"
          active-class="active-liquid-link"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- 3. Right: Action Cluster -->
      <div class="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
        <!-- Desktop controls -->
        <div class="hidden lg:flex items-center gap-3.5 flex-shrink-0">
          <ThemeToggle />
          <div class="h-6 w-px bg-black/10 dark:bg-white/15 flex-shrink-0" />
          <div class="flex items-center gap-2.5 flex-shrink-0">
            <UserMenu v-if="auth.isAuthenticated && auth.user?.role !== 'admin'" />
            <router-link
              v-else
              to="/login"
              class="liquid-btn inline-flex h-[38px] flex-shrink-0 whitespace-nowrap items-center gap-2 rounded-full px-4.5 text-sm font-semibold text-zinc-800 dark:text-zinc-100 transition-all duration-200 hover:scale-105"
            >
              <svg class="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login</span>
            </router-link>
            <router-link
              to="/quick-book"
              class="inline-flex h-[38px] min-w-[88px] flex-shrink-0 whitespace-nowrap items-center justify-center rounded-full bg-cta-fill px-6 text-sm font-bold text-cta-text transition-all duration-200 hover:scale-105 shadow-md hover:opacity-90 tracking-wide"
            >
              Book
            </router-link>
          </div>
        </div>

        <!-- Mobile controls -->
        <div class="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            class="liquid-btn flex h-9 w-9 items-center justify-center rounded-xl transition-all text-zinc-800 dark:text-zinc-100"
            aria-label="Open menu"
            :aria-expanded="ui.isMobileMenuOpen"
            @click="ui.openMobileMenu()"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
/* Floating Navbar Container — border is set via inline :style */
.liquid-glass-nav {
  position: relative;
  border-radius: 1.25rem;
  backdrop-filter: blur(12px) saturate(190%) brightness(1.05);
  -webkit-backdrop-filter: blur(12px) saturate(190%) brightness(1.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: visible;
}

/* Light Mode Background & Shadows */
html:not(.dark) .liquid-glass-nav,
:root:not(.dark) .liquid-glass-nav {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.48) 45%,
    rgba(240, 245, 255, 0.6) 100%
  );
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05),
    0 12px 36px -4px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.04);
}

html:not(.dark) .liquid-glass-nav:hover,
:root:not(.dark) .liquid-glass-nav:hover {
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.06),
    0 16px 42px -4px rgba(0, 0, 0, 0.15),
    0 6px 16px rgba(0, 0, 0, 0.05);
}

/* Dark Mode Background & Shadows */
html.dark .liquid-glass-nav,
.dark .liquid-glass-nav,
:root.dark .liquid-glass-nav {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(20, 20, 28, 0.6) 40%,
    rgba(10, 10, 16, 0.7) 100%
  );
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.5),
    0 16px 40px -4px rgba(0, 0, 0, 0.6),
    0 0 20px -2px rgba(255, 255, 255, 0.06);
}

html.dark .liquid-glass-nav:hover,
.dark .liquid-glass-nav:hover,
:root.dark .liquid-glass-nav:hover {
  box-shadow:
    inset 0 1px 2.5px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.5),
    0 20px 48px -4px rgba(0, 0, 0, 0.7),
    0 0 24px -2px rgba(255, 255, 255, 0.12);
}

/* Specular top-edge light highlight */
.liquid-glass-nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  pointer-events: none;
  opacity: 0.7;
  z-index: 2;
}

html:not(.dark) .liquid-glass-nav::before,
:root:not(.dark) .liquid-glass-nav::before {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.95) 50%,
    transparent 100%
  );
  opacity: 0.9;
}

/* Nav Links */
.liquid-nav-link {
  position: relative;
  background: transparent !important;
}

.liquid-nav-link::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0.875rem;
  width: calc(100% - 1.75rem);
  height: 1.5px;
  background: #000000;
  border-radius: 9999px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
}

.liquid-nav-link:hover {
  color: #000000;
}

.liquid-nav-link:hover::after {
  transform: scaleX(1);
}

html.dark .liquid-nav-link:hover,
.dark .liquid-nav-link:hover {
  color: #ffffff;
}

html.dark .liquid-nav-link::after,
.dark .liquid-nav-link::after {
  background: #ffffff;
  box-shadow: none !important;
}

/* Active Nav Link */
.active-liquid-link {
  font-weight: 600 !important;
  color: #000000 !important;
}

.active-liquid-link::after {
  transform: scaleX(1);
}

html.dark .active-liquid-link,
.dark .active-liquid-link {
  color: #ffffff !important;
}

/* Inner Buttons (Login, Hamburger) */
.liquid-btn {
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.liquid-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.15);
}

html.dark .liquid-btn,
.dark .liquid-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
}

html.dark .liquid-btn:hover,
.dark .liquid-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
}
</style>

