# Legal content approval

## Approval record

- Approval date: `2026-07-13`
- Approved publication brand: `يخوت دبي`
- Approved alternate brand: `Yacht DXB`
- Approved production domain: `https://yacht-dxb.com/`
- Approved phone: `+971 50 464 1020` (`+971504641020`)
- Exact Arabic Terms and Privacy publication commit: `562b59b`
- Approved legal metadata and regression-test commit: `bb5ddab`

The business owner approved the exact Arabic Terms and Privacy texts supplied
for `/terms/` and `/privacy/` and confirmed that they reflect the site's and
service's current practices. Commit `562b59b` introduced both approved texts
without machine translation or editorially invented legal provisions.

## Publication requirements

- Both routes remain `index, follow`, self-canonical and included in the
  58-record indexable manifest and 58-URL sitemap.
- The visible and manifest significant-update date is `2026-07-13`, the
  approval and Deploy Preview publication date. If the first production
  publication occurs on a later calendar date, both dates must be updated to
  that actual production publication date before Search Console submission.
- Both routes retain only `BreadcrumbList` schema ownership.
- Footer links remain unchanged and canonical.

## Intentionally absent claims

The approved documents intentionally make no fixed promise of:

- a 50% deposit;
- 48-hour free cancellation or a fixed cancellation charge;
- a guaranteed refund or free rescheduling;
- maritime insurance or a liability guarantee;
- a fixed payment method.

The Terms accurately state that the current website does not accept online
payments or store bank-card data. Booking-specific payment, cancellation,
rescheduling and refund conditions are provided in the written booking terms
when applicable.

## Analytics state

Analytics remains disabled. No approved `VITE_GA_MEASUREMENT_ID`, Google
Analytics destination or Google Tag Manager container is configured. The
Privacy text accurately records that current state. Any future activation
requires a privacy/consent decision and corresponding approved policy update
before analytics is enabled.

This approval does not authorize production deployment, the exact Netlify
hostname redirect, live `hreflang`/`x-default`, sitemap submission or Search
Console indexing requests. Those remain gated by final PR review, merge and
the post-merge production smoke test.
