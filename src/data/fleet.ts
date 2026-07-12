import { yachts, type YachtRecord } from "./yachts";

const values = <K extends keyof Pick<YachtRecord, "lengthFt" | "guestCapacity" | "pricePerHour" | "minimumDuration">>(key: K) =>
  yachts.map((yacht) => yacht[key]);

export const FLEET_RANGES = {
  lengthFt: { min: Math.min(...values("lengthFt")), max: Math.max(...values("lengthFt")) },
  guestCapacity: { min: Math.min(...values("guestCapacity")), max: Math.max(...values("guestCapacity")) },
  pricePerHour: { min: Math.min(...values("pricePerHour")), max: Math.max(...values("pricePerHour")) },
  minimumDuration: { min: Math.min(...values("minimumDuration")), max: Math.max(...values("minimumDuration")) },
} as const;

export const yachtPath = (yacht: Pick<YachtRecord, "slug">) => `/yachts/${yacht.slug}/` as const;

export const yachtOverview = (yacht: YachtRecord) =>
  `${yacht.name} بطول ${yacht.lengthFt} قدم وسعة مسجلة تصل إلى ${yacht.guestCapacity} ضيفاً. ` +
  `بُني عام ${yacht.yearBuilt}، ويبدأ سعره المسجل من ${yacht.pricePerHour.toLocaleString("ar-AE")} درهم للساعة ` +
  `بحد أدنى ${yacht.minimumDuration} ساعات للحجز.`;

export const capacityGuidance = (yacht: YachtRecord) =>
  `يمكن مقارنة هذا الخيار للطلبات التي لا يتجاوز عدد ضيوفها ${yacht.guestCapacity} شخصاً. ` +
  "اختيار اليخت النهائي يعتمد على العدد الفعلي ومتطلبات المناسبة، ويخضع لتأكيد فريق الحجز.";

export const relatedYachts = (current: YachtRecord, count = 3) =>
  yachts
    .filter((candidate) => candidate.id !== current.id)
    .sort((a, b) => {
      const capacityDifference = Math.abs(a.guestCapacity - current.guestCapacity) - Math.abs(b.guestCapacity - current.guestCapacity);
      if (capacityDifference !== 0) return capacityDifference;
      const lengthDifference = Math.abs(a.lengthFt - current.lengthFt) - Math.abs(b.lengthFt - current.lengthFt);
      if (lengthDifference !== 0) return lengthDifference;
      return a.slug.localeCompare(b.slug, "ar");
    })
    .slice(0, count);

export const yachtFaqs = (yacht: YachtRecord) => [
  {
    question: `كم يبلغ سعر ${yacht.name}؟`,
    answer: `السعر المسجل هو ${yacht.pricePerHour.toLocaleString("ar-AE")} درهم للساعة، والحد الأدنى ${yacht.minimumDuration} ساعات. يطلب تأكيد السعر النهائي والموعد قبل الحجز.`,
  },
  {
    question: `ما السعة القصوى المسجلة لـ ${yacht.name}؟`,
    answer: `السعة المسجلة تصل إلى ${yacht.guestCapacity} ضيفاً. أرسل العدد الفعلي عند الاستفسار للتأكد من ملاءمة الخيار.`,
  },
  {
    question: `ما البيانات المتاحة عن ${yacht.name}؟`,
    answer: `الطول ${yacht.lengthFt} قدم وسنة البناء ${yacht.yearBuilt}${yacht.numberOfBedrooms ? ` وعدد غرف النوم المسجل ${yacht.numberOfBedrooms}` : ""}. لا تُفترض أي مواصفات أو إضافات غير مذكورة.`,
  },
] as const;
