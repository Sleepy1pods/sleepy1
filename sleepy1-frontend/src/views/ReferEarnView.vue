<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import RewardBadge from '@/components/common/RewardBadge.vue'

usePageMeta({
  title: 'Refer & Earn',
  description: 'Refer friends to Sleepy1 and earn bonus credits when they complete their first booking.',
})

const auth = useAuthStore()
const ui = useUiStore()

const referralCode = computed(() => {
  const base = auth.user?.fullName?.replace(/\s+/g, '').toUpperCase().slice(0, 6) ?? 'SLEEPY'
  return `${base}250`
})

const referralLink = computed(() => `https://sleepy1.example/join?ref=${referralCode.value}`)

function copyLink() {
  navigator.clipboard?.writeText(referralLink.value).catch(() => undefined)
  ui.pushToast({ type: 'success', title: 'Link copied', description: 'Share it with friends before their next trip.' })
}

const steps = [
  { title: 'Share your code', description: 'Send your unique referral link to friends and colleagues.' },
  { title: 'They book their first pod', description: 'Your friend gets 100 bonus credits on their first Sleepy1 booking.' },
  { title: 'You both earn credits', description: 'You receive 150 bonus credits once their booking is completed.' },
]
</script>

<template>
  <div class="container-page max-w-3xl py-16">
    <SectionHeading level="h1" eyebrow="Refer & Earn" title="Give rest, get rewarded" align="center" class="mx-auto" description="Invite fellow travellers to Sleepy1 — you both earn bonus credits." />

    <div class="card-surface mt-10 flex flex-col items-center gap-4 p-8 text-center">
      <RewardBadge label="Earn 150 credits per referral" tone="gold" />
      <p class="font-mono text-2xl font-semibold tracking-widest text-ivory-50">{{ referralCode }}</p>
      <div class="flex w-full max-w-md items-center gap-2 rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3">
        <span class="flex-1 truncate text-sm text-ivory-100/60">{{ referralLink }}</span>
        <button type="button" class="shrink-0 text-sm font-semibold text-brand-300 hover:text-brand-200" @click="copyLink">Copy</button>
      </div>
    </div>

    <div class="mt-14 grid gap-5 sm:grid-cols-3">
      <div v-for="(step, i) in steps" :key="step.title" class="card-surface p-6 text-center">
        <span class="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-brand-400/15 text-sm font-semibold text-brand-300">{{ i + 1 }}</span>
        <h3 class="mt-4 font-semibold text-ivory-50">{{ step.title }}</h3>
        <p class="mt-2 text-sm text-ivory-100/60">{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>
