import { creditPackages, mockWallet } from '@/data/credits'
import type { CreditPackage, CreditTransaction, CreditWallet } from '@/types/user'
import { delay } from '@/utils/delay'

let wallet: CreditWallet = { ...mockWallet, transactions: [...mockWallet.transactions] }

export const creditService = {
  async getPackages(): Promise<CreditPackage[]> {
    return delay(creditPackages)
  },

  async getWallet(): Promise<CreditWallet> {
    return delay({ ...wallet, transactions: [...wallet.transactions] })
  },

  async purchase(packageId: string): Promise<CreditWallet> {
    const pack = creditPackages.find((p) => p.id === packageId)
    if (!pack) throw new Error('Unknown credit package.')
    const totalCredits = pack.credits + pack.bonusCredits
    const tx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      type: 'purchased',
      amount: totalCredits,
      description: `${pack.credits} Credits Pack${pack.bonusCredits ? ` + ${pack.bonusCredits} bonus` : ''}`,
      date: new Date().toISOString().slice(0, 10),
    }
    wallet = {
      ...wallet,
      balance: wallet.balance + totalCredits,
      lifetimePurchased: wallet.lifetimePurchased + totalCredits,
      transactions: [tx, ...wallet.transactions],
    }
    return delay({ ...wallet, transactions: [...wallet.transactions] }, 700)
  },

  async redeem(amount: number, description: string, bookingRef?: string): Promise<CreditWallet> {
    const applied = Math.min(amount, wallet.balance)
    if (applied <= 0) return delay({ ...wallet })
    const tx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      type: 'redeemed',
      amount: -applied,
      description,
      date: new Date().toISOString().slice(0, 10),
      bookingRef,
    }
    wallet = {
      ...wallet,
      balance: wallet.balance - applied,
      lifetimeRedeemed: wallet.lifetimeRedeemed + applied,
      transactions: [tx, ...wallet.transactions],
    }
    return delay({ ...wallet, transactions: [...wallet.transactions] }, 500)
  },

  async refund(amount: number, description: string, bookingRef?: string): Promise<CreditWallet> {
    if (amount <= 0) return delay({ ...wallet })
    const tx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      type: 'refunded',
      amount,
      description,
      date: new Date().toISOString().slice(0, 10),
      bookingRef,
    }
    wallet = {
      ...wallet,
      balance: wallet.balance + amount,
      transactions: [tx, ...wallet.transactions],
    }
    return delay({ ...wallet, transactions: [...wallet.transactions] }, 500)
  },
}
