# DuVine Demo Schema — Tour Page

**Author:** @presailor
**Date:** 2026-06-23
**Status:** v0.1 draft for SE review
**Demo target:** standalone Sanity Studio modeling the Colnago Tuscany page (`https://www.duvine.com/tour/colnago-tuscany-bike-tour/`)
**Audience for descriptions and helper text:** Gwen Kidera (Creative Director + Photographer), Mia, and any other non-technical editor at DuVine. Field titles, descriptions, and help strings are written for storytelling, not implementation.

## Purpose

This spec defines the Sanity schema for a standalone demo Studio used in the upcoming DuVine call. The goal is to build the Colnago Tuscany tour page from blank to published in front of Gwen and Mia, in a Studio that *feels* like it was designed for their editorial team.

Decisions locked with @allanwhite:
- **Bikes** are separate documents, referenced from tours.
- **Dates + availability** live in an external system (Centaur in production). For the demo, modeled as an external-system stub — the tour references a `departureSchedule` that pulls live from Centaur, shown as a read-only preview block.
- **Itinerary days** are an array of inline objects on the tour. Not a separate document type.
- **Highlights / Eat / Drink** are one polymorphic block with a category enum, so the team can add Sleep, Stay, or other categories later without schema work.
- **Inclusions + details** are a flexible array of `{heading, body}` entries.
- **Localization** is out of scope for this demo.
- **Region** is mentioned but not modeled; the production schema would add a `region` document with parent-reference hierarchy.
- **Business logic** lands as validation, conditional visibility, and reference filters — the places where Sanity's schema-in-code expressiveness goes beyond what a UI-configured schema can do.

## Document and object types in this Studio

| Name | Kind | Notes |
|---|---|---|
| `tour` | document | The primary product page. Most of the editorial work happens here. |
| `bike` | document | Reused fleet bike (Colnago C68, BMC Roadmachine, etc.). Stub for the demo — 6 fields. |
| `departureSchedule` | document | External-system stub representing the live Centaur feed for one tour's departures. Read-only in Studio; pulled via a server-side function. |
| `itineraryDay` | object (inline) | Repeating day block inside a tour. Not a standalone document. |
| `highlightBlock` | object (inline) | A category-tagged group of short editorial bullets (Highlights, Eat, Drink, Sleep, ...). |
| `detailSection` | object (inline) | One entry in the Inclusions + Details accordion. |

## Editorial principles guiding this schema

These principles drove the field shapes below. Worth naming so the SE can refer back to them during the demo if Gwen or Mia ask "why is it modeled like that?"

1. **Photography is treated as content, not decoration.** Every image field has hotspot + crop enabled, alt-text is required at the field level, and credit and caption are first-class. Gwen is a photographer; her camera roll deserves better than a WordPress media library.
2. **Repeatable structure stays editable as a list, not a form.** Itinerary days, highlight bullets, and inclusion sections are arrays the editor can reorder, expand, or collapse. Drag-to-reorder is the gesture.
3. **The schema names match the way DuVine already talks about their product.** "Tour Highlights," "Eat," "Drink," "Itinerary," "Inclusions + Details," "Bikes" come straight from their page. The Studio shouldn't make editors learn new vocabulary.
4. **Editorial guardrails over editorial freedom where it counts.** A tour can't be published without a hero image, a tour duration, at least three itinerary days, and at least one bike. Better to block publish than to let a half-finished tour go live.
5. **External-system data is visible but not editable.** The departure schedule is read-only in Studio with a clear "Source: Centaur" label, so editors know where to go if dates need to change.

## `tour` — the primary document

