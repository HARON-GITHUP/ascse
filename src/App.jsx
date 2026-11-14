import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnnouncementBar } from './components/AnnouncementBar'
import { AuthModal } from './components/AuthModal'
import { BrandNote } from './components/BrandNote'
import { CartDrawer } from './components/CartDrawer'
import { Categories } from './components/Categories'
import { FavoritesDrawer } from './components/FavoritesDrawer'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MobileMenu } from './components/MobileMenu'
import { Offers } from './components/Offers'
import { InfoSection } from './components/InfoSection'
import { ProductDetails } from './components/ProductDetails'
import { ProductSection } from './components/ProductSection'
import { ProductShowcase } from './components/ProductShowcase'
import { Reviews } from './components/Reviews'
import { StatsStrip } from './components/StatsStrip'
import { Toast } from './components/Toast'
import { AdminApp } from './components/admin/AdminApp'
import { LockScreen } from './components/admin/LockScreen'
import { products } from './data/products'
import { useBodyScrollLock } from './hooks/useBodyScrollLock'
import { focusProductSearch, scrollToId } from './utils/scroll'

const TOAST_DURATION = 2800
const PULSE_DURATION = 650

export default function App() {
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [detailsProduct, setDetailsProduct] = useState(null)
  const [compareIds, setCompareIds] = useState([])
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    try {
      return sessionStorage.getItem('luno-admin-open') === 'true'
    } catch {
      return false
    }
  })
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sort, setSort] = useState('featured')
  const [toast, setToast] = useState(null)
  const [cartPulse, setCartPulse] = useState(false)
  const [favoritePulse, setFavoritePulse] = useState(false)

  useEffect(() => {
    try {
      if (isAdminOpen) {
        sessionStorage.setItem('luno-admin-open', 'true')
      } else {
        sessionStorage.removeItem('luno-admin-open')
      }
    } catch {
      /* تجاوز — الوضع الافتراضي فقط */
    }
  }, [isAdminOpen])

  const timers = useRef({ toast: null, cartPulse: null, favoritePulse: null })
  const toastId = useRef(0)
  const cartTriggerRef = useRef(null)
  const favoritesTriggerRef = useRef(null)
  const menuTriggerRef = useRef(null)
  const authTriggerRef = useRef(null)
  const detailsFocusRef = useRef(null)

  const isDetailsOpen = detailsProduct !== null

  useBodyScrollLock(
    isCartOpen || isFavoritesOpen || isMenuOpen || isAuthOpen || isDetailsOpen,
  )

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
    cartTriggerRef.current?.focus({ preventScroll: true })
  }, [])

  const closeFavorites = useCallback(() => {
    setIsFavoritesOpen(false)
    favoritesTriggerRef.current?.focus({ preventScroll: true })
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    menuTriggerRef.current?.focus({ preventScroll: true })
  }, [])

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false)
    authTriggerRef.current?.focus({ preventScroll: true })
  }, [])

  const closeDetails = useCallback(() => {
    setDetailsProduct(null)
    detailsFocusRef.current?.focus({ preventScroll: true })
  }, [])

  const openDetails = useCallback((product) => {
    detailsFocusRef.current = document.activeElement
    setDetailsProduct(product)
  }, [])

  const handleToggleCompare = useCallback((product) => {
    setCompareIds((current) =>
      current.includes(product.id)
        ? current.filter((id) => id !== product.id)
        : [...current, product.id],
    )
  }, [])

  useEffect(
    () => () => {
      window.clearTimeout(timers.current.toast)
      window.clearTimeout(timers.current.cartPulse)
      window.clearTimeout(timers.current.favoritePulse)
    },
    [],
  )

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return

      if (isDetailsOpen) closeDetails()
      else if (isAuthOpen) closeAuth()
      else if (isCartOpen) closeCart()
      else if (isFavoritesOpen) closeFavorites()
      else if (isMenuOpen) closeMenu()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isDetailsOpen,
    isAuthOpen,
    isCartOpen,
    isFavoritesOpen,
    isMenuOpen,
    closeDetails,
    closeAuth,
    closeCart,
    closeFavorites,
    closeMenu,
  ])

  const notify = useCallback((message, tone = 'success') => {
    window.clearTimeout(timers.current.toast)
    toastId.current += 1
    setToast({ message, tone, id: toastId.current })
    timers.current.toast = window.setTimeout(
      () => setToast(null),
      TOAST_DURATION,
    )
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.qty, 0),
    [cart],
  )

  const favoriteProducts = useMemo(
    () =>
      favorites
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean),
    [favorites],
  )

  const bestSellerProducts = useMemo(
    () => products.filter((product) => product.bestSeller),
    [],
  )

  const newProducts = useMemo(
    () => products.filter((product) => product.isNew),
    [],
  )

  const offerProducts = useMemo(
    () => products.filter((product) => product.oldPrice),
    [],
  )

  const compareProducts = useMemo(
    () =>
      compareIds
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean),
    [compareIds],
  )

  const pulse = useCallback((key, setter) => {
    setter(true)
    window.clearTimeout(timers.current[key])
    timers.current[key] = window.setTimeout(
      () => setter(false),
      PULSE_DURATION,
    )
  }, [])

  const handleAdd = useCallback(
    (product) => {
      setCart((current) => {
        const existing = current.find((item) => item.product.id === product.id)
        if (!existing) return [...current, { product, qty: 1 }]

        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item,
        )
      })

      pulse('cartPulse', setCartPulse)
      notify(`أُضيفت «${product.name}» إلى السلة`)
    },
    [notify, pulse],
  )

  const handleQtyChange = useCallback((productId, delta) => {
    setCart((current) =>
      current.map((item) =>
        item.product.id === productId
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item,
      ),
    )
  }, [])

  const handleRemove = useCallback(
    (productId) => {
      const removed = cart.find((item) => item.product.id === productId)
      setCart((current) =>
        current.filter((item) => item.product.id !== productId),
      )
      if (removed) notify(`أُزيلت «${removed.product.name}» من السلة`, 'info')
    },
    [cart, notify],
  )

  const handleToggleFavorite = useCallback(
    (product) => {
      const exists = favorites.includes(product.id)

      setFavorites((current) =>
        exists
          ? current.filter((id) => id !== product.id)
          : [...current, product.id],
      )

      pulse('favoritePulse', setFavoritePulse)
      notify(
        exists
          ? `أُزيلت «${product.name}» من المفضلة`
          : `أُضيفت «${product.name}» إلى المفضلة`,
        exists ? 'info' : 'favorite',
      )
    },
    [favorites, notify, pulse],
  )

  const handleRemoveFavorite = useCallback(
    (productId) => {
      const product = products.find((item) => item.id === productId)
      setFavorites((current) => current.filter((id) => id !== productId))
      if (product) {
        notify(`أُزيلت «${product.name}» من المفضلة`, 'info')
      }
    },
    [notify],
  )

  const handleAddAllFavorites = useCallback(() => {
    if (favoriteProducts.length === 0) return

    setCart((current) => {
      const next = [...current]

      favoriteProducts.forEach((product) => {
        const index = next.findIndex(
          (item) => item.product.id === product.id,
        )

        if (index === -1) {
          next.push({ product, qty: 1 })
        } else {
          next[index] = { ...next[index], qty: next[index].qty + 1 }
        }
      })

      return next
    })

    setIsFavoritesOpen(false)
    setIsCartOpen(true)
    pulse('cartPulse', setCartPulse)
    notify(`أُضيفت ${favoriteProducts.length} قطع من المفضلة إلى السلة`)
  }, [favoriteProducts, notify, pulse])

  const handleOpenCart = () => {
    setIsMenuOpen(false)
    setIsFavoritesOpen(false)
    setIsAuthOpen(false)
    setIsCartOpen(true)
  }

  const handleOpenFavorites = () => {
    setIsMenuOpen(false)
    setIsCartOpen(false)
    setIsAuthOpen(false)
    setIsFavoritesOpen(true)
  }

  const handleOpenMenu = () => {
    setIsCartOpen(false)
    setIsFavoritesOpen(false)
    setIsAuthOpen(false)
    setIsMenuOpen(true)
  }

  const handleOpenAuth = () => {
    setIsMenuOpen(false)
    setIsCartOpen(false)
    setIsFavoritesOpen(false)
    setIsAuthOpen(true)
  }

  const handleSearch = () => {
    setIsMenuOpen(false)
    focusProductSearch()
  }

  const handleCategoryNavigate = (category) => {
    if (category) setActiveCategory(category)
    setQuery('')
    setPriceRange('all')
    scrollToId('products')
  }

  const handleCheckout = () => {
    notify('الدفع غير مفعّل في هذا النموذج التجريبي', 'info')
  }

  const handleContinueShopping = () => {
    closeCart()
    scrollToId('products')
  }

  const handleContinueFavorites = () => {
    closeFavorites()
    scrollToId('products')
  }

  return (
    <div className="app" id="top">
      <a className="skip-link" href="#products">
        تخطَّ إلى المنتجات
      </a>

      <AnnouncementBar />

      <Header
        cartCount={cartCount}
        favoritesCount={favorites.length}
        cartPulse={cartPulse}
        favoritePulse={favoritePulse}
        isMenuOpen={isMenuOpen}
        isCartOpen={isCartOpen}
        isFavoritesOpen={isFavoritesOpen}
        onOpenCart={handleOpenCart}
        onOpenFavorites={handleOpenFavorites}
        onOpenMenu={handleOpenMenu}
        onOpenAuth={handleOpenAuth}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSearch={handleSearch}
        onCategoryNavigate={handleCategoryNavigate}
        menuButtonRef={menuTriggerRef}
        cartButtonRef={cartTriggerRef}
        favoritesButtonRef={favoritesTriggerRef}
        authButtonRef={authTriggerRef}
      />

      <main>
        <Hero />

        <StatsStrip />

        <Categories onSelectCategory={handleCategoryNavigate} />

        <ProductShowcase
          id="bestsellers"
          eyebrowIndex="02"
          eyebrow="الأكثر مبيعًا"
          title="القطع التي يعود إليها الجميع"
          text="أربع قطع تجمع بين بساطة الشكل وحضور واضح. اختيارات تجريبية قابلة للتعديل بالكامل."
          products={bestSellerProducts}
          onAdd={handleAdd}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenDetails={openDetails}
          tone="cream"
          showRank
          actionLabel="تصفّح كل القطع"
        />

        <Offers
          products={offerProducts}
          onAdd={handleAdd}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenDetails={openDetails}
        />

        <ProductShowcase
          id="new-arrivals"
          eyebrowIndex="04"
          eyebrow="وصل حديثًا"
          title="إضافات هذا الموسم"
          text="قطع جديدة انضمت إلى المجموعة، بخطوط هادئة وتفاصيل صغيرة تصنع الفرق."
          products={newProducts}
          onAdd={handleAdd}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenDetails={openDetails}
          tone="paper"
          actionLabel="اكتشف المزيد"
        />

        <ProductSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          query={query}
          onQueryChange={setQuery}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sort={sort}
          onSortChange={setSort}
          onAdd={handleAdd}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenDetails={openDetails}
        />

        <Reviews />

        <BrandNote />
      </main>

      <InfoSection />

      <Footer />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        query={query}
        onQueryChange={setQuery}
        onSearchSubmit={handleSearch}
        onCategoryNavigate={handleCategoryNavigate}
        onOpenAuth={handleOpenAuth}
        onOpenFavorites={handleOpenFavorites}
        favoritesCount={favorites.length}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={closeCart}
        onQtyChange={handleQtyChange}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
        onContinue={handleContinueShopping}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        items={favoriteProducts}
        onClose={closeFavorites}
        onAdd={handleAdd}
        onRemove={handleRemoveFavorite}
        onAddAll={handleAddAllFavorites}
        onContinue={handleContinueFavorites}
      />

      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />

      {detailsProduct && (
        <ProductDetails
          product={detailsProduct}
          isOpen={isDetailsOpen}
          onClose={closeDetails}
          onAdd={handleAdd}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.includes(detailsProduct.id)}
          onToggleCompare={handleToggleCompare}
          compareProducts={compareProducts}
          onOpenDetails={openDetails}
          favorites={favorites}
        />
      )}

      {isAdminOpen && (
        <AdminApp
          onExit={() => {
            setIsAdminOpen(false)
          }}
        />
      )}

      {toast && (
        <Toast key={toast.id} message={toast.message} tone={toast.tone} />
      )}
    </div>
  )
}
