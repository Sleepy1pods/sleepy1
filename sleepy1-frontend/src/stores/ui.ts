import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ToastMessage } from '@/types/common'

export const useUiStore = defineStore('ui', () => {
  const isMobileMenuOpen = ref(false)
  const toasts = ref<ToastMessage[]>([])

  function openMobileMenu() {
    isMobileMenuOpen.value = true
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function pushToast(toast: Omit<ToastMessage, 'id'>) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const full: ToastMessage = { id, duration: 4000, ...toast }
    toasts.value.push(full)
    setTimeout(() => dismissToast(id), full.duration)
    return id
  }

  function dismissToast(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return { isMobileMenuOpen, toasts, openMobileMenu, closeMobileMenu, toggleMobileMenu, pushToast, dismissToast }
})
