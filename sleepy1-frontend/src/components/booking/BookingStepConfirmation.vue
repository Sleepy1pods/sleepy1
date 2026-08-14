<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { useBookingsStore } from '@/stores/bookings'
import { formatDateLong } from '@/utils/format'
import PaymentSuccess from '@/components/booking/PaymentSuccess.vue'
import QRDisplay from '@/components/common/QRDisplay.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import { useUiStore } from '@/stores/ui'

const flow = useBookingFlowStore()
const bookingsStore = useBookingsStore()
const router = useRouter()
const ui = useUiStore()
const booking = flow.confirmedBooking

function downloadCalendarFile() {
  if (!booking) return
  const start = new Date(`${booking.date}T${booking.checkIn}:00`)
  const end = new Date(start.getTime() + booking.durationHours * 60 * 60 * 1000)
  const toIcsDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sleepy1//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${booking.reference}@sleepy1.example`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:Sleepy1 Pod Booking - ${booking.locationName}`,
    `DESCRIPTION:Booking Reference ${booking.reference}. Pod ${booking.podLabel}.`,
    `LOCATION:${booking.locationName}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `sleepy1-${booking.reference}.ics`
  link.click()
  URL.revokeObjectURL(url)
}

function startNewBooking() {
  flow.reset()
  bookingsStore.fetchAll(true)
  router.push('/bookings')
}

function downloadReceipt() {
  ui.pushToast({
    type: 'info',
    title: 'Downloading Receipt',
    description: 'Your receipt is being generated and downloaded.'
  })
  // In a real application, this would trigger a PDF generation or backend endpoint
}

const directionsHref = ref(
  flow.selectedLocation ? `https://www.google.com/maps/search/?api=1&query=${flow.selectedLocation.geo.lat},${flow.selectedLocation.geo.lng}` : '',
)
</script>

<template>
  <div v-if="booking" class="mx-auto max-w-2xl">
    <PaymentSuccess />

    <div class="card-surface mt-2 p-6 sm:p-8">
      <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <QRDisplay :value="booking.qrValue" :reference="booking.reference" />
        <div class="flex-1 text-center sm:text-left">
          <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">Booking Confirmed</p>
          <h3 class="mt-1 text-xl font-semibold text-ivory-50">{{ booking.locationName }}</h3>
          <p class="mt-1 text-sm text-ivory-100/60">{{ booking.podLabel }} · {{ formatDateLong(booking.date) }} · {{ booking.checkIn }}</p>
          <p class="mt-1 text-sm text-ivory-100/60">Duration: {{ booking.durationHours }} hour(s)</p>
          <p class="mt-3 text-2xl font-semibold text-ivory-50">₹{{ booking.price.totalPayable }}</p>
        </div>
      </div>

      <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SecondaryButton size="sm" @click="downloadCalendarFile">Add to Calendar</SecondaryButton>
        <SecondaryButton as="a" :href="directionsHref" size="sm" class="justify-center">
          Get Directions
        </SecondaryButton>
        <SecondaryButton as="RouterLink" :to="`/bookings/${booking.id}`" size="sm">Check-in Instructions</SecondaryButton>
        <SecondaryButton size="sm" @click="downloadReceipt">Download Receipt</SecondaryButton>
      </div>
    </div>

    <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <PrimaryButton @click="startNewBooking">Go to My Bookings</PrimaryButton>
      <router-link to="/" class="text-sm font-semibold text-ivory-100/60 hover:text-ivory-100">Back to Home</router-link>
    </div>
  </div>
  <div v-else class="mx-auto max-w-lg text-center">
    <p class="text-ivory-100/60">No booking found in this session yet.</p>
    <PrimaryButton as="RouterLink" to="/quick-book" class="mt-6">Start a Booking</PrimaryButton>
  </div>
</template>
