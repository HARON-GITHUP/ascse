import { offer } from '../data/content'
import { useCountdown } from '../hooks/useCountdown'
import {
  ArrowLeftIcon,
  PauseIcon,
  PlayIcon,
  RotateIcon,
  SparkleIcon,
} from './Icons'
import { ProductCard } from './ProductCard'
import { Reveal } from './Reveal'

export function Offers({ products, onAdd, favorites, onToggleFavorite, onOpenDetails }) {
  const { hours, minutes, seconds, isRunning, toggle, reset } = useCountdown(
    offer.countdownMinutes * 60,
  )

  return (
    <section className="section offers" id="offers" aria-labelledby="offers-title">
      <div className="container">
        <Reveal className="offers__banner">
          <span className="offers__glow" aria-hidden="true" />

          <div className="offers__copy">
            <p className="eyebrow eyebrow--light">
              <SparkleIcon size={12} />
              <span>{offer.eyebrow}</span>
            </p>

            <h2 id="offers-title">
              {offer.title}
              <span>{offer.titleAccent}</span>
            </h2>

            <p className="offers__lead">{offer.description}</p>

            <div
              className="countdown"
              role="timer"
              aria-label="عدّاد تنازلي تجريبي للعرض"
            >
              <div className="countdown__units">
                <div className="countdown__unit">
                  <strong>{hours}</strong>
                  <span>ساعة</span>
                </div>
                <div className="countdown__unit">
                  <strong>{minutes}</strong>
                  <span>دقيقة</span>
                </div>
                <div className="countdown__unit">
                  <strong>{seconds}</strong>
                  <span>ثانية</span>
                </div>
              </div>

              <div className="countdown__actions">
                <button type="button" onClick={toggle}>
                  {isRunning ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
                  <span>{isRunning ? 'إيقاف مؤقت' : 'تشغيل'}</span>
                </button>
                <button type="button" onClick={reset}>
                  <RotateIcon size={13} />
                  <span>إعادة الضبط</span>
                </button>
              </div>

              <p className="countdown__note">{offer.note}</p>
            </div>

            <div className="offers__actions">
              <a className="button button--light" href="#offer-products">
                <span>تسوّق قطع العرض</span>
                <ArrowLeftIcon size={17} />
              </a>
              <span className="offers__demo">بيانات تجريبية</span>
            </div>
          </div>

          <div className="offers__visual" aria-hidden="true">
            <span className="offers__ring offers__ring--one" />
            <span className="offers__ring offers__ring--two" />
            <div className="offers__visual-card">
              <span className="offers__visual-kicker">LUNO SELECTS</span>
              <span className="offers__visual-discount">20%</span>
              <span className="offers__visual-text">على قطع مختارة</span>
              <span className="offers__visual-rule" />
              <span className="offers__visual-note">عرض تجريبي للواجهة</span>
            </div>
          </div>
        </Reveal>

        <div className="offers__products" id="offer-products">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index, 3) * 65}>
              <ProductCard
                product={product}
                onAdd={onAdd}
                onToggleFavorite={onToggleFavorite}
                onOpenDetails={onOpenDetails}
                isFavorite={favorites.includes(product.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
