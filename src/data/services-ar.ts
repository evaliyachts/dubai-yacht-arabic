import type { ServiceCategory } from "./services";

export const SERVICE_INDEX_PATH_AR = "/الخدمات";
export const LEGACY_SERVICE_INDEX_PATH_AR = "/خدمات-تأجير-اليخوت-في-دبي";

export const SERVICE_CATEGORY_LABELS_AR: Record<ServiceCategory, string> = {
  package: "الباقات والمناسبات",
  service: "خدمات على متن اليخت",
  "water sport": "الألعاب والأنشطة المائية",
};

export const SERVICE_TITLE_AR: Record<string, string> = {
  "banana-boat-ride": "ركوب بنانا بوت",
  swimming: "سباحة",
  "barbecue-on-the-yacht": "حفلة شواء على اليخت",
  fishing: "رحلة صيد",
  "birthday-party": "عيد ميلاد على يخت",
  "graduation-parties": "حفلات تخرج",
  "wedding-anniversary-parties": "حفلات ذكرى الزواج",
  "bachelor-parties": "حفلات وداع العزوبية",
  "marriage-proposal-party": "طلب زواج على يخت",
  "gender-reveal-party": "حفلة تحديد جنس المولود",
  "engagement-and-wedding-parties": "حفلات خطوبة وزفاف",
  "food-menu": "قائمة الطعام",
  "donut-ride": "ركوب دونات",
  "jet-ski": "جت سكي",
  "afternoon-tea-trip": "رحلة افترنون تي",
  "morning-yacht-trips": "رحلات يخت صباحية",
  "engagement-parties": "حفلات خطوبة",
  "wedding-parties": "حفلات زفاف",
};

export const SERVICE_SLUG_AR: Record<string, string> = {
  "banana-boat-ride": "ركوب-بنانا-بوت-في-دبي",
  swimming: "سباحة-على-يخت-في-دبي",
  "barbecue-on-the-yacht": "حفلة-شواء-على-يخت-في-دبي",
  fishing: "رحلة-صيد-على-يخت-في-دبي",
  "birthday-party": "عيد-ميلاد-على-يخت-في-دبي",
  "graduation-parties": "حفلات-تخرج-على-يخت-في-دبي",
  "wedding-anniversary-parties": "ذكرى-زواج-على-يخت-في-دبي",
  "bachelor-parties": "حفلات-وداع-العزوبية-على-يخت-في-دبي",
  "marriage-proposal-party": "طلب-زواج-على-يخت-في-دبي",
  "gender-reveal-party": "حفلة-تحديد-جنس-المولود-على-يخت-في-دبي",
  "engagement-and-wedding-parties": "حفلات-خطوبة-وزفاف-على-يخت-في-دبي",
  "food-menu": "قائمة-طعام-لليخوت-في-دبي",
  "donut-ride": "ركوب-دونات-في-دبي",
  "jet-ski": "جت-سكي-في-دبي",
  "afternoon-tea-trip": "رحلة-افترنون-تي-على-يخت-في-دبي",
  "morning-yacht-trips": "رحلات-يخت-صباحية-في-دبي",
  "engagement-parties": "حفلات-خطوبة-على-يخت-في-دبي",
  "wedding-parties": "حفلات-زفاف-على-يخت-في-دبي",
};

