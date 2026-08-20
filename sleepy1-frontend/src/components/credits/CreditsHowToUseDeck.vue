<script setup lang="ts">
import { ref } from 'vue'

interface CheckoutStep {
  step: string
  title: string
  description: string
  tag: string
  spec: string
  terminalType: 'booking' | 'wallet' | 'qr'
}

const steps: CheckoutStep[] = [
  {
    step: '01',
    title: 'Select your pod & hours',
    description: 'Choose location, cabin type, and rest duration.',
    tag: 'Location Select',
    spec: '24/7 Autonomous Hubs',
    terminalType: 'booking',
  },
  {
    step: '02',
    title: 'Use your balance',
    description: 'Toggle "Use Wallet Balance" at checkout.',
    tag: '1:1 Rupee Value',
    spec: 'Zero Checkout Fees',
    terminalType: 'wallet',
  },
  {
    step: '03',
    title: 'Instant unlock QR',
    description: 'Scan your dynamic QR code to unlock the cabin.',
    tag: 'Keyless Access',
    spec: 'Dynamic Access Key',
    terminalType: 'qr',
  },
]

const activeIndex = ref<number | null>(null)
</script>

<template>
  <div class="mt-14">
    <!-- 3-Card Architectural Process Deck -->
    <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3" @mouseleave="activeIndex = null">
      <div
        v-for="(item, index) in steps"
        :key="item.step"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = null"
        class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-all duration-300 sm:p-8"
        :class="[
          index === activeIndex
            ? '-translate-y-1 border-brand-300/40 bg-white/[0.045] shadow-[0_0_30px_rgba(139,155,251,0.12)]'
            : 'border-white/10 bg-white/[0.02] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.03]',
        ]"
      >
        <!-- Editorial Watermark Step Number -->
        <span
          class="pointer-events-none absolute -top-1 right-6 select-none font-display text-7xl font-black tracking-tighter transition-all duration-500"
          :class="index === activeIndex ? 'scale-105 text-brand-300/15' : 'text-white/[0.03]'"
          aria-hidden="true"
        >
          {{ item.step }}
        </span>

        <div>
          <!-- Step Header Bar -->
          <div class="relative z-10 flex items-center justify-between">
            <span
              class="rounded-full border px-3 py-1 text-xs font-bold tracking-wider transition-colors"
              :class="[
                index === activeIndex
                  ? 'border-brand-300/40 bg-brand-400/20 text-brand-300'
                  : 'border-white/10 bg-white/5 text-ivory-100/60',
              ]"
            >
              Step {{ item.step }}
            </span>
            <span
              class="font-mono text-[11px] uppercase tracking-widest transition-colors"
              :class="index === activeIndex ? 'text-brand-300' : 'text-ivory-100/40'"
            >
              {{ item.tag }}
            </span>
          </div>

          <!-- Step Title & Description -->
          <div class="relative z-10 mt-6">
            <h3
              class="font-display text-xl font-bold transition-colors"
              :class="index === activeIndex ? 'text-ivory-50' : 'text-ivory-50/90'"
            >
              {{ item.title }}
            </h3>
            <p
              class="mt-2.5 text-sm leading-relaxed transition-colors"
              :class="index === activeIndex ? 'text-ivory-100/80' : 'text-ivory-100/60'"
            >
              {{ item.description }}
            </p>
          </div>

          <!-- Interactive Terminal Visual Snippet -->
          <div
            class="relative z-10 mt-7 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/85 p-4 font-mono text-xs transition-colors group-hover:border-white/20"
          >
            <!-- Terminal Header -->
            <div class="mb-3 flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-ivory-100/40">
              <div class="flex items-center gap-1.5">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span>TERMINAL · {{ item.terminalType.toUpperCase() }}</span>
              </div>
              <span>SECURE</span>
            </div>

            <!-- Terminal Type 1: Booking Hub Preview -->
            <div v-if="item.terminalType === 'booking'" class="space-y-1.5 text-[11px] text-ivory-100/75">
              <div class="flex justify-between">
                <span class="text-ivory-100/40">HUB</span>
                <span class="text-ivory-50 font-semibold">CAMPUS HUB A</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ivory-100/40">POD</span>
                <span class="text-brand-300">SOLO ACOUSTIC</span>
              </div>
              <div class="flex justify-between border-t border-white/10 pt-1.5">
                <span class="text-ivory-100/40">DURATION</span>
                <span class="text-ivory-50 font-semibold">2.0 HOURS</span>
              </div>
            </div>

            <!-- Terminal Type 2: Wallet 1:1 Checkout Preview -->
            <div v-else-if="item.terminalType === 'wallet'" class="space-y-2 text-[11px]">
              <div class="flex items-center justify-between rounded-lg border border-brand-300/30 bg-brand-400/10 px-2.5 py-1.5">
                <span class="text-brand-300 font-semibold">USE WALLET (1:1)</span>
                <span class="text-brand-300 font-bold">-₹400</span>
              </div>
              <div class="flex justify-between border-t border-white/10 pt-1.5 text-ivory-100/75">
                <span class="text-ivory-100/40">DUE TODAY</span>
                <span class="font-bold text-emerald-400">₹0.00</span>
              </div>
            </div>

            <!-- Terminal Type 3: Dynamic QR Access Preview -->
            <div v-else class="flex items-center justify-between text-[11px] text-ivory-100/75">
              <div>
                <p class="text-ivory-50 font-semibold">KEY #SP1-8409</p>
                <p class="mt-0.5 text-[10px] text-brand-300">BLUETOOTH + DYNAMIC QR</p>
              </div>
              <!-- Mini Stylized Key/QR Matrix Icon -->
              <div class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                <div class="grid grid-cols-2 gap-1 p-1">
                  <div class="h-2 w-2 rounded-sm bg-brand-300" />
                  <div class="h-2 w-2 rounded-sm bg-white/60" />
                  <div class="h-2 w-2 rounded-sm bg-white/60" />
                  <div class="h-2 w-2 rounded-sm bg-brand-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Footer Spec Line -->
        <div class="relative z-10 mt-7 border-t border-white/10 pt-3.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-mono text-ivory-100/40">{{ item.spec }}</span>
            <span class="flex items-center gap-1.5 font-medium text-brand-300">
              <span>Ready</span>
              <span class="h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
