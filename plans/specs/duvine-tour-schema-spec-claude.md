# DuVine Tour — Content Model Spec (demo)

Source page: `https://www.duvine.com/tour/colnago-tuscany-bike-tour/`
Modeling stance: **reference-forward** — break out anything with independent identity or cross-tour reuse into its own document, keep the rest as embedded objects on `tour`.

## Build recommendation, 2026-06-24

Use this as a reference model, not the build source of truth.

This version is elegant as a production content model, but it is too broad for the quick demo build. It adds more document types, more seed data, more Studio structure, and more front-end query work than the current demo needs. The priority is an intuitive Studio that Gwen and Mia can understand quickly, plus a schema an SE can build and verify fast.

Keep the existing handoff schema as the base: `tour`, `bike`, `departureSchedule`, `itineraryDay`, `highlightBlock`, and `detailSection`.

Borrow these ideas only if time allows:

- Add a `gallery` field on `tour` if the page needs more visual depth.
- Derive the displayed starting price from `departureSchedule.departures` instead of hand-entering `priceFrom`.
- Store distance and elevation once, then derive alternate units in the front end.
- Consider a lightweight bike relationship object only if the tour needs bike-specific notes.

Do not add these for the first build:

- `destination`, `level`, `collection`, or `accommodation` document types.
- Standalone editable `departure` documents.
- Weather inheritance, breadcrumb walking, or collection/level landing-page logic.

Reason: those are good production ideas, but they make the Studio less obvious and slow the build. For the demo, a smaller model with strong field language and four working business-logic moments is better than a more complete travel-business graph.

---

## The shape at a glance

| Block on the page | Modeled as | Why |
|---|---|---|
| Tour Highlights / Eat / Drink / Gallery | **Objects/fields on `tour`** | Never managed alone, never reused elsewhere |
| Itinerary | **Array of `itineraryDay` objects on `tour`** | A day only exists inside its tour; what it *points at* is referenced |
| Dates + Availability (departures) | **`departure` document** (recommendation) | Inventory you'll want to query, status, and price across tours |
| Weather-by-month | **Object on `destination`** | Identical for every Tuscany tour — belongs to the place, not the tour |
| Inclusions + Details | **`inclusionGroup` objects on `tour`** | You chose inline; shared-library path noted as an option |
| Bikes | **Reference to `bike` document** (with relationship metadata) | Has its own page, manufacturer, type; reused across tours |

**Documents:** `tour`, `departure`, `destination`, `accommodation`, `bike`, `level`, `collection`
**Reusable taxonomy** (`level`, `collection`, `destination`) is modeled as documents rather than enums because the demo's whole point is reuse — and your Levels/Collections pages already render from descriptions that want a home.

### Reference graph

```
departure ───▶ tour
tour ─────▶ region (destination, kind=region)
tour ─────▶ level
tour ─────▶ collection[]
tour ─────▶ relatedTours[] (tour)
tour.bikes[] ─────▶ bike
tour.itinerary[].destinations[] ─────▶ destination (kind=locality)
tour.itinerary[].accommodation ─────▶ accommodation
accommodation ─────▶ destination
destination.parent ─────▶ destination   (Europe ▸ Italy ▸ Tuscany ▸ Panzano)
```

---

## Annotation convention

```
fieldName:
  type: <sanity type>
  required: true|false
  description: what the field is
  validation: rule worth enforcing      # optional
  logic: derived/initial-value / business behavior   # optional
```

---

## Document: `tour`

