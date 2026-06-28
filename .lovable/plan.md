## Arabic RTL Yacht Rental Website — يخوت دبي

Transform the current English site into a full Arabic RTL experience at `https://yacht-dxb.com`, with event-focused landing pages, native Arabic copy (not literal translation), and luxury minimal design.

### 1. Foundation & RTL Setup

- `index.html`: set `lang="ar-AE"`, `dir="rtl"`, swap meta/title/OG/JSON-LD to Arabic, load Tajawal + Cairo from Google Fonts, replace the static SEO HTML fallback with Arabic copy and Arabic image alt text.
- `tailwind.config.ts` / `src/index.css`: register Tajawal as default `font-sans` and Cairo as `font-display`, ensure spacing/borders flip naturally under RTL (use logical properties where needed), keep dark navy/black + silver/white accent palette (tone down gold).
- `src/lib/constants.ts`: 
  - `BRAND_NAME = "يخوت دبي"` (editable), `BRAND_NAME_EN = "Yacht Rental DXB"`, `DOMAIN = "https://yacht-dxb.com"`.
  - Arabic `NAV_LINKS` pointing to the new Arabic slugs.
  - Arabic WhatsApp default message.

### 2. Data Layer (Arabic)

- `src/data/yachts.ts`: add Arabic `nameAr`, `taglineAr`, `descriptionAr`, `featuresAr` for all 24 yachts. Keep existing image logic untouched.
- New `src/data/eventPages.ts`: array of all 18 event/service pages (slug, H1, intro, included, decoration, food, duration, route, FAQ, related slugs).
- New `src/data/keywordPages.ts`: array of the 9 main keyword landing pages (slug, title, H1, intro, sections, FAQ).

### 3. Routing

`src/App.tsx`: register Arabic routes (URL-encoded Arabic slugs work in React Router):

- `/` — Arabic homepage
- 9 keyword pages (`/تأجير-يخت-في-دبي`, etc.)
- 18 event pages (`/عيد-ميلاد-على-يخت-في-دبي`, etc.)
- `/yachts` and `/yachts/:slug` — Arabic yacht listing + details
- `/contact`, `/faq`, `/about`, `/offers`, `/privacy`, `/terms` — Arabic versions

### 4. Shared Components

- `Header.tsx` / `Footer.tsx`: Arabic nav, RTL flex order, sticky WhatsApp pill.
- New `StickyWhatsApp.tsx`: floating WhatsApp button (bottom-left in RTL) on every page via `Layout.tsx`.
- `SEOHead.tsx`: add `lang`, `dir`, OG locale `ar_AE`, robots `index,follow`, breadcrumb JSON-LD helper.
- `YachtCard.tsx`: Arabic labels (السعر/الساعة، الضيوف، الطول، احجز الآن).
- New `BookingForm.tsx`: Arabic fields (الاسم، الهاتف، التاريخ، الوقت، عدد الضيوف، نوع المناسبة، اختيار اليخت، ملاحظات) — submits via WhatsApp deep link.
- New `EventPageTemplate.tsx` and `KeywordPageTemplate.tsx`: drive landing pages from data so all 27 pages share consistent structure (Hero, included, gallery, prices note, FAQ accordion, internal links block, CTA strip, JSON-LD Service + BreadcrumbList).

### 5. Homepage Sections (Arabic rewrite)

Rewrite `HeroSection`, `WhyChooseUs` (trust), `FeaturedYachts`, `ServicesSection` (event packages cards linking to event pages), `RoutesSection` (Dubai Marina/JBR/Palm/Burj Al Arab), new `PricesSection`, `HomeFAQ`, `CTAStrip`, `SEOContentSection` — all in natural Arabic with the spelling variations woven in.

### 6. Yacht Detail Pages

Rebuild `YachtDetails.tsx` in Arabic: name, length, capacity, year, price/hr, min duration, gallery carousel (existing), suitable events, included services, WhatsApp CTA, FAQ, internal links to booking/prices/marina/event pages. Add Service JSON-LD + BreadcrumbList.

### 7. Sitemap, Robots, Canonicals

- `scripts/generate-sitemap.ts`: `BASE_URL = "https://yacht-dxb.com"`, include all Arabic routes (URL-encoded) + 24 yacht detail URLs.
- `public/robots.txt`: update `Sitemap:` to new domain, allow all Arabic paths.
- `SitemapSection.tsx`: Arabic labels, links to Arabic routes.

### 8. Structured Data

- Homepage: WebSite + Organization + LocalBusiness (name "يخوت دبي", alternateName "Yacht Rental DXB", priceRange AED 500–7500, tel +971504641020, areaServed Dubai/Marina/JBR/Bluewaters/Palm/Burj Al Arab).
- Event/keyword pages: Service + BreadcrumbList.
- Yacht pages: Service + BreadcrumbList.
- Contact: LocalBusiness.

### Out of Scope (for this pass)

- Backend booking storage (CTA opens WhatsApp).
- Auto-translation of yacht descriptions for any yachts added later — they'd need manual Arabic copy.
- Switching the build to SSR/prerender; the existing static `index.html` fallback continues to carry SEO content for non-JS crawlers (now in Arabic).

### Technical Notes

- React Router handles URL-encoded Arabic slugs; we store the raw Arabic slug in a single `slug` constant per page so links + routes stay in sync.
- Use Tailwind logical utilities (`ps-*`/`pe-*`, `ms-*`/`me-*`) where possible; keep `text-right` defaults via `dir="rtl"` on `<html>`.
- Keep existing CDN image URLs and `referrerPolicy="no-referrer"` rules — no asset changes.
- Brand name centralized in `constants.ts` so the user can rename later without touching components.
