<script setup lang="ts">
import type { CreditTransaction } from '@/types/user'
import { formatDate } from '@/utils/format'
import EmptyState from '@/components/common/EmptyState.vue'

defineProps<{ transactions: CreditTransaction[] }>()

const typeLabel: Record<string, string> = {
  purchased: 'Purchased',
  redeemed: 'Redeemed',
  expired: 'Expired',
  refunded: 'Refunded',
  promotional: 'Promotional',
}

const typeColor: Record<string, string> = {
  purchased: 'text-emerald-300',
  redeemed: 'text-rose-300',
  expired: 'text-ivory-100/40',
  refunded: 'text-brand-300',
  promotional: 'text-amber-300',
}
</script>

<template>
  <EmptyState
    v-if="transactions.length === 0"
    title="No transactions yet"
    description="Purchases, redemptions, and refunds will show up here."
  />
  <div v-else class="card-surface divide-y divide-white/8">
    <div v-for="tx in transactions" :key="tx.id" class="flex items-center justify-between gap-4 p-5">
      <div>
        <p class="text-sm font-medium text-ivory-50">{{ tx.description }}</p>
        <p class="mt-1 text-xs text-ivory-100/40">
          {{ formatDate(tx.date) }}<span v-if="tx.bookingRef"> · {{ tx.bookingRef }}</span>
        </p>
      </div>
      <div class="text-right">
        <p :class="['text-sm font-semibold', typeColor[tx.type]]">{{ tx.amount > 0 ? '+' : '' }}{{ tx.amount }}</p>
        <p class="text-xs text-ivory-100/40">{{ typeLabel[tx.type] }}</p>
      </div>
    </div>
  </div>
</template>
