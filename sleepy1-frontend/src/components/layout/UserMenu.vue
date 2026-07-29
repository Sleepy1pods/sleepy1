<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()
const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const triggerEl = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)

function onClickOutside(event: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(event.target as Node)) isOpen.value = false
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
    triggerEl.value?.focus()
  }
}

function toggleOpen() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    requestAnimationFrame(() => {
      menuEl.value?.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
    })
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})

async function handleLogout() {
  await auth.logout()
  isOpen.value = false
  ui.pushToast({ type: 'success', title: 'Signed out', description: 'See you again soon.' })
  router.push('/')
}
</script>

<template>
  <div ref="rootEl" class="relative">
    <button
      ref="triggerEl"
      type="button"
      class="flex h-11 items-center gap-2 rounded-full border border-white/10 pl-1.5 pr-3 text-sm font-medium text-ivory-100 hover:border-white/25"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      aria-controls="user-menu-dropdown"
      @click="toggleOpen"
    >
      <span class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-lavender-500 text-xs font-semibold text-ink-950">
        {{ auth.user?.avatarInitials }}
      </span>
      {{ auth.user?.fullName.split(' ')[0] }}
    </button>
    <Transition name="pop">
      <div v-if="isOpen" id="user-menu-dropdown" ref="menuEl" role="menu" class="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/95 py-2 shadow-premium backdrop-blur-xl">
        <router-link to="/bookings" role="menuitem" class="block px-4 py-2.5 text-sm text-ivory-100/80 hover:bg-white/5" @click="isOpen = false">My Bookings</router-link>
        <router-link to="/wallet" role="menuitem" class="block px-4 py-2.5 text-sm text-ivory-100/80 hover:bg-white/5" @click="isOpen = false">Credits Wallet</router-link>
        <router-link to="/membership" role="menuitem" class="block px-4 py-2.5 text-sm text-ivory-100/80 hover:bg-white/5" @click="isOpen = false">Membership</router-link>
        <div class="my-2 h-px bg-white/10" />
        <button type="button" role="menuitem" class="block w-full px-4 py-2.5 text-left text-sm text-rose-300 hover:bg-white/5" @click="handleLogout">
          Log Out
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.pop-enter-active, .pop-leave-active { transition: all 0.15s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
