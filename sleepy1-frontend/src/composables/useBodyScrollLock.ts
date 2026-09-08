import { watch, onUnmounted, getCurrentInstance, type Ref } from 'vue'
import { getLenis } from '@/composables/useLenis'

/** Locks body scroll while `isLocked` is true — used by mobile menu and modal dialogs. */
export function useBodyScrollLock(isLocked: Ref<boolean>) {
  watch(
    isLocked,
    (locked) => {
      document.body.style.overflow = locked ? 'hidden' : ''
      const lenis = getLenis()
      if (locked) {
        lenis?.stop()
      } else {
        lenis?.start()
      }
    },
    { immediate: true },
  )

  if (getCurrentInstance()) {
    onUnmounted(() => {
      document.body.style.overflow = ''
      const lenis = getLenis()
      lenis?.start()
    })
  }
}

