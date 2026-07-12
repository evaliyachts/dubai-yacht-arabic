# Media rights register

Production yacht records may reference only media whose `rightsRecordId` exists in this register. Absence of a verified authorization means the neutral fallback must remain in use.

| Rights record ID | Local asset path | Original source | Owner | Authorization evidence | Approved usage | Approval date |
| --- | --- | --- | --- | --- | --- | --- |
| `media-neutral-placeholder-001` | `/media/yacht-placeholder.svg` | Original neutral vector created in this repository for PR 5 | Yacht DXB project | PR 5 implementation and approved roadmap requirement to use a neutral fallback when authorized yacht media is unavailable | Fallback on yacht catalogue cards, detail pages, and other Yacht DXB pages; it must not be described as a photograph of a specific yacht | 2026-07-12 |

## Unresolved yacht media

No specific yacht photograph currently has a completed rights record. All 24 yacht records therefore use `media-neutral-placeholder-001`.

The Benetti source feed listed third-party storage images, but it did not provide owner, license, or authorization evidence. Those images are deliberately excluded. The same rule applies to all legacy remote yacht galleries removed in PR 5.

To replace a fallback, record the original source, owner, license or written authorization, approved surfaces, and approval date first. Then import the asset under a neutral path with no prohibited branding and update only the corresponding typed media record.
