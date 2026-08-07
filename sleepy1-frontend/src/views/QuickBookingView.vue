<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import CustomSelect from '@/components/common/CustomSelect.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Quick Book', description: 'Quickly book a pod in seconds.' })

const ui = useUiStore()
const auth = useAuthStore()
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

watch([() => form.checkinDate, () => form.checkinTime], ([newDate, newTime]) => {
  if (newDate) {
    form.checkoutDate = newDate
  }

  if (newDate && newTime) {
    const [hours, minutes] = newTime.split(':').map(Number)
    const checkinObj = new Date(`${newDate}T00:00:00`)
    checkinObj.setHours(hours, minutes)
    
    // Add exactly 30 minutes duration
    checkinObj.setMinutes(checkinObj.getMinutes() + 30)
    
    const outYear = checkinObj.getFullYear()
    const outMonth = (checkinObj.getMonth() + 1).toString().padStart(2, '0')
    const outDay = checkinObj.getDate().toString().padStart(2, '0')
    const outHours = checkinObj.getHours().toString().padStart(2, '0')
    const outMins = checkinObj.getMinutes().toString().padStart(2, '0')
    
    form.checkoutDate = `${outYear}-${outMonth}-${outDay}`
    form.checkoutTime = `${outHours}:${outMins}`
  }
})

const isSubmitting = ref(false)

const timeOptions = []
for (let i = 0; i < 24; i++) {
  const h24 = i.toString().padStart(2, '0')
  const period = i >= 12 ? 'PM' : 'AM'
  const h12 = i === 0 ? 12 : i > 12 ? i - 12 : i
  const h12Str = h12.toString().padStart(2, '0')
  
  timeOptions.push({
    value: `${h24}:00`,
    label: `${h12Str}:00 ${period}`
  })
  timeOptions.push({
    value: `${h24}:30`,
    label: `${h12Str}:30 ${period}`
  })
}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not', label: 'Prefer not to say' }
]

async function submit() {
  if (!auth.isAuthenticated) {
    ui.pushToast({ type: 'error', title: 'Authentication Required', description: 'You must be logged in to book a pod. Please log in first.' })
    router.push('/login')
    return
  }

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
            <CustomSelect v-model="form.gender" :options="genderOptions" placeholder="Select Gender" />
          </div>
        </div>
      </div>

      <!-- Booking Schedule -->
      <div>
        <div class="mb-5 border-b border-white/10 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 class="text-lg font-medium text-ivory-50">Booking Schedule</h2>
          <span class="inline-flex items-center rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-300 ring-1 ring-inset ring-brand-500/20">
            <svg class="mr-1.5 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Fixed 30-minute duration
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField v-model="form.checkinDate" label="Check-in Date" type="date" required />
          
          <div>
            <label class="mb-2 block text-sm font-medium text-ivory-100/80">Check-in Time <span class="text-brand-300">*</span></label>
            <CustomSelect v-model="form.checkinTime" :options="timeOptions" placeholder="Select Time" />
          </div>

          <FormField v-model="form.checkoutDate" label="Check-out Date (Auto)" type="date" required disabled />
          
          <div>
            <label class="mb-2 block text-sm font-medium text-ivory-100/80">Check-out Time (Auto) <span class="text-brand-300">*</span></label>
            <CustomSelect v-model="form.checkoutTime" :options="timeOptions" placeholder="Auto calculated" disabled />
          </div>
        </div>
      </div>

      <div class="pt-4 flex justify-center">
        <PrimaryButton type="submit" :loading="isSubmitting" size="lg" class="w-full sm:w-auto">Confirm Booking</PrimaryButton>
      </div>
    </form>
  </div>
</template>
