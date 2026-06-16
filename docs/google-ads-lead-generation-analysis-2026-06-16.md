# Google Ads Lead Generation Notes

Source exports:

- `Overview_cards_csv(2026-06-16_10_57_48)` covering 1-31 May 2026.
- `Overview_cards_csv(2026-06-16_10_53_54)` covering 9-15 June 2026.

## Headline performance

| Period | Spend | Clicks | Impressions | Conversions | CTR | CPC | Conv. rate | CPA |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| May 2026 | GBP 242.93 | 196 | 5,054 | 5 | 3.9% | GBP 1.24 | 2.6% | GBP 48.59 |
| 9-15 Jun 2026 | GBP 199.38 | 75 | 1,178 | 2 | 6.4% | GBP 2.66 | 2.7% | GBP 99.69 |

The latest week has similar conversion rate but a much higher CPC, so cost per lead roughly doubled. The campaign is almost entirely mobile: May had 194 of 196 clicks and all 5 conversions from mobile; 9-15 June had 73 of 75 clicks and both conversions from mobile.

## What this means

1. The landing experience should be mobile-first and call-first.
2. Search intent is mostly local: "care homes near me", "care homes Norwich", "care homes Norfolk", "care homes Great Yarmouth", and branded/home searches.
3. Vacancy intent is showing impressions but not clicks yet, so ads and the landing page should make "availability / viewings / rooms" explicit.
4. Spend leakage is coming from job/visa-sponsorship, out-of-area, agency/nursing, and competitor-home searches.

## Implemented website changes

- Added `/care-home-vacancies-norfolk` as a focused paid-search landing page.
- Changed the homepage hero secondary CTA from "Book a viewing" to "Check availability".
- Changed the first homepage quick action to "Check availability".
- Added the new page to the footer and sitemap.

## Google Ads changes to make next

Recommended negative keywords:

- `sponsorship`
- `tier 2`
- `visa sponsorship`
- `jobs`
- `care agency`
- `agency`
- `sheltered housing`
- `home care`
- `nursing home` if Hollyman does not want nursing-home-only leads
- `bedfordshire`
- `lowestoft`
- `attleborough`
- `north walsham` if outside desired coverage

Campaign structure:

- Split branded/home-name terms from generic local care-home terms.
- Use exact/phrase match for high-intent local terms such as `care home for elderly near me`, `residential care home near me`, `care homes norfolk`, `care homes great yarmouth`, and home names.
- Keep broad match only where negative keywords are tight and conversion tracking is reliable.

Ad copy tests:

- "Check Care Home Availability in Norfolk"
- "Book a Viewing at a Family-Run Care Home"
- "Residential & Dementia Care Across the Norfolk Broads"
- "Need Care Soon? Speak to Our Team Today"

Scheduling:

- Keep strongest coverage during roughly 9 AM to 5 PM, especially 10 AM to 4 PM.
- Review weekend spend separately. Sunday delivered one conversion at low spend in the latest week, but May volume was lower at weekends.

Data to export for the next pass:

- Landing page/final URL performance.
- Conversion action breakdown.
- Geographic/location report.
- Ad group and ad asset performance.