```yaml
name: tour
type: document
title: Tour
description: A guided cycling tour offering. This is what a guest sees when they land on a tour page.

groups:
  - name: editorial
    title: Editorial
    default: true
  - name: itinerary
    title: Itinerary
  - name: practical
    title: Practical Details
  - name: bookings
    title: Dates and Bookings
  - name: visibility
    title: Visibility and Status

fields:

  - name: title
    type: string
    title: Tour name
    description: |
      The headline name guests see at the top of the page and across the site.
      Keep it under 60 characters so it reads cleanly in search results.
      Example — Colnago Tuscany Bike Tour
    validation: required, max 60 characters
    group: editorial

  - name: slug
    type: slug
    title: URL slug
    description: |
      The address of the tour page. Auto-generated from the tour name; edit only if
      you have a specific URL in mind. Used in links, social shares, and search.
    options:
      source: title
      maxLength: 80
    validation: required, must be unique
    group: editorial

  - name: subtitle
    type: string
    title: Subtitle
    description: |
      A short tagline that appears under the tour name. One sentence; sets the tone.
      Example — An immersive cycling tour through the place we know best.
    validation: max 120 characters
    group: editorial

  - name: heroImage
    type: image
    title: Hero photograph
    description: |
      The first image guests see on the tour page. Choose a landscape-orientation
      photograph that captures the spirit of the trip — riders in motion, dramatic
      landscape, or the moment of arrival. This image is also used in social shares
      and the tour finder grid.
    options:
      hotspot: true
    fields:
      - name: alt
        type: string
        title: Alt text
        description: |
          Describe what's in the photograph for guests who can't see it and for
          search engines. One sentence, 100-150 characters. The Studio can suggest
          alt text from the image; you can accept it or write your own.
        validation: required, max 200 characters
      - name: caption
        type: string
        title: Caption
        description: Optional. Appears below the image on the page.
      - name: credit
        type: string
        title: Photographer credit
        description: Optional. Photographer name or agency.
    validation: required
    group: editorial

  - name: durationDays
    type: number
    title: Tour length (days)
    description: |
      How many days the tour runs, including arrival and departure days.
      Used in tour finder filters, search snippets, and itinerary validation.
    validation: required, min 2, max 21, integer
    group: editorial

  - name: difficulty
    type: string
    title: Difficulty
    description: |
      How challenging this tour is, in DuVine's own words. Appears on the tour
      page and powers the tour finder filter.
    options:
      list:
        - { value: leisurely, title: Leisurely }
        - { value: moderate, title: Moderate }
        - { value: challenging, title: Challenging }
        - { value: extreme, title: Extreme }
    validation: required
    group: editorial

  - name: introduction
    type: array
    of: [block]
    title: Introduction
    description: |
      The opening 2-3 paragraphs that sit below the hero image. Tell guests what
      makes this tour special and what kind of guest will love it. Plain rich text
      — bold, italics, links, and inline images supported.
    validation: required, min 1 block
    group: editorial

  - name: highlightBlocks
    type: array
    of: [highlightBlock]
    title: Highlights, Eat, Drink, and other quick callouts
    description: |
      Short bulleted callouts that appear in the page header. Add a Highlights
      block for the tour's signature moments; an Eat block for memorable meals; a
      Drink block for wines and tastings; or any other category that fits this
      tour. Drag to reorder.
    validation: min 1 entry, max 6 entries
    group: editorial

  # ITINERARY

  - name: itinerary
    type: array
    of: [itineraryDay]
    title: Day-by-day itinerary
    description: |
      One entry per day. Drag days to reorder. Day numbers update automatically
      from the order.
    validation: |
      Required. Minimum 2 days.
      The number of days must match the Tour length (days) field above —
      the Studio will warn you if they're out of sync.
    group: itinerary

  # PRACTICAL DETAILS

  - name: detailSections
    type: array
    of: [detailSection]
    title: Inclusions and details
    description: |
      The accordion sections that appear below the itinerary — what's included,
      accommodations, terrain, what to bring, cancellation policy, and anything
      else specific to this tour. Each section has a heading and a body. Add as
      many as the tour needs; reorder by dragging.
    validation: min 3 entries
    group: practical

  - name: bikes
    type: array
    of:
      - type: reference
        to: [{ type: bike }]
        options:
          filter: 'status == "active" && $tourDifficulty in suitableForDifficulty'
          filterParams:
            tourDifficulty: ^.difficulty
    title: Bikes on this tour
    description: |
      The bikes guests will ride on this tour. The picker only shows bikes that
      are currently active and rated for this tour's difficulty level. Reorder
      to control the display order on the page.
    validation: required, min 1, max 5
    group: practical

  # DATES AND BOOKINGS (EXTERNAL)

  - name: departureSchedule
    type: reference
    to: [{ type: departureSchedule }]
    title: Departure schedule
    description: |
      The live dates and prices for this tour. Departure data comes from Centaur
      — DuVine's reservation system — so the Studio shows it read-only. To change
      dates or pricing, update them in Centaur and they'll refresh here within
      a few minutes.
    validation: required
    group: bookings
    options:
      readOnly: true  # editors can pick the linked schedule once; the schedule's content syncs from Centaur

  # VISIBILITY AND STATUS

  - name: privateOnly
    type: boolean
    title: Private bookings only
    description: |
      Turn on if this tour is offered only as a private departure (not on the
      public schedule). When on, the tour is hidden from the tour finder and
      public listings but remains accessible by direct URL.
    initialValue: false
    group: visibility

  - name: privateOnlyDetails
    type: text
    title: Note about private bookings
    description: |
      Optional. A short message shown to guests who reach this tour by direct
      URL — explaining how to inquire about a private booking.
    hidden: '!parent.privateOnly'  # only visible when privateOnly is true
    validation: max 280 characters when private bookings only is on
    group: visibility

  - name: featured
    type: boolean
    title: Feature on the homepage
    description: |
      Turn on to surface this tour in the homepage featured grid. Up to six tours
      can be featured at a time — the Studio will warn you if the limit is
      reached.
    initialValue: false
    group: visibility
    validation: |
      Custom rule: when set to true, count how many other tours are also
      featured. If that count is already 6, block publish with a helpful message
      pointing to which other tours are featured.

  - name: seo
    type: object
    title: Search and social
    description: |
      How this tour appears in Google search results and on Facebook/Instagram
      when shared. Optional — sensible defaults are derived from the tour name,
      subtitle, and hero image.
    fields:
      - name: metaTitle
        type: string
        description: Optional override of the title shown in search results.
      - name: metaDescription
        type: text
        description: One- to two-sentence description for search results. 155 characters.
      - name: ogImage
        type: image
        description: Optional override of the social-share image. Defaults to the hero photograph.
    group: editorial

preview:
  select:
    title: title
    subtitle: subtitle
    media: heroImage
    duration: durationDays
    difficulty: difficulty
  prepare:
    title: <title>
    subtitle: '<duration> days · <difficulty>'
    media: <heroImage>
```

