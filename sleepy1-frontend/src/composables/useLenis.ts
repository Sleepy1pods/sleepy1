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
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // On touch / mobile devices, native hardware scrolling is already 120Hz GPU-accelerated.
  // Bypassing JS scroll interception on mobile eliminates all input lag and dropped scroll gestures.
  if (isTouchDevice) {
    document.documentElement.classList.add('lenis-native')
    isInitialized.value = true
    return null
  }

  lenisInstance = new Lenis({
    autoRaf: true,
    autoResize: true,
    autoToggle: true,
    smoothWheel: !prefersReduced,
    lerp: prefersReduced ? 1 : 0.16,
    duration: prefersReduced ? 0 : 0.5,
    wheelMultiplier: 1.0,
    syncTouch: false,
    prevent: (node: HTMLElement) => {
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
          if (lenisInstance) {
            lenisInstance.scrollTo(el as HTMLElement, { offset: -70 })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    globalClickListenerAttached = true
  }

  // Continuous DOM and layout resize observation to prevent scroll lock on route transitions
  if (typeof ResizeObserver !== 'undefined') {
    let resizeRaf: number | null = null
    const scheduleResize = () => {
      if (resizeRaf !== null) return
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null
        lenisInstance?.resize()
      })
    }

    resizeObserver = new ResizeObserver(() => {
      scheduleResize()
    })

    if (document.body) {
      resizeObserver.observe(document.body)
    }
    resizeObserver.observe(document.documentElement)
  }

  // MutationObserver to capture asynchronous child DOM additions and async component mounts
  if (typeof MutationObserver !== 'undefined' && document.body) {
    let mutRaf: number | null = null
    mutationObserver = new MutationObserver(() => {
      if (mutRaf !== null) return
      mutRaf = requestAnimationFrame(() => {
        mutRaf = null
        lenisInstance?.resize()
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  // Window load and resize handlers
  window.addEventListener('load', () => lenisInstance?.resize(), { passive: true })
  window.addEventListener('resize', () => lenisInstance?.resize(), { passive: true })

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
      } else if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: options?.immediate ? 'instant' : 'smooth' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? 'instant' : 'smooth' })
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
