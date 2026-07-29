<script setup lang="ts">
import { offers } from '@/data/offers'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PromoCard from '@/components/common/PromoCard.vue'
import OfferBanner from '@/components/common/OfferBanner.vue'

usePageMeta({
  title: 'Offers & Promotions',
  description: 'Current Sleepy1 offers and promo codes — new user discounts, membership perks, corporate bundles, and seasonal specials.',
})

const ui = useUiStore()

function onCopy(code: string) {
  ui.pushToast({ type: 'success', title: 'Code copied', description: `${code} copied to clipboard.` })
}
</script>

<template>
  <div class="container-page py-16">
    <SectionHeading level="h1" eyebrow="Offers & Promotions" title="Current Sleepy1 offers" align="center" class="mx-auto" description="Apply these codes at checkout during the booking flow." />

    <div class="mt-10">
      <OfferBanner
        title="New here? Get 20% off your first pod."
        description="Use code FIRSTSLEEP at checkout on any Sleepy1 location."
        cta-label="Book Your First Pod"
        cta-to="/book"
      />
    </div>

    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <PromoCard v-for="offer in offers" :key="offer.id" :offer="offer" @copy="onCopy" />
    </div>
  </div>
</template>
