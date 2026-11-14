import { useMemo, useState } from 'react'
import { adminOrders, orderStatuses, orderStatusTones } from '../../data/admin'
import { formatPrice } from '../../data/products'
import { StatusBadge } from './StatusBadge'
import { ConfirmDialog } from './ConfirmDialog'

export function AdminOrders({ onNotify }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const filteredOrders = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return [...adminOrders]
      .filter((order) => statusFilter === 'all' || order.status === statusFilter)
      .filter((order) => {
        if (!needle) return true
        const customer = order.customer.name + order.customer.email + order.code
        const items = order.items.map((item) => item.name).join(' ')
        return customer.toLowerCase().includes(needle) || items.toLowerCase().includes(needle)
      })
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
  }, [query, statusFilter])

  const selectedOrder = adminOrders.find(
    (order) => order.id === selectedOrderId,
  ) ?? null

  const changeStatus = (orderId, status) => {
    const order = adminOrders.find((item) => item.id === orderId)
    if (!order) return
    order.status = status
    onNotify(`تم تحديث الطلب ${order.code} إلى «${status}»`, 'success')
  }

  const runConfirm = () => {
    if (!confirm?.order) return
    if (confirm.action === 'cancel') {
      changeStatus(confirm.order.id, 'cancelled')
    }
    setConfirm(null)
  }

  const deleteOrder = () => {
    if (!confirm?.order) return
    onNotify(`تم حذف الطلب ${confirm.order.code} من القائمة`, 'info')
    setConfirm(null)
  }

  return (
    <div className="admin-page">
      <div className="admin-panel">
        <header className="admin-panel__head">
          <div>
            <h2>الطلبات</h2>
            <p>{filteredOrders.length} من {adminOrders.length} طلب</p>
          </div>

          <div className="admin-toolbar">
            <label className="admin-search admin-search--small">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث بالعميل أو الطلب أو المنتج..."
              />
            </label>

            <select
              className="admin-select"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="تصفية حالة الطلب"
            >
              <option value="all">كل الحالات</option>
              {orderStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>الطلب</th>
                <th>العميل</th>
                <th>المنتجات</th>
                <th>التاريخ</th>
                <th>الإجمالي</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <button type="button" className="admin-table__link" onClick={() => setSelectedOrderId(order.id)}>
                      {order.code}
                    </button>
                  </td>
                  <td>
                    <div className="admin-table__customer">
                      <strong>{order.customer.name}</strong>
                      <span>{order.customer.email}</span>
                    </div>
                  </td>
                  <td>{order.items.reduce((total, item) => total + item.qty, 0)} قطعة</td>
                  <td>{order.createdAt}</td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="admin-empty">
              <p>لا توجد طلبات مطابقة</p>
              <button type="button" className="button button--outline" onClick={() => { setQuery(''); setStatusFilter('all') }}>
                مسح المرشحات
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="admin-drawer-layer">
          <button type="button" className="overlay-backdrop" aria-label="إغلاق الطلب" onClick={() => setSelectedOrderId(null)} />
          <aside className="admin-drawer" role="dialog" aria-modal="true" aria-labelledby="admin-order-title">
            <header className="admin-drawer__head">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow__index">طلب</span>
                  <span>لونو</span>
                </p>
                <h2 id="admin-order-title">{selectedOrder.code}</h2>
              </div>
              <button type="button" className="icon-button icon-button--bordered" onClick={() => setSelectedOrderId(null)} aria-label="إغلاق الطلب">
                ✕
              </button>
            </header>

            <div className="admin-drawer__body">
              <section>
                <h3>العميل</h3>
                <p>
                  {selectedOrder.customer.name} — {selectedOrder.customer.email}
                </p>
                <p>{selectedOrder.address.city}</p>
              </section>

              <section>
                <h3>المنتجات</h3>
                <ul className="admin-order-items">
                  {selectedOrder.items.map((item) => (
                    <li key={item.productId}>
                      <span>{item.name}</span>
                      <span>× {item.qty}</span>
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>
                <p className="admin-order-total">الإجمالي: {formatPrice(selectedOrder.total)}</p>
              </section>

              <section>
                <h3>الحالة</h3>
                <div className="admin-status-actions">
                  {orderStatuses
                    .filter((status) => status.id !== 'cancelled')
                    .map((status) => (
                      <button
                        key={status.id}
                        type="button"
                        className={`admin-status-btn${selectedOrder.status === status.id ? ' is-active' : ''}`}
                        onClick={() => changeStatus(selectedOrder.id, status.id)}
                      >
                        {status.label}
                      </button>
                    ))}
                  <button
                    type="button"
                    className={`admin-status-btn admin-status-btn--danger${selectedOrder.status === 'cancelled' ? ' is-active' : ''}`}
                    onClick={() => setConfirm({ order: selectedOrder, action: 'cancel' })}
                  >
                    إلغاء
                  </button>
                </div>
              </section>
            </div>
          </aside>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(confirm)}
        title={confirm?.action === 'delete' ? 'حذف الطلب' : 'إلغاء الطلب'}
        message={
          confirm?.action === 'delete'
            ? `هل تريد حذف الطلب ${confirm?.order?.code}؟`
            : `هل تريد إلغاء الطلب ${confirm?.order?.code}؟`
        }
        confirmLabel={confirm?.action === 'delete' ? 'حذف' : 'إلغاء الطلب'}
        onConfirm={confirm?.action === 'delete' ? deleteOrder : runConfirm}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
