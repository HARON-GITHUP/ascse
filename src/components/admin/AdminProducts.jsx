import { useMemo, useState } from 'react'
import { products } from '../../data/products'
import { formatPrice } from '../../data/products'
import { discountPercent } from '../../data/products'
import { StatusBadge } from './StatusBadge'

const LOW_STOCK_THRESHOLD = 3

export function AdminProducts({ onNotify, initialStockFilter = 'all' }) {
  const [adminProducts, setAdminProducts] = useState(products)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [stockFilter, setStockFilter] = useState(initialStockFilter)
  const [sort, setSort] = useState('newest')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase()

    const next = adminProducts
      .filter((product) => {
        if (category !== 'all' && product.category !== category) return false
        if (stockFilter === 'low' && (product.stock ?? 0) > LOW_STOCK_THRESHOLD) return false
        if (stockFilter === 'out' && (product.stock ?? 0) <= 0) return false
        if (!needle) return true
        const haystack = [product.name, product.tagline, product.categoryLabel].join(' ').toLowerCase()
        return haystack.includes(needle)
      })

    if (sort === 'price-asc') return [...next].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...next].sort((a, b) => b.price - a.price)
    if (sort === 'stock') return [...next].sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))

    return [...next].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
  }, [adminProducts, query, category, stockFilter, sort])

  const openCreate = () => {
    setEditingProduct({
      id: `custom-${Date.now()}`,
      name: '',
      tagline: '',
      description: '',
      category: 'watches',
      categoryLabel: 'ساعات',
      price: 0,
      oldPrice: null,
      stock: 3,
      rating: 5,
      reviews: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      image: '/images/watch-aura.jpg',
      alt: '',
    })
    setIsModalOpen(true)
  }

  const openEdit = (product) => {
    setEditingProduct({ ...product })
    setIsModalOpen(true)
  }

  const saveProduct = () => {
    if (!editingProduct) return
    if (!editingProduct.name.trim()) return

    setAdminProducts((current) => {
      const exists = current.some((item) => item.id === editingProduct.id)
      const next = { ...editingProduct }

      if (exists) {
        return current.map((item) => (item.id === editingProduct.id ? next : item))
      }

      return [next, ...current]
    })

    onNotify(`تم حفظ المنتج ${editingProduct.name}`, 'success')
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const setStock = (productId, stock) => {
    setAdminProducts((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, stock: Math.max(0, Number(stock) || 0) } : item,
      ),
    )
  }

  const lowStockCount = adminProducts.filter(
    (product) => (product.stock ?? 0) <= LOW_STOCK_THRESHOLD,
  ).length

  return (
    <div className="admin-page">
      <div className="admin-panel">
        <header className="admin-panel__head">
          <div>
            <h2>المنتجات والمخزون</h2>
            <p>
              {adminProducts.length} منتج — {lowStockCount} منخفض المخزون
            </p>
          </div>

          <div className="admin-toolbar">
            <label className="admin-search admin-search--small">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث بالمنتج أو الوصف..."
              />
            </label>

            <select className="admin-select" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="تصفية القسم">
              <option value="all">كل الأقسام</option>
              <option value="watches">الساعات</option>
              <option value="accessories">الإكسسوارات</option>
            </select>

            <select className="admin-select" value={stockFilter} onChange={(event) => setStockFilter(event.target.value)} aria-label="تصفية المخزون">
              <option value="all">كل المخزون</option>
              <option value="low">منخفض</option>
              <option value="out">نفد</option>
            </select>

            <select className="admin-select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="ترتيب المنتجات">
              <option value="newest">الأحدث</option>
              <option value="price-asc">السعر: الأقل</option>
              <option value="price-desc">السعر: الأعلى</option>
              <option value="stock">المخزون: الأقل</option>
            </select>

            <button type="button" className="button button--primary" onClick={openCreate}>
              + منتج جديد
            </button>
          </div>
        </header>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>القسم</th>
                <th>السعر</th>
                <th>الخصم</th>
                <th>المخزون</th>
                <th>التقييم</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-table__product">
                      <span className="admin-table__thumb">{product.name.charAt(0)}</span>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.tagline}</span>
                      </div>
                    </div>
                  </td>
                  <td>{product.categoryLabel}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{discountPercent(product) > 0 ? `خصم ${discountPercent(product)}٪` : '—'}</td>
                  <td>
                    <input
                      className={`admin-stock-input${(product.stock ?? 0) <= LOW_STOCK_THRESHOLD ? ' is-low' : ''}`}
                      type="number"
                      min={0}
                      value={product.stock ?? 0}
                      onChange={(event) => setStock(product.id, event.target.value)}
                      aria-label={`مخزون ${product.name}`}
                    />
                  </td>
                  <td>{product.rating?.toFixed(1) ?? '—'}</td>
                  <td>
                    <button type="button" className="admin-table__link" onClick={() => openEdit(product)}>
                      تعديل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="admin-empty">
              <p>لا توجد منتجات مطابقة</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && editingProduct && (
        <div className="admin-modal-layer">
          <button type="button" className="overlay-backdrop" aria-label="إغلاق النموذج" onClick={() => setIsModalOpen(false)} />
          <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-product-title">
            <header className="admin-modal__head">
              <h2 id="admin-product-title">{adminProducts.some((item) => item.id === editingProduct.id) ? 'تعديل منتج' : 'منتج جديد'}</h2>
              <button type="button" className="icon-button icon-button--bordered" onClick={() => setIsModalOpen(false)} aria-label="إغلاق النموذج">✕</button>
            </header>

            <div className="admin-modal__body">
              <label className="admin-field">
                <span>الاسم</span>
                <input value={editingProduct.name} onChange={(event) => setEditingProduct({ ...editingProduct, name: event.target.value })} />
              </label>

              <label className="admin-field">
                <span>الوصف</span>
                <textarea rows={3} value={editingProduct.description} onChange={(event) => setEditingProduct({ ...editingProduct, description: event.target.value })} />
              </label>

              <div className="admin-field-grid">
                <label className="admin-field">
                  <span>السعر</span>
                  <input type="number" min={0} value={editingProduct.price} onChange={(event) => setEditingProduct({ ...editingProduct, price: Number(event.target.value) || 0 })} />
                </label>
                <label className="admin-field">
                  <span>الكمية</span>
                  <input type="number" min={0} value={editingProduct.stock} onChange={(event) => setEditingProduct({ ...editingProduct, stock: Number(event.target.value) || 0 })} />
                </label>
              </div>

              <div className="admin-field-grid">
                <label className="admin-field">
                  <span>القسم</span>
                  <select value={editingProduct.category} onChange={(event) => setEditingProduct({ ...editingProduct, category: event.target.value, categoryLabel: event.target.value === 'watches' ? 'ساعات' : 'إكسسوارات' })}>
                    <option value="watches">الساعات</option>
                    <option value="accessories">الإكسسوارات</option>
                  </select>
                </label>
                <label className="admin-field">
                  <span>الصورة (مسار محلي)</span>
                  <input value={editingProduct.image} onChange={(event) => setEditingProduct({ ...editingProduct, image: event.target.value })} />
                </label>
              </div>
            </div>

            <footer className="admin-modal__foot">
              <button type="button" className="button button--outline" onClick={() => setIsModalOpen(false)}>إلغاء</button>
              <button type="button" className="button button--primary" onClick={saveProduct} disabled={!editingProduct.name.trim()}>
                حفظ المنتج
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