### Business-logic moments that matter on `tour`

These are the places where Sanity's schema-in-code expressiveness produces real editorial value. Worth highlighting during the demo, lightly — without making the call about feature checklists.

1. **The `itinerary` length must match `durationDays`.** A custom validator on the tour document compares `itinerary.length` against `durationDays` and warns if they're out of sync. Stops the common mistake of bumping a tour from 6 to 7 days in marketing copy without adding the day to the itinerary. *In Contentful this rule lives outside the schema — typically in a webhook, a CI check, or a manual review step. Here it's in the schema itself, runs as the editor types, and the editor sees the warning inline.*
2. **The `bikes` picker is filtered to active, difficulty-appropriate bikes.** The `filter` parameter on the reference passes the tour's `difficulty` field as runtime context and queries only bikes whose `suitableForDifficulty[]` array includes it. *In Contentful you can configure "reference to bike," but you cannot filter the picker by another field of the document being edited. Editors see every bike, then pick the wrong one.*
3. **The `privateOnlyDetails` field is hidden unless `privateOnly` is on.** Conditional visibility based on another field's value. *Contentful supports field visibility conditions, but only against scalar values; nested or computed conditions are not expressible. Sanity's `hidden` accepts a function with full document context.*
4. **The `featured` toggle enforces a homepage cap of six.** Custom async validator that queries Sanity for the count of other featured tours and blocks publish if the cap is reached, with a message naming the conflicting tours. *In Contentful, this is a webhook + custom UI extension at minimum. Here it's 12 lines in the schema file.*

