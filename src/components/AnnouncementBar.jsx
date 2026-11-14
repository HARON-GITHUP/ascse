import { SparkleIcon, TruckIcon } from './Icons'

export function AnnouncementBar() {
  return (
    <div className="announcement">
      <div className="container announcement__inner">
        <p className="announcement__item">
          <TruckIcon size={17} />
          <span>توصيل مجاني للطلبات فوق ٢٠٠ ر.س</span>
        </p>
        <p className="announcement__item announcement__item--highlight">
          <SparkleIcon size={12} />
          <span>خصم تجريبي ١٠٪ على أول طلب — رمز LUNO10</span>
        </p>
        <p className="announcement__item announcement__item--support">
          <span>استبدال سهل خلال ١٤ يومًا</span>
        </p>
      </div>
    </div>
  )
}
