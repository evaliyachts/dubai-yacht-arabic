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
}

const SUPABASE_BASE = "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/yachts/";
const CDN_BASE = "https://yacht.fra1.cdn.digitaloceanspaces.com/";

const STANDARD_INCLUSIONS = [
  "Professional Captain",
  "Fuel",
  "Soft Drinks & Water",
  "Ice & Cooler",
  "Sound System",
  "Safety Equipment",
  "Crew Assistance",
  "Towels & Amenities",
  "Swimming Platform",
];

const STANDARD_ADD_ONS = [
  "Jet Ski - AED 600/hr",
  "BBQ Setup - AED 400",
  "DJ Setup - AED 1500",
  "Decoration Package - AED 800",
];

const STANDARD_TAGS = [
  "birthday",
  "corporate",
  "cruise",
  "dubai marina",
  "party",
  "palm jumeirah",
  "sunset",
];

const yachtsRaw: Yacht[] = [
  {
    slug: "evali-yacht-55ft-yacht-rental-dubai",
    name: "Evali Yacht 55ft Yacht Rental Dubai",
    type: "Luxury",
    length_ft: 55,
    max_guests: 15,
    bedrooms: 1,
    bathrooms: 2,
    crew: 3,
    price_per_hour_from_aed: 1000,
    images: [],
    featured: true,
    description:
      "Modern 55ft Evali yacht rental Dubai (2025) with stylish interiors and spacious deck — perfect for parties, sightseeing, and private cruises in Dubai Marina.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: ["atlantis", "birthday", "bluewaters", "burj al arab", "corporate", "dubai marina", "palm jumeirah", "party"],
  },
  {
    slug: "50-feet-royal-majesty-dubai-yacht-rental",
    name: "50 Feet Royal Majesty Dubai Yacht Rental",
    type: "Luxury",
    length_ft: 50,
    max_guests: 12,
    bedrooms: 2,
    bathrooms: 2,
    crew: 3,
    price_per_hour_from_aed: 600,
    images: [],
    featured: true,
    description:
      "Premium 50ft Royal Majesty Dubai yacht rental with elegant interiors — perfect for celebrations, sightseeing, and private cruises along Dubai's iconic coastline.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: STANDARD_TAGS,
  },
  {
    slug: "42-feet-azimut-yacht-rental-dubai",
    name: "42 Feet Azimut Yacht Rental Dubai",
    type: "Standard",
    length_ft: 42,
    max_guests: 12,
    bedrooms: 2,
    bathrooms: 1,
    crew: 2,
    price_per_hour_from_aed: 500,
    images: [],
    featured: false,
    description:
      "Comfortable 42ft Azimut yacht rental Dubai, ideal for family trips, intimate gatherings, and relaxed cruising around Palm Jumeirah and Dubai Marina.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: STANDARD_TAGS,
  },
  {
    slug: "majesty-44-feet-dubai-yacht-rental",
    name: "Majesty 44 Feet Dubai Yacht Rental",
    type: "Standard",
    length_ft: 44,
    max_guests: 12,
    bedrooms: 3,
    bathrooms: 2,
    crew: 2,
    price_per_hour_from_aed: 500,
    images: [],
    featured: false,
    description:
      "Majesty 44ft Dubai yacht rental with three bedrooms and a refined layout — great for small groups, special occasions, and private coastal cruising.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: STANDARD_TAGS,
  },
  {
    slug: "50-feet-azimut-yacht-rental-dubai",
    name: "50 Feet Azimut Yacht Rental Dubai",
    type: "Luxury",
    length_ft: 50,
    max_guests: 15,
    bedrooms: 1,
    bathrooms: 2,
    crew: 3,
    price_per_hour_from_aed: 650,
    images: [],
    featured: false,
    description:
      "Stylish 50ft Azimut yacht rental Dubai featuring premium finishes and spacious sundeck — perfect for parties, corporate trips, and luxury cruising.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: STANDARD_TAGS,
  },
  {
    slug: "oryx-50-feet-dubai-yacht-rental",
    name: "Oryx 50 Feet Dubai Yacht Rental",
    type: "Luxury",
    length_ft: 50,
    max_guests: 15,
    bedrooms: 1,
    bathrooms: 2,
    crew: 3,
    price_per_hour_from_aed: 550,
    images: [],
    featured: false,
    description:
      "Oryx 50ft Dubai yacht rental with a sleek design and comfortable layout — ideal for sightseeing, parties, and private cruising in Dubai Marina.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: STANDARD_TAGS,
  },
  {
    slug: "ferretti-50-feet-yacht-rental-dubai",
    name: "Ferretti 50 Feet Yacht Rental Dubai",
    type: "Luxury",
    length_ft: 50,
    max_guests: 12,
    bedrooms: 3,
    bathrooms: 2,
    crew: 3,
    price_per_hour_from_aed: 1000,
    images: [],
    featured: false,
    description:
      "Iconic Ferretti 50ft yacht rental Dubai combining Italian design with luxury comfort — a perfect choice for VIP cruises, celebrations, and corporate events.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: ["birthday", "corporate", "cruise", "dubai marina", "party", "palm jumeirah", "vip"],
  },
  {
    slug: "56-feet-majesty-dubai-yacht-rental",
    name: "56 Feet Majesty Dubai Yacht Rental",
    type: "Luxury",
    length_ft: 56,
    max_guests: 22,
    bedrooms: 3,
    bathrooms: 2,
    crew: 3,
    price_per_hour_from_aed: 750,
    images: [],
    featured: true,
    description:
      "Spacious 56ft Majesty Dubai yacht rental with three bedrooms and ample deck space — ideal for parties, corporate events, and family celebrations on the water.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: STANDARD_TAGS,
  },
  {
    slug: "55-feet-azimut-yacht-rental-dubai",
    name: "55 Feet Azimut Yacht Rental Dubai",
    type: "Luxury",
    length_ft: 55,
    max_guests: 18,
    bedrooms: 3,
    bathrooms: 2,
    crew: 3,
    price_per_hour_from_aed: 750,
    images: [],
    featured: false,
    description:
      "Modern 55ft Azimut yacht rental Dubai (2020) with elegant interiors and spacious decks — a top pick for luxurious cruises, parties, and VIP events.",
    inclusions: STANDARD_INCLUSIONS,
    add_ons: STANDARD_ADD_ONS,
    tags: ["birthday", "corporate", "cruise", "dubai marina", "party", "palm jumeirah", "vip"],
  },
  {
    slug: "majesty-88ft-jacuzzi-dubai-yacht-rental",
    name: "Majesty 88ft (Jacuzzi) Dubai Yacht Rental",
    type: "Superyacht",
    length_ft: 88,
    max_guests: 50,
    bedrooms: 4,
    bathrooms: 4,
    crew: 5,
    price_per_hour_from_aed: 1800,
    images: [],
    featured: true,
    description:
      "Stunning Majesty 88ft superyacht with a private Jacuzzi for Dubai yacht rental — perfect for large parties, weddings, corporate events, and unforgettable VIP experiences.",
    inclusions: [...STANDARD_INCLUSIONS, "Jacuzzi"],
    add_ons: STANDARD_ADD_ONS,
    tags: ["birthday", "corporate", "cruise", "dubai marina", "party", "palm jumeirah", "sunset", "vip", "wedding", "jacuzzi"],
  },
];

