import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Booking } from '@/types/booking'
import { bookingService } from '@/services/bookingService'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref<Booking[]>([])
  const isLoading = ref(false)
  const hasLoaded = ref(false)

  const upcoming = computed(() => bookings.value.filter((b) => b.status === 'upcoming'))
  const past = computed(() => bookings.value.filter((b) => b.status === 'completed' || b.status === 'cancelled'))

  async function fetchAll(force = false) {
    if (hasLoaded.value && !force) return
    isLoading.value = true
    try {
      bookings.value = await bookingService.getMyBookings()
      hasLoaded.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function cancelBooking(id: string) {
    await bookingService.cancel(id)
    await fetchAll(true)
  }

  async function rescheduleBooking(id: string, date: string, checkIn: string) {
    await bookingService.reschedule(id, date, checkIn)
    await fetchAll(true)
  }

  return { bookings, upcoming, past, isLoading, fetchAll, cancelBooking, rescheduleBooking }
})
