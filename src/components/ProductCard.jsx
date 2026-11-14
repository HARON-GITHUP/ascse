import { useEffect, useRef, useState } from 'react'
import { discountPercent, formatPrice } from '../data/products'
import { CheckIcon, HeartIcon, PlusIcon } from './Icons'
import { SmartImage } from './SmartImage'
import { Stars } from './Stars'

export function ProductCard({
  product,
  onAdd,
  onToggleFavorite,
  isFavorite = false,
  onOpenDetails,
  rank,
}) {
  const [justAdded, setJustAdded] = useState(false)
  const addedTimer = useRef(null)

  useEffect(
    () => () => {
      window.clearTimeout(addedTimer.current)
    },
    [],
  )

  const handleAdd = (event) => {
    event.stopPropagation()
    onAdd(product)
    setJustAdded(true)
    window.clearTimeout(addedTimer.current)
    addedTimer.current = window.setTimeout(() => setJustAdded(false), 1600)
  }

  const handleFavorite = (event) => {
    event.stopPropagation()
    onToggleFavorite(product)
  }

  const handleOpen = () => {
    if (onOpenDetails) onOpenDetails(product)
  }

  const discount = discountPercent(product)

  return (
    <article
      className="product-card"
      onClick={onOpenDetails ? handleOpen : undefined}
    >
      <div className="product-card__media">
        <div className="product-card__badges">
          {product.badge && (
            <span className="product-card__badge">{product.badge}</span>
          )}
          {discount > 0 && (
            <span className="product-card__discount">خصم {discount}٪</span>
          )}
        </div>

        {onToggleFavorite && (
          <button
            type="button"
            className={`product-card__favorite${isFavorite ? ' is-active' : ''}`}
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? `إزالة ${product.name} من المفضلة`
                : `إضافة ${product.name} إلى المفضلة`
            }
            aria-pressed={isFavorite}
          >
            <HeartIcon size={17} filled={isFavorite} />
          </button>
        )}

        <SmartImage src={product.image} alt={product.alt} />

        {rank && (
          <span className="product-card__rank" aria-hidden="true">
            {String(rank).padStart(2, '0')}
          </span>
        )}

        <span className="product-card__media-line" aria-hidden="true" />
      </div>

      <div className="product-card__body">
        <p className="product-card__category">
          <span>{product.categoryLabel}</span>
          <span className="product-card__dot" aria-hidden="true" />
          <span>{product.tagline}</span>
        </p>

        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__rating">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>

        <div className="product-card__footer">
          <p className="product-card__price">
            <span>{formatPrice(product.price)}</span>
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
          </p>

          <button
            type="button"
            className={`product-card__add${justAdded ? ' is-added' : ''}`}
            onClick={handleAdd}
            aria-label={`إضافة ${product.name} إلى السلة`}
          >
            {justAdded ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
            <span>{justAdded ? 'تمت الإضافة' : 'أضف للسلة'}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
