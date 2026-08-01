<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import FAQAccordion from '@/components/common/FAQAccordion.vue'
import AmenityIcon from '@/components/common/AmenityIcon.vue'
import DreamBackground from '@/components/atmosphere/DreamBackground.vue'

usePageMeta({
  title: 'Sleepy1 Credits Program — What Are Credits, How to Earn & How to Use',
  description:
    'Learn about Sleepy1 Credits: the universal currency for airport sleep. 1 Credit = ₹1. Never expires, zero transaction fees, instant keyless pod entry, and loyalty cashbacks.',
})

// ---------------------------------------------------------------------------
// Interactive Recharge Bonus Calculator
// ---------------------------------------------------------------------------
const rechargeTiers = [
  { amount: 1000, bonusPercent: 5, label: 'Frequent Flyer' },
  { amount: 2500, bonusPercent: 10, label: 'Transit Pro' },
  { amount: 5000, bonusPercent: 15, label: 'Sleepy1 Explorer' },
  { amount: 10000, bonusPercent: 20, label: 'Executive Suite' },
]

const selectedTierIdx = ref(1) // Default to ₹2,500
const selectedTier = computed(() => rechargeTiers[selectedTierIdx.value] || rechargeTiers[0])

const bonusCredits = computed(() => Math.round((selectedTier.value.amount * selectedTier.value.bonusPercent) / 100))
const totalCredits = computed(() => selectedTier.value.amount + bonusCredits.value)
const estimatedHours = computed(() => (totalCredits.value / 299).toFixed(1))

// ---------------------------------------------------------------------------
// FAQ Data for Credits
// ---------------------------------------------------------------------------
const creditsFaqs = [
  {
    id: 'exp',
    category: 'payments' as const,
    question: 'Do Sleepy1 Credits expire over time?',
    answer:
      'No, never! Your Sleepy1 Credits balance stays securely in your digital wallet indefinitely. You can recharge today and use them months or years later on your next airport transit.',
  },
  {
    id: 'split',
    category: 'payments' as const,
    question: 'Can I combine Credits with UPI or Credit Card during checkout?',
    answer:
      'Yes! If your current Credit balance covers part of your booking amount, our system will automatically apply your usable Credits first and let you pay the remaining balance using UPI, Credit Card, or Net Banking.',
  },
  {
    id: 'gift',
    category: 'payments' as const,
    question: 'Can I gift or transfer my Credits to friends or family?',
    answer:
      'Yes! You can use our dedicated Gift Credits feature to send digital sleep vouchers and instant credit balances to anyone via email or SMS.',
  },
  {
    id: 'fees',
    category: 'payments' as const,
    question: 'Are there any transaction or processing charges when buying Credits?',
    answer:
      'Zero processing fees. 100% of the money you deposit goes directly into your usable balance, and bonus credits are added automatically.',
  },
  {
    id: 'speed',
    category: 'payments' as const,
    question: 'How fast are referral and membership cashback Credits credited?',
    answer:
      'Instantly! As soon as a referred friend checks out or your membership booking completes, your reward credits are credited to your wallet in real time.',
  },
]
</script>

