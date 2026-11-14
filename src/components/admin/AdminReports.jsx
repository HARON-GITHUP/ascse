import { useMemo, useState } from 'react'
import { adminOrders } from '../../data/admin'
import { products } from '../../data/products'
import { formatPrice } from '../../data/products'
import { SalesChart } from './SalesChart'
import { StatusBadge } from './StatusBadge'

function toCsvValue(value) {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function downloadCsv(rows, filename) {
  const csv = [
    ['البيانات', 'القيمة'].join(','),
    ...rows.map((row) => [row.label, row.value].map(toCsvValue).join(',')),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export function AdminReports({ onNotify }) {
  const [period, setPeriod] = useState('14d')

  const salesByDay = useMemo(() => {
    const days = Number(period === '7d' ? 7 : period === '30d' ? 30 : 14)
    const buckets = new Map()
    const today = new Date('2026-11-14T00:00:00')

    adminOrders
      .filter((order) => order.status !== 'cancelled')
      .forEach((order) => {
        const key = String(order.createdAt)
        buckets.set(key, (buckets.get(key) ?? 0) + order.total)
      })

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
  }, [period])

  const topProducts = useMemo(() => {
    const totals = new Map()
    adminOrders.forEach((order) =>
      order.items.forEach((item) => {
        totals.set(item.productId, (totals.get(item.productId) ?? 0) + item.qty)
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
      .slice(0, 5)
  }, [])

  const statusCounts = useMemo(() => {
    const counts = new Map()
    adminOrders.forEach((order) => {
      counts.set(order.status, (counts.get(order.status) ?? 0) + 1)
    })
    return counts
  }, [])

  const totalSales = useMemo(
    () =>
      adminOrders
        .filter((order) => order.status !== 'cancelled')
        .reduce((total, order) => total + order.total, 0),
    [],
  )

  const exportReport = () => {
    const rows = [
      { label: 'إجمالي المبيعات', value: formatPrice(totalSales) },
      { label: 'عدد الطلبات', value: String(adminOrders.length) },
      { label: 'متوسط قيمة الطلب', value: formatPrice(Math.round(totalSales / Math.max(1, adminOrders.filter((o) => o.status !== 'cancelled').length))) },
    ]

    downloadCsv(rows, 'luno-report.csv')
    onNotify('تم إنشاء ملف التقرير التجريبي', 'success')
  }

  return (
    <div className="admin-page">
      <div className="admin-panel">
        <header className="admin-panel__head">
          <div>
            <h2>التقارير</h2>
            <p>مبيعات وفترات زمنية — بيانات تجريبية</p>
          </div>
          <div className="admin-toolbar">
            <div className="admin-segmented">
              {(['7d', '14d', '30d']).map((value) => (
                <button key={value} type="button" className={period === value ? 'is-active' : ''} onClick={() => setPeriod(value)}>
                  {value === '7d' ? '٧ أيام' : value === '14d' ? '١٤ يومًا' : '٣٠ يومًا'}
                </button>
              ))}
            </div>
            <button type="button" className="button button--outline" onClick={exportReport}>
              تصدير CSV
            </button>
          </div>
        </header>

        <div className="admin-kpis admin-kpis--compact">
          <section className="admin-kpi">
            <p className="admin-kpi__label">المبيعات الكلية</p>
            <p className="admin-kpi__value">{formatPrice(totalSales)}</p>
          </section>
          <section className="admin-kpi">
            <p className="admin-kpi__label">الطلبات</p>
            <p className="admin-kpi__value">{adminOrders.length}</p>
          </section>
          <section className="admin-kpi">
            <p className="admin-kpi__label">أعلى منتج</p>
            <p className="admin-kpi__value">{topProducts[0]?.product?.name ?? '—'}</p>
          </section>
        </div>

        <SalesChart data={salesByDay} labels={salesByDay.map((item) => item.label)} formatValue={(value) => formatPrice(value)} />

        <div className="admin-grid">
          <section className="admin-panel">
            <header className="admin-panel__head">
              <div>
                <h2>أعلى المنتجات</h2>
                <p>الكميات المباعة</p>
              </div>
            </header>
            <ul className="admin-mini-list">
              {topProducts.map((item) => (
                <li key={item.productId} className="admin-top-product">
                  <span className="admin-top-product__thumb">{item.product?.name?.charAt(0) ?? 'ل'}</span>
                  <div>
                    <strong>{item.product?.name}</strong>
                    <p>{item.qty} قطعة</p>
                  </div>
                  <span>{formatPrice((item.product?.price ?? 0) * item.qty)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="admin-panel">
            <header className="admin-panel__head">
              <div>
                <h2>توزيع الحالات</h2>
                <p>حسب الطلبات المسجلة</p>
              </div>
            </header>
            <ul className="admin-status-list">
              {[...statusCounts.entries()].map(([status, count]) => (
                <li key={status}>
                  <StatusBadge status={status} />
                  <span>{count}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
