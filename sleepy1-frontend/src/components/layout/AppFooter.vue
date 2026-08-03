<script setup lang="ts">
import { ref } from 'vue'
import { footerColumns, footerMoreLinks, socialLinks } from '@/data/navigation'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const email = ref('')

const socialIconPaths: Record<string, string> = {
  instagram: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17 6.5h.01',
  linkedin: 'M4 4h4v4H4V4zM4 10h4v10H4V10zM12 10h3.8v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 3.6 2 3.6 4.5V20H19v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.4-2 2.7V20H12V10z',
  x: 'M4 4l7 8-7 8h2.4l5.7-6.5L16.6 20H20l-7.4-8.5L19.6 4h-2.4l-5.2 6-5-6H4z',
}

function subscribe() {
  if (!email.value.trim() || !email.value.includes('@')) {
    ui.pushToast({ type: 'error', title: 'Valid Email Required', description: 'Please enter a valid email address.' })
    return
  }
  ui.pushToast({
    type: 'success',
    title: 'Welcome to the Insider Club!',
    description: 'Use code WELCOME-REST100 at checkout for 100 free sleep credits.',
  })
  email.value = ''
}
</script>

<template>
  <footer class="border-t border-white/8 bg-ink-950">
    <div class="container-page py-16">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <router-link to="/" class="flex items-center gap-2 text-lg font-semibold tracking-[0.15em] text-ivory-50">
            <img src="/Logo.png" alt="Sleepy1 Icon" class="h-9 w-9 object-contain" />
            SLEEPY1
          </router-link>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-ivory-100/55">
            Smart private rest pods across universities, corporate parks, hospitals, and railway stations nationwide.
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

          <div class="mt-4">
            <router-link
              to="/newsletter"
              class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-ivory-100/90 transition-all hover:border-brand-400/60 hover:bg-white/10 hover:text-ivory-50"
            >
              <svg class="h-3.5 w-3.5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>Read Newsletter & Promos</span>
              <svg class="h-3.5 w-3.5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>

          <div class="mt-6 flex items-center gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.icon"
              :href="social.href"
              :aria-label="social.label"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ivory-100/60 transition-colors hover:border-white/25 hover:text-ivory-50"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path :d="socialIconPaths[social.icon]" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
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

      <div class="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/8 pt-8">
        <router-link
          v-for="item in footerMoreLinks"
          :key="item.to"
          :to="item.to"
          class="text-xs text-ivory-100/35 transition-colors hover:text-ivory-100/70"
        >
          {{ item.label }}
        </router-link>
      </div>

      <div class="mt-8 flex flex-col gap-4 border-t border-white/8 pt-8 text-xs text-ivory-100/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Sleepy1. Your Pod, Your Mode.</p>
        <p>Support: <a href="mailto:support@sleepy1.example" class="hover:text-ivory-100/70">support@sleepy1.example</a> · +91 1800-123-4567</p>
      </div>
    </div>
  </footer>
</template>
