import { onMounted, onUnmounted, type Ref } from 'vue'
import { useReducedMotion } from './useReducedMotion'

/**
 * Sets `--parallax-x` / `--parallax-y` CSS custom properties on `target`, gently trailing the
 * pointer position. Consumers apply them via `transform: translate3d(var(--parallax-x, 0), var(--parallax-y, 0), 0)`.
 * No-ops on touch/coarse pointers and when the user prefers reduced motion; pauses while the tab is hidden.
 */
export function useParallax(target: Ref<HTMLElement | null>, strength = 16) {
  const prefersReducedMotion = useReducedMotion()

  let frame = 0
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0
  let active = false

  function onPointerMove(event: PointerEvent) {
    targetX = (event.clientX / window.innerWidth - 0.5) * 2 * strength
    targetY = (event.clientY / window.innerHeight - 0.5) * 2 * strength
  }

  function loop() {
    currentX += (targetX - currentX) * 0.06
    currentY += (targetY - currentY) * 0.06
    target.value?.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`)
    target.value?.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`)
    frame = requestAnimationFrame(loop)
  }

  function handleVisibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame)
    } else if (active) {
      frame = requestAnimationFrame(loop)
    }
  }

  onMounted(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (prefersReducedMotion.value || !isFinePointer) return
    active = true
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)
    frame = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    active = false
    cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('visibilitychange', handleVisibility)
  })
}
