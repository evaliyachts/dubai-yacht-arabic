# Yacht catalogue data provenance

## Scope

The production catalogue is a static, reviewed snapshot. It has no runtime database, Evali, or Supabase dependency. Public pages expose only fields allowed by `YachtRecord` and never expose provenance identifiers.

## Existing 23 records

The 23 records already present in `src/data/yachts.ts` before PR 5 supplied the reviewed identifiers, names, slugs, lengths, guest capacities, build years, hourly prices, minimum durations, verified bedroom counts, availability flags, featured flags, and priorities. PR 5 discarded all legacy descriptions, inherited schema, remote media, bathrooms, crew counts, inclusions, add-ons, ratings, reviews, and inferred classifications.

The former branded 55-foot record was renamed to the factual neutral name `عوامة خاصة 55 قدم للإيجار في دبي`. Only the legacy redirect retains its former inbound URL as required; that URL is not a canonical page, sitemap member, asset path, or internal link.

PR 5's correction commit normalized three obvious generic Arabic wording errors without changing specifications or uncertain manufacturer/model identities: `يخت أزيموت 50 قدم للإيجار`, `يخت أوريكس 50 قدم للإيجار`, and `يخت فيريتي 50 قدم للإيجار`. Their former malformed paths remain only as direct permanent redirects to the corrected canonical routes.

One source conflict remains visible in the audited source data: the record named and slugged as `يخت دي تري 151 قدم للايجار` stores `lengthFt: 150`. PR 5 preserves both source values without silently changing either. A future factual correction requires approved evidence and a redirect review if the slug changes.

## Benetti static snapshot

- Internal source exception: the permitted Evali Supabase `yachts` feed, row `id = 14`.
- Source project: `https://rmkuurzppholugvtgtvk.supabase.co`.
- Verification date: 2026-07-12.
- Copied fields: name/model reference, slug intent, length 110 ft, guest capacity 50, build year 2021, AED 4,500 per hour, four-hour minimum, four bedrooms, availability `available`, featured `false`, priority `6`.
- Production record: `yacht-14`, `يخت-بينيتي-110-قدم-مع-جاكوزي`.

The snapshot is manually committed as typed static data. No source URL, API key, feed client, Supabase library, storage URL, or Evali identifier is used at runtime or rendered publicly.

The feed exposed remote Benetti images, but no reuse authorization was available. Those URLs were not copied, downloaded, rehosted, or committed. The production record uses the neutral original project fallback documented in `docs/MEDIA_RIGHTS.md`.
