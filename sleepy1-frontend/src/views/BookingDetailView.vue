<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookingService } from '@/services/bookingService'
import { usePageMeta } from '@/composables/usePageMeta'
import { useUiStore } from '@/stores/ui'
import type { Booking } from '@/types/booking'
import StatusBadge from '@/components/common/StatusBadge.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'

const route = useRoute()
const router = useRouter()
const ui = useUiStore()

const booking = ref<Booking | undefined>()
const isLoading = ref(true)
const showCancelModal = ref(false)
const showEmergencyModal = ref(false)

const emergencyNumbers = [
  { label: 'Helpline 1 (Primary)', number: '+91 9773112388', tel: '+919773112388' },
  { label: 'Helpline 2 (Secondary)', number: '+91 9606984328', tel: '+919606984328' },
]

watchEffect(async () => {
  isLoading.value = true
  booking.value = await bookingService.getById(route.params.id as string)
  isLoading.value = false
})

usePageMeta(() => ({
  title: booking.value ? `Booking ${booking.value.reference}` : 'Booking Details',
  description: 'Sleepy1 booking details, QR check-in code, and traveller instructions.',
}))

function formatDateTime(dateStr: string | undefined, timeStr: string | undefined) {
  if (!dateStr || !timeStr) return 'N/A'
  
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return `${dateStr}, ${timeStr}`
  
  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'long' })
  const year = d.getFullYear()
  
  let formattedTime = timeStr
  if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr)) {
    const [h, m] = timeStr.split(':')
    let hours = parseInt(h, 10)
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    formattedTime = `${hours}:${m} ${ampm}`
  }

  return `${day} ${month}, ${year}, ${formattedTime}`
}

async function cancelBooking() {
  if (!booking.value) return
  await bookingService.cancel(booking.value.id)
  booking.value = await bookingService.getById(booking.value.id)
  showCancelModal.value = false
  ui.pushToast({ type: 'success', title: 'Booking cancelled' })
}
</script>