const verifiedCdnGalleries: Record<string, { folder: string; indexes: number[] }> = {
  "evali-yacht-55ft-yacht-rental-dubai": { folder: "evali_55_feet_yacht_rental_dubai", indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
  "50-feet-royal-majesty-dubai-yacht-rental": { folder: "50_feet_royal_majesty", indexes: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  "42-feet-azimut-yacht-rental-dubai": { folder: "azimut_42_feet_yacht_rental_dubai", indexes: [1, 2, 3, 4, 5] },
  "majesty-44-feet-dubai-yacht-rental": { folder: "majesty_44_feet_yacht_rental_dubai", indexes: [1, 2, 3, 4, 5] },
  "50-feet-azimut-yacht-rental-dubai": { folder: "azimut_50_feet_yacht_rental_dubai", indexes: [1, 2, 3, 4, 5, 6, 7] },
  "oryx-50-feet-dubai-yacht-rental": { folder: "oryx_50_feet_yacht_rental_dubai", indexes: [1, 2, 3, 4, 5, 6] },
  "ferretti-50-feet-yacht-rental-dubai": { folder: "ferretti_50_feet_yacht_rental_dubai", indexes: [1, 2, 3, 4, 5, 6, 7] },
  "56-feet-majesty-dubai-yacht-rental": { folder: "56_feet_majesty_yacht_trip", indexes: [1, 2, 3, 4, 5] },
  "55-feet-azimut-yacht-rental-dubai": { folder: "azimut_55_feet_yacht_rental_dubai", indexes: [1, 2, 3, 4, 5, 6, 7] },
  "majesty-88ft-jacuzzi-dubai-yacht-rental": { folder: "88_feet_majesty_yacht_with_jacuzzi_charter", indexes: [1, 2, 3, 4, 5, 6, 7] },
};

const buildCdnGallery = (folder: string, indexes: number[]) =>
  indexes.map((index) => `${CDN_BASE}${folder}/${folder}${index}.webp`);

const rewriteToCdn = (url: string) => url.replace(SUPABASE_BASE, CDN_BASE);

export const yachts: Yacht[] = yachtsRaw.map((y) => {
  const verifiedGallery = verifiedCdnGalleries[y.slug];
  return {
    ...y,
    images: verifiedGallery
      ? buildCdnGallery(verifiedGallery.folder, verifiedGallery.indexes)
      : y.images.map(rewriteToCdn),
  };
});
