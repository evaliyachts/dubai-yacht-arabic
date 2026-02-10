export const BRAND_NAME = "Dubai Yatch";
export const DOMAIN = "https://dubaiyatch.com";
export const WHATSAPP_NUMBER = "+971500000000";
export const PHONE_NUMBER = "+971500000000";
export const PLACEHOLDER_IMAGE = "/placeholder.svg";

export const getWhatsAppLink = (message?: string) => {
  const defaultMsg = `Hi Dubai Yatch, I want to book a yacht in Dubai. Date: __, Hours: __, Guests: __, Budget: __`;
  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message || defaultMsg)}`;
};

export const getPhoneLink = () => `tel:${PHONE_NUMBER}`;

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Yachts", path: "/yachts" },
  { label: "Offers", path: "/offers" },
  { label: "Occasions", path: "/occasions" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];