```yaml
tour:
  __type: document
  __description: A scheduled bike-tour product. The page you're modeling.
  fields:
    title:
      type: string
      required: true
      description: Tour name, e.g. "Colnago Tuscany Bike Tour".
      validation: max 90 chars
    slug:
      type: slug
      required: true
      description: URL segment under /tour/.
      logic: source=title; enforce uniqueness
    tagline:
      type: string
      description: One-line positioning under the title, e.g. "Legends + Luxury: A Colnago World Immersive in Italian Cycling".
    region:
      type: reference
      to: [destination]
      required: true
      description: The headline place for the tour (drives breadcrumb + inherited weather).
      validation: referenced destination should be kind=region
      logic: breadcrumb (Europe ▸ Italy ▸ Tuscany) is walked via destination.parent; no need to store the trail on the tour
    collections:
      type: array
      of: [reference -> collection]
      description: Marketing collections, e.g. Classic, Specialty.
      validation: min 1
    level:
      type: reference
      to: [level]
      required: true
      description: Difficulty 1–4; references the Level doc so the description/icon is reused.
    durationDays:
      type: number
      required: true
      description: Number of days, e.g. 6.
      validation: integer, min 1
    durationNights:
      type: number
      description: Number of nights, e.g. 5.
      logic: defaults to durationDays - 1; keep editable for edge cases
    priceFrom:
      type: number
      description: "From" price shown in the header, e.g. 9295.
      logic: RECOMMENDED derived = min(price) of open, future departures via GROQ rather than hand-keyed; add priceFromOverride only if marketing needs to force a number
    currency:
      type: string
      description: ISO currency.
      logic: default "USD"
    heroImage:
      type: image
      required: true
      description: Header image.
      logic: include alt text field (accessibility + AEO)
    gallery:
      type: array
      of: [image]
      description: The mid-page image gallery.
      logic: per-image alt + credit (photos here are credited "Paolo Penni Martelli for Colnago")
    highlights:
      type: array
      of: [highlight]
      description: The "Tour Highlights" bullets.
    culinary:
      type: culinary
      description: The Eat / Drink blocks.
    itinerary:
      type: array
      of: [itineraryDay]
      required: true
      description: Day-by-day plan.
    logistics:
      type: logistics
      description: Arrival + departure details block.
    travelersNotes:
      type: array
      of: [block]
      description: "Travelers Take Note" callouts (purchase eligibility, gravel warning, etc.).
    inclusions:
      type: array
      of: [inclusionGroup]
      description: The grouped "Inclusions + Details" lists.
    notIncluded:
      type: array
      of: [string]
      description: The "Not Included" list (Airfare, guide gratuities, Travel Protection).
    bikes:
      type: array
      of: [bikeOnTour]
      description: Bikes offered on this tour, with per-tour metadata.
      validation: min 1
    relatedTours:
      type: array
      of: [reference -> tour]
      description: Cross-sell tours at the bottom of the page.
      validation: cannot reference self
    seo:
      type: seo
      description: Meta title/description/OG image overrides.
```

---

## Document: `departure`  *(recommended over an inline array)*

**Why its own document:** the demo is about structured reuse, and departures are exactly where that pays off. As documents you can run "all open departures in October across every tour," derive `tour.priceFrom`, drive Book Now / Waitlist / Sold Out from a single `status` field, and (later) sync inventory from Centaur without touching the tour body. An inline array buries all of that inside one document and can't be queried across tours.

```yaml
departure:
  __type: document
  __description: A single bookable date instance of a tour.
  fields:
    tour:
      type: reference
      to: [tour]
      required: true
      description: The parent tour.
    startDate:
      type: date
      required: true
      description: First day, e.g. 2026-10-18.
    endDate:
      type: date
      required: true
      description: Last day, e.g. 2026-10-23.
      validation: must be after startDate
    price:
      type: number
      required: true
      description: Per-person price for this departure.
    singleSupplement:
      type: number
      description: Solo-traveler room supplement, e.g. 4500.
    currency:
      type: string
      logic: default "USD"
    status:
      type: string
      required: true
      description: Booking state.
      validation: one of [open, waitlist, soldOut, cancelled, completed]
      logic: default "open"; if spotsRemaining <= 0 a Studio action/Function can flip to soldOut
    spotsTotal:
      type: number
      description: Capacity. Optional for the demo but a nice inventory story.
    spotsRemaining:
      type: number
      description: Remaining capacity.
    specialEvents:
      type: array
      of: [string]
      description: Notable overlapping events, e.g. "L'Eroica Gran Fondo".
    bookingUrl:
      type: url
      description: Deep link to the booking system (Centaur).
    privateAvailable:
      type: boolean
      description: "Any scheduled tour can be made private."
      logic: default true
```

---

## Document: `destination`  *(unified, hierarchical)*

Handles **both** the breadcrumb taxonomy (Europe ▸ Italy ▸ Tuscany) **and** the towns ridden through (Panzano, Radda, Brolio) in one self-referencing type. Weather lives here so every Tuscany tour inherits it. *(See "Decisions to flag" — splitting into `region` + `place` is the alternative.)*

