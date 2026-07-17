# Arabic mobile homepage performance

Date: 17 July 2026

Production baseline: `https://yacht-dxb.com/`

Candidate branch: `agent/mobile-homepage-performance`

## Scope

This focused candidate improves the mobile first paint of the existing Arabic homepage. It does not change visible copy, route ownership, indexability, metadata, schema, sitemap membership, yacht or service facts, contact facts, analytics, redirects, `hreflang` or `x-default`.

## Baseline evidence

The owner-supplied mobile PageSpeed report identified:

- render-blocking application CSS and Google Fonts, with estimated combined savings of 3,260 ms;
- cache-lifetime savings estimated at 118 KiB, led by the remote mobile hero and two Netlify image responses;
- image-delivery savings estimated at 73 KiB;
- a mobile hero source rendered far below its 1536×2752 intrinsic dimensions.

A reproducible Lighthouse 12.8.2 production run from the same development machine recorded:

| Metric | Production baseline |
| --- | ---: |
| Performance score | 67 |
| First Contentful Paint | 4,449 ms |
| Largest Contentful Paint | 4,948 ms |
| Speed Index | 4,449 ms |
| Total Blocking Time | 34 ms |
| Cumulative Layout Shift | 0.112 |
| Render-blocking saving | 2,419 ms |
| Image-delivery saving | 109,516 bytes |
| Cache-lifetime saving | 97,843 bytes |

The measured LCP element was the existing Arabic H1. The layout-shift audit attributed the measured shift to the late Google Font swap around the H1 and hero actions.

## Candidate changes

- The exact generated application stylesheet is inlined on the homepage only. Inner routes retain the fingerprinted external stylesheet.
- Google Fonts load through an asynchronous print-media handoff and use `display=optional`; the blocking stylesheet is absent from the JavaScript-enabled critical path.
- The existing hero photographs are served as local fingerprinted assets. The mobile rendition is 768×1376 and retains the documented original-source checksum.
- The header and footer use a 72×72 fingerprinted rendition of the existing brand mark; `/favicon.png` and Organization schema remain unchanged.
- Hero and header first-paint markup no longer depend on Framer Motion. Visible text, controls and RTL layout are unchanged.
- Offscreen homepage sections use `content-visibility: auto` with an intrinsic-size fallback in supporting browsers.
- The services interaction uses `IntersectionObserver` state instead of `getBoundingClientRect()` in wheel and touch handlers and registers those handlers once.

## Asset and bundle comparison

| Resource | Before | Candidate | Difference |
| --- | ---: | ---: | ---: |
| Mobile hero AVIF | 73,778 bytes | 34,495 bytes | −39,283 bytes (53.2%) |
| Header/footer brand image | 24,231 bytes | 6,919 bytes | −17,312 bytes (71.4%) |
| Generated CSS | 77.01 kB | 77.21 kB | +0.20 kB |
| Generated JavaScript | 712.51 kB | 711.98 kB | −0.53 kB |

The homepage HTML is larger because it contains the generated CSS. Its compressed candidate size is 28,897 bytes; the intended tradeoff is removal of the extra render-blocking stylesheet round trip. Inner routes continue to share the external fingerprinted CSS asset.

## Local candidate evidence

A Lighthouse 12.8.2 run against the production build served locally recorded:

| Metric | Local candidate |
| --- | ---: |
| Performance score | 86 |
| First Contentful Paint | 2,019 ms |
| Largest Contentful Paint | 3,403 ms |
| Speed Index | 2,256 ms |
| Total Blocking Time | 106 ms |
| Cumulative Layout Shift | 0.114 |
| Render-blocking saving | 0 ms |
| Image-delivery saving | 0 bytes |
| Cache-lifetime saving | 0 bytes |

This local result is not a controlled same-origin field comparison. The remaining local layout shift occurred when the fast cached external font completed within the optional font period; on the owner-supplied throttled path, the new optional policy prevents a late font swap after that period. Field Core Web Vitals require later real-user monitoring.

At 390×844 in the controlled browser, the candidate retained the exact production title, H1 and canonical; `lang="ar-AE"`, RTL, all ten homepage sections, zero `hreflang`, inline homepage CSS, the local mobile hero and no horizontal overflow. No browser console error was recorded.

## Safeguards and limitations

- The hero remains eager with asynchronous decoding. It is not assigned high fetch priority because the measured LCP is text.
- Existing remote yacht galleries continue through their approved responsive Netlify Image CDN paths. This candidate does not change gallery URLs or media ownership.
- Netlify Image CDN cache policy is platform-controlled and is not weakened or misrepresented as an immutable local asset.
- Production source maps remain prohibited.
- Production remains unchanged until the exact candidate head receives owner approval and is merged through the repository's normal review workflow.

## Required release validation

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run seo:check`
- `npm run media:verify`
- `npm run qa:crawl -- --base=<deploy-preview-url>`
- `npm audit --omit=dev`
- `git diff --check`
- Deploy Preview mobile Lighthouse and browser review
