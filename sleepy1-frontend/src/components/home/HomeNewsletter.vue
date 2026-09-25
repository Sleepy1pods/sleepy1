<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const ui = useUiStore()

const email = ref('')
const isSubscribed = ref(false)
const isLoading = ref(false)
const copied = ref(false)

const topics = ref([
  { id: 'transit', label: 'Rest tips for busy days', selected: true },
  { id: 'promos', label: 'Free credits & promo drops', selected: true },
  { id: 'locations', label: 'New pod hubs near you', selected: false },
  { id: 'science', label: 'Sleep & circadian recovery', selected: false },
])

function toggleTopic(id: string) {
  const topic = topics.value.find((t) => t.id === id)
  if (topic) topic.selected = !topic.selected
}

function handleSubscribe() {
  if (!email.value.trim() || !email.value.includes('@')) {
    ui.pushToast({
      type: 'error',
      title: 'Valid email required',
      description: 'Please enter a valid email address.',
    })
    return
  }

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isSubscribed.value = true
    ui.pushToast({
      type: 'success',
      title: 'Welcome to the Insider Club',
      description: 'Your welcome credit code is ready below.',
    })
  }, 600)
}

function copyPromoCode() {
  navigator.clipboard.writeText('WELCOME-REST100')
  copied.value = true
  ui.pushToast({
    type: 'success',
    title: 'Promo code copied',
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
  <section id="newsletter" class="section-pad border-t border-white/8">
    <div class="container-page">
      <div class="rounded-3xl border border-white/10 bg-ink-900/60 p-8 sm:p-12 lg:p-16">
        <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div class="lg:col-span-7">
            <p class="eyebrow">Sleepy1 Insider Club</p>

            <h2 class="mt-5 font-display text-3xl font-medium leading-tight text-ivory-50 sm:text-4xl">
              Rest smarter, wait less.
            </h2>

            <p class="mt-4 max-w-xl text-base leading-relaxed text-ivory-100/65">
              Rest tips, sleep science, and member-only promo codes — occasionally, not spam.
            </p>

            <div class="mt-7">
              <p class="text-xs font-semibold uppercase tracking-wider text-ivory-100/45">Topics you care about</p>
              <div class="mt-3 flex flex-wrap gap-2.5">
                <button
                  v-for="topic in topics"
                  :key="topic.id"
                  type="button"
                  class="rounded-full border px-4 py-2 text-xs font-medium transition-colors"
                  :class="topic.selected ? 'border-brand-400/60 bg-brand-400/10 text-ivory-50' : 'border-white/10 bg-white/5 text-ivory-100/55 hover:border-white/25 hover:text-ivory-50'"
                  @click="toggleTopic(topic.id)"
                >
                  {{ topic.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div v-if="!isSubscribed" class="rounded-2xl border border-white/10 bg-ink-950/60 p-6 sm:p-8">
              <h3 class="text-lg font-semibold text-ivory-50">Claim your welcome gift</h3>
              <p class="mt-1 text-xs text-ivory-100/55">Subscribe and receive a code for ₹100 of sleep credits.</p>

              <form class="mt-6 space-y-4" @submit.prevent="handleSubscribe">
                <div>
                  <label for="newsletter-email-input" class="mb-1.5 block text-xs font-medium text-ivory-100/70">Email address</label>
                  <input
                    id="newsletter-email-input"
                    v-model="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    class="min-h-[48px] w-full rounded-xl border border-white/12 bg-ink-900/80 px-4 py-3 text-sm text-ivory-50 placeholder:text-ivory-100/30 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                  />
                </div>

                <PrimaryButton type="submit" size="lg" full-width :loading="isLoading">Subscribe & get 100 credits</PrimaryButton>
              </form>

              <p class="mt-4 text-center text-[11px] text-ivory-100/45">We respect your privacy. No spam, ever.</p>
            </div>

            <div v-else class="rounded-2xl border border-brand-400/30 bg-ink-950/60 p-6 text-center sm:p-8">
              <h3 class="text-xl font-semibold text-ivory-50">Welcome to the club</h3>
              <p class="mt-2 text-xs leading-relaxed text-ivory-100/65">
                We've sent an email to <span class="font-medium text-ivory-50">{{ email }}</span>. Here's your welcome code:
              </p>

              <div class="mt-5 rounded-xl border border-dashed border-brand-400/40 bg-brand-400/10 p-4">
                <p class="text-[11px] uppercase tracking-wider text-brand-300/80">Your welcome code</p>
                <p class="mt-1 font-mono text-xl font-semibold tracking-wider text-ivory-50">WELCOME-REST100</p>
                <button
                  type="button"
                  class="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ivory-50 px-4 py-1.5 text-xs font-semibold text-ink-950 transition-colors hover:bg-ivory-100"
                  @click="copyPromoCode"
                >
                  {{ copied ? 'Copied' : 'Copy promo code' }}
                </button>
              </div>

              <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <PrimaryButton as="RouterLink" to="/book" size="sm">Book a pod now</PrimaryButton>
                <button type="button" class="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-ivory-100/60 hover:border-white/20 hover:text-ivory-50" @click="resetForm">
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
