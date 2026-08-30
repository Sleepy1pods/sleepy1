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
  <div ref="rootEl" class="relative flex-shrink-0">
    <button
      ref="triggerEl"
      type="button"
      class="flex h-[38px] flex-shrink-0 whitespace-nowrap items-center gap-2.5 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.04] dark:bg-white/[0.06] pl-1.5 pr-4 text-sm font-semibold text-zinc-800 dark:text-zinc-100 hover:border-black/25 dark:hover:border-white/25 hover:bg-black/10 dark:hover:bg-white/10 transition-all shadow-sm"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      aria-controls="user-menu-dropdown"
      @click="toggleOpen"
    >
      <span class="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-bold shadow-sm">
        {{ auth.user?.avatarInitials }}
      </span>
      <span>{{ auth.user?.fullName.split(' ')[0] }}</span>
    </button>
    <Transition name="pop">
      <div
        v-if="isOpen"
        id="user-menu-dropdown"
        ref="menuEl"
        role="menu"
        class="absolute left-0 sm:left-auto sm:right-0 top-full mt-2.5 w-56 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#18181f]/95 py-2 shadow-2xl backdrop-blur-xl z-50"
      >
        <router-link to="/bookings" role="menuitem" class="block px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5" @click="isOpen = false">My Bookings</router-link>
        <div class="my-2 h-px bg-black/10 dark:bg-white/10" />
        <button type="button" role="menuitem" class="block w-full px-4 py-2.5 text-left text-sm font-medium text-rose-500 dark:text-rose-400 hover:bg-black/5 dark:hover:bg-white/5" @click="handleLogout">
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
