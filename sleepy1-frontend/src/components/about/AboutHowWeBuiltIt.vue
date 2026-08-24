<script setup lang="ts">
import { ref } from 'vue'

interface BuildStage {
  id: string
  step: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  icon: string
  badge: string
}

const buildStages: BuildStage[] = [
  {
    id: 'cad-ergonomics',
    step: '01',
    title: 'Architectural Blueprint & Ergonomics',
    subtitle: 'From Napkin Sketches to 3D CAD',
    description: 'We started by defining a zero-compromise spatial layout that provides complete ergonomic freedom inside a compact 2.2m × 1.4m modular footprint. We engineered custom contour angles to support natural zero-gravity spinal decompression.',
    highlights: [
      'Zero-gravity memory foam contour mattress',
      'Compact modular exterior suitable for indoor corridors',
      'Warm indirect ambient lighting to reduce cortisol levels',
      'Integrated luggage and laptop secure resting compartment'
    ],
    icon: '📐',
    badge: 'Spatial CAD'
  },
  {
    id: 'acoustic-isolation',
    step: '02',
    title: 'Acoustic Shell & Thermal Isolation',
    subtitle: 'Creating Complete Silence in Chaos',
    description: 'Public stations and campus hallways regularly exceed 75–85 decibels. We tested dozens of composite insulation materials and developed a dual-layer decoupled acoustic shell with triple-laminated acoustic glass to drop sound to a tranquil 35–40dB.',
    highlights: [
      '40dB certified sound reduction acoustic barrier',
      'Dual-glazed sound-deadening entrance door',
      'Vibration-dampened structural subframe',
      'Laminar baffled intake vents preventing exterior noise leakage'
    ],
    icon: '🔇',
    badge: '40dB Shell'
  },
  {
    id: 'iot-embedded',
    step: '03',
    title: 'Custom IoT & Keyless Smart Hardware',
    subtitle: 'Microcontroller & Access Firmware',
    description: 'We engineered our own custom embedded IoT hardware gateway using low-latency microcontrollers. Door locks operate via dynamic cryptographic QR tokens and NFC, opening in under 1.2 seconds without relying on buggy keys or physical cards.',
    highlights: [
      'Instant QR & NFC keyless door unlock (<2s)',
      'In-cabin touch panel with climate & dimming controls',
      'Real-time ultrasonic occupancy & motion sensors',
      'Hardware watchdog & battery-backed safety fail-safes'
    ],
    icon: '⚡',
    badge: 'Embedded IoT'
  },
  {
    id: 'cloud-hygiene',
    step: '04',
    title: 'Cloud Orchestration & Automated Hygiene',
    subtitle: 'Hospitality Precision at Scale',
    description: 'To guarantee pristine cleanliness, we built automated sanitation workflows into our cloud booking engine. After every session, high-intensity UV-C disinfection cycles activate, and our maintenance team receives automated linen refresh alerts.',
    highlights: [
      'Automated UV-C sanitization cycle between guest stays',
      'Real-time cloud slot scheduling with sub-second sync',
      'Continuous HEPA-13 fresh airflow (90-second air refresh)',
      'Instant digital billing with Sleepy1 rest credits'
    ],
    icon: '✨',
    badge: 'Clean Air & UV'
  }
]

const activeStage = ref(0)
</script>