```yaml
destination:
  __type: document
  __description: A place in the geography taxonomy — continent down to locality.
  fields:
    name:
      type: string
      required: true
      description: e.g. "Tuscany", "Panzano".
    slug:
      type: slug
      logic: only region-level destinations need public pages; localities can skip
    kind:
      type: string
      required: true
      description: Level in the hierarchy.
      validation: one of [continent, country, region, locality]
      logic: region builds the breadcrumb + holds weather; locality = itinerary towns
    parent:
      type: reference
      to: [destination]
      description: Next level up; builds the tree.
      validation: warn on self/cyclic references
    description:
      type: text
      description: Optional editorial intro for region pages.
    heroImage:
      type: image
    weatherByMonth:
      type: array
      of: [monthWeather]
      description: The weather table. Populate at region level only.
      logic: stored once on the region, inherited by all tours in it
    coordinates:
      type: geopoint
      description: Optional, for map pins / route display.
```

---

## Document: `accommodation`

```yaml
accommodation:
  __type: document
  __description: A hotel/property used as a tour overnight. Reused across tours and across nights.
  fields:
    name:
      type: string
      required: true
      description: e.g. "Borgo San Felice", "Castiglion del Bosco".
    slug:
      type: slug
    website:
      type: url
      description: External property site (the page links out to these).
    destination:
      type: reference
      to: [destination]
      description: Where it is.
    description:
      type: text
    images:
      type: array
      of: [image]
    category:
      type: string
      description: Optional positioning, e.g. "village-turned-luxury hotel".
```

---

## Document: `bike`

```yaml
bike:
  __type: document
  __description: A bicycle model offered on tours. Has its own /bike/ page.
  fields:
    name:
      type: string
      required: true
      description: e.g. "Colnago C72".
    slug:
      type: slug
    manufacturer:
      type: string
      description: e.g. "Colnago".
      logic: could become a reference to a `brand` doc later; string is fine for the demo
    type:
      type: string
      description: e.g. "Pro Road".
      validation: one of [proRoad, road, gravel, eBike, hybrid, mountain]
    image:
      type: image
    description:
      type: text
    specs:
      type: array
      of: [block]
      description: Optional spec detail for the bike page.
```

---

## Document: `level`

```yaml
level:
  __type: document
  __description: Difficulty level 1–4, reused across all tours and the Levels page.
  fields:
    value:
      type: number
      required: true
      validation: integer 1–4, unique
    title:
      type: string
      description: e.g. "Level 3".
    description:
      type: text
      description: What this level means (from the Levels page).
    icon:
      type: image
```

---

## Document: `collection`

```yaml
collection:
  __type: document
  __description: Marketing collection, e.g. Classic, Specialty, Family.
  fields:
    name:
      type: string
      required: true
    slug:
      type: slug
    tagline:
      type: string
      description: e.g. "Our signature tours".
    description:
      type: text
    heroImage:
      type: image
```

---

## Objects (embedded — no independent identity)

