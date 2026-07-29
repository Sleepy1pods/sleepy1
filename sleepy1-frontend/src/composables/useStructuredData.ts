import { watchEffect } from 'vue'

const SCRIPT_ID = 'sleepy1-ld-json'

/**
 * Injects a page-scoped JSON-LD script tag (e.g. LodgingBusiness for a location page).
 * Pass `null` to remove any existing structured data for routes that don't need it.
 */
export function useStructuredData(getData: () => Record<string, unknown> | null) {
  watchEffect(() => {
    const data = getData()
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null

    if (!data) {
      script?.remove()
      return
    }

    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = SCRIPT_ID
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', ...data })
  })
}
