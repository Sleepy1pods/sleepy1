<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBookingsStore } from '@/stores/bookings'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import BookingCard from '@/components/common/BookingCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

usePageMeta({
  title: 'My Bookings',
  description: 'Manage your upcoming and previous Sleepy1 pod reservations — view details, reschedule, or cancel.',
})

const store = useBookingsStore()
const ui = useUiStore()

const cancelTargetId = ref<string | null>(null)
const rescheduleTargetId = ref<string | null>(null)
const rescheduleDate = ref('')
const rescheduleTime = ref('10:00')

onMounted(() => store.fetchAll())

function openCancel(id: string) {
  cancelTargetId.value = id
}
async function confirmCancel() {
  if (!cancelTargetId.value) return
  await store.cancelBooking(cancelTargetId.value)
  ui.pushToast({ type: 'success', title: 'Booking cancelled', description: 'Any applicable credits have been refunded to your wallet.' })
  cancelTargetId.value = null
}

function openReschedule(id: string) {
  rescheduleTargetId.value = id
  rescheduleDate.value = new Date().toISOString().slice(0, 10)
}
async function confirmReschedule() {
  if (!rescheduleTargetId.value) return
  await store.rescheduleBooking(rescheduleTargetId.value, rescheduleDate.value, rescheduleTime.value)
  ui.pushToast({ type: 'success', title: 'Booking rescheduled', description: 'Your new date and time have been saved.' })
  rescheduleTargetId.value = null
}

function downloadInvoice(id: string) {
  const booking = store.bookings.find((b) => b.id === id)
  if (!booking) return
  const content = `SLEEPY1 - SIMULATED INVOICE\nBooking Reference: ${booking.reference}\nLocation: ${booking.locationName}\nDate: ${booking.date} ${booking.checkIn}\nTotal Paid: Rs. ${booking.price.totalPayable}\n\nThis is a demo invoice generated on the frontend and is not a real financial document.`
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `sleepy1-invoice-${booking.reference}.txt`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="container-page max-w-4xl py-14">
    <h1 class="text-3xl font-semibold text-ivory-50">My Bookings</h1>
    <p class="mt-2 text-ivory-100/60">Manage your upcoming and previous Sleepy1 pod reservations.</p>

    <LoadingSkeleton v-if="store.isLoading && store.bookings.length === 0" :count="2" class="mt-10" />
    <template v-else>
      <section class="mt-10">
        <h2 class="text-lg font-semibold text-ivory-50">Upcoming Bookings</h2>
        <EmptyState
          v-if="store.upcoming.length === 0"
          class="mt-4"
          title="No upcoming bookings"
          description="Book a pod for your next journey and it will appear here."
          action-label="Book a Pod"
          @action="$router.push('/book')"
        />
        <div v-else class="mt-4 space-y-4">
          <BookingCard
            v-for="b in store.upcoming"
            :key="b.id"
            :booking="b"
            @cancel="openCancel(b.id)"
            @reschedule="openReschedule(b.id)"
          />
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-lg font-semibold text-ivory-50">Previous Bookings</h2>
        <EmptyState v-if="store.past.length === 0" class="mt-4" title="No previous bookings yet" />
        <div v-else class="mt-4 space-y-4">
          <BookingCard v-for="b in store.past" :key="b.id" :booking="b" @invoice="downloadInvoice(b.id)" />
        </div>
      </section>
    </template>

    <ModalDialog :open="cancelTargetId !== null" title="Cancel this booking?" @close="cancelTargetId = null">
      <p class="text-sm text-ivory-100/65">This will cancel your reservation and refund any applicable credits to your wallet. This action cannot be undone.</p>
      <div class="mt-6 flex justify-end gap-3">
        <SecondaryButton size="sm" @click="cancelTargetId = null">Keep Booking</SecondaryButton>
        <SecondaryButton size="sm" variant="danger" @click="confirmCancel">Cancel Booking</SecondaryButton>
      </div>
    </ModalDialog>

    <ModalDialog :open="rescheduleTargetId !== null" title="Reschedule booking" @close="rescheduleTargetId = null">
      <div class="space-y-4">
        <div>
          <label for="resched-date" class="mb-2 block text-sm font-medium text-ivory-100/70">New date</label>
          <input id="resched-date" v-model="rescheduleDate" type="date" class="min-h-[44px] w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-ivory-50 focus:border-brand-400" />
        </div>
        <div>
          <label for="resched-time" class="mb-2 block text-sm font-medium text-ivory-100/70">New check-in time</label>
          <input id="resched-time" v-model="rescheduleTime" type="time" class="min-h-[44px] w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-ivory-50 focus:border-brand-400" />
        </div>
      </div>
      <PrimaryButton full-width class="mt-6" @click="confirmReschedule">Confirm New Slot</PrimaryButton>
    </ModalDialog>
  </div>
</template>
