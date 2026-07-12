# English Hreflang Implementation Report

Live audit: 2026-07-13 (Asia/Dubai)

Arabic authority: `https://yacht-dxb.com/`

English authority inspected: `https://yachtrentaldxb.com/`

## Release decision

No live `hreflang`, `x-default` or other language-alternate tags are emitted in
this release. The English homepage returned HTTP 200 and declared the exact
canonical `https://yachtrentaldxb.com/`. Every other URL listed by the live
English sitemap returned HTTP 404 with no canonical when requested directly;
the same result occurred with and without a trailing slash. A URL appearing in
a sitemap is not enough to treat it as a verified equivalent.

Result: **1 verified equivalent and 57 intentionally unmapped Arabic routes**.
The English site is not a build-time or runtime dependency; this is a committed
audit snapshot for the future reciprocal rollout.

## Verified mapping and future reciprocal tags

| Arabic canonical | Exact English canonical | Equivalence | Future reciprocal implementation |
| --- | --- | --- | --- |
| `https://yacht-dxb.com/` | `https://yachtrentaldxb.com/` | Verified: both are the branded yacht-rental homepage | Add `ar-AE` → `https://yacht-dxb.com/` and `en` → `https://yachtrentaldxb.com/` on **both** pages in one coordinated release |

Future tags for both homepages, only after reciprocal deployment is ready:

```html
<link rel="alternate" hreflang="ar-AE" href="https://yacht-dxb.com/">
<link rel="alternate" hreflang="en" href="https://yachtrentaldxb.com/">
```

Do not add `x-default` in this phase.

## Unmapped Arabic routes

An em dash in “Exact English canonical” means that no live HTTP-200 English
page with a canonical tag was verified. “None” means no reciprocal tag should
be implemented until a genuine English equivalent exists, declares its exact
canonical and can be updated reciprocally.

