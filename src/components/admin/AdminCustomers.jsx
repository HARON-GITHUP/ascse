import { useMemo, useState } from 'react'
import { adminCustomers } from '../../data/admin'
import { adminOrders } from '../../data/admin'
import { formatPrice } from '../../data/products'

export function AdminCustomers({ onOpenOrder }) {
  const [query, setQuery] = useState('')

  const filteredCustomers = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return adminCustomers

    return adminCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(needle) ||
        customer.email.toLowerCase().includes(needle) ||
        customer.city.toLowerCase().includes(needle),
    )
  }, [query])

  const customerOrders = (customerId) =>
    adminOrders.filter((order) =>
      adminCustomers.find((item) => item.id === customerId)?.email ===
      order.customer.email,
    )

  const getCustomerStats = (customerId) => {
    const orders = customerOrders(customerId).filter((order) => order.status !== 'cancelled')
    const spent = orders.reduce((total, order) => total + order.total, 0)
    return { orders: orders.length, spent }
  }

  return (
    <div className="admin-page">
      <div className="admin-panel">
        <header className="admin-panel__head">
          <div>
            <h2>العملاء</h2>
            <p>{adminCustomers.length} عميل مسجّل في النموذج</p>
          </div>
          <label className="admin-search admin-search--small">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث بالعميل أو البريد..."
            />
          </label>
        </header>

        <div className="admin-customer-grid">
          {filteredCustomers.map((customer) => {
            const stats = getCustomerStats(customer.id)

            return (
              <button
                key={customer.id}
                type="button"
                className="admin-customer-card"
                onClick={() => onOpenOrder(adminOrders.find((order) => order.customer.email === customer.email))}
              >
                <span className="admin-customer-card__avatar">{customer.name.charAt(0)}</span>
                <strong>{customer.name}</strong>
                <span>{customer.email}</span>
                <p>{customer.city}</p>
                <div>
                  <span>{stats.orders} طلب</span>
                  <strong>{formatPrice(stats.spent)}</strong>
                </div>
              </button>
            )
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="admin-empty">
            <p>لا توجد عملاء مطابقة</p>
          </div>
        )}
      </div>
    </div>
  )
}
