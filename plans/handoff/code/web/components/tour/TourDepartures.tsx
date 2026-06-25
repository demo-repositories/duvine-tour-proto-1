type Departure = {
  startDate: string
  endDate: string
  priceUSD: number
  status: 'available' | 'waitlist' | 'sold-out' | 'cancelled'
  notes?: string
}

type Schedule = {
  tourReference: string
  departures: Departure[]
  lastSyncedAt?: string
}

const STATUS_LABEL: Record<string, string> = {
  available: 'Available',
  waitlist: 'Waitlist',
  'sold-out': 'Sold out',
  cancelled: 'Cancelled',
}

function formatDate(d: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})
}

export function TourDepartures({schedule}: {schedule?: Schedule}) {
  if (!schedule?.departures?.length) return null
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-medium text-stone-900">Departures</h2>
      <p className="mt-1 text-xs text-stone-500">
        Source: Kaptio
        {schedule.lastSyncedAt
          ? ` · synced ${new Date(schedule.lastSyncedAt).toLocaleString()}`
          : null}
      </p>
      <table className="mt-4 w-full border-t border-stone-200 text-sm">
        <thead className="text-left text-xs uppercase tracking-wide text-stone-500">
          <tr>
            <th className="py-3">Dates</th>
            <th className="py-3">Status</th>
            <th className="py-3 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {schedule.departures.map((d, i) => (
            <tr key={i} className="border-t border-stone-100">
              <td className="py-3">
                {formatDate(d.startDate)} → {formatDate(d.endDate)}
                {d.notes ? <div className="text-xs text-stone-500">{d.notes}</div> : null}
              </td>
              <td className="py-3">{STATUS_LABEL[d.status] ?? d.status}</td>
              <td className="py-3 text-right">
                {d.priceUSD ? `$${d.priceUSD.toLocaleString()}` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
