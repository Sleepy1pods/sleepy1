<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Verify OTP', description: 'Verify your one-time password to complete Sleepy1 account setup. Demo flow only.' })

const router = useRouter()
const ui = useUiStore()
const digits = ref(['', '', '', '', '', ''])
const error = ref('')
const isVerifying = ref(false)
const inputs = ref<HTMLInputElement[]>([])

function onInput(index: number, event: Event) {
  const value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(-1)
  digits.value[index] = value
  if (value && index < 5) inputs.value[index + 1]?.focus()
}

function onKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

async function verify() {
  const code = digits.value.join('')
  if (code.length !== 6) {
    error.value = 'Enter the full 6-digit code.'
    return
  }
  isVerifying.value = true
  const valid = await authService.verifyOtp(code)
  isVerifying.value = false
  if (valid) {
    ui.pushToast({ type: 'success', title: 'Verified', description: 'Your account is confirmed.' })
    router.push('/')
  } else {
    error.value = 'Incorrect code. Try the demo code 123456.'
  }
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-16">
    <div class="w-full max-w-md text-center">
      <h1 class="text-2xl font-semibold text-ivory-50">Verify your account</h1>
      <p class="mt-2 text-sm text-ivory-100/55">Enter the 6-digit code sent to your phone or email.</p>
      <p class="mt-2 text-xs text-amber-300/80">Demo code: 123456</p>

      <div class="card-surface mt-8 p-6 sm:p-8">
        <div class="flex justify-center gap-2">
          <input
            v-for="(digit, i) in digits"
            :key="i"
            :ref="(el) => { if (el) inputs[i] = el as HTMLInputElement }"
            :value="digit"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="h-14 w-11 rounded-xl border border-white/10 bg-ink-800/60 text-center text-xl font-semibold text-ivory-50 focus:border-brand-400"
            :aria-label="`Digit ${i + 1}`"
            @input="onInput(i, $event)"
            @keydown="onKeydown(i, $event)"
          />
        </div>
        <p v-if="error" class="mt-4 text-sm font-medium text-rose-300">{{ error }}</p>
        <PrimaryButton class="mt-6" full-width :loading="isVerifying" @click="verify">Verify Code</PrimaryButton>
      </div>
    </div>
  </div>
</template>
