export function TourPrivateNotice({note}: {note: string}) {
  return (
    <aside className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <p className="font-medium">Private departures only</p>
      <p className="mt-1">{note}</p>
    </aside>
  )
}
