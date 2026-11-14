import { ArrowLeftIcon } from './Icons'
import { ProductCard } from './ProductCard'
import { Reveal } from './Reveal'

export function ProductShowcase({
  id,
  eyebrowIndex,
  eyebrow,
  title,
  text,
  products,
  onAdd,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  tone = 'cream',
  showRank = false,
  actionLabel,
  actionHref = '#products',
}) {
  return (
    <section
      className={`section showcase showcase--${tone}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">{eyebrowIndex}</span>
              <span>{eyebrow}</span>
            </p>
            <h2 id={`${id}-title`}>{title}</h2>
          </div>

          <div className="section-heading__aside">
            <p className="section-heading__text">{text}</p>
            {actionLabel && (
              <a className="button button--text showcase__action" href={actionHref}>
                {actionLabel}
                <ArrowLeftIcon size={16} />
              </a>
            )}
          </div>
        </Reveal>

        <div className="products__grid showcase__grid">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index, 3) * 65}>
              <ProductCard
                product={product}
                onAdd={onAdd}
                onToggleFavorite={onToggleFavorite}
                onOpenDetails={onOpenDetails}
                isFavorite={favorites.includes(product.id)}
                rank={showRank ? index + 1 : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
