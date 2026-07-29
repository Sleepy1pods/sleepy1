import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/** Reactively tracks the user's `prefers-reduced-motion` preference, including live OS changes. */
export function useReducedMotion(): Ref<boolean> {
  const prefersReducedMotion = ref(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  )

  let media: MediaQueryList | null = null
  function onChange(event: MediaQueryListEvent) {
    prefersReducedMotion.value = event.matches
  }

  onMounted(() => {
    media = window.matchMedia('(prefers-reduced-motion: reduce)')
    media.addEventListener('change', onChange)
  })

  onUnmounted(() => {
    media?.removeEventListener('change', onChange)
  })

  return prefersReducedMotion
}
