import {
  BRAND_NAME,
  BRAND_NAME_EN,
  DOMAIN,
  ENGLISH_SITE_URL,
  PHONE_DISPLAY,
  PHONE_NUMBER,
  ROUTES,
  getPhoneLink,
  getWhatsAppLink,
} from "@/lib/constants";

describe("site authority constants", () => {
  it("uses the approved Yacht-DXB identity and contact details", () => {
    expect(BRAND_NAME).toBe("يخوت دبي");
    expect(BRAND_NAME_EN).toBe("Yacht DXB");
    expect(DOMAIN).toBe("https://yacht-dxb.com");
    expect(ENGLISH_SITE_URL).toBe("https://yachtrentaldxb.com");
    expect(PHONE_DISPLAY).toBe("+971 50 464 1020");
    expect(PHONE_NUMBER).toBe("+971504641020");
    expect(getPhoneLink()).toBe("tel:+971504641020");
    expect(getWhatsAppLink("اختبار")).toBe(
      `https://wa.me/971504641020?text=${encodeURIComponent("اختبار")}`,
    );
  });
});

describe("route baseline", () => {
  it("defines root-relative routes that survive Arabic URL encoding", () => {
    for (const route of Object.values(ROUTES)) {
      expect(route.startsWith("/")).toBe(true);
      expect(decodeURI(encodeURI(route))).toBe(route);
    }
  });
});
