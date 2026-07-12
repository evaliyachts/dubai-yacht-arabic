# Performance and accessibility evidence

## Scope and method

This report covers the PR 7 correction commit only. Measurements use the
production Vite build on Node `24.18.0` and npm `11.16.0`. The before build is
PR 7 head `969e5e8`; the after build is the correction worktree built on
2026-07-13 with `npm run build`.

Rendered accessibility checks use `axe-core` against React-rendered pages in
JSDOM, restricted to WCAG 2 A/AA and WCAG 2.1 A/AA rules. The test covers:

- `/`
- `/contact/`
- `/الخدمات/`
- `/عيد-ميلاد-على-يخت-في-دبي/`
- `/yachts/`
- `/yachts/رحلة-يخت-50-قدم-رويال-ماجستي/`
- a real application 404 route

Responsive browser checks use the production preview at requested viewports
of `390 × 844` and `1440 × 900`. The browser's effective content widths were
375 and 1425 CSS pixels respectively. Keyboard tests use both a real browser
and `@testing-library/user-event`.

## Bundle comparison

| Output | Before raw | Before gzip | After raw | After gzip | Gzip change |
| --- | ---: | ---: | ---: | ---: | ---: |
| HTML entry | 0.97 kB | 0.47 kB | 0.88 kB | 0.47 kB | 0.00 kB |
| CSS | 76.00 kB | 12.86 kB | 76.90 kB | 12.91 kB | +0.05 kB (+0.39%) |
| JavaScript | 696.40 kB | 213.78 kB | 694.65 kB | 211.85 kB | -1.93 kB (-0.90%) |

The production build still reports the existing warning that the JavaScript
chunk exceeds 500 kB raw. The correction adds no runtime accessibility-test
code: `axe-core` and `@testing-library/user-event` are development-only.

## Accessibility results

The first axe run found serious invalid definition-list structure in shared
yacht cards. Icons and generic wrappers were siblings of `dt` and `dd`. The
shared card, featured-card, verified-selection and yacht-detail markup now
keeps valid term/definition grouping without changing any yacht value.

After that correction, all seven rendered route scans report zero detectable
WCAG A/AA violations. Source and unit safeguards continue to verify one main
landmark, the skip link, visible focus styling, labelled controls and the
site-wide Arabic RTL contract.

The full-screen mobile menu now uses the existing Radix Dialog dependency.
Automated and browser checks confirm:

- initial focus enters the dialog at its Arabic close control;
- Tab and Shift+Tab remain inside the dialog;
- covered page content is hidden from assistive technology;
- background scrolling is locked while open;
- Escape closes the dialog and returns focus to the menu trigger;
- keyboard activation of an internal route closes the menu cleanly;
- visible focus-ring classes remain on trigger, close control and links.

The contact form's blocked-popup status is a polite atomic live region. When a
popup is blocked, focus moves to a real fallback anchor containing the exact
prepared WhatsApp URL. No success message or `whatsapp_click` is emitted until
the named window opens successfully or the visitor activates that anchor.

## Reduced motion and RTL layout

`MotionConfig reducedMotion="user"` remains the component-level policy. The
global `prefers-reduced-motion: reduce` rules suppress non-essential animation,
transition and smooth scrolling, and the existing stagger carousel retains
its reduced-motion branch. Unit safeguards pass. The available browser run
reported its normal system preference as `false`; forced reduced-motion media
emulation was not available in that browser surface and remains a manual
release check.

At the effective 375-pixel mobile layout width, document `scrollWidth` was
375 pixels. At the effective 1425-pixel desktop width, document `scrollWidth`
was 1425 pixels. Both runs retained `dir="rtl"`, so no horizontal overflow was
detected at either audited viewport.

## Carousel evidence

`StaggerImageCarousel` remains unchanged in identity and visual ownership; no
replacement carousel or package was added. Its tests continue to cover side
selection, previous/next controls, Arrow keys, Enter/Space, failure removal,
reduced motion and fullscreen behavior. The browser check on Royal Majesty
confirmed:

- the live announcement starts at `الصورة 1 من 7`;
- Next advances it to `الصورة 2 من 7`;
- keyboard activation of the centered image opens the existing fullscreen
  dialog;
- Escape closes the fullscreen dialog.

## Hero, image loading and connection hints

The homepage hero remains the likely LCP candidate. Browser checks confirmed
the mobile AVIF at the mobile viewport and the desktop AVIF at the desktop
viewport. The image remains `loading="eager"`, `fetchpriority="high"`, has
explicit dimensions and responsive source selection. This is implementation
evidence, not a field or Lighthouse LCP timing.

The connection-hint audit found neither image-origin preconnect was useful on
every route:

- `dubai-yacht.fra1.cdn.digitaloceanspaces.com` serves the eager homepage hero,
  so its preconnect is now emitted only by the homepage.
- `yacht.fra1.cdn.digitaloceanspaces.com` mainly serves yacht media below the
  hero or on catalogue/detail routes. Its global preconnect was removed and
  downgraded to DNS prefetch, avoiding a full unused connection on utility
  routes while retaining a low-cost lookup hint for the many media routes.

Generated-output validation requires that decision: non-home routes fail if
they contain the hero preconnect, and every route fails if the yacht origin is
restored as a global preconnect.

The initial hero and centered detail image remain eager/high priority. Yacht
cards and surrounding carousel images retain explicit dimensions, responsive
`sizes`, async decoding and lazy loading. The gallery does not preload every
full-resolution image.

## Authorized media status

`npm run media:verify` validates every retained production media URL without
an expected-unavailable exception. The current result is 156 reachable remote
images and one local neutral fallback. The two rejected Royal Majesty HTTP 403
sources remain provenance-only entries in `docs/MEDIA_RIGHTS.md` and are not
present in the production gallery. Benetti remains placeholder-only.

## Remaining limitations

- JSDOM cannot compute reliable visual color contrast, so the axe scan disables
  only the `color-contrast` rule. Visual contrast remains a browser/manual
  release responsibility.
- No field Core Web Vitals or Lighthouse network-throttled LCP result is claimed
  by this correction.
- The main JavaScript chunk remains above Vite's 500 kB warning threshold and
  should be considered for route-level splitting in a separately approved PR.
- Remote yacht media remains dependent on the authorized external image host;
  strict media verification catches availability failures before release.
- Forced reduced-motion browser emulation remains a manual release check; the
  CSS, component policy and automated source tests are present and passing.
