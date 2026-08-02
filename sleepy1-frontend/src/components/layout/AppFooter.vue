<script setup lang="ts">
import { ref } from 'vue'
import { footerColumns } from '@/data/navigation'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const email = ref('')

function subscribe() {
  if (!email.value.trim()) return
  ui.pushToast({ type: 'success', title: 'Subscribed', description: 'You will hear from us with layover tips and offers.' })
  email.value = ''
}
</script>

<template>
  <footer class="relative border-t border-white/8 bg-ink-950">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" aria-hidden="true" />
    <div class="container-page py-16">
      <div class="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <router-link to="/" class="flex items-center gap-2 text-lg font-semibold tracking-[0.15em] text-ivory-50">
            <img src="/Logo.png" alt="Sleepy1 Icon" class="h-9 w-9 object-contain" />
            SLEEPY1
          </router-link>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-ivory-100/55">
            Premium private sleep pods across Hubli and Dharwad, including campuses, Hubli Railway Station, and Hubli Airport.
          </p>
          <form class="mt-6 flex max-w-xs gap-2" @submit.prevent="subscribe">
            <label for="footer-email" class="sr-only">Email address</label>
            <input
              id="footer-email"
              v-model="email"
              type="email"
              required
              placeholder="you@email.com"
              class="min-h-[44px] w-full rounded-full border border-white/10 bg-ink-800/60 px-4 py-2.5 text-sm text-ivory-50 placeholder:text-ivory-100/30 focus:border-brand-400"
            />
            <button type="submit" class="btn-base shrink-0 bg-ivory-50 px-4 py-2.5 text-sm text-ink-950 hover:bg-ivory-100">Join</button>
          </form>
        </div>

        <div v-for="column in footerColumns" :key="column.title">
          <h3 class="text-sm font-semibold text-ivory-50">{{ column.title }}</h3>
          <ul class="mt-4 space-y-3">
            <li v-for="item in column.items" :key="item.to">
              <router-link :to="item.to" class="link-underline text-sm text-ivory-100/55 transition-colors hover:text-ivory-50">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-4 border-t border-white/8 pt-8 text-xs text-ivory-100/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Sleepy1. Rest. Recharge. Rise Again.</p>
        <p>Support: <a href="mailto:support@sleepy1.example" class="hover:text-ivory-100/70">support@sleepy1.example</a> · +91 1800-123-4567</p>
      </div>
    </div>
  </footer>
</template>
