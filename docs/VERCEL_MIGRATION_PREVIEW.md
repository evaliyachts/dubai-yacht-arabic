# Yacht DXB — Vercel migration preparation

State: Draft / Preview only. This document does not authorize merge, production deployment, domain assignment, DNS changes or nameserver cutover.

Repository: `evaliyachts/dubai-yacht-arabic`

Base main: `fc09d5ea1de0663f6d2900221b09831a5b5e8fdf` (dependency stabilization PR #17 merged)

Branch: `agent/arabic-dxb-vercel-migration`

Production authority: `https://yacht-dxb.com/`

Vercel scope/project: `evali1/dubai-yacht-arabic`

## Preserved contract

This release expects 58 indexable routes and 58 distinct sitemap URLs, with Arabic trailing-slash canonicals. These are release expectations, not permanent validator totals. Generators and tests derive the current set from the approved manifest.

- Preserve visible Arabic copy, facts, contact details, original media URLs, title, description, H1, robots, schema, canonical ownership and internal links.
- Preserve the existing 144 explicit legacy 301 rules and 57 implicit Netlify canonical slash-normalization 301s. No new redirect decision, consolidation or route restoration is approved.
- Preserve real unknown-route 404s; no SPA wildcard rewrite.
- Preserve absence of hreflang/x-default and existing analytics state.
- Leave existing Netlify configuration, DNS, live deploy and other migration/dependency PRs unchanged. The refreshed branch inherits the approved dependency stabilization from main; it introduces no additional dependency or lockfile change relative to main.

## Hosting adaptation

`scripts/vercel-config.ts` derives exact redirect and rewrite rules from the same route manifest. `npm run vercel:config` materializes `vercel.json`; regression tests reject drift. Existing encoded Arabic paths are preserved in platform rules.

The ordinary `npm run build` still emits the current Netlify-compatible `dist` directory structure. Vercel alone runs `npm run build:vercel`: it builds with `VITE_IMAGE_CDN=vercel`, validates that output, and copies the artifact into `dist-vercel`. The adapter moves route HTML into a private output namespace and uses exact rewrites to serve the same pages. This prevents implicit platform directory redirects from overriding the existing 301 behavior. Root HTML, sitemap, robots, assets and the real 404 document remain intact. Generated output is not committed.

The default image provider remains Netlify. Vercel builds alone use the native `/_vercel/image` endpoint with the existing approved source host, the same responsive candidate widths and quality 75. Widths derive from media and landing-page records. Source `img src`, media rights, dimensions, alt text, loading priorities and social-image URLs remain unchanged. Only WebP is enabled; arbitrary hosts, SVG optimization and unapproved quality values are not enabled. There is no proxy dependency on Netlify's image service after cutover.

Only fingerprinted `/assets/` files receive immutable caching. HTML, sitemap, robots and 404 output revalidate. Existing security headers are retained.

## Validation and evidence

Required commands:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run seo:check
npm run build:vercel
npm audit --omit=dev
git diff --check
```

The `scripts/migration-audit.mjs` read-only collector compares every canonical page and every existing redirect with registry expectations, checks sitemap/robots, unknown/malformed routes, assets and source maps. It writes evidence only outside the repository. Provider-specific optimization URLs are normalized only for the cross-platform comparison; source-media URLs, responsive widths, metadata, content, links and schema must still match.

The final PR description records the exact head, immutable protected Preview URL/deploy ID, complete changed files, route/redirect/crawl results, desktop/mobile RTL review, menu and gallery interaction, representative images, checksums and outstanding approvals. A preview is not a production release or guarantee of rankings.

## Dependency stabilization and refresh

The earlier Preview at head `31ccd17a9b0f55e13b0d011d184e71a10acc5ea6` predates dependency PR #17 and is superseded for release review. Refresh this branch from main with a merge, retaining the hosting adapter and all approved dependency fixes. The only overlap was the generated-output exclusion in `.gitignore`; preserve `dist-vercel`, `.vercel` and `.env*` exclusions. The new exact head and immutable Vercel Preview belong in the PR description after verification.

PR #17 was squash-merged as `fc09d5ea1de0663f6d2900221b09831a5b5e8fdf`. Its production Netlify deploy is `6ad1b8c260716e72a6936471`; the expected live bundle is `/assets/index-Bb0uK5g_.js`. This refresh must not replace that deployment. The Vercel project production/bootstrap target must also remain `dpl_7oxzpUmVmqac8M3tztt335nyR2aK` while Preview work runs.

## Remaining release gates

- The former 12 production dependency findings (9 high, 3 moderate) were resolved in separate approved PR #17. Rerun `npm audit --omit=dev` on the refreshed migration head; the expected result is zero production findings. Nine development-only Tailwind-chain findings (5 high, 4 moderate) remain documented and deferred; do not describe the entire dependency tree as vulnerability-free. No further version, lockfile, override or audit-suppression change belongs in this migration refresh.
- DNS is not changed here. Public NS records currently remain `dns1.p01.nsone.net` through `dns4.p01.nsone.net`; Google verification TXT must be preserved. No public MX was returned at preflight. A full authoritative-zone inventory and any DNSSEC/CAA/email records must be verified before any future delegation change; public query results are not a complete zone inventory.
- The Netlify connector previously required reauthentication, but existing authenticated dashboard access verified the PR #17 production publication. Full authoritative DNS-zone inventory is still pending; neither public lookups nor the deploy dashboard replace that inventory. Do not claim it was verified through the connector.
- Git integration/domain configuration and final production build must be explicitly verified before release; no nameserver change or custom-domain traffic switch is authorized by this Draft PR.

## Future release gate

After exact-head owner approval, rerun the complete route/sitemap/redirect, image, Arabic RTL/hydration, console, source-map and metadata checks. Confirm DNS records, existing production commit/deploy and rollback target. Keep Netlify available during a separately approved cutover window. Never delete the existing Netlify project or switch nameservers merely because this Preview passed.

References: [Vercel image configuration](https://vercel.com/docs/project-configuration/vercel-json#images), [Vercel deployment environments](https://vercel.com/docs/deployments/environments).