## `itineraryDay` — inline object on tour

```yaml
name: itineraryDay
type: object
title: Day
description: One day of the tour.

fields:

  - name: title
    type: string
    title: Day headline
    description: |
      A short headline for this day. The day number is added automatically from
      the order in the itinerary — don't include it in the headline.
      Example — Through Chianti to Radda
    validation: required, max 80 characters

  - name: locations
    type: string
    title: Route summary
    description: |
      A one-line summary of where the day goes. Used in the route summary
      callout on the page.
      Example — Florence to Panzano via Radda
    validation: max 120 characters

  - name: description
    type: array
    of: [block, image]
    title: What happens this day
    description: |
      The full narrative for this day — rich text with inline images. Write as
      you'd want a guest to read it the night before. Photographs from the day
      can be dropped directly into the text.
    validation: required, min 1 block
    options:
      block:
        styles: [normal, h3, blockquote]
        lists: [bullet]
        marks:
          decorators: [strong, em]
          annotations: [link]

  - name: image
    type: image
    title: Lead photograph for this day
    description: |
      The featured image for this day's section. Landscape orientation works best.
    options:
      hotspot: true
    fields:
      - { name: alt, type: string, validation: required }
    validation: required

  - name: distance
    type: object
    title: Riding distance
    description: |
      How far guests ride this day. Both metric and imperial — both are shown to
      guests based on their region.
    fields:
      - { name: kilometers, type: number, validation: min 0, max 250 }
      - { name: miles, type: number, validation: min 0, max 160 }

  - name: elevation
    type: object
    title: Climbing
    description: Optional. Total ascent for the day.
    fields:
      - { name: meters, type: number }
      - { name: feet, type: number }

  - name: meals
    type: array
    of: [{ type: string }]
    title: Meals included today
    description: Tap to add. Breakfast, Lunch, Dinner, or Snack.
    options:
      list:
        - { value: breakfast, title: Breakfast }
        - { value: lunch, title: Lunch }
        - { value: dinner, title: Dinner }
        - { value: snack, title: Snack }

  - name: accommodation
    type: string
    title: Where guests stay tonight
    description: |
      The name of the hotel, villa, or property. Free text for the demo; in
      production this would reference a Property document type.

preview:
  select:
    title: title
    locations: locations
    media: image
  prepare:
    title: <title>
    subtitle: <locations>
    media: <image>
```

### Editorial detail worth highlighting

- **Day number is derived, not entered.** The day's place in the itinerary is its order in the array. Reordering days renumbers them automatically — no editor ever types "Day 3" and forgets to renumber after a reorder.
- **Distance is two fields, not one.** Storing kilometers and miles as separate fields means guests see units in the format their region prefers. *In a less-expressive system, editors enter "62 km / 39 mi" as a string and inevitably get the conversion wrong on one of the 84 tour pages.*

## `highlightBlock` — inline object on tour

```yaml
name: highlightBlock
type: object
title: Highlight block

fields:

  - name: category
    type: string
    title: Category
    description: |
      What kind of callouts these are. New categories can be added in code
      without breaking existing content.
    options:
      list:
        - { value: highlights, title: Tour Highlights }
        - { value: eat, title: Eat }
        - { value: drink, title: Drink }
        - { value: sleep, title: Sleep }
        - { value: stay, title: Stay }
        - { value: experience, title: Experience }
    validation: required

  - name: items
    type: array
    of: [{ type: string }]
    title: Items
    description: |
      Short bulleted entries — one per line. Each item is a single sentence or
      phrase.
      Example for Eat — Truffle hunting and tasting in Chianti
    validation: required, min 1, max 8

preview:
  select:
    category: category
    items: items
  prepare:
    title: '<category label>'
    subtitle: '<items.length> items'
```

## `detailSection` — inline object on tour

