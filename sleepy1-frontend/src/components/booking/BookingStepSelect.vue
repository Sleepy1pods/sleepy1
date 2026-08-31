<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { useLocationsStore } from '@/stores/locations'
import { podTypes } from '@/data/pods'
import { getFeaturedLocations } from '@/data/locations'
import { bookingService } from '@/services/bookingService'
import { formatInr } from '@/utils/format'
import type { TimeSlot } from '@/types/booking'
import PodCard from '@/components/common/PodCard.vue'
import HubVisual from '@/components/common/HubVisual.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const flow = useBookingFlowStore()
const store = useLocationsStore()

onMounted(() => {
  store.fetchAll()
  if (!flow.draft.locationId) {
    flow.setLocation('iiit-dharwad')
  }
  if (!flow.draft.podTypeId) {
    flow.setPod(podTypes[0].id)
  }
})

const featured = getFeaturedLocations()
const locationsList = computed(() => (store.filtered.length > 0 ? store.filtered : featured))

const today = new Date().toISOString().slice(0, 10)
const selectedDate = ref(flow.draft.date ?? today)
const selectedTime = ref(flow.draft.checkIn ?? '14:00')
const duration = ref(flow.draft.durationHours || 2)
const slots = ref<TimeSlot[]>([])
const isLoading = ref(true)

watchEffect(async () => {
  isLoading.value = true
  slots.value = await bookingService.getAvailability(flow.draft.locationId ?? 'iiit-dharwad', selectedDate.value)
  isLoading.value = false
  if (!selectedTime.value && slots.value.length > 0) {
    const firstAvailable = slots.value.find((s) => s.available)
    if (firstAvailable) selectedTime.value = firstAvailable.time
  }
})

function selectTime(time: string) {
  selectedTime.value = time
  flow.setSchedule(selectedDate.value, time, duration.value)
}

function updateDuration(val: number) {
  duration.value = val
  flow.setSchedule(selectedDate.value, selectedTime.value, val)
}

function updateDate(val: string) {
  selectedDate.value = val
  if (val) {
    calendarDate.value = new Date(`${val}T00:00:00`)
  }
  flow.setSchedule(val, selectedTime.value, duration.value)
}

// Interactive Visual Calendar State & Helpers
const calendarDate = ref(new Date(selectedDate.value ? `${selectedDate.value}T00:00:00` : Date.now()))
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const calendarMonthTitle = computed(() => {
  return `${monthNames[calendarDate.value.getMonth()]} ${calendarDate.value.getFullYear()}`
})

const isPrevMonthDisabled = computed(() => {
  const now = new Date()
  return (
    calendarDate.value.getFullYear() < now.getFullYear() ||
    (calendarDate.value.getFullYear() === now.getFullYear() && calendarDate.value.getMonth() <= now.getMonth())
  )
})

const calendarDays = computed(() => {
  const y = calendarDate.value.getFullYear()
  const m = calendarDate.value.getMonth()
  const firstDayOfWeek = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const todayStr = new Date().toISOString().slice(0, 10)

  const days: { empty?: boolean; dayNum?: number; dateStr?: string; disabled?: boolean; isToday?: boolean; isSelected?: boolean; key: string }[] = []

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ empty: true, key: `empty-${i}` })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const disabled = dateStr < todayStr
    const isToday = dateStr === todayStr
    const isSelected = dateStr === selectedDate.value
    days.push({
      empty: false,
      dayNum: d,
      dateStr,
      disabled,
      isToday,
      isSelected,
      key: dateStr,
    })
  }
  return days
})

function prevMonth() {
  const d = new Date(calendarDate.value)
  d.setMonth(d.getMonth() - 1)
  calendarDate.value = d
}

function nextMonth() {
  const d = new Date(calendarDate.value)
  d.setMonth(d.getMonth() + 1)
  calendarDate.value = d
}

// Time of Day Filter & 12-Hour Formatting
const slotFilter = ref<'all' | 'morning' | 'afternoon' | 'evening' | 'night'>('all')

