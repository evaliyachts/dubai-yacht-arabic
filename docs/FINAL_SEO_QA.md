# Final SEO QA and release gate

## Release identity and state

- Production authority: `https://yacht-dxb.com/`
- Audited Deploy Preview: `https://deploy-preview-9--yacht-dxb.netlify.app/`
- PR: `#9` — merged
- PR 8 merge commit: `3ceff416fcbe2ab260628a4470cf9ea114a55c4f`
- Reviewed functional commit before squash merge: `bb5ddab`
- Netlify production deploy ID: `6a54a2bed9485200089a1fc3`
- Netlify production deployment time: `2026-07-13T08:33:02.486Z`
  (`2026-07-13 12:33:02.486` Asia/Dubai; published in 14 seconds)
- Production asset bundle: `/assets/index-B5zETnBQ.js`
- Approved Arabic legal body-copy commit: `562b59b`
- Approved legal metadata and regression-test commit: `bb5ddab`
- Legal approval record commit: `2585916`
- Legal approval record: `docs/LEGAL_CONTENT_APPROVAL.md`
- Indexable route records: 58
- Static canonical route records: 58
- Sitemap URLs: 58
- Registered legacy redirects: 144
- Verified yacht records: 24
- Release state: **PR 8 production deployment and smoke test passed**
- Production deployment state: **active on `https://yacht-dxb.com/`**
- Exact Netlify-host redirect state: **not activated; separate cutover PR pending review**

This post-merge report is documentation-only and does not change the audited
production runtime. Search Console, analytics, live language alternates and the
exact default-Netlify-host redirect remain deliberately untouched.

## Legal approval gate — passed

The business owner approved the Arabic `/terms/` and `/privacy/` documents for
publication on `yacht-dxb.com` on 2026-07-13 and confirmed that they reflect
the site's and service's current practices. The approved text replaced the
English placeholders without machine translation or editorially invented
legal terms.

Both routes remain indexable members of the preferred 58-route release. They
now have the exact approved Arabic titles, descriptions, H1s and visible
content and a truthful
`lastSignificantUpdate` of `2026-07-13`, production canonicals and their
existing `BreadcrumbList` ownership. Automated tests cover the approved
section counts, key current-practice statements, phone link, initial static
HTML, indexability, canonical authority and removal of the superseded English
claims and fixed promises. The approval record is committed in
`docs/LEGAL_CONTENT_APPROVAL.md`. Any future legal or operational change
requires fresh business approval before publication.

The legal publication date is `2026-07-13`, matching the approved visible
`آخر تحديث` value and the two sitemap `lastmod` values.

## Post-merge production smoke test — passed

The production smoke test completed at `2026-07-13T08:40:10Z`
(`2026-07-13 12:40:10` Asia/Dubai) against `https://yacht-dxb.com/`.

| Production surface | Expected | Result |
| --- | ---: | ---: |
| Canonical manifest routes | 58 × 200 | 58 × 200 |
| Encoded Arabic-path checks | 52 × 200 | 52 × 200 |
| Registered legacy sources | 144 × 301 | 144 × 301 |
| Redirect destinations | one hop to canonical 200 | 144 one-hop 200 destinations |
| Unknown route | real HTTP 404 | 404 |
| Sitemap membership | 58 canonical URLs | 58 canonical URLs |
| `robots.txt` sitemap reference | production URL | passed |
| Production yacht images | 156 reachable images | 156 passed |
| Benetti media | one approved local fallback | passed |
| Fingerprinted JavaScript | immutable 200 | passed |
| Fingerprinted CSS | immutable 200 | passed |
| Production JavaScript source map | 404 | 404 |

The production crawl and targeted checks also confirmed:

- every canonical uses `https://yacht-dxb.com/` and the manifest-owned
  trailing-slash path;
- no preview or Lovable hostname appears in canonical page HTML;
- no indexable page emits `noindex`;
- no live `hreflang` or `x-default` exists;
- `/terms/` and `/privacy/` return 200 with their exact approved Arabic title,
  description, single H1, visible content, self-canonical and sole
  `BreadcrumbList` schema owner;
- both legal pages show `13 يوليو 2026` with machine-readable
  `2026-07-13`, and both sitemap entries use `2026-07-13` as `lastmod`;
- the superseded English legal copy and fixed deposit, cancellation, refund,
  rescheduling, insurance and payment-method promises are absent;
