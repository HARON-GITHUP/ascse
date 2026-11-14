import { useEffect, useRef } from 'react'
import { formatPrice } from '../data/products'
import { useFocusTrap } from '../hooks/useFocusTrap'
import {
  ArrowLeftIcon,
  CloseIcon,
  HeartIcon,
  PlusIcon,
  TrashIcon,
} from './Icons'
import { SmartImage } from './SmartImage'

export function FavoritesDrawer({
  isOpen,
  items,
  onClose,
  onAdd,
  onRemove,
  onAddAll,
  onContinue,
}) {
  const closeButtonRef = useRef(null)
  const panelRef = useRef(null)

  useFocusTrap(panelRef, isOpen)

  useEffect(() => {
    if (!isOpen) return undefined
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 280)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  const isEmpty = items.length === 0

  return (
    <div
      className={`favorites-layer${isOpen ? ' is-open' : ''}`}
      inert={!isOpen}
    >
      <button
        type="button"
        className="overlay-backdrop"
        aria-label="إغلاق المفضلة"
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        id="favorites-drawer"
        className="favorites-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="favorites-title"
      >
        <header className="favorites-drawer__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">محفوظاتك</span>
              <span>لونو</span>
            </p>
            <h2 id="favorites-title">
              المفضلة{' '}
              <span className="favorites-drawer__count">({items.length})</span>
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="icon-button icon-button--bordered"
            onClick={onClose}
            aria-label="إغلاق المفضلة"
          >
            <CloseIcon />
          </button>
        </header>

        {isEmpty ? (
          <div className="favorites-empty">
            <span className="favorites-empty__icon" aria-hidden="true">
              <HeartIcon size={30} />
            </span>
            <h3>لا توجد قطع محفوظة بعد</h3>
            <p>اضغطي على القلب في أي قطعة تحبينها، وستجدينها هنا.</p>
            <button
              type="button"
              className="button button--primary"
              onClick={onContinue}
            >
              <span>تصفّح المجموعة</span>
              <ArrowLeftIcon size={17} />
            </button>
          </div>
        ) : (
          <>
            <ul className="favorites-list">
              {items.map((product) => (
                <li className="favorite-item" key={product.id}>
                  <div className="favorite-item__media">
                    <SmartImage src={product.image} alt={product.alt} />
                  </div>

                  <div className="favorite-item__info">
                    <p className="favorite-item__category">
                      {product.categoryLabel}
                    </p>
                    <h3>{product.name}</h3>
                    <p className="favorite-item__price">
                      {formatPrice(product.price)}
                    </p>

                    <div className="favorite-item__actions">
                      <button
                        type="button"
                        className="favorite-item__add"
                        onClick={() => onAdd(product)}
                        aria-label={`إضافة ${product.name} إلى السلة`}
                      >
                        <PlusIcon size={13} />
                        <span>أضف للسلة</span>
                      </button>

                      <button
                        type="button"
                        className="favorite-item__remove"
                        onClick={() => onRemove(product.id)}
                        aria-label={`إزالة ${product.name} من المفضلة`}
                      >
                        <TrashIcon size={14} />
                        <span>إزالة</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="favorites-drawer__foot">
              <button
                type="button"
                className="button button--primary favorites-add-all"
                onClick={onAddAll}
              >
                <span>أضف الكل إلى السلة</span>
                <ArrowLeftIcon size={17} />
              </button>
              <button
                type="button"
                className="button button--text favorites-continue"
                onClick={onContinue}
              >
                متابعة التسوق
              </button>
              <p className="favorites-drawer__note">
                المفضلة محفوظة محليًا خلال هذه الجلسة فقط — لا يوجد حساب حقيقي.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
