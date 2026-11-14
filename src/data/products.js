/**
 * بيانات المنتجات التجريبية — عدّلي الاسم أو السعر أو الصورة من هنا.
 * كل صورة محفوظة محليًا داخل public/images، ومصدرها موثّق في CREDITS.md
 * وفي الحقل imageCredit بجوار كل منتج.
 *
 * حقول العرض التجريبي:
 * - rating / reviews: تقييم وعدد مراجعات تجريبيان.
 * - bestSeller / isNew: تُستخدم لبناء قسمي الأكثر مبيعًا ووصل حديثًا.
 * - oldPrice: السعر قبل الخصم، ويُحسب منه نسبة الخصم تلقائيًا.
 * - createdAt: يُستخدم لترتيب «الأحدث» في الكتالوج.
 */
export const products = [
  {
    id: 'aura-classic',
    name: 'ساعة أورا الكلاسيكية',
    tagline: 'جلد طبيعي بلون الكراميل',
    description:
      'ساعة كلاسيكية بجلد طبيعي بلون الكراميل وميناء معدني خفيف، تصلح للعمل اليومي دون أن تُفوّت إيقاعك. جمالية هادئة تلتصق بالجلوس بلا ضجيج.',
    images: [
      {
        src: '/images/watch-aura.jpg',
        alt: 'ساعة أورا الكلاسيكية بسوار جلد بني معروضة على حامل خشبي',
      },
      {
        src: '/images/category-watches.jpg',
        alt: 'ساعة فضيَّة أنيقة على معصم رجل بإضاءة دافئة',
      },
    ],
    options: [
      { id: 'cream', label: 'كراميل', value: 'جلد طبيعي بلون الكراميل' },
      { id: 'black', label: 'أسود', value: 'جلد أسود مخملي' },
    ],
    category: 'watches',
    categoryLabel: 'ساعات',
    price: 420,
    oldPrice: 525,
    stock: 3,
    badge: 'الأكثر مبيعًا',
    bestSeller: true,
    isNew: false,
    rating: 4.9,
    reviews: 128,
    createdAt: '2026-08-12',
    image: '/images/watch-aura.jpg',
    alt: 'ساعة أورا الكلاسيكية بسوار جلد بني معروضة على حامل خشبي',
    imageCredit: {
      photographer: 'Dream_ maKkerzz',
      sourceUrl:
        'https://www.pexels.com/photo/elegant-timex-watch-with-leather-strap-display-28157826/',
      license: 'Pexels License',
    },
  },
  {
    id: 'nova-steel',
    name: 'ساعة نوفا ستيل',
    tagline: 'مينيمال بلمسة معدنية',
    description:
      'ساعة نوفا ستيل المينيمال بلمسة معدنية فاتحة، وكسر زجاجي مريح. قطعة هادئة ترفع الحضور بدون عنف.',
    images: [
      {
        src: '/images/watch-nova.jpg',
        alt: 'ساعة نوفا الفضيَّة بسوار معدني على سطح خشبي فاتح',
      },
      {
        src: '/images/category-watches.jpg',
        alt: 'ساعة فضيَّة أنيقة على معصم رجل بإضاءة دافئة',
      },
    ],
    category: 'watches',
    categoryLabel: 'ساعات',
    price: 560,
    oldPrice: null,
    stock: 5,
    badge: 'وصل حديثًا',
    bestSeller: false,
    isNew: true,
    rating: 4.7,
    reviews: 64,
    createdAt: '2026-11-08',
    image: '/images/watch-nova.jpg',
    alt: 'ساعة نوفا الفضيَّة بسوار معدني على سطح خشبي فاتح',
    imageCredit: {
      photographer: 'Ninety Seven Years',
      sourceUrl:
        'https://www.pexels.com/photo/a-close-up-shot-of-a-silver-wristwatch-11732775/',
      license: 'Pexels License',
    },
  },
  {
    id: 'lina-minimal',
    name: 'ساعة لينا مينيمال',
    tagline: 'وضوح أبيض وأسود',
    description:
      'ساعة لينا مينيمال بميناء أبيض وسوار أسود، على خلفية فاتحة. البساطة هنا ليست نقصان، بل هوية.',
    images: [
      {
        src: '/images/watch-lina.jpg',
        alt: 'ساعة لينا المينيمال بميناء أبيض وسوار أسود على خلفية فاتحة',
      },
      {
        src: '/images/category-watches.jpg',
        alt: 'ساعة فضيَّة أنيقة على معصم رجل بإضاءة دافئة',
      },
    ],
    category: 'watches',
    categoryLabel: 'ساعات',
    price: 380,
    oldPrice: null,
    stock: 2,
    badge: null,
    bestSeller: false,
    isNew: true,
    rating: 4.6,
    reviews: 41,
    createdAt: '2026-11-02',
    image: '/images/watch-lina.jpg',
    alt: 'ساعة لينا المينيمال بميناء أبيض وسوار أسود على خلفية فاتحة',
    imageCredit: {
      photographer: 'Brunxs',
      sourceUrl:
        'https://www.pexels.com/photo/minimalist-black-and-white-analog-wristwatch-33524465/',
      license: 'Pexels License',
    },
  },
  {
    id: 'elite-chronograph',
    name: 'ساعة إيليت كرونوغراف',
    tagline: 'تفاصيل رياضية أنيقة',
    description:
      'ساعة إيليت كرونوغراف بتفاصيل رياضية أنيقة، مع مكبّر رقم محمول. للعملاء الذين يقدّرون الدقة في كل حركة.',
    images: [
      {
        src: '/images/watch-elite.jpg',
        alt: 'ساعة إيليت الكرونوغراف الفضيَّة على سطح خشبي داكن',
      },
      {
        src: '/images/category-watches.jpg',
        alt: 'ساعة فضيَّة أنيقة على معصم رجل بإضاءة دافئة',
      },
    ],
    category: 'watches',
    categoryLabel: 'ساعات',
    price: 690,
    oldPrice: 790,
    stock: 4,
    badge: 'اختيار لونو',
    bestSeller: true,
    isNew: false,
    rating: 4.8,
    reviews: 97,
    createdAt: '2026-07-22',
    image: '/images/watch-elite.jpg',
    alt: 'ساعة إيليت الكرونوغراف الفضيَّة على سطح خشبي داكن',
    imageCredit: {
      photographer: 'Fernando Arcos',
      sourceUrl:
        'https://www.pexels.com/photo/silver-linked-bracelet-silver-and-black-round-chronograph-watch-190819/',
      license: 'Pexels License',
    },
  },
  {
    id: 'hala-necklace',
    name: 'عقد هالة',
    tagline: 'ذهب دافئ بتفاصيل ناعمة',
    description:
      'عقد هالة من الذهب الوردي بتفاصيل ناعمة، مثالي كهدية أو كلمسة نهائية للإطلالة. لا يبدو ثمينًا، بل مصمم بعناية.',
    images: [
      {
        src: '/images/necklace-hala.jpg',
        alt: 'عقد هالة الذهبي الموضوع على صفحات كتاب مفتوح',
      },
      {
        src: '/images/category-accessories.jpg',
        alt: 'مجموعة من الإكسسوارات الذهبية على صينية زجاجية',
      },
    ],
    category: 'accessories',
    categoryLabel: 'إكسسوارات',
    price: 210,
    oldPrice: null,
    stock: 6,
    badge: 'هدية مميزة',
    bestSeller: true,
    isNew: false,
    rating: 4.9,
    reviews: 156,
    createdAt: '2026-06-18',
    image: '/images/necklace-hala.jpg',
    alt: 'عقد هالة الذهبي الموضوع على صفحات كتاب مفتوح',
    imageCredit: {
      photographer: 'kaboompics.com',
      sourceUrl:
        'https://www.pexels.com/photo/close-up-shot-of-a-gold-necklace-on-a-book-4889719/',
      license: 'Pexels License',
    },
  },
  {
    id: 'lumi-earrings',
    name: 'أقراط لومي',
    tagline: 'لمعة ذهبية على مرآة',
    description:
      'أقراط لومي من الذهب الوردي، بلمعة ذهبية رقيقة على مرآة دائرية. قطعة صغيرة لكنها تكمل الملابس بذكاء.',
    images: [
      {
        src: '/images/earrings-lumi.jpg',
        alt: 'أقراط لومي الذهبية على مرآة دائرية فاتحة',
      },
      {
        src: '/images/category-accessories.jpg',
        alt: 'مجموعة من الإكسسوارات الذهبية على صينية زجاجية',
      },
    ],
    category: 'accessories',
    categoryLabel: 'إكسسوارات',
    price: 175,
    oldPrice: 210,
    stock: 2,
    badge: null,
    bestSeller: true,
    isNew: false,
    rating: 4.7,
    reviews: 73,
    createdAt: '2026-05-30',
    image: '/images/earrings-lumi.jpg',
    alt: 'أقراط لومي الذهبية على مرآة دائرية فاتحة',
    imageCredit: {
      photographer: 'Ebru Akal',
      sourceUrl:
        'https://www.pexels.com/photo/gold-earrings-on-round-mirror-12585697/',
      license: 'Pexels License',
    },
  },
  {
    id: 'soul-bracelet',
    name: 'سوار سول',
    tagline: 'خط رفيع وحضور هادئ',
    description:
      'سوار سول من الذهب الوردي بخط رفيع، يصطف مع البنطال الأسود أو الكنز الأبيض بهدوء. حين تأتي القصة، تأتي التفاصيل.',
    images: [
      {
        src: '/images/bracelet-soul.jpg',
        alt: 'سوار سول الذهبي معروض على حامل عرض أبيض',
      },
      {
        src: '/images/category-accessories.jpg',
        alt: 'مجموعة من الإكسسوارات الذهبية على صينية زجاجية',
      },
    ],
    category: 'accessories',
    categoryLabel: 'إكسسوارات',
    price: 260,
    oldPrice: null,
    stock: 3,
    badge: 'جديد',
    bestSeller: false,
    isNew: true,
    rating: 4.8,
    reviews: 38,
    createdAt: '2026-10-27',
    image: '/images/bracelet-soul.jpg',
    alt: 'سوار سول الذهبي معروض على حامل عرض أبيض',
    imageCredit: {
      photographer: 'Vedat Kandemir',
      sourceUrl:
        'https://www.pexels.com/photo/elegant-gold-bracelet-on-display-stand-28933801/',
      license: 'Pexels License',
    },
  },
  {
    id: 'ether-silver-set',
    name: 'طقم إيثر الفضي',
    tagline: 'قطعتان بتوازن بارد',
    description:
      'طقم إيثر الفضي من أقراط وخواتم بتوازن بارد، مرتبة على أحجار طبيعية. قطعة تجمع بين دفء الإكسسوارات وحكمة التوازن.',
    images: [
      {
        src: '/images/silver-set.jpg',
        alt: 'أقراط وخواتم فضية مرتبة على أحجار طبيعية',
      },
      {
        src: '/images/category-accessories.jpg',
        alt: 'مجموعة من الإكسسوارات الذهبية على صينية زجاجية',
      },
    ],
    category: 'accessories',
    categoryLabel: 'إكسسوارات',
    price: 240,
    oldPrice: 290,
    stock: 2,
    badge: null,
    bestSeller: false,
    isNew: true,
    rating: 4.6,
    reviews: 52,
    createdAt: '2026-10-21',
    image: '/images/silver-set.jpg',
    alt: 'أقراط وخواتم فضية مرتبة على أحجار طبيعية',
    imageCredit: {
      photographer: 'cottonbro studio',
      sourceUrl:
        'https://www.pexels.com/photo/close-up-shot-of-silver-jewelries-9430468/',
      license: 'Pexels License',
    },
  },
]

export function formatPrice(value) {
  return `${value.toLocaleString('en-US')} ر.س`
}

export function discountPercent(product) {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0
  return Math.round((1 - product.price / product.oldPrice) * 100)
}
