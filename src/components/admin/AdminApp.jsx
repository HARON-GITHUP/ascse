import { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'
import { AdminOverview } from './AdminOverview'
import { AdminOrders } from './AdminOrders'
import { AdminProducts } from './AdminProducts'
import { AdminCustomers } from './AdminCustomers'
import { AdminOffers } from './AdminOffers'
import { AdminReports } from './AdminReports'
import { AdminSettings } from './AdminSettings'
import { Toast } from '../Toast'
import { LockScreen } from './LockScreen'

const SECTION_META = {
  overview: { title: 'نظرة عامة', subtitle: 'ملخص المبيعات والمخاطر اليومية' },
  orders: { title: 'الطلبات', subtitle: 'إدارة ومتابعة الطلبات' },
  products: { title: 'المنتجات', subtitle: 'كتالوج المنتجات وإدارتها' },
  inventory: { title: 'المخزون', subtitle: 'مستويات المخزون ومنخفضها' },
  customers: { title: 'العملاء', subtitle: 'قائمة العملاء وتفاصيلهم' },
  offers: { title: 'العروض والخصومات', subtitle: 'إدارة العروض التجريبية' },
  reports: { title: 'التقارير', subtitle: 'تحليلات مبيعات بسيطة' },
  settings: { title: 'الإعدادات', subtitle: 'إعدادات اللوحة التجريبية' },
}

export function AdminApp({ onExit }) {
  const [isLocked, setIsLocked] = useState(true)
  const [section, setSection] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState(null)

  const notify = (message, tone = 'success') => {
    setToast({ message, tone, id: Date.now() })
    window.setTimeout(() => setToast(null), 3000)
  }

  const navigate = (nextSection) => {
    setSection(nextSection)
  }

  const meta = SECTION_META[section] ?? SECTION_META.overview

  const handleSearchSubmit = () => {
    setSection('orders')
  }

  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />
  }

  return (
    <div className="admin-shell">
      <AdminSidebar
        section={section}
        onNavigate={navigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed((current) => !current)}
      />

      <div className="admin-main">
        <AdminTopbar
          title={meta.title}
          subtitle={meta.subtitle}
          query={query}
          onQueryChange={setQuery}
          onNavigate={navigate}
          onOpenNotifications={() => notify('لا توجد إشعارات جديدة', 'info')}
          onOpenUser={() => setSection('settings')}
          onLock={() => setIsLocked(true)}
          onSearchSubmit={handleSearchSubmit}
        />

        <main className="admin-content">
          {section === 'overview' && <AdminOverview onNavigate={navigate} onOpenOrder={(order) => setSection('orders')} />}
          {section === 'orders' && <AdminOrders onNotify={notify} />}
          {section === 'products' && <AdminProducts onNotify={notify} />}
          {section === 'inventory' && <AdminProducts onNotify={notify} initialStockFilter="low" />}
          {section === 'customers' && <AdminCustomers onOpenOrder={(order) => setSection('orders')} />}
          {section === 'offers' && <AdminOffers onNotify={notify} />}
          {section === 'reports' && <AdminReports onNotify={notify} />}
          {section === 'settings' && <AdminSettings onNotify={notify} />}
        </main>
      </div>

      {toast && <Toast key={toast.id} message={toast.message} tone={toast.tone} />}
    </div>
  )
}
