export function TourPrivateNotice({ note }: { note: string }) {
  return (
    <aside className="border-[#007290]/20 border-y bg-[#007290]/5">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <p className="font-medium text-[#007290]">Private departures only</p>
        <p className="mt-1 text-foreground text-sm">{note}</p>
      </div>
    </aside>
  );
}
