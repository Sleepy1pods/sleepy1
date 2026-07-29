import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * Adds a `.reveal` class to the target element the first time it enters the viewport.
 * Pass `delayMs` (e.g. `index * 80`) to stagger entrance across a grid/list of siblings.
 */
export function useScrollReveal(threshold = 0.15, delayMs = 0): Ref<HTMLElement | null> {
  const target = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!(target.value instanceof HTMLElement)) return
    if (delayMs) target.value.style.setProperty('--reveal-delay', `${delayMs}ms`)

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      target.value.classList.add('reveal')
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )
    observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return target
}
