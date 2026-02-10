export interface Occasion {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  recommended_yachts: string[];
  suggested_duration: string;
  add_ons: string[];
  keywords: string[];
}

export const occasions: Occasion[] = [
  {
    slug: "birthday",
    name: "Birthday Party",
    tagline: "Celebrate your special day on the water",
    description: "Make your birthday unforgettable with a private yacht party in Dubai Marina. From intimate gatherings to grand celebrations, we customize every detail — decorations, cake, music, and catering — for a truly spectacular birthday at sea.",
    recommended_yachts: ["royal-wave-55", "golden-horizon-65", "dubai-empress-90"],
    suggested_duration: "3–4 hours",
    add_ons: ["Birthday cake & balloons", "Custom decorations", "DJ setup", "Photography"],
    keywords: ["birthday yacht party dubai", "birthday celebration dubai marina"],
  },
  {
    slug: "proposal",
    name: "Proposal",
    tagline: "Pop the question with Dubai's skyline as your backdrop",
    description: "Create the most romantic moment of your lives aboard a luxury yacht. We arrange rose petals, champagne, candles, and a private crew to ensure your proposal is absolutely perfect against the stunning Dubai sunset.",
    recommended_yachts: ["golden-horizon-65", "arabian-nights-68", "pearl-voyager-52"],
    suggested_duration: "2–3 hours",
    add_ons: ["Rose petal setup", "Champagne & chocolates", "Violin player", "Photography & videography"],
    keywords: ["proposal yacht dubai", "romantic yacht dubai"],
  },
  {
    slug: "corporate",
    name: "Corporate Event",
    tagline: "Impress clients and reward teams",
    description: "Elevate your corporate gathering with a premium yacht charter. Whether it's a client meeting, team building, product launch, or executive retreat, our fleet and crew deliver impeccable service in an extraordinary setting.",
    recommended_yachts: ["dubai-empress-90", "ocean-majesty-75", "sea-diamond-80"],
    suggested_duration: "4–6 hours",
    add_ons: ["AV equipment", "Branded setup", "Corporate catering", "Event coordinator"],
    keywords: ["corporate yacht event dubai", "corporate yacht charter dubai"],
  },
  {
    slug: "fishing",
    name: "Fishing Trip",
    tagline: "Deep-sea fishing in the Arabian Gulf",
    description: "Head offshore with experienced captains who know Dubai's best fishing spots. We provide all equipment — rods, bait, tackle — and you bring the competitive spirit. Catch kingfish, barracuda, hammour, and more.",
    recommended_yachts: ["breeze-runner-38", "azure-dream-42", "sunset-chaser-45"],
    suggested_duration: "4–6 hours",
    add_ons: ["Extra fishing gear", "BBQ your catch", "Cold beverages"],
    keywords: ["fishing yacht dubai", "deep sea fishing dubai"],
  },
  {
    slug: "sunset-cruise",
    name: "Sunset Cruise",
    tagline: "Chase the golden hour along Dubai's coast",
    description: "Watch the sun dip below the horizon as you cruise past the Palm Jumeirah, Burj Al Arab, and Atlantis. A sunset cruise is the quintessential Dubai experience — peaceful, beautiful, and utterly unforgettable.",
    recommended_yachts: ["sunset-chaser-45", "pearl-voyager-52", "marina-star-48"],
    suggested_duration: "2–3 hours",
    add_ons: ["Canapes & drinks", "Romantic setup", "Photography"],
    keywords: ["sunset cruise dubai yacht", "dubai sunset yacht cruise"],
  },
  {
    slug: "new-year",
    name: "New Year's Eve",
    tagline: "Ring in the New Year from the water",
    description: "Watch Dubai's world-famous fireworks from the best seat in the house — a luxury yacht on the Arabian Gulf. An all-inclusive NYE experience with premium dining, open bar, and a VIP countdown.",
    recommended_yachts: ["dubai-empress-90", "sea-diamond-80", "ocean-majesty-75"],
    suggested_duration: "6–8 hours",
    add_ons: ["Fireworks viewing position", "Gourmet dinner", "Live entertainment", "Champagne toast"],
    keywords: ["new year yacht dubai", "nye yacht party dubai"],
  },
  {
    slug: "photoshoot",
    name: "Photoshoot",
    tagline: "Stunning backdrops for unforgettable shots",
    description: "Use Dubai's spectacular coastline and a luxury yacht as your photoshoot backdrop. Perfect for influencers, fashion shoots, pre-wedding photography, and content creation with natural golden-hour lighting.",
    recommended_yachts: ["arabian-nights-68", "golden-horizon-65", "pearl-voyager-52"],
    suggested_duration: "2–3 hours",
    add_ons: ["Professional photographer", "Styling setup", "Drone photography", "Outfit changes area"],
    keywords: ["yacht photoshoot dubai", "yacht photography dubai"],
  },
];
