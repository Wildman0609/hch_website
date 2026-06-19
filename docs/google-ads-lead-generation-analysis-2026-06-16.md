# Google Ads Lead Generation Strategy

Source exports reviewed:

- `Overview_cards_csv(2026-06-16_10_57_48)` covering 1-31 May 2026.
- `Overview_cards_csv(2026-06-16_10_53_54)` covering 9-15 June 2026.
- `google ads export/Search keyword report.csv` covering 1-31 May 2026.
- `google ads export/Location report.csv` covering 1-31 May 2026.
- `google ads export/URL inclusions report.csv` covering 1-31 May 2026.
- `google ads export/Negative keyword report.csv` covering all time.

## Executive view

This is a mature account with useful learning history. It should not be reset.

The account has already built a large negative list and the main broad keywords are producing conversions. The next improvement is tighter control around intent, geography and landing-page relevance, not a wholesale rebuild.

The clearest opportunity is to keep the broad-match learning that works, but surround it with stronger thematic negatives, a clearer campaign structure and the new availability-led landing page.

## Performance snapshot

| Period | Spend | Clicks | Impressions | Conversions | CTR | CPC | Conv. rate | CPA |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| May 2026 | GBP 242.92 | 196 | 5,054 | 5 | 3.88% | GBP 1.24 | 2.55% | GBP 48.58 |
| 9-15 Jun 2026 | GBP 199.38 | 75 | 1,178 | 2 | 6.37% | GBP 2.66 | 2.67% | GBP 99.69 |

The latest week did not show a conversion-rate collapse. The problem was higher CPC, which doubled CPA. That points to auction pressure, match-quality drift, or a short-term mix shift rather than a broken website funnel.

## What is working

May conversions came from two broad keywords:

| Keyword | Match | Spend | Clicks | Conversions | CPA |
| --- | --- | ---: | ---: | ---: | ---: |
| `care homes near me` | Broad | GBP 165.68 | 140 | 4 | GBP 41.42 |
| `care homes Norwich` | Broad | GBP 21.31 | 13 | 1 | GBP 21.31 |

Broad match generated all May conversions:

| Match type | Keywords | Spend | Clicks | Conversions |
| --- | ---: | ---: | ---: | ---: |
| Broad | 48 | GBP 206.21 | 175 | 5 |
| Phrase | 21 | GBP 31.57 | 19 | 0 |
| Exact | 7 | GBP 5.14 | 2 | 0 |

Recommendation: keep broad match, but control it. Do not turn it off just because it is broad. It is currently the account's conversion engine.

## Main issue

The account has 479 negatives, but 439 are exact match. That means the account has been blocking bad individual queries after they appear, rather than blocking bad themes before variants appear.

Examples still appearing in recent search-term data:

- `care homes with tier 2 sponsorship in bedfordshire`
- `care homes with visa sponsorship near me`
- `avail care agency norwich`
- `home care great yarmouth`
- `sheltered housing norwich`
- `nursing home near me`
- `st edmunds care home attleborough`
- `thomas tawell house norwich`
- `ludham care home`
- `care homes wymondham`

This does not mean the existing negative work was poor. It means the next step is to move from exact-query pruning to thematic filtering.

## Negative keyword strategy

Create or update a shared negative list called `Non-admission intent`.

Add these as phrase-match negatives unless noted:

| Theme | Add | Reason |
| --- | --- | --- |
| Recruitment and visa | `sponsorship`, `visa sponsorship`, `tier 2`, `jobs`, `job`, `work agency` | Blocks employment/visa traffic without needing every full query variant. |
| Home care / agencies | `home care`, `care agency`, `care agencies`, `agency near me` | Hollyman is selling care-home admissions, not domiciliary care or agency work. |
| Housing alternatives | `sheltered housing`, `assisted living`, `independent living` | Different decision path and usually lower fit for bed-fill enquiries. |
| Out of area | `bedfordshire`, `attleborough`, `lowestoft`, `wymondham` | These appeared in wasted traffic and do not match the current core home footprint. |
| Competitor pruning | Add exact negatives for individual competitor homes as they appear. | Avoid blocking useful local terms such as `care home great yarmouth`. |

