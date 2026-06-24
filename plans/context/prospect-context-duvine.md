# Prospect Context: DuVine Cycling + Adventure Co.

```yaml
version: 0.5-draft
generated_by: presailor
generated_at: 2026-06-17
sources:
  - /inputs/company overview (gong brief).md
  - /inputs/Duvine Deal Review (Evan brief).md
  - /inputs/Sanity + Duvine call, demo 2026-04-03 outline.md  # verbatim transcript of the Apr 3 ROI/proposal call summarized in Evan's brief
  - live site survey of duvine.com (2026-06-17, in /outputs/duvine-prospect-brief.md → Site analysis section)
  - /outputs/duvine-tech-brief.md (2026-06-23, @uxresearcher; deeper tech, martech, and infra teardown)
deal_stage_inferred: post-proposal, active competitive evaluation (S4)
audience: SE + AE (internal)
status: synthesis of supplied briefs; no live discovery conducted. Discovery gaps marked explicitly below.
changelog:
  - "0.1 (2026-06-17): initial synthesis from Gong brief + Evan deal review."
  - "0.2 (2026-06-17): folded in Apr 3 call outline. Added ROI hypotheses (4), customer stories already shared, Deena's verbatim Contentful ask. Flagged Media Library price conflict between Evan brief ($9.8k) and Apr 3 call ($45k). Added VBT parent-company gap."
  - "0.3 (2026-06-17): added live site analysis of duvine.com. Sitemap survey (443 URLs total, tracks Evan's brief within ~5%). Tech stack identified (WordPress 7.0 + Sherman theme + Yoast/W3TC/Autoptimize/Sagittarius, nginx, AWS CloudFront+S3 CDN, HubSpot Forms, Vimeo, GTM+UA). Booking system surfaced as Centaur TBMS at centaur.duvine.com, NOT Kaptio — open vendor question. Verified custom post types (tour/bike/location/tour_collection) are NOT exposed via WP REST API — observable proof of 'content trapped in web layer.' TTFB ~1.4s. Full analysis in /outputs/duvine-prospect-brief.md."
  - "0.4 (2026-06-23): Therefore primary contact changed from Luke Bowler to David Malinowicz (david@therefore.ca). Luke's prior contributions stand as historical record; he is no longer the day-to-day point of contact. Allan flagged a Contentful-vs-Sanity brief as forthcoming (owner/date TBD); reflected in 'What Sanity has already shown or sent' and the suggested-moves list."
  - "0.5 (2026-06-23): folded @uxresearcher's standalone tech brief (/outputs/duvine-tech-brief.md) — additive findings, not a re-baseline. New: AWS ALB us-west-2 specifically; Cloudflare DNS-only (not proxy) on www; publicly reachable staging.duvine.com behind Cloudflare; expanded WP plugin inventory via REST namespace enumeration (wp-offload-media confirms CDN pattern; wordfence indicates active WAF; redirection, akismet, duplicate-post, regenerate-thumbnails); REST API gap finding strengthened — sagittarius plugin registers no REST namespace at all, fully locking the tour/bike/region/tour_collection types inside WP page rendering; Centaur6 fingerprinted as a Java/Apache multi-tenant reservation platform with DuVine as tenant 'dvi'; martech IDs captured (GTM-WHMZ38W, HubSpot account 408217, UA-866383-1 legacy = GA4 migration gap, Bing UET 4074005); SPF lists Microsoft 365 + Salesforce + SendGrid + HubSpot as authorized senders; Atlassian TXT suggests internal Jira/Confluence; no HSTS / no CSP / no X-Frame-Options security posture. Carry-over from v0.4: 'Suggested near-term moves' section in /outputs/duvine-prospect-brief.md updated to reflect Luke→David handoff (was unfinished in v0.4)."
```

## Company

```yaml
company: "DuVine Cycling + Adventure Co."
industry: "Travel & Hospitality"
sub_vertical: "Luxury small-group cycling and adventure tours"
size:
  employees: "<40"
  revenue: "unknown (AOV ~$12,000; 86 active tours; assumed mid-7- to low-8-figure)"
  footprint: "Tours across Europe, North America, and beyond; primary customer base US/Canada/Mexico, 50+ affluent travelers"
ownership: "75% owned by Lindblad Expeditions + Natural Habitat Adventures (Lindblad Group family of brands)"
website: "duvine.com"
```

## Deal situation summary

