<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import type { GuestInfo } from '@/types/booking'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const auth = useAuthStore()
const flow = useBookingFlowStore()

const form = reactive<GuestInfo>({
  fullName: flow.draft.guest?.fullName || auth.user?.fullName || '',
  email: flow.draft.guest?.email || auth.user?.email || '',
  phone: flow.draft.guest?.phone || auth.user?.phone || '',
  emergencyContactName: flow.draft.guest?.emergencyContactName || '',
  emergencyContactPhone: flow.draft.guest?.emergencyContactPhone || '',
  specialRequests: flow.draft.guest?.specialRequests || '',
})

const errors = ref<Partial<Record<keyof GuestInfo, string>>>({})

function validate() {
  const next: Partial<Record<keyof GuestInfo, string>> = {}
  if (!form.fullName.trim()) next.fullName = 'Full name is required.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
  if (!/^[+]?[\d\s-]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number.'
  if (!form.emergencyContactName.trim()) next.emergencyContactName = 'Emergency contact name is required.'
  if (!/^[+]?[\d\s-]{7,15}$/.test(form.emergencyContactPhone)) next.emergencyContactPhone = 'Enter a valid phone number.'
  errors.value = next
  return Object.keys(next).length === 0
}

function proceed() {
  if (!validate()) return
  flow.setGuest({ ...form })
  flow.nextStep()
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-ivory-50">Guest information</h2>
    <p class="mt-1 text-sm text-ivory-100/55">We'll use these details for check-in and, if needed, emergency contact.</p>

    <form class="mt-8 grid gap-5 sm:grid-cols-2" @submit.prevent="proceed">
      <FormField v-model="form.fullName" label="Full name" required :error="errors.fullName" autocomplete="name" />
      <FormField v-model="form.email" label="Email" type="email" required :error="errors.email" autocomplete="email" />
      <FormField v-model="form.phone" label="Phone number" type="tel" required :error="errors.phone" autocomplete="tel" />
      <FormField v-model="form.emergencyContactName" label="Emergency contact name" required :error="errors.emergencyContactName" />
      <FormField v-model="form.emergencyContactPhone" label="Emergency contact phone" type="tel" required :error="errors.emergencyContactPhone" />
      <div class="sm:col-span-2">
        <FormField v-model="form.specialRequests" label="Special requests (optional)" as="textarea" :rows="3" hint="E.g. accessibility needs, late arrival notice." />
      </div>

      <div class="mt-4 flex justify-between sm:col-span-2">
        <SecondaryButton type="button" @click="flow.previousStep()">← Back</SecondaryButton>
        <PrimaryButton type="submit">Continue →</PrimaryButton>
      </div>
    </form>
  </div>
</template>