- `window.dataLayer` is undefined at runtime, no GA measurement ID is embedded,
  and no Google Analytics or Tag Manager script is mounted;
- HTML, `404.html`, unknown-route 404 responses, `robots.txt` and `sitemap.xml`
  use `public,max-age=0,must-revalidate` and never `immutable`;
- `/assets/index-B5zETnBQ.js` and `/assets/index-Cd0UA_xv.css` use
  `public,max-age=31536000,immutable`;
- the production output exposes no source map;
- all 156 retained remote yacht images are reachable and valid WebP files, and
  yacht `yacht-14` uses only `/media/yacht-placeholder.svg` with rights record
  `media-neutral-placeholder-001`.

## Deploy Preview crawl evidence

`npm run qa:crawl -- --base=https://deploy-preview-9--yacht-dxb.netlify.app`
completed successfully on 2026-07-13.

| Surface | Expected | Result |
| --- | ---: | ---: |
| Canonical manifest routes | 58 × 200 | 58 × 200 |
| Arabic encoded-path checks | 52 × 200 | 52 × 200 |
| Legacy redirect sources | 144 × 301 | 144 × 301 |
| Redirect final destinations | one hop to 200 | 144 one-hop 200 destinations |
| Unknown route | 404 | 404 |
| `sitemap.xml` | 200 | 200 |
| `robots.txt` | 200 | 200 |
| Fingerprinted JavaScript | 200 + immutable | passed |
| JavaScript source map | 404 | 404 |

The crawl also confirmed:

- sitemap membership exactly equals the 58 indexable canonical records;
- no 404 or redirect-only route is present in the sitemap;
- `robots.txt` references `https://yacht-dxb.com/sitemap.xml`;
- every generated canonical uses the production HTTPS authority and trailing
  slash form;
- no accidental page-level `noindex` is present on canonical HTML;
- no preview or Lovable hostname is present in generated metadata/content;
- no live `hreflang` or `x-default` is emitted;
- no prohibited visible Evali branding, business reference or runtime
  Supabase dependency is present after approved media provenance URLs are
  excluded from that scan;
- HTML, robots and sitemap revalidate and are not immutable-cached;
- fingerprinted assets use one-year immutable caching;
- production source maps are absent.

Netlify correctly adds `X-Robots-Tag: noindex` to the Deploy Preview response.
That preview-only header explains the preview Lighthouse SEO score and does not
appear on the custom production domain.

## Structured data

Representative generated pages were parsed after the production build:

| Page | Emitted owners | Result |
| --- | --- | --- |
| Homepage | WebSite, Organization, ContactPoint | stable IDs and linked identities |
| Keyword page | Service, BreadcrumbList | central Organization provider |
| Services index | Service, BreadcrumbList | central Organization provider |
| Event page | Service, BreadcrumbList | no Event or FAQPage |
| Yacht catalogue | BreadcrumbList | no Product collection schema |
| Yacht detail | Service, BreadcrumbList, factual Offer | AED 600/hour for audited Royal Majesty record |
| Contact | Organization, ContactPoint, BreadcrumbList | approved phone only |
| About | Organization, BreadcrumbList | stable Organization ID |

The stable IDs are:

- `https://yacht-dxb.com/#website`
- `https://yacht-dxb.com/#organization`
- `https://yacht-dxb.com/#contact-point`

Validation found no LocalBusiness, Product, Event, FAQPage, Review or
AggregateRating. It found no unverified address, geo, `sameAs`, ratings,
reviews or opening-hours schema. Every Service provider references the central
Organization `@id`; the audited yacht Offer matches the verified record and
canonical URL.

## Media and responsive-image results

`npm run media:verify` remains the authoritative production-media check:

- 156 retained production yacht images are reachable and supported;
- the Benetti record uses the approved neutral local fallback;
- the two rejected Royal Majesty HTTP 403 URLs remain provenance-only in
  `docs/MEDIA_RIGHTS.md`;
- yacht media records retain explicit dimensions, Arabic alt text and rights
  record IDs;
- social images remain authorized absolute HTTPS originals with alt text and
  verified dimensions;
- the generated crawl found no broken local image reference.

