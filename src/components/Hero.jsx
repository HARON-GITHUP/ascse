import { heroImageCredit } from '../data/content'
import { discountPercent, products } from '../data/products'
import { ArrowLeftIcon, SparkleIcon } from './Icons'
import { SmartImage } from './SmartImage'

const topDiscount = Math.max(...products.map((product) => discountPercent(product)))

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__wash" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <SparkleIcon size={12} />
            <span>مجموعة ٢٠٢٦</span>
            <span className="eyebrow__rule" aria-hidden="true" />
            <span className="eyebrow__latin">LUNO EDIT</span>
          </p>

          <h1 className="hero__title" id="hero-title">
            تفاصيل صغيرة،
            <span>حضور لا يُنسى.</span>
          </h1>

          <p className="hero__lead">
            ساعات وإكسسوارات مختارة بهدوء، تجمع بين بساطة الشكل ودقّة التفاصيل.
            قطع ترافق يومك، وتترك أثرًا بلا ضجيج.
          </p>

          <a className="hero__offer" href="#offers">
            <span className="hero__offer-dot" aria-hidden="true" />
            <span className="hero__offer-text">
              <strong>حتى {topDiscount}٪</strong>
              <span>على قطع مختارة هذا الأسبوع</span>
            </span>
            <span className="hero__offer-demo">عرض تجريبي</span>
          </a>

          <div className="hero__actions">
            <a className="button button--primary" href="#products">
              <span>تسوّق الآن</span>
              <ArrowLeftIcon size={18} />
            </a>
            <a className="button button--text" href="#offers">
              شاهد العروض
            </a>
          </div>

          <ul className="hero__assurances" aria-label="مزايا المتجر">
            <li>شحن مجاني +٢٠٠ ر.س</li>
            <li>استبدال خلال ١٤ يومًا</li>
            <li>تغليف هدايا</li>
          </ul>
        </div>

        <div className="hero__visual">
          <span className="hero__orbit hero__orbit--one" aria-hidden="true" />
          <span className="hero__orbit hero__orbit--two" aria-hidden="true" />

          <figure className="hero__figure">
            <SmartImage
              src="/images/hero-luno.jpg"
              alt="طاولة فاتحة تضم ساعة ذهبية ومجوهرات وزجاجة عطر"
              loading="eager"
              fetchPriority="high"
            />
            <figcaption className="hero__caption">
              <span className="hero__caption-number">01</span>
              <span>
                مجموعة الوقت
                <strong>LUNO Atelier</strong>
              </span>
            </figcaption>
          </figure>

          <div className="hero__note">
            <span className="hero__note-mark" aria-hidden="true">
              L
            </span>
            <p>
              هدوء في اللون،
              <br />
              دقة في الاختيار.
            </p>
          </div>

          <p className="hero__credit">
            تصوير {heroImageCredit.photographer} · Pexels
          </p>
        </div>
      </div>

      <div className="container hero__footer">
        <span className="hero__scroll-cue" aria-hidden="true">
          <span />
          مرّري للاستكشاف
        </span>
        <span className="hero__footer-latin">RIYADH · SAUDI ARABIA</span>
      </div>
    </section>
  )
}
