const arabicMarks = /[\u064B-\u065F\u0670]/g

export function normalizeArabic(value = '') {
  return value
    .toString()
    .toLowerCase()
    .replace(arabicMarks, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim()
}

export function matchesQuery(product, query) {
  const needle = normalizeArabic(query)
  if (!needle) return true

  const haystack = normalizeArabic(
    [product.name, product.tagline, product.categoryLabel].join(' '),
  )

  return haystack.includes(needle)
}
