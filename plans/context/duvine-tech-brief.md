# DuVine Cycling + Adventure Co. — Technical Site Brief

**Researcher:** @uxresearcher
**Date:** 2026-06-23
**Source URL:** https://www.duvine.com/
**Methodology:** sitemap parsing, header inspection, DNS enumeration, HTML/asset signature analysis, TXT-record + ELB-CNAME inference. No paid intel tools (BuiltWith/Wappalyzer not consulted; signals below are direct).

---

## TL;DR

DuVine runs a **single WordPress 7.0 marketing site** at `www.duvine.com` with a heavy plugin + custom theme stack, fronted by **AWS (ALB in us-west-2)** with **CloudFront** for assets and **Cloudflare DNS**. The marketing site does **not** handle bookings or payments — those are off-loaded to a separate **proprietary "Centaur6" reservation system on `centaur.duvine.com`** (a Java/Apache app, branded to look like DuVine but architecturally a different world). Email runs on **Microsoft 365**, with major outbound martech footprint (**Salesforce + HubSpot + SendGrid** all authorized in SPF). A **publicly reachable `staging.duvine.com` mirror** exists behind Cloudflare — worth flagging.

**Page count (sitemap-confirmed):** **443 URLs** across 7 sub-sitemaps.

---

## 1. Page Inventory (from sitemap_index.xml)

`robots.txt` advertises only `https://www.duvine.com/sitemap_index.xml` (Yoast SEO). Counts:

| Sitemap | URLs | What it is |
|---|---:|---|
| `tour-sitemap.xml` | **84** | The product. Custom WP post type `tour` (e.g. `/tour/super-tuscany-bike-tour/`) |
| `post-sitemap.xml` | **167** | Blog posts (Bike / Eat-Drink / Sleep / Profiles / Notes-from-the-road etc.) |
| `location-sitemap.xml` | **62** | Custom `region` taxonomy → `/region/europe/italy/tuscany/`. Used for hierarchical navigation. |
| `bike-sitemap.xml` | **58** | Custom post type `bike` — individual bike spec pages (`/bike/supersix-evo-sram-red/`). Notable — they model fleet as content. |
| `page-sitemap.xml` | **57** | Standard editorial pages (Why DuVine, Trip Essentials, Careers, Private Tours, etc.) |
| `tour_collection-sitemap.xml` | **7** | Curated marketing collections: Classic / Specialty / Family / Challenge / Adventure / Cycle+Sail / Villas |
| `category-sitemap.xml` | **8** | Blog taxonomy archives |
| **TOTAL** | **443** | |

**Information-architecture observations:**
- Five custom post types or taxonomies: `tour`, `bike`, `region`, `tour_collection` (CPT), plus standard pages/posts/categories. That's **content modeling done right inside WordPress** — they aren't just stuffing everything into pages.
- Region taxonomy is **multi-level hierarchical** (Continent → Country → Region). Yoast does emit it as flat URLs, but the tour archive code (and homepage menus) clearly treat it as a tree.
- `bike` as a CPT suggests editors maintain a reusable fleet catalog and reference bikes from tours, rather than re-typing specs per tour.
- Last-modified timestamps show **active editorial cadence**: tour-sitemap modified today (`2026-06-23`), post-sitemap last week (`2026-06-12`), pages a week before that.

---

## 2. Primary Stack — `www.duvine.com`

**Server / Hosting**
- `server: nginx/1.18.0 (Ubuntu)` on origin
- `www.duvine.com` CNAMEs to `duvineprodalb-222395198.us-west-2.elb.amazonaws.com` → **AWS Application Load Balancer in us-west-2 (Oregon)**
- Root `duvine.com` resolves to two AWS IPs: `54.214.185.55`, `44.254.29.19`
- **DNS:** Cloudflare (`corey.ns.cloudflare.com`, `magdalena.ns.cloudflare.com`) — but the marketing site is **not** behind Cloudflare proxy (no `cf-ray` header on www). DNS-only.
- Performance layer: **W3 Total Cache** (footer comment: `Performance optimized by W3 Total Cache… Served from: duvine.com @ … by W3 Total Cache`) and **Autoptimize** (CSS bundled at `/wp-content/cache/autoptimize/css/…`).

**CMS**
- **WordPress** (`<meta name="generator" content="WordPress 7.0">`) — note: WP 7.0 is an unusual version number; either an internal/cache plugin spoof or a customized build. (Public WordPress is at 6.x as of 2026-06.)
- **Theme:** custom theme `sherman` (`/wp-content/themes/sherman/`). All UI is custom; not a marketplace theme. Compiled JS bundle at `themes/sherman/js/build/production.min.js`.
- Yoast SEO (sitemap stylesheet `/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl`) and Yoast schema-graph JSON-LD on every page.
- `xmlrpc.php` still enabled (`pingback` link in `<head>`).

