
# Why the SEO Simulator shows nothing

The deployed site is a Vite + React SPA. Crawlers/simulators that don't run JavaScript only see `index.html`, which is an empty `<div id="root"></div>` shell. All H1/H2/H3, bold text, links, FAQ, and keyword content are injected by React after page load — so the simulator reports "No Words / No H1 / No H2 / No Bold / No Links."

The keyword work we did is correct; it just isn't in the static HTML. We need to fix the static HTML so non-JS crawlers see real content.

## Fix — two parts

### Part 1: Update static defaults in `index.html` (quick win, ~2 min)

Right now `index.html` ships with the old `<title>Yacht Rental dxb</title>` and `<meta description="#1 Yacht Rental in Dubai">`. That's literally what the simulator displayed.

Change `index.html` to ship the real meta defaults so any crawler immediately sees:

- `<title>Yacht Rental Dubai | Luxury Yacht Charter Dubai — Dubai Yatch</title>`
- Full keyword-rich `<meta name="description">`
- `<meta name="keywords">`
- Open Graph + Twitter tags
- Plus a `<noscript>` block inside `<body>` containing H1/H2/H3, bold keyword paragraphs, and on-page links — guaranteed to render in raw HTML for ANY scraper, no JS required.

This alone will make the SEO simulator immediately show:
- Title ✓, Description ✓, H1 ✓, H2 ✓, H3 ✓, Bold ✓, Links ✓, Page Text ✓, Two/Three Word Phrases ✓

### Part 2: Add prerendering for full SPA SEO (recommended, ~10 min)

Install `vite-plugin-prerender` (or `vite-plugin-ssg`) to prerender these routes at build time into static HTML:

- `/`
- `/yachts`
- `/yachts/:slug` (all 24 yachts)
- `/services`
- `/services/:slug`
- `/offers`
- `/occasions`
- `/about`
- `/contact`
- `/faq`

After build, every page becomes a fully-formed static HTML file with all headings, content, links, and meta tags baked in — exactly what Google, Bing, and AI search engines (ChatGPT, Perplexity, Gemini) need.

Netlify will serve these static HTML files directly, then React hydrates on top — so users still get the SPA experience, but crawlers see complete pages.

## Technical details

**Files to edit:**
- `index.html` — replace title/description, add OG/Twitter/keywords meta, add `<noscript>` SEO block in body
- `vite.config.ts` — add prerender plugin
- `package.json` — add `vite-plugin-prerender` (or `react-snap`) as dev dependency
- `src/App.tsx` — minor tweak so React hydrates instead of replacing prerendered HTML (use `hydrateRoot` when prerendered markup is present)

**Plugin choice:** I recommend `vite-plugin-prerender-spa` or `react-snap` — both run a headless Chromium at build time, visit each route, and dump the rendered HTML to disk. Zero runtime cost, works perfectly with Netlify static hosting.

**No backend needed.** No SSR server. No Next.js migration. The site stays a Vite SPA.

## Expected result after deploy

Re-run the "to the web" SEO simulator on `yachtrentaldxb.netlify.app` and you'll see:
- Title: full keyword title
- Description: full keyword description
- H1/H2/H3: all populated (Yacht Rental Dubai, Luxury Yacht Charter Dubai, FAQ, etc.)
- Two-word phrases: "yacht rental", "dubai yacht", "luxury yacht"… with high counts
- Three-word phrases: "yacht rental dubai", "luxury yacht charter", "dubai yacht rental"… with high counts
- Bold text, on-page links, page text, image alt text — all populated

## Order of work

1. Update `index.html` with real defaults + `<noscript>` SEO block (instant fix — solves the simulator immediately even before prerendering is set up)
2. Install + configure prerender plugin
3. Verify build outputs static HTML for each route
4. Republish to Netlify
5. Re-test in the SEO simulator

Approve and I'll switch to build mode and implement both parts.
