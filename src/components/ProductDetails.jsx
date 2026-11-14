import { useEffect, useRef, useState } from 'react'
import { products } from '../data/products'
import { discountPercent, formatPrice } from '../data/products'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { CheckIcon, CloseIcon, HeartIcon, PlusIcon } from './Icons'
import { SmartImage } from './SmartImage'
import { Stars } from './Stars'
import { ProductCard } from './ProductCard'

const CATEGORY_INDEX = {
  watches: '٠١',
  accessories: '٠٢',
}

export function ProductDetails({
  product,
  isOpen,
  onClose,
  onAdd,
  onToggleFavorite,
  isFavorite = false,
  onToggleCompare,
  compareProducts = [],
  onOpenDetails,
  favorites = [],
}) {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const addTimer = useRef(null)

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState(
    product?.options?.[0]?.id ?? null,
  )
  const [justAdded, setJustAdded] = useState(false)

  useFocusTrap(panelRef, isOpen)

  useEffect(() => {
    if (!isOpen) return undefined
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 280)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(
    () => () => {
      window.clearTimeout(addTimer.current)
    },
    [],
  )

  const images = product?.images?.length
    ? product.images
    : [{ src: product?.image, alt: product?.alt }]
  const safeImageIndex = Math.min(
    Math.max(0, selectedImageIndex),
    Math.max(0, images.length - 1),
  )
  const selectedImage = images[safeImageIndex] ?? images[0]
  const selectedOption = product?.options?.find(
    (option) => option.id === selectedOptionId,
  )
  const discount = product ? discountPercent(product) : 0

  const suggestions = product
    ? products
        .filter(
          (item) =>
            item.id !== product.id && item.category !== product.category,
        )
        .slice(0, 2)
    : []

  const handleAdd = () => {
    if (!product) return
    onAdd(product)
    setJustAdded(true)
    window.clearTimeout(addTimer.current)
    addTimer.current = window.setTimeout(() => setJustAdded(false), 1600)
  }

  const handleOptionSelect = (optionId) => {
    setSelectedOptionId(optionId)
  }

  if (!product) return null

  return (
    <div className={`product-details-layer${isOpen ? ' is-open' : ''}`} inert={!isOpen}>
      <button
        type="button"
        className="overlay-backdrop"
        aria-label="إغلاق تفاصيل المنتج"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        id="product-details-dialog"
        className="product-details"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="icon-button icon-button--bordered product-details__close"
          onClick={onClose}
          aria-label="إغلاق تفاصيل المنتج"
        >
          <CloseIcon />
        </button>

        <div className="product-details__media">
          <SmartImage
            key={selectedImage?.src}
            className="product-details__image"
            src={selectedImage?.src}
            alt={selectedImage?.alt ?? product.alt}
            loading="eager"
            fetchPriority="high"
          />

          {images.length > 1 && (
            <div
              className="product-details__thumbs"
              role="group"
              aria-label="مقارنة صور المنتج"
            >
              {images.map((image, index) => (
                <button
                  key={`${image?.src}-${index}`}
                  type="button"
                  className={`product-details__thumb${
                    index === safeImageIndex ? ' is-active' : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`عرض الصورة ${index + 1}`}
                  aria-pressed={index === safeImageIndex}
                >
                  <SmartImage src={image?.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-details__body">
          <p className="eyebrow">
            <span className="eyebrow__index">
              {CATEGORY_INDEX[product.category] ?? '٠٥'}
            </span>
            <span>{product.categoryLabel}</span>
          </p>

          <h2 id="product-details-title">{product.name}</h2>

          <p className="product-details__tagline">{product.tagline}</p>

          <div className="product-details__rating">
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="product-details__pricing">
            <p className="product-details__price">
              <span>{formatPrice(product.price)}</span>
              {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
            </p>
            {discount > 0 && (
              <span className="product-card__discount">خصم {discount}٪</span>
            )}
          </div>

          <p className="product-details__desc">{product.description}</p>

          {product.options?.length > 0 && (
            <div className="product-details__options">
              <p className="product-details__options-label">الخيار</p>
              <div
                className="product-details__options-list"
                role="group"
                aria-label="خيارات المنتج"
              >
                {product.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`product-details__option${
                      option.id === selectedOptionId ? ' is-active' : ''
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                    aria-pressed={option.id === selectedOptionId}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {selectedOption && (
                <p className="product-details__option-value">
                  الوضع الحالي: {selectedOption.value}
                </p>
              )}
            </div>
          )}

          <div className="product-details__actions">
            <button
              type="button"
              className={`button button--primary product-details__add${
                justAdded ? ' is-added' : ''
              }`}
              onClick={handleAdd}
            >
              {justAdded ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
              <span>{justAdded ? 'تمت الإضافة' : 'أضف إلى السلة'}</span>
            </button>

            {product.category === 'watches' && (
              <button
                type="button"
                className={`product-details__compare${
                  compareProducts.some((item) => item.id === product.id)
                    ? ' is-active'
                    : ''
                }`}
                onClick={() => onToggleCompare(product)}
                aria-pressed={compareProducts.some((item) => item.id === product.id)}
              >
                <HeartIcon size={14} filled={false} />
                <span>
                  {compareProducts.some((item) => item.id === product.id)
                    ? 'في قائمة المقارنة'
                    : 'أضف للمقارنة'}
                </span>
              </button>
            )}

            <button
              type="button"
              className={`product-details__favorite${
                isFavorite ? ' is-active' : ''
              }`}
              onClick={() => onToggleFavorite(product)}
              aria-pressed={isFavorite}
            >
              <HeartIcon size={16} filled={isFavorite} />
              <span>{isFavorite ? 'في المفضلة' : 'المفضلة'}</span>
            </button>
          </div>

          <p className="product-details__demo">
            تفاصيل هذه النافذة بيانات تجريبية قابلة للتعديل من ملف المنتج.
          </p>

          {compareProducts.length > 0 && (
            <div className="product-details__compare">
              <h3>المقارنة ({compareProducts.length})</h3>
              <div className="compare-grid">
                {compareProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.includes(item.id)}
                    onOpenDetails={onOpenDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="product-details__suggestions">
              <h3>اقتراحات مقترحة</h3>
              <div className="compare-grid">
                {suggestions.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.includes(item.id)}
                    onOpenDetails={onOpenDetails}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