**WP REST API — content is NOT headless-accessible** *(verified 2026-06-23; corrects an earlier draft of this brief)*
- `/wp-json/` is live, but the custom post types that power the actual product catalog — `tour`, `bike`, `region`, `tour_collection` — are **not exposed** to REST. They were registered without `show_in_rest: true`.
- `/wp-json/wp/v2/types` returns only WordPress built-ins (`post`, `page`, `attachment`, `nav_menu_item`, `wp_block`, `wp_template`, `wp_template_part`, `wp_global_styles`, `wp_navigation`, `wp_font_family`, `wp_font_face`) plus one slider block type (`superblockslider`). **No `tour`, `bike`, `region`, or `tour_collection`.**
- Direct probes confirm: `/wp-json/wp/v2/tour`, `/bike`, `/region`, `/tour_collection` (and plural variants) all return **HTTP 404**.
- The 84 tour pages, 58 bike spec pages, 62 region pages, and 7 tour-collection pages are **only reachable as server-rendered HTML**. There is no headless surface for them today.
- Active REST namespaces (from `/wp-json/`): `oembed/1.0`, `akismet/v1`, `quadlayers/instagram`, `redirection/v1`, `wordfence/v1`, `yoast/v1`, `duplicate-post/v1`, `wp-offload-media/v1`, `regenerate-thumbnails/v1`, `wp/v2`, `wp-site-health/v1`, `wp-block-editor/v1`, `wp-abilities/v1`. The in-house `sagittarius` plugin (which presumably registers the CPTs) **does not register a REST namespace** — its data is fully locked inside WP page rendering.

**Identified WordPress plugins** (from HTML + REST namespaces — REST namespaces are a stronger signal)
- `wordpress-seo` (Yoast SEO) — sitemaps + schema graph + `yoast/v1` REST namespace
- `autoptimize` (asset minification)
- `w3-total-cache` (page cache)
- **`wp-offload-media`** — explains why uploads rewrite to `cdn.duvine.com` → CloudFront/S3 (confirmed by `wp-offload-media/v1` REST namespace)
- **`wordfence`** (security/WAF) — `wordfence/v1` REST namespace
- **`redirection`** (URL redirect management) — `redirection/v1` REST namespace
- `akismet` (comment spam) — `akismet/v1` REST namespace
- `duplicate-post` (editor convenience) — `duplicate-post/v1` REST namespace
- `regenerate-thumbnails` (image utility) — `regenerate-thumbnails/v1` REST namespace
- `insta-gallery` / QuadLayers Instagram feed (homepage carousel) — `quadlayers/instagram` REST namespace
- `sagittarius` — in-house plugin (not in the public directory): `/wp-content/plugins/sagittarius/public/js/sagittarius-public.js`. **Almost certainly the source of the custom `tour`/`bike`/`region`/`tour_collection` post types**, registered without REST exposure.

**Front-end libraries (loaded on homepage)**
- jQuery 3.7.1 + jQuery Migrate 3.4.1 (still bundled)
- React 18.3.1 — bundled by WordPress core (`/wp-includes/js/dist/vendor/react.min.js`) — likely used only by Gutenberg blocks, not in the public theme
- Moment.js + daterangepicker (the tour-finder date picker)
- Swiper 5.0.7 (the Instagram carousel)
- Vimeo player (background video)
- Hoefler & Co. cloud fonts (`cloud.typography.com/7389396/6378572`) — premium licensed typography
- Lazyload pattern: inline SVG placeholder + `data-src` swap (custom, no library tag)

**Assets / CDN**
- `cdn.duvine.com` → **Amazon CloudFront** (`x-amz-cf-pop: JFK52-P2`, `via: 1.1 …cloudfront.net`) backed by **S3 in us-west-2** (`x-amz-bucket-region: us-west-2`)
- 100% of imagery (`/wp-content/uploads/…`) is rewritten to `cdn.duvine.com` — so they're using a CDN-offload pattern on top of WordPress.

---

## 3. Subdomains & Related Properties

DNS-confirmed:

| Host | Resolves to | Role |
|---|---|---|
| `www.duvine.com` | AWS ALB (us-west-2) | Marketing site (WordPress, primary) |
| `centaur.duvine.com` | `50.16.245.71` (AWS us-east-1) | **Proprietary reservation/payment system** ("Centaur6") |
| `cdn.duvine.com` | CloudFront → S3 (us-west-2) | Static media CDN |
| `staging.duvine.com` | Cloudflare-proxied (`104.26.11.201`) | **Publicly reachable staging WordPress** — HTTP 200, returns the live homepage content |
| `mail.duvine.com` | CNAME → `remote.duvine.com` | Internal mail/remote-access alias |
| `duvine-com.mail.protection.outlook.com` (MX) | Microsoft 365 | Inbound email |

> ⚠️ **Notable:** `staging.duvine.com` returns 200 from the public internet behind Cloudflare. No auth wall, no `noindex` enforcement visible from HEAD. Worth a discovery-call mention as a low-risk observation ("we noticed your staging is reachable — common, but easy to lock down").

> **Note on cert transparency:** the crt.sh API returned 502 during my run, so I could not exhaustively enumerate cert SANs. Subdomain list above is from active DNS probes only.

---

## 4. The "Other System" — Centaur6 Reservation Platform

The site Allan flagged as "another system" is at **`centaur.duvine.com`**, linked from the main nav (`Trip Essentials → Pay Now`) and labeled "Pay Now" in the footer.

**Identity**
- Branding: **"Duvine Adventures"** in `<title>` of internal pages; serves DuVine-branded UX with full DuVine logo, photography, and award placements.
- URL pattern: `/centaur6/TravelerLoginPage/ClientLoginPage?company=dvi` — the `centaur6` segment and `company=dvi` parameter strongly suggest this is a **multi-tenant Java application named "Centaur"** (version 6) where DuVine is tenant `dvi`. Asset paths like `/centaur6/common/javascript/online/onlinepackagetourreservation.js` and `/centaur6/online/OPS_OPSLogin` reinforce this — "OPS" likely = Online Payment Service.
- Server: **Apache**. URL pattern `;jsessionid=…` in form actions = **Java servlet container** (Tomcat or similar). This is a classic late-2000s/2010s J2EE reservation platform.

**Stack signals**
- jQuery **3.2.1** (vs. 3.7.1 on www) + jQuery UI 1.12.1 + jQuery Migrate 1.0.0 — older library set than the WP site
- HubSpot Forms v2 loader (`js.hsforms.net/forms/v2.js`) — same lead-capture target as WP site
- Tealium-like tag (`//52459.tctm.co/t.js`) loaded async — likely an analytics/CDP tag manager beyond GTM
- No GTM; GA presence not confirmed on the centaur side

**What it does**
- Traveler login / client login → online payment portal
- Likely also drives the booking/reservation backoffice for staff (the WP site has **no booking flow** — every CTA is "Book Now → contact form" or "Brochure Request → HubSpot form")

**Implication:** DuVine's commerce/reservation logic is in a vendor or in-house Java system separate from WordPress. The marketing site is a **lead-capture and brochureware layer** that hands off to Centaur6 + HubSpot for everything transactional. **There is no integrated booking engine.**

---

## 5. Marketing / Tracking Stack

From homepage HTML and SPF records (`v=spf1 ip4:173.13.96.125 include:spf.protection.outlook.com include:_spf.salesforce.com include:sendgrid.net include:408217.spf06.hubspotemail.net ~all`):

| Category | Tools |
|---|---|
| Tag management | **Google Tag Manager** (`GTM-WHMZ38W`) |
| Analytics | **Google Analytics (UA-866383-1)** — note: UA properties stopped processing in mid-2023, so this is either a stub or they haven't migrated to GA4; needs confirmation |
| Paid search | **Microsoft Bing UET** (`ti=4074005`) |
| Forms / Marketing automation | **HubSpot Forms** (account `408217`) + **HubSpot tracking script** (`hs-scripts.com/408217.js`) |
| CRM | **Salesforce** (authorized in SPF — sending domain) |
| Transactional email | **SendGrid** (authorized in SPF) |
| Email infrastructure | **Microsoft 365 / Exchange Online** |
| Social embeds | Instagram (`insta-gallery` plugin), Vimeo (background video), Facebook/Twitter/Pinterest share buttons |
| Domain verification TXTs | Microsoft (`MS=ms38677836`), Atlassian (`asv=…`), two Google site-verifications |

**Read:** This is a **Marketing-heavy, Sales-led** stack. They run HubSpot for top-of-funnel and Salesforce for the actual deal pipeline. SendGrid implies a custom outbound (likely Centaur transactional or a Salesforce sender). The Atlassian TXT (`asv=…`) suggests internal use of Jira/Confluence.

