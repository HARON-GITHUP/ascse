import { CheckIcon, HeartIcon, SparkleIcon } from './Icons'

export function Toast({ message, tone = 'success' }) {
  const isFavorite = tone === 'favorite'
  const Icon = isFavorite ? HeartIcon : tone === 'info' ? SparkleIcon : CheckIcon

  return (
    <div className={`toast toast--${tone}`} role="status" aria-live="polite">
      <span className="toast__icon" aria-hidden="true">
        {isFavorite ? (
          <HeartIcon size={13} filled />
        ) : tone === 'info' ? (
          <SparkleIcon size={13} />
        ) : (
          <CheckIcon size={13} />
        )}
      </span>
      <span>{message}</span>
    </div>
  )
}
