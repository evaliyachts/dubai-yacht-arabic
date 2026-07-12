# Yacht-DXB Arabic Repository Rules

## Authority and scope

- This repository powers the Arabic RTL website at `https://yacht-dxb.com/`.
- The deployment preview is `https://yacht-dxb.netlify.app/`. It is not a production metadata origin.
- The English equivalent site is `https://yachtrentaldxb.com/`. Store its exact declared canonical URLs when mappings are introduced; do not normalize their trailing slashes.
- The public Arabic brand is `يخوت دبي`; the approved alternate brand is `Yacht DXB`.
- The approved phone is `+971 50 464 1020` (`+971504641020`) and WhatsApp URL is `https://wa.me/971504641020`.

## Prohibited sources and claims

- Never use `evaliyacht.com` as a source for business identity, contact details, addresses, operating details, metadata, links, schema, sitemap entries, or content.
- The only permitted Evali reference is internal provenance for the missing Benetti yacht snapshot. Production code and output must have no Evali runtime dependency, visible branding, metadata, internal link, or asset path.
- Publish only verified yacht fields and approved media. Do not infer ratings, reviews, availability, specifications, inclusions, addresses, social profiles, or business facts.
- A departure marina is not a public physical business address. Do not emit `LocalBusiness` without an approved physical address that is also visible on the website.
- Do not emit `Event` schema for private yacht services.

## Architecture and SEO

- Arabic production page URLs use `https://yacht-dxb.com/` and a consistent trailing slash.
- The centralized route manifest introduced by the roadmap is the source of truth for static HTML, sitemap, metadata, internal links, schema, redirects, and QA.
- Every indexable route must have route-specific initial HTML with Arabic title, description, canonical, robots, H1, visible content, and JSON-LD.
- Keep live hreflang absent until reciprocal English tags can be deployed.
- Unknown routes must return a real HTTP 404. Do not add a catch-all SPA rewrite.
- Omit sitemap `lastmod` unless an accurate significant content, schema, or link update date is known.

## Runtime and workflow

- Use Node `24.18.0` and npm `11.16.0` exactly. Node 22 is an exception-only fallback after a reproducible dependency incompatibility is documented; it never replaces the default metadata.
- Retain the Bun lockfiles until npm install, clean `npm ci`, the production build, and a Netlify production-context build have all passed with `package-lock.json`.
- Work through the approved roadmap as sequential PRs. Do not start a later PR until the preceding PR is reviewed and merged.
- After PR 0, every PR must pass:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run seo:check
```

## Production gates

- Do not enable the exact `yacht-dxb.netlify.app` to production redirect until the custom domain, DNS, production deploy, and HTTPS are confirmed.
- Do not redirect Netlify deploy-preview or branch-deploy hosts.
- Only fingerprinted static assets may receive long-lived immutable caching. HTML, `404.html`, `robots.txt`, and `sitemap.xml` must revalidate.
- Production source maps remain disabled and generated output must pass the branding and metadata scans defined by the roadmap.