---

## 6. Performance / Operational Observations

- **No HSTS, no CSP, no X-Frame-Options** in response headers on www — light security posture
- **CloudFront errors gracefully** (`x-cache: Error from cloudfront`) when hitting `cdn.duvine.com/` root (403 from S3 — correct, no directory index)
- **W3 Total Cache** is generating full-page HTML cache server-side; this is the legacy approach (vs. headless + edge). Cache HIT badge at the bottom of every page.
- **Asset bundle freshness:** main theme JS at `production.min.js?ver=7.0` aligns with the (custom) `WordPress 7.0` generator string — they bump the asset version with the theme/CMS bump.
- **Image strategy:** lazyload everywhere (every `<img>` is a tiny inline SVG with `data-src=` to the real CloudFront URL). No `<picture>` srcset, no AVIF — JPG only. Big upside for an SE conversation about modern image pipelines.
- Tour pages have a "Private only" flag concept (seen in HTML), suggesting **structured tour metadata** beyond what's visible.

---

## 7. SE / Discovery Hooks (for @presailor)

These are observations that map cleanly to a Sanity conversation. **Do not lead with "your stack is old"** — DuVine has done thoughtful content modeling within WordPress (custom post types for tours, bikes, regions, collections) and that's a strength to acknowledge.

1. **Content modeling exists, but it's trapped in WordPress.** `sagittarius` (their in-house plugin) registers real custom post types — `tour`, `bike`, `region`, `tour_collection` — with structured relationships. That's good content thinking. **But** these CPTs are **not exposed to the WP REST API** (`/wp-json/wp/v2/tour` → 404; verified). The 84 tours, 58 bikes, and 62 regions can only be rendered through WP's PHP page templates. No headless access exists today. They've built schema but can't reuse it anywhere else — no mobile app, no partner feed, no AI agent, no second front-end. Sanity gives them schema-as-code with **GROQ + GraphQL + CDN-backed content API on every type by default**.
2. **Two-system reality (WP + Centaur6)** — the marketing site doesn't own the truth about a tour (availability, dates, pricing) — that lives in Centaur. **Sanity's API-first model + GROQ is the natural way to compose marketing content with live booking data**, rather than the current "user clicks Pay Now and is launched into a 2010s portal" pattern.
3. **CDN-offload pattern proves they value performance** — they already split assets to CloudFront. Pair this with: "What would the site look like if the HTML was edge-rendered too, not page-cached server-side?" (the W3 Total Cache angle.)
4. **Lazyload-with-SVG-placeholder is bespoke** — they wrote their own image performance approach because WP didn't ship one. Sanity Asset Pipeline + hotspot/crop + automatic format negotiation (AVIF/WebP) is a meaningful upgrade.
5. **Custom in-house plugin (`sagittarius`)** — they're already paying engineering for WP customization. That cost moves with them; better to invest it in a more flexible platform.
6. **HubSpot + Salesforce + SendGrid + GTM** — strong commercial infrastructure. The marketing site is a means to feed this funnel. Sanity's Visual Editing / Presentation tool would let marketers iterate on landing pages without dev cycles, which is exactly what a 443-page Yoast-driven SEO site needs.
7. **UA-866383-1 (legacy Universal Analytics) is still in the HTML** — likely a GA4 migration gap. Small observation but suggests their web team is stretched.
8. **Publicly reachable `staging.duvine.com`** — gentle mention as something a redesign engagement would cleanly resolve.

---

## 8. What I Did NOT Do (gaps for follow-up)

- Did **not** run BuiltWith / Wappalyzer / SimilarTech — observations above are direct from HTML & DNS only
- Did **not** authenticate against `centaur.duvine.com` (would require credentials) — internal screens are unknown
- Did **not** crawl all 443 URLs — sampled tour, post, page, and bike URLs only
- crt.sh API returned 502 — full cert-transparency subdomain enumeration is incomplete; only DNS-active subdomains are confirmed
- No Lighthouse / Core Web Vitals run — recommend doing one against `tour/super-tuscany-bike-tour/` as a flagship comparison point

---

## Quick reference — key URLs

- Live site: https://www.duvine.com/
- Sitemap index: https://www.duvine.com/sitemap_index.xml
- WP REST API: https://www.duvine.com/wp-json/wp/v2/types
- Booking/payment portal: https://centaur.duvine.com/centaur6/TravelerLoginPage/ClientLoginPage?company=dvi
- Asset CDN: https://cdn.duvine.com/
- Staging mirror: https://staging.duvine.com/
