<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { bookingService } from '@/services/bookingService'
import { usePageMeta } from '@/composables/usePageMeta'
import FormField from '@/components/common/FormField.vue'
import CustomSelect from '@/components/common/CustomSelect.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({ title: 'Quick Book', description: 'Quickly book a pod in seconds.' })

const ui = useUiStore()
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
  checkoutTime: '',
  agreeTerms: true
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
    
    // Add exactly 1 hour (60 minutes) duration
    checkinObj.setHours(checkinObj.getHours() + 1)
    
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

// 1-hour slots starting from 10:00 AM to 10:00 PM (10 to 21 start hours)
const timeOptions = []
for (let i = 10; i < 22; i++) {
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
    label: `${h12Str}:00 ${period} - ${h12NextStr}:00 ${nextHourPeriod}`
  })
}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not', label: 'Prefer not to say' }
]

const isSlotPast = (slotValue: string) => {
  if (!form.checkinDate) return false
  const todayStr = `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, '0')}-${todayDate.getDate().toString().padStart(2, '0')}`
  if (form.checkinDate === todayStr) {
    const [hours, minutes] = slotValue.split(':').map(Number)
    const now = new Date()
    const slotTime = new Date()
    slotTime.setHours(hours, minutes, 0, 0)
    return slotTime <= now
  }
  return false
}

