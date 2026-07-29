<script setup lang="ts">
import { membershipTiers } from '@/data/membership'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import RewardBadge from '@/components/common/RewardBadge.vue'
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Sleepy1 Credits & Membership" title="Book smarter, earn as you travel" description="Purchase Sleepy1 Credits and redeem them — fully or partially — against any booking. Your lifetime usage unlocks membership tiers with bonus credits and priority perks." />
          <ul class="mt-6 space-y-3">
            <li class="flex items-start gap-2 text-sm text-ivory-100/70">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-300" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Buy credit packs with bonus credits on larger purchases
            </li>
            <li class="flex items-start gap-2 text-sm text-ivory-100/70">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-300" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Combine credits with direct payment at checkout
            </li>
            <li class="flex items-start gap-2 text-sm text-ivory-100/70">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-300" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Unlock Traveller, Frequent Traveller, and Elite perks automatically
            </li>
          </ul>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton as="RouterLink" to="/wallet">Open Credits Wallet</PrimaryButton>
            <SecondaryButton as="RouterLink" to="/membership">Compare Membership Tiers</SecondaryButton>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div v-for="tier in membershipTiers.slice(1)" :key="tier.id" class="card-surface flex items-center justify-between p-5">
            <div>
              <p class="font-semibold text-ivory-50">{{ tier.name }}</p>
              <p class="mt-0.5 text-xs text-ivory-100/45">{{ tier.minLifetimeCredits.toLocaleString('en-IN') }}+ lifetime credits</p>
            </div>
            <RewardBadge :label="`+${tier.bonusCreditPercent}% bonus`" :tone="tier.id === 'elite' ? 'gold' : 'brand'" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
