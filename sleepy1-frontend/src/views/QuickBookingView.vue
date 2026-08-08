<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { bookingService } from '@/services/bookingService'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import CustomSelect from '@/components/common/CustomSelect.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Quick Book', description: 'Quickly book a pod in seconds.' })

const ui = useUiStore()
const auth = useAuthStore()
const router = useRouter()

const todayDate = new Date()
const form = reactive({
  name: '',
  email: '',
  phone: '',
  gender: '',
  checkinDate: `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, '0')}-${todayDate.getDate().toString().padStart(2, '0')}`,
  checkinTime: '',
  checkoutDate: '',
  checkoutTime: ''
})

const displayDate = computed(() => {
  if (!form.checkinDate) return ''
  const d = new Date(`${form.checkinDate}T00:00:00`)
  const todayStr = `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, '0')}-${todayDate.getDate().toString().padStart(2, '0')}`
  if (form.checkinDate === todayStr) {
    return 'Today, ' + d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
})

function changeDate(days: number) {
  const d = new Date(`${form.checkinDate}T00:00:00`)
  d.setDate(d.getDate() + days)
  
  const todayZero = new Date()
  todayZero.setHours(0,0,0,0)
  if (d < todayZero) return
  
  form.checkinDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
  form.checkinTime = ''
}

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
const bookedSlots = ref<string[]>([])
const isLoadingSlots = ref(false)

watch(() => form.checkinDate, async (newDate) => {
  if (newDate) {
    isLoadingSlots.value = true
    try {
      bookedSlots.value = await bookingService.getBookedSlots(newDate)
      if (bookedSlots.value.includes(form.checkinTime)) {
        form.checkinTime = ''
      }
    } catch (e) {
      console.error(e)
    } finally {
      isLoadingSlots.value = false
    }
  } else {
    bookedSlots.value = []
  }
}, { immediate: true })

const timeOptions = []
for (let i = 0; i < 24; i++) {
  const h24 = i.toString().padStart(2, '0')
  const period = i >= 12 ? 'PM' : 'AM'
  const h12 = i === 0 ? 12 : i > 12 ? i - 12 : i
  const h12Str = h12.toString().padStart(2, '0')
  
  const nextHour = i + 1
  const nextHourPeriod = nextHour >= 12 && nextHour < 24 ? 'PM' : 'AM'
  const h12Next = nextHour === 0 ? 12 : nextHour > 12 ? nextHour - 12 : nextHour
  const h12NextStr = h12Next.toString().padStart(2, '0')

  timeOptions.push({
    value: `${h24}:00`,
    label: `${h12Str}:00 ${period} - ${h12Str}:30 ${period}`
  })
  timeOptions.push({
    value: `${h24}:30`,
    label: `${h12Str}:30 ${period} - ${h12NextStr}:00 ${nextHourPeriod}`
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
    const res = await fetch('https://sleepy1-backend.onrender.com/api/bookings', {
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
        <div class="space-y-6">
          <div class="max-w-xs">
            <label class="mb-2 block text-sm font-medium text-ivory-100/80">Select Check-in Date <span class="text-brand-300">*</span></label>
            <div class="flex items-center justify-between rounded-xl border border-white/10 bg-ink-800/60 p-2">
              <button type="button" @click="changeDate(-1)" class="p-2 text-ivory-100 hover:text-brand-300 hover:bg-white/5 rounded-lg transition-colors">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div class="text-center font-medium text-ivory-50 flex-1">{{ displayDate }}</div>
              <button type="button" @click="changeDate(1)" class="p-2 text-ivory-100 hover:text-brand-300 hover:bg-white/5 rounded-lg transition-colors">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          
          <div v-if="form.checkinDate" class="animate-fade-in">
            <label class="mb-3 block text-sm font-medium text-ivory-100/80">Available Time Slots <span class="text-brand-300">*</span></label>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar pb-2">
              <button 
                v-for="slot in timeOptions" 
                :key="slot.value"
                type="button"
                :disabled="bookedSlots.includes(slot.value)"
                @click="form.checkinTime = slot.value"
                :class="[
                  'relative py-3 px-1 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1 overflow-hidden',
                  bookedSlots.includes(slot.value)
                    ? 'cursor-not-allowed border-red-500/20 bg-red-500/5'
                    : form.checkinTime === slot.value 
                      ? 'bg-brand-500 border-brand-400 text-white shadow-[0_0_12px_rgba(var(--color-brand-500),0.4)] scale-[1.03] z-10' 
                      : 'bg-ink-800/60 border-white/10 text-ivory-100 hover:border-brand-500/50 hover:bg-ink-700/80 hover:-translate-y-0.5'
                ]"
              >
                <span class="whitespace-nowrap font-semibold text-[14px] z-10" :class="bookedSlots.includes(slot.value) ? 'opacity-30 text-ivory-100' : ''">{{ slot.label.split(' - ')[0] }}</span>
                <span class="text-[11px] z-10" :class="bookedSlots.includes(slot.value) ? 'opacity-20' : 'opacity-70'">to {{ slot.label.split(' - ')[1] }}</span>
                
                <div v-if="bookedSlots.includes(slot.value)" class="absolute inset-0 flex items-center justify-center bg-ink-900/60 backdrop-blur-[1px] z-20">
                  <span class="text-[11px] font-bold uppercase tracking-widest text-red-500 rotate-[-12deg] border border-red-500/50 px-1.5 py-0.5 rounded-sm bg-ink-900/90 shadow-lg">Booked</span>
                </div>
              </button>
            </div>
            <p v-if="!form.checkinTime" class="mt-3 text-xs text-rose-400/80">Please select a time slot to continue.</p>
          </div>

          <div v-if="form.checkinTime && form.checkoutTime" class="rounded-xl bg-brand-500/10 border border-brand-500/20 p-5 flex items-center justify-between animate-fade-in">
            <div>
              <p class="text-[11px] text-ivory-100/60 uppercase tracking-wider mb-1 font-semibold">Check-out Schedule</p>
              <p class="text-sm font-medium text-brand-300">{{ form.checkoutDate }} at {{ timeOptions.find(t => t.value === form.checkoutTime)?.label.split(' - ')[0] || form.checkoutTime }}</p>
            </div>
            <div class="text-right">
              <p class="text-[11px] text-ivory-100/60 uppercase tracking-wider mb-1 font-semibold">Duration</p>
              <p class="text-sm font-medium text-ivory-50">30 Minutes</p>
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