```yaml
deal:
  type: "Net-new"
  stage: "S4 (post-proposal, active competitive evaluation)"
  ae: "Stephen Burd"
  se: "Nancy Du"
  rsd: "Evan Howe"
  ae_handoff: "in progress — Stephen replaced Rob Jenkins in Feb 2026; another AE handoff is being prepared per Evan's June 16 deal review"
  meeting_type: "n/a — between meetings; awaiting DuVine response to June 16 follow-up questions"
  close_target: "originally mid-May; has slipped; no current committed close date"
  quote_sent: "April 2026"
  quote_value: "~$101k/year all-in (Enterprise 0 @ 30% discount + Media Library add-on)"
  approval_required: "none (under $250k threshold)"
  package: "Enterprise 0, 30% discount, ~$45k/yr; Media Library add-on — pricing conflict between sources (see Notes): Evan brief lists ~$9,800/yr (1TB+1TB tier); Apr 3 call has Evan quoting $45k/yr for the full Media Library product"
  implementation_partner: "Therefore Interactive (~$300k, separate)"
```

**One-paragraph read.** DuVine is a sub-40-person luxury tour operator, majority-owned by Lindblad, with a fragmented WordPress + Salesforce/Kaptio + HubSpot + InDesign stack and a stated business goal of growing upsell attach rate (currently ~15%, ~$700/upsell, AOV ~$12k). Sanity has been in the deal since mid-2025, with a full proposal landed in April 2026 (~$101k all-in) and an ROI model presented to Deena on Apr 3 covering four hypotheses (paid-traffic conversion, upsell merchandising, lead nurturing, SEO/AEO) totaling well over $1M in modeled annual upside. Implementation partner Therefore Interactive has carried the deal through Luke Bowler as champion; as of 2026-06-23 the primary Therefore contact has handed off to **David Malinowicz** (`david@therefore.ca`), with Luke's day-to-day involvement reduced and his future role unclear. **On the Apr 3 call, Deena explicitly asked Sanity for a deeper Sanity-vs-Contentful side-by-side; that deliverable is now in progress per Allan (2026-06-23) — owner and ETA TBD.** In late May, Contentful entered the evaluation via Lindblad Group introductions (NatHab, a sister brand, uses Contentful) and DuVine now perceives feature parity between the two vendors. The decision-maker, Deena Giancotti, has been dark to Sanity for ~2 months — plausibly because the Contentful comparison she asked for has not yet landed. The deal is alive but contested; the next moves are responding to DuVine's June 16 questions and shipping the Contentful brief through David, not direct outreach to Deena.

## Known pain points

```yaml
pain_points:
  explicit:
    - "WordPress site is slow, developer-dependent, weak at structured content; editors blocked by dev"
    - "Content fragmented across WordPress (web), InDesign (collateral), Kaptio/Salesforce (ops), HubSpot (marketing); no single source of truth; reuse is manual"
    - "Deena is post-traumatic from Salesforce Commerce Cloud + Kaptio implementation — burned on large, complex projects; risk-averse on scope"
    - "Needs to manage Salesforce-adjacent content (tour itineraries, variants) without logging into Salesforce"
    - "DAM gap — Bynder status unclear; Kaptio's DAM quoted at $100k/yr alone and seen as insufficient"
    - "Small marketing team trying to produce content at scale across 86+ tours, multiple channels, seasonal campaigns"
  implied:
    - "Occupancy-based smart promotion: low-occupancy tours need contextual promotion; rules engine + content layer needed"
    - "AOV/upsell growth: increase 15% attach rate and ~$700 upsell value (the explicit business goal in the Gong brief)"
    - "SEO/GEO performance — flagged as priority in business case"
    - "AI capability never fully demoed by Sanity; latent appeal likely high"
business_goals:
  - "Better merchandise upsells within the booking funnel (Gong brief — primary stated goal)"
  - "Increase upsell attach rate above 15% and average upsell value above $700"
  - "Single source of truth across web, email, social, print"
  - "Reduce developer dependency for editorial workflow"
  - "DAM that actually meets asset management needs"
  - "Manageable project scope, given Deena's risk appetite post-Kaptio"
roi_hypotheses_modeled:  # presented by Evan to Deena on 2026-04-03; Deena reviewing with team
  - hypothesis: "Better conversion on existing paid traffic"
    inputs: "216k paid sessions/yr (~18k/mo, Luke estimate); 0.4% current conversion (industry-research proxy); $12k AOV"
    modeled_uplift: "10% conversion lift (conservative; Luke wanted higher)"
    modeled_outcome: "+86 bookings/yr; ~$1M incremental revenue/yr"
    deena_reaction: "speculative but a nice exercise"
  - hypothesis: "Better merchandising of upsells in the booking funnel"
    inputs: "~3,375 bookings/yr; 15% attach rate (best guess); $700 avg upsell (limited research)"
    modeled_uplift: "increase attach rate and upsell value"
    deena_reaction: "estimates not far off; will adjust the inputs"
    notes: "This is the Gong brief's stated primary business goal — well-validated and quantified here."
  - hypothesis: "Lead nurturing via personalized content"
    inputs: "11% baseline lead conversion"
    modeled_uplift: "to 11.5% via personalized content (e.g., France-tour content for France researchers)"
    modeled_outcome: "+118 bookings/yr"
  - hypothesis: "SEO/AEO improvement via structured, up-to-date content"
    inputs: "current organic traffic and conversion (not specified in transcript)"
    modeled_uplift: "uplift via better structured information"
    notes: "Framing only; specific numbers not walked through on Apr 3."
```

