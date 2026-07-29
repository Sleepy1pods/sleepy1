<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCreditsStore } from '@/stores/credits'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import { creditPackages } from '@/data/credits'
import WalletBalance from '@/components/credits/WalletBalance.vue'
import CreditCard from '@/components/credits/CreditCard.vue'
import CreditHistory from '@/components/credits/CreditHistory.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import PaymentSuccess from '@/components/booking/PaymentSuccess.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({
  title: 'Credits Wallet',
  description: 'Manage your Sleepy1 Credits — check your balance, purchase new credit packs, and review transaction history.',
})

const credits = useCreditsStore()
const ui = useUiStore()
const purchasingId = ref<string | null>(null)
const showSuccess = ref(false)

onMounted(() => credits.fetchWallet())

async function purchase(packageId: string) {
  purchasingId.value = packageId
  try {
    await credits.purchasePackage(packageId)
    showSuccess.value = true
  } finally {
    purchasingId.value = null
  }
}

function closeSuccess() {
  showSuccess.value = false
  ui.pushToast({ type: 'success', title: 'Credits added', description: 'Your wallet balance has been updated.' })
}
</script>

<template>
  <div class="container-page max-w-5xl py-14">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-ivory-50">Credits Wallet</h1>
        <p class="mt-2 text-ivory-100/60">Buy, track, and redeem Sleepy1 Credits toward any booking.</p>
      </div>
      <SecondaryButton as="RouterLink" to="/membership">View Membership Tiers →</SecondaryButton>
    </div>

    <LoadingSkeleton v-if="credits.isLoading && !credits.wallet" :count="1" class="mt-10" />
    <div v-else-if="credits.wallet" class="mt-10 space-y-14">
      <WalletBalance :wallet="credits.wallet" />

      <section>
        <h2 class="text-xl font-semibold text-ivory-50">Purchase Credits</h2>
        <p class="mt-1 text-sm text-ivory-100/55">Simulated checkout — no real payment is processed.</p>
        <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <CreditCard
            v-for="pack in creditPackages"
            :key="pack.id"
            :pack="pack"
            @purchase="purchase(pack.id)"
          />
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-ivory-50">Transaction History</h2>
        <div class="mt-6">
          <CreditHistory :transactions="credits.wallet.transactions" />
        </div>
      </section>
    </div>

    <ModalDialog :open="showSuccess" title="Credits Purchased" @close="closeSuccess">
      <PaymentSuccess />
      <PrimaryButton full-width class="mt-2" @click="closeSuccess">Done</PrimaryButton>
    </ModalDialog>
  </div>
</template>
