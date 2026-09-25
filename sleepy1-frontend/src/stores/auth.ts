import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthCredentials, RegisterPayload, User } from '@/types/user'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(authService.restoreSession())
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  async function login(credentials: AuthCredentials) {
    isLoading.value = true
    error.value = null
    try {
      user.value = await authService.login(credentials)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unable to sign in.'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function register(payload: RegisterPayload) {
    isLoading.value = true
    error.value = null
    try {
      user.value = await authService.register(payload)
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    await authService.logout()
    user.value = null
  }

  async function fetchUser() {
    try {
      const fetchedUser = await authService.fetchUser()
      if (fetchedUser) {
        user.value = fetchedUser
      } else {
        user.value = null
      }
    } catch {
      user.value = null
    }
  }

  function updateUser(updated: Partial<User>) {
    if (!user.value) return
    user.value = { ...user.value, ...updated }
    if (updated.fullName) {
      user.value.avatarInitials = updated.fullName.charAt(0).toUpperCase()
    }
    localStorage.setItem('sleepy1_mock_session', JSON.stringify(user.value))
  }

  return { user, isLoading, error, isAuthenticated, login, register, logout, fetchUser, updateUser }
})
