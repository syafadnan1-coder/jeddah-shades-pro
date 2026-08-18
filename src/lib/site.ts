export const SITE = {
  name: "الخبراء التظليل",
  tagline: "مظلات سيارات وسواتر حديثة في جدة",
  phone: "966509386171",
  whatsapp: "966509386171",
  city: "جدة",
  area: "جميع أحياء جدة، المملكة العربية السعودية",
  hours: "يومياً من 8 صباحاً حتى 11 مساءً",
} as const;

export const telHref = `tel:+${SITE.phone}`;

export function waHref(message?: string) {
  const text = message ?? `السلام عليكم، أرغب بطلب عرض سعر من ${SITE.name}`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const JEDDAH_DISTRICTS = [
  "حي الشاطئ","حي الروضة","حي السلامة","حي النعيم","حي المرجان","حي الزهراء","حي الحمراء","حي البساتين",
  "حي الصفا","حي المروة","حي النزهة","حي الرحاب","حي الفيصلية","حي الأندلس","حي الخالدية","حي المحمدية",
  "حي أبحر الشمالية","حي أبحر الجنوبية","حي الشرفية","حي البلد","حي الجامعة","حي بريمان","حي الربوة",
  "حي الواحة","حي النهضة","حي مشرفة","حي السامر","حي الأجواد","حي التعاون","حي الفيحاء","حي الثغر",
  "حي العزيزية","حي الرويس","حي الكندرة","حي السليمانية","حي بني مالك","حي الصواري","حي اللؤلؤ",
  "حي الياقوت","حي الفردوس","حي طيبة","حي الحرازات","حي الوزيرية","حي غليل","حي القريات","حي الأمير عبدالمجيد",
];

export const SERVICE_SLUGS = [
  "car-shades-jeddah",
  "royal-tents-jeddah",
  "pergolas-jeddah",
  "screens-jeddah",
  "warehouses-jeddah",
  "sandwich-panel-jeddah",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
