<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()

const form = reactive({ email: '', password: '' })
const errors = ref<{ email?: string; password?: string }>({})
const isSubmitting = ref(false)

function validate() {
  const next: typeof errors.value = {}
  if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
  if (form.password.length < 4) next.password = 'Enter your password.'
  errors.value = next
  return Object.keys(next).length === 0
}

async function submit() {
  if (!validate()) return
  isSubmitting.value = true
  try {
    await auth.login({ email: form.email, password: form.password })
    if (auth.user?.role !== 'admin') {
      await auth.logout()
      throw new Error('This account does not have admin privileges.')
    }
    ui.pushToast({ type: 'success', title: 'Welcome Admin', description: 'You are now signed in.' })
    router.push('/admin/dashboard')
  } catch (error: any) {
    ui.pushToast({ type: 'error', title: 'Sign in failed', description: error.message || 'Invalid credentials.' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-16 font-sans" style="background-color: var(--bg); color: var(--text-primary);">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center flex flex-col items-center gap-3">
        <div class="flex items-center gap-2">
          <img src="/Logo.png" alt="Sleepy1" class="h-10 w-10 object-contain dark:invert-0 invert" />
          <img src="/Logo-text.png" alt="Sleepy1" class="h-6 object-contain dark:invert-0 invert" />
        </div>
        <div class="mt-2">
          <h1 class="text-2xl font-bold tracking-tight" style="color: var(--text-primary);">Admin Portal</h1>
          <p class="mt-1.5 text-sm" style="color: var(--text-secondary);">Sign in to manage the Sleepy1 platform.</p>
        </div>
      </div>
      <form class="rounded-2xl space-y-5 p-6 sm:p-8 shadow-xl" style="background-color: var(--surface); border: 1px solid var(--border);" @submit.prevent="submit">
        <FormField v-model="form.email" label="Email" type="email" required :error="errors.email" autocomplete="email" />
        <FormField v-model="form.password" label="Password" type="password" required :error="errors.password" autocomplete="current-password" />
        <PrimaryButton type="submit" :loading="isSubmitting" full-width>Sign In</PrimaryButton>
      </form>
      <p class="mt-6 text-center text-sm" style="color: var(--text-muted);">
        Need an admin account? <router-link to="/admin/register" class="font-semibold text-brand-500 hover:opacity-80">Register</router-link>
      </p>
      <div class="mt-6 text-center">
        <router-link to="/" class="text-xs transition-colors hover:opacity-80" style="color: var(--text-muted);">&larr; Back to main site</router-link>
      </div>
    </div>
  </div>
</template>
