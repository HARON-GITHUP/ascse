import { navLinks } from '../data/content'
import {
  BagIcon,
  HeartIcon,
  LockIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from './Icons'

export function Header({
  cartCount,
  favoritesCount,
  cartPulse,
  favoritePulse,
  isMenuOpen,
  isCartOpen,
  isFavoritesOpen,
  onOpenCart,
  onOpenFavorites,
  onOpenMenu,
  onOpenAuth,
  onOpenAdmin,
  onSearch,
  onCategoryNavigate,
  menuButtonRef,
  cartButtonRef,
  favoritesButtonRef,
  authButtonRef,
}) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <button
          ref={menuButtonRef}
          type="button"
          className="icon-button header__menu-button"
          onClick={onOpenMenu}
          aria-label="فتح قائمة التنقل"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
        >
          <MenuIcon />
        </button>

        <a className="brand" href="#top" aria-label="LUNO — الصفحة الرئيسية">
          <span className="brand__word">LUNO</span>
          <span className="brand__sub">ساعات وإكسسوارات</span>
        </a>

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => {
                if (!link.category) return
                event.preventDefault()
                onCategoryNavigate(link.category)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-button header__action"
            onClick={onSearch}
            aria-label="البحث في المنتجات"
          >
            <SearchIcon />
          </button>

          <span className="header__divider" aria-hidden="true" />

          <button
            ref={favoritesButtonRef}
            type="button"
            className="icon-button header__action header__favorites"
            onClick={onOpenFavorites}
            aria-label={`فتح المفضلة، ${favoritesCount} قطعة`}
            aria-expanded={isFavoritesOpen}
            aria-controls="favorites-drawer"
            aria-haspopup="dialog"
          >
            <HeartIcon size={20} filled={favoritesCount > 0} />
            {favoritesCount > 0 && (
              <span
                className={`cart-badge cart-badge--favorite${
                  favoritePulse ? ' is-pulsing' : ''
                }`}
                aria-hidden="true"
              >
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            ref={authButtonRef}
            type="button"
            className="icon-button header__action header__account"
            onClick={onOpenAuth}
            aria-label="تسجيل الدخول أو إنشاء حساب"
            aria-haspopup="dialog"
            aria-controls="auth-dialog"
          >
            <UserIcon size={20} />
          </button>

          <button
            type="button"
            className="icon-button header__action header__admin"
            onClick={onOpenAdmin}
            aria-label="فتح لوحة التحكم"
          >
            <LockIcon size={18} />
          </button>

          <button
            ref={cartButtonRef}
            type="button"
            className="icon-button header__action header__cart"
            onClick={onOpenCart}
            aria-label={`فتح سلة التسوق، ${cartCount} قطعة`}
            aria-expanded={isCartOpen}
            aria-controls="cart-drawer"
            aria-haspopup="dialog"
          >
            <BagIcon />
            {cartCount > 0 && (
              <span
                className={`cart-badge${cartPulse ? ' is-pulsing' : ''}`}
                aria-hidden="true"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
