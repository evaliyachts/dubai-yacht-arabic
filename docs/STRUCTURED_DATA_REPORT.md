# Structured Data Report

Audit date: 2026-07-13

Production authority: `https://yacht-dxb.com/`

## Entity graph

The Arabic site uses one stable identity for each site-level entity:

| Entity | Stable `@id` | Emitted fields | Source |
| --- | --- | --- | --- |
| WebSite | `https://yacht-dxb.com/#website` | name, alternate name, production URL, publisher reference | Approved brand and production-domain constants |
| Organization | `https://yacht-dxb.com/#organization` | name, alternate name, production URL, approved phone, approved local logo, contact-point reference | Approved business constants and the visible `/favicon.png` brand asset |
| ContactPoint | `https://yacht-dxb.com/#contact-point` | approved phone, `reservations` contact type | Central phone constant and the visible booking/contact purpose |

The homepage emits exactly one node of each type. Other pages that own an
Organization or ContactPoint node reuse these same IDs. A Service always uses
only `{"@id":"https://yacht-dxb.com/#organization"}` as its provider; it does
not create an inline Organization.

## Route ownership

| Page owner | Emitted schema |
| --- | --- |
| Homepage | WebSite, Organization, ContactPoint |
| About | Organization, BreadcrumbList |
| Contact | Organization, ContactPoint, BreadcrumbList |
| Yacht index, FAQ, terms, privacy | BreadcrumbList |
| Service index | Service, BreadcrumbList |
| Eight keyword pages | Service, BreadcrumbList |
| Eighteen event/service pages | Service, BreadcrumbList |
| Twenty-four yacht pages | Service with factual Offer, BreadcrumbList |

Schema ownership remains declared by the centralized route manifest. The
rendering layer filters JSON-LD against that ownership before emission.

## Field provenance

- Brand, alternate brand, production URL, phone and entity IDs come from
  centralized project constants.
- The Organization logo is `/favicon.png`, a stable local 181 × 181 asset used
  visibly in the site header and footer.
- Service names and descriptions come from each route's manifest-owned H1 and
  description, or from the verified yacht record for yacht pages.
- Yacht Offer price and currency come from the strict static yacht data
  contract. Existing Offer and breadcrumb facts are preserved.
- Breadcrumb names and URLs come from manifest-owned canonical routes.
- Dubai service scope is supported by each page's visible Dubai service intent;
  it is not used as a business address.

## Deliberate omissions

No LocalBusiness is emitted because no verified public physical street address
has been approved and visibly published. Dubai Marina is a departure point,
not the Organization address.

The graph also omits unverified address, geo, sameAs, ratings, reviews, awards,
founding details and opening-hours fields. ContactPoint omits languages,
service areas, response times and hours. No Product, Event, FAQPage,
AggregateRating or Review schema is emitted.

Visible FAQ content remains ordinary page content. No FAQ rich-result markup is
added. Live `hreflang` and `x-default` remain absent pending a reciprocal
English implementation.

## Validation

Unit and production-output checks enforce stable IDs, graph references,
centralized telephone usage, Service provider references, prohibited types and
properties, route ownership, valid JSON-LD, production URLs and the absence of
live language alternates.
