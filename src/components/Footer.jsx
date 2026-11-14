import { contact, navLinks } from '../data/content'
import {
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  RefreshIcon,
  TruckIcon,
} from './Icons'

const helpLinks = [
  { label: 'سياسة التوصيل', href: '#about' },
  { label: 'الاستبدال والإرجاع', href: '#about' },
  { label: 'العناية بالقطع', href: '#about' },
  { label: 'الأسئلة الشائعة', href: '#about' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <a className="brand" href="#top" aria-label="LUNO — الصفحة الرئيسية">
              <span className="brand__word">LUNO</span>
              <span className="brand__sub">ساعات وإكسسوارات</span>
            </a>
            <p className="site-footer__pitch">
              قطع مختارة بهدوء، من الرياض إلى يومك. نصنع تفاصيل صغيرة تعيش معك
              طويلًا.
            </p>
            <p className="site-footer__latin">RIYADH · SAUDI ARABIA</p>
          </div>

          <nav className="site-footer__col" aria-label="روابط المتجر">
            <h3>المتجر</h3>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <nav className="site-footer__col" aria-label="خدمة العملاء">
            <h3>خدمة العملاء</h3>
            {helpLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-footer__col site-footer__contact">
            <h3>تواصل معنا</h3>
            <a href={`mailto:${contact.email}`}>
              <MailIcon size={17} />
              <span dir="ltr">{contact.email}</span>
            </a>
            <a href={contact.phoneHref}>
              <PhoneIcon size={17} />
              <span dir="ltr">{contact.phone}</span>
            </a>
            <a href={contact.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon size={17} />
              <span>@luno.store</span>
            </a>

            <ul className="site-footer__badges">
              <li>
                <TruckIcon size={16} />
                توصيل مجاني +٢٠٠ ر.س
              </li>
              <li>
                <RefreshIcon size={16} />
                استبدال خلال ١٤ يومًا
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© ٢٠٢٦ LUNO — جميع الحقوق محفوظة.</p>
          <p className="site-footer__demo">
            نموذج تجريبي للواجهة فقط — لا حسابات ولا دفع حقيقي.
          </p>
          <a href="/credits.html">مصادر الصور</a>
        </div>
      </div>
    </footer>
  )
}
