<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Login', description: 'Sign in to your Sleepy1 account to manage bookings, credits, and membership.' })

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()
const route = useRoute()

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
    ui.pushToast({ type: 'success', title: 'Welcome back', description: 'You are now signed in.' })
    router.push((route.query.redirect as string) || '/')
  } catch (error: any) {
    ui.pushToast({ type: 'error', title: 'Sign in failed', description: error.message || 'Please check your details and try again.' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-16">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-semibold text-ivory-50">Welcome back</h1>
        <p class="mt-2 text-sm text-ivory-100/55">Sign in to manage your bookings and credits.</p>
      </div>
      <form class="card-surface space-y-5 p-6 sm:p-8" @submit.prevent="submit">
        <FormField v-model="form.email" label="Email" type="email" required :error="errors.email" autocomplete="email" />
        <FormField v-model="form.password" label="Password" type="password" required :error="errors.password" autocomplete="current-password" />
        <div class="flex justify-end">
          <router-link to="/forgot-password" class="text-xs font-medium text-brand-300 hover:text-brand-200">Forgot password?</router-link>
        </div>
        <PrimaryButton type="submit" :loading="isSubmitting" full-width>Sign In</PrimaryButton>
      </form>
      <p class="mt-6 text-center text-sm text-ivory-100/55">
        New to Sleepy1? <router-link to="/register" class="font-semibold text-brand-300 hover:text-brand-200">Create an account</router-link>
      </p>
    </div>
  </div>
</template>
