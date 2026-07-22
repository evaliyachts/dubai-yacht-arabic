// Brand and site-wide constants for the Arabic site.
// Keep BRAND_NAME and DOMAIN editable in one place so they can be renamed easily.

export const BRAND_NAME = "يخوت دبي";
export const BRAND_NAME_EN = "Yacht DXB";
export const DOMAIN = "https://yacht-dxb.com";
export const ENGLISH_SITE_URL = "https://yachtrentaldxb.com";

export const PHONE_NUMBER = "+971504641020";
export const PHONE_DISPLAY = "+971 50 464 1020";
export const WHATSAPP_NUMBER = PHONE_NUMBER;

export type SocialPlatform = "Facebook" | "Instagram" | "Threads" | "TikTok" | "X" | "YouTube";

export interface SocialProfile {
  platform: SocialPlatform;
  labelAr: string;
  url: string;
}

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  { platform: "Facebook", labelAr: "فيسبوك", url: "https://www.facebook.com/share/14i7z1YMxtg/?mibextid=wwXIfr" },
  { platform: "Instagram", labelAr: "إنستغرام", url: "https://www.instagram.com/dubai___yachts?igsh=N3Z6OTFpdThvdm92&utm_source=qr" },
  { platform: "Threads", labelAr: "ثريدز", url: "https://www.threads.com/@dubai___yachts?igshid=NTc4MTIwNjQ2YQ==" },
  { platform: "TikTok", labelAr: "تيك توك", url: "https://www.tiktok.com/@dubai__yachts?_r=1&_t=ZS-98EMuY54sYG" },
  { platform: "X", labelAr: "إكس", url: "https://x.com/dubai__yachts?s=11" },
  { platform: "YouTube", labelAr: "يوتيوب", url: "https://youtube.com/@dubai_yach_trental?si=GBpmM1NkYfCliFBX" },
];

export const PLACEHOLDER_IMAGE = "/placeholder.svg";

// Arabic-encoded route slugs. React Router v6 matches on the decoded
// pathname, so using raw Arabic characters here matches encoded URLs.
export const ROUTES = {
  home: "/",
  // Main keyword landing pages
  rentYacht: "/تأجير-يخت-في-دبي",
  bookYacht: "/حجز-يخت-في-دبي",
  yachtsForRent: "/يخوت-للإيجار-في-دبي",
  luxuryYachts: "/تأجير-يخوت-فاخرة-في-دبي",
  prices: "/أسعار-تأجير-اليخوت-في-دبي",
  marina: "/يخت-دبي-مارينا",
  privateCruises: "/رحلات-بحرية-خاصة-في-دبي",
  events: "/تأجير-يخت-للمناسبات-في-دبي",
  // Event landing pages
  birthday: "/عيد-ميلاد-على-يخت-في-دبي",
  privateParty: "/حفلة-خاصة-على-يخت-في-دبي",
  engagement: "/يخت-لحفلة-خطوبة-في-دبي",
  proposal: "/طلب-زواج-على-يخت-في-دبي",
  wedding: "/حفلة-زفاف-على-يخت-في-دبي",
  anniversary: "/ذكرى-زواج-على-يخت-في-دبي",
  graduation: "/حفلة-تخرج-على-يخت-في-دبي",
  genderReveal: "/تحديد-جنس-المولود-على-يخت-في-دبي",
  bachelor: "/حفلة-وداع-عزوبية-على-يخت-في-دبي",
  family: "/يخت-للمناسبات-العائلية-في-دبي",
  bbq: "/حفلة-شواء-على-يخت-في-دبي",
  dinner: "/عشاء-على-يخت-في-دبي",
  morning: "/رحلة-يخت-صباحية-في-دبي",
  afternoonTea: "/افترنون-تي-على-يخت-في-دبي",
  jetSki: "/يخت-مع-جت-سكي-في-دبي",
  waterSports: "/يخت-مع-العاب-مائية-في-دبي",
  fishing: "/رحلة-صيد-على-يخت-في-دبي",
  swimming: "/سباحة-على-يخت-في-دبي",
  // Core utility pages
  services: "/الخدمات",
  offers: "/العروض",
  yachts: "/yachts",
  yachtDetails: "/yachts/:slug",
  about: "/about",
  contact: "/contact",
  faq: "/الأسئلة-الشائعة",
  terms: "/terms",
  privacy: "/privacy",
} as const;

export const getWhatsAppLink = (message?: string) => {
  const defaultMsg = `مرحباً، أرغب في حجز يخت في دبي. التاريخ: __، المدة: __، عدد الضيوف: __، نوع المناسبة: __`;
  const cleanNumber = WHATSAPP_NUMBER.replace(/[+\s]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message || defaultMsg)}`;
};

export const getPhoneLink = () => `tel:${PHONE_NUMBER.replace(/\s/g, "")}`;