```yaml
highlight:
  __type: object
  __description: One Tour Highlights bullet.
  fields:
    content:
      type: array
      of: [block]
      required: true
      description: Short rich text (allows italics like "la dolce vita").

culinary:
  __type: object
  __description: The Eat / Drink blocks.
  fields:
    eat:
      type: text
      description: What you'll eat.
    drink:
      type: text
      description: What you'll drink.

itineraryDay:
  __type: object
  __description: One day of the tour.
  fields:
    dayNumber:
      type: number
      description: Day index, e.g. 1.
      logic: can be derived from array position; store it for print/PDF stability
    title:
      type: string
      required: true
      description: e.g. "Tuscan Vintage".
    body:
      type: array
      of: [block]
      required: true
      description: Narrative for the day.
    meals:
      type: array
      of: [string]
      description: Meals included that day.
      validation: subset of [breakfast, lunch, dinner]
      logic: render as a layout chip row
    destinations:
      type: array
      of: [reference -> destination]
      description: Towns/places passed through that day.
      validation: filter referenced destinations to kind=locality
    accommodation:
      type: reference
      to: [accommodation]
      description: Where the night is spent.
      logic: nullable on the final/departure day; same hotel naturally repeats across consecutive days
    rideOptions:
      type: array
      of: [rideOption]
      description: Distance/elevation variants for the day.

rideOption:
  __type: object
  __description: A ridable route option for a day (standard / shorter / longer).
  fields:
    label:
      type: string
      required: true
      validation: one of [standard, shorter, longer]
      logic: page calls the default "Accomplished" — map that to standard
    distanceKm:
      type: number
      required: true
      description: Distance in km (canonical).
    elevationGainM:
      type: number
      required: true
      description: Elevation gain in meters (canonical).
      logic: STORE METRIC ONCE; derive miles (km*0.621371) and feet (m*3.281) in the
             frontend/GROQ. The page shows both units — don't store both or they drift.

inclusionGroup:
  __type: object
  __description: A category of what's included (matches the page headings).
  fields:
    category:
      type: string
      required: true
      validation: one of [accommodations, meals, activities, gear, support, additional]
    items:
      type: array
      of: [string]
      required: true
      description: Bullet lines under that category.

bikeOnTour:
  __type: object
  __description: A bike offered on this tour + per-tour metadata (relationship, not the bike itself).
  fields:
    bike:
      type: reference
      to: [bike]
      required: true
    includedInPrice:
      type: boolean
      description: Whether this bike is included at no extra cost.
      logic: default true; lives here (not on `bike`) because inclusion is per-tour
    note:
      type: string
      description: e.g. participant-price purchase option, "three Colnago kits included".

logistics:
  __type: object
  __description: Arrival + departure details block.
  fields:
    arrivalAirportCities:
      type: array
      of: [string]
      description: e.g. ["Rome", "Florence"].
    pickupLocation:
      type: string
      description: e.g. "St. Regis Florence".
      logic: could be a reference to accommodation/destination later; string is fine now
    pickupTime:
      type: string
      description: e.g. "9:00 am".
    dropoffLocation:
      type: string
      description: e.g. "Chiusi-Chianciano Terme Train Station".
    dropoffTime:
      type: string
    notes:
      type: text
      description: "Details for alternate itineraries / future departures may change."

monthWeather:
  __type: object
  __description: One month's averages (lives on destination).
  fields:
    month:
      type: string
      validation: one of [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    highC:
      type: number
    lowC:
      type: number
    precipMm:
      type: number
      logic: derive °F / inches at render; store metric once

seo:
  __type: object
  __description: Per-tour search/social overrides.
  fields:
    metaTitle:
      type: string
    metaDescription:
      type: text
    ogImage:
      type: image
    noIndex:
      type: boolean
      logic: default false
```

---

## Business logic worth calling out

- **`priceFrom` is derived, not entered.** `min(price)` over `*[_type=="departure" && references(^._id) && status=="open" && startDate >= now()]`. Keeps the header price honest and removes a manual sync step — a clean GROQ demo moment.
- **Status drives the CTA.** `departure.status` → Book Now / Join Waitlist / Sold Out. A Sanity Function or document action can flip `open → soldOut` when `spotsRemaining` hits 0.
- **Units stored once.** Metric is canonical on `rideOption` and `monthWeather`; imperial is computed. This is the single most common place tour sites drift, so it's a good "structured content prevents bad data" talking point.
- **Weather inherited, not duplicated.** Querying a tour pulls `region->weatherByMonth`, so all Tuscany tours stay consistent — the textbook reference payoff.
- **Reference filters keep editors honest.** `itineraryDay.destinations` filtered to `kind==locality`, `tour.region` to `kind==region`.

## Decisions to flag before you build

1. **One `destination` type or two?** I unified region + locality with a `parent` link (elegant, great reuse story, but editors must pick `kind` correctly and you'll lean on Structure to keep the two list views clean). The alternative is separate `region` and `place` types — simpler mental model, more schema surface. Worth a deliberate call.
2. **Inclusions inline vs. shared library.** You chose inline, which is right for per-tour control. If consistency across tours later matters, the additive path is a singleton `inclusionDefaults` doc + a per-tour `additionalInclusions` array — no breaking change to what's specced here.
3. **Special guests / hosts (Andrea Tafi, Lina, the Colnago designer).** Currently living inside `itineraryDay.body`. You said don't make them documents — fine for now. If a "meet our local legends" reuse story ever appears across tours, that's the moment to promote them to a `person`/`experience` doc. Flagging so it's a conscious deferral, not an accident.
4. **`manufacturer` as string vs. `brand` reference.** Given Colnago is the whole hook here, a `brand` document (logo, story) might be a stronger demo asset than a plain string. Cheap to add later.

---

*Generated as a model map for a demo build — not final schema code. Field types map directly to Sanity's built-in types; arrays of objects become inline `array` fields, `reference -> X` becomes `{type:'reference', to:[{type:'X'}]}`.*
