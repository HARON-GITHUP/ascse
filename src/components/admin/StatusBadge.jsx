export function StatusBadge({ status }) {
  const toneMap = {
    new: 'clay',
    preparing: 'olive',
    shipped: 'beige',
    completed: 'olive-deep',
    cancelled: 'muted',
    active: 'olive',
    scheduled: 'beige',
    ended: 'muted',
  }

  const labelMap = {
    new: 'جديد',
    preparing: 'قيد التجهيز',
    shipped: 'تم الشحن',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    active: 'نشط',
    scheduled: 'مجدول',
    ended: 'منتهٍ',
  }

  const tone = toneMap[status] ?? 'muted'
  const label = labelMap[status] ?? status

  return <span className={`status-badge status-badge--${tone}`}>{label}</span>
}
