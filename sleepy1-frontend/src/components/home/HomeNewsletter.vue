<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'

const ui = useUiStore()

const email = ref('')
const isSubscribed = ref(false)
const isLoading = ref(false)
const copied = ref(false)
const selectedFrequency = ref<'weekly' | 'major'>('weekly')

const topics = ref([
  { id: 'transit', label: '✈️ Airport & Transit Layover Hacks', selected: true },
  { id: 'promos', label: '🎁 100 Free Credits & Promo Drops', selected: true },
  { id: 'locations', label: '📍 New Hubli & Dharwad Pod Hubs', selected: false },
  { id: 'science', label: '🛌 Sleep & Circadian Recovery', selected: false },
])

function toggleTopic(id: string) {
  const topic = topics.value.find((t) => t.id === id)
  if (topic) {
    topic.selected = !topic.selected
  }
}

function handleSubscribe() {
  if (!email.value.trim() || !email.value.includes('@')) {
    ui.pushToast({
      type: 'error',
      title: 'Valid Email Required',
      description: 'Please enter a valid email address to join the Sleepy1 Insider Club.',
    })
    return
  }

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isSubscribed.value = true
    ui.pushToast({
      type: 'success',
      title: 'Welcome to the Insider Club!',
      description: 'Your 100 bonus credits welcome code is ready below.',
    })
  }, 600)
}

function copyPromoCode() {
  navigator.clipboard.writeText('WELCOME-REST100')
  copied.value = true
  ui.pushToast({
    type: 'success',
    title: 'Promo Code Copied!',
    description: 'Use WELCOME-REST100 at checkout for 100 free sleep credits.',
  })
  setTimeout(() => {
    copied.value = false
  }, 3000)
}

function resetForm() {
  email.value = ''
  isSubscribed.value = false
}
</script>

