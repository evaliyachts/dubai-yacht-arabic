export type ServiceCategory = "water sport" | "service" | "package";

export interface Service {
  id: number;
  slug: string;
  title: string;
  category: ServiceCategory;
  cover_image: string;
  gallery: string[];
  description: string;
}

const CDN_BASE = "https://services.fra1.cdn.digitaloceanspaces.com/";
const LEGACY_PREFIX =
  "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/";

const toCdn = (url: string): string => {
  if (url.startsWith(LEGACY_PREFIX)) {
    return CDN_BASE + decodeURIComponent(url.slice(LEGACY_PREFIX.length));
  }
  return url;
};

const sanitize = (text: string): string =>
  text
    .replace(/Yacht Rental dxb/gi, "Dubai Yatch")
    .replace(/\bEvali\b/gi, "Dubai Yatch");

interface RawService {
  id: number;
  title: string;
  cover_image: string;
  gallery: string[];
  description: string;
  category: ServiceCategory;
  slug: string;
}

const raw: RawService[] = [
  {
    id: 5,
    title: "Banana Boat Ride",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/banana-boat-ride/photo_2025-04-05_12-30-23-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/banana-boat-ride/photo_2025-04-05_12-30-23-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/banana-boat-ride/photo_2025-04-05_12-29-24-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/banana-boat-ride/photo_2025-04-05_12-30-01-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/banana-boat-ride/photo_2025-04-05_12-30-09-1.webp",
    ],
    description:
      "Add more excitement to your yacht rental in Dubai with a thrilling banana boat ride by Yacht Rental dxb. This fun water activity is perfect for families, friends, tourists, and groups looking for an unforgettable sea adventure near Dubai Marina, JBR, Bluewaters Island, and Palm Jumeirah. Enjoy a safe inflatable banana boat experience pulled by a speedboat, with life jackets, crew guidance, and adjustable speed based on your comfort level. Whether you want a playful ride or a high-energy water sport session, our banana boat activity brings extra fun to your Dubai yacht trip.",
    category: "water sport",
    slug: "banana-boat-ride",
  },
  {
    id: 6,
    title: "Swimming",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/swimming-experience-yacht-trip/IMG_8222-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/swimming-experience-yacht-trip/IMG_8231-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/swimming-experience-yacht-trip/IMG_7518-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/swimming-experience-yacht-trip/IMG_8249-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/swimming-experience-yacht-trip/IMG_8250-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/swimming-experience-yacht-trip/IMG_8264-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/swimming-experience-yacht-trip/IMG_8265-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/swimming-experience-yacht-trip/IMG_7528-1.webp",
    ],
    description:
      "Enjoy a private swimming experience during your yacht rental in Dubai with Yacht Rental dxb. Escape crowded beaches and relax in clear Arabian Gulf waters with beautiful views of Palm Jumeirah, Burj Al Arab, Dubai Marina, and Ain Dubai. Our yacht trips can include safe swimming stops, crew support, life jackets, and comfortable onboard facilities for relaxing before and after your swim. This service is ideal for families, couples, friends, and private groups who want a peaceful yacht cruise in Dubai with a refreshing sea swim and complete privacy.",
    category: "service",
    slug: "swimming",
  },
  {
    id: 7,
    title: "Barbecue on the Yacht",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bbq-experience/IMG_8252-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bbq-experience/IMG_8252-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bbq-experience/photo_2025-04-05_12-24-44-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bbq-experience/photo_2025-04-05_12-25-09-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bbq-experience/photo_2025-04-05_12-25-54-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bbq-experience/photo_2025-04-05_12-26-41-1.webp",
    ],
    description:
      "Make your Dubai yacht rental more memorable with a delicious barbecue experience on board. Yacht Rental dxb offers BBQ yacht trips in Dubai for friends, families, birthday groups, corporate outings, and private celebrations. Enjoy freshly grilled seafood, chicken, meats, and side dishes while cruising past Dubai Marina, JBR, Bluewaters Island, or Palm Jumeirah. The BBQ experience combines luxury yacht cruising, sea views, fresh food, and relaxed social moments, making it one of the most requested add-ons for private yacht rental in Dubai.",
    category: "service",
    slug: "barbecue-on-the-yacht",
  },
  {
    id: 8,
    title: "Fishing",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/fishing-trips/IMG_8255-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/fishing-trips/IMG_8255-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/fishing-trips/IMG_8253-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/fishing-trips/IMG_8254-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/fishing-trips/IMG_8256-1.webp",
    ],
    description:
      "Book a private fishing yacht rental in Dubai with Yacht Rental dxb and enjoy a calm yet exciting sea adventure. Our fishing trips are suitable for beginners, experienced anglers, families, and groups looking for a different yacht experience in Dubai. Cruise to selected fishing spots in the Arabian Gulf with support from an experienced crew, fishing equipment, bait, and comfortable onboard seating. Whether you prefer an early morning fishing trip or a relaxed private yacht outing, this service combines fishing, sightseeing, and luxury cruising in one unforgettable Dubai experience.",
    category: "service",
    slug: "fishing",
  },
  {
    id: 9,
    title: "Birthday Party",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/birthday-party/IMG-20250405-WA0024-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/birthday-party/IMG-20250405-WA0024-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/birthday-party/IMG-20250405-WA0025-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/birthday-party/IMG-20250404-WA0001-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/birthday-party/IMG-20250405-WA0018-1.webp",
    ],
    description:
      "Celebrate your birthday with a private yacht rental in Dubai designed for fun, luxury, and unforgettable photos. Yacht Rental dxb provides birthday yacht party packages with decoration options, cake, music, food, drinks, and professional crew service. Whether you want a small birthday gathering or a lively party with friends, our yachts create the perfect setting with Dubai Marina, JBR, Ain Dubai, and Palm Jumeirah as your backdrop. Make your next birthday different with a private yacht party in Dubai that feels exclusive, stylish, and full of celebration.",
    category: "package",
    slug: "birthday-party",
  },
  {
    id: 11,
    title: "Graduation Parties",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/graduation-party/IMG-20250405-WA0020-1-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/graduation-party/IMG-20250405-WA0021-1-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/graduation-party/IMG-20250405-WA0022-1-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/graduation-party/IMG-20250405-WA0023-1-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/graduation-party/IMG-20250405-WA0020-1-1.webp",
    ],
    description:
      "Mark your graduation with a luxury yacht rental in Dubai by Yacht Rental dxb. A graduation party on a private yacht is a perfect way to celebrate success with family, classmates, and friends while enjoying Dubai's sea views. We can arrange graduation-themed decoration, cake, music, photography, food, and a custom cruising route around Dubai Marina, JBR, Bluewaters Island, or Palm Jumeirah. Whether it is a school, university, or professional graduation, our yacht party experience gives your achievement a stylish and memorable celebration.",
    category: "package",
    slug: "graduation-parties",
  },
  {
    id: 12,
    title: "Wedding Anniversary Parties",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/yacht-journey/Yacht-Weddings.jpeg",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/yacht-journey/Yacht-Weddings.jpeg",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0002.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0003.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0004.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0017.webp",
    ],
    description:
      "Create a romantic wedding anniversary celebration with a private yacht rental in Dubai. Yacht Rental dxb helps couples celebrate love with elegant yacht decoration, flowers, candles, music, dinner setup, anniversary cake, and stunning sea views. Choose a sunset cruise, evening yacht trip, or private dinner on board while passing iconic Dubai landmarks such as Burj Al Arab, Dubai Marina, and Palm Jumeirah. This yacht anniversary package is ideal for couples who want privacy, luxury, and a beautiful setting away from traditional restaurants and crowded venues.",
    category: "package",
    slug: "wedding-anniversary-parties",
  },
  {
    id: 13,
    title: "Bachelor Parties",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bachelor-party-on-yacht/IMG-20250405-WA0001.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bachelor-party-on-yacht/IMG-20250405-WA0001.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bachelor-party-on-yacht/IMG-20250405-WA0002.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bachelor-party-on-yacht/IMG-20250405-WA0003.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/bachelor-party-on-yacht/IMG-20250405-WA0005.webp",
    ],
    description:
      "Plan an unforgettable bachelor party yacht rental in Dubai with Yacht Rental dxb. Enjoy a private yacht celebration with music, themed decoration, food, drinks, sea views, and a flexible party setup for the groom, bride-to-be, or close friends. A bachelor yacht party in Dubai gives you privacy, space, and an energetic atmosphere while cruising around Dubai Marina, JBR, Bluewaters Island, or Palm Jumeirah. From relaxed daytime gatherings to lively evening parties, we help you create a premium yacht rental experience before the big day.",
    category: "package",
    slug: "bachelor-parties",
  },
  {
    id: 14,
    title: "Marriage Proposal Party",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/marriage-proposal-part/IMG-20250405-WA0007-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/marriage-proposal-part/IMG-20250405-WA0004-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/marriage-proposal-part/IMG-20250405-WA0006-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/marriage-proposal-part/IMG-20250405-WA0007-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/marriage-proposal-part/IMG-20250405-WA0008-1.webp",
    ],
    description:
      "Make your proposal magical with a romantic yacht rental in Dubai by Yacht Rental dxb. We arrange private proposal yacht packages with flowers, candles, balloons, \"Marry Me\" decoration, cake, music, dinner options, and photography support. Choose a sunset or evening cruise for a breathtaking moment surrounded by Dubai's skyline, Arabian Gulf views, and complete privacy. A marriage proposal on a yacht in Dubai is perfect for couples looking for a memorable, elegant, and emotional experience that feels personal, luxurious, and beautifully planned.",
    category: "package",
    slug: "marriage-proposal-party",
  },
  {
    id: 15,
    title: "Gender Reveal Party",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/gender-reveal-party/IMG-20250405-WA0009-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/gender-reveal-party/IMG-20250405-WA0010-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/gender-reveal-party/IMG-20250405-WA0011-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/gender-reveal-party/IMG-20250405-WA0012-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/gender-reveal-party/IMG-20250405-WA0009-1.webp",
    ],
    description:
      "Celebrate your baby's gender reveal with a private yacht rental in Dubai from Yacht Rental dxb. Our gender reveal yacht party packages can include pink and blue decoration, balloons, cake, reveal setup, music, photography, food, drinks, and family-friendly cruising routes. Enjoy a joyful moment surrounded by loved ones with Dubai Marina, JBR, Ain Dubai, or Palm Jumeirah as your scenic background. This yacht party in Dubai is ideal for families who want a private, stylish, and emotional celebration on the water.",
    category: "package",
    slug: "gender-reveal-party",
  },
  {
    id: 16,
    title: "Engagement and Wedding Parties",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-celebration-on%20yacht-in-dubai/IMG-20250405-WA0040.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-celebration-on%20yacht-in-dubai/IMG-20250405-WA0036.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-celebration-on%20yacht-in-dubai/IMG-20250405-WA0038.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-celebration-on%20yacht-in-dubai/IMG-20250405-WA0040.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-celebration-on%20yacht-in-dubai/IMG-20250405-WA0041.webp",
    ],
    description:
      "Host your engagement or wedding celebration on a luxury yacht in Dubai with Yacht Rental dxb. Our private yacht rental packages can be customized with romantic decoration, flowers, wedding cake, live music or DJ, catering, photography, and full event coordination. Whether you are planning an intimate engagement, a small wedding party, or a premium sea celebration, a yacht offers privacy, elegance, and unforgettable Dubai skyline views. Celebrate your love story on the water with a luxury yacht experience designed around your style.",
    category: "package",
    slug: "engagement-and-wedding-parties",
  },
  {
    id: 17,
    title: "Food Menu",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-34.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-12.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-17.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-21.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-24.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-29.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-38.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-41.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-46.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/food-menu/photo_2025-04-02_19-40-51.webp",
    ],
    description:
      "Upgrade your yacht rental in Dubai with a customized food menu from Yacht Rental dxb. Choose from BBQ meals, seafood, snacks, desserts, cold drinks, fresh juices, and special dining options for birthdays, anniversaries, proposals, corporate trips, and private parties. Food can be arranged before departure so your yacht trip feels smooth, comfortable, and premium. Whether you want a simple menu for friends or a luxury dining setup with Dubai skyline views, our onboard food service adds hospitality and flavor to your private yacht experience.",
    category: "service",
    slug: "food-menu",
  },
  {
    id: 18,
    title: "Donut Ride",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/donut-ride-adventure/photo_2025-04-05_12-30-46-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/donut-ride-adventure/photo_2025-04-05_12-30-39-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/donut-ride-adventure/photo_2025-04-05_12-30-46-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/donut-ride-adventure/photo_2025-04-05_12-31-01-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/donut-ride-adventure/photo_2025-04-05_12-31-04-1.webp",
    ],
    description:
      "Add a donut ride to your Dubai yacht rental for a fun and energetic water sport experience. Yacht Rental dxb offers donut rides for friends, families, and groups who want more excitement during their private yacht trip. The inflatable donut is pulled by a speedboat across Dubai's blue waters, giving riders a safe but thrilling adventure. With life jackets, crew support, and speed options, this activity is suitable for both beginners and thrill seekers. It is a perfect add-on for yacht parties, group trips, and sea adventures in Dubai.",
    category: "water sport",
    slug: "donut-ride",
  },
  {
    id: 19,
    title: "Jet Ski",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/jet-ski-rental/IMG_8260-1.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/jet-ski-rental/IMG_7681-1.jpg",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/jet-ski-rental/IMG_8213-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/jet-ski-rental/IMG_8234-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/jet-ski-rental/IMG_8259-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/jet-ski-rental/IMG_8260-1.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/jet-ski-rental/IMG_8262-1.jpg",
    ],
    description:
      "Experience the thrill of jet ski rental in Dubai as part of your private yacht trip with Yacht Rental dxb. Ride across the Arabian Gulf and enjoy incredible views of JBR, Dubai Marina, Burj Al Arab, Bluewaters Island, and Palm Jumeirah. Our jet ski service is ideal for adventure lovers who want to combine luxury yacht rental with high-speed water sports. With safety guidance, modern equipment, and flexible booking options, jet skiing adds action, excitement, and unforgettable photos to your Dubai yacht experience.",
    category: "water sport",
    slug: "jet-ski",
  },
  {
    id: 20,
    title: "Afternoon Tea Trip",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/afternoon-tea-trip/IMG-20250405-WA0027.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/afternoon-tea-trip/IMG-20250405-WA0014.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/afternoon-tea-trip/IMG-20250405-WA0013.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/afternoon-tea-trip/IMG-20250405-WA0026.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/afternoon-tea-trip/IMG-20250405-WA0027.webp",
    ],
    description:
      "Enjoy a refined afternoon tea yacht trip in Dubai with Yacht Rental dxb. This elegant experience combines private yacht rental, premium tea selections, light bites, desserts, calm music, and beautiful sea views. It is perfect for ladies' gatherings, family outings, bridal celebrations, romantic surprises, or relaxed business hosting. Cruise around Dubai Marina, Bluewaters Island, Palm Jumeirah, or Burj Al Arab while enjoying a peaceful luxury atmosphere. For guests who want a softer and more elegant yacht experience in Dubai, afternoon tea on board is a beautiful choice.",
    category: "package",
    slug: "afternoon-tea-trip",
  },
  {
    id: 22,
    title: "Morning Yacht Trips",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/morning-yacht-trip/IMG-20250405-WA0015.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/morning-yacht-trip/IMG-20250405-WA0015.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/morning-yacht-trip/IMG-20250405-WA0016.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/morning-yacht-trip/IMG-20250405-WA0017.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/morning-yacht-trip/IMG-20250405-WA0019.webp",
    ],
    description:
      "Start your day with a peaceful morning yacht rental in Dubai by Yacht Rental dxb. Morning yacht trips are perfect for families, couples, tourists, and small groups who want cooler weather, calm waters, soft sunlight, and amazing photo opportunities. Enjoy breakfast options, fresh drinks, sightseeing, swimming stops, and a relaxing cruise around Dubai Marina, JBR, Palm Jumeirah, Ain Dubai, or Burj Al Arab. A morning yacht trip in Dubai is one of the best ways to experience the sea before the city gets busy.",
    category: "package",
    slug: "morning-yacht-trips",
  },
  {
    id: 23,
    title: "Engagement Parties",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/engagement-party/IMG-20250405-WA0035.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/engagement-party/IMG-20250405-WA0033.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/engagement-party/IMG-20250405-WA0034.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/engagement-party/IMG-20250405-WA0035.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/engagement-party/IMG-20250405-WA0037.webp",
    ],
    description:
      "Celebrate your engagement with a romantic private yacht rental in Dubai from Yacht Rental dxb. Our engagement yacht party service can include elegant flowers, balloons, ring ceremony setup, music, cake, catering, photography, and a customized cruise route. Whether you prefer a small family celebration or a stylish event with friends, a yacht gives your engagement a private and luxurious setting. Enjoy Dubai's skyline, sea breeze, and beautiful photo moments while celebrating the beginning of your next chapter together.",
    category: "package",
    slug: "engagement-parties",
  },
  {
    id: 24,
    title: "Wedding Parties",
    cover_image:
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0004.webp",
    gallery: [
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0002.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0003.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0004.webp",
      "https://rmkuurzppholugvtgtvk.supabase.co/storage/v1/object/public/evali/wedding-anniversary-celebration/IMG-20250404-WA0017.webp",
    ],
    description:
      "Turn your wedding celebration into a luxury sea experience with Yacht Rental dxb. Our wedding yacht rental in Dubai is designed for couples who want a private, stylish, and memorable event with stunning views of the Arabian Gulf. We can support your celebration with elegant decoration, wedding cake, dining options, music, photography, and full event coordination. From intimate ceremonies to premium yacht wedding parties, our Dubai yacht rental service offers a beautiful alternative to traditional venues and creates unforgettable moments on the water.",
    category: "package",
    slug: "wedding-parties",
  },
];

export const services: Service[] = raw.map((s) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  category: s.category,
  cover_image: toCdn(s.cover_image),
  gallery: s.gallery.map(toCdn),
  description: sanitize(s.description),
}));

export const SERVICE_CATEGORIES: { key: ServiceCategory; label: string }[] = [
  { key: "package", label: "Packages & Celebrations" },
  { key: "service", label: "Onboard Services" },
  { key: "water sport", label: "Water Sports" },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