<template>
  <div class="container-page max-w-3xl py-14">
    <LoadingSkeleton v-if="isLoading" :count="1" />
    <EmptyState
      v-else-if="!booking"
      title="Booking not found"
      description="This booking may have expired from the demo session."
      action-label="View My Bookings"
      @action="router.push('/bookings')"
    />
    <div v-else>
      <Breadcrumbs :items="[{ label: 'My Bookings', to: '/bookings' }, { label: booking.reference }]" />
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <h1 class="text-2xl font-semibold text-ivory-50 sm:text-3xl">{{ booking.locationName }}</h1>
        <StatusBadge :status="booking.status" />
      </div>
      <p class="mt-1 text-sm text-ivory-100/55">{{ booking.podLabel }} · Ref {{ booking.reference }}</p>

      <div class="mt-8 max-w-2xl">
        <div class="card-surface p-6 sm:p-8">
          <h2 class="mb-6 text-xl font-semibold text-brand-300">Guest Information & Schedule</h2>
          <dl class="space-y-4 text-base text-ivory-100/80">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4">
              <dt class="mb-1 text-sm text-ivory-100/60 sm:mb-0">Guest Name</dt>
              <dd class="font-medium text-ivory-50">{{ booking.guest.fullName }}</dd>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4">
              <dt class="mb-1 text-sm text-ivory-100/60 sm:mb-0">Email Address</dt>
              <dd class="font-medium text-ivory-50">{{ booking.guest.email }}</dd>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4">
              <dt class="mb-1 text-sm text-ivory-100/60 sm:mb-0">Phone Number</dt>
              <dd class="font-medium text-ivory-50">{{ booking.guest.phone }}</dd>
            </div>
            <div v-if="booking.guest.specialRequests && booking.guest.specialRequests.includes(':')" class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4">
              <dt class="mb-1 text-sm text-ivory-100/60 sm:mb-0 capitalize">{{ booking.guest.specialRequests.split(':')[0] }}</dt>
              <dd class="font-medium text-ivory-50 capitalize">{{ booking.guest.specialRequests.split(':')[1]?.trim() }}</dd>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4">
              <dt class="mb-1 text-sm text-ivory-100/60 sm:mb-0">Check-in</dt>
              <dd class="font-medium text-brand-300">{{ formatDateTime(booking.date, booking.checkIn) }}</dd>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pt-2">
              <dt class="mb-1 text-sm text-ivory-100/60 sm:mb-0">Check-out</dt>
              <dd class="font-medium text-brand-300">{{ formatDateTime(booking.checkOutDate || booking.date, booking.checkOutTime) }}</dd>
            </div>
          </dl>
        </div>
      </div>



      <div v-if="booking.status === 'upcoming'" class="mt-10 flex flex-wrap gap-3">
        <SecondaryButton as="RouterLink" to="/bookings">Back to My Bookings</SecondaryButton>
        <button
          type="button"
          class="btn-base inline-flex items-center gap-2 border border-rose-500/40 bg-rose-500/10 px-5 py-2.5 text-sm font-semibold text-rose-300 hover:bg-rose-500/20 active:scale-95 transition-all"
          @click="showEmergencyModal = true"
        >
          <svg class="h-4 w-4 animate-pulse text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Emergency Call
        </button>
        <button type="button" class="btn-base border border-rose-400/40 px-5 py-2.5 text-sm text-rose-300 hover:bg-rose-400/10" @click="showCancelModal = true">
          Cancel Booking
        </button>
      </div>
      <div v-else class="mt-10 flex flex-wrap gap-3">
        <PrimaryButton as="RouterLink" to="/quick-book">Book Another Pod</PrimaryButton>
        <SecondaryButton as="RouterLink" to="/bookings">Back to My Bookings</SecondaryButton>
      </div>
    </div>

    <ModalDialog :open="showEmergencyModal" title="Emergency Support Hotline" @close="showEmergencyModal = false">
      <p class="text-sm text-ivory-100/70">
        Need urgent assistance with your Sleepy1 pod, access issue, or safety? Direct dial our team below:
      </p>
      
      <div class="mt-5 space-y-3">
        <a
          v-for="item in emergencyNumbers"
          :key="item.tel"
          :href="`tel:${item.tel}`"
          class="flex items-center justify-between rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 hover:border-rose-500/40 hover:bg-rose-500/20 transition-all group"
        >
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-rose-300">{{ item.label }}</div>
              <div class="text-base font-bold text-ivory-50 group-hover:text-rose-200 transition-colors">{{ item.number }}</div>
            </div>
          </div>
          <span class="rounded-lg bg-rose-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm group-hover:bg-rose-400 transition-colors flex items-center gap-1.5">
            Call
          </span>
        </a>
      </div>

      <div class="mt-5 rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs text-ivory-100/60 flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <span>Operating Hours: <strong>10:00 AM – 10:00 PM</strong></span>
          <span>IIIT Dharwad</span>
        </div>
        <div class="text-ivory-100/50">Email: <a href="mailto:sleepy1.pods@gmail.com" class="text-brand-400 hover:underline">sleepy1.pods@gmail.com</a></div>
      </div>

      <div class="mt-6 flex justify-end">
        <SecondaryButton size="sm" @click="showEmergencyModal = false">Close</SecondaryButton>
      </div>
    </ModalDialog>

    <ModalDialog :open="showCancelModal" title="Cancel this booking?" @close="showCancelModal = false">
      <p class="text-sm text-ivory-100/65">This will cancel your reservation and refund any applicable credits. This cannot be undone.</p>
      <div class="mt-6 flex justify-end gap-3">
        <button type="button" class="btn-base border border-white/20 px-5 py-2.5 text-sm text-ivory-100" @click="showCancelModal = false">Keep Booking</button>
        <button type="button" class="btn-base bg-rose-500 px-5 py-2.5 text-sm text-white hover:bg-rose-400" @click="cancelBooking">Cancel Booking</button>
      </div>
    </ModalDialog>
  </div>
</template>
