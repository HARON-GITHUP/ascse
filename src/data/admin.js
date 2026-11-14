/**
 * بيانات لوحة التحكم التجريبية — كلها محلية ولعرض تفاعلي فقط.
 * يمكن تعديلها أو استبدالها ببيانات حقيقية لاحقًا.
 */

export const adminOrders = [
  {
    id: 'ord-1001',
    code: 'LNO-1042',
    customer: { name: 'نورة العتيبي', email: 'noura@example.com', city: 'الرياض' },
    items: [
      { productId: 'aura-classic', name: 'ساعة أورا الكلاسيكية', qty: 1, price: 420 },
      { productId: 'hala-necklace', name: 'عقد هالة', qty: 1, price: 210 },
    ],
    status: 'new',
    createdAt: '2026-11-14',
    address: { city: 'الرياض', detail: 'حي العليا — شارع الملك فهد' },
    total: 630,
  },
  {
    id: 'ord-1002',
    code: 'LNO-1041',
    customer: { name: 'سارة الحربي', email: 'sara@example.com', city: 'جدة' },
    items: [{ productId: 'elite-chronograph', name: 'ساعة إيليت كرونوغراف', qty: 1, price: 690 }],
    status: 'preparing',
    createdAt: '2026-11-13',
    address: { city: 'جدة', detail: 'حي الروضة — شارع التحلية' },
    total: 690,
  },
  {
    id: 'ord-1003',
    code: 'LNO-1038',
    customer: { name: 'ليان القحطاني', email: 'layan@example.com', city: 'الدمام' },
    items: [{ productId: 'soul-bracelet', name: 'سوار سول', qty: 1, price: 260 }],
    status: 'shipped',
    createdAt: '2026-11-11',
    address: { city: 'الدمام', detail: 'حي الشاطئ — وصلة النجمة' },
    total: 260,
  },
  {
    id: 'ord-1004',
    code: 'LNO-1035',
    customer: { name: 'مريم السالم', email: 'maryam@example.com', city: 'الرياض' },
    items: [
      { productId: 'lumi-earrings', name: 'أقراط لومي', qty: 2, price: 175 },
      { productId: 'ether-silver-set', name: 'طقم إيثر الفضي', qty: 1, price: 240 },
    ],
    status: 'completed',
    createdAt: '2026-11-08',
    address: { city: 'الرياض', detail: 'حي النخيل — شارع التخصصي' },
    total: 590,
  },
  {
    id: 'ord-1005',
    code: 'LNO-1031',
    customer: { name: 'فاطمة الزهراء', email: 'fatima@example.com', city: 'الطائف' },
    items: [{ productId: 'nova-steel', name: 'ساعة نوفا ستيل', qty: 1, price: 560 }],
    status: 'completed',
    createdAt: '2026-11-04',
    address: { city: 'الطائف', detail: 'حي الثقافة — شارع الإمام' },
    total: 560,
  },
  {
    id: 'ord-1006',
    code: 'LNO-1027',
    customer: { name: 'هند العتيبي', email: 'hind@example.com', city: 'جدة' },
    items: [
      { productId: 'hala-necklace', name: 'عقد هالة', qty: 1, price: 210 },
      { productId: 'bracelet-soul', name: 'سوار سول', qty: 1, price: 260 },
    ],
    status: 'cancelled',
    createdAt: '2026-11-01',
    address: { city: 'جدة', detail: 'حي النسيم — شارع الجيل الأول' },
    total: 470,
  },
]

export const adminCustomers = [
  { id: 'cus-1', name: 'نورة العتيبي', email: 'noura@example.com', city: 'الرياض', ordersCount: 3, spent: 1620 },
  { id: 'cus-2', name: 'سارة الحربي', email: 'sara@example.com', city: 'جدة', ordersCount: 2, spent: 1350 },
  { id: 'cus-3', name: 'ليان القحطاني', email: 'layan@example.com', city: 'الدمام', ordersCount: 1, spent: 260 },
  { id: 'cus-4', name: 'مريم السالم', email: 'maryam@example.com', city: 'الرياض', ordersCount: 1, spent: 590 },
  { id: 'cus-5', name: 'فاطمة الزهراء', email: 'fatima@example.com', city: 'الطائف', ordersCount: 1, spent: 560 },
]

export const adminOffers = [
  {
    id: 'off-1',
    name: 'عرض التخفيض التجريبي',
    discountPercent: 15,
    productIds: ['aura-classic', 'lumi-earrings'],
    startsAt: '2026-11-01',
    endsAt: '2026-11-30',
    status: 'active',
  },
  {
    id: 'off-2',
    name: 'عرض العطور والإكسسوارات',
    discountPercent: 10,
    productIds: ['bracelet-soul', 'ether-silver-set', 'soul-bracelet'],
    startsAt: '2026-12-01',
    endsAt: '2026-12-25',
    status: 'scheduled',
  },
]

export const adminNotifications = [
  { id: 'ntf-1', title: 'طلب جديد', text: 'طلب LNO-1042 بانتظار التأكيد', time: 'الآن' },
  { id: 'ntf-2', title: 'مخزون منخفض', text: 'أقراط لومي بحالة منخفضة', time: 'منذ ساعتين' },
  { id: 'ntf-3', title: 'عرض مجدول', text: 'عرض عطور الإجمالي بدءًا من ديسمبر', time: 'منذ يوم' },
]

export const adminUser = {
  name: 'هارون',
  email: 'admin@luno.example',
  role: 'مدير المتجر',
}

export const orderStatuses = [
  { id: 'new', label: 'جديد' },
  { id: 'preparing', label: 'قيد التجهيز' },
  { id: 'shipped', label: 'تم الشحن' },
  { id: 'completed', label: 'مكتمل' },
  { id: 'cancelled', label: 'ملغي' },
]

export const orderStatusTones = {
  new: 'clay',
  preparing: 'olive',
  shipped: 'beige',
  completed: 'olive-deep',
  cancelled: 'muted',
}
