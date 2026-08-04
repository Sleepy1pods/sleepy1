<script setup lang="ts">
import { ref } from 'vue'

interface EngineeringSpec {
  id: string
  step: string
  title: string
  subtitle: string
  description: string
  badge: string
}

const specs: EngineeringSpec[] = [
  {
    id: 'acoustic',
    step: '01',
    title: 'Acoustic Shielding',
    subtitle: '40dB Isolation Shell',
    description: 'Triple-layered acoustic glass and silent door seals eliminate station and campus noise.',
    badge: '40dB RATED',
  },
  {
    id: 'climate',
    step: '02',
    title: 'Climate & Airflow',
    subtitle: 'Laminar HEPA Filtration',
    description: 'Continuous fresh air exchange with personalized thermostat control from 18°C to 24°C.',
    badge: 'HEPA-13 AIR',
  },
  {
    id: 'comfort',
    step: '03',
    title: 'Ergonomic Memory Bed',
    subtitle: 'Zero-Gravity Contour',
    description: 'Hotel-grade memory foam mattress with organic cotton linens sanitized after every stay.',
    badge: 'FIVE-STAR REST',
  },
  {
    id: 'control',
    step: '04',
    title: 'Smart Control Panel',
    subtitle: 'Circadian LED & Power',
    description: 'Contactless QR entry, circadian dimmable mood lighting, and high-speed USB-C/AC charging.',
    badge: 'SMART CABIN',
  },
]

const activeIndex = ref(0)
</script>

