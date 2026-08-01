<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import SectionHeading from '@/components/common/SectionHeading.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const ui = useUiStore()

function notifyComingSoon(platform: string) {
  ui.pushToast({ type: 'info', title: `${platform} app coming soon`, description: 'The Sleepy1 mobile app is in development. This build is a web-only MVP.' })
}
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <SectionHeading eyebrow="Experience Sleepy1" title="Your pod, controlled from your palm" description="Adjust lighting, browse music and shows, manage access, and track your booking — all from the in-pod smart panel, with a full mobile app on the way." />
        <div class="mt-8 flex flex-wrap gap-3">
          <SecondaryButton @click="notifyComingSoon('iOS')">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 2c.1 1.1-.3 2.2-1 3-.7.8-1.9 1.4-3 1.3-.1-1 .4-2.2 1.1-3C14.3 2.5 15.5 2 16.5 2zM20 17c-.5 1.2-1.1 2.3-2 3.3-1 1.2-2 2.4-3.4 2.4-1.4 0-1.8-.8-3.4-.8-1.6 0-2 .8-3.4.8-1.4 0-2.5-1.3-3.5-2.5C2.6 18 1.5 14 3 11.2c.8-1.5 2.2-2.4 3.7-2.4 1.4 0 2.3.9 3.4.9 1.1 0 1.8-.9 3.4-.9 1.2 0 2.5.6 3.4 1.7-3 1.7-2.5 6 .1 7.3z" /></svg>
            App Store
          </SecondaryButton>
          <SecondaryButton @click="notifyComingSoon('Android')">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4l16 8-16 8V4z" /></svg>
            Google Play
          </SecondaryButton>
        </div>
      </div>

      <div class="mx-auto w-full max-w-xs">
        <div class="relative aspect-[9/18] overflow-hidden rounded-[2.5rem] border-4 border-ink-700 bg-ink-800 shadow-premium">
          <div class="flex h-full flex-col gap-3 p-4 pt-8">
            <div class="rounded-2xl bg-gradient-to-br from-brand-600/40 to-lavender-500/30 p-4">
              <p class="text-xs text-ivory-100/60">Pod 4 · Hubli Airport</p>
              <p class="mt-1 text-sm font-semibold text-ivory-50">Check-in in 12 minutes</p>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div v-for="n in 6" :key="n" class="aspect-square rounded-xl bg-white/5" />
            </div>
            <div class="mt-auto rounded-2xl bg-white/5 p-3 text-center text-xs text-ivory-100/50">Smarten Panel</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