const slotTabs = [
  { id: 'all' as const, label: 'All' },
  { id: 'morning' as const, label: 'Morning' },
  { id: 'afternoon' as const, label: 'Afternoon' },
  { id: 'evening' as const, label: 'Evening' },
  { id: 'night' as const, label: 'Night' },
]

function formatTime12h(timeStr: string): string {
  if (!timeStr) return ''
  const parts = timeStr.split(':')
  if (parts.length < 2) return timeStr
  let h = parseInt(parts[0], 10)
  const m = parts[1]
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m} ${ampm}`
}

function formatFriendlyDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(`${dateStr}T00:00:00`)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

function getCheckOutInfo(dateStr: string, checkInTimeStr: string, durHours: number) {
  if (!dateStr || !checkInTimeStr) return { dateStr: '', timeStr: '', formattedTime: '', isNextDay: false }
  const [hStr, mStr] = checkInTimeStr.split(':')
  const h = parseInt(hStr, 10)
  const m = parseInt(mStr || '0', 10)

  const endH = h + durHours
  const isNextDay = endH >= 24
  const finalH = endH % 24

  const outTimeStr = `${String(finalH).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  const formattedTime = formatTime12h(outTimeStr)

  const startDate = new Date(`${dateStr}T00:00:00`)
  if (isNextDay) {
    startDate.setDate(startDate.getDate() + 1)
  }
  const outDateStr = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`

  return {
    dateStr: outDateStr,
    timeStr: outTimeStr,
    formattedTime,
    isNextDay,
  }
}

const filteredSlots = computed(() => {
  return slots.value.filter((s) => {
    const h = parseInt(s.time.split(':')[0], 10)
    if (slotFilter.value === 'morning') return h >= 6 && h < 12
    if (slotFilter.value === 'afternoon') return h >= 12 && h < 17
    if (slotFilter.value === 'evening') return h >= 17 && h < 22
    if (slotFilter.value === 'night') return h >= 22 || h < 6
    return true
  })
})



function proceed() {
  flow.setSchedule(selectedDate.value, selectedTime.value, duration.value)
  flow.nextStep()
}
</script>

<template>
  <div class="space-y-12">


    <!-- Section 1: Choose Location -->
    <div>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 class="text-xl font-semibold text-ivory-50">1. Select Hub Location</h2>
          <p class="text-sm text-ivory-100/55">Choose a university, corporate park, hospital, or railway station.</p>
        </div>
        <div class="flex items-center gap-2 text-xs text-ivory-100/50">
          <span>Active:</span>
          <span class="font-semibold text-brand-300">{{ flow.selectedLocation?.name || 'IIIT Dharwad' }}</span>
        </div>
      </div>

      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="loc in locationsList"
          :key="loc.id"
          type="button"
          class="card-surface flex items-center gap-4 p-3.5 text-left transition-all hover:border-white/25"
          :class="flow.draft.locationId === loc.slug ? 'border-brand-400 ring-2 ring-brand-400/40 bg-brand-950/20' : ''"
          :aria-pressed="flow.draft.locationId === loc.slug"
          @click="flow.setLocation(loc.slug)"
        >
          <div class="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
            <img v-if="loc.heroImage.startsWith('/')" :src="loc.heroImage" class="h-full w-full object-cover" alt="Location hero image" loading="lazy" decoding="async" />
            <HubVisual v-else :hub-type="loc.hubType" :id="loc.heroImage" class="h-full w-full" rounded="rounded-xl" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <p class="truncate text-sm font-semibold text-ivory-50">{{ loc.shortName || loc.name }}</p>
              <StatusBadge :status="loc.availability" />
            </div>
            <p class="truncate text-xs text-ivory-100/50">{{ loc.city }} · {{ loc.terminal || 'Transit Hub' }}</p>
            <p class="mt-1 text-xs font-semibold text-brand-300">From ₹{{ loc.startingPricePerHour }}/hr</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Section 2: Choose Pod Type -->
    <div>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 class="text-xl font-semibold text-ivory-50">2. Select Pod Type</h2>
          <p class="text-sm text-ivory-100/55">Ergonomic sleep capsules engineered for acoustic calm.</p>
        </div>
        <div class="flex items-center gap-2 text-xs text-ivory-100/50">
          <span>Selected:</span>
          <span class="font-semibold text-brand-300">{{ flow.selectedPod?.name || 'Solo Rest Pod' }}</span>
        </div>
      </div>

      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PodCard
          v-for="pod in podTypes"
          :key="pod.id"
          :pod="pod"
          :price-per-hour="flow.getPriceForPod(pod.id)"
          :selected="flow.draft.podTypeId === pod.id"
          @select="flow.setPod(pod.id)"
        />
      </div>
    </div>

    <!-- Section 3: Pick Date, Time & Duration -->
    <div>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 class="text-xl font-semibold text-ivory-50">3. Select Date, Check-In (From) & Check-Out (To)</h2>
          <p class="text-sm text-ivory-100/55">Configure your check-in time and duration to calculate your exact check-out schedule.</p>
        </div>
        <div class="flex items-center gap-2 text-xs text-ivory-100/70">
          <span>Selected:</span>
          <span class="rounded-full bg-brand-400/15 px-3 py-1 font-bold text-brand-300 border border-brand-400/30">
            {{ selectedDate }} @ {{ formatTime12h(selectedTime || '14:00') }} ({{ duration }}h)
          </span>
        </div>
      </div>

      <!-- Ticket-Style "FROM -> TO" Live Booking Summary Card -->
      <div class="mt-5 rounded-2xl border border-brand-400/40 bg-gradient-to-r from-ink-900/95 via-ink-950 to-ink-900/95 p-5 shadow-premium">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          <!-- Check-In (FROM) -->
          <div class="flex-1 text-center md:text-left">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-400/30">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Check-In (From)
            </span>
            <p class="mt-2 text-2xl font-bold text-ivory-50">{{ formatTime12h(selectedTime || '14:00') }}</p>
            <p class="text-xs font-medium text-ivory-100/60">{{ formatFriendlyDate(selectedDate) }} · {{ selectedTime || '14:00' }} hrs</p>
          </div>

          <!-- Duration Arrow Badge -->
          <div class="flex flex-col items-center justify-center px-4">
            <div class="flex items-center gap-2 text-brand-300">
              <span class="hidden sm:block h-[1px] w-10 bg-brand-400/40"></span>
              <span class="rounded-full border border-brand-400/40 bg-brand-400/15 px-3.5 py-1.5 text-xs font-bold shadow-soft">
                ⏱️ {{ duration === 0.5 ? '30 Minute' : duration + ' Hour' + (duration > 1 ? 's' : '') }} Stay
              </span>
              <span class="hidden sm:block h-[1px] w-10 bg-brand-400/40"></span>
            </div>
            <span class="mt-1 text-[11px] font-semibold text-ivory-100/60">
              Est. Total: {{ formatInr(flow.pricing.basePrice) }}
            </span>
          </div>

          <!-- Check-Out (TO) -->
          <div class="flex-1 text-center md:text-right">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-sky-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-300 border border-sky-400/30">
              Check-Out (To) <span class="h-2 w-2 rounded-full bg-sky-400"></span>
            </span>
            <p class="mt-2 text-2xl font-bold text-ivory-50">
              {{ getCheckOutInfo(selectedDate, selectedTime || '14:00', duration).formattedTime }}
              <span v-if="getCheckOutInfo(selectedDate, selectedTime || '14:00', duration).isNextDay" class="text-xs font-bold text-brand-300 ml-1">
                (+1 Day)
              </span>
            </p>
            <p class="text-xs font-medium text-ivory-100/60">
              {{ formatFriendlyDate(getCheckOutInfo(selectedDate, selectedTime || '14:00', duration).dateStr) }} ·
              {{ getCheckOutInfo(selectedDate, selectedTime || '14:00', duration).timeStr }} hrs
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 grid gap-6 rounded-2xl border border-white/10 bg-ink-900/40 p-5 sm:p-6 lg:grid-cols-[1fr_1.3fr]">
        <div class="space-y-6">
          <!-- Visual Calendar Picker -->
          <div class="rounded-xl border border-white/10 bg-ink-950/70 p-4">
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 class="font-semibold text-ivory-50">{{ calendarMonthTitle }}</h3>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  :disabled="isPrevMonthDisabled"
                  class="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-ivory-100 transition-colors hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed"
                  @click="prevMonth"
                >
                  ◀
                </button>
                <button
                  type="button"
                  class="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-ivory-100 transition-colors hover:bg-white/10"
                  @click="nextMonth"
                >
                  ▶
                </button>
              </div>
            </div>

            <!-- Weekday Header (Su, Mo, Tu...) -->
            <div class="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-ivory-100/50">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>

            <!-- Calendar Days Grid -->
            <div class="mt-2 grid grid-cols-7 gap-1.5">
              <template v-for="d in calendarDays" :key="d.key">
                <div v-if="d.empty" class="h-9" />
                <button
                  v-else
                  type="button"
                  :disabled="d.disabled"
                  class="relative flex h-9 flex-col items-center justify-center rounded-lg text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-25"
                  :class="
                    d.isSelected
                      ? 'bg-brand-400 text-ink-950 font-bold shadow-soft scale-105 z-10'
                      : d.isToday
                        ? 'border border-brand-400/60 bg-brand-400/10 text-brand-300 hover:bg-brand-400/20'
                        : 'bg-white/5 text-ivory-50 hover:bg-white/15'
                  "
                  @click="updateDate(d.dateStr!)"
                >
                  <span>{{ d.dayNum }}</span>
                  <span v-if="d.isToday && !d.isSelected" class="absolute bottom-0.5 h-1 w-1 rounded-full bg-brand-400" />
                </button>
              </template>
            </div>
          </div>

          <!-- Stay Duration Selector -->
          <div class="rounded-xl border border-white/10 bg-ink-950/70 p-4">
            <div class="flex items-center justify-between">
              <label for="booking-duration" class="text-sm font-medium text-ivory-100/70">
                Stay Duration: <span class="font-bold text-ivory-50">{{ duration === 0.5 ? '30 minutes' : duration + ' hour' + (duration > 1 ? 's' : '') }}</span>
              </label>
              <span class="text-xs font-bold text-brand-300">
                Total: {{ formatInr(flow.pricing.basePrice) }}
              </span>
            </div>
            <input
              id="booking-duration"
              :value="duration"
              type="range"
              min="0.5"
              max="12"
              step="0.5"
              class="mt-3 w-full accent-brand-400"
              @input="updateDuration(Number(($event.target as HTMLInputElement).value))"
            />
            <div class="mt-2 flex flex-wrap gap-1.5 justify-between">
              <button
                v-for="h in [0.5, 1, 2, 3, 4, 6, 8, 12]"
                :key="h"
                type="button"
                class="rounded-lg px-2 py-1 text-[11px] transition-colors border"
                :class="
                  duration === h
                    ? 'border-brand-400/50 bg-brand-400/20 text-brand-300 font-bold'
                    : 'border-white/10 bg-white/5 text-ivory-100/70 hover:text-ivory-50 hover:bg-white/10'
                "
                @click="updateDuration(h)"
              >
                {{ h === 0.5 ? '30m' : h + 'h' }}{{ h === 12 ? ' (Overnight)' : '' }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-between">
          <div>
            <!-- Header -->
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3 border-b border-white/10 pb-3">
              <div>
                <p class="text-sm font-semibold text-ivory-50">Check-In Time Slots (From)</p>
                <p class="text-xs text-ivory-100/50">For {{ selectedDate }} · Checkout calculates automatically</p>
              </div>
              <span v-if="selectedTime" class="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-brand-300">
                From: {{ formatTime12h(selectedTime) }} ({{ selectedTime }})
              </span>
            </div>

            <!-- Time of Day Tabs -->
            <div class="mb-4 flex flex-wrap gap-1.5">
              <button
                v-for="tab in slotTabs"
                :key="tab.id"
                type="button"
                class="rounded-lg px-2.5 py-1 text-xs font-semibold transition-all"
                :class="
                  slotFilter === tab.id
                    ? 'bg-brand-400 text-ink-950 shadow-soft font-bold'
                    : 'bg-white/5 text-ivory-100/70 hover:bg-white/10 hover:text-ivory-50'
                "
                @click="slotFilter = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Slots Grid -->
            <LoadingSkeleton v-if="isLoading" variant="line" :count="4" />
            <div v-else-if="filteredSlots.length === 0" class="py-8 text-center text-xs text-ivory-100/50">
              No slots found for this time period. Try selecting another tab.
            </div>
            <div v-else class="grid max-h-[320px] grid-cols-2 gap-2.5 overflow-y-auto pr-1 no-scrollbar sm:grid-cols-3 md:grid-cols-4">
              <button
                v-for="slot in filteredSlots"
                :key="slot.time"
                type="button"
                :disabled="!slot.available"
                class="flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all disabled:cursor-not-allowed disabled:opacity-30"
                :class="
                  selectedTime === slot.time
                    ? 'border-brand-400 bg-brand-400 text-ink-950 font-bold shadow-soft ring-1 ring-brand-300'
                    : 'border-white/10 bg-ink-950/70 text-ivory-100 hover:border-white/25 hover:bg-ink-900'
                "
                @click="selectTime(slot.time)"
              >
                <span class="text-xs sm:text-sm font-bold">{{ formatTime12h(slot.time) }}</span>
                <span
                  class="mt-0.5 text-[11px] font-medium"
                  :class="selectedTime === slot.time ? 'text-ink-950 font-semibold' : 'text-brand-300/90'"
                >
                  → Ends {{ getCheckOutInfo(selectedDate, slot.time, duration).formattedTime }}
                  <span v-if="getCheckOutInfo(selectedDate, slot.time, duration).isNextDay" class="font-bold">(+1d)</span>
                </span>
                <span
                  class="mt-1 text-[10px] font-semibold"
                  :class="
                    selectedTime === slot.time
                      ? 'text-ink-950/80'
                      : slot.available
                        ? 'text-emerald-400/90'
                        : 'text-rose-400/90'
                  "
                >
                  {{ slot.available ? '● Available' : '● Sold out' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Quick Tip Footer -->
          <p class="mt-4 text-[11px] text-ivory-100/50">
            💡 All check-in slots come with a complimentary 15-minute grace period before your stay begins.
          </p>
        </div>
      </div>
    </div>

    <!-- Sticky Bottom Summary / Continue Banner -->
    <div class="sticky bottom-4 z-30 mx-auto max-w-5xl rounded-2xl border border-brand-400/40 bg-ink-950/95 p-4 shadow-premium backdrop-blur-xl sm:p-5">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="flex items-center gap-3 text-center sm:text-left">
          <div class="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-400/15 text-brand-300 sm:flex">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-ivory-50">
              {{ flow.selectedPod?.name || 'Solo Rest Pod' }} · {{ flow.selectedLocation?.shortName || flow.selectedLocation?.name || 'IIITD' }}
            </p>
            <p class="text-xs text-ivory-100/60">
              {{ selectedDate }} at {{ selectedTime }} · {{ duration === 0.5 ? '30 minutes' : duration + ' hour' + (duration > 1 ? 's' : '') }} ·
              <span class="font-bold text-brand-300">Estimate: {{ formatInr(flow.pricing.basePrice) }}</span>
            </p>
          </div>
        </div>

        <PrimaryButton size="lg" :disabled="!flow.draft.locationId || !flow.draft.podTypeId || !selectedTime" class="w-full sm:w-auto" @click="proceed">
          Continue to Guest & Extras →
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>