The original authorized URL remains every image's `src`. Responsive `srcset`
candidates use Netlify Image CDN only for the exact allowlisted host
`yacht.fra1.cdn.digitaloceanspaces.com`; arbitrary domains and local fallback
assets cannot enter the transformer. Candidates are deterministic and capped
at the verified intrinsic width, with no runtime database dependency.

Actual HTTP response-body measurements for the audited 640-pixel mobile
candidate produced these results:

| Surface | Images | Original bytes | Responsive bytes | Reduction |
| --- | ---: | ---: | ---: | ---: |
| Homepage featured yachts | 6 | 622,414 | 184,012 | 70.4% |
| Yacht catalogue | 24 | 1,712,204 | 620,066 | 63.8% |
| Royal Majesty full gallery traversal | 7 | 1,076,218 | 181,136 | 83.2% |
| Birthday event yacht selection | 3 | 258,806 | 89,132 | 65.6% |

The measurement script fetches each unique source exactly once, verifies an
image content type, and counts the transferred response body. Browser choice
may select another candidate according to slot width and device pixel ratio.

## Accessibility results

The existing rendered `axe-core` suite covers homepage, contact, services,
one event, catalogue, one yacht detail and 404 and reports zero detectable
WCAG A/AA violations. JSDOM's unreliable color-contrast rule remains disabled
there; production Lighthouse's real-browser accessibility audits scored 100
on every audited page and included color contrast.

Manual and automated checks confirmed:

- the skip link moves focus to `#main-content`;
- invalid contact submission focuses the required name field and exposes both
  required controls as invalid;
- valid popup success and blocked-popup fallback behavior remain covered by
  rendered tests, including truthful Arabic status, fallback URL preservation,
  focus movement and delayed `whatsapp_click`;
- Royal Majesty announces `الصورة 1 من 7`, advances to `الصورة 2 من 7`, opens
  fullscreen by keyboard and traps focus inside the dialog;
- closing fullscreen now restores focus to its centered image trigger;
- the mobile menu traps focus, hides covered content from assistive technology,
  locks background scrolling, restores trigger focus after Escape and closes
  when crossing the 1024-pixel desktop breakpoint;
- the generated 404 returns HTTP 404, uses `noindex, follow`, has no canonical,
  and displays its Arabic 404 H1;
- RTL layouts showed no horizontal overflow at effective widths 375, 753 and
  1425 CSS pixels;
- the mobile homepage hero and controls remained visually legible against the
  strengthened overlay.

Headless Chrome launched with `--force-prefers-reduced-motion` and confirmed
`(prefers-reduced-motion: reduce)` was active. The site retains
`MotionConfig reducedMotion="user"`, global reduced-motion CSS and the
carousel's reduced-motion transition branch.

## Performance results

Lighthouse 13.4.0 ran with its mobile navigation defaults against the Deploy
Preview. These are lab snapshots, not field Core Web Vitals.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT | Image transfer | JS transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 47 | 100 | 96 | 69 | 8,386 ms | 0.122 | 363 ms | 147,723 B | 522,389 B |
| Yacht catalogue | 64 | 100 | 96 | 69 | 8,443 ms | 0.012 | 49 ms | 322,444 B | 522,361 B |
| Royal Majesty detail | 60 | 100 | 96 | 69 | 8,917 ms | 0.030 | 33 ms | 233,370 B | 522,380 B |
| Contact | 61 | 100 | 96 | 69 | 8,489 ms | 0.000 | 0 ms | 25,630 B | 522,186 B |

The final Vite production application bundle is 712.51 kB raw and 219.87 kB gzip.
Lighthouse's total script transfer includes Netlify's Deploy Preview toolbar.
INP is not available from a navigation-only lab run, so TBT is recorded only
as its lab responsiveness proxy.

The SEO score is limited by Netlify's correct preview-level noindex header.
Best Practices is limited by deliberately absent production source maps and a
Netlify preview-toolbar cookie issue. Performance and LCP vary with lab network
conditions; no field claim is made. The catalogue/detail responsive images
materially reduced transfer and CLS in the audited comparison, but LCP remains
above the desired release target and is recorded as a remaining limitation.

## Analytics production state

No GA4 or Tag Manager destination has been approved. `VITE_GA_MEASUREMENT_ID`
remains unset, no Google tag/container was installed, no measurement ID is
embedded in the production or Deploy Preview JavaScript, the preview creates
no `window.dataLayer` on load, and `ConversionTracking` is not mounted.
The post-merge production runtime check also found `window.dataLayer`
undefined and no analytics or Tag Manager script.

