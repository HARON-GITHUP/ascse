import { useState } from 'react'
import { faqItems, shippingInfo, shippingInfoNote } from '../data/content'
import { Reveal } from './Reveal'

export function InfoSection() {
  const [openFaqId, setOpenFaqId] = useState(faqItems[0]?.id ?? null)

  const toggleFaq = (id) => {
    setOpenFaqId((current) => (current === id ? null : id))
  }

  return (
    <section className="section info" id="faq" aria-labelledby="faq-title">
      <div className="container info__inner">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">08</span>
              <span>معلومات ودعم</span>
            </p>
            <h2 id="faq-title">أسئلة شائعة</h2>
          </div>
          <p className="section-heading__text">
            إجابات مختصرة ومحدّثة عند الطلب، وتُكتب هذه النسخة للتجربة فقط.
          </p>
        </Reveal>

        <div className="faq">
          {faqItems.map((item) => {
            const isOpen = openFaqId === item.id
            return (
              <Reveal key={item.id} delay={0}>
                <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-item__question"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span>{item.question}</span>
                    <span className="faq-item__icon" aria-hidden="true" />
                  </button>
                  <div
                    className="faq-item__answer"
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-hidden={!isOpen}
                  >
                    <div className="faq-item__answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="info-cards">
          <Reveal className="info-card" delay={60}>
            <h3>{shippingInfo.title}</h3>
            <p>{shippingInfo.text}</p>
            <span className="info-card__demo">{shippingInfoNote}</span>
          </Reveal>

          <Reveal className="info-card" delay={120}>
            <h3>الاستبدال والإرجاع</h3>
            <p>
              خلال ١٤ يومًا من الاستلام يمكن استبدال أو إرجاع القطع بخطوات
              بسيطة عبر الدعم، مع تغطية تلقائية للقطع المعيبة.
            </p>
            <span className="info-card__demo">
              سياسة تجريبية — يمكن تعديل النص من ملف البيانات.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
