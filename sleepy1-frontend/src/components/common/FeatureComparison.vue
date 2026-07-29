<script setup lang="ts">
import type { PodFeatureComparisonRow } from '@/types/pod'

defineProps<{ rows: PodFeatureComparisonRow[] }>()

function isBoolean(value: boolean | string): value is boolean {
  return typeof value === 'boolean'
}
</script>

<template>
  <div class="overflow-x-auto rounded-2xl border border-white/10">
    <table class="w-full min-w-[640px] border-collapse text-left text-sm">
      <thead>
        <tr class="border-b border-white/10 bg-white/[0.03]">
          <th scope="col" class="p-4 font-medium text-ivory-100/60">Feature</th>
          <th scope="col" class="p-4 font-medium text-ivory-50">Solo Rest</th>
          <th scope="col" class="p-4 font-medium text-ivory-50">Solo Unwind</th>
          <th scope="col" class="p-4 font-medium text-ivory-50">Twin Lounge</th>
          <th scope="col" class="p-4 font-medium text-ivory-50">Premium Suite</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.feature" class="border-b border-white/5 last:border-0">
          <th scope="row" class="p-4 font-medium text-ivory-100/70">{{ row.feature }}</th>
          <td class="p-4">
            <span v-if="isBoolean(row.soloRest)">
              <svg v-if="row.soloRest" class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span v-else class="text-ivory-100/45" aria-label="Not included">—</span>
            </span>
            <span v-else class="text-ivory-100/80">{{ row.soloRest }}</span>
          </td>
          <td class="p-4">
            <span v-if="isBoolean(row.soloWork)">
              <svg v-if="row.soloWork" class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span v-else class="text-ivory-100/45" aria-label="Not included">—</span>
            </span>
            <span v-else class="text-ivory-100/80">{{ row.soloWork }}</span>
          </td>
          <td class="p-4">
            <span v-if="isBoolean(row.twinLounge)">
              <svg v-if="row.twinLounge" class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span v-else class="text-ivory-100/45" aria-label="Not included">—</span>
            </span>
            <span v-else class="text-ivory-100/80">{{ row.twinLounge }}</span>
          </td>
          <td class="p-4">
            <span v-if="isBoolean(row.premiumSuite)">
              <svg v-if="row.premiumSuite" class="h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span v-else class="text-ivory-100/45" aria-label="Not included">—</span>
            </span>
            <span v-else class="text-ivory-100/80">{{ row.premiumSuite }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
