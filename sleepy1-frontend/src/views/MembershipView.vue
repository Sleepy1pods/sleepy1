<script setup lang="ts">
import { onMounted } from 'vue'
import { membershipTiers } from '@/data/membership'
import { useCreditsStore } from '@/stores/credits'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import MembershipCard from '@/components/credits/MembershipCard.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({
  title: 'Membership Plans',
  description: 'Sleepy1 membership tiers — Explorer, Traveller, Frequent Traveller, and Elite. Earn bonus credits, priority booking, and exclusive perks.',
})

const credits = useCreditsStore()
onMounted(() => credits.fetchWallet())
</script>

<template>
  <div>
    <section class="section-pad">
      <div class="container-page">
        <SectionHeading level="h1" eyebrow="Membership" title="Loyalty that grows with how you travel" align="center" class="mx-auto" description="Membership tiers are earned automatically from your lifetime Sleepy1 Credits — no separate subscription required." />
        <div v-if="credits.wallet" class="mx-auto mt-8 w-fit rounded-full border border-brand-400/30 bg-brand-400/10 px-5 py-2 text-sm font-medium text-brand-200">
          You're currently on the <strong>{{ credits.currentTier.name }}</strong> tier
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MembershipCard
            v-for="tier in membershipTiers"
            :key="tier.id"
            :tier="tier"
            :current="credits.wallet ? credits.currentTier.id === tier.id : false"
          />
        </div>
        <div class="mt-12 flex justify-center">
          <PrimaryButton as="RouterLink" to="/wallet" size="lg">Buy Credits to Level Up</PrimaryButton>
        </div>
      </div>
    </section>
  </div>
</template>
