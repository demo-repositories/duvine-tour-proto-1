# 07 — Demo day operator notes

For whoever drives the call. **Not a script.** A menu of beats and the order that lands well.

## The shape

The four business-logic moments (validator, bike picker filter, conditional visibility, featured cap) are the differentiation from Contentful. They're proof that the editorial workflow holds up — *not* a feature montage to present upfront.

**Recommended posture (presailor's): lead with build-from-blank, embed the moments inside it as they naturally arise.** Gwen and Mia are creative practitioners; they want to see what a Tuesday looks like, not a feature tour. The moments land harder when they're discovered inside a workflow than when they're presented as a list.

**Alternative posture (architecton's original):** lead with the four moments as a quick montage, then build-from-blank to show them in context. Faster to establish "this Studio is different," but inverts the editorial-first story.

**Ordering trade-off worth knowing:** the embedded posture opens with the **itinerary validator** (it's the first moment to surface naturally in the build flow), not the bike-picker filter. Bike picker is the more visceral "wait, what?" beat — landing it first is a real loss. The judgment is that workflow-honesty (showing the moments inside an actual editorial flow) wins over front-loading the most viscerally surprising beat. For Gwen and Mia — creative practitioners, not feature shoppers — that's the right trade. But it is a trade. If the audience signals on the call that they want to see the differentiation faster, the SE can flex to the alternative posture mid-stream.

@allanwhite arbitrates. The SE can also flex live — if the build-from-blank flow goes sideways, fall back to the moments as standalone beats (the "reference catalog" section below).

## The 60-minute call shape — recommended (embedded moments)

| Time | Section | Who |
|---|---|---|
| 0:00 | Open + re-anchor. Confirm what they're here for: a Studio that fits a small creative team. | @presailor / SE |
| 0:03 | Studio tour — open the existing Colnago Tuscany tour, walk what's there. (5 min) | SE |
| 0:08 | **Build a new tour from blank.** Embed the four moments as they arise. (~20 min, see breakdown below) | SE |
| 0:28 | **Presentation tool moment** — same content, side-by-side edit, live preview. (5 min) | SE |
| 0:33 | Multi-channel / AI moment if scoped in. (5-7 min, optional — Allan's call) | SE |
| 0:40 | Walk the leave-behind doc at high level. (5 min) | @presailor / SE |
| 0:45 | Diagnostic — what would unstick this. (10 min) | All |
| 0:55 | Next steps. (5 min) | @presailor / SE |
| 1:00 | End. | |

### Build-from-blank — embedded-moments breakdown (0:08 → 0:28)

The arc is "from blank document to published, rendered tour page." Each demo moment surfaces at the natural point in the workflow where an editor would encounter it.

| Build step | Moment surfaces |
|---|---|
| Create → Tour. Empty form. | — |
| Fill the editorial group: title, slug auto-generates, subtitle, hero (upload an image), durationDays = 4, difficulty = leisurely | — |
| Intro (one paragraph), add one highlight block | — |
| Add 4 itinerary days. Drag to reorder one. Day numbers update automatically. | — |
| **Bump durationDays to 5 — but only add 4 days.** | 🔔 **Moment 1 — itinerary length validator** fires inline. "You've added 4 days but the tour length above is set to 5..." Add the 5th day. Warning clears. |
| Open the **Bikes** field. | 🔔 **Moment 2 — bike picker filter.** Bikes shown are only active + suitableForDifficulty includes "leisurely." Bump tour difficulty to challenging; reopen picker — different bikes. Back to leisurely. |
| Add 3 detail sections. Pick the existing departure schedule. | — |
| Scroll to Visibility group. **Toggle "Private bookings only" ON.** | 🔔 **Moment 3 — conditional visibility.** Note field appears. Type a sentence. Toggle off — gone. |
| **Toggle "Feature on homepage" ON.** Try to publish. | 🔔 **Moment 4 — featured cap.** Block-publish message names the 6 conflicting tours. Untoggle. (Requires 6 other featured tours pre-staged — see Phase 2 checklist.) |
| Publish. Switch to deployed front-end. Tour renders. | — |

**Land** (after publish renders): "From blank to a published, rendered page in under 20 minutes. No developers in the loop. The schema enforced what needed to be true; the Studio stayed out of the way of everything else."

## Presentation tool moment (5 min)

Open Presentation in Studio. Side-by-side: Studio left, rendered tour right.

Click into the **subtitle field**. Notice the corresponding region on the right highlights. Type a new subtitle. The right pane updates within a second.

**Land:** "Editors see exactly what guests will see, as they're writing. No publish-and-pray. No 'is the staging site up?' Visual Editing is a Sanity primitive, not a plugin we wired."

## Reference catalog — the four moments as standalone beats

Use this if you want to demo the moments in isolation (alternative posture, or fallback if build-from-blank flow breaks live). Each is a 2-3 minute beat with a setup, action, and land.

### Moment 1 — Itinerary length validator (the editorial trust beat)

**Setup:** Colnago Tuscany tour open. Itinerary has 6 days, durationDays = 6.

**Action:** Bump durationDays to 7. Validator warning appears inline. Add a 7th day. Warning clears.

**Land:** "Marketing copy and itineraries drift apart. Someone bumps a tour from 6 to 7 days, forgets to add the itinerary day. Cross-field validation runs as the editor types. Not a webhook, not a CI check, not a checklist someone forgot. The Studio holds the line."

### Moment 2 — Bike picker filter (the visceral beat)

**Setup:** Colnago Tuscany tour open. Difficulty: `moderate`.

**Action:** Open Bikes field. Three bikes shown. Change tour difficulty to `extreme`. Open Bikes picker again — different bikes (or fewer). Back to `moderate`.

**Land:** "DuVine has a fleet that changes. Each bike fits some tour difficulties and not others. The picker filters live as you set difficulty. In Contentful, references can't filter on other fields of the document you're editing — editors see every bike, then pick the wrong one."

### Moment 3 — Conditional visibility (the workflow beat)

**Setup:** Tour open. Scroll to Visibility group.

**Action:** Toggle "Private bookings only" ON. The note field appears. Type a sentence. Toggle OFF — gone.

**Land:** "Some tours are private only — no public dates, the URL still exists for people they're sending it to. The editor should only see private-tour fields when they actually mark it private. Conditional visibility with full document context."

### Moment 4 — Featured cap (the governance beat)

**Setup:** Six other tours are already featured (pre-staged).

**Action:** Toggle "Feature on homepage" ON for Colnago Tuscany. Publish. Blocks with a helpful message naming the conflicting tours. Untoggle.

**Land:** "The homepage features six tours. No more. Async validator queries the dataset, blocks publish, names the conflict. In a UI-configured schema editor this is a webhook plus a custom UI extension. Here it's a function in the schema file."

## What NOT to demo

- Localization (separate demo). Mention in passing if asked.
- Region modeling (mention only — "this would be its own demo").
- SEO field (works fine; not interesting to non-technical editors).
- TypeGen / GROQ / code-side of things (Gwen and Mia don't care; offer offline to their developer if asked).
- The Centaur stub story past 60 seconds. The line is "Sanity composes external data without owning it." Don't get into webhook architecture.

## Tone notes

- **Don't say "robust," "leverage," "seamless," or "empower."** Marketing words for a creative audience read as not-listening.
- **Don't reduce moments to feature checklists.** Each moment is a story about *editor experience*, not a checkbox.
- **Don't compare Contentful by name more than once.** They've heard it. The bike picker beat does the work.
- **Acknowledge what Sanity doesn't do.** If they ask about templated emails, marketing automation, page-builder for non-developers — say "that's not what Sanity is, here's what is."

## If something breaks live

- **Live preview lag** — Fall back to the deployed front-end URL in another browser tab.
- **A validator doesn't fire** — Save the document; some validators run on save, not on type. If it still doesn't fire, blame "demo gremlins" and move on. Don't dwell.
- **Image upload fails** — Skip; use an existing one. Don't burn time on this.
- **Studio slow to load** — Network. Have a screen recording of the Studio's hot path as a backup (a 2-minute recording covering all four moments is enough insurance).
- **Build-from-blank flow goes sideways** — Pivot to the reference-catalog beats above. The moments work as standalone demos too.

## Leave-behind

After the call:

- The Studio URL — they can open it themselves anytime
- A 1-page brief from @presailor on what the demo showed and what production rollout would look like
- A list of next-step options: paid trial, technical deep-dive with their dev, content modeling workshop