## Prospect requirements

```yaml
use_case_fit:
  marketing_website_content_ops: true   # primary — full duvine.com rebuild, 10 editors, 8,505 assets, multi-channel reuse stated goal
  content_hub:                   true   # explicit — "single source of truth" stated as ambition
  consolidation:                 true   # replacing WordPress + InDesign + Bynder (likely); HubSpot and Kaptio/Salesforce stay
  pim:                           true   # tour catalog functions as PIM (86 tours, 48 bikes, 153 people, 62 locations, 9 collections)
  portal:                        partial # Deena's stated ambition is portal-like — manage SF content without logging into SF
  ecommerce:                     implied # bookings via Kaptio/SFCC; Sanity could serve product/tour content into booking flow
  email_marketing_ops:           implied # HubSpot integration story directly addresses Deena's multi-channel concern
  line_of_business_app:          implied # smart tour promotion, occupancy logic
```

**Use case tiering.** Primary use case is **Marketing website (content ops)** — High tier. Editor team is small but mixed-literacy; content model is complex (multiple entity types: tours, bikes, locations, people, collections, blog, posts); omnichannel ambition is explicit; integration scope is heavy (Kaptio/Salesforce, HubSpot, InDesign workflows). PIM framing for the tour catalog is the most underleveraged secondary angle and maps directly to Deena's "manage Salesforce content from CMS" use case.

**Content scale (current WordPress site):** 63 pages · 86 tours · 9 tour collections · 48 bikes · 153 people · 156 blog posts · 32 post authors · 62 locations · 8,505 assets · 6 admins · 10 editors · 3 datasets (prod/stage/dev).

## Competitive context

```yaml
competition:
  incumbent: "WordPress (CMS, being replaced); InDesign (print collateral, staying); Bynder (DAM — status unclear, may be replaced); HubSpot (staying); Salesforce + Kaptio (ops, staying)"
  also_evaluating:
    - vendor: "Contentful"
      status: "Primary threat — entered May 21 via Lindblad/NatHab peer introduction; DuVine perceives feature parity; full quote pending"
      contentful_pitch:
        - "Unlimited API calls (vs. Sanity 1M/mo on E0)"
        - "10TB storage (vs. Sanity 50GB base + 1TB via Media Library add-on)"
        - "AI Actions + Personalization included"
        - "Sandbox provided for Therefore to prove the Salesforce integration"
        - "Baseline ~$40k/yr (full quote not yet delivered)"
        - "Salesforce acquisition narrative — DuVine reads this as alignment with their Kaptio investment"
      peer_validation: "NatHab (Lindblad sister brand) chose Contentful over Sanity in 2023 citing $20k/yr savings — comparison is flawed (NatHab is larger; 2023 pricing predates current quotes; different use case profile) but it landed via Ted Martens, a trusted advisor to Deena"
  formally_eliminated:
    - "Drupal — Deena retired this per Luke (Jun 8): too much customization required"
```

**Sanity counters to land.** Pulled from Evan's brief, restated for the new AE:

- **Salesforce acquisition is a roadmap risk, not a benefit.** Contentful's product direction will be subordinated to AgentForce; the MCP/AI interoperability story that makes Contentful currently look competitive is likely to get cannibalized post-close. Deena already doesn't fully trust Salesforce — deepening that dependency is the opposite of what she wants. (Luke has used this framing; needs reinforcement.)
- **NatHab precedent is materially flawed.** Larger company, 2023 pricing, different use case mix. DuVine qualifies for boutique Enterprise 0 pricing NatHab would not have qualified for. The new AE should address this proactively rather than hope it gets forgotten.
- **Total cost of ownership, not sticker price.** Luke believes Contentful's all-in (storage, AI Actions, Personalization, etc.) will exceed $100k. The $101k Sanity quote includes a real DAM; comparing to a $40k Contentful baseline is comparing apples to a partial quote.
- **Philosophy, not specs.** Luke himself supplied the framing (May 21 Slack): "There's increasing parity of features between headless CMSs because features are cheap. What sold us on Sanity was your decision making — what you prioritised and what you didn't." This is the line that should anchor the next conversation with Gwen.

## Stakeholders

