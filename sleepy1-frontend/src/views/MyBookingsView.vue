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
const showEmergencyModal = ref(false)

const emergencyNumbers = [
  { label: 'Helpline 1 (Primary)', number: '+91 9773112388', tel: '+919773112388' },
  { label: 'Helpline 2 (Secondary)', number: '+91 9606984328', tel: '+919606984328' },
]

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


</script>

<template>
  <div class="container-page max-w-4xl py-14">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-ivory-50">My Bookings</h1>
        <p class="mt-2 text-ivory-100/60">Manage your upcoming and previous Sleepy1 pod reservations.</p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 self-start rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 hover:bg-rose-500/20 active:scale-95 transition-all sm:self-auto shadow-sm"
        @click="showEmergencyModal = true"
      >
        <svg class="h-4 w-4 animate-pulse text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>Emergency Call</span>
      </button>
    </div>

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
          @action="$router.push('/quick-book')"
        />
        <div v-else class="mt-4 space-y-4">
          <BookingCard
            v-for="b in store.upcoming"
            :key="b.id"
            :booking="b"
            @cancel="openCancel(b.id)"
            @reschedule="openReschedule(b.id)"
            @emergency="showEmergencyModal = true"
          />
        </div>
      </section>

      <section class="mt-14">
        <h2 class="text-lg font-semibold text-ivory-50">Previous Bookings</h2>
        <EmptyState v-if="store.past.length === 0" class="mt-4" title="No previous bookings yet" />
        <div v-else class="mt-4 space-y-4">
          <BookingCard v-for="b in store.past" :key="b.id" :booking="b" />
        </div>
      </section>
    </template>

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
