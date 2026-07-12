# Conversion analytics contract

PR 7 instruments exactly four conversion events through the standard browser
`dataLayer` queue:

- `whatsapp_click`
- `phone_click`
- `booking_form_start`
- `booking_form_submit`

Each payload is constructed from an allowlist and may contain only `event`,
`route`, `placement`, and the non-personal `form_id`. Names, phone numbers,
dates, times, guest counts, yacht selections, occasions, notes, WhatsApp
message text, query strings and other submitted values are never copied into
analytics.

`booking_form_start` fires once on the first input in a visible booking-form
field. `booking_form_submit` fires only after the form passes its native
validity checks. Opening WhatsApp is recorded separately as `whatsapp_click`;
it is not described or recorded as a confirmed booking.

Analytics is enabled only when `VITE_GA_MEASUREMENT_ID` contains a valid GA4
measurement ID in the `G-XXXXXXXXXX` form. When it is absent or malformed, the
conversion click listener is not mounted, `window.dataLayer` is not created,
and calls to the event helper are no-ops. The identifier controls enablement
only; it is not added to conversion payloads.

The booking form first records a valid submission, then attempts to open its
prepared WhatsApp URL in a safely named blank window whose opener is severed
before navigation. A successful open records `whatsapp_click`. If a browser
blocks or fails that window, no click is recorded and focus moves to an
announced anchor carrying the same prepared URL; activating that real anchor
records the WhatsApp click through the shared listener.

The queue works without making analytics a static-rendering dependency. A
future approved tag manager may consume these allowlisted events without
changing their privacy contract.
