<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import FAQAccordion from '@/components/common/FAQAccordion.vue'
import AmenityIcon from '@/components/common/AmenityIcon.vue'
import DreamCard from '@/components/common/DreamCard.vue'
import CreditsHowToUseDeck from '@/components/credits/CreditsHowToUseDeck.vue'

usePageMeta({
  title: 'Credits Program — What Are Credits, How to Earn & How to Use',
  description:
    'Learn about Sleepy1 Credits: the universal currency for pod sleep. 1 Credit = ₹1. Never expires, zero transaction fees, instant keyless pod entry, and loyalty cashbacks.',
})

const rechargeTiers = [
  { amount: 1000, bonusPercent: 5, label: 'Regular Rester' },
  { amount: 2500, bonusPercent: 10, label: 'Transit Pro' },
  { amount: 5000, bonusPercent: 15, label: 'Sleepy1 Explorer' },
  { amount: 10000, bonusPercent: 20, label: 'Executive Suite' },
]

const selectedTierIdx = ref(1)
const selectedTier = computed(() => rechargeTiers[selectedTierIdx.value] || rechargeTiers[0])

const bonusCredits = computed(() => Math.round((selectedTier.value.amount * selectedTier.value.bonusPercent) / 100))
const totalCredits = computed(() => selectedTier.value.amount + bonusCredits.value)
const estimatedHours = computed(() => 'Unlimited')

const creditsFaqs = [
  {
    id: 'exp',
    category: 'payments' as const,
    question: 'Do Sleepy1 Credits expire over time?',
    answer:
      'No, never. Your Credits balance stays in your wallet indefinitely — recharge today and use it months or years later.',
  },
  {
    id: 'split',
    category: 'payments' as const,
    question: 'Can I combine Credits with UPI or Credit Card during checkout?',
    answer:
      'Yes. If your balance covers part of your booking, it applies automatically and you pay the remainder by UPI, card, or net banking.',
  },
  {
    id: 'gift',
    category: 'payments' as const,
    question: 'Can I gift or transfer my Credits to friends or family?',
    answer: 'Yes — use Gift Credits to send digital sleep vouchers to anyone via email or SMS.',
  },
  {
    id: 'fees',
    category: 'payments' as const,
    question: 'Are there any transaction or processing charges when buying Credits?',
    answer: 'Zero processing fees. Every rupee you deposit goes directly into your usable balance.',
  },
  {
    id: 'speed',
    category: 'payments' as const,
    question: 'How fast are referral and membership cashback Credits credited?',
    answer: 'Instantly — as soon as a referral or membership booking completes.',
  },
]
</script>

