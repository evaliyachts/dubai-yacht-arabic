# Yacht-DXB Arabic

Arabic RTL website for `https://yacht-dxb.com/`.

## Runtime

- Node.js `24.18.0`
- npm `11.16.0`

Use the pinned runtime before installing dependencies:

```bash
nvm install
nvm use
npm ci
```

Node 22 is not a normal development or deployment target. It may be used only as a documented temporary fallback after a reproducible Node 24 dependency incompatibility is confirmed.

## Development

```bash
npm run dev
```

## Static production build

```bash
npm run build
npm run seo:check
npm run preview
```

The production build renders each current canonical route to its own `dist/<route>/index.html` and creates a standalone `dist/404.html`. Netlify serves those files with Pretty URLs and no SPA catch-all rewrite, so unknown paths return a real HTTP 404.

## Quality gate

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run seo:check
```

The repository retains its Bun lockfiles until npm installation, clean `npm ci`, the production build, and a Netlify production-context build have all passed with `package-lock.json`.

## Deployment scope

- Production origin: `https://yacht-dxb.com/`
- Netlify preview origin: `https://yacht-dxb.netlify.app/`
- English equivalent site: `https://yachtrentaldxb.com/`

The Netlify hostname is a deployment preview and must not be used for production canonical URLs, Open Graph URLs, schema URLs, sitemap entries, or hreflang. See `AGENTS.md` for the complete content, data, SEO, and release rules.
