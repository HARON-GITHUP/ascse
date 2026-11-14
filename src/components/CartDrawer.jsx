import { useEffect, useRef } from 'react'
import { shippingThreshold } from '../data/content'
import { formatPrice } from '../data/products'
import { useFocusTrap } from '../hooks/useFocusTrap'
import {
  ArrowLeftIcon,
  BagIcon,
  CheckIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  TruckIcon,
} from './Icons'

function formatShipping(value) {
  return value === 0 ? 'مجاني' : formatPrice(value)
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onQtyChange,
  onRemove,
  onCheckout,
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

  const count = items.reduce((total, item) => total + item.qty, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.qty,
    0,
  )
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 25
  const total = subtotal + shipping
  const remaining = Math.max(shippingThreshold - subtotal, 0)
  const progress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100))
  const isEmpty = items.length === 0

  return (
    <div
      className={`cart-layer${isOpen ? ' is-open' : ''}`}
      inert={!isOpen}
    >
      <button
        type="button"
        className="overlay-backdrop"
        aria-label="إغلاق سلة التسوق"
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <header className="cart-drawer__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">حقيبة</span>
              <span>لونو</span>
            </p>
            <h2 id="cart-title">
              سلة التسوق <span className="cart-drawer__count">({count})</span>
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="icon-button icon-button--bordered"
            onClick={onClose}
            aria-label="إغلاق السلة"
          >
            <CloseIcon />
          </button>
        </header>

        {isEmpty ? (
          <div className="cart-empty">
            <span className="cart-empty__icon" aria-hidden="true">
              <BagIcon size={30} />
            </span>
            <h3>سلتك فارغة الآن</h3>
            <p>املأها بقطعة تحبها، وستظهر تفاصيلها هنا.</p>
            <button type="button" className="button button--primary" onClick={onContinue}>
              <span>تصفّح المجموعة</span>
              <ArrowLeftIcon size={17} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-shipping">
              <p className="cart-shipping__text">
                {remaining > 0 ? (
                  <>
                    تبقّى <strong>{formatPrice(remaining)}</strong> للحصول على توصيل
                    مجاني
                  </>
                ) : (
                  <span className="cart-shipping__done">
                    <CheckIcon size={15} />
                    توصيلك مجاني — أحسنت الاختيار
                  </span>
                )}
              </p>
              <div
                className="cart-shipping__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="التقدّم نحو التوصيل المجاني"
              >
                <span
                  className="cart-shipping__bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="cart-shipping__hint">
                <TruckIcon size={15} />
                التوصيل مجاني للطلبات فوق {formatPrice(shippingThreshold)}
              </p>
            </div>

            <ul className="cart-list">
              {items.map(({ product, qty }) => (
                <li className="cart-item" key={product.id}>
                  <div className="cart-item__media">
                    <img src={product.image} alt={product.alt} loading="lazy" />
                  </div>

                  <div className="cart-item__info">
                    <p className="cart-item__category">{product.categoryLabel}</p>
                    <h3>{product.name}</h3>
                    <p className="cart-item__price">
                      {formatPrice(product.price * qty)}
                    </p>

                    <div className="cart-item__row">
                      <div
                        className="qty-control"
                        role="group"
                        aria-label={`كمية ${product.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => onQtyChange(product.id, -1)}
                          disabled={qty <= 1}
                          aria-label={`تقليل كمية ${product.name}`}
                        >
                          <MinusIcon size={14} />
                        </button>
                        <span aria-live="polite">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onQtyChange(product.id, 1)}
                          aria-label={`زيادة كمية ${product.name}`}
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => onRemove(product.id)}
                        aria-label={`إزالة ${product.name} من السلة`}
                      >
                        <TrashIcon size={15} />
                        <span>إزالة</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart-drawer__foot">
              <dl className="cart-summary">
                <div>
                  <dt>المجموع الفرعي</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div>
                  <dt>التوصيل</dt>
                  <dd className={shipping === 0 ? 'is-free' : undefined}>
                    {formatShipping(shipping)}
                  </dd>
                </div>
                <div className="cart-summary__total">
                  <dt>الإجمالي</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="button button--primary cart-checkout"
                onClick={onCheckout}
              >
                <span>إتمام الطلب</span>
                <ArrowLeftIcon size={17} />
              </button>

              <p className="cart-drawer__note">
                نموذج تجريبي — الدفع غير مفعّل ولن تُخصم أي مبالغ.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
