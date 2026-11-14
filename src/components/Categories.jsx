import { categories } from '../data/content'
import { products } from '../data/products'
import { ArrowUpLeftIcon } from './Icons'
import { Reveal } from './Reveal'
import { SmartImage } from './SmartImage'

export function Categories({ onSelectCategory }) {
  return (
    <section className="section categories" aria-labelledby="categories-title">
      <div className="container">
        <Reveal className="section-heading categories__heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">01</span>
              <span>تسوّق حسب الفئة</span>
            </p>
            <h2 id="categories-title">اختر إيقاعك</h2>
          </div>
          <p className="section-heading__text">
            مجموعتان صغيرتان، مختارتان لتتكاملا معًا بسهولة. ابدأ من القطعة التي
            تشبه يومك.
          </p>
        </Reveal>

        <div className="categories__grid">
          {categories.map((category, index) => {
            const count = products.filter(
              (product) => product.category === category.id,
            ).length

            return (
              <Reveal key={category.id} delay={index * 100}>
                <button
                  type="button"
                  className={`category-card category-card--${category.tone}`}
                  onClick={() => onSelectCategory(category.id)}
                  aria-label={`تصفّح ${category.name}`}
                >
                  <SmartImage
                    className="category-card__image"
                    src={category.image}
                    alt={category.alt}
                  />
                  <span className="category-card__shade" aria-hidden="true" />
                  <span className="category-card__content">
                    <span className="category-card__eyebrow">
                      {category.eyebrow}
                    </span>
                    <span className="category-card__title">{category.name}</span>
                    <span className="category-card__description">
                      {category.description}
                    </span>
                    <span className="category-card__count">
                      {count} قطع مختارة
                    </span>
                  </span>
                  <span className="category-card__arrow" aria-hidden="true">
                    <ArrowUpLeftIcon size={18} />
                  </span>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
