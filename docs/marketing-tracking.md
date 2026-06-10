# Marketing Tracking Phase 1

This phase creates the website tracking foundation for Hollyman Care Homes. It does not connect to Google Ads APIs, change budgets, or automate PPC decisions.

## Environment Variables

Set these in Vercel:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | Yes | Google Tag Manager container ID, for example `GTM-XXXXXXX`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Yes for Meta | Public Meta Pixel ID exposed to the browser for GTM/dataLayer mapping. |
| `MARKETING_DASHBOARD_USERNAME` | Optional | Basic Auth username for `/admin/marketing`. Defaults to `owner`. |
| `MARKETING_DASHBOARD_PASSWORD` | Yes | Basic Auth password for `/admin/marketing`. Server-only. |

Existing CRM/server submission secrets remain separate and are not exposed to the browser.

## Implemented Events

Every tracked event is pushed to `window.dataLayer` with:

- `event`
- `event_id`
- `event_source`
- `page_url`
- `page_title`
- `timestamp`
- relevant non-personal metadata such as `care_home_name`, `cta_label`, `cta_id`, `form_type`, `link_url`, `meta_event_name`

No names, email addresses, phone numbers, postal addresses, or message bodies are sent to analytics events.

| Event | Meaning | Meta mapping |
| --- | --- | --- |
| `lead_form_submit` | General, care, urgent-care, callback, or find-care form reached a tracked thank-you page. | `Lead` |
| `phone_click` | Visitor clicked a `tel:` link. | `Contact` |
| `email_click` | Visitor clicked a `mailto:` link. | `Contact` |
| `brochure_request` | Printed brochure form reached the tracked thank-you page. | `Lead` |
| `brochure_cta_click` | Visitor clicked a brochure CTA or brochure-view link. | `Lead` |
| `viewing_request` | Viewing request form reached the tracked thank-you page. | `Schedule` |
| `book_viewing_click` | Visitor clicked a book-a-viewing CTA. | `Schedule` |
| `directions_click` | Visitor clicked a directions/map link. | `Contact` |
| `enquiry_cta_click` | Visitor clicked an enquiry, callback, availability or urgent-help CTA. | `Contact` |
| `home_page_view` | Visitor viewed a home-specific page. | `ViewContent` |
| `contact_page_view` | Visitor viewed the contact page. | `Contact` |
| `consent_update` | Visitor saved cookie preferences. | None |

## Consent Mode

Google Consent Mode v2 defaults to denied before GTM loads:

- `analytics_storage: denied`
- `ad_storage: denied`
- `ad_user_data: denied`
- `ad_personalization: denied`

The cookie banner lets visitors:

- Accept all
- Reject non-essential
- Manage analytics and advertising choices

The saved choice is stored in `localStorage` under `hch_cookie_consent_v1`. The footer `Cookie preferences` control reopens the preferences UI.

## GTM Setup

Create dataLayer variable mappings in GTM for:

- `event_id`
- `page_url`
- `page_title`
- `care_home_name`
- `cta_label`
- `cta_id`
- `form_type`
- `link_url`
- `meta_event_name`
- `meta_pixel_id`

Create Custom Event triggers using the event names above. Configure GA4 event tags and Google Ads conversion tags from those triggers. Keep consent checks enabled in GTM so tags respect Consent Mode.

## GA4 DebugView Test

1. Set `NEXT_PUBLIC_GTM_ID` in the local or preview environment.
2. Open the site with GTM Preview or GA4 debug mode enabled.
3. Accept analytics cookies in the banner.
4. Trigger key actions:
   - Click a phone number.
   - Click the footer email link.
   - Click a book-viewing CTA.
   - Click a brochure CTA.
   - Submit a form and confirm the event fires only on the thank-you URL.
5. In GA4 DebugView, verify event names and parameters.

## GTM Preview Test

1. Open GTM Preview and connect to the site.
2. Confirm the initial consent state is denied before banner action.
3. Accept all, reject, and manage choices. Confirm Consent Mode updates.
4. Confirm dataLayer events include `event_id`, `page_url`, `page_title`, and any expected home/form/CTA metadata.
5. Confirm tags do not fire when consent settings deny their storage requirements.

## Google Ads Conversion Mapping

Recommended primary conversions:

- `lead_form_submit`
- `brochure_request`
- `viewing_request`
- `phone_click`
- `email_click`
- `directions_click`

Recommended secondary or diagnostic events:

- `book_viewing_click`
- `brochure_cta_click`
- `home_page_view`
- `contact_page_view`
- `enquiry_cta_click`

In GTM, map each Google Ads conversion tag to the appropriate Custom Event trigger. Use `event_id` for debugging and deduplication where supported by the tag/template.

## Meta Event Mapping

Use GTM to initialize Meta Pixel using `NEXT_PUBLIC_META_PIXEL_ID` or the `meta_pixel_id` dataLayer value. Map website events to:

- `Lead`: `lead_form_submit`, `brochure_request`, `brochure_cta_click`
- `Contact`: `phone_click`, `email_click`, `directions_click`, `contact_page_view`, `enquiry_cta_click`
- `Schedule`: `viewing_request`, `book_viewing_click`
- `ViewContent`: `home_page_view`

Do not include personal form data in Meta event parameters.

## Owner Dashboard

The internal dashboard is at:

`/admin/marketing`

It is protected with Basic Auth through middleware. It shows:

- GTM status
- Meta Pixel status
- Consent banner status
- Dashboard protection status
- Conversion event definitions
- Development-only recent test events from the browser session
- Recommended GTM event names and payloads

## Not Included In Phase 1

- No autonomous AI PPC control.
- No Google Ads API connection.
- No automatic budget changes.
- No server-side conversion API.
- No live GA4 Reporting API dashboard.
- No personal data sent to Google or Meta tracking events.

