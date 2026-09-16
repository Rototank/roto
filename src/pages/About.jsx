import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TINTS } from '../lib/tints'

export default function About() {
  return (
    <main>
      <section className="relative isolate min-h-[22rem] overflow-hidden">
        <img src="/images/farm.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 via-blue-800/55 to-amber-500/30" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sun">About</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Roto tanks, made for Kenya.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
            We sell genuine Roto Moulders tanks at factory-direct prices. Same tanks you
            see on plots from Nairobi to Mombasa — food-grade, UV-stabilised, built here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Who we are</h2>
            <p className="mt-4 text-sm leading-7 text-mute">
              Roto Moulders Ltd has manufactured plastic water and sanitation tanks in Kenya
              since 1991. The plant sits on Enterprise Road in Nairobi’s Industrial Area.
              It is part of Flame Tree Group, with sister plants across East Africa.
            </p>
            <p className="mt-4 text-sm leading-7 text-mute">
              Every tank is one-piece rotomoulded polyethylene. No seams, no rust, no
              inner liner to fail. The Roto mark is moulded into the wall so you can
              tell a genuine tank on delivery.
            </p>
            <p className="mt-4 text-sm leading-7 text-mute">
              This shop lists current Roto Tanks Kenya prices, VAT included, for vertical,
              underground, loft and septic tanks. Delivery is free to all 47 counties.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="/images/vertical.png" alt="Roto vertical tank" className={`h-full rounded-3xl object-contain p-6 ${TINTS.vertical.panel}`} />
            <img src="/images/underground.png" alt="Roto underground tank" className={`h-full rounded-3xl object-contain p-6 ${TINTS.underground.panel}`} />
            <img src="/images/loft.png" alt="Roto loft tank" className={`h-full rounded-3xl object-contain p-6 ${TINTS.loft.panel}`} />
            <img src="/images/septic-vertical.png" alt="Roto septic tank" className={`h-full rounded-3xl object-contain p-6 ${TINTS.septic.panel}`} />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-cyan-50 via-amber-50 to-violet-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">On the ground</h2>
          <p className="mt-2 max-w-xl text-sm text-mute">
            Real Roto tanks in Kenyan yards, farms and compounds.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <img src="/images/farm.jpeg" alt="Roto tank on a Kenyan farm" className="h-72 w-full rounded-3xl object-cover sm:h-80" />
            <img src="/images/factory.png" alt="Roto tanks at the yard" className="h-72 w-full rounded-3xl object-cover sm:h-80" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <img src="/images/tanks-family.jpg" alt="Roto tank range" className="h-40 w-full rounded-3xl object-cover" />
            <img src="/images/vertical-tall.jpeg" alt="Tall Roto tank" className="h-40 w-full rounded-3xl bg-white object-contain p-3" />
            <img src="/images/underground.png" alt="Underground Roto tank" className="h-40 w-full rounded-3xl bg-white object-contain p-3" />
            <img src="/images/septic-horizontal.jpg" alt="Horizontal septic tank" className="h-40 w-full rounded-3xl bg-white object-contain p-3" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { n: '1991', l: 'Manufacturing in Kenya', wrap: 'bg-blue-100', num: 'text-blue-700' },
            { n: '47', l: 'Counties we deliver to', wrap: 'bg-emerald-100', num: 'text-emerald-700' },
            { n: '10–15 yrs', l: 'Typical tank service life', wrap: 'bg-amber-100', num: 'text-amber-700' },
          ].map((stat) => (
            <div key={stat.l} className={`rounded-3xl px-6 py-8 shadow-sm ${stat.wrap}`}>
              <p className={`text-3xl font-extrabold tracking-tight ${stat.num}`}>{stat.n}</p>
              <p className="mt-2 text-sm text-mute">{stat.l}</p>
            </div>
          ))}
        </div>
        <Link
          to="/shop"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-bold text-ink hover:bg-sun-dark"
        >
          Shop tanks
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  )
}