<template>
  <section id="newsletter" class="section-pad relative overflow-hidden">
    <!-- Atmospheric background glow -->
    <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[120px]" />
      <div class="absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-[140px]" />
    </div>

    <div class="container-page relative z-10">
      <div class="card-surface relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-ink-900/95 via-ink-950/98 to-ink-900/95 p-8 shadow-2xl sm:p-12 lg:p-16">
        <!-- Accent light bar -->
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-75" />

        <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <!-- Left Column: Value Prop & Interactive Topic Selection -->
          <div class="lg:col-span-7">
            <div class="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              Sleepy1 Insider Club
            </div>

            <h2 class="mt-5 text-3xl font-semibold leading-tight text-ivory-50 sm:text-4xl">
              Rest Smarter, Wait Less.<br />
              <span class="bg-gradient-to-r from-brand-300 via-ivory-50 to-brand-400 bg-clip-text text-transparent">
                Join 15,000+ Travellers.
              </span>
            </h2>

            <p class="mt-4 max-w-xl text-base leading-relaxed text-ivory-100/70">
              Get weekly curated airport &amp; campus layover hacks, sleep &amp; circadian recovery science, plus secret member-only promo codes delivered directly to your inbox.
            </p>

            <!-- Interactive Interest Chips -->
            <div class="mt-7">
              <p class="text-xs font-semibold uppercase tracking-wider text-ivory-100/50">
                Select topics you care about:
              </p>
              <div class="mt-3 flex flex-wrap gap-2.5">
                <button
                  v-for="topic in topics"
                  :key="topic.id"
                  type="button"
                  class="group flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 active:scale-95"
                  :class="[
                    topic.selected
                      ? 'border-brand-400 bg-brand-400/20 text-ivory-50 shadow-[0_0_15px_rgba(168,139,253,0.22)]'
                      : 'border-white/10 bg-white/5 text-ivory-100/60 hover:border-white/25 hover:text-ivory-50',
                  ]"
                  @click="toggleTopic(topic.id)"
                >
                  <span>{{ topic.label }}</span>
                  <span
                    class="flex h-4 w-4 items-center justify-center rounded-full text-[10px] transition-colors"
                    :class="topic.selected ? 'bg-brand-400 text-ink-950 font-bold' : 'bg-white/10 text-ivory-100/40'"
                  >
                    {{ topic.selected ? '✓' : '+' }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Stats strip -->
            <div class="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-left">
              <div>
                <p class="text-xl font-bold text-ivory-50">15,400+</p>
                <p class="text-xs text-ivory-100/50">Active Subscribers</p>
              </div>
              <div>
                <p class="text-xl font-bold text-ivory-50">100 Credits</p>
                <p class="text-xs text-ivory-100/50">Welcome Bonus</p>
              </div>
              <div>
                <p class="text-xl font-bold text-ivory-50">0 Spam</p>
                <p class="text-xs text-ivory-100/50">1-Click Unsubscribe</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Form or Celebration Card -->
          <div class="lg:col-span-5">
            <!-- Subscription Form State -->
            <div
              v-if="!isSubscribed"
              class="rounded-2xl border border-white/10 bg-ink-950/70 p-6 shadow-premium backdrop-blur-md sm:p-8"
            >
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-ivory-50">Claim Your Welcome Gift</h3>
                <span class="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                  FREE 100 CREDITS
                </span>
              </div>
              <p class="mt-1 text-xs text-ivory-100/55">
                Join our newsletter today and receive an instant promo code for ₹100 worth of sleep credits.
              </p>

              <form class="mt-6 space-y-4" @submit.prevent="handleSubscribe">
                <div>
                  <label for="newsletter-email-input" class="mb-1.5 block text-xs font-medium text-ivory-100/70">
                    Email address
                  </label>
                  <div class="relative">
                    <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ivory-100/40">
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          stroke="currentColor"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      id="newsletter-email-input"
                      v-model="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      class="min-h-[48px] w-full rounded-xl border border-white/12 bg-ink-900/80 pl-11 pr-4 py-3 text-sm text-ivory-50 placeholder:text-ivory-100/30 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                    />
                  </div>
                </div>

                <!-- Frequency selector -->
                <div>
                  <label class="mb-1.5 block text-xs font-medium text-ivory-100/70">
                    Delivery frequency
                  </label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      class="rounded-lg border px-3 py-2 text-xs font-medium transition-all"
                      :class="[
                        selectedFrequency === 'weekly'
                          ? 'border-brand-400/60 bg-brand-400/15 text-ivory-50'
                          : 'border-white/10 bg-white/5 text-ivory-100/50 hover:text-ivory-100',
                      ]"
                      @click="selectedFrequency = 'weekly'"
                    >
                      Weekly Digest
                    </button>
                    <button
                      type="button"
                      class="rounded-lg border px-3 py-2 text-xs font-medium transition-all"
                      :class="[
                        selectedFrequency === 'major'
                          ? 'border-brand-400/60 bg-brand-400/15 text-ivory-50'
                          : 'border-white/10 bg-white/5 text-ivory-100/50 hover:text-ivory-100',
                      ]"
                      @click="selectedFrequency = 'major'"
                    >
                      Major Drops Only
                    </button>
                  </div>
                </div>

                <PrimaryButton type="submit" size="lg" full-width :loading="isLoading">
                  Subscribe &amp; Get 100 Credits →
                </PrimaryButton>
              </form>

              <div class="mt-4 flex items-center justify-center gap-2 text-[11px] text-ivory-100/45">
                <svg class="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>We respect your privacy. No spam ever.</span>
              </div>
            </div>

            <!-- Celebration Reward Card State -->
            <div
              v-else
              class="rounded-2xl border border-brand-400/30 bg-gradient-to-b from-ink-950/90 to-ink-900/90 p-6 text-center shadow-premium backdrop-blur-md sm:p-8"
            >
              <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brand-400/30 bg-brand-400/20 text-brand-300">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <h3 class="mt-4 text-xl font-semibold text-ivory-50">Welcome to the Club!</h3>
              <p class="mt-2 text-xs leading-relaxed text-ivory-100/65">
                We've sent a welcome email to <span class="font-medium text-ivory-50">{{ email }}</span>. Here is your instant welcome gift promo code:
              </p>

              <!-- Promo Coupon Box -->
              <div class="mt-5 rounded-xl border border-dashed border-brand-400/40 bg-brand-400/10 p-4">
                <p class="text-[11px] uppercase tracking-wider text-brand-300/80">Your Welcome Code</p>
                <div class="mt-1 flex items-center justify-center gap-3">
                  <span class="font-mono text-xl font-bold tracking-wider text-ivory-50">WELCOME-REST100</span>
                </div>
                <button
                  type="button"
                  class="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ivory-50 px-4 py-1.5 text-xs font-semibold text-ink-950 transition-colors hover:bg-ivory-100"
                  @click="copyPromoCode"
                >
                  <svg v-if="!copied" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.24a2 2 0 00-.6-1.43L16.6 3.6A2 2 0 0015.17 3H10a2 2 0 00-2 2z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span>{{ copied ? 'Copied! ✓' : 'Copy Promo Code' }}</span>
                </button>
              </div>

              <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <PrimaryButton as="RouterLink" to="/book" size="sm">
                  Book a Pod Now →
                </PrimaryButton>
                <button
                  type="button"
                  class="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-ivory-100/60 hover:border-white/20 hover:text-ivory-50"
                  @click="resetForm"
                >
                  Subscribe another email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
