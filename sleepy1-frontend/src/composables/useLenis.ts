import { ref, onUnmounted, getCurrentInstance } from 'vue'
import Lenis, { type ScrollToOptions } from 'lenis'

let lenisInstance: Lenis | null = null
const isInitialized = ref(false)
let globalClickListenerAttached = false
let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null

/**
 * Initializes the global Lenis smooth scroll instance.
 * Automatically respects `prefers-reduced-motion`.
 */
export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null
  if (lenisInstance) return lenisInstance

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  lenisInstance = new Lenis({
    autoRaf: true,
    autoResize: true,
    autoToggle: true,
    smoothWheel: !prefersReduced,
    lerp: prefersReduced ? 1 : 0.085,
    duration: prefersReduced ? 0 : 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1.0,
    touchMultiplier: 1.15,
    prevent: (node: HTMLElement) => {
      // Only prevent on Leaflet map container to allow map zooming without scrolling
      return Boolean(node.closest('.leaflet-container'))
    },
  })

  // Add lenis classes to html for styling
  document.documentElement.classList.add('lenis', 'lenis-smooth')

  // Smooth scroll handler for anchor links
  if (!globalClickListenerAttached) {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href)
        if (el) {
          e.preventDefault()
          lenisInstance?.scrollTo(el as HTMLElement, { offset: -70 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    globalClickListenerAttached = true
  }

  // Set up continuous ResizeObserver to recalculate limit on dynamic image loads, route changes, or content growth
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver?.disconnect()
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        lenisInstance?.resize()
      }, 30)
    })

    if (document.documentElement) resizeObserver.observe(document.documentElement)
    if (document.body) resizeObserver.observe(document.body)
  }

  // Also listen to image load / window load events to ensure full document height is registered
  window.addEventListener('load', () => lenisInstance?.resize(), { passive: true })

  isInitialized.value = true
  return lenisInstance
}

/**
 * Returns the current active Lenis singleton instance, or null if not yet initialized.
 */
export function getLenis(): Lenis | null {
  return lenisInstance
}

/**
 * Destroys the Lenis instance and cleans up classes/listeners.
 */
export function destroyLenis() {
  resizeObserver?.disconnect()
  resizeObserver = null
  mutationObserver?.disconnect()
  mutationObserver = null
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
    isInitialized.value = false
    document.documentElement.classList.remove('lenis', 'lenis-smooth')
  }
}

/**
 * Vue composable to access and interact with Lenis inside components.
 */
export function useLenis() {
  const instance = getCurrentInstance()

  function onScroll(callback: (lenis: Lenis) => void) {
    if (!lenisInstance) {
      initLenis()
    }
    if (!lenisInstance) return () => {}

    const unsubscribe = lenisInstance.on('scroll', callback)

    if (instance) {
      onUnmounted(() => {
        unsubscribe()
      })
    }

    return unsubscribe
  }

  function scrollTo(target: string | number | HTMLElement, options?: ScrollToOptions) {
    if (!lenisInstance) {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'instant' : 'smooth' })
      }
      return
    }
    lenisInstance.scrollTo(target, options)
  }

  function stop() {
    lenisInstance?.stop()
  }

  function start() {
    lenisInstance?.start()
  }

  function resize() {
    lenisInstance?.resize()
  }

  return {
    get lenis() {
      return lenisInstance
    },
    isInitialized,
    onScroll,
    scrollTo,
    stop,
    start,
    resize,
  }
}
