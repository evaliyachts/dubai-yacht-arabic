# Release follow-ups

## Arabic legal localization — completed in PR 8

The business owner approved the Arabic `/terms/` and `/privacy/` text for
publication on `yacht-dxb.com` on 2026-07-13 and confirmed that both documents
reflect the site's and service's current practices.

- The supplied text was published without machine translation or invented terms.
- Both routes retain their production canonicals, indexable ownership and
  `BreadcrumbList` schema.
- Their Arabic titles, descriptions, H1s, visible update date and approved phone
  number are covered by automated tests and the production SEO check.
- Any future legal or operational change must receive fresh business approval
  before the visible text or privacy-related configuration is changed.

This former production acceptance gate is resolved. PR 8 review, merge and the
post-merge production smoke test remain separate release gates.
