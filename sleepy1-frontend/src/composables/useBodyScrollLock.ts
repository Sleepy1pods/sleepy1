import { watch, type Ref } from 'vue'

/** Locks body scroll while `isLocked` is true — used by mobile menu and modal dialogs. */
export function useBodyScrollLock(isLocked: Ref<boolean>) {
  watch(
    isLocked,
    (locked) => {
      document.body.style.overflow = locked ? 'hidden' : ''
    },
    { immediate: true },
  )
}
