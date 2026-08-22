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
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-3">
      <!-- 1. Left Island: Logo & Wordmark (Liquid Glass) -->
      <div class="liquid-glass-island flex items-center px-4 py-2 sm:px-5 sm:py-2.5 flex-shrink-0">
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

      <!-- 2. Center Island: Navigation Links (Liquid Glass) -->
      <nav
        class="liquid-glass-island hidden lg:flex items-center gap-1 xl:gap-1.5 px-2.5 py-1.5 xl:px-3.5 xl:py-2"
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

      <!-- 3. Right Island: Action Cluster (Liquid Glass) -->
      <div class="liquid-glass-island flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 flex-shrink-0">
        <!-- Desktop controls -->
        <div class="hidden lg:flex items-center gap-3">
          <!-- Customer User Menu OR Login Button -->
          <UserMenu v-if="auth.isAuthenticated && auth.user?.role !== 'admin'" />
          <router-link
            v-else
            to="/login"
            class="liquid-btn inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-semibold text-zinc-800 dark:text-zinc-100 transition-all duration-200 hover:scale-105"
          >
            <svg class="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </router-link>

          <!-- Divider -->
          <div class="h-5 w-px bg-black/10 dark:bg-white/15" />

          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Book CTA Button -->
          <PrimaryButton as="RouterLink" to="/quick-book" size="sm" class="shadow-lg shadow-black/20 hover:scale-105 transition-transform !py-1.5 !px-4 text-sm font-medium">
            Book
          </PrimaryButton>
        </div>

        <!-- Mobile controls inside right island -->
        <div class="flex lg:hidden items-center gap-2">
          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Mobile Menu Hamburger -->
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

<style scoped>
/* Liquid Glass Island Container */
.liquid-glass-island {
  position: relative;
  border-radius: 1.25rem;
  backdrop-filter: blur(28px) saturate(200%) brightness(1.02);
  -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(1.02);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: visible;
}

/* Light Mode Liquid Glass */
:root:not(.dark) .liquid-glass-island {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(255, 255, 255, 0.6) 45%,
    rgba(240, 243, 248, 0.72) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow:
    inset 0 1px 1.5px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.04),
    0 12px 30px -6px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.03);
}

:root:not(.dark) .liquid-glass-island:hover {
  border-color: rgba(255, 255, 255, 0.95);
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.05),
    0 16px 36px -6px rgba(0, 0, 0, 0.12),
    0 6px 16px rgba(0, 0, 0, 0.04);
}

/* Dark Mode Liquid Glass */
:root.dark .liquid-glass-island {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.09) 0%,
    rgba(22, 22, 30, 0.7) 40%,
    rgba(14, 14, 20, 0.82) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.13);
  box-shadow:
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.28),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.45),
    0 16px 40px -4px rgba(0, 0, 0, 0.55),
    0 6px 16px rgba(0, 0, 0, 0.35);
}

:root.dark .liquid-glass-island:hover {
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.5),
    0 20px 45px -4px rgba(0, 0, 0, 0.65),
    0 8px 20px rgba(0, 0, 0, 0.4);
}

/* Specular light highlight pseudo-element */
.liquid-glass-island::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  pointer-events: none;
  opacity: 0.7;
}

:root:not(.dark) .liquid-glass-island::before {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.95) 50%,
    transparent 100%
  );
  opacity: 0.9;
}

/* Nav Links inside liquid pill */
.liquid-nav-link:hover {
  color: #000000;
  background: rgba(0, 0, 0, 0.05);
}

:root.dark .liquid-nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.12);
}

/* Active Nav Link with specular liquid glass feel */
.active-liquid-link {
  font-weight: 600 !important;
  color: #000000 !important;
  background: rgba(0, 0, 0, 0.08) !important;
  box-shadow: inset 0 1px 1.5px rgba(255, 255, 255, 0.7), 0 2px 6px rgba(0, 0, 0, 0.05) !important;
}

:root.dark .active-liquid-link {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.14) !important;
  box-shadow:
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.3),
    0 2px 10px rgba(0, 0, 0, 0.3) !important;
}

/* Inner Liquid Buttons */
.liquid-btn {
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
}

.liquid-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.15);
}

:root.dark .liquid-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
}

:root.dark .liquid-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
}
</style>

