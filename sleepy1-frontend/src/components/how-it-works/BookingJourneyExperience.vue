<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { podTypes } from '@/data/pods'
import { getAmenitiesByIds } from '@/data/amenities'
import PodVisual from '@/components/common/PodVisual.vue'
import HubVisual from '@/components/common/HubVisual.vue'
import AmenityIcon from '@/components/common/AmenityIcon.vue'
import QRDisplay from '@/components/common/QRDisplay.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

// ---------------------------------------------------------------------------
// Concept 2: Small Compact Cards Connected by a Horizontal Line
// [Card 1] ──────── [Card 2] ──────── [Card 3] ──────── [Card 4] ──────── [Card 5]
// First card is bright, subsequent cards are dimmed, sliding into view with scroll
// ---------------------------------------------------------------------------

const scrollContainerRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0) // 0.0 to 1.0
const cardWidth = ref(360)
const gapWidth = ref(64)

function updateDimensions() {
  if (typeof window !== 'undefined') {
    cardWidth.value = window.innerWidth < 640 ? 300 : 360
    gapWidth.value = window.innerWidth < 640 ? 40 : 64
  }
}

// Distance between centers of adjacent cards
const stepDistance = computed(() => cardWidth.value + gapWidth.value)

// Active card index (0 to 4)
const activeStepIndex = computed(() => {
  return Math.min(4, Math.max(0, Math.round(scrollProgress.value * 4)))
})

// Translation for the horizontal track so active progress is dead center
const trackTranslateX = computed(() => {
  return -(scrollProgress.value * stepDistance.value * 4)
})

function handleScroll() {
  if (!scrollContainerRef.value) return
  const rect = scrollContainerRef.value.getBoundingClientRect()
  const totalScrollDistance = rect.height - window.innerHeight
  if (totalScrollDistance <= 0) return

  const currentScroll = -rect.top
  const progress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance))
  scrollProgress.value = progress
}

function selectStep(index: number) {
  if (!scrollContainerRef.value) return
  const rect = scrollContainerRef.value.getBoundingClientRect()
  const totalScrollDistance = rect.height - window.innerHeight
  const targetY = window.scrollY + rect.top + (index / 4) * totalScrollDistance
  window.scrollTo({ top: targetY, behavior: 'smooth' })
}

function nextStep() {
  if (activeStepIndex.value < 4) {
    selectStep(activeStepIndex.value + 1)
  }
}

function prevStep() {
  if (activeStepIndex.value > 0) {
    selectStep(activeStepIndex.value - 1)
  }
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', updateDimensions, { passive: true })
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
  window.removeEventListener('scroll', handleScroll)
})

// ---------------------------------------------------------------------------
// Step 1 Simulation State: Location & Pod
// ---------------------------------------------------------------------------
const simLocations = [
  { id: 'iit-delhi', name: 'IIT Delhi', hub: 'university' as const },
  { id: 'apollo-hospitals', name: 'Apollo Hospitals', hub: 'hospital' as const },
  { id: 'new-delhi-railway-station', name: 'New Delhi Railway Station', hub: 'railway' as const },
]
const selectedLocationIdx = ref(0)
const selectedPodIdx = ref(0)
const activeSimLocation = computed(() => simLocations[selectedLocationIdx.value])
const activeSimPod = computed(() => podTypes[selectedPodIdx.value] || podTypes[0])
const activePodAmenities = computed(() => getAmenitiesByIds(activeSimPod.value.amenityIds).slice(0, 3))

// ---------------------------------------------------------------------------
// Step 2 Simulation State: Schedule & Duration
// ---------------------------------------------------------------------------
const simDurationHours = ref(4)
const simCheckinTime = ref('14:00')
const simCheckinOptions = ['10:00', '14:00', '18:00', '22:00']

const simCheckoutTime = computed(() => {
  const [h, m] = simCheckinTime.value.split(':').map(Number)
  const endHour = (h + simDurationHours.value) % 24
  return `${String(endHour).padStart(2, '0')}:${String(m).padStart(2, '0')}`
})

const simSchedulePrice = computed(() => {
  return activeSimPod.value.pricePerHour * simDurationHours.value
})

