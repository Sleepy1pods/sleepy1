<script setup lang="ts">
import type { CreditWallet } from '@/types/user'
import { formatDate } from '@/utils/format'

defineProps<{ wallet: CreditWallet }>()
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-800 via-ink-700 to-brand-900 p-8 shadow-premium">
    <div class="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl" aria-hidden="true" />
    <div class="relative">
      <p class="eyebrow">Sleepy1 Wallet</p>
      <p class="mt-3 text-4xl font-semibold text-ivory-50 sm:text-5xl">{{ wallet.balance.toLocaleString('en-IN') }}<span class="text-lg font-normal text-ivory-100/50"> credits</span></p>
      <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <p class="text-xs text-ivory-100/50">Lifetime purchased</p>
          <p class="mt-1 text-lg font-semibold text-ivory-50">{{ wallet.lifetimePurchased.toLocaleString('en-IN') }}</p>
        </div>
        <div>
          <p class="text-xs text-ivory-100/50">Lifetime redeemed</p>
          <p class="mt-1 text-lg font-semibold text-ivory-50">{{ wallet.lifetimeRedeemed.toLocaleString('en-IN') }}</p>
        </div>
        <div>
          <p class="text-xs text-ivory-100/50">Expiring soon</p>
          <p class="mt-1 text-lg font-semibold text-amber-300">{{ wallet.expiringCredits }} · {{ formatDate(wallet.expiryDate) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
