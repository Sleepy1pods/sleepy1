import { onMounted, ref } from 'vue'

/** Animates numeric text from 0 to the numeric portion of `target` (e.g. "12,000+" -> counts to 12000). */
export function useCountUp(target: string, durationMs = 1200) {
  const display = ref(target.replace(/[\d,]+/, '0'))
  const numericMatch = target.match(/[\d,]+/)

  onMounted(() => {
    if (!numericMatch) {
      display.value = target
      return
    }
    const targetNumber = Number(numericMatch[0].replace(/,/g, ''))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Number.isNaN(targetNumber)) {
      display.value = target
      return
    }

    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(targetNumber * eased)
      display.value = target.replace(numericMatch![0], current.toLocaleString('en-IN'))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })

  return { display }
}
