import { StarIcon } from './Icons'

export function Stars({ rating, reviews, size = 12 }) {
  const rounded = Math.round(rating)

  return (
    <span
      className="stars"
      aria-label={`تقييم ${rating} من ٥${
        reviews != null ? `، ${reviews} مراجعة تجريبية` : ''
      }`}
    >
      <span className="stars__icons" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((index) => (
          <StarIcon key={index} size={size} filled={index <= rounded} />
        ))}
      </span>
      <span className="stars__value" aria-hidden="true">
        {rating.toFixed(1)}
      </span>
      {reviews != null && (
        <span className="stars__count" aria-hidden="true">
          ({reviews})
        </span>
      )}
    </span>
  )
}
