import { stats, statsNote } from '../data/content'
import { Reveal } from './Reveal'

export function StatsStrip() {
  return (
    <section className="stats" aria-label="أرقام تجريبية عن المتجر">
      <div className="container stats__inner">
        <dl className="stats__grid">
          {stats.map((stat, index) => (
            <Reveal
              as="div"
              className="stat"
              key={stat.label}
              delay={index * 70}
            >
              <dt>{stat.label}</dt>
              <dd>
                {stat.value}
                {stat.suffix && <span>{stat.suffix}</span>}
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="stats__note">{statsNote}</p>
      </div>
    </section>
  )
}
