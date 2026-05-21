export const BRAND_NAME = "Dubai Yatch";
export const DOMAIN = "https://dubaiyatch.com";
export const PHONE_NUMBER = "+97150 464 1020";
export const WHATSAPP_NUMBER = PHONE_NUMBER;
export const PLACEHOLDER_IMAGE = "/placeholder.svg";

export const getWhatsAppLink = (message?: string) => {
  const defaultMsg = `Hi Dubai Yatch, I want to book a yacht in Dubai. Date: __, Hours: __, Guests: __, Budget: __`;
  const cleanNumber = WHATSAPP_NUMBER.replace(/[+\s]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message || defaultMsg)}`;
};

export const getPhoneLink = () => `tel:${PHONE_NUMBER}`;

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Yachts", path: "/yachts" },
  { label: "Offers", path: "/offers" },
  { label: "Services", path: "/services" },
  { label: "Occasions", path: "/occasions" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];