<template>
  <div class="mt-8">
    <div class="mx-auto max-w-3xl text-center">
      <div class="inline-flex items-center gap-2 rounded-full border border-theme bg-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Engineering & Craftsmanship
      </div>
      <h2 class="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        How we built it: From first prototype to production pod
      </h2>
      <p class="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
        We didn't just assemble off-the-shelf parts — we engineered the physical cabin structure, acoustic isolation barriers, custom IoT controller boards, and cloud booking engine from scratch.
      </p>
    </div>

    <!-- Stage Navigation Tabs -->
    <div class="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <button
        v-for="(stage, idx) in buildStages"
        :key="stage.id"
        type="button"
        @click="activeStage = idx"
        class="card-surface group relative p-4 text-left transition-all duration-300 sm:p-5"
        :class="[
          activeStage === idx
            ? 'border-primary/50 shadow-md scale-[1.02]'
            : 'hover:border-primary/20'
        ]"
      >
        <div class="flex items-center justify-between">
          <span class="text-xl sm:text-2xl">{{ stage.icon }}</span>
          <span
            class="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            :class="[
              activeStage === idx
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-theme bg-surface text-muted'
            ]"
          >
            Step {{ stage.step }}
          </span>
        </div>
        <p
          class="mt-3 font-display text-sm font-bold transition-colors line-clamp-1"
          :class="activeStage === idx ? 'text-primary' : 'text-secondary group-hover:text-primary'"
        >
          {{ stage.badge }}
        </p>
      </button>
    </div>

    <!-- Active Stage Detailed Card -->
    <div class="card-surface mt-6 overflow-hidden p-6 shadow-soft sm:p-8 lg:p-10">
      <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
        <!-- Left: Narrative & Highlights (7 cols) -->
        <div class="lg:col-span-7">
          <div class="flex items-center gap-3">
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface border border-theme font-mono text-sm font-bold text-primary">
              {{ buildStages[activeStage].step }}
            </span>
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-secondary">
                {{ buildStages[activeStage].subtitle }}
              </span>
              <h3 class="font-display text-2xl font-bold text-primary sm:text-3xl">
                {{ buildStages[activeStage].title }}
              </h3>
            </div>
          </div>

          <p class="mt-5 text-sm leading-relaxed text-secondary sm:text-base">
            {{ buildStages[activeStage].description }}
          </p>

          <!-- Highlights List -->
          <div class="mt-6 space-y-2.5">
            <p class="text-xs font-bold uppercase tracking-wider text-muted">Key Engineering Feats</p>
            <div class="grid gap-2.5 sm:grid-cols-2">
              <div
                v-for="(hl, i) in buildStages[activeStage].highlights"
                :key="i"
                class="flex items-start gap-2.5 rounded-xl border border-theme bg-surface p-3 text-xs leading-relaxed text-secondary"
              >
                <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] text-emerald-500 font-bold">✓</span>
                <span>{{ hl }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Technical Specification Visual Block (5 cols) -->
        <div class="lg:col-span-5">
          <div class="rounded-2xl border border-theme bg-surface p-5 shadow-inner">
            <div class="mb-4 flex items-center justify-between border-b border-theme pb-3 text-xs">
              <span class="font-mono text-primary font-semibold">SYSTEM SPEC // PHASE-{{ buildStages[activeStage].step }}</span>
              <span class="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">DEPLOYED & VALIDATED</span>
            </div>

            <!-- Technical Spec Details -->
            <div class="space-y-3 font-mono text-xs">
              <div class="flex items-center justify-between rounded-lg border border-theme bg-page p-2.5">
                <span class="text-muted">Acoustic Rating</span>
                <span class="font-bold text-primary">40 dB Decoupled</span>
              </div>
              <div class="flex items-center justify-between rounded-lg border border-theme bg-page p-2.5">
                <span class="text-muted">Airflow Circulation</span>
                <span class="font-bold text-primary">Laminar HEPA-13 (90s)</span>
              </div>
              <div class="flex items-center justify-between rounded-lg border border-theme bg-page p-2.5">
                <span class="text-muted">Keyless Access Latency</span>
                <span class="font-bold text-primary">&lt; 1.2 seconds</span>
              </div>
              <div class="flex items-center justify-between rounded-lg border border-theme bg-page p-2.5">
                <span class="text-muted">Sanitization Protocol</span>
                <span class="font-bold text-primary">UV-C Light + Fresh Linen</span>
              </div>
              <div class="flex items-center justify-between rounded-lg border border-theme bg-page p-2.5">
                <span class="text-muted">Cabin Dimensions</span>
                <span class="font-bold text-primary">2.2m (L) × 1.4m (W) × 1.5m (H)</span>
              </div>
            </div>

            <div class="mt-4 rounded-xl border border-theme bg-page p-3 text-center text-xs text-secondary font-medium">
              ⚡ 100% In-house design & hardware-software integration
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
