<script setup lang="ts">
import { ref } from 'vue'
import { footerColumns, socialLinks } from '@/data/navigation'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const email = ref('')

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
  <footer class="relative z-20 border-t border-white/15 bg-black text-ivory-50">
    <div class="container-page py-12 sm:py-16">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
        <!-- Brand, Newsletter & Socials -->
        <div>
          <router-link to="/" class="flex items-center gap-2.5 text-lg font-bold tracking-[0.15em] text-white">
            <img src="/Logo.png" alt="Sleepy1 Icon" class="h-9 w-9 object-contain" />
            SLEEPY1
          </router-link>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-ivory-100/75">
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
              class="min-h-[44px] w-full rounded-full border border-white/20 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ivory-100/40 focus:border-brand-400"
            />
            <button type="submit" class="btn-base shrink-0 bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-ivory-100">Join</button>
          </form>

          <div class="mt-4">
            <router-link
              to="/newsletter"
              class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-ivory-100/90 transition-all hover:border-brand-400 hover:bg-white/10 hover:text-white"
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
              v-if="socialLinks.find(s => s.icon === 'instagram')"
              :href="socialLinks.find(s => s.icon === 'instagram')?.href"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-ivory-100/75 transition-colors hover:border-[#E1306C] hover:text-[#E1306C]"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              v-if="socialLinks.find(s => s.icon === 'linkedin')"
              :href="socialLinks.find(s => s.icon === 'linkedin')?.href"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-ivory-100/75 transition-colors hover:border-[#0077b5] hover:text-[#0077b5]"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation Columns: Side-by-Side on Mobile (grid-cols-2) -->
        <div class="grid grid-cols-2 gap-8 sm:gap-12">
          <div v-for="column in footerColumns" :key="column.title">
            <h3 class="font-display text-sm font-bold uppercase tracking-wider text-white">{{ column.title }}</h3>
            <ul class="mt-4 space-y-2.5">
              <li v-for="item in column.items" :key="item.to">
                <router-link :to="item.to" class="link-underline inline-block py-1 text-sm font-medium text-ivory-100/75 transition-colors hover:text-white">
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Copyright & Support -->
      <div class="mt-12 flex flex-col gap-3 border-t border-white/15 pt-8 text-xs font-medium text-ivory-100/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Sleepy1. Your Pod, Your Mode. · IIIT Dharwad Research Park,</p>
        <p>Support: <a href="mailto:sleepy1.pods@gmail.com" class="transition-colors hover:text-white">sleepy1.pods@gmail.com</a></p>
      </div>
    </div>
  </footer>
</template>