The existing code retains only `whatsapp_click`, `phone_click`,
`booking_form_start` and `booking_form_submit`, with route queries, WhatsApp
messages and all submitted values excluded. Analytics must not be enabled
without a supplied production destination and an approved privacy/consent
decision.

## Domain, DNS, HTTPS and cutover gate

Observed on 2026-07-13:

- `yacht-dxb.com` resolves to Netlify addresses `63.176.8.218` and
  `35.157.26.135`;
- the custom domain returns HTTP 200 from Netlify;
- `robots.txt` and `sitemap.xml` return HTTP 200 on the custom domain;
- the Let's Encrypt certificate covers `yacht-dxb.com` and
  `www.yacht-dxb.com`, valid from 2026-06-28 through 2026-09-26;
- production serves PR 8 merge commit
  `3ceff416fcbe2ab260628a4470cf9ea114a55c4f` through Netlify deploy
  `6a54a2bed9485200089a1fc3`;
- production serves `/assets/index-B5zETnBQ.js`;
- the reviewed Deploy Preview remains separately accessible;
- `https://yacht-dxb.netlify.app/` still returns 200 and is not redirected.

The domain, DNS, HTTPS, production deployment and post-merge smoke-test gates
have passed. The exact-host redirect is nevertheless intentionally absent
until the separately reviewed cutover PR requested by the owner. That later PR
must add this rule after all generated specific legacy redirects:

```toml
[[redirects]]
from = "https://yacht-dxb.netlify.app/*"
to = "https://yacht-dxb.com/:splat"
status = 301
force = true
```

That separate cutover must verify path and query preservation, no loop, one
hop, and continued access to deploy-preview and branch-deploy hosts. It is not
part of this smoke-test report.

## Remaining limitations and required approvals

1. No analytics destination or privacy/consent decision is approved; analytics
   remains disabled.
2. The exact Netlify-host redirect and its path/query smoke test remain gated
   behind a separate review.
3. Lighthouse LCP remains slow in the mobile lab runs, and the main JavaScript
   chunk remains above Vite's 500 kB warning threshold.
4. No field Core Web Vitals are claimed.
5. Remote yacht media remains dependent on the authorized external host;
   strict pre-release verification mitigates availability regressions.
6. Future binding legal changes must be supplied and approved by the business;
   they must not be machine-invented in this repository.

## Search Console checklist

Do not submit the sitemap or request indexing yet. PR 8, its production deploy
and the smoke test have passed, but Search Console remains gated by the owner's
review of this report. After explicit approval:

1. Confirm the Search Console property uses `https://yacht-dxb.com/`.
2. Open the live production `robots.txt` and confirm its production sitemap URL.
3. Submit `https://yacht-dxb.com/sitemap.xml` once.
4. Verify the submitted count matches the then-current indexable manifest count.
5. Inspect the homepage, catalogue, one event, one yacht and both approved legal
   pages with URL Inspection.
6. Request indexing only for the small representative set after live tests pass;
   allow sitemap discovery for the remainder.
7. Monitor Page Indexing, Sitemaps, Core Web Vitals and structured-data reports.
8. Recheck Google-selected canonicals and site name after recrawl.
9. Do not publish one-sided hreflang; wait for reciprocal English deployment.

## Rollback procedure

If a regression is discovered after this successful smoke test:

1. For a later cutover-only failure, remove the exact-host redirect and publish
   the audited PR 8 deploy `6a54a2bed9485200089a1fc3` without changing DNS.
   For a PR 8 runtime regression, the prior reviewed PR 7 deploy is
   `6a5424b1722b9200081e2d4a`.
2. If the exact-host redirect was activated, remove or revert that rule first so
   the Netlify hostname can be used for diagnosis without a loop.
3. Revert the failing PR 8 merge through a normal reviewed Git revert; do not
   reset shared history.
4. Rebuild with Node 24.18.0/npm 11.16.0 and rerun the complete quality gate.
5. Recheck homepage, representative inner routes, real 404, robots, sitemap,
   canonical authority, redirects, media, analytics-disabled state and caching.
6. Record the failed deploy ID, rollback deploy ID, reason and verification
   results in this report before attempting a new cutover.
