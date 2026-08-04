import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BookingDraft, GuestInfo, PaymentMethod, Booking } from '@/types/booking'
import { getLocationBySlug } from '@/data/locations'
import { getPodTypeById } from '@/data/pods'
import { bookingExtras } from '@/data/bookings'
import { bookingService } from '@/services/bookingService'
import { calculatePricing, getPodPriceForLocation } from '@/utils/pricing'

const STEP_ORDER = ['select', 'customize', 'checkout', 'confirmation'] as const
export type BookingStep = (typeof STEP_ORDER)[number]

function emptyGuest(): GuestInfo {
  return {
    fullName: '',
    email: '',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    specialRequests: '',
  }
}

export const useBookingFlowStore = defineStore('bookingFlow', () => {
  const currentStepIndex = ref(0)
  const draft = ref<BookingDraft>({
    locationId: null,
    podTypeId: null,
    date: null,
    checkIn: null,
    durationHours: 2,
    extraIds: [],
    guest: emptyGuest(),
    couponCode: null,
    paymentMethod: 'direct',
    creditsToApply: 0,
  })
  const confirmedBooking = ref<Booking | null>(null)
  const isSubmitting = ref(false)

  const currentStep = computed<BookingStep>(() => STEP_ORDER[currentStepIndex.value])
  const totalSteps = STEP_ORDER.length

  const selectedLocation = computed(() => (draft.value.locationId ? getLocationBySlug(draft.value.locationId) : undefined))
  const selectedPod = computed(() => (draft.value.podTypeId ? getPodTypeById(draft.value.podTypeId) : undefined))
  const selectedExtras = computed(() => bookingExtras.filter((e) => draft.value.extraIds.includes(e.id)))

  const currentPodPricePerHour = computed(() => getPodPriceForLocation(draft.value.podTypeId, draft.value.locationId))

  function getPriceForPod(podTypeId: string): number {
    return getPodPriceForLocation(podTypeId, draft.value.locationId)
  }

  const pricing = computed(() => {
    const basePrice = currentPodPricePerHour.value * draft.value.durationHours
    const extrasTotal = selectedExtras.value.reduce((sum, e) => sum + e.price, 0)
    return calculatePricing({
      basePrice,
      extrasTotal,
      couponCode: draft.value.couponCode,
      creditsToApply: draft.value.creditsToApply,
    })
  })

  function goToStep(step: BookingStep) {
    const idx = STEP_ORDER.indexOf(step)
    if (idx >= 0) currentStepIndex.value = idx
  }

  function nextStep() {
    if (currentStepIndex.value < STEP_ORDER.length - 1) currentStepIndex.value += 1
  }

  function previousStep() {
    if (currentStepIndex.value > 0) currentStepIndex.value -= 1
  }

  function setLocation(slug: string) {
    draft.value.locationId = slug
  }

  function setPod(podTypeId: string) {
    draft.value.podTypeId = podTypeId
  }

  function setSchedule(date: string, checkIn: string, durationHours: number) {
    draft.value.date = date
    draft.value.checkIn = checkIn
    draft.value.durationHours = durationHours
  }

  function toggleExtra(extraId: string) {
    const set = new Set(draft.value.extraIds)
    if (set.has(extraId)) set.delete(extraId)
    else set.add(extraId)
    draft.value.extraIds = Array.from(set)
  }

  function setGuest(guest: GuestInfo) {
    draft.value.guest = guest
  }

  function setCoupon(code: string | null) {
    draft.value.couponCode = code
  }

  function setPaymentMethod(method: PaymentMethod) {
    draft.value.paymentMethod = method
  }

  function setCreditsToApply(amount: number) {
    draft.value.creditsToApply = Math.max(0, amount)
  }

  function applyQuickPreset(preset: 'nap' | 'overnight' | 'duo' | 'work') {
    if (!draft.value.locationId) {
      draft.value.locationId = 'new-delhi-railway-station'
    }
    const today = new Date().toISOString().slice(0, 10)
    draft.value.date = draft.value.date || today
    switch (preset) {
      case 'nap':
        draft.value.podTypeId = 'pod-solo-rest'
        draft.value.durationHours = 2
        draft.value.checkIn = '14:00'
        break
      case 'overnight':
        draft.value.podTypeId = 'pod-solo-rest'
        draft.value.durationHours = 6
        draft.value.checkIn = '22:00'
        break
      case 'duo':
        draft.value.podTypeId = 'pod-twin-lounge'
        draft.value.durationHours = 3
        draft.value.checkIn = '18:00'
        break
      case 'work':
        draft.value.podTypeId = 'pod-solo-work'
        draft.value.durationHours = 4
        draft.value.checkIn = '10:00'
        break
    }
  }

  async function confirmBooking() {
    isSubmitting.value = true
    try {
      const booking = await bookingService.createFromDraft(draft.value)
      confirmedBooking.value = booking
      goToStep('confirmation')
      return booking
    } finally {
      isSubmitting.value = false
    }
  }

  function reset() {
    currentStepIndex.value = 0
    draft.value = {
      locationId: null,
      podTypeId: null,
      date: null,
      checkIn: null,
      durationHours: 2,
      extraIds: [],
      guest: emptyGuest(),
      couponCode: null,
      paymentMethod: 'direct',
      creditsToApply: 0,
    }
    confirmedBooking.value = null
  }

  return {
    STEP_ORDER,
    currentStepIndex,
    currentStep,
    totalSteps,
    draft,
    confirmedBooking,
    isSubmitting,
    selectedLocation,
    selectedPod,
    selectedExtras,
    currentPodPricePerHour,
    getPriceForPod,
    pricing,
    goToStep,
    nextStep,
    previousStep,
    setLocation,
    setPod,
    setSchedule,
    toggleExtra,
    setGuest,
    setCoupon,
    setPaymentMethod,
    setCreditsToApply,
    applyQuickPreset,
    confirmBooking,
    reset,
  }
})
