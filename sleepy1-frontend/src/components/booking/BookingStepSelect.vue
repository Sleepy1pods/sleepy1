<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useBookingFlowStore } from '@/stores/bookingFlow'
import { useLocationsStore } from '@/stores/locations'
import { useUiStore } from '@/stores/ui'
import { podTypes } from '@/data/pods'
import { locations } from '@/data/locations'
import { bookingService } from '@/services/bookingService'
import { formatInr, formatTime12h } from '@/utils/format'
import type { TimeSlot } from '@/types/booking'
import HubVisual from '@/components/common/HubVisual.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const flow = useBookingFlowStore()
const store = useLocationsStore()
const ui = useUiStore()

onMounted(() => {
  store.fetchAll()
  flow.setLocation('iiit-dharwad')
  if (!flow.draft.podTypeId) {
    flow.setPod(podTypes[0].id)
  }
})

// Only IIIT Dharwad as an option, selected beforehand
const locationsList = computed(() => {
  const dharwad = (store.filtered.length > 0 ? store.filtered : locations).filter(
    (l) => l.slug === 'iiit-dharwad',
  )
  return dharwad.length > 0 ? dharwad : [locations[0]]
})

const today = new Date().toISOString().slice(0, 10)
const selectedDate = ref(flow.draft.date ?? today)
// Do NOT auto-select time slot: user must actively choose an available slot
const selectedTime = ref<string | null>(flow.draft.checkIn ?? null)
const duration = ref(2) // Fixed at 2 hours
const slots = ref<TimeSlot[]>([])
const isLoading = ref(true)

watchEffect(async () => {
  isLoading.value = true
  slots.value = await bookingService.getAvailability('iiit-dharwad', selectedDate.value)
  isLoading.value = false
})

function selectTime(time: string) {
  selectedTime.value = time
  flow.setSchedule(selectedDate.value, time, duration.value)
}

function updateDate(val: string) {
  selectedDate.value = val
  if (val) {
    calendarDate.value = new Date(`${val}T00:00:00`)
  }
  if (selectedTime.value) {
    flow.setSchedule(val, selectedTime.value, duration.value)
  }
}

// Interactive Visual Calendar State & Helpers
const calendarDate = ref(new Date(selectedDate.value ? `${selectedDate.value}T00:00:00` : Date.now()))
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

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

function formatFriendlyDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(`${dateStr}T00:00:00`)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

function getCheckOutInfo(dateStr: string, checkInTimeStr: string, durHours: number) {
  if (!dateStr || !checkInTimeStr) return { dateStr: '', formattedTime: '', isNextDay: false }
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
    formattedTime,
    isNextDay,
  }
}

const filteredSlots = computed(() => {
  return slots.value.filter((s) => {
    const [hStr, mStr] = s.time.split(':')
    const h = parseInt(hStr, 10)
    const m = parseInt(mStr || '0', 10)
    // Operating window is 10:00 AM to 10:00 PM.
    // Fixed stay is 2 hours, so check-in cannot exceed 8:00 PM (20:00), ensuring the last slot ends at 10:00 PM.
    if (h < 10 || h > 20 || (h === 20 && m > 0)) return false
    return true
  })
})

function proceed() {
  if (!selectedTime.value) {
    ui.pushToast({
      type: 'error',
      title: 'Time Slot Required',
      description: 'Please select an available check-in time slot before proceeding.',
    })
    return
  }
  flow.setSchedule(selectedDate.value, selectedTime.value, duration.value)
  flow.nextStep()
}
</script>