```yaml
stakeholders:
  - name: "Deena Giancotti"
    title: "Decision maker / budget holder"
    company: "DuVine"
    role: "economic buyer"
    email: "deena@duvine.com"
    notes: |
      The ultimate signer. Has not responded to Evan in ~2 months (last contact ~early April 2026).
      Per Luke (Jun 8): aware of Evan's messages, waiting until Contentful evaluation settles.
      Coming off painful Salesforce Commerce Cloud + Kaptio implementation — risk-averse on project size and timeline.
      Prefers CAPEX over OPEX.
      Key stated use case: manage Salesforce-adjacent content from CMS without logging into Salesforce.
      Surname captured from Gong brief; not in Evan's brief.
    last_verified: "2026-06-17 (Gong brief)"
    influenceable_by: "Gwen Kidera (internal); David Malinowicz (current Therefore primary contact); Luke Bowler (historical agency channel); Ted Martens (NatHab peer)"

  - name: "Gwen Kidera"
    title: "Creative Director / Photographer"
    company: "DuVine"
    role: "technical evaluator / influencer"
    email: "gwen@duvine.com"
    notes: |
      Leading the day-to-day evaluation. Reached out to Contentful directly via Lindblad contacts.
      Authored a Sanity vs. Contentful comparison spreadsheet shared with Luke.
      Most accessible DuVine contact. The new AE should prioritize her over cold-starting Deena.
      Sanity has not yet directly engaged Gwen with feedback on her Sanity-vs-Contentful comparison;
      the forthcoming Contentful brief (per Allan 2026-06-23) is the natural vehicle.
    last_verified: "2026-06-17 (Evan brief)"

  - name: "Mia"
    title: "unknown"
    company: "DuVine"
    role: "unknown — attended March demos, no further signal"
    email: "mia@duvine.com"
    last_verified: "2026-06-17 (Evan brief)"

  - name: "David Malinowicz"
    title: "unknown — confirm"
    company: "Therefore Interactive"
    role: "primary contact (champion-of-record, as of 2026-06-23)"
    email: "david@therefore.ca"
    notes: |
      Now the primary Therefore point of contact, replacing Luke Bowler in that role.
      Previously: attended Jun 8 Granola sync; joined Deena meeting May 22.
      Per Allan 2026-06-23 — reason for handoff not yet specified.
      Title / seniority / direct relationship to Deena and Gwen not yet confirmed.
      Action: warm intro from Luke to the new AE; do not cold-restart on David.
    last_verified: "2026-06-23 (Allan, channel message)"

  - name: "Luke Bowler"
    title: "Head of Client Services & Growth"
    company: "Therefore Interactive"
    role: "former primary contact (handed off to David Malinowicz 2026-06-23); historical champion"
    email: "luke@therefore.ca"
    notes: |
      No longer the day-to-day Therefore contact as of 2026-06-23 (per Allan).
      Historical contributions stand: deal's de facto champion through the Apr 3-Jun 16 stretch;
      authored the 'philosophy not features' framing; relayed Gwen's comparison spreadsheet;
      direct line to Deena and Gwen; supplied the Contentful-evaluation intel.
      Status of his relationship with the deal post-handoff is unclear — confirm if still informally
      advising, or fully out. He has reached the limit of unpaid work (no agency-built POC).
      Also handled a separate Sanity opportunity (Intrepid Travel, contact Chris Fox at Sanity).
    last_verified: "2026-06-23 (handoff per Allan)"

  - name: "Pierre Marcel"
    title: "Technical/dev lead"
    company: "Therefore Interactive"
    role: "technical evaluator (agency-side)"
    email: "pierre@therefore.ca"
    last_verified: "2026-06-17 (Evan brief)"

  - name: "Alex De Winne"
    title: "unknown"
    company: "Therefore Interactive"
    role: "engaged in demos"
    last_verified: "2026-06-17 (Evan brief)"

  - name: "Ted Martens"
    title: "Contact at Natural Habitat Adventures"
    company: "NatHab (Lindblad sister brand)"
    role: "external influencer — Contentful advocate"
    linkedin: "tedmartens1"
    notes: |
      Trusted contact for Deena. NatHab chose Contentful over Sanity in 2023.
      Influencing Deena toward Contentful via peer validation.
      Not directly engaged in the deal but materially shaping perception.
    last_verified: "2026-06-17 (Evan brief)"

  - name: "Stephen Burd"
    title: "Account Executive"
    company: "Sanity"
    role: "current AE — in handoff to next AE"
    email: "stephen.burd@sanity.io"

  - name: "Nancy Du"
    title: "Solution Engineer"
    company: "Sanity"
    role: "SE — ran the demos; acknowledged AI gap"
    email: "nancy.du@sanity.io"

  - name: "Evan Howe"
    title: "Regional Sales Director"
    company: "Sanity"
    role: "RSD — author of ROI hypothesis; primary voice to Luke"
    email: "evan.howe@sanity.io"
```

**Coverage gaps.** Deena has not engaged Sanity directly in ~2 months. No executive-to-executive relationship established. No DuVine technical stakeholder has been deeply engaged (no trial, no sandbox access). Mia's role and influence are unknown.

## Key people context

Evan's brief contains no published philosophy or public statements from Deena Giancotti or Gwen Kidera. Worth a podcast/LinkedIn scan before exec outreach — `@podracer` could do this in a focused pass if Allan wants the executive-philosophy layer added. **Discovery gap, not blocker.**

## What Sanity has already shown or sent

