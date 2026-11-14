import { useState } from 'react'
import { adminOffers } from '../../data/admin'
import { StatusBadge } from './StatusBadge'

const PRODUCT_OPTIONS = [
  { id: 'aura-classic', name: 'ساعة أورا الكلاسيكية' },
  { id: 'nova-steel', name: 'ساعة نوفا ستيل' },
  { id: 'lina-minimal', name: 'ساعة لينا مينيمال' },
  { id: 'elite-chronograph', name: 'ساعة إيليت كرونوغراف' },
  { id: 'hala-necklace', name: 'عقد هالة' },
  { id: 'lumi-earrings', name: 'أقراط لومي' },
  { id: 'soul-bracelet', name: 'سوار سول' },
  { id: 'ether-silver-set', name: 'طقم إيثر الفضي' },
]

export function AdminOffers({ onNotify }) {
  const [offers, setOffers] = useState(adminOffers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    discountPercent: 10,
    productIds: [],
    startsAt: '2026-11-15',
    endsAt: '2026-12-15',
  })

  const toggleStatus = (offerId) => {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              status: offer.status === 'active' ? 'ended' : 'active',
            }
          : offer,
      ),
    )
    const offer = offers.find((item) => item.id === offerId)
    if (offer) {
      onNotify(`تم ${offer.status === 'active' ? 'إيقاف' : 'تفعيل'} العرض ${offer.name}`, 'success')
    }
  }

  const createOffer = () => {
    const offer = {
      id: `off-${Date.now()}`,
      name: form.name || 'عرض تجريبي',
      discountPercent: Number(form.discountPercent) || 0,
      productIds: form.productIds,
      startsAt: form.startsAt,
      endsAt: form.endsAt,
      status: 'scheduled',
    }
    setOffers((current) => [offer, ...current])
    onNotify(`تم إنشاء العرض ${offer.name}`, 'success')
    setIsModalOpen(false)
    setForm({ name: '', discountPercent: 10, productIds: [], startsAt: '2026-11-15', endsAt: '2026-12-15' })
  }

  const productName = (productId) =>
    PRODUCT_OPTIONS.find((item) => item.id === productId)?.name ?? productId

  return (
    <div className="admin-page">
      <div className="admin-panel">
        <header className="admin-panel__head">
          <div>
            <h2>العروض والخصومات</h2>
            <p>{offers.length} عروض مسجلة</p>
          </div>
          <button type="button" className="button button--primary" onClick={() => setIsModalOpen(true)}>
            + عرض جديد
          </button>
        </header>

        <div className="admin-offer-grid">
          {offers.map((offer) => (
            <article key={offer.id} className="admin-offer-card">
              <header>
                <strong>{offer.name}</strong>
                <StatusBadge status={offer.status} />
              </header>
              <p>
                خصم {offer.discountPercent}% —{' '}
                {offer.productIds.map(productName).join('، ')}
              </p>
              <p>
                {offer.startsAt} → {offer.endsAt}
              </p>
              <button
                type="button"
                className={`admin-status-btn${offer.status === 'active' ? ' is-active' : ''}`}
                onClick={() => toggleStatus(offer.id)}
              >
                {offer.status === 'active' ? 'إيقاف العرض' : 'تفعيل العرض'}
              </button>
            </article>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-modal-layer">
          <button type="button" className="overlay-backdrop" aria-label="إغلاق النموذج" onClick={() => setIsModalOpen(false)} />
          <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-offer-title">
            <header className="admin-modal__head">
              <h2 id="admin-offer-title">عرض جديد</h2>
              <button type="button" className="icon-button icon-button--bordered" onClick={() => setIsModalOpen(false)} aria-label="إغلاق النموذج">✕</button>
            </header>
            <div className="admin-modal__body">
              <label className="admin-field">
                <span>اسم العرض</span>
                <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              </label>
              <div className="admin-field-grid">
                <label className="admin-field">
                  <span>نسبة الخصم (%)</span>
                  <input type="number" min={1} max={90} value={form.discountPercent} onChange={(event) => setForm({ ...form, discountPercent: Number(event.target.value) || 0 })} />
                </label>
                <label className="admin-field">
                  <span>تاريخ البداية</span>
                  <input type="date" value={form.startsAt} onChange={(event) => setForm({ ...form, startsAt: event.target.value })} />
                </label>
              </div>
              <label className="admin-field">
                <span>تاريخ النهاية</span>
                <input type="date" value={form.endsAt} onChange={(event) => setForm({ ...form, endsAt: event.target.value })} />
              </label>
              <fieldset className="admin-field">
                <span>المنتجات المشمولة</span>
                <div className="admin-check-grid">
                  {products.map((item) => (
                    <label key={item.id} className="admin-check">
                      <input
                        type="checkbox"
                        checked={form.productIds.includes(item.id)}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            productIds: event.target.checked
                              ? [...form.productIds, item.id]
                              : form.productIds.filter((id) => id !== item.id),
                          })
                        }
                      />
                      {item.name}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <footer className="admin-modal__foot">
              <button type="button" className="button button--outline" onClick={() => setIsModalOpen(false)}>إلغاء</button>
              <button type="button" className="button button--primary" onClick={createOffer} disabled={!form.name.trim()}>
                إنشاء العرض
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
