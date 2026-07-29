<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Create Account', description: 'Create a Sleepy1 account to start booking premium rest pods. Demo registration only.' })

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
    await auth.register(form)
    ui.pushToast({ type: 'success', title: 'Account created', description: 'Welcome to Sleepy1.' })
    router.push('/otp-verification')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-16">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-semibold text-ivory-50">Create your account</h1>
        <p class="mt-2 text-sm text-ivory-100/55">Join Sleepy1 for faster booking and credit rewards.</p>
        <p class="mt-2 text-xs text-amber-300/80">Demo registration — no real account is created.</p>
      </div>
      <form class="card-surface space-y-5 p-6 sm:p-8" @submit.prevent="submit">
        <FormField v-model="form.fullName" label="Full name" required :error="errors.fullName" autocomplete="name" />
        <FormField v-model="form.email" label="Email" type="email" required :error="errors.email" autocomplete="email" />
        <FormField v-model="form.phone" label="Phone number" type="tel" required :error="errors.phone" autocomplete="tel" />
        <FormField v-model="form.password" label="Password" type="password" required :error="errors.password" hint="At least 6 characters." autocomplete="new-password" />
        <PrimaryButton type="submit" :loading="isSubmitting" full-width>Create Account</PrimaryButton>
      </form>
      <p class="mt-6 text-center text-sm text-ivory-100/55">
        Already have an account? <router-link to="/login" class="font-semibold text-brand-300 hover:text-brand-200">Sign in</router-link>
      </p>
    </div>
  </div>
</template>