Captured from the Apr 3 call outline so the new AE doesn't re-cover ground. None of this has *landed* the deal — but it has been delivered and is in DuVine's hands.

**Customer stories used in the Apr 3 conversation:**

- **Eurostar** — full booking digital experience on Sanity; localization, A/B testing, SEO across markets; 2–3 weeks to days for market-specific changes. Pitched as the high-end relevance proof.
- **Love Holidays** — Sanity AI to manage 50K hotel pages by consuming TripAdvisor, hotel sites, etc. and rebuilding in brand voice. **$300k/yr savings on translation agency costs.** Pitched as the AI proof point.
- **VBT Bike Tours** — Pitched as the closest peer (cycling tours). Evan couldn't recall the parent company name on the call ("starts with an I"). Deena asked about it; **gap left open.** Confirming the parent and whether siblings (Country Walkers, etc.) also use Sanity would close a peer-validation question Deena raised herself.
- **Marriott** — large-scale web presence on Sanity. Pitched as the scale proof.

**ROI calculator** — shared with Deena (yellow cells = her inputs, purple = uplift assumptions, green = outcomes). All four hypotheses above modeled in the sheet.

**Proposal deck (April 2026)** — Enterprise 0 @ 30% discount; ROI model; Media Library slides at the end.

**Onboarding/team structure walkthrough** — account manager, solution architect, 24/7 global support engineers, dedicated Slack/Teams channel, QBRs, monthly architecture check-ins. Deena heard it; did not press.

**Sanity vs. Contentful framing already used (Apr 3, Evan to Deena, verbatim summary):**

- Contentful is built around pages; content lives on a page; reuse is "bolted on afterward"
- Sanity treats content as data at the atomic level — Evan used DuVine's own *difficulty level* example: one source, propagates to site, newsletters, blog, mobile app, email confirmations
- Contentful pricing scales by content type → unexpected overages

This framing has been delivered once. It needs reinforcement, not first-time introduction. The next-level move is the deeper side-by-side Deena explicitly asked for.

**Deena's explicit ask on Apr 3 (verbatim, paraphrased from outline):**

> "DuVine is part of the Lindblad family of companies, which includes Lindblad Expeditions and Natural Habitat, both of which use Contentful. I was asked why DuVine uses Sanity and what the difference is between the two platforms, and whether we could get more favorable pricing through Contentful due to Lindblad's relationship with them. I will do what is right for DuVine, and am interested in understanding the difference between Sanity and Contentful."

She also said the high-level explanation was helpful but **"the real impact is hard to assess until they start using it. I would need a more in-depth comparison with Contentful."** That ask was made April 3. As of 2026-06-23, **the deeper Contentful-vs-Sanity brief is forthcoming** (per Allan; owner and ETA TBD). Once it ships, it closes a 2.5-month-old open commitment and is the natural re-engagement vehicle through David (now the primary Therefore contact) to Gwen and Deena.

## Sanity angle

DuVine is a small luxury operator about to do an expensive, scoped, multi-system content rebuild. The economic buyer has just survived one painful platform implementation and her appetite for risk is low. The technical evaluator is leaning on a peer-validated comparison (NatHab → Contentful) that is materially outdated. The agency partner is actively championing Sanity but won't build proof on their own dime. Contentful's pricing pitch is incomplete; their feature pitch is parity-flavored; their Salesforce acquisition story sounds strategic but locks the buyer deeper into a vendor she already distrusts.

The argument that actually fits DuVine — in their own language — is **shape the platform to your business, not the other way around.** That is Luke's articulation. It is the lesson Deena just learned the hard way with Kaptio. It is what the open content model + Functions + Agent ecosystem actually delivers. The pricing argument lands later, when Contentful's full quote arrives and the parity story collapses; trying to win on price first is the wrong fight.

The unrealized opportunity is **multi-channel + AI**. Deena's stated feedback (per the June 8 sync) was that both demos felt too web-focused. The Sanity story that would land — but hasn't been told — is: structured content feeding HubSpot email, social channels, the booking funnel, and agentic surfaces (e.g., a guest-facing AI assistant for tour information), all from a single model. AI Assist, Content Agent, Functions, and a small published-prompt example would close this gap with one focused 30-minute session, not another full demo.

**Tech-brief reinforcement (added v0.5).** UXR's deeper teardown (`/outputs/duvine-tech-brief.md`) hardens two angles:

