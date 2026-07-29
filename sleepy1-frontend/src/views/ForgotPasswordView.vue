<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Forgot Password', description: 'Reset your Sleepy1 account password. Demo flow only.' })

const router = useRouter()
const email = ref('')
const error = ref('')
const isSubmitted = ref(false)
const isSubmitting = ref(false)

async function submit() {
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = 'Enter a valid email address.'
    return
  }
  error.value = ''
  isSubmitting.value = true
  await authService.requestPasswordReset(email.value)
  isSubmitting.value = false
  isSubmitted.value = true
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-16">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-semibold text-ivory-50">Reset your password</h1>
        <p class="mt-2 text-sm text-ivory-100/55">We'll send reset instructions to your email.</p>
      </div>
      <div class="card-surface p-6 sm:p-8">
        <template v-if="!isSubmitted">
          <form class="space-y-5" @submit.prevent="submit">
            <FormField v-model="email" label="Email" type="email" required :error="error" autocomplete="email" />
            <PrimaryButton type="submit" :loading="isSubmitting" full-width>Send Reset Link</PrimaryButton>
          </form>
        </template>
        <template v-else>
          <div class="text-center">
            <p class="text-ivory-100/70">If an account exists for <strong class="text-ivory-50">{{ email }}</strong>, reset instructions have been sent.</p>
            <PrimaryButton class="mt-6" full-width @click="router.push('/reset-password')">Continue to Reset (Demo)</PrimaryButton>
          </div>
        </template>
      </div>
      <p class="mt-6 text-center text-sm text-ivory-100/55">
        <router-link to="/login" class="font-semibold text-brand-300 hover:text-brand-200">← Back to sign in</router-link>
      </p>
    </div>
  </div>
</template>
