import { useMemo } from 'react'
import { products } from '../data/products'
import { matchesQuery } from '../utils/search'
import { CloseIcon, SearchIcon } from './Icons'
import { ProductCard } from './ProductCard'
import { Reveal } from './Reveal'

const categoryFilters = [
  { id: 'all', label: 'الكل' },
  { id: 'watches', label: 'الساعات' },
  { id: 'accessories', label: 'الإكسسوارات' },
]

const priceFilters = [
  { id: 'all', label: 'كل الأسعار', min: 0, max: Infinity },
  { id: 'under-200', label: 'أقل من ٢٠٠', min: 0, max: 200 },
  { id: '200-400', label: '٢٠٠ – ٤٠٠', min: 200, max: 400 },
  { id: '400-600', label: '٤٠٠ – ٦٠٠', min: 400, max: 600 },
  { id: 'above-600', label: '٦٠٠ وأكثر', min: 600, max: Infinity },
]

const sortOptions = [
  { id: 'featured', label: 'الاختيار المميز' },
  { id: 'newest', label: 'الأحدث أولًا' },
  { id: 'price-asc', label: 'السعر: الأقل أولًا' },
  { id: 'price-desc', label: 'السعر: الأعلى أولًا' },
  { id: 'rating', label: 'الأعلى تقييمًا' },
]

export function ProductSection({
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  priceRange,
  onPriceRangeChange,
  sort,
  onSortChange,
  onAdd,
  favorites,
  onToggleFavorite,
  onOpenDetails,
}) {
  const filteredProducts = useMemo(() => {
    const range =
      priceFilters.find((filter) => filter.id === priceRange) ?? priceFilters[0]

    const nextProducts = products.filter(
      (product) =>
        (activeCategory === 'all' || product.category === activeCategory) &&
        product.price >= range.min &&
        product.price < range.max &&
        matchesQuery(product, query),
    )

    return [...nextProducts].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return 0
    })
  }, [activeCategory, priceRange, query, sort])

  const hasActiveFilters =
    activeCategory !== 'all' || priceRange !== 'all' || query.trim() !== ''

  const resetFilters = () => {
    onCategoryChange('all')
    onQueryChange('')
    onPriceRangeChange('all')
    onSortChange('featured')
  }

  return (
    <section
      className="section products"
      id="products"
      aria-labelledby="products-title"
    >
      <div className="container">
        <Reveal className="section-heading products__heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">05</span>
              <span>الكتالوج الكامل</span>
            </p>
            <h2 id="products-title">قطع تحكي تفاصيلك</h2>
          </div>
          <p className="section-heading__text">
            ابحث، صفِّ حسب القسم أو السعر، ورتّب القطع بالطريقة التي تناسبك. كل
            الأسعار والبيانات تجريبية وقابلة للتعديل.
          </p>
        </Reveal>

        <Reveal className="catalog__toolbar" delay={80}>
          <div className="catalog__search">
            <label className="search-field" htmlFor="product-search">
              <SearchIcon size={19} />
              <span className="visually-hidden">ابحث في المنتجات</span>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="ابحث عن ساعة أو إكسسوار..."
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className="search-field__clear"
                  onClick={() => onQueryChange('')}
                  aria-label="مسح البحث"
                >
                  <CloseIcon size={16} />
                </button>
              )}
            </label>

            <label className="select-field">
              <span className="select-field__label">السعر</span>
              <select
                value={priceRange}
                onChange={(event) => onPriceRangeChange(event.target.value)}
              >
                {priceFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="select-field">
              <span className="select-field__label">الترتيب</span>
              <select
                value={sort}
                onChange={(event) => onSortChange(event.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="catalog__filters">
            <div className="filters" role="group" aria-label="تصفية حسب القسم">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`filter-pill${
                    activeCategory === filter.id ? ' is-active' : ''
                  }`}
                  aria-pressed={activeCategory === filter.id}
                  onClick={() => onCategoryChange(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="catalog__summary" aria-live="polite">
              <span>
                {filteredProducts.length} من {products.length} قطع
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="catalog__reset"
                  onClick={resetFilters}
                >
                  مسح التصفية
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {filteredProducts.length > 0 ? (
          <div className="products__grid">
            {filteredProducts.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index, 3) * 65}>
                <ProductCard
                  product={product}
                  onAdd={onAdd}
                  onToggleFavorite={onToggleFavorite}
                  onOpenDetails={onOpenDetails}
                  isFavorite={favorites.includes(product.id)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="products__empty">
            <span className="products__empty-mark">L</span>
            <h3>لا توجد قطع مطابقة</h3>
            <p>
              جرّب كلمة أبسط، أو غيّر القسم أو نطاق السعر، ثم أعد المحاولة.
            </p>
            <button
              type="button"
              className="button button--outline"
              onClick={resetFilters}
            >
              إعادة ضبط البحث
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