// ---------------------------------------------------------------------------
// Step 3 Simulation State: Comfort Extras
// ---------------------------------------------------------------------------
interface ExtraItem {
  id: string
  name: string
  price: number
  selected: boolean
}

const simExtras = ref<ExtraItem[]>([
  { id: 'pillow', name: 'Pillow & Linen Pack', price: 149, selected: true },
  { id: 'shower', name: 'Hot Shower Pass', price: 249, selected: false },
  { id: 'mask', name: 'Silk Eye Mask', price: 99, selected: true },
  { id: 'coffee', name: 'Artisanal Coffee', price: 149, selected: false },
])

function toggleExtra(id: string) {
  const item = simExtras.value.find((i) => i.id === id)
  if (item) item.selected = !item.selected
}

const selectedExtrasTotal = computed(() => {
  return simExtras.value.filter((i) => i.selected).reduce((acc, curr) => acc + curr.price, 0)
})

const selectedExtrasCount = computed(() => {
  return simExtras.value.filter((i) => i.selected).length
})

// ---------------------------------------------------------------------------
// Step 4 Simulation State: Review & Payment
// ---------------------------------------------------------------------------
const simCouponApplied = ref(false)
const simPaymentMethod = ref<'card' | 'credits'>('card')
const simPaymentSuccess = ref(false)

function applyCoupon() {
  simCouponApplied.value = !simCouponApplied.value
}

const simSubtotal = computed(() => simSchedulePrice.value + selectedExtrasTotal.value)
const simDiscount = computed(() => (simCouponApplied.value ? Math.round(simSubtotal.value * 0.2) : 0))
const simFinalTotal = computed(() => Math.max(0, simSubtotal.value - simDiscount.value))

function simulatePayment() {
  simPaymentSuccess.value = true
  setTimeout(() => {
    simPaymentSuccess.value = false
  }, 3500)
}

// ---------------------------------------------------------------------------
// Step 5 Simulation State: Smart Keyless Check-in
// ---------------------------------------------------------------------------
const simPodUnlocked = ref(false)
const simScanInProgress = ref(false)

function simulateQRScan() {
  if (simScanInProgress.value) return
  simScanInProgress.value = true
  setTimeout(() => {
    simPodUnlocked.value = !simPodUnlocked.value
    simScanInProgress.value = false
  }, 900)
}
</script>

