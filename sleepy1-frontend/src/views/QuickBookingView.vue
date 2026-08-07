<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Quick Book', description: 'Quickly book a pod in seconds.' })

const ui = useUiStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  gender: '',
  checkinDate: '',
  checkinTime: '',
  checkoutDate: '',
  checkoutTime: ''
})

const isSubmitting = ref(false)

const timeOptions = []
for (let i = 0; i < 24; i++) {
  const h = i.toString().padStart(2, '0')
  timeOptions.push(`${h}:00`)
  timeOptions.push(`${h}:30`)
}

async function submit() {
  isSubmitting.value = true
  try {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      checkInDate: form.checkinDate,
      checkInTime: form.checkinTime,
      checkOutDate: form.checkoutDate,
      checkOutTime: form.checkoutTime,
      gender: form.gender
    }
    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include'
    })
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Booking failed')
    }
    
    ui.pushToast({ type: 'success', title: 'Booking Request Received', description: 'We will confirm your booking shortly.' })
    router.push('/')
  } catch (error: any) {
    ui.pushToast({ type: 'error', title: 'Booking Failed', description: error.message || 'Please try again.' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container-page max-w-3xl py-14">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-semibold text-ivory-50 sm:text-4xl">Book a Pod</h1>
      <p class="mt-2 text-sm text-ivory-100/55">Fill in the details below and we'll reserve a pod for you instantly.</p>
    </div>

    <form class="card-surface p-6 sm:p-10 space-y-8" @submit.prevent="submit">
      <!-- Personal Details -->
      <div>
        <h2 class="text-lg font-medium text-ivory-50 mb-5 border-b border-white/10 pb-2">Personal Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField v-model="form.name" label="Full Name" required />
          <FormField v-model="form.email" label="Email Address" type="email" required />
          <FormField v-model="form.phone" label="Phone Number" type="tel" required />
          
          <div>
            <label class="mb-2 block text-sm font-medium text-ivory-100/80">Gender <span class="text-brand-300">*</span></label>
            <div class="relative">
              <select v-model="form.gender" required class="min-h-[44px] w-full appearance-none rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-ivory-50 transition-colors focus:border-brand-400">
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-ivory-100/50">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Schedule -->
      <div>
        <h2 class="text-lg font-medium text-ivory-50 mb-5 border-b border-white/10 pb-2">Booking Schedule</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField v-model="form.checkinDate" label="Check-in Date" type="date" required />
          
          <div>
            <label class="mb-2 block text-sm font-medium text-ivory-100/80">Check-in Time <span class="text-brand-300">*</span></label>
            <div class="relative">
              <select v-model="form.checkinTime" required class="min-h-[44px] w-full appearance-none rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-ivory-50 transition-colors focus:border-brand-400">
                <option value="" disabled>Select Time</option>
                <option v-for="time in timeOptions" :key="'in'+time" :value="time">{{ time }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-ivory-100/50">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <FormField v-model="form.checkoutDate" label="Check-out Date" type="date" required />
          
          <div>
            <label class="mb-2 block text-sm font-medium text-ivory-100/80">Check-out Time <span class="text-brand-300">*</span></label>
            <div class="relative">
              <select v-model="form.checkoutTime" required class="min-h-[44px] w-full appearance-none rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-ivory-50 transition-colors focus:border-brand-400">
                <option value="" disabled>Select Time</option>
                <option v-for="time in timeOptions" :key="'out'+time" :value="time">{{ time }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-ivory-100/50">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-4 flex justify-center">
        <PrimaryButton type="submit" :loading="isSubmitting" size="lg" class="w-full sm:w-auto">Confirm Booking</PrimaryButton>
      </div>
    </form>
  </div>
</template>