Use caution with `nursing home`.

There were 40 existing negative terms containing nursing-home language, but recent traffic still included `nursing home near me` and `nursing home norwich`. If Hollyman never wants nursing-led enquiries, add phrase negative `nursing home`. If some families use "nursing home" loosely when they mean care home, keep it as monitored exact negatives and use ad copy to clarify "residential, dementia, respite and palliative care".

Do not add broad negative `care`, `home`, `homes`, `elderly`, `residential`, `near me`, `Norwich`, `Norfolk`, or `Great Yarmouth`.

## Campaign structure

The current export shows one campaign/ad group carrying the whole job. A mature account can still improve by separating intent, budget control and landing pages.

Recommended structure:

| Campaign | Purpose | Landing page | Budget direction |
| --- | --- | --- | --- |
| `Search - Core Local Care Homes` | Main non-brand lead generation from `care homes near me`, `care homes Norwich`, `care homes Norfolk`, `care homes Great Yarmouth`. | `/care-home-vacancies-norfolk` | 65-75% |
| `Search - Brand & Home Names` | Defensive and direct navigation searches for Hollyman and each home. | Relevant home page or `/find-your-home` | 5-10% |
| `Search - Care Type` | Dementia, residential, respite and palliative searches. | Relevant care-service page or availability page. | 10-15% |
| `Search - Urgent / Admissions` | High-intent bed, vacancy, discharge, respite-now and viewing language. | `/care-home-vacancies-norfolk` or `/urgent-care-help` | 10-15% |
| `Experiment - AI Max / URL Expansion` | Controlled test only. | Restrict to availability page, home pages and care-service pages. | 5-10% test cap |

The URL inclusions report shows no AI Max or URL-inclusion traffic in May. Keep it that way until conversion tracking and landing pages are clean. If testing AI Max, do it as a small controlled experiment, not as the main campaign.

## Keyword plan

Keep and protect:

- `care homes near me` broad
- `care homes Norwich` broad

Add phrase/exact coverage around winners:

- `"care homes near me"`
- `[care homes near me]`
- `"care homes Norwich"`
- `[care homes Norwich]`
- `"care homes Norfolk"`
- `[care homes Norfolk]`
- `"care homes Great Yarmouth"`
- `[care homes Great Yarmouth]`
- `"residential care home near me"`
- `[residential care home near me]`

Test high-intent availability terms:

- `"care home vacancies near me"`
- `"care homes with vacancies"`
- `"care home rooms available"`
- `"care home bed available"`
- `"book care home viewing"`
- `"urgent care home placement"`
- `"respite care home near me"`

Separate branded/home-name terms:

- `"hollyman care homes"`
- `[hollyman care homes]`
- `"martham lodge care home"`
- `[martham lodge care home]`
- `"broadlands park upton"`
- `"broadland house care home"`
- `"braydeston court"`

Brand/home-name searches produced 36 clicks across May and 9-15 June with no recorded conversions. They are still worth covering cheaply, but they should not be allowed to consume generic lead-generation budget.

## Location strategy

May location performance:

| Location target | Spend | Clicks | Conversions | CPA |
| --- | ---: | ---: | ---: | ---: |
| 15 mi around Acle | GBP 236.45 | 190 | 5 | GBP 47.29 |
| 15 mi around Brundall | GBP 4.85 | 5 | 0 | n/a |
| 15 mi around Potter Heigham | GBP 1.62 | 1 | 0 | n/a |

Acle is currently doing almost all the work. Do not conclude that Brundall and Potter Heigham are bad from this small sample. The radii likely overlap, and the Acle radius may be absorbing most eligible traffic.

Actions:

