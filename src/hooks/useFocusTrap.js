import { useEffect } from 'react'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active) return undefined
    const container = containerRef.current
    if (!container) return undefined

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return

      const items = [...container.querySelectorAll(focusableSelector)].filter(
        (element) =>
          element.offsetParent !== null && !element.hasAttribute('inert'),
      )

      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [active, containerRef])
}
