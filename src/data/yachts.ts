export interface YachtMediaRecord {
  type: "image";
  path: string;
  altAr: string;
  width: number;
  height: number;
  rightsRecordId: string;
  featured?: boolean;
  priority?: number;
}

export interface YachtRecord {
  id: string;
  slug: string;
  name: string;
  lengthFt: number;
  guestCapacity: number;
  yearBuilt: number;
  pricePerHour: number;
  minimumDuration: number;
  numberOfBedrooms?: number;
  availability?: "available" | "unavailable" | "on-request";
  featured?: boolean;
  priority?: number;
  media: YachtMediaRecord[];
}

type VerifiedYachtInput = Omit<YachtRecord, "media">;
const fallbackMedia = (name: string): YachtMediaRecord[] => [{
  type: "image",
  path: "/media/yacht-placeholder.svg",
  altAr: `صورة بديلة محايدة لليخت ${name}`,
  width: 1200,
  height: 1200,
  rightsRecordId: "media-neutral-placeholder-001",
  featured: true,
  priority: 0,
}];

const verifiedYachtData: VerifiedYachtInput[] = [
  { id: "yacht-02", slug: "عوامة-خاصة-55-قدم-للإيجار-في-دبي", name: "عوامة خاصة 55 قدم للإيجار في دبي", lengthFt: 55, guestCapacity: 15, yearBuilt: 2025, pricePerHour: 1000, minimumDuration: 2, availability: "available", featured: true, priority: 0 },
  { id: "yacht-03", slug: "رحلة-يخت-50-قدم-رويال-ماجستي", name: "رحلة يخت 50 قدم رويال ماجستي", lengthFt: 50, guestCapacity: 12, yearBuilt: 2018, pricePerHour: 600, minimumDuration: 2, numberOfBedrooms: 2, availability: "available", featured: true, priority: 1 },
  { id: "yacht-04", slug: "يخت-42-قدم-ازيموت-للايجار", name: "يخت 42 قدم ازيموت للايجار", lengthFt: 42, guestCapacity: 12, yearBuilt: 2016, pricePerHour: 400, minimumDuration: 2, numberOfBedrooms: 2, availability: "available", featured: false, priority: 6 },
  { id: "yacht-05", slug: "يخت-ماجستي-44-قدم-للايجار", name: "يخت ماجستي 44 قدم للايجار", lengthFt: 44, guestCapacity: 12, yearBuilt: 2015, pricePerHour: 450, minimumDuration: 2, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
  { id: "yacht-06", slug: "استأجار-يخت-50-قدم-ازيموت", name: "استأجار يخت 50 قدم ازيموت", lengthFt: 50, guestCapacity: 15, yearBuilt: 2015, pricePerHour: 650, minimumDuration: 2, numberOfBedrooms: 1, availability: "available", featured: false, priority: 6 },
  { id: "yacht-07", slug: "أجار-يخت-50-قدم-اوركس", name: "أجار يخت 50 قدم اوركس", lengthFt: 50, guestCapacity: 15, yearBuilt: 2018, pricePerHour: 500, minimumDuration: 2, numberOfBedrooms: 1, availability: "available", featured: false, priority: 6 },
  { id: "yacht-08", slug: "يجار-يخت-50-قدم-فيريتتي", name: "ايجار يخت 50 قدم فيريتتي", lengthFt: 50, guestCapacity: 12, yearBuilt: 2018, pricePerHour: 1000, minimumDuration: 2, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
  { id: "yacht-09", slug: "رحلة-يخت-56-قدم-ماجستي", name: "رحلة يخت 56 قدم ماجستي", lengthFt: 56, guestCapacity: 22, yearBuilt: 2016, pricePerHour: 750, minimumDuration: 2, numberOfBedrooms: 3, availability: "available", featured: true, priority: 2 },
  { id: "yacht-10", slug: "رحلة-يخت-55-قدم-ازيموت", name: "رحلة يخت 55 قدم ازيموت", lengthFt: 55, guestCapacity: 18, yearBuilt: 2020, pricePerHour: 750, minimumDuration: 2, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
  { id: "yacht-11", slug: "ايجار-يخت-ماجستي-88-قدم-جاكوزي", name: "ماجستي 88 قدم جاكوزي", lengthFt: 88, guestCapacity: 50, yearBuilt: 2013, pricePerHour: 1800, minimumDuration: 3, numberOfBedrooms: 4, availability: "available", featured: true, priority: 4 },
  { id: "yacht-12", slug: "يخت-64-قدم-ازيموت-إيطالي", name: "يخت 64 قدم ازيموت إيطالي", lengthFt: 64, guestCapacity: 25, yearBuilt: 2021, pricePerHour: 800, minimumDuration: 2, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
  { id: "yacht-13", slug: "يخت-64-قدم-هاترس-للإيجار", name: "يخت 64 قدم هاترس للإيجار", lengthFt: 64, guestCapacity: 21, yearBuilt: 2017, pricePerHour: 750, minimumDuration: 2, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
  { id: "yacht-14", slug: "يخت-بينيتي-110-قدم-مع-جاكوزي", name: "يخت بينيتي 110 قدم مع جاكوزي", lengthFt: 110, guestCapacity: 50, yearBuilt: 2021, pricePerHour: 4500, minimumDuration: 4, numberOfBedrooms: 4, availability: "available", featured: false, priority: 6 },
  { id: "yacht-15", slug: "يخت-ماجستي-101-قدم-جاكوزي-للإيجار", name: "يخت ماجستي 101 قدم جاكوزي للإيجار", lengthFt: 101, guestCapacity: 50, yearBuilt: 2015, pricePerHour: 3000, minimumDuration: 3, numberOfBedrooms: 4, availability: "available", featured: false, priority: 6 },
  { id: "yacht-16", slug: "ايجار-يخت-هايغان-90-قدم-جاكوزي", name: "ايجار يخت هايغان 90 قدم جاكوزي", lengthFt: 90, guestCapacity: 20, yearBuilt: 2016, pricePerHour: 5000, minimumDuration: 3, numberOfBedrooms: 4, availability: "available", featured: false, priority: 6 },
  { id: "yacht-17", slug: "يخت-دوريتتي-90-قدم-جاكوزي", name: "يخت دوريتتي 90 قدم جاكوزي", lengthFt: 90, guestCapacity: 45, yearBuilt: 2018, pricePerHour: 1200, minimumDuration: 2, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
  { id: "yacht-18", slug: "اوشن-دريم-يخت-143-قدم-للايجار", name: "اوشن دريم يخت 143 قدم للايجار", lengthFt: 143, guestCapacity: 130, yearBuilt: 2015, pricePerHour: 5000, minimumDuration: 4, numberOfBedrooms: 4, availability: "available", featured: false, priority: 6 },
  { id: "yacht-19", slug: "ايجار-يخت-مزايل-135-قدم-دبي", name: "ايجار يخت مزايل 135 قدم دبي", lengthFt: 135, guestCapacity: 110, yearBuilt: 2017, pricePerHour: 4000, minimumDuration: 4, numberOfBedrooms: 4, availability: "available", featured: false, priority: 6 },
  { id: "yacht-20", slug: "يخت-95-قدم-دوريتتي-مع-جاكوزي", name: "يخت 95 قدم دوريتتي مع جاكوزي", lengthFt: 95, guestCapacity: 55, yearBuilt: 2017, pricePerHour: 2000, minimumDuration: 4, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
  { id: "yacht-21", slug: "يخت-سنسيكر-92-قدم-للايجار", name: "يخت سنسيكر 92 قدم للايجار", lengthFt: 92, guestCapacity: 20, yearBuilt: 2008, pricePerHour: 4500, minimumDuration: 4, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
  { id: "yacht-22", slug: "تأجير-يخت-سنسيكر-90-قدم", name: "تأجير يخت سنسيكر 90 قدم", lengthFt: 90, guestCapacity: 30, yearBuilt: 2012, pricePerHour: 2200, minimumDuration: 2, numberOfBedrooms: 2, availability: "available", featured: true, priority: 3 },
  { id: "yacht-23", slug: "يخت-دي-تري-151-قدم-للايجار", name: "يخت دي تري 151 قدم للايجار", lengthFt: 150, guestCapacity: 120, yearBuilt: 2017, pricePerHour: 3000, minimumDuration: 4, numberOfBedrooms: 4, availability: "available", featured: false, priority: 6 },
  { id: "yacht-24", slug: "يخت-سنسيكر-108-قدم-مع-جاكوزي", name: "سنسيكر 108 قدم مع جاكوزي", lengthFt: 108, guestCapacity: 25, yearBuilt: 2016, pricePerHour: 5000, minimumDuration: 4, numberOfBedrooms: 4, availability: "available", featured: true, priority: 5 },
  { id: "yacht-25", slug: "يخت-اوميغا-100-قدم-للايجار", name: "يخت اوميغا 100 قدم للايجار", lengthFt: 100, guestCapacity: 50, yearBuilt: 2013, pricePerHour: 2500, minimumDuration: 4, numberOfBedrooms: 3, availability: "available", featured: false, priority: 6 },
];

export const yachts: YachtRecord[] = verifiedYachtData.map((yacht) => ({ ...yacht, media: fallbackMedia(yacht.name) }));

if (yachts.length !== 24) throw new Error(`Expected 24 verified yacht records, received ${yachts.length}`);