export const SERVICE_DESCRIPTION_AR: Record<string, string> = {
  "banana-boat-ride":
    "أضف المزيد من الحماس إلى رحلتك البحرية في دبي مع تجربة بنانا بوت ممتعة وآمنة. النشاط مناسب للعائلات والأصدقاء والمجموعات، مع سترات نجاة وإرشاد من الطاقم وسرعة قابلة للتعديل حسب راحتك.",
  swimming:
    "استمتع بتوقف خاص للسباحة أثناء رحلتك على اليخت بعيداً عن ازدحام الشواطئ. نوفر دعماً من الطاقم وسترات نجاة ومرافق مريحة على متن اليخت لتجربة هادئة ومنعشة في مياه الخليج العربي.",
  "barbecue-on-the-yacht":
    "اجعل رحلتك على اليخت أكثر تميزاً مع تجربة شواء لذيذة على متن اليخت. يمكن ترتيب مأكولات بحرية ودجاج ولحوم ومقبلات أثناء الإبحار حول دبي مارينا أو نخلة جميرا أو المعالم البحرية الشهيرة.",
  fishing:
    "احجز رحلة صيد خاصة على يخت في دبي واستمتع بتجربة هادئة وممتعة في البحر. نوفر معدات الصيد والطعم ودعم الطاقم، لتناسب الرحلة المبتدئين ومحبي الصيد والعائلات والمجموعات.",
  "birthday-party":
    "احتفل بعيد ميلادك على يخت خاص في دبي مع أجواء فاخرة ولقطات لا تنسى. يمكن تجهيز الزينة والكيك والموسيقى والمأكولات والمشروبات حسب المناسبة وعدد الضيوف.",
  "graduation-parties":
    "احتفل بتخرجك بطريقة مختلفة على متن يخت فاخر في دبي. يمكن ترتيب زينة خاصة بالتخرج وكيك وموسيقى وتصوير ومسار إبحار مناسب لتشارك هذه اللحظة مع العائلة والأصدقاء.",
  "wedding-anniversary-parties":
    "اصنع ذكرى رومانسية لاحتفال زواجك مع رحلة يخت خاصة في دبي. يمكن تجهيز الزهور والشموع والموسيقى والعشاء والكيك، مع إطلالات بحرية جميلة وأجواء هادئة وخاصة.",
  "bachelor-parties":
    "نظم حفلة وداع عزوبية مميزة على يخت خاص في دبي مع موسيقى وأجواء احتفالية وتجهيزات مرنة تناسب مجموعتك. تمنحك الرحلة الخصوصية والمساحة والإطلالات البحرية الرائعة.",
  "marriage-proposal-party":
    "اجعل لحظة طلب الزواج أكثر رومانسية على يخت خاص في دبي. يمكن ترتيب زينة Marry Me والورود والشموع والكيك والموسيقى والتصوير، خصوصاً مع رحلة غروب أو مسائية.",
  "gender-reveal-party":
    "احتفلوا بتحديد جنس المولود وسط أجواء عائلية مبهجة على اليخت. يمكن تجهيز الزينة الوردية والزرقاء والبالونات والكيك ولحظة الكشف، مع مسار إبحار مناسب للعائلة.",
  "engagement-and-wedding-parties":
    "استضفوا حفلة الخطوبة أو الزفاف على يخت فاخر في دبي مع تجهيزات رومانسية وضيافة وتصوير وتنسيق كامل للمناسبة. تجربة خاصة تناسب الاحتفالات الصغيرة والأنيقة على البحر.",
  "food-menu":
    "أضف إلى رحلتك قائمة طعام مخصصة تشمل الشواء والمأكولات البحرية والوجبات الخفيفة والحلويات والمشروبات. يتم ترتيب الطعام قبل الإبحار لتكون التجربة أكثر راحة وسلاسة.",
  "donut-ride":
    "استمتع بتجربة دونات رايد مليئة بالحركة والمرح خلال رحلتك على اليخت. النشاط مناسب للأصدقاء والعائلات والمجموعات، مع سترات نجاة ودعم من الطاقم وخيارات سرعة مختلفة.",
  "jet-ski":
    "اختبر متعة الجت سكي في دبي كجزء من رحلتك البحرية الخاصة. استمتع بالانطلاق فوق مياه الخليج العربي مع إطلالات على دبي مارينا وJBR ونخلة جميرا، مع إرشادات سلامة ومعدات حديثة.",
  "afternoon-tea-trip":
    "استمتع برحلة افترنون تي راقية على متن يخت في دبي مع تشكيلة شاي وحلويات ووجبات خفيفة وأجواء هادئة. خيار جميل للجمعات النسائية والعائلية والمفاجآت الرومانسية.",
  "morning-yacht-trips":
    "ابدأ يومك برحلة يخت صباحية هادئة في دبي مع أجواء ألطف ومياه أكثر هدوءاً وفرص تصوير رائعة. يمكن إضافة إفطار ومشروبات وتوقف للسباحة أو جولة مشاهدة للمعالم.",
  "engagement-parties":
    "احتفلوا بالخطوبة على يخت خاص في دبي مع زينة أنيقة وورود وموسيقى وكيك وتصوير ومسار إبحار مخصص. تمنحكم الرحلة أجواء خاصة وفاخرة لبداية جميلة.",
  "wedding-parties":
    "حوّلوا حفل الزفاف إلى تجربة بحرية فاخرة على يخت في دبي. يمكن دعم الحفل بزينة أنيقة وكيك وضيافة وموسيقى وتصوير وتنسيق كامل للمناسبة.",
};

export const getServiceTitleAr = (slug: string, fallback: string) =>
  SERVICE_TITLE_AR[slug] ?? fallback;

export const getServiceSlugAr = (slug: string) => SERVICE_SLUG_AR[slug] ?? slug;

export const getServicePathAr = (slug: string) => `${SERVICE_INDEX_PATH_AR}/${getServiceSlugAr(slug)}`;

const INTERNAL_SLUG_BY_AR_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICE_SLUG_AR).map(([internalSlug, arSlug]) => [arSlug, internalSlug]),
);

export const getInternalServiceSlug = (slug: string) => {
  let normalized = slug;
  try {
    normalized = decodeURIComponent(slug);
  } catch {
    normalized = slug;
  }

  return INTERNAL_SLUG_BY_AR_SLUG[normalized] ?? (SERVICE_SLUG_AR[normalized] ? normalized : undefined);
};

export const getServiceDescriptionAr = (slug: string, fallback: string) =>
  SERVICE_DESCRIPTION_AR[slug] ?? fallback;

export const getServiceCategoryLabelAr = (category: ServiceCategory) =>
  SERVICE_CATEGORY_LABELS_AR[category] ?? category;
