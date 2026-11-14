export const navLinks = [
  { label: 'الرئيسية', href: '#top', target: 'top' },
  { label: 'الساعات', href: '#products', category: 'watches' },
  { label: 'الإكسسوارات', href: '#products', category: 'accessories' },
  { label: 'الأكثر مبيعًا', href: '#bestsellers', target: 'bestsellers' },
  { label: 'وصل حديثًا', href: '#new-arrivals', target: 'new-arrivals' },
  { label: 'العروض', href: '#offers', target: 'offers' },
]

export const categories = [
  {
    id: 'watches',
    name: 'الساعات',
    eyebrow: '٠١ — الوقت',
    description: 'خطوط هادئة وحرفية دقيقة ترافق إيقاع يومك.',
    image: '/images/category-watches.jpg',
    alt: 'ساعة فضيَّة أنيقة على معصم رجل بإضاءة دافئة',
    tone: 'dark',
    imageCredit: {
      photographer: 'Kurchakto',
      sourceUrl:
        'https://www.pexels.com/photo/a-person-wearing-a-wristwatch-9713527/',
      license: 'Pexels License',
    },
  },
  {
    id: 'accessories',
    name: 'الإكسسوارات',
    eyebrow: '٠٢ — التفاصيل',
    description: 'لمسات ذهبية وفضية تكمل إطلالتك بهدوء.',
    image: '/images/category-accessories.jpg',
    alt: 'مجموعة من الإكسسوارات الذهبية على صينية زجاجية',
    tone: 'light',
    imageCredit: {
      photographer: 'Harper Sunday',
      sourceUrl:
        'https://www.pexels.com/photo/close-up-shot-of-jewelries-12753202/',
      license: 'Pexels License',
    },
  },
]

export const heroImageCredit = {
  photographer: 'Pegah Sharifi',
  sourceUrl:
    'https://www.pexels.com/photo/a-wristwatch-beside-a-perfume-9888084/',
  license: 'Pexels License',
}

export const shippingThreshold = 200

export const contact = {
  email: 'hello@luno.example',
  phone: '+966 55 000 0000',
  phoneHref: 'tel:+966550000000',
  instagram: 'https://www.instagram.com/',
}

/**
 * أرقام تسويقية تجريبية للعرض فقط.
 * لا تمثّل عملاء أو طلبات حقيقية، ويمكن تعديلها أو حذفها قبل النشر.
 */
export const stats = [
  { value: '٨', label: 'قطع في المجموعة' },
  { value: '٤٫٨', suffix: '/٥', label: 'متوسط التقييم' },
  { value: '٢٬٤٠٠+', label: 'طلب في بيانات العرض' },
  { value: '٩٨٪', label: 'رضا في بيانات العرض' },
]

export const statsNote =
  'أرقام تجريبية للعرض فقط — ليست بيانات عملاء حقيقية، وقابلة للتعديل من ملف البيانات.'

/**
 * إعدادات شريط العروض والعدّاد.
 * العدّاد تجريبي بالكامل: يمكن إيقافه أو إعادة ضبطه، ولا يمثّل عرضًا حقيقيًا.
 */
export const offer = {
  eyebrow: '٠٣ — عرض المجموعة',
  title: 'لمسة إضافية،',
  titleAccent: 'بسعر ألطف.',
  description:
    'خصم يصل إلى ٢٠٪ على قطع مختارة من الساعات والإكسسوارات. اختر القطعة التي تكمل إطلالتك، وأضفها إلى السلة مباشرة.',
  countdownMinutes: 184,
  note: 'العدّاد والخصم بيانات تجريبية للعرض فقط — ليس عرضًا حقيقيًا ولا ينتهي فعليًا.',
}

/**
 * آراء تجريبية للعرض فقط، وليست شهادات عملاء حقيقية.
 * استبدليها بآراء موثّقة قبل النشر.
 */
export const reviews = [
  {
    id: 'review-noura',
    name: 'نورة العتيبي',
    city: 'الرياض',
    rating: 5,
    text: 'وصلت الساعة بتغليف أنيق جدًا، واللون على الطبيعة أجمل من الصور. أصبحت قطعة ألبسها كل يوم تقريبًا.',
    product: 'ساعة أورا الكلاسيكية',
    isDemo: true,
  },
  {
    id: 'review-sara',
    name: 'سارة الحربي',
    city: 'جدة',
    rating: 5,
    text: 'طلبت العقد والأقراط معًا، والتنسيق بينهما هادئ وراقٍ. خدمة الاستبدال كانت واضحة وسريعة في التجربة.',
    product: 'عقد هالة',
    isDemo: true,
  },
  {
    id: 'review-layan',
    name: 'ليان القحطاني',
    city: 'الدمام',
    rating: 4,
    text: 'التفاصيل الدقيقة في السوار أعجبتني، والتغليف يصلح كهدية من دون أي إضافات. تجربة مرتبة ومريحة.',
    product: 'سوار سول',
    isDemo: true,
  },
]

export const reviewsNote =
  'آراء تجريبية للعرض فقط — ليست شهادات عملاء حقيقية، ويمكن استبدالها بآراء موثّقة.'

/**
 * الأسئلة الشائعة — محتوى تجريبي للعرض فقط، ويمكن تعديله أو حذفه.
 */
export const faqItems = [
  {
    id: 'faq-delivery',
    question: 'كم يستغرق التوصيل؟',
    answer:
      'يستغرق التوصيل عادةً ٢–٤ أيام عمل حسب المنطقة، ومجانًا للطلبات فوق ٢٠٠ ر.س.',
  },
  {
    id: 'faq-exchange',
    question: 'ما هي سياسة الاستبدال؟',
    answer:
      'يُمكن استبدال أي قطعة خلال ١٤ يومًا من الاستلام، بخطوات بسيطة عبر الدعم.',
  },
  {
    id: 'faq-payment',
    question: 'هل يمكن الدفع عند الاستلام؟',
    answer:
      'هذا نموذج تجريبي ولا يشمل آلية دفع حقيقية؛ يُعرض زر إتمام الطلب كتنبيه توضيحي فقط.',
  },
]

/**
 * معلومات الشحن والاستبدال التجريبية القابلة للتعديل.
 */
export const shippingInfo = {
  title: 'الشحن والاستبدال',
  text:
    'توصيل داخل المملكة خلال ٢–٤ أيام عمل، ومجانًا للطلبات فوق ٢٠٠ ر.س. الاستبدال متاح خلال ١٤ يومًا من الاستلام.',
}

export const shippingInfoNote =
  'معلومات تجريبية للعرض فقط — يمكن تعديلها من ملف البيانات قبل النشر.'

/**
 * معلومات المتجر الأساسية للتجربة.
 */
export const storeInfo = {
  name: 'LUNO',
  phone: '+966 55 000 0000',
  email: 'hello@luno.example',
}
