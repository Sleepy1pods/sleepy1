import { type Ref } from 'vue'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Traps Tab/Shift+Tab focus cycling within a container — used for dialogs and the mobile menu. */
export function useFocusTrap(container: Ref<HTMLElement | null>) {
  let previouslyFocused: HTMLElement | null = null

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !container.value) return
    const focusable = Array.from(container.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null,
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function activate() {
    previouslyFocused = document.activeElement as HTMLElement | null
    document.addEventListener('keydown', handleKeydown)
    requestAnimationFrame(() => {
      const focusable = container.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      focusable?.focus()
    })
  }

  function deactivate() {
    document.removeEventListener('keydown', handleKeydown)
    previouslyFocused?.focus()
    previouslyFocused = null
  }

  return { activate, deactivate }
}