1. **The "content trapped in WordPress" claim is now doubly evidenced.** The `sagittarius` plugin (which registers DuVine's `tour`, `bike`, `region`, `tour_collection` custom post types) does not register any REST API namespace at all. Active REST namespaces are `oembed`, `akismet`, `quadlayers/instagram`, `redirection`, `wordfence`, `yoast`, `duplicate-post`, `wp-offload-media`, `regenerate-thumbnails`, `wp/v2`, `wp-site-health`, `wp-block-editor`, `wp-abilities`. Their entire product catalog has no API surface. A live demo can `curl /wp-json/wp/v2/types`, show no `tour`, and contrast with one GROQ query against a Sanity dataset. 30 seconds, undeniable.
2. **DuVine's commerce/booking flow is architecturally separate from the marketing site.** Centaur6 is a Java/Apache multi-tenant reservation platform (DuVine is tenant `dvi`) running on a 2010s-era J2EE stack — distinct technology generation from the WordPress site. Every booking CTA on duvine.com hands off to Centaur via a portal launch. There is no integrated booking experience today. The Sanity opportunity is to make the marketing surface compositional — pulling tour content from Sanity, availability/pricing from Centaur (via API or scheduled sync), and rendering both in one cohesive front-end. This is the structural answer to "manage Salesforce-adjacent content from CMS without logging in," extended to Centaur.

## Sanity pillar alignment

| Pillar | Prospect alignment |
|--------|--------------------|
| **Model your business** | DuVine's tour catalog (tours, collections, bikes, locations, people, accommodations) is the canonical case for structured content over a CMS that "knows about pages." The Kaptio lesson Deena lived through — her business reshaping itself to fit the platform — is exactly the failure mode an open, code-defined schema avoids. The PIM framing for the tour catalog is the most underleveraged element of the pitch. |
| **Automate everything** | Three concrete tie-ins: (1) Functions powering occupancy-aware tour promotion logic — the rule engine Deena described in the business case; (2) Content Agent and AI Assist supporting a small editorial team producing variant content across 86 tours; (3) Document Functions syncing tour itinerary content with Salesforce/Kaptio in the direction Deena wants (CMS as interface, Salesforce as system of record). None of this has been shown. |
| **Power anything** | The multi-channel story Deena flagged as missing. Same structured content powering the duvine.com rebuild, HubSpot email, social merchandising, the booking-funnel upsell surfaces, and — over time — agentic experiences (concierge/itinerary assistants). This is also the answer to "feature parity" — Contentful does CMS; Sanity is the content layer that AI agents and any future channel can address. |

## Discovery gaps

```yaml
discovery_gaps:
  - category: "buying_process"
    question: "What hard CMS decision deadline (if any) has Therefore communicated to Deena? Has it shifted past mid-May?"
  - category: "buying_process"
    question: "Is there a multi-year deal structure that satisfies Deena's CAPEX preference — and would she meet on price in exchange?"
  - category: "competitive"
    question: "What is Contentful's full all-in quote, and when will DuVine receive it? Luke believes >$100k; confirm and use immediately."
  - category: "competitive"
    question: "What specifically did Gwen's Sanity-vs-Contentful spreadsheet score, and on which axes did Contentful pull ahead?"
  - category: "technical"
    question: "What does the Salesforce/Kaptio integration actually require — bidirectional sync, read-only access, or content-only synchronization? Does Nancy have a prior SF integration demo asset?"
  - category: "technical"
    question: "Is Bynder being replaced by Sanity Media Library, or is it staying? This affects the DAM value-prop and quote justification."
  - category: "technical"
    question: "What channels beyond duvine.com are in scope for v1? (HubSpot email, social, booking funnel surfaces, mobile?) This drives the multi-channel demo design."
  - category: "stakeholder"
    question: "What is Mia's role at DuVine? Surfacing this could uncover a second internal voice."
  - category: "stakeholder"
    question: "Is there an executive-to-executive opening — e.g., a Sanity exec engaging Deena's CEO or a Lindblad Group counter-reference?"
  - category: "stakeholder"
    question: "Does Deena have any direct AI-in-content-production ambition, or is AI seen as nice-to-have? Has this been asked verbatim?"
  - category: "timeline"
    question: "If Contentful's quote lands above ~$90k, does that reopen Deena's engagement directly with Sanity or just delay the decision further?"
  - category: "external_signal"
    question: "Published philosophy / podcast / talk content from Deena or Gwen — does any exist that would inform exec framing? (`@podracer` could scan.)"
  - category: "competitive"
    question: "What is VBT Bike Tours' parent company, and do its sibling brands (Country Walkers, etc.) also run on Sanity? Evan couldn't name the parent on the Apr 3 call when Deena asked; this is a still-open peer-validation question she raised herself."
  - category: "commercial"
    question: "Pricing conflict to resolve: Evan deal review (Jun 16) lists Media Library add-on at ~$9,800/yr (1TB+1TB tier); Apr 3 call transcript has Evan quoting Media Library at $45,000/yr. Likely two different ML SKUs (basic add-on vs. full Media Library product). Confirm which is in the live quote and which is the upsell."
  - category: "commercial"
    question: "Has Deena's team confirmed asset storage needs against the 500GB E0 cap? She said on Apr 3 she'd review with Gwen. Two months later, this is presumably resolved internally; Sanity has not seen the answer."
  - category: "stakeholder"
    question: "Why did Therefore's primary contact change from Luke Bowler to David Malinowicz on 2026-06-23? Was this a routine handoff, a workload change, a Therefore-side reorganization, or something else? Affects how to brief David and whether Luke remains in the loop."
  - category: "stakeholder"
    question: "What is David Malinowicz's title and tenure at Therefore? What is his direct relationship to Deena and Gwen at DuVine? Less captured in the briefs than Luke's. Needed before the next Therefore-mediated touchpoint."
  - category: "stakeholder"
    question: "What is Luke Bowler's residual involvement post-handoff? Still informally advising, still in the shared #agency-therefore-sanity Slack, or fully out? Materially affects whether his historical 'philosophy not features' framing can be cited in his own voice in customer-facing material."
  - category: "competitive"
    question: "Did the deeper Sanity-vs-Contentful side-by-side Deena requested on Apr 3 ever land with DuVine? Per Allan 2026-06-23 the brief is in progress — owner and ETA TBD. Once shipped, the open Apr 3 commitment is closed. Confirm delivery and Gwen/Deena reaction."
  - category: "technical"
    question: "What's the relationship between Centaur TBMS, Kaptio, and Salesforce in DuVine's current production stack? The live site links to centaur.duvine.com for customer booking; neither brief mentions Centaur. Possible: Kaptio is internal-facing and Centaur is customer-facing; or Kaptio has been retired and replaced by Centaur. Changes the Salesforce-integration discovery and the 'manage Salesforce content from CMS' use case."
  - category: "technical"
    question: "Is the `sagittarius` WordPress plugin (powers the tour custom post types) Therefore's own work, or third-party? Ownership matters because it's the natural data layer to migrate to Sanity."
  - category: "technical"
    question: "Is Bynder actively in use, or shelved? The live duvine.com site delivers assets directly from cdn.duvine.com (S3 + CloudFront) with no DAM signal visible."
  - category: "technical"
    question: "Are the GA4 / UA migration and the W3TC performance config part of the rebuild scope, or out of scope? TTFB ~1.4s on cached pages will constrain the ROI hypotheses on conversion and SEO."
  - category: "technical"
    question: "Is `staging.duvine.com` an intentional public staging environment, or an oversight? UXR confirmed it returns HTTP 200 behind Cloudflare with no auth wall and no visible `noindex`. Low-risk discovery mention; cleanly resolved by a redesign engagement."
  - category: "technical"
    question: "Why does `<meta name='generator'>` report `WordPress 7.0`? Public WordPress is at 6.x as of 2026-06. Likely a security-by-obscurity setting or a cache-plugin spoof, but worth confirming so the new AE isn't surprised."
  - category: "technical"
    question: "How active is the Wordfence WAF on duvine.com? UXR found `wordfence/v1` registered as a REST namespace, indicating the plugin is installed and the WAF is likely on. Affects any future scrape, audit, or technical-discovery probing — a heavy probing pattern could trip WAF rules. Cosmetic for the deal itself; operationally relevant for Sanity/Therefore technical work."
  - category: "technical"
    question: "Is the Atlassian site-verification TXT record (`asv=...`) on duvine.com pointing at internal Jira/Confluence usage at DuVine or Therefore? If DuVine has Atlassian internally, that's an integration surface worth knowing about (Jira issue references, Confluence content sync). Small but unverified."
```

## Risks and considerations from the SE perspective

| Risk | Severity | SE consideration |
|---|---|---|
| Deena is dark | High | Direct AE outreach to Deena reads as pressure. Route through Gwen with case-study substance (Morning Brew, Complex, Love Holidays multi-channel) cc'd to Deena and David Malinowicz (current Therefore primary contact). |
| Competitive momentum to Contentful | High | The "feature parity + Salesforce alignment + sandbox + cheaper baseline" stack is hard to unwind once the full quote arrives. The window to land the philosophical and TCO argument is now, before that quote. |
| AE handoff mid-deal | High | Don't restart discovery on the new AE's first interaction. Warm intro from Evan, shadow first, lead second. |
| "Too web-focused" demo gap | Medium-high | This is the most fixable risk. A scoped 30-minute multi-channel + AI session for Gwen (and Deena if she'll come) addresses Deena's explicit feedback and closes the AI-never-demoed gap. Not another full demo. |
| No internal champion at DuVine | Medium | Luke was the champion through the Apr-Jun stretch but is no longer the primary Therefore contact (as of 2026-06-23). David Malinowicz is the new agency point. Gwen is still the closest internal-DuVine candidate. Investing in Gwen as champion-by-substance is the highest-leverage stakeholder move; warm handoff from Luke to David at the agency-side level is the other. |
| Deal size vs. investment ceiling | Medium | Evan flagged this on Jun 8 — a custom POC is off the table. Creative moves only: existing Salesforce demo assets, case studies, published prompts, a focused mini-demo. |
| NatHab precedent unaddressed | Medium | The 2023 NatHab/Contentful comparison is doing damage in the background. Address proactively with Gwen and Deena: outdated pricing, larger company, different use case. |
| Salesforce acquisition narrative | Medium | DuVine reads this as alignment. Counter-narrative (roadmap freeze, AgentForce capture, ecosystem lock-in, Deena's existing SF distrust) needs to land in the next conversation, not later. |

## Recommended near-term moves (informing, not directing)

The SE/AE team is best positioned to make the actual calls. The following are observations from the briefs, framed as candidate moves the SE may choose to direct:

1. **Ship the forthcoming Contentful-vs-Sanity brief through David Malinowicz to Gwen, cc Deena.** Closes the open Apr 3 commitment that has plausibly kept Deena dark. Allan flagged the brief as in progress 2026-06-23; owner and ETA to confirm. Use Luke's "philosophy not features" framing as the spine — that line stands regardless of his current role.
2. **Respond to DuVine's June 16 follow-up questions through David.** Don't let competitive momentum stall on a Sanity answer-delay. Confirm with David what was still outstanding at handoff.
3. **Send David the full proposal breakdown Luke requested June 10**, if it didn't land before the handoff. Confirm what Therefore already has on its side vs. what's still pending on Sanity's.
4. **Reach Gwen directly, cc Deena + David, with the Morning Brew / Complex / Love Holidays multi-channel case studies.** A natural, non-pressuring re-engagement vehicle for Deena. The Contentful brief is the second wave in the same conversation.
5. **Review Gwen's Sanity-vs-Contentful spreadsheet and supply corrected Sanity column entries through David.** Gwen's framing is the proxy for Deena's evaluation criteria; getting the Sanity column right is high-leverage. Confirm David has the spreadsheet or retrieve it from Luke.
6. **Ask Nancy if she has a prior Salesforce integration demo asset.** If yes, that closes the largest demo gap with near-zero new build cost.
7. **Plan a focused multi-channel + AI mini-demo** (30 minutes, Gwen-first audience) addressing Deena's specific feedback. AI Assist + Content Agent + a Function example (HubSpot or smart-promotion) + one shareable prompt. This is the most leveraged remaining demo move.
8. **Land the "philosophy not features" framing** with Gwen in writing, using Luke's own words from his May 21 Slack message. This is the line that beats "feature parity." Luke's quote stands as record even though he's no longer the day-to-day Therefore contact.
9. **Confirm the Luke-to-David handoff context with Allan or Evan.** Reason for handoff, David's title/seniority, his prior relationship with Deena and Gwen, and Luke's residual involvement (still informally advising? fully out?). Materially affects how to brief David.

## Notes

- **Source conflict on timeline.** The Gong brief (earlier) says decision target "mid-May, following a four-week discovery phase." Evan's June 16 brief says Therefore kicked off May 5 with a 4-week decision window (~June 5) that has elapsed. Evan supersedes Gong on the timeline; the deal is past its originally-targeted decision date and now in extended competitive evaluation.
- **Surname source.** Gong brief gives "Deena Giancotti"; Evan's brief had only "Deena, no surname known." Captured as Giancotti above.
- **Channel name typo.** The channel is `#prospect-devine` and the README references "Devine." The company is **DuVine**. Worth correcting if Allan agrees — flagging as a separate question, not editing unilaterally.
- **Multiple Lindblad-family touchpoints.** DuVine is 75% Lindblad/NatHab. NatHab is on Contentful. Lindblad-the-parent's Contentful AE made the introduction to DuVine. Worth confirming whether Lindblad-the-parent itself is on Contentful at scale — that's the larger competitive flank.
- **No live discovery has been run.** Everything above is synthesis from supplied briefs. The discovery gaps section is the queue for the next live conversation, when one happens.
- **Media Library price conflict between sources.** Evan brief (Jun 16) lists Media Library add-on at ~$9,800/yr (1TB bandwidth + 1TB storage). Apr 3 call has Evan telling Deena $45k/yr for "the upgraded version of the Media Library shown in the demo." These are likely two different SKUs — the basic add-on tier vs. the full Media Library product. The all-in figure ($101k) reconciles to the $45k Media Library quote, not the $9.8k. Worth confirming with Nancy/Evan which is actually on the current quote sheet before any pricing conversation.
- **The Apr 3 outline is one of the six Gong calls** summarized in Evan's deal review ("Sanity + Duvine," ~57 min). Treat it as the verbatim transcript of an already-known call, not a new independent source. Its value is the unfiltered language — Deena's exact framing of the Contentful question, her reactions to the ROI model, and the specific customer stories already used.
- **The deeper Contentful comparison Deena asked for on Apr 3 is now in progress** (per Allan 2026-06-23; owner and ETA TBD). Until 2026-06-22 this was an open ~2.5-month-old commitment cited as plausibly the reason Deena went dark. The brief landing closes that loop. Re-engagement through David (now primary Therefore contact) with the brief as substance is the highest-leverage move once it ships.