| Arabic canonical | Exact English canonical | Equivalence status | Reciprocal tag required now |
| --- | --- | --- | --- |
| `https://yacht-dxb.com/yachts/` | — | Unmapped; English `/yachts` sitemap URL returns 404 without canonical | None |
| `https://yacht-dxb.com/الخدمات/` | — | Unmapped; English `/services` sitemap URL returns 404 without canonical | None |
| `https://yacht-dxb.com/about/` | — | Unmapped; English `/about` sitemap URL returns 404 without canonical | None |
| `https://yacht-dxb.com/الأسئلة-الشائعة/` | — | Unmapped; English `/faq` sitemap URL returns 404 without canonical | None |
| `https://yacht-dxb.com/contact/` | — | Unmapped; English `/contact` sitemap URL returns 404 without canonical | None |
| `https://yacht-dxb.com/terms/` | — | Unmapped; English `/terms` sitemap URL returns 404 without canonical | None |
| `https://yacht-dxb.com/privacy/` | — | Unmapped; English `/privacy` sitemap URL returns 404 without canonical | None |
| `https://yacht-dxb.com/تأجير-يخت-في-دبي/` | — | Unmapped; no genuine English keyword-page equivalent verified | None |
| `https://yacht-dxb.com/حجز-يخت-في-دبي/` | — | Unmapped; no genuine English keyword-page equivalent verified | None |
| `https://yacht-dxb.com/يخوت-للإيجار-في-دبي/` | — | Unmapped; no genuine English keyword-page equivalent verified | None |
| `https://yacht-dxb.com/تأجير-يخوت-فاخرة-في-دبي/` | — | Unmapped; no genuine English keyword-page equivalent verified | None |
| `https://yacht-dxb.com/أسعار-تأجير-اليخوت-في-دبي/` | — | Unmapped; no genuine English keyword-page equivalent verified | None |
| `https://yacht-dxb.com/يخت-دبي-مارينا/` | — | Unmapped; no genuine English keyword-page equivalent verified | None |
| `https://yacht-dxb.com/رحلات-بحرية-خاصة-في-دبي/` | — | Unmapped; no genuine English keyword-page equivalent verified | None |
| `https://yacht-dxb.com/تأجير-يخت-للمناسبات-في-دبي/` | — | Unmapped; no genuine English keyword-page equivalent verified | None |
| `https://yacht-dxb.com/عيد-ميلاد-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/حفلة-خاصة-على-يخت-في-دبي/` | — | Unmapped; no genuine English page equivalent verified | None |
| `https://yacht-dxb.com/يخت-لحفلة-خطوبة-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/طلب-زواج-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/حفلة-زفاف-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/ذكرى-زواج-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/حفلة-تخرج-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/تحديد-جنس-المولود-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/حفلة-وداع-عزوبية-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/يخت-للمناسبات-العائلية-في-دبي/` | — | Unmapped; no genuine English page equivalent verified | None |
| `https://yacht-dxb.com/حفلة-شواء-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/عشاء-على-يخت-في-دبي/` | — | Unmapped; no genuine English page equivalent verified | None |
| `https://yacht-dxb.com/رحلة-يخت-صباحية-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/افترنون-تي-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/يخت-مع-جت-سكي-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/يخت-مع-العاب-مائية-في-دبي/` | — | Unmapped; English activity candidates return 404 without canonical | None |
| `https://yacht-dxb.com/رحلة-صيد-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/سباحة-على-يخت-في-دبي/` | — | Unmapped; English service candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/عوامة-خاصة-55-قدم-للإيجار-في-دبي/` | — | Unmapped; English candidate returns 404 without canonical and uses a different public name | None |
| `https://yacht-dxb.com/yachts/رحلة-يخت-50-قدم-رويال-ماجستي/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-42-قدم-ازيموت-للايجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-ماجستي-44-قدم-للايجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-أزيموت-50-قدم-للإيجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-أوريكس-50-قدم-للإيجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-فيريتي-50-قدم-للإيجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/رحلة-يخت-56-قدم-ماجستي/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/رحلة-يخت-55-قدم-ازيموت/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/ايجار-يخت-ماجستي-88-قدم-جاكوزي/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-64-قدم-ازيموت-إيطالي/` | — | Unmapped; no true English yacht equivalent identified | None |
| `https://yacht-dxb.com/yachts/يخت-64-قدم-هاترس-للإيجار/` | — | Unmapped; no true English yacht equivalent identified | None |
| `https://yacht-dxb.com/yachts/يخت-بينيتي-110-قدم-مع-جاكوزي/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-ماجستي-101-قدم-جاكوزي-للإيجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/ايجار-يخت-هايغان-90-قدم-جاكوزي/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-دوريتتي-90-قدم-جاكوزي/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/اوشن-دريم-يخت-143-قدم-للايجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/ايجار-يخت-مزايل-135-قدم-دبي/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-95-قدم-دوريتتي-مع-جاكوزي/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-سنسيكر-92-قدم-للايجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/تأجير-يخت-سنسيكر-90-قدم/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |
| `https://yacht-dxb.com/yachts/يخت-دي-تري-151-قدم-للايجار/` | — | Unmapped; English candidate returns 404 and the public model/length does not exactly match | None |
| `https://yacht-dxb.com/yachts/يخت-سنسيكر-108-قدم-مع-جاكوزي/` | — | Unmapped; no true English yacht equivalent identified | None |
| `https://yacht-dxb.com/yachts/يخت-اوميغا-100-قدم-للايجار/` | — | Unmapped; English yacht candidate returns 404 without canonical | None |

## English implementation prerequisites

Before any mapping is activated, the English owner must make the equivalent
page return HTTP 200, publish its exact HTTPS canonical on
`yachtrentaldxb.com`, confirm that its main intent and factual entity match the
Arabic page, and add the reciprocal pair in the same release. The Arabic
manifest must store the exact declared English canonical without adding or
removing a slash. Re-run the live audit immediately before that release.
