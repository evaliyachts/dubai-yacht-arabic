export interface Testimonial {
  name: string;
  country: string;
  rating: number;
  text: string;
  yacht: string;
  occasion: string;
}

export const testimonials: Testimonial[] = [
  { name: "James & Sarah", country: "UK", rating: 5, text: "An absolutely magical sunset cruise for our anniversary. The crew was exceptional and the yacht was immaculate.", yacht: "Golden Horizon", occasion: "Anniversary" },
  { name: "Mohammed Al-Rashid", country: "UAE", rating: 5, text: "We hosted a corporate event for 20 guests and everything was flawless. Highly recommend for business entertaining.", yacht: "Dubai Empress", occasion: "Corporate" },
  { name: "Priya Sharma", country: "India", rating: 5, text: "My husband surprised me with a birthday yacht party. The decorations were gorgeous and the crew made it unforgettable.", yacht: "Royal Wave", occasion: "Birthday" },
  { name: "David Chen", country: "Australia", rating: 4, text: "Great fishing trip! The captain knew the best spots and we caught a fantastic haul. Will definitely book again.", yacht: "Breeze Runner", occasion: "Fishing" },
  { name: "Elena Petrov", country: "Russia", rating: 5, text: "Proposed to my girlfriend on the Golden Horizon with sunset views of the Burj Al Arab. She said yes! Perfect setup.", yacht: "Golden Horizon", occasion: "Proposal" },
  { name: "Thomas Weber", country: "Germany", rating: 5, text: "Outstanding New Year's Eve celebration. The fireworks from the water were spectacular. Worth every dirham.", yacht: "Sea Diamond", occasion: "New Year" },
  { name: "Fatima Al-Mansoori", country: "UAE", rating: 5, text: "Used Dubai Yatch for our company retreat — seamless organization, premium service, and our team loved it.", yacht: "Ocean Majesty", occasion: "Corporate" },
  { name: "Carlos & Maria", country: "Spain", rating: 5, text: "We did a 4-hour sunset cruise along the Palm. The views, the food, the service — everything was 5-star luxury.", yacht: "Pearl Voyager", occasion: "Sunset Cruise" },
  { name: "Akiko Tanaka", country: "Japan", rating: 4, text: "Beautiful photoshoot on the yacht. The crew helped with the best angles and lighting positions. Very professional.", yacht: "Arabian Nights", occasion: "Photoshoot" },
  { name: "Robert Johnson", country: "USA", rating: 5, text: "Best birthday party ever! The superyacht had everything — jacuzzi, music, amazing food. My friends are still talking about it.", yacht: "Dubai Empress", occasion: "Birthday" },
];
