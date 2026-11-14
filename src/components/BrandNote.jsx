import { ChatIcon, RefreshIcon, TruckIcon } from './Icons'
import { Reveal } from './Reveal'

const promises = [
  {
    icon: TruckIcon,
    title: 'توصيل داخل المملكة',
    text: 'خلال ٢–٤ أيام عمل، ومجانًا فوق ٢٠٠ ر.س.',
  },
  {
    icon: RefreshIcon,
    title: 'استبدال مطمئن',
    text: 'خلال ١٤ يومًا من الاستلام، بخطوات بسيطة.',
  },
  {
    icon: ChatIcon,
    title: 'دعم بشري',
    text: 'من ٩ صباحًا إلى ٩ مساءً، طوال أيام الأسبوع.',
  },
]

export function BrandNote() {
  return (
    <section className="brand-note" id="about" aria-labelledby="about-title">
      <span className="brand-note__ornament brand-note__ornament--one" aria-hidden="true" />
      <span className="brand-note__ornament brand-note__ornament--two" aria-hidden="true" />
      <div className="container brand-note__inner">
        <Reveal className="brand-note__heading">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__index">07</span>
            <span>فلسفة لونو</span>
          </p>
          <h2 id="about-title">
            قطع تُختار بهدوء،
            <span>وتُلبس كل يوم.</span>
          </h2>
          <p className="brand-note__latin">LESS, BUT BETTER.</p>
        </Reveal>

        <Reveal className="brand-note__body" delay={120}>
          <p className="brand-note__lead">
            نؤمن أن الأناقة ليست في كثرة القطع، بل في التفاصيل التي تعيش معك.
            لذلك نختار ألوانًا هادئة، خطوطًا بسيطة، وخامات تحمل الوقت بجمال.
          </p>

          <div className="promise-list">
            {promises.map(({ icon: Icon, title, text }) => (
              <div className="promise" key={title}>
                <span className="promise__icon">
                  <Icon size={20} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
