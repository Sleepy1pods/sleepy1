<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookingService } from '@/services/bookingService'
import { getLocationBySlug, locations } from '@/data/locations'
import { usePageMeta } from '@/composables/usePageMeta'
import { useUiStore } from '@/stores/ui'
import type { Booking } from '@/types/booking'
import BookingTimeline from '@/components/booking/BookingTimeline.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import QRDisplay from '@/components/common/QRDisplay.vue'
import PriceSummary from '@/components/common/PriceSummary.vue'
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

const locationInstructions = () => {
  const loc = locations.find((l) => l.id === booking.value?.locationId) ?? getLocationBySlug('mumbai-international-airport')
  return loc?.instructions ?? []
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

      <div class="mt-8">
        <BookingTimeline :status="booking.status" />
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <QRDisplay :value="booking.qrValue" :reference="booking.reference" />
        <PriceSummary
          :base-price="booking.price.basePrice"
          :extras-total="booking.price.extrasTotal"
          :service-fee="booking.price.serviceFee"
          :taxes="booking.price.taxes"
          :coupon-discount="booking.price.couponDiscount"
          :coupon-code="booking.price.couponCode"
          :credits-applied="booking.price.creditsApplied"
          :total-payable="booking.price.totalPayable"
        />
      </div>

      <section class="mt-10">
        <h2 class="text-lg font-semibold text-ivory-50">Check-in Instructions</h2>
        <ol class="mt-4 space-y-3">
          <li v-for="(instruction, i) in locationInstructions()" :key="i" class="flex gap-3 text-sm leading-relaxed text-ivory-100/65">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/15 text-xs font-semibold text-brand-300">{{ i + 1 }}</span>
            {{ instruction }}
          </li>
        </ol>
      </section>

      <div v-if="booking.status === 'upcoming'" class="mt-10 flex flex-wrap gap-3">
        <SecondaryButton as="RouterLink" to="/bookings">Back to My Bookings</SecondaryButton>
        <button type="button" class="btn-base border border-rose-400/40 px-5 py-2.5 text-sm text-rose-300 hover:bg-rose-400/10" @click="showCancelModal = true">
          Cancel Booking
        </button>
      </div>
      <div v-else class="mt-10">
        <PrimaryButton as="RouterLink" to="/book">Book Another Pod</PrimaryButton>
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
