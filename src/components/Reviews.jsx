import { reviews, reviewsNote } from '../data/content'
import { QuoteIcon } from './Icons'
import { Reveal } from './Reveal'
import { Stars } from './Stars'

export function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <Reveal className="section-heading reviews__heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">06</span>
              <span>آراء العملاء</span>
            </p>
            <h2 id="reviews-title">قالوا عن لونو</h2>
          </div>
          <p className="reviews__note">{reviewsNote}</p>
        </Reveal>

        <div className="reviews__grid">
          {reviews.map((review, index) => (
            <Reveal
              as="article"
              className="review-card"
              key={review.id}
              delay={index * 80}
            >
              <span className="review-card__quote" aria-hidden="true">
                <QuoteIcon size={30} />
              </span>

              <Stars rating={review.rating} size={13} />

              <blockquote>
                <p>{review.text}</p>
              </blockquote>

              <footer>
                <span className="review-card__avatar" aria-hidden="true">
                  {review.name.charAt(0)}
                </span>
                <div className="review-card__author">
                  <strong>{review.name}</strong>
                  <span>
                    {review.city} · {review.product}
                  </span>
                </div>
                <span className="review-card__demo">عرض تجريبي</span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
