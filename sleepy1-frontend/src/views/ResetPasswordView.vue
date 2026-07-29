<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Reset Password', description: 'Set a new password for your Sleepy1 account. Demo flow only.' })

const router = useRouter()
const ui = useUiStore()
const form = reactive({ password: '', confirmPassword: '' })
const errors = ref<{ password?: string; confirmPassword?: string }>({})
const isSubmitting = ref(false)

function validate() {
  const next: typeof errors.value = {}
  if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
  if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.'
  errors.value = next
  return Object.keys(next).length === 0
}

async function submit() {
  if (!validate()) return
  isSubmitting.value = true
  await authService.resetPassword('demo-token', form.password)
  isSubmitting.value = false
  ui.pushToast({ type: 'success', title: 'Password updated', description: 'You can now sign in with your new password.' })
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-16">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-semibold text-ivory-50">Set a new password</h1>
        <p class="mt-2 text-sm text-ivory-100/55">Choose a strong password for your Sleepy1 account.</p>
      </div>
      <form class="card-surface space-y-5 p-6 sm:p-8" @submit.prevent="submit">
        <FormField v-model="form.password" label="New password" type="password" required :error="errors.password" autocomplete="new-password" />
        <FormField v-model="form.confirmPassword" label="Confirm password" type="password" required :error="errors.confirmPassword" autocomplete="new-password" />
        <PrimaryButton type="submit" :loading="isSubmitting" full-width>Update Password</PrimaryButton>
      </form>
    </div>
  </div>
</template>
