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
        <button type="button" class="btn-base border border-rose-400/40 px-5 py-2.5 text-sm text-rose-300 hover:bg-rose-400/10" @click="showCancelModal = true">
          Cancel Booking
        </button>
      </div>
      <div v-else class="mt-10">
        <PrimaryButton as="RouterLink" to="/quick-book">Book Another Pod</PrimaryButton>
      </div>
    </div>

    <ModalDialog :open="showCancelModal" title="Cancel this booking?" @close="showCancelModal = false">
      <p class="text-sm text-ivory-100/65">This will cancel your reservation and refund any applicable credits. This cannot be undone.</p>
      <div class="mt-6 flex justify-end gap-3">
        <button type="button" class="btn-base border border-white/20 px-5 py-2.5 text-sm text-ivory-100" @click="showCancelModal = false">Keep Booking</button>
        <button type="button" class="btn-base bg-rose-500 px-5 py-2.5 text-sm text-white hover:bg-rose-400" @click="cancelBooking">Cancel Booking</button>
      </div>
    </ModalDialog>
  </div>
</template>