<template>
  <div class="space-y-12">
    <!-- Section 1: Choose Location (Only IIIT Dharwad) -->
    <div>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 class="text-xl font-semibold text-ivory-50">1. Select Hub Location</h2>
          <p class="text-sm text-ivory-100/55">Choose a university, corporate park, hospital, or railway station.</p>
        </div>
        <div class="flex items-center gap-2 text-xs text-ivory-100/50">
          <span>Active:</span>
          <span class="font-semibold text-white">{{ flow.selectedLocation?.name || 'IIIT Dharwad' }}</span>
        </div>
      </div>

      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="loc in locationsList"
          :key="loc.id"
          type="button"
          class="card-surface flex items-center gap-4 p-3.5 text-left transition-all hover:border-white/40"
          :class="flow.draft.locationId === loc.slug ? 'border-white ring-2 ring-white/30 bg-white/10' : ''"
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
            <p class="mt-1 text-xs font-semibold text-zinc-300">From ₹{{ loc.startingPricePerHour }}/hr</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Section 2: Pick Date & Check-In / Check-Out (Duration fixed to 2 hours) -->
    <div>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 class="text-xl font-semibold text-ivory-50">2. Select Date, Check-In (From) & Check-Out (To)</h2>
          <p class="text-sm text-ivory-100/55">Check-in slots available between 10:00 AM and 10:00 PM with 2 hours stay.</p>
        </div>
        <div class="flex items-center gap-2 text-xs text-ivory-100/70">
          <span>Selected:</span>
          <span class="rounded-full bg-white/10 px-3 py-1 font-bold text-white border border-white/20">
            {{ selectedDate }} @ {{ selectedTime ? formatTime12h(selectedTime) : 'Select Slot' }} ({{ duration }}h)
          </span>
        </div>
      </div>

      <!-- Ticket-Style "FROM -> TO" Live Booking Summary Card -->
      <div class="mt-5 rounded-2xl border border-white/20 bg-gradient-to-r from-ink-900/95 via-ink-950 to-ink-900/95 p-5 shadow-premium">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          <!-- Check-In (FROM) -->
          <div class="flex-1 text-center md:text-left">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20">
              <span class="h-2 w-2 rounded-full bg-white animate-pulse"></span> Check-In (From)
            </span>
            <p class="mt-2 text-2xl font-bold text-ivory-50">
              {{ selectedTime ? formatTime12h(selectedTime) : 'Select a slot' }}
            </p>
            <p class="text-xs font-medium text-ivory-100/60">
              {{ formatFriendlyDate(selectedDate) }}
              <span v-if="selectedTime"> · {{ formatTime12h(selectedTime) }}</span>
            </p>
          </div>

          <!-- Duration Badge (Fixed 2 Hours) -->
          <div class="flex flex-col items-center justify-center px-4">
            <div class="flex items-center gap-2 text-white">
              <span class="hidden sm:block h-[1px] w-10 bg-white/20"></span>
              <span class="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold shadow-soft">
                ⏱️ 2 Hours Stay
              </span>
              <span class="hidden sm:block h-[1px] w-10 bg-white/20"></span>
            </div>
            <span class="mt-1 text-[11px] font-semibold text-ivory-100/60">
              Est. Total: {{ formatInr(flow.pricing.basePrice) }}
            </span>
          </div>

          <!-- Check-Out (TO) -->
          <div class="flex-1 text-center md:text-right">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20">
              Check-Out (To) <span class="h-2 w-2 rounded-full bg-white"></span>
            </span>
            <p class="mt-2 text-2xl font-bold text-ivory-50">
              {{ selectedTime ? getCheckOutInfo(selectedDate, selectedTime, duration).formattedTime : '--:--' }}
              <span v-if="selectedTime && getCheckOutInfo(selectedDate, selectedTime, duration).isNextDay" class="text-xs font-bold text-zinc-300 ml-1">
                (+1 Day)
              </span>
            </p>
            <p class="text-xs font-medium text-ivory-100/60">
              <span v-if="selectedTime">{{ formatFriendlyDate(getCheckOutInfo(selectedDate, selectedTime, duration).dateStr) }} · {{ getCheckOutInfo(selectedDate, selectedTime, duration).formattedTime }}</span>
              <span v-else>Calculates from selected slot</span>
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
                      ? 'bg-white text-black font-bold shadow-soft scale-105 z-10'
                      : d.isToday
                        ? 'border border-white/60 bg-white/10 text-white hover:bg-white/20'
                        : 'bg-white/5 text-ivory-50 hover:bg-white/15'
                  "
                  @click="updateDate(d.dateStr!)"
                >
                  <span>{{ d.dayNum }}</span>
                  <span v-if="d.isToday && !d.isSelected" class="absolute bottom-0.5 h-1 w-1 rounded-full bg-white" />
                </button>
              </template>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-between">
          <div>
            <!-- Header -->
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <p class="text-sm font-semibold text-ivory-50">Check-In Time Slots (10:00 AM – 10:00 PM)</p>
                <p class="text-xs text-ivory-100/50">For {{ selectedDate }} · Pick your preferred 2-hour rest slot (ends by 10:00 PM)</p>
              </div>
              <span v-if="selectedTime" class="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-white border border-white/15">
                From: {{ formatTime12h(selectedTime) }}
              </span>
              <span v-else class="rounded-lg bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-300 border border-rose-500/20">
                ● Select a slot below
              </span>
            </div>

            <!-- Slots Grid -->
            <LoadingSkeleton v-if="isLoading" variant="line" :count="4" />
            <div v-else-if="filteredSlots.length === 0" class="py-8 text-center text-xs text-ivory-100/50">
              No slots found for this time period.
            </div>
            <div v-else data-lenis-prevent class="grid max-h-[320px] grid-cols-2 gap-2.5 overflow-y-auto pr-1 no-scrollbar sm:grid-cols-3 md:grid-cols-4">
              <button
                v-for="slot in filteredSlots"
                :key="slot.time"
                type="button"
                :disabled="!slot.available"
                class="flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all disabled:cursor-not-allowed disabled:opacity-30"
                :class="
                  selectedTime === slot.time
                    ? 'border-white bg-white text-black font-bold shadow-soft ring-1 ring-white/50'
                    : 'border-white/10 bg-ink-950/70 text-ivory-100 hover:border-white/25 hover:bg-ink-900'
                "
                @click="selectTime(slot.time)"
              >
                <span class="text-xs sm:text-sm font-bold">{{ formatTime12h(slot.time) }}</span>
                <span
                  class="mt-0.5 text-[11px] font-medium"
                  :class="selectedTime === slot.time ? 'text-black font-semibold' : 'text-zinc-300'"
                >
                  → Ends {{ getCheckOutInfo(selectedDate, slot.time, duration).formattedTime }}
                  <span v-if="getCheckOutInfo(selectedDate, slot.time, duration).isNextDay" class="font-bold">(+1d)</span>
                </span>
                <span
                  class="mt-1 text-[10px] font-semibold"
                  :class="
                    selectedTime === slot.time
                      ? 'text-black/80'
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
        </div>
      </div>
    </div>

    <!-- Sticky Bottom Summary / Continue Banner -->
    <div class="sticky bottom-4 z-30 mx-auto max-w-5xl rounded-2xl border border-white/20 bg-ink-950/95 p-4 shadow-premium backdrop-blur-xl sm:p-5">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="flex items-center gap-3 text-center sm:text-left">
          <div class="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white sm:flex">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-ivory-50">
              {{ flow.selectedLocation?.shortName || flow.selectedLocation?.name || 'IIIT Dharwad' }}
            </p>
            <p class="text-xs text-ivory-100/60">
              {{ selectedDate }}
              <span v-if="selectedTime"> at {{ formatTime12h(selectedTime) }}</span>
              <span v-else class="text-amber-300 font-medium"> · Please select a check-in time slot</span>
              · 2 hours stay ·
              <span class="font-bold text-white">Estimate: {{ formatInr(flow.pricing.basePrice) }}</span>
            </p>
          </div>
        </div>

        <PrimaryButton
          size="lg"
          :disabled="!selectedTime"
          class="w-full sm:w-auto"
          @click="proceed"
        >
          Continue to Guest Details →
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>