async function submit() {
  if (!form.checkinTime) {
    ui.pushToast({ type: 'error', title: 'Missing Time Slot', description: 'Please select an available time slot before booking.' })
    return
  }

  isSubmitting.value = true
  try {
    const formatAmPm = (timeStr: string) => {
      if (!timeStr) return ''
      const [h, m] = timeStr.split(':').map(Number)
      const period = h >= 12 ? 'PM' : 'AM'
      const h12 = h % 12 || 12
      return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`
    }

    const payload = {
      access_key: '72e47201-4ef5-45f9-a7f8-6fb82f2f3c53',
      subject: 'New Pod Booking Request',
      name: form.name,
      email: form.email,
      phone: form.phone,
      checkInDate: form.checkinDate,
      checkInTime: formatAmPm(form.checkinTime),
      checkOutDate: form.checkoutDate,
      checkOutTime: formatAmPm(form.checkoutTime),
      gender: form.gender
    }
    
    const token = localStorage.getItem('sleepy1_auth_token')
    const headers: any = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      credentials: 'include'
    })
    
    const resData = await res.json().catch(() => ({}))
    const createdBooking = resData.data

    // Add to session mock state so it shows as booked without a backend
    bookingService.addMockBooking(form.checkinDate, form.checkinTime)

    ui.pushToast({ type: 'success', title: 'Success!', description: 'Your pod is successfully booked.' })
    if (createdBooking?._id) {
      router.push(`/bookings/${createdBooking._id}`)
    } else {
      router.push('/bookings')
    }
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
        <h2 class="text-lg font-medium text-zinc-900 dark:text-white mb-5 border-b border-black/10 dark:border-white/10 pb-2">Personal Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField v-model="form.name" label="Full Name" required />
          <FormField v-model="form.email" label="Email Address" type="email" required />
          <FormField v-model="form.phone" label="Phone Number" type="tel" required />
          
          <div>
            <label class="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Gender <span class="text-zinc-400 dark:text-zinc-500">*</span></label>
            <CustomSelect v-model="form.gender" :options="genderOptions" placeholder="Select Gender" />
          </div>
        </div>
      </div>

      <!-- Booking Schedule -->
      <div>
        <div class="mb-5 border-b border-black/10 dark:border-white/10 pb-2">
          <h2 class="text-lg font-medium text-zinc-900 dark:text-white">Booking Schedule</h2>
        </div>
        <div class="space-y-6">
          <div class="max-w-xs">
            <label class="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Check-in Date <span class="text-zinc-400 dark:text-zinc-500">*</span></label>
            <div class="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] p-2">
              <button type="button" @click="changeDate(-1)" class="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div class="text-center font-semibold text-zinc-900 dark:text-white flex-1">{{ displayDate }}</div>
              <button type="button" @click="changeDate(1)" class="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          
          <div v-if="form.checkinDate" class="animate-fade-in">
            <label class="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Available Time Slots <span class="text-zinc-400 dark:text-zinc-500">*</span></label>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar pb-2">
              <button 
                v-for="slot in timeOptions" 
                :key="slot.value"
                type="button"
                :disabled="bookedSlots.includes(slot.value) || isSlotPast(slot.value)"
                @click="form.checkinTime = slot.value"
                :class="[
                  'relative py-3 px-2 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1 overflow-hidden',
                  (bookedSlots.includes(slot.value) || isSlotPast(slot.value))
                    ? 'cursor-not-allowed border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] opacity-40'
                    : form.checkinTime === slot.value 
                      ? 'active-slot-btn scale-[1.02] z-10 font-bold shadow-md' 
                      : 'inactive-slot-btn'
                ]"
              >
                <span class="whitespace-nowrap font-semibold text-[14px] z-10">{{ slot.label.split(' - ')[0] }}</span>
                <span class="text-[11px] z-10" :class="form.checkinTime === slot.value ? 'opacity-85' : 'opacity-60'">to {{ slot.label.split(' - ')[1] }}</span>
                
                <div v-if="bookedSlots.includes(slot.value)" class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] z-20">
                  <span class="text-[11px] font-bold uppercase tracking-widest text-red-400 rotate-[-12deg] border border-red-500/50 px-1.5 py-0.5 rounded-sm bg-black/80 shadow-lg">Booked</span>
                </div>
                <div v-else-if="isSlotPast(slot.value)" class="absolute inset-0 flex items-center justify-center bg-black/20 dark:bg-black/50 backdrop-blur-[1px] z-20">
                  <span class="text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 rotate-[-12deg] px-1.5 py-0.5 rounded-sm bg-black/80">Past</span>
                </div>
              </button>
            </div>
            <p v-if="!form.checkinTime" class="mt-3 text-xs text-zinc-500">Please select a time slot to continue.</p>
          </div>

          <div v-if="form.checkinTime && form.checkoutTime" class="rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 p-5 flex items-center justify-between animate-fade-in">
            <div>
              <p class="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 font-semibold">Check-out Schedule</p>
              <p class="text-sm font-semibold text-zinc-900 dark:text-white">{{ form.checkoutDate }} at {{ timeOptions.find(t => t.value === form.checkoutTime)?.label.split(' - ')[0] || form.checkoutTime }}</p>
            </div>
            <div class="text-right">
              <p class="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 font-semibold">Duration</p>
              <p class="text-sm font-semibold text-zinc-900 dark:text-white">1 Hour</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Terms Acceptance Checkbox -->
      <div class="flex items-center gap-3 pt-1">
        <input
          id="terms-checkbox"
          v-model="form.agreeTerms"
          type="checkbox"
          required
          class="h-4 w-4 rounded border-zinc-300 text-black focus:ring-black dark:border-zinc-700 dark:bg-zinc-800"
        />
        <label for="terms-checkbox" class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 select-none">
          I agree to the
          <router-link to="/legal/terms" target="_blank" class="font-semibold text-zinc-900 dark:text-white underline hover:opacity-80">
            Sleepy1 Terms & Conditions
          </router-link>.
        </label>
      </div>

      <div class="pt-2 flex justify-center">
        <PrimaryButton type="submit" :loading="isSubmitting" size="lg" class="w-full sm:w-auto">Confirm Booking</PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.active-slot-btn {
  background-color: var(--cta-bg) !important;
  color: var(--cta-text) !important;
  border-color: var(--cta-bg) !important;
}

.inactive-slot-btn {
  background-color: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.12);
  color: #18181b;
}

.inactive-slot-btn:hover {
  border-color: rgba(0, 0, 0, 0.35);
  background-color: rgba(0, 0, 0, 0.06);
}

html.dark .inactive-slot-btn,
.dark .inactive-slot-btn {
  background-color: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
  color: #f4f4f5;
}

html.dark .inactive-slot-btn:hover,
.dark .inactive-slot-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
