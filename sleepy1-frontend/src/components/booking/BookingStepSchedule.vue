<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { bookingService } from '@/services/bookingService'
import type { TimeSlot } from '@/types/booking'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'

const flow = useBookingFlowStore()

const today = new Date().toISOString().slice(0, 10)
const selectedDate = ref(flow.draft.date ?? today)
const selectedTime = ref(flow.draft.checkIn ?? '')
const duration = ref(flow.draft.durationHours || 2)
const slots = ref<TimeSlot[]>([])
const isLoading = ref(true)

watchEffect(async () => {
  isLoading.value = true
  slots.value = await bookingService.getAvailability(flow.draft.locationId ?? '', selectedDate.value)
  isLoading.value = false
})

function selectTime(time: string) {
  selectedTime.value = time
}

function proceed() {
  flow.setSchedule(selectedDate.value, selectedTime.value, duration.value)
  flow.nextStep()
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-ivory-50">Pick your date, time & duration</h2>
    <p class="mt-1 text-sm text-ivory-100/55">Live mock availability for your selected pod.</p>

    <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <label for="booking-date" class="mb-2 block text-sm font-medium text-ivory-100/70">Date</label>
        <input
          id="booking-date"
          v-model="selectedDate"
          type="date"
          :min="today"
          class="min-h-[44px] w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-ivory-50 focus:border-brand-400"
        />

        <label for="booking-duration" class="mb-2 mt-6 block text-sm font-medium text-ivory-100/70">Duration: {{ duration }} hour{{ duration > 1 ? 's' : '' }}</label>
        <input id="booking-duration" v-model.number="duration" type="range" min="1" max="8" step="1" class="w-full accent-brand-400" />
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-ivory-100/70">Available check-in times</p>
        <LoadingSkeleton v-if="isLoading" variant="line" :count="1" />
        <div v-else class="grid max-h-64 grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-6">
          <button
            v-for="slot in slots"
            :key="slot.time"
            type="button"
            :disabled="!slot.available"
            class="min-h-[40px] rounded-lg border text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            :class="selectedTime === slot.time ? 'border-brand-400 bg-brand-400/15 text-brand-200' : 'border-white/10 text-ivory-100/70 hover:border-white/25'"
            :aria-pressed="selectedTime === slot.time"
            @click="selectTime(slot.time)"
          >
            {{ slot.time }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-10 flex justify-between">
      <SecondaryButton @click="flow.previousStep()">← Back</SecondaryButton>
      <PrimaryButton :disabled="!selectedDate || !selectedTime" @click="proceed">Continue →</PrimaryButton>
    </div>
  </div>
</template>
