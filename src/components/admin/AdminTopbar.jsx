import { useMemo, useRef, useState } from 'react'
import { adminNotifications, adminUser } from '../../data/admin'
import { BellIcon, CloseIcon, LockIcon, SearchIcon, UserIcon } from '../Icons'

export function AdminTopbar({
  title,
  subtitle,
  query,
  onQueryChange,
  onNavigate,
  onOpenNotifications,
  onOpenUser,
  onSearchSubmit,
  onLock,
}) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const panelRef = useRef(null)
  const notifRef = useRef(null)
  const userRef = useRef(null)

  const visibleNotifications = useMemo(
    () => adminNotifications.slice(0, 4),
    [],
  )

  const toggleNotifications = () => {
    setIsNotificationsOpen((current) => !current)
    setIsUserOpen(false)
  }

  const toggleUser = () => {
    setIsUserOpen((current) => !current)
    setIsNotificationsOpen(false)
  }

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="admin-topbar__actions">
        <label className="admin-search">
          <SearchIcon size={17} />
          <span className="visually-hidden">بحث عام في لوحة التحكم</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') onSearchSubmit?.()
            }}
            placeholder="ابحث في الطلبات أو المنتجات..."
          />
        </label>

        <div className="admin-topbar__menu-wrap" ref={notifRef}>
          <button
            type="button"
            className="icon-button header__action"
            onClick={onLock}
            aria-label="قفل لوحة التحكم"
            title="قفل اللوحة"
          >
            <LockIcon />
          </button>

          <button
            type="button"
            className="icon-button header__action"
            onClick={toggleNotifications}
            aria-label="الإشعارات"
            aria-expanded={isNotificationsOpen}
          >
            <BellIcon />
          </button>

          {isNotificationsOpen && (
            <div className="admin-popover" role="dialog" aria-label="الإشعارات">
              <div className="admin-popover__head">
                <strong>إشعارات</strong>
                <button
                  type="button"
                  className="admin-popover__close"
                  onClick={toggleNotifications}
                  aria-label="إغلاق الإشعارات"
                >
                  <CloseIcon size={14} />
                </button>
              </div>

              <ul className="admin-notifications">
                {visibleNotifications.map((item) => (
                  <li key={item.id} className="admin-notification">
                    <span className="admin-notification__dot" aria-hidden="true" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                      <span>{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="admin-topbar__menu-wrap" ref={userRef}>
          <button
            type="button"
            className="icon-button header__action"
            onClick={toggleUser}
            aria-label="ملف المستخدم"
            aria-expanded={isUserOpen}
          >
            <UserIcon size={19} />
          </button>

          {isUserOpen && (
            <div className="admin-popover" role="dialog" aria-label="ملف المستخدم">
              <div className="admin-popover__head">
                <strong>{adminUser.name}</strong>
                <button
                  type="button"
                  className="admin-popover__close"
                  onClick={toggleUser}
                  aria-label="إغلاق الملف"
                >
                  <CloseIcon size={14} />
                </button>
              </div>

              <div className="admin-user">
                <span className="admin-user__avatar" aria-hidden="true">
                  {adminUser.name.charAt(0)}
                </span>
                <div>
                  <strong>{adminUser.name}</strong>
                  <p>{adminUser.email}</p>
                  <span>{adminUser.role}</span>
                </div>
              </div>

              <button
                type="button"
                className="admin-popover__action"
                onClick={() => onNavigate('settings')}
              >
                الإعدادات
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
