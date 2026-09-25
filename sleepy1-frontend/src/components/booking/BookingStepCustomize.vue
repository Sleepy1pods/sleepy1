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

// Ensure extraIds is empty since Comfort Add-Ons are removed
flow.draft.extraIds = []

const form = reactive<GuestInfo>({
  fullName: flow.draft.guest?.fullName || auth.user?.fullName || '',
  email: flow.draft.guest?.email || auth.user?.email || '',
  phone: flow.draft.guest?.phone || auth.user?.phone || '',
  emergencyContactName: flow.draft.guest?.emergencyContactName || '',
  emergencyContactPhone: flow.draft.guest?.emergencyContactPhone || '',
  specialRequests: flow.draft.guest?.specialRequests || '',
  podCode: flow.draft.guest?.podCode || '101',
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
  <div class="space-y-8">
    <!-- Guest Schedule & Details Form -->
    <div>
      <h2 class="text-xl font-semibold text-ivory-50">Guest Information & Schedule</h2>
      <p class="text-sm text-ivory-100/55">Used for your smart check-in verification and pod access.</p>

      <form class="mt-6 rounded-2xl border border-white/10 bg-ink-900/40 p-6 sm:p-8" @submit.prevent="proceed">
        <div class="grid gap-5 sm:grid-cols-2">
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
          <FormField
            v-model="form.emergencyContactName"
            label="Emergency Contact Name"
            required
            :error="errors.emergencyContactName"
            placeholder="e.g. Priya Sharma"
          />
          <div class="sm:col-span-2">
            <FormField
              v-model="form.emergencyContactPhone"
              label="Emergency Contact Phone"
              type="tel"
              required
              :error="errors.emergencyContactPhone"
              placeholder="+91 98765 00000"
            />
          </div>

          <div class="sm:col-span-2">
            <FormField
              v-model="form.specialRequests"
              label="Special Requests (Optional)"
              as="textarea"
              :rows="2"
              hint="E.g. accessibility needs, late arrival notice."
              placeholder="Any preferences for your pod stay..."
            />
          </div>
        </div>

        <div class="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <SecondaryButton type="button" @click="flow.previousStep()">← Back to Schedule</SecondaryButton>
          <PrimaryButton type="submit" size="lg">Continue to Review & Pay →</PrimaryButton>
        </div>
      </form>
    </div>
  </div>
</template>
