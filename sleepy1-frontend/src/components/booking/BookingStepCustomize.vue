<script setup lang="ts">
import { reactive, ref } from 'vue'
import { bookingExtras } from '@/data/bookings'
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

const iconPaths: Record<string, string> = {
  pillow: 'M4 12a8 4 0 1116 0 8 4 0 01-16 0z',
  blanket: 'M3 4h18v16H3V4zM3 10h18M9 10v10',
  eyemask: 'M2 10c2-3 6-4 10-4s8 1 10 4c-2 3-6 4-10 4s-8-1-10-4z',
  coffee: 'M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 9h1a3 3 0 010 6h-1M6 2v2M10 2v2M14 2v2',
  locker: 'M4 4h16v16H4V4zM12 4v16M8 10h.01M16 10h.01',
  shower: 'M4 12h16M6 12V7a4 4 0 018 0v1M8 16v2m4-2v2m4-2v2',
}

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
  <div class="space-y-12">
    <!-- Section 1: Optional Comfort Extras -->
    <div>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 class="text-xl font-semibold text-ivory-50">1. Optional Comfort Add-Ons</h2>
          <p class="text-sm text-ivory-100/55">Enhance your stay — feel free to skip if you just need standard pod rest.</p>
        </div>
        <div class="text-xs font-semibold text-brand-300">
          {{ flow.draft.extraIds.length }} selected · ₹{{ flow.pricing.extrasTotal }}
        </div>
      </div>

      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="extra in bookingExtras"
          :key="extra.id"
          type="button"
          class="card-surface flex items-start gap-3.5 p-5 text-left transition-all hover:border-white/25"
          :class="flow.draft.extraIds.includes(extra.id) ? 'border-brand-400 ring-2 ring-brand-400/30 bg-brand-950/20' : ''"
          :aria-pressed="flow.draft.extraIds.includes(extra.id)"
          @click="flow.toggleExtra(extra.id)"
        >
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-400/10 text-brand-300">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path :d="iconPaths[extra.icon] ?? ''" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <div class="flex-1">
            <div class="flex items-center justify-between gap-2">
              <p class="text-sm font-semibold text-ivory-50">{{ extra.label }}</p>
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors"
                :class="flow.draft.extraIds.includes(extra.id) ? 'border-brand-400 bg-brand-400 text-ink-950' : 'border-white/20'"
              >
                <svg v-if="flow.draft.extraIds.includes(extra.id)" class="h-3 w-3" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
            </div>
            <p class="mt-1 text-xs text-ivory-100/50">{{ extra.description }}</p>
            <p class="mt-2 text-sm font-bold text-brand-300">₹{{ extra.price }}</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Section 2: Guest Details Form -->
    <div>
      <h2 class="text-xl font-semibold text-ivory-50">2. Guest Information</h2>
      <p class="text-sm text-ivory-100/55">Used for your smart check-in QR code and emergency contact.</p>

      <form class="mt-6 rounded-2xl border border-white/10 bg-ink-900/40 p-6 sm:p-8" @submit.prevent="proceed">
        <div class="grid gap-5 sm:grid-cols-2">
          <FormField v-model="form.fullName" label="Full Name" required :error="errors.fullName" autocomplete="name" placeholder="e.g. Aarav Sharma" />
          <FormField v-model="form.email" label="Email Address" type="email" required :error="errors.email" autocomplete="email" placeholder="aarav@example.com" />
          <FormField v-model="form.phone" label="Phone Number" type="tel" required :error="errors.phone" autocomplete="tel" placeholder="+91 98765 43210" />
          <FormField v-model="form.emergencyContactName" label="Emergency Contact Name" required :error="errors.emergencyContactName" placeholder="e.g. Priya Sharma" />
          <FormField v-model="form.emergencyContactPhone" label="Emergency Contact Phone" type="tel" required :error="errors.emergencyContactPhone" placeholder="+91 98765 00000" />
          <div class="sm:col-span-2">
            <FormField v-model="form.specialRequests" label="Special Requests (Optional)" as="textarea" :rows="2" hint="E.g. accessibility needs, late arrival notice." placeholder="Any preferences for your pod stay..." />
          </div>
        </div>

        <div class="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <SecondaryButton type="button" @click="flow.previousStep()">← Back to Pod & Schedule</SecondaryButton>
          <PrimaryButton type="submit" size="lg">Continue to Review & Pay →</PrimaryButton>
        </div>
      </form>
    </div>
  </div>
</template>