1. Confirm location setting is `Presence: people in or regularly in your targeted locations`, not people merely interested in them.
2. Keep the Acle radius as the proven core.
3. Add or test a specific Martham/Potter Heigham cluster if bed-fill need exists there.
4. Consider separate campaigns for `Broadland / Acle / Upton`, `Martham / Potter Heigham / Great Yarmouth`, and `Brundall / Norwich fringe` only if budget is high enough to avoid starving learning.
5. Add location exclusions or negatives for areas that cannot become admissions, especially if they recur in search terms.

## Landing page strategy

Implemented website changes:

- Added `/care-home-vacancies-norfolk` as a focused paid-search landing page.
- Changed the homepage hero secondary CTA to `Check availability`.
- Changed the first homepage quick action to `Check availability`.
- Added the new page to footer navigation and sitemap.

Use `/care-home-vacancies-norfolk` for:

- `care homes near me`
- `care homes Norfolk`
- `care homes Norwich`
- `care homes Great Yarmouth`
- vacancy/admission/viewing terms
- broad-match core campaigns

Use specific home pages for:

- home-name searches
- branded searches with a home modifier
- remarketing/search retargeting where the family has already viewed a home page

Use service pages for:

- dementia care
- residential care
- respite care
- palliative care

## Ad copy tests

Test these themes in RSA headlines:

- `Check Care Home Availability`
- `Care Home Rooms in Norfolk`
- `Book a Care Home Viewing`
- `Family-Run Norfolk Care Homes`
- `Residential & Dementia Care`
- `Need Care Soon? Call Today`
- `Speak to a Local Care Team`

Descriptions:

- `Ask about current rooms, viewings and next steps across our Norfolk care homes.`
- `Family-run residential, dementia, respite and palliative care across the Norfolk Broads.`
- `Call to talk through care needs, location, timescale and availability.`
- `You do not need to know the exact care type before you speak to us.`

Make sure at least one ad in the core campaign explicitly says `availability`, `viewing`, or `rooms`, because vacancy intent is present but not yet converting.

## Bidding and budget

Do not overreact to the 9-15 June CPA spike on one week of data. The conversion rate was stable; CPC rose.

Use this operating rule:

1. Keep budget flowing to the proven broad-match core.
2. Add thematic negatives first.
3. Move high-intent exact/phrase variants into cleaner ad groups/campaigns.
4. Watch CPA by conversion action and lead quality, not just Google Ads conversions.
5. Only reduce broad match if waste remains after the new negative structure and landing-page routing are live.

If volume is low, avoid splitting too aggressively. Start with:

- one core non-brand campaign,
- one brand/home-name campaign,
- one urgent/availability ad group or campaign,
- one shared negative list.

## Measurement checks

The next strategy pass needs conversion-action quality, not just total conversions.

Export or check:

- Conversion action breakdown: calls, forms, viewing requests, brochure requests, thank-you pages.
- Final URL performance after `/care-home-vacancies-norfolk` receives traffic.
- Search terms with conversions, not only keyword-level conversions.
- Lead quality from actual enquiries: home needed, timescale, care type, and whether a bed was filled.
- Device and call-extension performance by campaign.

Primary success metric should be cost per qualified admission enquiry, not cost per all conversions.

## 30-day action plan

Week 1:

- Add the shared negative list and apply it to the core campaign.
- Route core non-brand ads to `/care-home-vacancies-norfolk`.
- Add availability/viewing-led ad copy.
- Keep `care homes near me` and `care homes Norwich` broad active.

Week 2:

- Split brand/home-name traffic into its own low-budget campaign.
- Add phrase/exact winner variants for the proven local terms.
- Review search terms after the new negatives have had time to filter traffic.

Week 3:

- Launch or isolate urgent/admissions terms.
- Add care-type ad groups if budget allows.
- Compare call conversions and form conversions separately.

Week 4:

- Decide whether to keep, reduce or expand broad match based on post-negative CPA and lead quality.
- Test location split only if there is enough conversion volume or a specific home has urgent occupancy pressure.
- Build a simple lead-quality feedback loop from enquiries to admissions.
