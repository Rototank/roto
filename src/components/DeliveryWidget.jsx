import { useMemo, useState } from 'react'
import { COUNTIES } from '../data/counties'
import { quoteDelivery } from '../lib/delivery'

export default function DeliveryWidget() {
  const [county, setCounty] = useState('Nairobi')
  const quote = useMemo(() => quoteDelivery({ county }), [county])

  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-lg sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yellow-200">Delivery</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight">Free to all 47 counties</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-white/85">
        No transport charge on any tank. Pick a county to see how soon it usually arrives.
      </p>

      <label className="mt-6 block max-w-md text-sm font-medium">
        County
        <select
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          className="mt-1.5 w-full rounded-2xl border-0 bg-white px-3 py-3 text-ink outline-none"
        >
          {COUNTIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {quote && (
        <div className="mt-6 flex flex-wrap items-end justify-between gap-3 rounded-2xl bg-white/15 px-5 py-4">
          <div>
            <p className="text-sm text-white/80">{quote.zone.name} · {quote.eta}</p>
            <p className="mt-1 text-2xl font-bold text-sun">Free</p>
          </div>
          <p className="text-xs text-white/75">Price on the tank is what you pay.</p>
        </div>
      )}
    </div>
  )
}