```yaml
name: detailSection
type: object
title: Details section

fields:

  - name: heading
    type: string
    title: Section heading
    description: |
      The accordion heading guests see. Pick a heading that tells them what's
      inside before they expand it.
      Examples — What's Included; Accommodations; Terrain and Difficulty;
      Cancellation Policy.
    validation: required, max 80 characters

  - name: body
    type: array
    of: [block, image]
    title: Section content
    description: Rich text. Bullet lists and inline images work well here.
    validation: required, min 1 block

  - name: pinToTop
    type: boolean
    title: Pin this section to the top
    description: |
      Optional. When on, this section appears before the other detail sections
      regardless of its order in the list. Useful for legally required content
      or seasonal notices.
    initialValue: false

preview:
  select:
    title: heading
    pinned: pinToTop
  prepare:
    title: <heading>
    subtitle: '<pinned ? "📌 Pinned to top" : "">'
```

## `bike` — separate document (stub)

```yaml
name: bike
type: document
title: Bike

fields:

  - name: name
    type: string
    title: Bike name
    description: |
      How DuVine refers to this bike internally and on the page.
      Example — Colnago C68
    validation: required

  - name: manufacturer
    type: string
    title: Manufacturer
    description: Example — Colnago, BMC, Pinarello, Cannondale.
    validation: required

  - name: model
    type: string
    title: Model designation
    description: Example — C68, Roadmachine, Dogma F.

  - name: heroImage
    type: image
    title: Photograph
    description: A clean shot of the bike — usually side-on, on a neutral background.
    options:
      hotspot: true
    fields:
      - { name: alt, type: string, validation: required }
    validation: required

  - name: description
    type: array
    of: [block]
    title: Description
    description: |
      A short paragraph about the bike — frame material, key features, what kind
      of rider it suits. Appears in the bike block on tour pages.
    validation: required, min 1 block

  - name: suitableForDifficulty
    type: array
    of: [{ type: string }]
    title: Suitable for tour difficulty
    description: |
      Which tour difficulty levels can use this bike. Used by the tour bike
      picker to filter out incompatible bikes.
    options:
      list:
        - { value: leisurely, title: Leisurely }
        - { value: moderate, title: Moderate }
        - { value: challenging, title: Challenging }
        - { value: extreme, title: Extreme }
    validation: required, min 1

  - name: status
    type: string
    title: Status
    description: |
      Active bikes appear in the tour bike picker. Retired bikes are hidden but
      preserved for historical tour pages.
    options:
      list:
        - { value: active, title: Active }
        - { value: retired, title: Retired }
    initialValue: active
    validation: required

preview:
  select:
    title: name
    subtitle: manufacturer
    media: heroImage
```

## `departureSchedule` — external-system stub

```yaml
name: departureSchedule
type: document
title: Departure schedule (from Centaur)
description: |
  Live departure data for one tour, sourced from Centaur. The Studio shows this
  as a read-only preview — the source of truth is Centaur. To change dates,
  pricing, or availability, update them in Centaur and they'll refresh here.

fields:

  - name: tourReference
    type: string
    title: Centaur tour ID
    description: |
      The identifier Centaur uses for this tour. Set once when the schedule is
      linked; do not change.
    readOnly: true
    validation: required

  - name: departures
    type: array
    title: Upcoming departures
    description: |
      Live data from Centaur. Read-only here. Each entry shows the departure
      date, price, and availability status as Centaur sees them.
    readOnly: true
    of:
      - type: object
        fields:
          - { name: startDate, type: date, readOnly: true }
          - { name: endDate, type: date, readOnly: true }
          - { name: priceUSD, type: number, readOnly: true }
          - { name: status, type: string, readOnly: true,
              options: { list: [available, waitlist, sold-out, cancelled] } }
          - { name: notes, type: string, readOnly: true }

  - name: lastSyncedAt
    type: datetime
    title: Last sync
    description: |
      When this schedule was last refreshed from Centaur. The Studio shows a
      timestamp so editors know how fresh the data is.
    readOnly: true

preview:
  select:
    title: tourReference
    syncedAt: lastSyncedAt
    count: departures.length
  prepare:
    title: 'Centaur schedule — <tourReference>'
    subtitle: '<count> upcoming departures · synced <syncedAt>'
```

### How the external-system story lands in the demo

