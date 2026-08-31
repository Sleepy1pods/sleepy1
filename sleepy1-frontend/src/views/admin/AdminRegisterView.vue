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

const form = reactive({ fullName: '', email: '', phone: '', password: '' })
const errors = ref<Partial<Record<keyof typeof form, string>>>({})
const isSubmitting = ref(false)

function validate() {
  const next: typeof errors.value = {}
  if (!form.fullName.trim()) next.fullName = 'Enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
  if (!/^[+]?[\d\s-]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number.'
  if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
  errors.value = next
  return Object.keys(next).length === 0
}

async function submit() {
  if (!validate()) return
  isSubmitting.value = true
  try {
    await auth.register({ ...form, role: 'admin' } as any)
    ui.pushToast({ type: 'success', title: 'Admin Account Created', description: 'Welcome to the Sleepy1 Admin Portal.' })
    router.push('/admin/dashboard')
  } catch (error: any) {
    ui.pushToast({ type: 'error', title: 'Registration failed', description: error.message || 'Please try again.' })
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
          <img src="/Logo.png" alt="Sleepy1" class="h-10 w-10 object-contain dark:invert-0 invert" loading="lazy" decoding="async" />
          <img src="/Logo-text.png" alt="Sleepy1" class="h-6 object-contain dark:invert-0 invert" loading="lazy" decoding="async" />
        </div>
        <div class="mt-2">
          <h1 class="text-2xl font-bold tracking-tight" style="color: var(--text-primary);">Admin Registration</h1>
          <p class="mt-1.5 text-sm" style="color: var(--text-secondary);">Create a new administrator account.</p>
        </div>
      </div>
      <form class="rounded-2xl space-y-5 p-6 sm:p-8 shadow-xl" style="background-color: var(--surface); border: 1px solid var(--border);" @submit.prevent="submit">
        <FormField v-model="form.fullName" label="Full name" required :error="errors.fullName" autocomplete="name" />
        <FormField v-model="form.email" label="Email" type="email" required :error="errors.email" autocomplete="email" />
        <FormField v-model="form.phone" label="Phone number" type="tel" required :error="errors.phone" autocomplete="tel" />
        <FormField v-model="form.password" label="Password" type="password" required :error="errors.password" hint="At least 6 characters." autocomplete="new-password" />
        <PrimaryButton type="submit" :loading="isSubmitting" full-width>Register</PrimaryButton>
      </form>
      <p class="mt-6 text-center text-sm" style="color: var(--text-muted);">
        Already have an account? <router-link to="/admin/login" class="font-semibold text-brand-500 hover:opacity-80">Sign in</router-link>
      </p>
      <div class="mt-6 text-center">
        <router-link to="/" class="text-xs transition-colors hover:opacity-80" style="color: var(--text-muted);">&larr; Back to main site</router-link>
      </div>
    </div>
  </div>
</template>
