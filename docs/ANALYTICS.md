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

The queue works without making analytics a static-rendering dependency. A
future approved tag manager may consume these allowlisted events without
changing their privacy contract.
