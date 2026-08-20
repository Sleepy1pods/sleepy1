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
          <p class="eyebrow">Coming Soon</p>
          <h1 class="mt-6 font-display text-4xl font-medium text-ivory-50 sm:text-5xl">Sleepy1 Credits</h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory-100/70">
            One currency for effortless rest. Never expires, zero fees, instant keyless entry.
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton as="RouterLink" to="/wallet" size="lg">Buy or recharge credits</PrimaryButton>
            <SecondaryButton as="RouterLink" to="/gift-credits" size="lg">Gift to a friend</SecondaryButton>
          </div>


        </div>
      </div>
    </section>

    <section id="what-are-credits" class="section-pad border-t border-gray-600/50">
      <div class="container-page">
        <SectionHeading
          eyebrow="What Are Credits"
          title="Designed for effortless transit"
          description="No OTPs, bank redirects, or card fees at 3 a.m. — just an instant, hassle-free balance."
          align="center"
          class="mx-auto"
        />

        <div class="mt-14 mx-auto max-w-2xl text-center">
          <p class="text-lg leading-relaxed text-ivory-100/80">
            Sleepy1 Credits are the universal currency designed for your effortless pod stays. Use them to book pods seamlessly without banking redirects. Enjoy instant checkouts, exclusive bonuses, and ultimate flexibility.
          </p>
        </div>
      </div>
    </section>

    <section id="how-to-earn" class="section-pad border-t border-gray-600/50">
      <div class="container-page">
        <SectionHeading
          eyebrow="How To Earn"
          title="Three ways to earn Credits"
          description="Beyond buying credits, earn free bonus balance through loyalty and referrals."
          align="center"
          class="mx-auto"
        />

        <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DreamCard :glow="false" class="flex flex-col justify-between p-7">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">+₹100 free</p>
              <h3 class="mt-4 text-lg font-semibold text-ivory-50">Welcome verification</h3>
              <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">Verify your email to receive an instant ₹100 welcome credit.</p>
            </div>
            <p class="mt-6 border-t border-gray-600/50 pt-4 text-xs font-medium text-ivory-100/45">Added automatically on signup</p>
          </DreamCard>
          <DreamCard :glow="false" class="flex flex-col justify-between p-7">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">+₹150 per friend</p>
              <h3 class="mt-4 text-lg font-semibold text-ivory-50">Refer and earn</h3>
              <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">They get ₹150 off their first stay; you earn 150 credits when they check out.</p>
            </div>
            <RouterLink to="/refer" class="link-underline mt-6 border-t border-gray-600/50 pt-4 text-xs font-medium text-ivory-100/70 hover:text-ivory-50">Invite friends →</RouterLink>
          </DreamCard>
          <DreamCard :glow="false" class="flex flex-col justify-between p-7">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-brand-300">Up to 15% cashback</p>
              <h3 class="mt-4 text-lg font-semibold text-ivory-50">Membership cashback</h3>
              <p class="mt-2 text-sm leading-relaxed text-ivory-100/65">Members receive instant credit cashback after every booking.</p>
            </div>
            <RouterLink to="/membership" class="link-underline mt-6 border-t border-gray-600/50 pt-4 text-xs font-medium text-ivory-100/70 hover:text-ivory-50">View membership →</RouterLink>
          </DreamCard>
        </div>
      </div>
    </section>

    <section id="how-to-use" class="section-pad border-t border-gray-600/50">
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
          <PrimaryButton as="RouterLink" to="/quick-book" size="lg">Try booking a pod</PrimaryButton>
        </div>
      </div>
    </section>



    <section id="faq" class="section-pad border-t border-gray-600/50">
      <div class="container-page mx-auto max-w-3xl">
        <SectionHeading eyebrow="Credits FAQs" title="Common questions" align="center" class="mx-auto" />
        <div class="mt-12">
          <FAQAccordion :items="creditsFaqs" />
        </div>
      </div>
    </section>
  </div>
</template>
