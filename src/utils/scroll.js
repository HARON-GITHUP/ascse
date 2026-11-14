export function scrollToId(id) {
  const element = document.getElementById(id)
  if (!element) return

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  element.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

export function focusProductSearch() {
  scrollToId('products')

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  window.setTimeout(
    () => {
      document.getElementById('product-search')?.focus({ preventScroll: true })
    },
    reduceMotion ? 0 : 420,
  )
}