<template>
  <div>
    <section class="py-20 sm:py-28 lg:py-32">
      <div class="container-page">
        <div class="mx-auto max-w-3xl text-center">
          <p class="eyebrow">Universal Sleep Currency</p>
          <h1 class="mt-6 font-display text-4xl font-medium text-ivory-50 sm:text-5xl">Sleepy1 Credits</h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory-100/70">
            One currency for effortless rest. <strong class="text-ivory-50">1 Credit = ₹1.</strong>
            Never expires, zero fees, instant keyless entry.
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton as="RouterLink" to="/wallet" size="lg">Buy or recharge credits</PrimaryButton>
            <SecondaryButton as="RouterLink" to="/gift-credits" size="lg">Gift to a friend</SecondaryButton>
          </div>

          <div class="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            <div class="text-center">
              <div class="font-display text-2xl font-medium text-ivory-50">1 : 1</div>
              <div class="mt-1 text-xs text-ivory-100/50">Rupee equivalent</div>
            </div>
            <div class="text-center">
              <div class="font-display text-2xl font-medium text-ivory-50">0%</div>
              <div class="mt-1 text-xs text-ivory-100/50">Transaction fees</div>
            </div>
            <div class="text-center">
              <div class="font-display text-2xl font-medium text-ivory-50">Never</div>
              <div class="mt-1 text-xs text-ivory-100/50">Expires</div>
            </div>
            <div class="text-center">
              <div class="font-display text-2xl font-medium text-ivory-50">3s</div>
              <div class="mt-1 text-xs text-ivory-100/50">Instant checkout</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="what-are-credits" class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading
          eyebrow="What Are Credits"
          title="Designed for effortless transit"
          description="No OTPs, bank redirects, or card fees at 3 a.m. — just an instant, hassle-free balance."
          align="center"
          class="mx-auto"
        />

        <div class="mt-14 grid gap-5 md:grid-cols-3">
          <DreamCard :glow="false" class="p-8">
            <AmenityIcon icon="charging" size="h-6 w-6" class="text-brand-300" />
            <h3 class="mt-5 text-lg font-semibold text-ivory-50">1:1 rupee value</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">
              No points formulas or hidden markups — 1 Credit is always exactly ₹1 of usable balance.
            </p>
          </DreamCard>
          <DreamCard :glow="false" class="p-8">
            <AmenityIcon icon="lock" size="h-6 w-6" class="text-brand-300" />
            <h3 class="mt-5 text-lg font-semibold text-ivory-50">Never expires</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">
              Rest weekly or once a year — your balance stays put until you're ready to book.
            </p>
          </DreamCard>
          <DreamCard :glow="false" class="p-8">
            <AmenityIcon icon="wifi" size="h-6 w-6" class="text-brand-300" />
            <h3 class="mt-5 text-lg font-semibold text-ivory-50">3-second entry</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">
              Book with one tap using your balance and get your QR access code instantly.
            </p>
          </DreamCard>
        </div>
      </div>
    </section>

    <section id="how-to-earn" class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading
          eyebrow="How To Earn"
          title="Four ways to earn Credits"
          description="Beyond buying credits, earn free bonus balance through loyalty, referrals, and plan-change assurance."
          align="center"
          class="mx-auto"
        />

        <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DreamCard :glow="false" class="flex flex-col justify-between p-7">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">+₹100 free</p>
              <h3 class="mt-4 text-lg font-semibold text-ivory-50">Welcome verification</h3>
              <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">Verify your email to receive an instant ₹100 welcome credit.</p>
            </div>
            <p class="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-ivory-100/45">Added automatically on signup</p>
          </DreamCard>
          <DreamCard :glow="false" class="flex flex-col justify-between p-7">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">+₹150 per friend</p>
              <h3 class="mt-4 text-lg font-semibold text-ivory-50">Refer and earn</h3>
              <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">They get ₹150 off their first stay; you earn 150 credits when they check out.</p>
            </div>
            <RouterLink to="/refer" class="link-underline mt-6 border-t border-white/10 pt-4 text-xs font-medium text-ivory-100/70 hover:text-ivory-50">Invite friends →</RouterLink>
          </DreamCard>
          <DreamCard :glow="false" class="flex flex-col justify-between p-7">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">Up to 15% cashback</p>
              <h3 class="mt-4 text-lg font-semibold text-ivory-50">Membership cashback</h3>
              <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">Members receive instant credit cashback after every booking.</p>
            </div>
            <RouterLink to="/membership" class="link-underline mt-6 border-t border-white/10 pt-4 text-xs font-medium text-ivory-100/70 hover:text-ivory-50">View membership →</RouterLink>
          </DreamCard>
          <DreamCard :glow="false" class="flex flex-col justify-between p-7">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">+₹200 protection</p>
              <h3 class="mt-4 text-lg font-semibold text-ivory-50">Plan-change assurance</h3>
              <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">Connect your booking reference — a delay or reschedule over 45 minutes earns 200 emergency credits.</p>
            </div>
            <p class="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-ivory-100/45">Automated delay alert</p>
          </DreamCard>
        </div>
      </div>
    </section>

    <section id="how-to-use" class="section-pad border-t border-white/8">
      <div class="container-page">
        <SectionHeading
          eyebrow="How To Use"
          title="Three steps to book with Credits"
          description="No codes to copy — your balance is built into checkout."
          align="center"
          class="mx-auto"
        />

        <CreditsHowToUseDeck />

        <div class="mt-14 flex justify-center">
          <PrimaryButton as="RouterLink" to="/book" size="lg">Try booking a pod</PrimaryButton>
        </div>
      </div>
    </section>

    <section id="calculator" class="section-pad border-t border-white/8">
      <div class="container-page mx-auto max-w-4xl">
        <div class="rounded-3xl border border-white/10 bg-ink-900/60 p-8 sm:p-12">
          <div class="mx-auto max-w-xl text-center">
            <p class="eyebrow">Recharge Calculator</p>
            <h2 class="mt-4 font-display text-3xl font-medium text-ivory-50 sm:text-4xl">Calculate your bonus</h2>
            <p class="mt-2 text-sm text-ivory-100/65 sm:text-base">Larger recharges earn automatic bonus credits.</p>
          </div>

          <div class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button
              v-for="(tier, idx) in rechargeTiers"
              :key="tier.amount"
              type="button"
              class="rounded-2xl border p-4 text-center transition-colors"
              :class="selectedTierIdx === idx ? 'border-brand-400 bg-brand-400/10 text-ivory-50' : 'border-white/10 text-ivory-100/65 hover:border-white/25'"
              @click="selectedTierIdx = idx"
            >
              <div class="text-xs font-semibold uppercase text-brand-300">{{ tier.label }}</div>
              <div class="mt-1 font-display text-xl font-medium sm:text-2xl">₹{{ tier.amount.toLocaleString() }}</div>
              <div class="mt-1 text-xs font-medium text-ivory-100/50">+{{ tier.bonusPercent }}% bonus</div>
            </button>
          </div>

          <div class="mt-10 grid grid-cols-1 items-center gap-6 rounded-2xl border border-white/10 p-6 text-center sm:grid-cols-3 sm:p-8 sm:text-left">
            <div>
              <div class="text-xs font-semibold uppercase text-ivory-100/50">Bonus earned</div>
              <div class="mt-1 font-display text-2xl font-medium text-ivory-50 sm:text-3xl">+₹{{ bonusCredits.toLocaleString() }}</div>
            </div>
            <div>
              <div class="text-xs font-semibold uppercase text-ivory-100/50">Total credits</div>
              <div class="mt-1 font-display text-2xl font-medium text-ivory-50 sm:text-3xl">₹{{ totalCredits.toLocaleString() }}</div>
            </div>
            <div class="sm:text-right">
              <div class="text-xs font-semibold uppercase text-ivory-100/50">Estimated rest</div>
              <div class="mt-1 font-display text-2xl font-medium text-ivory-50 sm:text-3xl">~{{ estimatedHours }} hrs</div>
            </div>
          </div>

          <div class="mt-8 text-center">
            <PrimaryButton as="RouterLink" to="/wallet" size="lg" class="w-full sm:w-auto">
              Recharge ₹{{ selectedTier.amount.toLocaleString() }}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="section-pad border-t border-white/8">
      <div class="container-page mx-auto max-w-3xl">
        <SectionHeading eyebrow="Credits FAQs" title="Common questions" align="center" class="mx-auto" />
        <div class="mt-12">
          <FAQAccordion :items="creditsFaqs" />
        </div>
      </div>
    </section>
  </div>
</template>
