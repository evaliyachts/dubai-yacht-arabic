export interface RawYachtData {
  idx: number;
  id: number;
  created_at: string;
  name: string;
  length_ft: number;
  guest_capacity: number;
  year_built: number;
  price_per_hour: number;
  image_url: string;
  gallery: string[];
  availability: boolean;
  featured: boolean;
  number_of_bedrooms: number;
  minimum_duration: number;
  priority: number;
  schema_json_ld: string | null;
  slug: string;
  mini_description?: string;
  short_description?: string;
  long_description?: string;
  ar_long_description?: string;
}

export interface Yacht {
  slug: string;
  name: string;
  type: "Standard" | "Luxury" | "Superyacht";
  length_ft: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  crew: number;
  price_per_hour_from_aed: number;
  images: string[];
  featured: boolean;
  description: string;
  inclusions: string[];
  add_ons: string[];
  tags: string[];
  id: number;
  idx: number;
  created_at: string;
  guest_capacity: number;
  year_built: number;
  price_per_hour: number;
  image_url: string;
  gallery: string[];
  availability: boolean;
  number_of_bedrooms: number;
  minimum_duration: number;
  priority: number;
  schema_json_ld: string | null;
  mini_description?: string;
  short_description?: string;
  long_description?: string;
  ar_long_description?: string;
}

const STANDARD_INCLUSIONS = [
  "كابتن وطاقم",
  "وقود للمسار القياسي",
  "ماء ومشروبات غازية",
  "نظام صوتي بلوتوث",
  "معدات السلامة",
  "صندوق ثلج",
];

const STANDARD_ADD_ONS = [
  "ديكور عيد ميلاد",
  "قائمة شواء",
  "كيك",
  "جت سكي",
  "تصوير",
  "ضيافة مباشرة",
];

const getYachtType = (yacht: RawYachtData): Yacht["type"] => {
  if (yacht.length_ft >= 80 || yacht.guest_capacity >= 30 || yacht.price_per_hour >= 1600) {
    return "Superyacht";
  }

  if (yacht.length_ft >= 50 || yacht.price_per_hour >= 650) {
    return "Luxury";
  }

  return "Standard";
};

const getBathrooms = (yacht: RawYachtData) => {
  if (yacht.length_ft >= 100) return 5;
  if (yacht.length_ft >= 80) return 4;
  if (yacht.length_ft >= 55) return 3;
  if (yacht.number_of_bedrooms >= 2) return 2;
  return 1;
};

const getCrew = (yacht: RawYachtData) => {
  if (yacht.length_ft >= 100) return 6;
  if (yacht.length_ft >= 80) return 5;
  if (yacht.length_ft >= 55) return 3;
  return 2;
};

const getTags = (yacht: RawYachtData) => {
  const text = `${yacht.name} ${yacht.ar_long_description ?? ""} ${yacht.long_description ?? ""}`;
  const tags = ["dubai marina", "yacht rental dubai"];

  if (yacht.featured) tags.push("featured");
  if (yacht.guest_capacity >= 30) tags.push("events");
  if (yacht.length_ft >= 80) tags.push("vip");
  if (text.includes("جاكوزي")) tags.push("jacuzzi");
  if (text.includes("عيد ميلاد") || text.includes("حفلات")) tags.push("party");
  if (text.includes("صيد")) tags.push("fishing");
  if (text.includes("سباحة")) tags.push("swimming");

  return tags;
};

export const transformYachtData = (rawYachts: RawYachtData[]): Yacht[] =>
  rawYachts.map((yacht) => ({
    ...yacht,
    slug: yacht.slug,
    name: yacht.name,
    type: getYachtType(yacht),
    length_ft: yacht.length_ft,
    max_guests: yacht.guest_capacity,
    bedrooms: yacht.number_of_bedrooms ?? 0,
    bathrooms: getBathrooms(yacht),
    crew: getCrew(yacht),
    price_per_hour_from_aed: yacht.price_per_hour,
    images: yacht.gallery?.length ? yacht.gallery : [yacht.image_url],
    featured: yacht.featured,
    description:
      yacht.ar_long_description ??
      yacht.long_description ??
      yacht.short_description ??
      yacht.mini_description ??
      "",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: getTags(yacht),
  }));
