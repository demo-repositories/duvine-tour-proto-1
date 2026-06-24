import {defineField, defineType} from 'sanity'

/**
 * Departure schedule — external-system stub.
 *
 * In production, this would be populated by a Sanity Function or webhook
 * from DuVine's Centaur reservation system. For the demo, fields are marked
 * readOnly so the Studio surfaces "this comes from Centaur, look there to change it"
 * without editors being able to edit prices/dates inline.
 */
export const departureScheduleType = defineType({
  name: 'departureSchedule',
  title: 'Departure schedule (from Centaur)',
  type: 'document',
  description:
    'Live departure data for one tour, sourced from Centaur. The Studio shows this as a read-only preview — the source of truth is Centaur.',
  fields: [
    defineField({
      name: 'tourReference',
      title: 'Centaur tour ID',
      type: 'string',
      description:
        'The identifier Centaur uses for this tour. Set once when the schedule is linked; do not change.',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'departures',
      title: 'Upcoming departures',
      type: 'array',
      description:
        'Live data from Centaur. Read-only here. Each entry shows the departure date, price, and availability status as Centaur sees them.',
      readOnly: true,
      of: [
        {
          type: 'object',
          name: 'departure',
          fields: [
            defineField({name: 'startDate', type: 'date', title: 'Start date', readOnly: true}),
            defineField({name: 'endDate', type: 'date', title: 'End date', readOnly: true}),
            defineField({name: 'priceUSD', type: 'number', title: 'Price (USD)', readOnly: true}),
            defineField({
              name: 'status',
              type: 'string',
              title: 'Status',
              readOnly: true,
              options: {
                list: [
                  {value: 'available', title: 'Available'},
                  {value: 'waitlist', title: 'Waitlist'},
                  {value: 'sold-out', title: 'Sold out'},
                  {value: 'cancelled', title: 'Cancelled'},
                ],
              },
            }),
            defineField({name: 'notes', type: 'string', title: 'Notes', readOnly: true}),
          ],
          preview: {
            select: {start: 'startDate', end: 'endDate', status: 'status', price: 'priceUSD'},
            prepare({start, end, status, price}) {
              return {
                title: `${start || '?'} → ${end || '?'}`,
                subtitle: [status, price ? `$${price.toLocaleString()}` : null]
                  .filter(Boolean)
                  .join(' · '),
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'lastSyncedAt',
      title: 'Last sync',
      type: 'datetime',
      description:
        'When this schedule was last refreshed from Centaur. The Studio shows a timestamp so editors know how fresh the data is.',
      readOnly: true,
    }),
  ],
  preview: {
    select: {tour: 'tourReference', syncedAt: 'lastSyncedAt', departures: 'departures'},
    prepare({tour, syncedAt, departures}) {
      const count = Array.isArray(departures) ? departures.length : 0
      const synced = syncedAt ? new Date(syncedAt).toLocaleString() : 'never'
      return {
        title: `Centaur schedule — ${tour || 'unlinked'}`,
        subtitle: `${count} upcoming · synced ${synced}`,
      }
    },
  },
})
