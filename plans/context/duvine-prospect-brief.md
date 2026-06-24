# DuVine Cycling + Adventure Co. — prospect brief

**Stage:** S4, post-proposal, active competitive evaluation against Contentful
**Audience:** Sanity SE + AE (internal)
**Prepared by:** @presailor, 2026-06-17 (v0.5-draft, updated 2026-06-23)
**Sources:** Gong company overview; Evan Howe's June 16 deal review; Apr 3 ROI call transcript; live site survey of duvine.com (2026-06-17); Allan's 2026-06-23 update on Therefore handoff and forthcoming Contentful brief; @uxresearcher's tech brief 2026-06-23 (`/outputs/duvine-tech-brief.md`).
**Companion files:** `outputs/prospect-context-duvine.md` (structured/YAML version with the same content for downstream agents); `outputs/duvine-tech-brief.md` (deeper technical/martech/infra teardown by @uxresearcher).
**Changelog:** v0.3 added the Site Analysis section (sitemap survey, tech stack, Centaur booking finding, WP REST API gap). v0.4 (2026-06-23): Therefore primary contact handed off from Luke Bowler to David Malinowicz (`david@therefore.ca`); Contentful-vs-Sanity brief is in progress (owner/ETA TBD). v0.5 (2026-06-23): @uxresearcher tech brief folded — new section "What the tech brief adds" below the existing Site Analysis; WP REST API gap finding strengthened with REST namespace enumeration; expanded plugin inventory; Centaur6 fingerprinted as Java/Apache; full martech IDs captured; new discovery gaps added (staging.duvine.com publicly reachable; WP 7.0 generator anomaly; Wordfence WAF; Atlassian TXT). Site Analysis (v0.3) preserved as-is — the new section extends rather than supersedes.

## The deal in one paragraph

DuVine is a sub-40-person luxury cycling-tour operator, 75% owned by Lindblad Expeditions and Natural Habitat Adventures. Their stack is fragmented: WordPress for the site, InDesign for collateral, Kaptio + Salesforce for ops, HubSpot for marketing. Average order value sits around $12,000, with ~3,375 bookings a year and a stated business goal of growing the 15% upsell attach rate. Sanity has been in the deal since mid-2025. A full proposal landed in April 2026 at about $101k all-in, paired with a four-hypothesis ROI model totaling well over $1M in modeled annual upside. Implementation partner Therefore Interactive is the champion in the room, through Luke Bowler.

On April 3, the economic buyer Deena Giancotti asked Sanity for a deeper Sanity-vs-Contentful comparison. Per Allan (2026-06-23), that brief is now in progress — owner and ETA TBD. The 2.5-month gap between her ask and the brief landing is plausibly why she has been dark. In late May, Contentful entered the evaluation through Lindblad Group introductions — sister brand NatHab has been on Contentful since 2023 — and DuVine now perceives feature parity between the two vendors. Deena has been dark to Sanity for about two months. Salesforce announcing its acquisition of Contentful while this evaluation was live has added a "strategic alignment with our existing Kaptio investment" narrative that's currently working against us. The deal is alive but contested. The next move is shipping the Contentful brief through David Malinowicz (the new primary Therefore contact as of 2026-06-23) to Gwen, then to Deena.

## Who's in the room

**At DuVine.** Deena Giancotti is the budget holder and signer. She has not engaged Sanity directly since early April. Per Luke, she's aware of Evan's messages and is waiting for the Contentful evaluation to settle. She is materially risk-averse, having just come off a painful Salesforce Commerce Cloud + Kaptio implementation, and prefers CAPEX to OPEX. Gwen Kidera, Creative Director, is leading the day-to-day evaluation. Gwen is the more accessible contact and has already authored a Sanity-vs-Contentful comparison spreadsheet that Luke has shared with us. Mia attended the March demos; her role isn't clear and isn't documented.

**At Therefore Interactive (implementation agency).** As of 2026-06-23, **David Malinowicz (`david@therefore.ca`) is the primary point of contact**, replacing Luke Bowler. Title, tenure, and direct relationship with Deena and Gwen are not yet confirmed — Luke's brief mentions him as having attended the June 8 sync and a May 22 meeting with Deena, so he is known to the room, but his standing is less documented than Luke's was. Reason for the handoff is not specified.

