import { ref, computed } from 'vue'
import type { Locale, LanguageOption, TranslationSchema } from '@/i18n/types'
import { en } from '@/i18n/locales/en'
import { kn } from '@/i18n/locales/kn'
import { hi } from '@/i18n/locales/hi'

const STORAGE_KEY = 'sleepy1-language'

export const availableLanguages: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', shortLabel: 'EN' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', shortLabel: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', shortLabel: 'हिन्दी' },
]

const dictionaries: Record<Locale, TranslationSchema> = {
  en,
  kn,
  hi,
}

function applyGoogleTranslate(targetLang: Locale) {
  if (typeof document === 'undefined') return

  const domain = window.location.hostname
  const cookieVal = targetLang === 'en' ? '' : `/en/${targetLang}`

  // 1. Set Google Translate cookies
  document.cookie = `googtrans=${cookieVal}; path=/; max-age=31536000`
  if (domain && domain !== 'localhost') {
    document.cookie = `googtrans=${cookieVal}; domain=${domain}; path=/; max-age=31536000`
    const parts = domain.split('.')
    if (parts.length > 2) {
      const rootDomain = parts.slice(-2).join('.')
      document.cookie = `googtrans=${cookieVal}; domain=.${rootDomain}; path=/; max-age=31536000`
    }
  }

  // 2. Trigger Google combo element if present
  function triggerCombo(): boolean {
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
    if (select) {
      select.value = targetLang
      select.dispatchEvent(new Event('change'))
      return true
    }
    return false
  }

  if (!triggerCombo()) {
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      if (triggerCombo() || attempts > 25) {
        clearInterval(interval)
      }
    }, 150)
  }
}

// Initial locale check from localStorage or default 'en'
function getInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'kn' || saved === 'hi' || saved === 'en') {
      return saved
    }
  } catch {
    // ignore
  }
  return 'en'
}

const currentLocale = ref<Locale>(getInitialLocale())

// Apply html lang attribute immediately and init translator if non-english
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', currentLocale.value)
  if (currentLocale.value !== 'en') {
    window.addEventListener('DOMContentLoaded', () => {
      applyGoogleTranslate(currentLocale.value)
    })
    // Also try immediately in case DOM is already loaded
    applyGoogleTranslate(currentLocale.value)
  }
}

export function useI18n() {
  const currentLanguage = computed(() => {
    return availableLanguages.find((l) => l.code === currentLocale.value) || availableLanguages[0]
  })

  function setLocale(newLocale: Locale) {
    if (!dictionaries[newLocale]) return
    currentLocale.value = newLocale
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', newLocale)
      }
    } catch {
      // ignore
    }
    applyGoogleTranslate(newLocale)
  }

  /**
   * Translate a key by path, e.g. t('nav.features') or t('about.storyTitle')
   */
  function t(path: string, fallback?: string): string {
    const dict = dictionaries[currentLocale.value] || dictionaries.en
    const parts = path.split('.')
    let current: any = dict

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part]
      } else {
        // Fallback to English dictionary if key missing in chosen language
        let fallbackVal: any = dictionaries.en
        for (const fbPart of parts) {
          if (fallbackVal && typeof fallbackVal === 'object' && fbPart in fallbackVal) {
            fallbackVal = fallbackVal[fbPart]
          } else {
            fallbackVal = undefined
            break
          }
        }
        return typeof fallbackVal === 'string' ? fallbackVal : fallback || path
      }
    }

    return typeof current === 'string' ? current : fallback || path
  }

  return {
    locale: currentLocale,
    currentLanguage,
    availableLanguages,
    setLocale,
    t,
  }
}
