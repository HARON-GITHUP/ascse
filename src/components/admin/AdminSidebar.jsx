import {
  BagIcon,
  ChartIcon,
  HeartIcon,
  MenuIcon,
  PackageIcon,
  SettingsIcon,
  SparkleIcon,
  UserIcon,
  WatchIcon,
} from '../Icons'

const NAV_ITEMS = [
  { id: 'overview', label: 'نظرة عامة', icon: WatchIcon },
  { id: 'orders', label: 'الطلبات', icon: BagIcon },
  { id: 'products', label: 'المنتجات', icon: SparkleIcon },
  { id: 'inventory', label: 'المخزون', icon: PackageIcon },
  { id: 'customers', label: 'العملاء', icon: UserIcon },
  { id: 'offers', label: 'العروض والخصومات', icon: HeartIcon },
  { id: 'reports', label: 'التقارير', icon: ChartIcon },
  { id: 'settings', label: 'الإعدادات', icon: SettingsIcon },
]

export const ADMIN_SECTIONS = NAV_ITEMS

export function AdminSidebar({
  section,
  onNavigate,
  collapsed,
  onToggle,
}) {
  return (
    <aside className={`admin-sidebar${collapsed ? ' is-collapsed' : ''}`}>
      <div className="admin-sidebar__head">
        <button
          type="button"
          className="admin-sidebar__toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'فتح الشريط الجانبي' : 'تصغير الشريط الجانبي'}
          aria-expanded={!collapsed}
        >
          <MenuIcon size={18} />
        </button>

        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">L</span>
          <span className="admin-sidebar__name">LUNO</span>
          <span className="admin-sidebar__sub">لوحة التحكم</span>
        </div>
      </div>

      <nav className="admin-nav" aria-label="تنقل لوحة التحكم">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = section === item.id
          return (
            <button
              key={item.id}
              type="button"
              className={`admin-nav__item${isActive ? ' is-active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} />
              <span className="admin-nav__label">{item.label}</span>
              {isActive && <span className="admin-nav__dot" aria-hidden="true" />}
            </button>
          )
        })}
      </nav>

      <div className="admin-sidebar__foot">
        <p className="admin-sidebar__demo">واجهة إدارة تجريبية</p>
        <p className="admin-sidebar__note">
          البيانات محلية وعرضة للعرض فقط.
        </p>
      </div>
    </aside>
  )
}
