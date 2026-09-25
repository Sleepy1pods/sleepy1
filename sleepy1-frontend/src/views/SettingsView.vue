<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

usePageMeta({
  title: 'Settings - Edit Profile',
  description: 'Edit and update your Sleepy1 account and profile details.',
})

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()

const isSaving = ref(false)
const form = reactive({
  fullName: '',
  email: '',
  phone: '',
})

const errors = ref<{ fullName?: string; email?: string; phone?: string }>({})

onMounted(() => {
  if (auth.user) {
    form.fullName = auth.user.fullName || ''
    form.email = auth.user.email || ''
    form.phone = auth.user.phone || ''
  }
})

function validate() {
  const errs: { fullName?: string; email?: string; phone?: string } = {}
  if (!form.fullName.trim()) errs.fullName = 'Full name is required.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address.'
  if (!/^[+]?[\d\s-]{7,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number.'
  errors.value = errs
  return Object.keys(errs).length === 0
}

async function handleSave() {
  if (!validate()) return
  isSaving.value = true
  try {
    auth.updateUser({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    })
    ui.pushToast({
      type: 'success',
      title: 'Settings Saved',
      description: 'Your user details have been updated successfully.',
    })
  } catch (err: any) {
    ui.pushToast({
      type: 'error',
      title: 'Update Failed',
      description: err?.message || 'Could not update your details.',
    })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="container-page max-w-2xl py-14">
    <!-- Header -->
    <div class="mb-8 border-b border-black/10 dark:border-white/10 pb-6">
      <h1 class="text-2xl font-bold text-zinc-900 dark:text-ivory-50 sm:text-3xl">Settings</h1>
      <p class="mt-1 text-sm text-zinc-600 dark:text-ivory-100/60">Edit your user details and profile information.</p>
    </div>

    <!-- User Avatar & Summary Banner -->
    <div class="mb-8 flex items-center gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-5">
      <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-lg font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
        {{ auth.user?.avatarInitials || 'U' }}
      </div>
      <div class="min-w-0 flex-1">
        <h2 class="truncate text-base font-semibold text-zinc-900 dark:text-ivory-50">{{ auth.user?.fullName || 'User' }}</h2>
        <p class="truncate text-xs text-zinc-500 dark:text-ivory-100/50">{{ auth.user?.email || 'user@example.com' }}</p>
      </div>
    </div>

    <!-- Form -->
    <form class="space-y-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-ink-900/40 p-6 sm:p-8 backdrop-blur-sm" @submit.prevent="handleSave">
      <FormField
        v-model="form.fullName"
        label="Full Name"
        required
        :error="errors.fullName"
        autocomplete="name"
        placeholder="e.g. Aarav Sharma"
      />

      <FormField
        v-model="form.email"
        label="Email Address"
        type="email"
        required
        :error="errors.email"
        autocomplete="email"
        placeholder="aarav@example.com"
      />

      <FormField
        v-model="form.phone"
        label="Phone Number"
        type="tel"
        required
        :error="errors.phone"
        autocomplete="tel"
        placeholder="+91 98765 43210"
      />

      <div class="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-6">
        <SecondaryButton type="button" @click="router.back()">
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" :loading="isSaving">
          Save Changes
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>
