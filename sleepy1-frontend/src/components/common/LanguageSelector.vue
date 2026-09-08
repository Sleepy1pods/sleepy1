<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import type { Locale } from '@/i18n/types'

const { locale, currentLanguage, availableLanguages, setLocale } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const isDark = ref(false)

function checkDark() {
  isDark.value = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
}

let observer: MutationObserver | null = null

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectLanguage(code: Locale) {
  setLocale(code)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  checkDark()
  if (typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  }
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  observer?.disconnect()
})

const triggerStyle = computed(() => ({
  backgroundColor: isDark.value ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
  borderColor: isDark.value ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.15)',
  color: isDark.value ? '#ffffff' : '#09090b'
}))

const dropdownStyle = computed(() => ({
  backgroundColor: isDark.value ? '#141416' : '#ffffff',
  borderColor: isDark.value ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)',
  boxShadow: isDark.value
    ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
    : '0 20px 40px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.06)'
}))
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left select-none notranslate" translate="no">
    <!-- Trigger Button -->
    <button
      type="button"
      class="lang-trigger-btn notranslate inline-flex h-[28px] sm:h-[30px] items-center gap-1.5 rounded-full px-2.5 sm:px-3 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-sm"
      :style="triggerStyle"
      translate="no"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      aria-label="Select website language"
      @click.stop="toggleDropdown"
    >
      <!-- Globe Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3.5 w-3.5 shrink-0"
        :style="{ color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#374151' }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>

      <!-- Active Language Short Label -->
      <span class="font-bold tracking-wider" :style="{ color: isDark ? '#ffffff' : '#09090b' }">
        {{ currentLanguage.shortLabel }}
      </span>

      <!-- Down Chevron -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3 transition-transform duration-200 shrink-0"
        :class="isOpen ? 'rotate-180' : ''"
        :style="{ color: isDark ? 'rgba(255, 255, 255, 0.65)' : '#6b7280' }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-1"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="lang-dropdown-panel notranslate absolute right-0 mt-2.5 w-52 origin-top-right rounded-2xl p-1.5 backdrop-blur-2xl z-[9999]"
        :style="dropdownStyle"
        translate="no"
        role="menu"
        aria-orientation="vertical"
      >
        <!-- Header -->
        <div
          class="lang-header px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider notranslate"
          :style="{ color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.45)' }"
          translate="no"
        >
          LANGUAGE / ಭಾಷೆ / भाषा
        </div>

        <!-- Language Options -->
        <button
          v-for="lang in availableLanguages"
          :key="lang.code"
          type="button"
          class="lang-option-btn notranslate w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150 cursor-pointer text-left"
          :class="locale === lang.code ? 'is-active' : 'is-inactive'"
          :style="{
            backgroundColor: locale === lang.code
              ? (isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.08)')
              : 'transparent',
            color: isDark ? '#ffffff' : '#09090b'
          }"
          translate="no"
          role="menuitem"
          @click="selectLanguage(lang.code)"
        >
          <div class="flex flex-col text-left">
            <span
              class="lang-native-text text-sm font-semibold leading-tight"
              :style="{ color: isDark ? '#ffffff' : '#09090b' }"
            >
              {{ lang.nativeName }}
            </span>
            <span
              v-if="lang.label !== lang.nativeName"
              class="lang-sub-text text-[10px] mt-0.5"
              :style="{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.55)' }"
            >
              {{ lang.label }}
            </span>
          </div>

          <!-- Active check icon -->
          <svg
            v-if="locale === lang.code"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 shrink-0"
            :style="{ color: isDark ? '#818cf8' : '#4f46e5' }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lang-dropdown-panel {
  border-width: 1.5px;
  border-style: solid;
}

/* Fallback / CSS cascade reinforcement */
:global(html.dark) .lang-dropdown-panel {
  background-color: #141416 !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
}

:global(html:not(.dark)) .lang-dropdown-panel {
  background-color: #ffffff !important;
  border-color: rgba(0, 0, 0, 0.12) !important;
  color: #09090b !important;
}

.lang-option-btn.is-inactive:hover {
  background-color: rgba(125, 125, 125, 0.1) !important;
}

:global(html.dark) .lang-option-btn.is-active {
  background-color: rgba(255, 255, 255, 0.14) !important;
}

:global(html:not(.dark)) .lang-option-btn.is-active {
  background-color: rgba(0, 0, 0, 0.08) !important;
}
</style>