Luke Bowler was the deal's de facto champion through the April-June stretch and is the source of the "philosophy not features" framing, the Gwen comparison-spreadsheet relay, and most of the Contentful-evaluation intel. His direct line to Deena and Gwen carried the deal through the competitive entry. His residual role post-handoff is unclear — still informally advising, still in the shared `#agency-therefore-sanity` Slack, or fully out — and that gap is worth resolving before the next agency-mediated touchpoint. Luke had also reached the limit of unpaid agency work (no Therefore-built POC), which is unchanged by the handoff.

Pierre Marcel is the technical lead. Alex De Winne has been in demos.

**At Sanity.** Stephen Burd took over the AE seat from Rob Jenkins in February. Per Evan's brief, another AE handoff is in progress. Nancy Du is the SE who ran the demos and acknowledged that the AI story was never properly shown. Evan Howe is the RSD and the primary voice with Luke.

**Adjacent influencer working against us.** Ted Martens at NatHab is a Contentful advocate and a trusted contact for Deena. NatHab chose Contentful over Sanity in 2023 citing $20k/year savings — comparison is materially flawed (NatHab is larger, 2023 pricing, different use case profile, DuVine qualifies for boutique pricing NatHab wouldn't have) but it landed via peer validation and has not been countered.

The structural problem is that there's no internal champion at DuVine. Luke was the deal's champion through April-June but is no longer the primary Therefore contact. David inherits the role without the same documented relationship to Deena and Gwen. Gwen is the closest internal-DuVine candidate but her influence on Deena is unclear. No Sanity exec-to-exec relationship has been established.

## What hurts and what they want

**Articulated pain.**

- WordPress is slow, developer-dependent, and weak at structured content. Editors are blocked by dev. Content is trapped in the web layer.
- Content lives in silos: web in WordPress, collateral in InDesign, ops in Kaptio/Salesforce, marketing in HubSpot. No single source of truth. Reuse is manual and error-prone.
- The SFCC + Kaptio implementation has shaped how Deena evaluates this deal. She's burned on large complex projects. This is the most important psychological dynamic in the room.
- Deena wants to manage Salesforce-adjacent content (tour itineraries, variants) without logging into Salesforce. She wants the CMS to be the interface; Salesforce stays the system of record.
- DAM is a genuine gap. Bynder's status is unclear. Kaptio's DAM was quoted at $100k/year alone and was insufficient.
- The marketing team is small relative to the scale: 86 active tours, multiple channels, seasonal campaigns.

**The four ROI hypotheses Evan modeled with Deena on April 3.** Numbers are modeled, not actuals. Deena called the model speculative-but-useful and committed to adjusting the inputs with her team.

| Hypothesis | Inputs | Modeled outcome |
|---|---|---|
| Better conversion on existing paid traffic | 216k paid sessions/yr; 0.4% current conversion; $12k AOV; 10% conversion lift | +86 bookings/yr, ~$1M incremental revenue |
| Better upsell merchandising in the booking funnel | 3,375 bookings/yr; 15% attach; $700 avg upsell | Lift in attach rate and per-upsell value (Deena's primary stated goal) |
| Personalized lead nurturing | 11% lead conversion baseline → 11.5% | +118 bookings/yr |
| SEO/AEO via structured content | Not modeled in detail on the call | Framing-only at this point |

The upsell hypothesis is the one Deena cares most about. It's the explicit business goal in the Gong brief.

## What we're being evaluated for

The primary use case is **marketing website (content ops)**, High tier — a full rebuild of duvine.com. Content scale on the current site: 63 pages, 86 tours, 9 tour collections, 48 bikes, 153 people, 156 blog posts, 32 post authors, 62 locations, 8,505 assets, 6 admins, 10 editors, 3 datasets.

**Confirmed use cases:** marketing website (content ops), content hub (single source of truth across channels — stated as ambition), consolidation (replacing WordPress + InDesign + likely Bynder), and PIM (the tour catalog is effectively a product catalog).

**Implied but undemo'd:** e-commerce content for the booking flow, HubSpot email integration, line-of-business app patterns for occupancy-based promotion logic, and a portal-style experience that lets DuVine staff manage Salesforce-adjacent content from the CMS.

**The PIM framing for the tour catalog is the most underleveraged angle in the pitch.** It maps directly to Deena's stated "manage Salesforce content from the CMS" use case and to the boutique-luxury tour-operator content model.

## The competitive picture

**Contentful is the only other vendor in the deal.** Drupal was formally retired by Deena per the June 8 sync with Luke — too much customization required.

Contentful entered on May 21. Gwen reached out directly via Lindblad Group contacts. The same Contentful AE who covers Lindblad's other properties made the introduction. Three things are landing for them right now:

1. **Pricing pitch.** Unlimited API calls, 10TB storage, AI Actions and Personalization included, sandbox created for Therefore, baseline around $40k/year. The full quote hasn't arrived yet. Luke's strong belief is the all-in will exceed $100k once storage, AI Actions, Personalization, and other add-ons are scoped. When that quote lands, the parity story collapses.

2. **Salesforce acquisition narrative.** Salesforce announced the Contentful acquisition mid-evaluation. DuVine uses Kaptio (Salesforce). The narrative being pushed is "strategic alignment with your existing stack." Luke joined the DuVine + Contentful call on June 4 and confirmed this is being pushed hard.

3. **NatHab peer validation.** Ted Martens at NatHab is in Deena's ear. The 2023 NatHab → Contentful decision is operating as the peer reference DuVine trusts more than any marketing collateral Sanity has put in front of them.

**The counters that haven't been delivered yet.** All three of these are in Evan's brief but haven't landed with DuVine:

- The Salesforce acquisition is a roadmap freeze, not a benefit. Contentful's MCP and AI capabilities will likely be subordinated to AgentForce. Deena already doesn't fully trust Salesforce — deepening that dependency is the opposite of what she wants.
- The NatHab comparison is materially flawed. Different company size, 2023 pricing, different use case. DuVine qualifies for boutique pricing NatHab wouldn't have.
- The pricing pitch is incomplete. The $40k Contentful baseline is being compared against the $101k Sanity all-in which includes a real DAM. Once Contentful's full quote arrives, the comparison normalizes.

**The framing that should anchor the next conversation** is Luke's own line from May 21:

> "Our own agency choices came down to philosophy. There's increasing parity of features between headless CMSs because features are cheap. What sold us on Sanity was your decision making — what you prioritised and what you didn't."

This is the line that beats "feature parity." Use it.

## What we've already shown and sent

So the new AE doesn't re-pitch what's already landed.

| Asset | Status |
|---|---|
| Eurostar case study (localization, A/B testing, SEO; 2-3 weeks to days) | Pitched on Apr 3 |
| Love Holidays case study (AI managing 50k hotel pages, $300k/yr translation savings) | Pitched on Apr 3 |
| VBT Bike Tours case study (closest peer) | Mentioned on Apr 3; parent-company question left open — Evan couldn't recall it on the call |
| Marriott case study (scale) | Mentioned on Apr 3 |
| ROI calculator with four hypotheses (yellow inputs, purple uplift, green outcome) | Shared with Deena |
| Proposal deck (April 2026), E0 @ 30% discount, Media Library slides at end | Delivered |
| Onboarding and team structure walkthrough (account mgr, solution architect, 24/7 support, QBRs) | Delivered Apr 3; Deena heard it, didn't press |
| Sanity vs. Contentful framing — atomic content vs. page-centric, using DuVine's own difficulty-level example | Delivered Apr 3, conceptual only |
| **Deeper Sanity-vs-Contentful side-by-side that Deena explicitly asked for** | **In progress as of 2026-06-23 (per Allan). Owner and ETA TBD.** |
| Response to Gwen's comparison spreadsheet | Not delivered; folds into the in-progress Contentful brief |
| Multi-channel + AI demo (Deena's stated gap) | Never shown |
| Salesforce integration demo | Never shown |

The Contentful brief is the single most consequential deliverable in flight. Until it landed in motion this week, it had been the open Apr 3 commitment that plausibly kept Deena dark.

## Commercials, with one caveat

The quote sent in April:

| Line item | Annual |
|---|---|
| Sanity Enterprise 0 (30% discount) | ~$45,000 |
| Media Library add-on | **conflict between sources — see caveat** |
| All-in | ~$101,000 |
| Therefore implementation (separate) | ~$300,000 |

The deal sits under the $250k approval threshold, so no special approvals are required. Evan noted in Slack that there is room on price; that room should not be offered proactively, but it's available.

**Pricing caveat.** Evan's June 16 deal review lists the Media Library at ~$9,800/year (the 1TB bandwidth + 1TB storage add-on tier). The April 3 transcript has Evan quoting Deena $45,000/year for "the upgraded Media Library shown in the demo." These are almost certainly two different SKUs — the basic add-on versus the full Media Library product. The $101k all-in reconciles to the $45k figure, not the $9.8k. Worth confirming with Nancy which is on the current quote sheet before the next pricing conversation.

## Risks the SE may want to weigh

| Risk | Level | Consideration |
|---|---|---|
| Deena is dark | High | Direct AE outreach reads as pressure. Route through Gwen with substance, cc David Malinowicz (new Therefore primary contact) and Deena. The Contentful brief landing is the natural re-engagement vehicle. |
| Contentful's competitive momentum | High | Sandbox access, Salesforce acquisition story, peer validation, baseline pricing. The window to land philosophy and TCO is now, before Contentful's full quote arrives. |
| AE handoff mid-deal | High | Don't restart discovery on the new AE's first interaction. Warm intro from Evan, shadow first, lead second. |
| "Too web-focused" demo gap | Medium-high | This is the most fixable risk. Deena's explicit feedback was that both demos felt too web-focused. AI was never properly shown. A scoped 30-minute multi-channel + AI mini-demo addresses both. Not another full demo. |
| No internal champion at DuVine | Medium | Luke was the champion through April-June; David Malinowicz inherits the Therefore-side role 2026-06-23 with less-documented standing. Gwen is still the closest internal-DuVine candidate. Investing in Gwen as champion-by-substance is the highest-leverage stakeholder move. Briefing David thoroughly is the agency-side parallel. |
| **Therefore handoff mid-evaluation** | **Medium-high** | Luke-to-David handoff lands while the deal is in active competitive evaluation against Contentful. New AE plus new Therefore primary contact compounds discontinuity. Mitigation: explicit warm handoff briefing from Luke to David before any new customer-facing motion; Sanity-side coordination call with David ASAP to align on outstanding actions. |
| Deal size vs. investment ceiling | Medium | Evan flagged on June 8 — this is a small account for Sanity. No custom POC. Existing demo assets, case studies, published prompts, and a focused mini-demo are the available moves. |
| NatHab precedent unaddressed | Medium | The 2023 NatHab/Contentful comparison is doing damage in the background. Worth addressing proactively rather than hoping it gets forgotten. |
| Salesforce acquisition narrative | Medium | DuVine reads this as strategic alignment. The counter-narrative — roadmap freeze, AgentForce capture, ecosystem lock-in, Deena's existing distrust of Salesforce — needs to land in the next conversation, not later. |

## Suggested near-term moves

Recommendations, not directives. The SE/AE make the calls.

1. **Ship the forthcoming Contentful-vs-Sanity brief through David to Gwen, cc Deena.** This closes the open Apr 3 commitment and is the most consequential remaining deliverable in the deal. Allan flagged the brief in progress 2026-06-23; confirm owner, ETA, and how it routes. Use Luke's "philosophy not features" framing as the spine.

2. **Coordinate with David Malinowicz** on the state of outstanding actions inherited from Luke: the June 16 follow-up questions from DuVine, the proposal breakdown Luke requested June 10, and Gwen's comparison spreadsheet. Confirm what's landed at Therefore vs. what's still pending on Sanity's side before the next customer-facing motion.

3. **Reach Gwen directly**, cc Deena and David, with the Eurostar, Love Holidays, and VBT case study materials in writing. A natural, non-pressuring re-engagement vehicle. The Contentful brief is the second wave in the same conversation.

4. **Review Gwen's comparison spreadsheet** and supply corrected Sanity column entries through David. Gwen's framing is the proxy for Deena's evaluation criteria. Confirm David has the spreadsheet or retrieve it from Luke.

5. **Confirm the Luke-to-David handoff context with Allan or Evan** before the next Therefore-mediated touchpoint. Reason for handoff, David's title and seniority, his prior relationship with Deena and Gwen, and Luke's residual involvement (still informally advising? fully out?). Affects how to brief David and whether Luke's quotes can be cited in his own voice in customer-facing material.

6. **Ask Nancy if she has a prior Salesforce integration demo asset.** If yes, that closes the largest demo gap with near-zero new build cost.

7. **Plan a focused multi-channel + AI mini-demo.** 30 minutes, Gwen-first audience, addressing Deena's specific "too web-focused" feedback. AI Assist + Content Agent + one Function example (HubSpot integration or smart-promotion logic) + a shareable prompt. Highest-leverage remaining demo move.

8. **Confirm VBT's parent company** and whether sibling brands (Country Walkers, etc.) also run on Sanity. Deena asked this herself on April 3. Closing the loop with a name is small-but-symbolic — answering an unanswered question.

9. **Reconcile the Media Library pricing** between the two sources internally before the next commercial conversation.

10. **Brief the incoming AE** on this document plus Evan's deal review before any DuVine-facing interaction.

## Site analysis (duvine.com, surveyed 2026-06-17)

A live look at the site, sitemap, and request behavior. Independent of the briefs.

**Scale (from `sitemap_index.xml`, seven child sitemaps).** Total indexed URLs: **443**.

| Content type | Sitemap count | Evan brief count | Notes |
|---|---|---|---|
| Tours | 84 | 86 | Matches closely |
| Tour collections | 7 | 9 | Two collections may be unpublished or seasonal |
| Bikes | 58 | 48 | Sitemap higher — Evan's count may be stale |
| Locations | 62 | 62 | Exact match |
| Pages | 57 | 63 | Within margin |
| Blog posts | 167 | 156 | Sitemap higher (~7% growth since brief) |
| Blog categories | 8 | n/a | Eight editorial buckets: bike, eat-drink, sleep, travel-insight, profiles, etc. |

Numbers track Evan's brief within roughly 5%. **The prospect numbers are accurate, not estimated** — likely sourced from a CMS export or Therefore handover. That's worth noting because the usual SE rule (prospect numbers are understated by 5-10x) does not apply here. Whatever Deena and Therefore say about scale, treat as credible.

**The content model that's actually live.** Tours, locations, bikes, and collections each have their own custom post types in WordPress, exposed as crawlable URL spaces (`/tour/`, `/bike/`, `/region/europe/france/...`). That's a structured tour catalog masquerading as a website. The PIM framing for this catalog isn't hypothetical — it's already how the content is shaped under the hood. The current platform just doesn't surface or expose it that way.

**Hierarchical location taxonomy.** `/region/europe/france/dordogne/`, `/region/europe/italy/sicily/`, `/region/africa/south-africa/`. Real geographic nesting, manually maintained. This is reference data that should be a structured tree, not a URL tree.

### Tech stack (live signals, not brief-derived)

| Layer | Detected | Implication |
|---|---|---|
| CMS | WordPress 7.0 (current release) | They're current. Not "legacy WordPress" technically. The pain is structural, not version-related. |
| Theme | `sherman` (custom) | Custom theme, not a pre-built one. Means a developer touch on every layout change. |
| Plugins (visible) | Yoast SEO, W3 Total Cache, Autoptimize, Insta-Gallery, Sagittarius (probably a custom tour-post-type plugin), TypeKit (cloud.typography.com) | Standard WP performance + SEO stack. Sagittarius is likely the custom tour-data layer — worth confirming with Therefore. |
| Web server | nginx 1.18 on Ubuntu | Standard. |
| CDN / assets | `cdn.duvine.com` → S3 (us-west-2) → CloudFront | Assets on AWS, fronted by CloudFront. **No DAM** — assets are raw S3 objects with naked dated paths. This matches the "DAM gap" in the briefs and is structurally why Bynder or Sanity Media Library would matter. |
| Front-end framework | None. Server-rendered WordPress. | Not headless. Not React. Not Next.js. The "WordPress is slow and developer-dependent" complaint in the briefs is accurate. |
| Analytics | Google Tag Manager, dataLayer events, Universal Analytics (`UA-` properties) | Standard. UA properties indicate they may not have fully migrated to GA4 yet. |
| Forms | HubSpot Forms (`hsforms.net`) | HubSpot integration via embedded forms. Matches the brief. |
| Video | Vimeo (embedded player) | Vimeo, not YouTube. Premium signal. |
| Social | Instagram (Insta-Gallery plugin), Facebook, Pinterest, Twitter, Vimeo | Standard luxury-brand social presence. |
| Booking system | **`centaur.duvine.com`** — Centaur TBMS (Travel Business Management System) | Not Kaptio. See below. |

### Booking-system finding — worth verifying with the AE

Tour pages link to `https://centaur.duvine.com/centaur6/TravelerLoginPage/...` for the customer booking portal. **Centaur TBMS** is a tour-operator back-office and reservation platform — separate vendor from Kaptio. Both briefs name Kaptio prominently as part of DuVine's stack and as the source of Deena's "post-traumatic" implementation pain. The live site does not link to Kaptio anywhere visible.

Three possible reconciliations:

- Kaptio is internal-facing (ops, finance, agent-facing) and Centaur is customer-facing
- Kaptio was historical and has been replaced by Centaur — Deena's "trauma" is from a now-superseded system
- The briefs are imprecise about vendor names — "Kaptio" may have been a stand-in for "the back-office travel system"

The Apr 3 transcript has Evan saying "Captio" with a C, possibly a transcription artifact. Worth a single discovery question to Luke: "What's the relationship between Kaptio, Centaur, and Salesforce in your current stack?" The answer changes the Salesforce-integration discovery and the "manage Salesforce content from CMS" use case.

### The structural problem — exposed via the WP REST API

Querying `https://www.duvine.com/wp-json/wp/v2/types` returns the post types registered for REST access. Result:

```
post (Blog posts)
page (Pages)
attachment (Media)
nav_menu_item, wp_block, wp_template, wp_template_part,
wp_global_styles, wp_navigation, wp_font_family, wp_font_face,
superblockslider
```

**`tour`, `bike`, `location`, `tour_collection` are NOT exposed via the REST API.** They exist as custom post types in WordPress — the sitemaps prove it — but they are unreachable to anything outside the WordPress monolith. There is no API path to query the tour catalog from an external system. Whatever consumes this data (HubSpot email, social merchandising, the booking flow on centaur, mobile, anything) cannot pull it.

This is the structural proof of the briefs' complaint that "content is trapped in the web layer." It is not rhetorical. It is observable in one HTTP request. This is the most concrete piece of demo ammunition this site survey produced.

### Performance

- TTFB for both homepage and a sampled tour page: ~1.4 seconds
- Page weight: ~87 KB HTML, with 38 script tags and 57 image tags on the homepage
- W3 Total Cache footer comment is in every response, suggesting page caching is working

TTFB of 1.4s with full page cache is slow for a static-rendered WordPress site. Cold cache, mobile, or non-cached pages will be materially worse. Core Web Vitals will not be great. SEO and conversion-rate hypotheses from the ROI model both depend on improving this, and the WordPress + Sherman + W3TC stack has a ceiling.

### What this site analysis adds to the Sanity story

Beyond what the briefs already said:

1. **The PIM framing for the tour catalog is observable, not hypothetical.** Custom post types for tour / bike / location / tour_collection already exist; they're just opaque outside WordPress. Sanity makes them queryable, composable, and shippable to any surface.
2. **The "content trapped in the web layer" complaint is provable in one HTTP request.** A Sanity demo can literally `curl` `wp-json/wp/v2/types`, show no `tour` in the response, and contrast it with one `groq` query against a Sanity dataset returning every tour structured. That's a 30-second demo moment.
3. **No DAM is currently in production for the website assets.** Assets are raw S3 paths under cdn.duvine.com. Bynder, if it exists, is not gating delivery. This sharpens the Media Library value proposition — they're not replacing a working DAM, they're adopting their first one.
4. **The booking system is Centaur, not (just) Kaptio.** Worth verifying. This changes the integration discovery question and the Salesforce-adjacent use case framing.
5. **Performance ceiling.** TTFB at 1.4s on a cached, server-rendered WordPress site is the kind of number that constrains the ROI hypotheses on paid-traffic conversion and SEO. Worth using as supporting evidence for the "experimentation requires speed" framing Evan already used.

### Discovery questions the site survey raises

These are new gaps generated by the site analysis, not duplicates of the prospect-context queue.

- What's the relationship between Centaur, Kaptio, and Salesforce in DuVine's actual production stack today?
- Is Bynder (referenced in Evan's brief) actively in use, or shelved? The site doesn't surface it.
- Is the `sagittarius` plugin Therefore's own work, or a third-party tour-content plugin? It's the natural data layer to migrate to Sanity, so its ownership matters.
- Are the GA4 / UA migration and the W3TC config part of the rebuild scope, or out of scope?

## What the tech brief adds (UXR, 2026-06-23)

@uxresearcher ran a deeper teardown of the same site after the v0.3 Site Analysis. The full brief is at `/outputs/duvine-tech-brief.md`. The points below are the ones that materially change or sharpen the deal picture; the original Site Analysis stands.

**The "content trapped in WordPress" claim is now doubly evidenced.** The v0.3 survey showed `tour`, `bike`, `region`, `tour_collection` aren't in `/wp-json/wp/v2/types`. UXR added the inverse evidence: an enumeration of all active REST namespaces on the site. Active namespaces are `oembed`, `akismet`, `quadlayers/instagram`, `redirection`, `wordfence`, `yoast`, `duplicate-post`, `wp-offload-media`, `regenerate-thumbnails`, `wp/v2`, `wp-site-health`, `wp-block-editor`, `wp-abilities`. The `sagittarius` plugin — which registers the custom tour/bike/region/tour_collection post types — **does not register a REST namespace at all.** Their entire product catalog has zero API surface. This is undeniable demo ammunition.

**Centaur6 is a Java/Apache multi-tenant reservation platform.** The booking system at `centaur.duvine.com` is more specifically a J2EE app with DuVine as tenant `dvi` (URL pattern `/centaur6/...?company=dvi`). It runs older jQuery (3.2.1 vs. 3.7.1 on the WP site), HubSpot Forms v2, and a Tealium-like analytics tag (`52459.tctm.co/t.js`). This is a generation older than the WordPress site technologically. There is **no integrated booking experience today** — every "Book Now" on duvine.com punts to a contact form, brochure request, or a portal launch into Centaur. That's the architectural gap Sanity + Centaur (via API or scheduled sync) would fill.

**Expanded plugin inventory via REST namespace enumeration.** UXR identified plugins beyond what the homepage HTML exposed:

- `wp-offload-media` — explains why uploads rewrite to `cdn.duvine.com` (S3 + CloudFront). This is a plugin-driven pattern, not a hand-rolled CDN rewrite.
- `wordfence` — security/WAF plugin is installed and active. Worth noting operationally: any heavy probing of duvine.com could trip WAF rules.
- `redirection` — URL redirect management at scale.
- `akismet`, `duplicate-post`, `regenerate-thumbnails` — routine editorial / utility plugins.

**Infrastructure precision.** The site sits on an AWS Application Load Balancer in **us-west-2 (Oregon)**, with **Cloudflare for DNS only** (no Cloudflare proxy on www — no `cf-ray` header). One subdomain — `staging.duvine.com` — *is* behind Cloudflare proxy and returns HTTP 200 from the public internet with no auth wall and no visible `noindex` enforcement. That's a low-risk discovery mention ("we noticed your staging is publicly reachable — common, easy to lock down") and the kind of thing a redesign engagement cleanly resolves.

**Martech footprint (full IDs).** From the homepage HTML and SPF record:

| System | Identifier / signal |
|---|---|
| Google Tag Manager | `GTM-WHMZ38W` |
| Universal Analytics | `UA-866383-1` — **legacy property; UA stopped processing in mid-2023**, suggesting a GA4 migration gap |
| Microsoft Bing UET | `ti=4074005` (paid search tracking) |
| HubSpot | Account `408217` (Forms v2 + tracking script) |
| Salesforce | Authorized SPF sender |
| SendGrid | Authorized SPF sender |
| Email | Microsoft 365 / Exchange Online |
| Atlassian | Site-verification TXT (`asv=...`) — suggests internal Jira/Confluence use |
| Social embeds | Instagram (via insta-gallery / QuadLayers), Vimeo, Facebook/Twitter/Pinterest share buttons |

The marketing → sales pipe is HubSpot (top-of-funnel) → Salesforce (deal pipeline) → SendGrid (transactional email, likely from Salesforce or Centaur). The legacy UA-866383-1 is the operational tell — their web team has a migration backlog. Small observation; suggests they're stretched, not lavishly resourced.

**Security posture is light.** No HSTS, no CSP, no X-Frame-Options on `www`. Not alarming for a marketing site but uncommon at the enterprise/luxury-brand level — another small "small team, doing-what-they-can" signal.

**One curiosity: WordPress 7.0.** The `<meta name="generator">` tag reports `WordPress 7.0`. Public WordPress is at 6.x as of 2026-06. Either a security-by-obscurity setting (some sites spoof the version to mislead automated vulnerability scanners) or a customized internal build. Worth knowing before the new AE is asked a "what version are you running?" question.

### What this layer changes for the deal

It doesn't change the strategic direction; it sharpens the live-demo ammunition. Specifically:

- **The 30-second "content trapped" demo moment is stronger.** Show no `tour` in `/wp-json/wp/v2/types`, then show one GROQ query returning every tour with every field. Then the punchline: "Their schema-registration plugin doesn't even attempt to register a REST namespace. There's no API at all."
- **The two-system reality is more concrete.** "Marketing on WordPress 2020s; booking on a Java J2EE app from the 2010s; nothing composes between them. Sanity is how the front-end becomes one experience."
- **The 30-minute multi-channel + AI mini-demo idea now has a clear opening.** Show structured tour content composing into a HubSpot email, a social merchandising surface, and a stub agent answering a tour question — all from one Sanity dataset. Their HubSpot account is `408217`; we have the IDs to make it concrete rather than hypothetical.

## What we still need to learn

The discovery gaps queue for the next live conversation, when one happens.

**Buying process and timeline.** What hard CMS decision deadline (if any) has Therefore communicated to Deena? Has it shifted past mid-May? Is there a multi-year deal structure that satisfies Deena's CAPEX preference, and would she meet on price in exchange? If Contentful's quote lands above ~$90k, does that reopen Deena's engagement directly?

**Competitive specifics.** What is Contentful's full all-in quote and when will DuVine receive it? Luke believes >$100k; confirm and use immediately. What specifically did Gwen's comparison spreadsheet score, and on which axes did Contentful pull ahead? Did the deeper Sanity-vs-Contentful comparison Deena requested on April 3 ever get sent? (Evan's brief implies no.)

**Technical.** What does the Salesforce/Kaptio integration actually require — bidirectional sync, read-only access, or content-only synchronization? Is Bynder being replaced by Sanity Media Library or staying? What channels beyond duvine.com are in scope for v1?

**Stakeholder.** What is Mia's role at DuVine? Is there an executive-to-executive opening — a Sanity exec engaging Deena's CEO, or a Lindblad Group counter-reference? Does Deena have direct AI-in-content-production ambition or is AI nice-to-have? Has this been asked verbatim?

**Commercial.** Reconcile the Media Library pricing conflict ($9.8k vs $45k). Has Deena's team confirmed asset storage needs against the 500GB E0 cap?

**Peer validation.** What is VBT Bike Tours' parent company, and do its sibling brands also run on Sanity?

**External signal.** Published philosophy, podcast, or talk content from Deena or Gwen — does any exist that would inform exec framing? `@podracer` could scan if useful.

## A couple of housekeeping notes

The Apr 3 outline is the verbatim transcript of "Sanity + Duvine, ~57 min" already summarized in Evan's brief. Treat it as transcript color, not a new independent source. Its value is the unfiltered language — Deena's exact framing of the Contentful question and her reactions to the ROI model.

The Gong company brief and Evan's deal review disagree on timeline. Gong was written earlier and targeted mid-May. Evan's June 16 brief shows the decision window has elapsed. Evan supersedes Gong on timing throughout this document.

The channel name is `#prospect-devine`. The company is **DuVine**. Worth correcting in the README if you agree.