The departure schedule is read-only in Studio with a visible "Source: Centaur" label and a last-sync timestamp. The demo moment is: "DuVine has a Java reservation system called Centaur that owns booking truth — we don't want marketing editors changing prices. Sanity composes the live data into the page without pretending to own it. The editor sees the same data the guest sees, and knows to update Centaur if it's wrong." That's a 60-second moment, not a chapter.

For the demo Studio, the `departures` array is hand-populated with three plausible Colnago Tuscany departures. In production this would be a function pulling from Centaur on a schedule, or via a webhook on Centaur changes.

## What this schema demonstrates

Six talking points the schema enables, in priority order. Not a script — a menu for whoever's driving the demo to pull from.

1. **The Studio speaks DuVine's language.** Field titles, descriptions, and validation messages match the vocabulary on the live site — Tour Highlights, Eat, Drink, Itinerary, Inclusions + Details, Bikes. No translation required.
2. **The schema enforces editorial truth.** A tour can't go live with a 7-day duration and 5 itinerary days. A featured tour can't sneak past the homepage cap. A private-only tour hides its details from the public listing without the editor having to remember to set six other fields.
3. **References do what references should.** Bikes are picked from a filtered list (active only, difficulty-appropriate) — not a free-text field or a flat dropdown of 200 bikes. A bike retired tomorrow disappears from every tour's picker; published tours that already reference it continue to show the bike at the version they linked.
4. **External-system data is composed, not copied.** Centaur owns booking truth. Sanity shows it read-only, with a sync timestamp, so editors know where to go to change it. The marketing site composes both into one experience without one team stepping on the other.
5. **Photography is treated as content.** Every image has hotspot, crop, alt-text, caption, and credit — first-class fields, not afterthoughts. Gwen's images become reusable assets with the metadata they deserve.
6. **The schema is a file in a git repo.** When DuVine adds a new highlight category (say, "Wellness") or a new field on tour (say, "Suggested fitness level"), it's a code change reviewed in a pull request, deployed atomically, and versioned with the rest of the codebase. The current state of the schema is always knowable; no console clicks, no drift between environments.

## Notes for the SE driving the demo

A few practical observations to ease prep:

- **The schema as written is buildable in a focused half-day** by someone fluent in Sanity. The longest single moment is composing realistic content for the Colnago page itself — figure another half-day to populate one tour, three bikes, and one departure schedule with plausible content from the live site.
- **The polymorphic `highlightBlock` is the modeling moment.** It's the one design choice in this spec that visibly outclasses what a UI-configured schema editor would let you build. Worth a beat during the demo: "Let's add a Sleep category. In code, that's one line. The Studio will pick it up automatically next time it loads."
- **The `bikes` filter is the validation moment.** Watching the picker change as the tour's difficulty field changes is a short, undeniable beat — much more concrete than abstract "we have validation."
- **The `featured` cap is the workflow moment.** Pre-populate the demo Studio with six other featured tours, then try to feature Colnago Tuscany. The block-publish error message is the moment.
- **Skip on the day:** localization (separate demo), region modeling (mentioned in a sentence, not shown), and SEO field (default behavior; can mention in passing).

## Open questions for SE review

1. **The `departureSchedule.priceUSD` field — single currency or multi-currency?** Single is simpler for the demo; multi (USD + EUR + GBP) is closer to DuVine's actual operating reality. Recommend single for demo, note multi as production extension.
2. **The `accommodation` field on `itineraryDay`** is free text in this spec. In production it would reference a `property` document (the hotel/villa). Worth mentioning during the demo as "the next thing to model"?
3. **Initial content for the demo Studio.** I can draft realistic seed content (one tour fully populated from the live Colnago page, three bikes, one departure schedule) once the schema is approved. Should I draft it now in parallel, or wait for schema sign-off?
4. **Visual Editing setup.** If we want to show the Studio editing the live page in a side-by-side preview (a common Sanity demo moment), that needs a stub front-end serving the schema. Out of scope for this spec but worth flagging if you want it in the demo — adds another half-day of front-end work.
