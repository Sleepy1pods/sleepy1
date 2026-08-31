<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { primaryNav, loggedInNav } from '@/data/navigation'
import { useFocusTrap } from '@/composables/useFocusTrap'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const ui = useUiStore()
const auth = useAuthStore()
const router = useRouter()
const panelRef = ref<HTMLElement | null>(null)

const { activate, deactivate } = useFocusTrap(panelRef)

watch(
  () => ui.isMobileMenuOpen,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) activate()
    else deactivate()
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') ui.closeMobileMenu()
}

function navigateAndClose(to: string) {
  ui.closeMobileMenu()
  router.push(to)
}

async function handleLogout() {
  await auth.logout()
  ui.closeMobileMenu()
  router.push('/')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="ui.isMobileMenuOpen" class="fixed inset-0 z-50 lg:hidden" @keydown="onKeydown">
        <div class="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" @click="ui.closeMobileMenu()" />
        <Transition name="slide" appear>
          <nav
            v-if="ui.isMobileMenuOpen"
            ref="panelRef"
            aria-label="Mobile"
            class="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-hidden bg-ink-900 p-6 shadow-premium"
          >
            <div class="flex flex-1 flex-col">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img src="/Logo.png" alt="Sleepy1 Icon" class="h-8 w-8 object-contain" loading="lazy" decoding="async" />
                  <span class="text-lg font-semibold tracking-[0.15em] text-ivory-50">SLEEPY1</span>
                </div>
                <div class="flex items-center gap-3">
                  <ThemeToggle />
                  <button type="button" aria-label="Close menu" class="flex h-11 w-11 items-center justify-center rounded-full text-ivory-100 hover:bg-white/10" @click="ui.closeMobileMenu()">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
                  </button>
                </div>
              </div>

              <div v-if="auth.isAuthenticated" class="mt-6 flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-400 text-sm font-semibold text-ink-950">
                  {{ auth.user?.avatarInitials }}
                </span>
                <div>
                  <p class="text-sm font-semibold text-ivory-50">{{ auth.user?.fullName }}</p>
                  <p class="text-xs text-ivory-100/50">{{ auth.user?.email }}</p>
                </div>
              </div>

              <div class="mt-8 flex-1 space-y-1 overflow-y-auto">
                <button
                  v-for="item in primaryNav"
                  :key="item.to"
                  type="button"
                  class="block w-full min-h-[44px] rounded-xl px-3 py-3 text-left text-base font-medium text-ivory-100/85 hover:bg-white/5"
                  @click="navigateAndClose(item.to)"
                >
                  {{ item.label }}
                </button>
                <div class="my-2 h-px bg-white/10" />
                <template v-if="auth.isAuthenticated && auth.user?.role !== 'admin'">
                  <button
                    v-for="item in loggedInNav"
                    :key="item.to"
                    type="button"
                    class="block w-full min-h-[44px] rounded-xl px-3 py-3 text-left text-base font-medium text-ivory-100/85 hover:bg-white/5"
                    @click="navigateAndClose(item.to)"
                  >
                    {{ item.label }}
                  </button>
                  <button type="button" class="block w-full min-h-[44px] rounded-xl px-3 py-3 text-left text-base font-medium text-rose-300 hover:bg-white/5" @click="handleLogout">
                    Log Out
                  </button>
                </template>
                <button
                  v-else
                  type="button"
                  class="block w-full min-h-[44px] rounded-xl px-3 py-3 text-left text-base font-medium text-ivory-100/85 hover:bg-white/5"
                  @click="navigateAndClose('/login')"
                >
                  Login
                </button>
              </div>

              <PrimaryButton as="RouterLink" to="/quick-book" full-width @click="ui.closeMobileMenu()">
                Book a Pod
              </PrimaryButton>
              <!-- <PrimaryButton as="a" href="https://docs.google.com/forms/your-form-link-here" target="_blank" full-width @click="ui.closeMobileMenu()">
                Book a Pod
              </PrimaryButton> -->
            </div>
          </nav>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
