import { useEffect, useRef } from 'react'
import { contact, navLinks } from '../data/content'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { scrollToId } from '../utils/scroll'
import {
  ArrowUpLeftIcon,
  CloseIcon,
  HeartIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  SparkleIcon,
  UserIcon,
} from './Icons'

export function MobileMenu({
  isOpen,
  onClose,
  query,
  onQueryChange,
  onSearchSubmit,
  onCategoryNavigate,
  onOpenAuth,
  onOpenFavorites,
  favoritesCount,
}) {
  const closeButtonRef = useRef(null)
  const panelRef = useRef(null)

  useFocusTrap(panelRef, isOpen)

  useEffect(() => {
    if (!isOpen) return undefined
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 300)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  const handleNav = (event, link) => {
    event.preventDefault()
    onClose()

    if (link.category) {
      onCategoryNavigate(link.category)
      return
    }

    if (link.target) {
      window.setTimeout(() => scrollToId(link.target), 60)
    }
  }

  return (
    <div
      className={`mobile-menu-layer${isOpen ? ' is-open' : ''}`}
      inert={!isOpen}
    >
      <button
        type="button"
        className="overlay-backdrop"
        aria-label="إغلاق قائمة التنقل"
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        id="mobile-menu"
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
      >
        <div className="mobile-menu__head">
          <div className="brand brand--small">
            <span className="brand__word">LUNO</span>
            <span className="brand__sub">ساعات وإكسسوارات</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="icon-button icon-button--bordered"
            onClick={onClose}
            aria-label="إغلاق القائمة"
          >
            <CloseIcon />
          </button>
        </div>

        <form
          className="mobile-search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            onSearchSubmit()
          }}
        >
          <label className="mobile-search__field">
            <SearchIcon size={19} />
            <span className="visually-hidden">ابحث في المنتجات</span>
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="ابحث عن ساعة أو إكسسوار..."
              autoComplete="off"
            />
          </label>
          <button type="submit" className="mobile-search__submit" aria-label="بحث">
            <ArrowUpLeftIcon size={18} />
          </button>
        </form>

        <div className="mobile-menu__quick">
          <button type="button" onClick={onOpenFavorites}>
            <HeartIcon size={18} />
            <span>المفضلة</span>
            <span className="mobile-menu__quick-count">{favoritesCount}</span>
          </button>

          <button type="button" onClick={onOpenAuth}>
            <UserIcon size={18} />
            <span>حسابي</span>
            <ArrowUpLeftIcon size={15} />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="تنقل الجوال">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => handleNav(event, link)}
            >
              <span className="mobile-menu__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{link.label}</span>
              <ArrowUpLeftIcon size={17} />
            </a>
          ))}
        </nav>

        <div className="mobile-menu__foot">
          <p className="mobile-menu__eyebrow">
            <SparkleIcon size={12} />
            نحب أن نسمع منك
          </p>
          <a href={`mailto:${contact.email}`}>
            <MailIcon size={17} />
            {contact.email}
          </a>
          <a href={contact.phoneHref} dir="ltr">
            <PhoneIcon size={17} />
            {contact.phone}
          </a>
          <p className="mobile-menu__note">
            نموذج تجريبي — لا توجد حسابات أو مصادقة أو دفع حقيقي.
          </p>
        </div>
      </aside>
    </div>
  )
}
