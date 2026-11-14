import { useMemo, useState } from 'react'
import { adminOrders, orderStatuses } from '../../data/admin'
import { products } from '../../data/products'
import { formatPrice } from '../../data/products'
import { StatusBadge } from './StatusBadge'
import { SalesChart } from './SalesChart'

const LOW_STOCK_THRESHOLD = 3

function dayKey(value) {
  return String(value ?? '')
}

export function AdminOverview({ onNavigate, onOpenOrder }) {
  const [period, setPeriod] = useState('14d')

  const validOrders = useMemo(
    () => adminOrders.filter((order) => order.status !== 'cancelled'),
    [],
  )

  const totalSales = useMemo(
    () => validOrders.reduce((total, order) => total + order.total, 0),
    [validOrders],
  )

  const ordersCount = adminOrders.length
  const avgOrderValue = validOrders.length
    ? Math.round(totalSales / validOrders.length)
    : 0

  const previousSales = Math.round(totalSales * 0.78)
  const salesChange = totalSales
    ? Math.round(((totalSales - previousSales) / previousSales) * 100)
    : 0

  const lowStockProducts = useMemo(
    () =>
      products
        .filter((product) => (product.stock ?? 0) <= LOW_STOCK_THRESHOLD)
        .map((product) => ({ product, stock: product.stock ?? 0 })),
    [],
  )

  const recentOrders = useMemo(
    () =>
      [...adminOrders]
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
        .slice(0, 5),
    [],
  )

  const topProducts = useMemo(() => {
    const totals = new Map()

    adminOrders.forEach((order) =>
      order.items.forEach((item) => {
        totals.set(
          item.productId,
          (totals.get(item.productId) ?? 0) + item.qty,
        )
      }),
    )

    return [...totals.entries()]
      .map(([productId, qty]) => ({
        productId,
        qty,
        product: products.find((item) => item.id === productId),
      }))
      .filter((item) => item.product)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 3)
  }, [])

  const chartData = useMemo(() => {
    const days = Number(period === '7d' ? 7 : period === '30d' ? 30 : 14)
    const buckets = new Map()

    validOrders.forEach((order) => {
      const key = dayKey(order.createdAt)
      buckets.set(key, (buckets.get(key) ?? 0) + order.total)
    })

    const today = new Date('2026-11-14T00:00:00')
    const values = []

    for (let index = days - 1; index >= 0; index -= 1) {
      const date = new Date(today.getTime() - index * 86400000)
      const key = date.toISOString().slice(0, 10)
      values.push({
        key,
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        value: buckets.get(key) ?? 0,
      })
    }

    return values
  }, [period, validOrders])

  const newOrdersCount = adminOrders.filter(
    (order) => order.status === 'new',
  ).length

  return (
    <div className="admin-page">
      <div className="admin-kpis">
        <section className="admin-kpi">
          <p className="admin-kpi__label">إجمالي المبيعات</p>
          <p className="admin-kpi__value">{formatPrice(totalSales)}</p>
          <p className="admin-kpi__hint">
            مقارنة بالفترة السابقة:{' '}
            <span className={salesChange >= 0 ? 'is-up' : 'is-down'}>
              {salesChange >= 0 ? '+' : ''}
              {salesChange}%
            </span>
          </p>
        </section>

        <section className="admin-kpi">
          <p className="admin-kpi__label">عدد الطلبات</p>
          <p className="admin-kpi__value">{ordersCount}</p>
          <p className="admin-kpi__hint">طلبات غير ملغية</p>
        </section>

        <section className="admin-kpi">
          <p className="admin-kpi__label">متوسط قيمة الطلب</p>
          <p className="admin-kpi__value">{formatPrice(avgOrderValue)}</p>
          <p className="admin-kpi__hint">بين الطلبات النشطة</p>
        </section>

        <section className="admin-kpi">
          <p className="admin-kpi__label">منتجات منخفضة المخزون</p>
          <p className="admin-kpi__value">{lowStockProducts.length}</p>
          <p className="admin-kpi__hint">أقل من {LOW_STOCK_THRESHOLD} قطعة</p>
        </section>
      </div>

      <div className="admin-grid">
        <section className="admin-panel admin-panel--chart">
          <header className="admin-panel__head">
            <div>
              <h2>المبيعات</h2>
              <p>حسب اليوم خلال الفترة المحددة</p>
            </div>
            <div className="admin-segmented">
              {(['7d', '14d', '30d']).map((value) => (
                <button
                  key={value}
                  type="button"
                  className={period === value ? 'is-active' : ''}
                  onClick={() => setPeriod(value)}
                >
                  {value === '7d' ? '٧ أيام' : value === '14d' ? '١٤ يومًا' : '٣٠ يومًا'}
                </button>
              ))}
            </div>
          </header>

          <SalesChart data={chartData} labels={chartData.map((item) => item.label)} formatValue={(value) => formatPrice(value)} />
        </section>

        <section className="admin-panel">
          <header className="admin-panel__head">
            <div>
              <h2>آخر الطلبات</h2>
              <p>أحدث الطلبات بانتظار المتابعة</p>
            </div>
            <button type="button" className="admin-link" onClick={() => onNavigate('orders')}>
              عرض الكل
            </button>
          </header>

          <ul className="admin-mini-list">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <button type="button" className="admin-mini-list__item" onClick={() => onOpenOrder(order)}>
                  <span className="admin-mini-list__code">{order.code}</span>
                  <span className="admin-mini-list__customer">{order.customer.name}</span>
                  <span className="admin-mini-list__total">{formatPrice(order.total)}</span>
                  <StatusBadge status={order.status} />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-panel">
          <header className="admin-panel__head">
            <div>
              <h2>يحتاج انتباهك</h2>
              <p>طلبات جديدة ومنتجات قاربت على النفاد</p>
            </div>
          </header>

          <ul className="admin-mini-list">
            {adminOrders
              .filter((order) => order.status === 'new')
              .map((order) => (
                <li key={order.id}>
                  <button type="button" className="admin-mini-list__item" onClick={() => onOpenOrder(order)}>
                    <span className="admin-mini-list__code">{order.code}</span>
                    <span className="admin-mini-list__customer">طلب جديد — {order.customer.name}</span>
                    <span className="admin-mini-list__total">{formatPrice(order.total)}</span>
                    <StatusBadge status={order.status} />
                  </button>
                </li>
              ))}

            {lowStockProducts.map(({ product, stock }) => (
              <li key={product.id}>
                <button type="button" className="admin-mini-list__item" onClick={() => onNavigate('products')}>
                  <span className="admin-mini-list__code">{product.name}</span>
                  <span className="admin-mini-list__customer">مخزون منخفض</span>
                  <span className="admin-mini-list__total">{stock} قطعة</span>
                  <StatusBadge status="preparing" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-panel">
          <header className="admin-panel__head">
            <div>
              <h2>أكثر المنتجات مبيعًا</h2>
              <p>حسب الكميات المُسلّمة في الطلبات</p>
            </div>
            <button type="button" className="admin-link" onClick={() => onNavigate('reports')}>
              التقارير
            </button>
          </header>

          <ul className="admin-mini-list">
            {topProducts.map((item) => (
              <li key={item.productId} className="admin-top-product">
                <span className="admin-top-product__thumb">{item.product?.name?.charAt(0) ?? 'ل'}</span>
                <div>
                  <strong>{item.product?.name}</strong>
                  <p>{item.qty} قطعة ممّتعت</p>
                </div>
                <span>{formatPrice((item.product?.price ?? 0) * item.qty)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="admin-panel">
        <header className="admin-panel__head">
          <div>
            <h2>مقارنة سريعة</h2>
            <p>بيانات الفترة الحالية والسابقة — تجريبية</p>
          </div>
        </header>
        <div className="admin-compare">
          <div>
            <span>الفترة الحالية</span>
            <strong>{formatPrice(totalSales)}</strong>
          </div>
          <div>
            <span>الفترة السابقة</span>
            <strong>{formatPrice(previousSales)}</strong>
          </div>
          <div>
            <span>تغيير المبيعات</span>
            <strong className={salesChange >= 0 ? 'is-up' : 'is-down'}>
              {salesChange >= 0 ? '+' : ''}
              {salesChange}%
            </strong>
          </div>
        </div>
      </section>
    </div>
  )
}
