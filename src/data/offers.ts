export interface Offer {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  price_label: string;
  inclusions: string[];
  description: string;
  featured: boolean;
  badge?: string;
}

export const offers: Offer[] = [
  {
    slug: "sunset-escape",
    name: "Sunset Escape",
    tagline: "Golden hour on the Arabian Gulf",
    duration: "2 Hours",
    price_label: "From AED 999",
    inclusions: ["2-hour sunset cruise", "Welcome drinks & canapés", "Professional captain & crew", "Sound system", "Dubai Marina & JBR route", "Photo opportunities"],
    description: "Sail into the golden hour along Dubai's stunning coastline. Perfect for couples, small groups, and anyone seeking a magical sunset experience past the iconic skyline.",
    featured: true,
    badge: "Most Popular",
  },
  {
    slug: "marina-party",
    name: "Marina Party",
    tagline: "Celebrate in style on the water",
    duration: "4 Hours",
    price_label: "From AED 2,499",
    inclusions: ["4-hour private yacht party", "Premium drinks package", "BBQ & catering", "DJ-ready sound system", "Swimming & water toys", "Birthday/party decorations"],
    description: "The ultimate party venue — a luxury yacht cruising Dubai Marina. Includes everything you need for an unforgettable celebration on the water.",
    featured: true,
    badge: "Best Value",
  },
  {
    slug: "vip-celebration",
    name: "VIP Celebration",
    tagline: "The pinnacle of Dubai luxury",
    duration: "6 Hours",
    price_label: "From AED 5,999",
    inclusions: ["6-hour superyacht experience", "All-inclusive premium bar", "Gourmet dining by private chef", "Water sports & jet ski", "Professional photography", "Event coordinator", "VIP decorations"],
    description: "An exclusive superyacht experience with white-glove service. Ideal for proposals, milestones, corporate VIP events, and anyone who demands the finest.",
    featured: true,
    badge: "Premium",
  },
];
