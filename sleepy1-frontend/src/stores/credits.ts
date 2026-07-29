import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CreditWallet } from '@/types/user'
import { creditService } from '@/services/creditService'
import { getTierForLifetimeCredits } from '@/data/membership'

export const useCreditsStore = defineStore('credits', () => {
  const wallet = ref<CreditWallet | null>(null)
  const isLoading = ref(false)

  const currentTier = computed(() => getTierForLifetimeCredits(wallet.value?.lifetimePurchased ?? 0))

  async function fetchWallet(force = false) {
    if (wallet.value && !force) return
    isLoading.value = true
    try {
      wallet.value = await creditService.getWallet()
    } finally {
      isLoading.value = false
    }
  }

  async function purchasePackage(packageId: string) {
    isLoading.value = true
    try {
      wallet.value = await creditService.purchase(packageId)
    } finally {
      isLoading.value = false
    }
  }

  async function redeemCredits(amount: number, description: string, bookingRef?: string) {
    wallet.value = await creditService.redeem(amount, description, bookingRef)
  }

  return { wallet, isLoading, currentTier, fetchWallet, purchasePackage, redeemCredits }
})