<template>
  <div class="bg-ink-950 text-ivory-50 selection:bg-brand-400 selection:text-ink-950">
    
    <!-- ================================================================= -->
    <!-- HERO SECTION -->
    <!-- ================================================================= -->
    <section class="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div class="absolute inset-0 z-0">
        <DreamBackground tone="depth" density="medium" />
      </div>
      <div class="container-page relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-brand-300 shadow-[0_0_20px_rgba(246,201,139,0.25)] mb-6">
            <span class="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
            <span>Universal Airport Sleep Currency</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-ivory-50 tracking-tight leading-[1.1]">
            Sleepy1 Credits
          </h1>
          <p class="mt-6 text-lg sm:text-xl text-ivory-100/75 leading-relaxed max-w-2xl mx-auto">
            The universal currency for effortless airport rest. 
            <strong class="text-brand-300">1 Credit = ₹1 INR.</strong> 
            Never expires, zero transaction fees, and 3-second keyless pod entry.
          </p>

          <!-- Quick Actions & Stats Pill -->
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton as="RouterLink" to="/wallet" size="lg">
              Buy / Recharge Credits →
            </PrimaryButton>
            <SecondaryButton as="RouterLink" to="/gift-credits" size="lg">
              Gift to a Friend
            </SecondaryButton>
          </div>

          <!-- Quick Highlight Badges -->
          <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-8 border-t border-white/10">
            <div class="text-center">
              <div class="text-xl sm:text-2xl font-black text-brand-300">1 : 1</div>
              <div class="text-xs text-ivory-100/60 font-medium">Rupee Equivalent</div>
            </div>
            <div class="text-center">
              <div class="text-xl sm:text-2xl font-black text-brand-300">0%</div>
              <div class="text-xs text-ivory-100/60 font-medium">Transaction Fees</div>
            </div>
            <div class="text-center">
              <div class="text-xl sm:text-2xl font-black text-brand-300">Never</div>
              <div class="text-xs text-ivory-100/60 font-medium">Expires</div>
            </div>
            <div class="text-center">
              <div class="text-xl sm:text-2xl font-black text-brand-300">3s</div>
              <div class="text-xs text-ivory-100/60 font-medium">Instant Checkout</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECTION 1: WHAT ARE SLEEPY1 CREDITS? -->
    <!-- ================================================================= -->
    <section id="what-are-credits" class="section-pad bg-ink-900/50">
      <div class="container-page">
        <SectionHeading
          eyebrow="What Are Credits"
          title="Designed for effortless airport transit"
          description="Standard payment gateways require OTPs, bank redirects, and international card fees. Sleepy1 Credits give you instant, hassle-free airport rest."
          align="center"
          class="mx-auto"
        />

        <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Card 1 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900/90 p-8 shadow-premium relative overflow-hidden group hover:border-brand-400/50 transition-all">
            <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-400/10 blur-2xl group-hover:bg-brand-400/20 transition-all" />
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-400/30 bg-brand-500/10 text-brand-300">
              <AmenityIcon icon="charging" size="h-7 w-7" />
            </div>
            <h3 class="mt-6 text-2xl font-extrabold text-ivory-50">1 : 1 Rupee Value</h3>
            <p class="mt-3 text-sm leading-relaxed text-ivory-100/75">
              No confusing points formulas, conversion loss, or hidden markups. <strong class="text-ivory-50">1 Credit is always exactly ₹1 INR</strong> of usable sleep pod balance.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900/90 p-8 shadow-premium relative overflow-hidden group hover:border-indigo-400/50 transition-all">
            <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all" />
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
              <AmenityIcon icon="lock" size="h-7 w-7" />
            </div>
            <h3 class="mt-6 text-2xl font-extrabold text-ivory-50">Never Expire</h3>
            <p class="mt-3 text-sm leading-relaxed text-ivory-100/75">
              Whether you fly weekly or once a year, your Credits stay safe in your digital wallet indefinitely until you are ready to book your next pod stay.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900/90 p-8 shadow-premium relative overflow-hidden group hover:border-emerald-400/50 transition-all">
            <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
              <AmenityIcon icon="wifi" size="h-7 w-7" />
            </div>
            <h3 class="mt-6 text-2xl font-extrabold text-ivory-50">3-Second Keyless Entry</h3>
            <p class="mt-3 text-sm leading-relaxed text-ivory-100/75">
              Skip payment gateway SMS delays at 3 AM. Book with 1-click using your wallet balance and receive your encrypted QR access code instantly.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECTION 2: HOW TO EARN CREDITS? -->
    <!-- ================================================================= -->
    <section id="how-to-earn" class="section-pad">
      <div class="container-page">
        <SectionHeading
          eyebrow="How To Earn"
          title="Four ways to earn & collect Credits"
          description="You don't just buy Credits—you can earn free bonus Credits automatically through loyalty, referrals, and flight assurance."
          align="center"
          class="mx-auto"
        />

        <div class="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Earning Method 1 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900 p-7 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-1.5 rounded-full bg-brand-400/20 border border-brand-400/40 px-3 py-1 text-xs font-black text-brand-300">
                +₹100 Free
              </div>
              <h3 class="mt-5 text-xl font-black text-ivory-50">Welcome Verification</h3>
              <p class="mt-2 text-sm text-ivory-100/70 leading-relaxed">
                Create your account and verify your email address to receive an instant ₹100 welcome Credit in your wallet.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-brand-300">
              → Automatically Added on Signup
            </div>
          </div>

          <!-- Earning Method 2 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900 p-7 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-1.5 rounded-full bg-indigo-400/20 border border-indigo-400/40 px-3 py-1 text-xs font-black text-indigo-300">
                +₹150 Per Friend
              </div>
              <h3 class="mt-5 text-xl font-black text-ivory-50">Refer & Earn</h3>
              <p class="mt-2 text-sm text-ivory-100/70 leading-relaxed">
                Invite friends with your unique code. They get ₹150 off their first stay, and you earn 150 Credits when they check out.
              </p>
            </div>
            <RouterLink to="/refer" class="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-indigo-300 hover:underline">
              → Invite Friends Now
            </RouterLink>
          </div>

          <!-- Earning Method 3 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900 p-7 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 px-3 py-1 text-xs font-black text-emerald-300">
                Up to 15% Cashback
              </div>
              <h3 class="mt-5 text-xl font-black text-ivory-50">Membership Cashback</h3>
              <p class="mt-2 text-sm text-ivory-100/70 leading-relaxed">
                Join Sleepy1 Membership and receive up to 15% instant Credit cashback deposited to your wallet after every pod booking.
              </p>
            </div>
            <RouterLink to="/membership" class="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-emerald-300 hover:underline">
              → View Membership Plans
            </RouterLink>
          </div>

          <!-- Earning Method 4 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900 p-7 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-1.5 rounded-full bg-purple-400/20 border border-purple-400/40 px-3 py-1 text-xs font-black text-purple-300">
                +₹200 Protection
              </div>
              <h3 class="mt-5 text-xl font-black text-ivory-50">Flight Delay Assurance</h3>
              <p class="mt-2 text-sm text-ivory-100/70 leading-relaxed">
                Connect your flight PNR. If your connected airline flight is delayed by over 45 minutes, earn 200 emergency sleep Credits.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-purple-300">
              → Automated Airport Alert
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECTION 3: HOW TO USE CREDITS? -->
    <!-- ================================================================= -->
    <section id="how-to-use" class="section-pad bg-ink-900/40">
      <div class="container-page">
        <SectionHeading
          eyebrow="How To Use"
          title="Three simple steps to book with Credits"
          description="No codes to copy or vouchers to redeem. Your wallet balance is automatically integrated into the booking flow."
          align="center"
          class="mx-auto"
        />

        <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <!-- Step 1 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900/90 p-8 relative">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 border border-brand-400/40 text-brand-300 font-extrabold text-lg">
              01
            </div>
            <h3 class="mt-6 text-xl font-extrabold text-ivory-50">Select Your Pod & Hours</h3>
            <p class="mt-3 text-sm text-ivory-100/75 leading-relaxed">
              Choose your airport terminal, pod type, and sleep duration on our booking page or interactive map.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900/90 p-8 relative">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-extrabold text-lg">
              02
            </div>
            <h3 class="mt-6 text-xl font-extrabold text-ivory-50">Toggle "Use Wallet Balance"</h3>
            <p class="mt-3 text-sm text-ivory-100/75 leading-relaxed">
              At checkout, turn on "Use Wallet Balance". Your Credits are instantly deducted at a strict 1:1 INR rate.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="rounded-3xl border border-white/15 bg-ink-900/90 p-8 relative">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-lg">
              03
            </div>
            <h3 class="mt-6 text-xl font-extrabold text-ivory-50">Instant Pod Unlock QR</h3>
            <p class="mt-3 text-sm text-ivory-100/75 leading-relaxed">
              Your booking completes instantly. Walk up to your sleep pod and scan your dynamic QR code to unlock your door.
            </p>
          </div>

        </div>

        <!-- CTA -->
        <div class="mt-14 text-center">
          <PrimaryButton as="RouterLink" to="/book" size="lg">
            Try Booking a Pod Now →
          </PrimaryButton>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECTION 4: INTERACTIVE RECHARGE BONUS CALCULATOR -->
    <!-- ================================================================= -->
    <section id="calculator" class="section-pad">
      <div class="container-page max-w-4xl mx-auto">
        <div class="rounded-3xl border border-white/15 bg-gradient-to-br from-[#121626] to-[#0c0f1a] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-400/10 blur-3xl pointer-events-none" />

          <div class="text-center max-w-xl mx-auto">
            <span class="text-xs font-black uppercase tracking-widest text-brand-300">
              Interactive Value Calculator
            </span>
            <h2 class="mt-2 text-3xl sm:text-4xl font-black text-ivory-50">
              Calculate your recharge bonus
            </h2>
            <p class="mt-2 text-sm sm:text-base text-ivory-100/70">
              Larger wallet recharges earn automated bonus Credits instantly upon deposit.
            </p>
          </div>

          <!-- Recharge Amount Selector Buttons -->
          <div class="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              v-for="(tier, idx) in rechargeTiers"
              :key="tier.amount"
              type="button"
              @click="selectedTierIdx = idx"
              class="rounded-2xl border p-4 text-center transition-all"
              :class="
                selectedTierIdx === idx
                  ? 'border-brand-400 bg-brand-500/20 text-ivory-50 shadow-[0_0_20px_rgba(246,201,139,0.3)] scale-105'
                  : 'border-white/15 bg-white/5 text-ivory-100/70 hover:bg-white/10'
              "
            >
              <div class="text-xs font-extrabold uppercase text-brand-300">{{ tier.label }}</div>
              <div class="mt-1 text-xl sm:text-2xl font-black">₹{{ tier.amount.toLocaleString() }}</div>
              <div class="mt-1 text-xs font-semibold text-emerald-400">+{{ tier.bonusPercent }}% Bonus</div>
            </button>
          </div>

          <!-- Live Result Breakdown Pill -->
          <div class="mt-10 rounded-2xl border border-white/10 bg-ink-950/80 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left items-center">
            <div>
              <div class="text-xs text-ivory-100/60 font-semibold uppercase">Free Bonus Earned</div>
              <div class="mt-1 text-2xl sm:text-3xl font-black text-brand-300">
                +₹{{ bonusCredits.toLocaleString() }}
              </div>
              <div class="text-xs text-emerald-400 font-bold mt-0.5">({{ selectedTier.bonusPercent }}% Free Value)</div>
            </div>

            <div>
              <div class="text-xs text-ivory-100/60 font-semibold uppercase">Total Usable Credits</div>
              <div class="mt-1 text-2xl sm:text-3xl font-black text-ivory-50">
                ₹{{ totalCredits.toLocaleString() }}
              </div>
              <div class="text-xs text-ivory-100/60 mt-0.5">Never Expires</div>
            </div>

            <div class="sm:text-right">
              <div class="text-xs text-ivory-100/60 font-semibold uppercase">Estimated Airport Rest</div>
              <div class="mt-1 text-2xl sm:text-3xl font-black text-indigo-300">
                ~{{ estimatedHours }} hrs
              </div>
              <div class="text-xs text-ivory-100/60 mt-0.5">Solo Pod • ₹299/hr</div>
            </div>
          </div>

          <!-- Recharge Button CTA -->
          <div class="mt-8 text-center">
            <PrimaryButton as="RouterLink" to="/wallet" size="lg" class="w-full sm:w-auto min-w-[240px]">
              Recharge ₹{{ selectedTier.amount.toLocaleString() }} & Get ₹{{ totalCredits.toLocaleString() }} →
            </PrimaryButton>
          </div>

        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECTION 5: FREQUENTLY ASKED QUESTIONS -->
    <!-- ================================================================= -->
    <section id="faq" class="section-pad bg-ink-900/50">
      <div class="container-page max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="Credits FAQs"
          title="Common questions about Sleepy1 Credits"
          align="center"
          class="mx-auto"
        />
        <div class="mt-12">
          <FAQAccordion :items="creditsFaqs" />
        </div>
      </div>
    </section>

  </div>
</template>