<template>
  <!-- Scroll-Driven Horizontal Track Section (450vh tall) -->
  <div ref="scrollContainerRef" class="relative h-[450vh] w-full bg-ink-950">
    <!-- Sticky Full-Screen Viewport -->
    <div class="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden">
      <!-- Top Title / Status header (No separate timeline bar!) -->
      <div class="z-40 border-b border-white/10 bg-ink-950/90 px-4 sm:px-8 py-4 backdrop-blur-xl">
        <div class="container-page flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="inline-flex h-2 w-2 animate-pulse rounded-full bg-brand-400" />
            <span class="text-xs font-bold uppercase tracking-wider text-brand-300">
              Step {{ activeStepIndex + 1 }} of 5 • Interactive Walkthrough
            </span>
          </div>
          <span class="text-xs text-ivory-100/50 hidden sm:inline">
            Scroll vertically to move along the horizontal timeline
          </span>
        </div>
      </div>

      <!-- ----------------------------------------------------------------- -->
      <!-- HORIZONTAL TIMELINE OF SMALL COMPACT CARDS CONNECTED BY LINES -->
      <!-- ----------------------------------------------------------------- -->
      <div class="flex-1 flex items-center overflow-hidden relative w-full">
        <!-- Horizontal Connecting Background Track Line behind cards (z-0 pointer-events-none) -->
        <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-white/15 -translate-y-1/2 z-0 pointer-events-none" />

        <!-- Gradually Filling Gold Connecting Line behind cards (z-0 pointer-events-none) -->
        <div
          class="absolute top-1/2 left-0 h-0.5 bg-brand-400 -translate-y-1/2 transition-all duration-300 ease-out z-0 pointer-events-none"
          :style="{ width: `${Math.min(100, scrollProgress * 100)}%` }"
        />

        <!-- Sliding Horizontal Track (MUST BE relative z-10 so cards sit IN FRONT of line) -->
        <div
          class="relative z-10 flex items-center transition-transform duration-500 ease-out"
          :style="{
            paddingLeft: `calc(50vw - ${cardWidth / 2}px)`,
            paddingRight: `calc(50vw - ${cardWidth / 2}px)`,
            gap: `${gapWidth}px`,
            transform: `translate3d(${trackTranslateX}px, 0, 0)`,
          }"
        >
          <!-- --------------------------------------------------------------- -->
          <!-- CARD 01: LOCATION (Choose Hub & Pod) -->
          <!-- --------------------------------------------------------------- -->
          <div
            @click="selectStep(0)"
            class="relative shrink-0 transition-all duration-700 ease-out cursor-pointer"
            :style="{ width: `${cardWidth}px` }"
            :class="
              activeStepIndex === 0
                ? 'opacity-100 scale-100 sm:scale-105 z-20'
                : 'opacity-35 hover:opacity-60 scale-90 z-10'
            "
          >
            <div
              class="card-surface relative z-20 overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-500"
              :class="
                activeStepIndex === 0
                  ? 'border-brand-400/70 bg-[#101422]'
                  : 'border-white/10 bg-[#0b0e17]'
              "
            >
              <!-- Node Badge & Title -->
              <div class="flex items-center justify-between">
                <span class="eyebrow text-xs">01 • LOCATION</span>
                <span class="h-2.5 w-2.5 rounded-full bg-brand-400" />
              </div>

              <h3 class="mt-2 text-xl font-extrabold text-ivory-50">
                Choose Hub & Pod
              </h3>
              <p class="mt-1 text-xs text-brand-300 font-medium">
                Tailored private sleep spaces across terminals.
              </p>

              <!-- Compact Interactive Demo -->
              <div class="mt-5 border-t border-white/10 pt-4 space-y-4 text-left">
                <!-- Location pills -->
                <div class="flex flex-wrap gap-1.5">
                  <button
                    v-for="(loc, lIdx) in simLocations"
                    :key="loc.id"
                    type="button"
                    @click.stop="selectedLocationIdx = lIdx"
                    class="rounded-full px-3 py-1 text-xs font-semibold transition-all"
                    :class="
                      selectedLocationIdx === lIdx
                        ? 'bg-brand-400 text-ink-950 font-bold shadow-soft'
                        : 'bg-white/5 text-ivory-100/70 hover:bg-white/10'
                    "
                  >
                    {{ loc.name }}
                  </button>
                </div>

                <!-- Mini Hub preview -->
                <div class="relative h-28 w-full overflow-hidden rounded-xl border border-white/10 bg-ink-950">
                  <HubVisual :id="activeSimLocation.id" :hub-type="activeSimLocation.hub" class="h-full w-full" />
                  <div class="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
                  <span class="absolute bottom-2 left-3 text-xs font-bold text-ivory-50">
                    {{ activeSimLocation.name }}
                  </span>
                </div>

                <!-- Pod selection buttons -->
                <div class="grid grid-cols-2 gap-1.5">
                  <button
                    v-for="(pod, pIdx) in podTypes"
                    :key="pod.id"
                    type="button"
                    @click.stop="selectedPodIdx = pIdx"
                    class="rounded-xl border p-2 text-left transition-all"
                    :class="
                      selectedPodIdx === pIdx
                        ? 'border-brand-400 bg-brand-500/15 text-ivory-50 ring-1 ring-brand-400/30'
                        : 'border-white/10 bg-white/5 text-ivory-100/70 hover:bg-white/10'
                    "
                  >
                    <div class="text-[11px] font-bold truncate">{{ pod.name }}</div>
                    <div class="text-xs font-semibold text-brand-300">₹{{ pod.pricePerHour }}/hr</div>
                  </button>
                </div>

                <!-- Active Pod Spec Box -->
                <div class="rounded-xl border border-white/10 bg-ink-950/80 p-2.5 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="h-9 w-12 shrink-0 overflow-hidden rounded border border-white/10">
                      <PodVisual :id="activeSimPod.image" class="h-full w-full" />
                    </div>
                    <div>
                      <div class="text-xs font-bold text-ivory-50 truncate max-w-[120px]">{{ activeSimPod.name }}</div>
                      <div class="text-[10px] text-ivory-100/60">{{ activeSimPod.occupancy }} Guest</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-1">
                    <span
                      v-for="a in activePodAmenities"
                      :key="a.id"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-ivory-100/70"
                      :title="a.label"
                    >
                      <AmenityIcon :icon="a.icon" size="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- --------------------------------------------------------------- -->
          <!-- CARD 02: DATE (Schedule & Duration) -->
          <!-- --------------------------------------------------------------- -->
          <div
            @click="selectStep(1)"
            class="relative shrink-0 transition-all duration-700 ease-out cursor-pointer"
            :style="{ width: `${cardWidth}px` }"
            :class="
              activeStepIndex === 1
                ? 'opacity-100 scale-100 sm:scale-105 z-20'
                : 'opacity-35 hover:opacity-60 scale-90 z-10'
            "
          >
            <div
              class="card-surface relative z-20 overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-500"
              :class="
                activeStepIndex === 1
                  ? 'border-brand-400/70 bg-[#101422]'
                  : 'border-white/10 bg-[#0b0e17]'
              "
            >
              <div class="flex items-center justify-between">
                <span class="eyebrow text-xs">02 • DATE & TIME</span>
                <span class="h-2.5 w-2.5 rounded-full bg-brand-400" />
              </div>

              <h3 class="mt-2 text-xl font-extrabold text-ivory-50">
                Schedule & Duration
              </h3>
              <p class="mt-1 text-xs text-brand-300 font-medium">
                Flexible hourly stays from 1 to 8 hours.
              </p>

              <!-- Compact Interactive Demo -->
              <div class="mt-5 border-t border-white/10 pt-4 space-y-4 text-left">
                <!-- Check-in slots -->
                <div>
                  <label class="block text-[11px] font-semibold uppercase tracking-wider text-ivory-100/60">
                    Check-in Slot (Today)
                  </label>
                  <div class="mt-2 grid grid-cols-4 gap-1.5">
                    <button
                      v-for="time in simCheckinOptions"
                      :key="time"
                      type="button"
                      @click.stop="simCheckinTime = time"
                      class="rounded-lg border py-2 text-center text-xs font-bold transition-all"
                      :class="
                        simCheckinTime === time
                          ? 'border-brand-400 bg-brand-400 text-ink-950 shadow-soft'
                          : 'border-white/10 bg-white/5 text-ivory-100/80 hover:bg-white/10'
                      "
                    >
                      {{ time }}
                    </button>
                  </div>
                </div>

                <!-- Duration Slider -->
                <div>
                  <div class="flex items-center justify-between text-xs font-semibold">
                    <span class="text-ivory-100/60">Duration</span>
                    <span class="rounded bg-brand-500/20 px-2 py-0.5 font-bold text-brand-300">
                      {{ simDurationHours }} Hours
                    </span>
                  </div>
                  <input
                    v-model.number="simDurationHours"
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    @click.stop
                    class="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-brand-400"
                  />
                  <div class="mt-1 flex justify-between text-[10px] text-ivory-100/50 font-mono">
                    <span>1h</span>
                    <span>2h</span>
                    <span>4h</span>
                    <span>6h</span>
                    <span>8h</span>
                  </div>
                </div>

                <!-- Mini Timeline Bar -->
                <div class="rounded-xl border border-white/10 bg-ink-950/80 p-3">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-ivory-100/70">24h Schedule Bar</span>
                    <span class="text-emerald-300 font-semibold">✓ Guaranteed</span>
                  </div>
                  <div class="mt-2 relative h-6 w-full overflow-hidden rounded bg-white/5">
                    <div
                      class="absolute top-0 bottom-0 rounded bg-brand-400 flex items-center justify-center text-[10px] font-bold text-ink-950 transition-all duration-300"
                      :style="{
                        left: `${(parseInt(simCheckinTime, 10) / 24) * 100}%`,
                        width: `${Math.min(100 - (parseInt(simCheckinTime, 10) / 24) * 100, (simDurationHours / 24) * 100)}%`,
                      }"
                    >
                      Reserved
                    </div>
                  </div>
                  <div class="mt-2 flex items-center justify-between text-xs">
                    <span><strong>{{ simCheckinTime }}</strong> to <strong>{{ simCheckoutTime }}</strong></span>
                    <span class="font-bold text-brand-300">₹{{ simSchedulePrice }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- --------------------------------------------------------------- -->
          <!-- CARD 03: EXTRAS (Comfort & Amenities) -->
          <!-- --------------------------------------------------------------- -->
          <div
            @click="selectStep(2)"
            class="relative shrink-0 transition-all duration-700 ease-out cursor-pointer"
            :style="{ width: `${cardWidth}px` }"
            :class="
              activeStepIndex === 2
                ? 'opacity-100 scale-100 sm:scale-105 z-20'
                : 'opacity-35 hover:opacity-60 scale-90 z-10'
            "
          >
            <div
              class="card-surface relative z-20 overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-500"
              :class="
                activeStepIndex === 2
                  ? 'border-brand-400/70 bg-[#101422]'
                  : 'border-white/10 bg-[#0b0e17]'
              "
            >
              <div class="flex items-center justify-between">
                <span class="eyebrow text-xs">03 • COMFORT EXTRAS</span>
                <span class="h-2.5 w-2.5 rounded-full bg-brand-400" />
              </div>

              <h3 class="mt-2 text-xl font-extrabold text-ivory-50">
                Comfort Extras
              </h3>
              <p class="mt-1 text-xs text-brand-300 font-medium">
                Customise your in-pod experience.
              </p>

              <!-- Compact Interactive Demo -->
              <div class="mt-5 border-t border-white/10 pt-4 space-y-4 text-left">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-semibold uppercase tracking-wider text-ivory-100/60">
                    Tap to Toggle Amenities
                  </span>
                  <span class="rounded bg-brand-500/20 px-2 py-0.5 text-xs font-bold text-brand-300">
                    {{ selectedExtrasCount }} Selected
                  </span>
                </div>

                <div class="grid grid-cols-1 gap-2">
                  <button
                    v-for="item in simExtras"
                    :key="item.id"
                    type="button"
                    @click.stop="toggleExtra(item.id)"
                    class="flex items-center justify-between rounded-xl border px-3 py-2 text-left transition-all"
                    :class="
                      item.selected
                        ? 'border-brand-400 bg-brand-500/15 text-ivory-50 ring-1 ring-brand-400/30'
                        : 'border-white/10 bg-white/5 text-ivory-100/70 hover:bg-white/10'
                    "
                  >
                    <div class="flex items-center gap-2">
                      <span
                        class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px]"
                        :class="
                          item.selected
                            ? 'border-brand-400 bg-brand-400 text-ink-950 font-bold'
                            : 'border-white/20 bg-white/5 text-transparent'
                        "
                      >
                        ✓
                      </span>
                      <span class="text-xs font-bold">{{ item.name }}</span>
                    </div>
                    <span class="text-xs font-semibold text-brand-300">+₹{{ item.price }}</span>
                  </button>
                </div>

                <!-- Live Extras Receipt Total -->
                <div class="rounded-xl border border-white/15 bg-ink-950/80 p-3 flex items-center justify-between text-xs">
                  <span class="text-ivory-100/70">Selected Add-ons Total</span>
                  <span class="font-bold text-brand-300">+₹{{ selectedExtrasTotal }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- --------------------------------------------------------------- -->
          <!-- CARD 04: PAYMENT (Review & Instant Pay) -->
          <!-- --------------------------------------------------------------- -->
          <div
            @click="selectStep(3)"
            class="relative shrink-0 transition-all duration-700 ease-out cursor-pointer"
            :style="{ width: `${cardWidth}px` }"
            :class="
              activeStepIndex === 3
                ? 'opacity-100 scale-100 sm:scale-105 z-20'
                : 'opacity-35 hover:opacity-60 scale-90 z-10'
            "
          >
            <div
              class="card-surface relative z-20 overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-500"
              :class="
                activeStepIndex === 3
                  ? 'border-brand-400/70 bg-[#101422]'
                  : 'border-white/10 bg-[#0b0e17]'
              "
            >
              <div class="flex items-center justify-between">
                <span class="eyebrow text-xs">04 • PAYMENT</span>
                <span class="h-2.5 w-2.5 rounded-full bg-brand-400" />
              </div>

              <h3 class="mt-2 text-xl font-extrabold text-ivory-50">
                Review & Payment
              </h3>
              <p class="mt-1 text-xs text-brand-300 font-medium">
                Transparent billing. Zero hidden fees.
              </p>

              <!-- Compact Interactive Demo -->
              <div class="mt-5 border-t border-white/10 pt-4 space-y-4 text-left">
                <!-- Promo button -->
                <button
                  type="button"
                  @click.stop="applyCoupon"
                  class="w-full rounded-xl border py-2 text-xs font-semibold transition-all"
                  :class="
                    simCouponApplied
                      ? 'border-emerald-400/60 bg-emerald-500/20 text-emerald-300'
                      : 'border-brand-400/50 bg-brand-500/10 text-brand-300 hover:bg-brand-500/20'
                  "
                >
                  {{ simCouponApplied ? '✓ SLEEPY20 Promo Applied (-20%)' : '+ Tap to Apply Coupon: SLEEPY20' }}
                </button>

                <!-- Compact Itemised Invoice -->
                <div class="rounded-xl border border-white/10 bg-ink-950/80 p-3.5 space-y-2 text-xs">
                  <div class="flex justify-between text-ivory-100/80">
                    <span>{{ activeSimPod.name }} ({{ simDurationHours }}h)</span>
                    <span class="font-semibold text-ivory-50">₹{{ simSchedulePrice }}</span>
                  </div>
                  <div class="flex justify-between text-ivory-100/80">
                    <span>Comfort Extras ({{ selectedExtrasCount }})</span>
                    <span class="font-semibold text-ivory-50">₹{{ selectedExtrasTotal }}</span>
                  </div>
                  <div v-if="simCouponApplied" class="flex justify-between text-emerald-300 font-medium">
                    <span>SLEEPY20 Discount</span>
                    <span>-₹{{ simDiscount }}</span>
                  </div>
                  <div class="border-t border-white/10 pt-2 flex justify-between font-bold text-sm text-ivory-50">
                    <span>Total Amount</span>
                    <span class="text-brand-300">₹{{ simFinalTotal }}</span>
                  </div>
                </div>

                <!-- Payment mode selector -->
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click.stop="simPaymentMethod = 'card'"
                    class="rounded-lg border py-2 text-xs font-bold transition-all"
                    :class="
                      simPaymentMethod === 'card'
                        ? 'border-brand-400 bg-brand-400 text-ink-950'
                        : 'border-white/10 bg-white/5 text-ivory-100/70 hover:bg-white/10'
                    "
                  >
                    Card / UPI
                  </button>
                  <button
                    type="button"
                    @click.stop="simPaymentMethod = 'credits'"
                    class="rounded-lg border py-2 text-xs font-bold transition-all"
                    :class="
                      simPaymentMethod === 'credits'
                        ? 'border-brand-400 bg-brand-400 text-ink-950'
                        : 'border-white/10 bg-white/5 text-ivory-100/70 hover:bg-white/10'
                    "
                  >
                    Sleepy1 Credits
                  </button>
                </div>

                <!-- CTA Button & success message -->
                <div>
                  <Transition name="fade">
                    <div
                      v-if="simPaymentSuccess"
                      class="mb-2 rounded-lg border border-emerald-400/50 bg-emerald-500/20 p-2 text-center text-xs font-bold text-emerald-300"
                    >
                      ✓ Payment Simulated Approved!
                    </div>
                  </Transition>
                  <button
                    type="button"
                    @click.stop="simulatePayment"
                    class="w-full rounded-xl bg-brand-400 py-3 text-xs sm:text-sm font-extrabold text-ink-950 shadow-premium transition-all hover:bg-brand-300"
                  >
                    Simulate Pay (₹{{ simFinalTotal }}) →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- --------------------------------------------------------------- -->
          <!-- CARD 05: CHECK-IN (Smart Keyless QR Access) -->
          <!-- --------------------------------------------------------------- -->
          <div
            @click="selectStep(4)"
            class="relative shrink-0 transition-all duration-700 ease-out cursor-pointer"
            :style="{ width: `${cardWidth}px` }"
            :class="
              activeStepIndex === 4
                ? 'opacity-100 scale-100 sm:scale-105 z-20'
                : 'opacity-35 hover:opacity-60 scale-90 z-10'
            "
          >
            <div
              class="card-surface relative z-20 overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-500"
              :class="
                activeStepIndex === 4
                  ? 'border-brand-400/70 bg-[#101422]'
                  : 'border-white/10 bg-[#0b0e17]'
              "
            >
              <div class="flex items-center justify-between">
                <span class="eyebrow text-xs">05 • CHECK-IN</span>
                <span class="h-2.5 w-2.5 rounded-full bg-brand-400" />
              </div>

              <h3 class="mt-2 text-xl font-extrabold text-ivory-50">
                Keyless Check-in
              </h3>
              <p class="mt-1 text-xs text-brand-300 font-medium">
                No front desk. Unlock pod in seconds.
              </p>

              <!-- Compact Interactive Demo -->
              <div class="mt-5 border-t border-white/10 pt-4 space-y-4 text-center">
                <p class="text-xs text-ivory-100/70">
                  Hold your dynamic booking QR code at the scanner to unlock door and activate lighting.
                </p>

                <!-- Compact QR access box -->
                <div class="mx-auto max-w-[220px] relative rounded-2xl border border-white/15 bg-ink-950 p-4 shadow-premium">
                  <!-- Laser scan bar -->
                  <div
                    v-if="simScanInProgress"
                    class="absolute left-0 right-0 h-0.5 bg-brand-400 animate-bounce z-20"
                    style="top: 50%"
                  />

                  <QRDisplay
                    value="https://sleepy1pods.com/checkin/SLP-9482-DEMO"
                    :size="120"
                    reference="SLP-9482"
                  />

                  <!-- Status banner -->
                  <div
                    class="mt-3 flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-[10px] font-bold transition-all"
                    :class="
                      simPodUnlocked
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                    "
                  >
                    <span
                      class="h-1.5 w-1.5 rounded-full"
                      :class="simPodUnlocked ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'"
                    />
                    {{ simPodUnlocked ? 'POD UNLOCKED • DOOR OPEN ✓' : 'POD LOCKED • READY TO SCAN' }}
                  </div>
                </div>

                <button
                  type="button"
                  @click.stop="simulateQRScan"
                  :disabled="simScanInProgress"
                  class="w-full rounded-xl py-3 text-xs sm:text-sm font-extrabold transition-all"
                  :class="
                    simPodUnlocked
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hover:bg-emerald-500/30'
                      : 'bg-brand-400 text-ink-950 hover:bg-brand-300 shadow-premium'
                  "
                >
                  {{
                    simScanInProgress
                      ? 'Scanning QR...'
                      : simPodUnlocked
                        ? '✓ Unlocked! Click to Re-lock'
                        : 'Simulate QR Scan →'
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ----------------------------------------------------------------- -->
      <!-- BOTTOM BAR: Prev / Next & Step Indicator -->
      <!-- ----------------------------------------------------------------- -->
      <div class="z-40 border-t border-white/10 bg-ink-950/80 px-4 sm:px-8 py-3 backdrop-blur-xl">
        <div class="container-page flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span
              v-for="(_, idx) in 5"
              :key="idx"
              @click="selectStep(idx)"
              class="h-2 rounded-full transition-all cursor-pointer"
              :class="activeStepIndex === idx ? 'w-6 bg-brand-400 shadow-soft' : 'w-2 bg-white/20 hover:bg-white/40'"
            />
          </div>
          <div class="flex items-center gap-2">
            <SecondaryButton
              size="sm"
              :disabled="activeStepIndex === 0"
              @click="prevStep"
            >
              ← Prev
            </SecondaryButton>
            <SecondaryButton
              size="sm"
              :disabled="activeStepIndex === 4"
              @click="nextStep"
            >
              Next →
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
