import { useState } from 'react'
import { adminUser } from '../../data/admin'
import { formatPrice } from '../../data/products'

export function AdminSettings({ onNotify }) {
  const [lowStockThreshold, setLowStockThreshold] = useState(3)
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(200)
  const [storeName, setStoreName] = useState('LUNO')
  const [notifyStock, setNotifyStock] = useState(true)
  const [notifyOrders, setNotifyOrders] = useState(true)

  const save = () => {
    onNotify('تم حفظ إعدادات لوحة التحكم التجريبية', 'success')
  }

  return (
    <div className="admin-page">
      <div className="admin-panel admin-panel--narrow">
        <header className="admin-panel__head">
          <div>
            <h2>الإعدادات</h2>
            <p>إعدادات واجهة اللوحة — بيانات تجريبية</p>
          </div>
        </header>

        <div className="admin-form">
          <label className="admin-field">
            <span>اسم المتجر</span>
            <input value={storeName} onChange={(event) => setStoreName(event.target.value)} />
          </label>

          <label className="admin-field">
            <span>حد التوصيل المجاني (ر.س)</span>
            <input type="number" min={0} value={freeShippingThreshold} onChange={(event) => setFreeShippingThreshold(Number(event.target.value) || 0)} />
          </label>

          <label className="admin-field">
            <span>عتبة المخزون المنخفض (قطعة)</span>
            <input type="number" min={0} value={lowStockThreshold} onChange={(event) => setLowStockThreshold(Number(event.target.value) || 0)} />
          </label>

          <div className="admin-toggle-list">
            <label className="admin-toggle">
              <input type="checkbox" checked={notifyStock} onChange={(event) => setNotifyStock(event.target.checked)} />
              <span>إشعار عند انخفاض المخزون</span>
            </label>

            <label className="admin-toggle">
              <input type="checkbox" checked={notifyOrders} onChange={(event) => setNotifyOrders(event.target.checked)} />
              <span>إشعار الطلبات الجديدة</span>
            </label>
          </div>

          <button type="button" className="button button--primary" onClick={save}>
            حفظ الإعدادات
          </button>
        </div>

        <div className="admin-panel admin-panel--mt">
          <header className="admin-panel__head">
            <div>
              <h2>ملف المستخدم</h2>
              <p>معلومات الجلسة الحالية</p>
            </div>
          </header>
          <div className="admin-user admin-user--panel">
            <span className="admin-user__avatar">{adminUser.name.charAt(0)}</span>
            <div>
              <strong>{adminUser.name}</strong>
              <p>{adminUser.email}</p>
              <span>{adminUser.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