<template>
  <div class="mt-8">
    <!-- Header Paragraph Description -->
    <div class="mx-auto max-w-3xl text-center">
      <span class="eyebrow">Design Philosophy</span>
      <h2 class="mt-3 font-display text-3xl font-bold tracking-tight text-ivory-50 sm:text-4xl">
        Where hospitality meets engineering
      </h2>
      <p class="mt-4 text-base leading-relaxed text-ivory-100/70 sm:text-lg">
        Every pod blends hotel-grade materials with the technology of a smart hotel room — QR access, climate
        control, and an in-pod entertainment panel. As we expand into stations, malls, and campuses, this standard
        travels with us.
      </p>
    </div>

    <!-- Interactive Architectural CAD Blueprint -->
    <div class="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
      <!-- Left Column: 4 Selectable Engineering Specs (5 cols) -->
      <div class="space-y-3.5 lg:col-span-5">
        <button
          v-for="(spec, index) in specs"
          :key="spec.id"
          type="button"
          @click="activeIndex = index"
          @mouseenter="activeIndex = index"
          class="group relative flex w-full items-start rounded-2xl border p-5 text-left transition-all duration-300"
          :class="[
            index === activeIndex
              ? 'border-brand-300/40 bg-white/[0.05] shadow-[0_0_25px_rgba(139,155,251,0.12)]'
              : 'border-white/10 bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.03]',
          ]"
        >
          <!-- Step Indicator -->
          <div
            class="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300"
            :class="[
              index === activeIndex
                ? 'border-brand-300 bg-brand-400/20 text-brand-300'
                : 'border-white/10 bg-white/5 text-ivory-100/50 group-hover:border-white/20',
            ]"
          >
            {{ spec.step }}
          </div>

          <!-- Spec Content -->
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3
                class="font-display text-base font-bold transition-colors"
                :class="index === activeIndex ? 'text-ivory-50' : 'text-ivory-100/80 group-hover:text-ivory-50'"
              >
                {{ spec.title }}
              </h3>
              <span
                class="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider transition-colors"
                :class="[
                  index === activeIndex
                    ? 'border-brand-300/40 bg-brand-400/15 text-brand-300'
                    : 'border-white/10 bg-white/5 text-ivory-100/40',
                ]"
              >
                {{ spec.badge }}
              </span>
            </div>
            <p class="mt-1 text-xs font-medium text-ivory-100/50">
              {{ spec.subtitle }}
            </p>
            <p
              v-if="index === activeIndex"
              class="mt-2 text-xs leading-relaxed text-ivory-100/75 transition-all duration-300"
            >
              {{ spec.description }}
            </p>
          </div>
        </button>
      </div>

      <!-- Right Column: CAD Blueprint Diagram Monitor (7 cols) -->
      <div class="lg:col-span-7">
        <div
          class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-4 shadow-soft transition-all duration-300 hover:border-white/20 sm:p-6"
        >
          <!-- CAD Monitor Header Bar -->
          <div class="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <div class="flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span class="font-mono text-ivory-100/70">GEN-1 CABIN CAD · CROSS SECTION</span>
            </div>
            <div class="flex items-center gap-3 font-mono text-[11px] text-ivory-100/40">
              <span>SCALE 1:20</span>
              <span class="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-brand-300">
                ZONE: {{ specs[activeIndex].step }}
              </span>
            </div>
          </div>

          <!-- SVG Architectural Cabin Blueprint -->
          <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-950 p-4 sm:p-6">
            <!-- Background CAD Grid -->
            <div
              class="pointer-events-none absolute inset-0 opacity-[0.07]"
              style="background-image: radial-gradient(circle, #faf6ef 1px, transparent 1px); background-size: 20px 20px;"
              aria-hidden="true"
            />

            <!-- Blueprint Diagram SVG -->
            <svg viewBox="0 0 500 320" class="h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Outer Acoustic Capsule Shell (Tab 0 highlight) -->
              <g
                class="transition-all duration-500"
                :class="activeIndex === 0 ? 'opacity-100' : 'opacity-40'"
              >
                <!-- Double Acoustic Shell Wall -->
                <rect
                  x="40"
                  y="30"
                  width="420"
                  height="260"
                  rx="40"
                  stroke="currentColor"
                  :class="activeIndex === 0 ? 'text-brand-300' : 'text-white'"
                  stroke-width="2.5"
                />
                <rect
                  x="52"
                  y="42"
                  width="396"
                  height="236"
                  rx="30"
                  stroke="currentColor"
                  :class="activeIndex === 0 ? 'text-brand-300/60' : 'text-white/30'"
                  stroke-width="1.5"
                  stroke-dasharray="6 4"
                />
                <!-- Acoustic Isolation Arc Wavelets -->
                <path
                  v-if="activeIndex === 0"
                  d="M18 90 C 10 130, 10 190, 18 230 M482 90 C 490 130, 490 190, 482 230"
                  stroke="#8B9BFB"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </g>

              <!-- Top Laminar Airflow Vents (Tab 1 highlight) -->
              <g
                class="transition-all duration-500"
                :class="activeIndex === 1 ? 'opacity-100' : 'opacity-40'"
              >
                <rect
                  x="180"
                  y="46"
                  width="140"
                  height="16"
                  rx="6"
                  stroke="currentColor"
                  :class="activeIndex === 1 ? 'text-brand-300' : 'text-white'"
                  stroke-width="2"
                />
                <!-- Flowing Air Arrows -->
                <g v-if="activeIndex === 1" stroke="#8B9BFB" stroke-width="1.5" stroke-linecap="round">
                  <path d="M205 75 L205 95 M200 90 L205 95 L210 90" />
                  <path d="M250 75 L250 95 M245 90 L250 95 L255 90" />
                  <path d="M295 75 L295 95 M290 90 L295 95 L300 90" />
                </g>
              </g>

              <!-- Ergonomic Zero-G Mattress Bed (Tab 2 highlight) -->
              <g
                class="transition-all duration-500"
                :class="activeIndex === 2 ? 'opacity-100' : 'opacity-40'"
              >
                <!-- Bed Contour Profile -->
                <path
                  d="M70 230 C 130 230, 150 205, 230 205 C 330 205, 370 220, 430 220 L 430 250 L 70 250 Z"
                  :fill="activeIndex === 2 ? 'rgba(139, 155, 251, 0.18)' : 'rgba(255, 255, 255, 0.05)'"
                  stroke="currentColor"
                  :class="activeIndex === 2 ? 'text-brand-300' : 'text-white'"
                  stroke-width="2.5"
                />
                <!-- Pillow / Headrest -->
                <path
                  d="M80 230 C 95 210, 125 210, 140 230 Z"
                  stroke="currentColor"
                  :class="activeIndex === 2 ? 'text-brand-300' : 'text-white'"
                  stroke-width="1.5"
                  fill="none"
                />
              </g>

              <!-- Smart Control Panel & Lighting Aura (Tab 3 highlight) -->
              <g
                class="transition-all duration-500"
                :class="activeIndex === 3 ? 'opacity-100' : 'opacity-40'"
              >
                <!-- Side Control Console Box -->
                <rect
                  x="330"
                  y="120"
                  width="70"
                  height="44"
                  rx="8"
                  stroke="currentColor"
                  :class="activeIndex === 3 ? 'text-brand-300' : 'text-white'"
                  stroke-width="2"
                  :fill="activeIndex === 3 ? 'rgba(139, 155, 251, 0.2)' : 'none'"
                />
                <!-- Control Screen Indicators -->
                <circle cx="350" cy="142" r="6" :fill="activeIndex === 3 ? '#8B9BFB' : '#666'" />
                <rect x="365" y="137" width="22" height="4" rx="2" :fill="activeIndex === 3 ? '#8B9BFB' : '#666'" />
                <rect x="365" y="146" width="14" height="4" rx="2" :fill="activeIndex === 3 ? '#8B9BFB' : '#666'" />

                <!-- Circadian Ceiling LED Ambient Halo -->
                <path
                  v-if="activeIndex === 3"
                  d="M120 48 Q 250 85 380 48"
                  stroke="#8B9BFB"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </g>

              <!-- Active Blueprint Tag Label -->
              <g class="transition-opacity duration-300">
                <rect
                  x="145"
                  y="130"
                  width="210"
                  height="36"
                  rx="18"
                  fill="#0B0D12"
                  stroke="#8B9BFB"
                  stroke-width="1.5"
                  opacity="0.9"
                />
                <text
                  x="250"
                  y="153"
                  text-anchor="middle"
                  fill="#8B9BFB"
                  font-family="monospace"
                  font-size="12"
                  font-weight="bold"
                  letter-spacing="1.5"
                >
                  {{ specs[activeIndex].badge }} · ACTIVE
                </text>
              </g>
            </svg>
          </div>

          <!-- CAD Monitor Footer Bar -->
          <div class="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs text-ivory-100/50">
            <span>SPEC: {{ specs[activeIndex].title }}</span>
            <span>2.2m × 1.4m × 1.5m</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
