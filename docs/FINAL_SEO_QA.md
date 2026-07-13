# Final SEO QA and release gate

## Release identity and state

- Production authority: `https://yacht-dxb.com/`
- Audited Deploy Preview: `https://deploy-preview-9--yacht-dxb.netlify.app/`
- PR: `#9` (`agent/pr8-final-qa-legal-gate`)
- Final functional commit audited by this report: `bb5ddab`
- Approved Arabic legal body-copy commit: `562b59b`
- Approved legal metadata and regression-test commit: `bb5ddab`
- Legal approval record: `docs/LEGAL_CONTENT_APPROVAL.md`
- Indexable route records: 58
- Static canonical route records: 58
- Sitemap URLs: 58
- Registered legacy redirects: 144
- Verified yacht records: 24
- Release state: **legal gate passed; awaiting PR review and production cutover**
- Production cutover state: **not activated**

The documentation commit that contains this report follows the functional
commit above and does not change runtime page behavior. The merge commit and
post-merge production deploy ID must be appended during the separate
production smoke test.

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

## Generated and deployed crawl

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
- production currently serves the reviewed PR 7 bundle
  `/assets/index-ZcBz9gVK.js`;
- the Deploy Preview serves the PR 8 bundle separately;
- `https://yacht-dxb.netlify.app/` still returns 200 and is not redirected.

The domain, DNS and HTTPS prerequisites are healthy, but production does not
yet serve the reviewed PR 8 build. Therefore
the exact-host redirect is intentionally absent. After PR review, merge and
production smoke testing, add this rule after all generated
specific legacy redirects:

```toml
[[redirects]]
from = "https://yacht-dxb.netlify.app/*"
to = "https://yacht-dxb.com/:splat"
status = 301
force = true
```

Then verify path and query preservation, no loop, one hop, and continued access
to deploy-preview and branch-deploy hosts. The redirect must not be activated
before PR review, merge and the post-merge production smoke test.

## Remaining limitations and required approvals

1. No analytics destination or privacy/consent decision is approved; analytics
   remains disabled.
2. The custom production domain has not served the PR 8 reviewed build yet.
3. The exact Netlify-host redirect and its path/query smoke test remain gated.
4. Lighthouse LCP remains slow in the mobile lab runs, and the main JavaScript
   chunk remains above Vite's 500 kB warning threshold.
5. No field Core Web Vitals are claimed.
6. Remote yacht media remains dependent on the authorized external host;
   strict pre-release verification mitigates availability regressions.
7. Future binding legal changes must be supplied and approved by the business;
   they must not be machine-invented in this repository.

## Search Console checklist

Do not submit the sitemap or request indexing yet. After PR review, merge and
the post-merge production smoke test pass:

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

If the production smoke test fails after merge:

1. Use Netlify's deploy history to publish the last reviewed production deploy
   (currently the PR 7 build) without changing DNS.
2. If the exact-host redirect was activated, remove or revert that rule first so
   the Netlify hostname can be used for diagnosis without a loop.
3. Revert the failing PR 8 merge through a normal reviewed Git revert; do not
   reset shared history.
4. Rebuild with Node 24.18.0/npm 11.16.0 and rerun the complete quality gate.
5. Recheck homepage, representative inner routes, real 404, robots, sitemap,
   canonical authority, redirects, media, analytics-disabled state and caching.
6. Record the failed deploy ID, rollback deploy ID, reason and verification
   results in this report before attempting a new cutover.
