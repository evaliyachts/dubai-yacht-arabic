import { render, within } from "@testing-library/react";
import App from "@/App";
import { SOCIAL_PROFILES } from "@/lib/constants";
import { organizationEntity } from "@/seo/entities";

const expectedProfiles = [
  { platform: "Facebook", labelAr: "فيسبوك", url: "https://www.facebook.com/share/14i7z1YMxtg/?mibextid=wwXIfr" },
  { platform: "Instagram", labelAr: "إنستغرام", url: "https://www.instagram.com/dubai___yachts?igsh=N3Z6OTFpdThvdm92&utm_source=qr" },
  { platform: "Threads", labelAr: "ثريدز", url: "https://www.threads.com/@dubai___yachts?igshid=NTc4MTIwNjQ2YQ==" },
  { platform: "TikTok", labelAr: "تيك توك", url: "https://www.tiktok.com/@dubai__yachts?_r=1&_t=ZS-98EMuY54sYG" },
  { platform: "X", labelAr: "إكس", url: "https://x.com/dubai__yachts?s=11" },
  { platform: "YouTube", labelAr: "يوتيوب", url: "https://youtube.com/@dubai_yach_trental?si=GBpmM1NkYfCliFBX" },
] as const;

describe("روابط منصات التواصل المعتمدة", () => {
  it("يحفظ الوجهات الست الدقيقة في العقد المركزي", () => {
    expect(SOCIAL_PROFILES).toEqual(expectedProfiles);
  });

  it("يعرض روابط تذييل واضحة وقابلة للزحف من دون تغيير مخطط الكيان", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    const nav = within(document.body).getByRole("navigation", { name: "حسابات يخوت دبي على منصات التواصل" });
    const links = within(nav).getAllByRole("link");

    expect(links).toHaveLength(expectedProfiles.length);
    links.forEach((link, index) => {
      const profile = expectedProfiles[index];
      expect(link).toHaveTextContent(profile.labelAr);
      expect(link).toHaveAttribute("href", profile.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAccessibleName(`زيارة صفحة يخوت دبي على ${profile.labelAr}`);
    });
    expect(JSON.stringify(organizationEntity())).not.toContain('"sameAs"');
  });
});
