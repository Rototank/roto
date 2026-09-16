import { ArrowRight, Droplets, ShieldCheck, Sun, Truck } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DeliveryWidget from '../components/DeliveryWidget'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, products } from '../data/products'
import { kes } from '../lib/money'
import { TINTS } from '../lib/tints'

const trust = [
  { icon: ShieldCheck, label: 'KEBS-grade polyethylene', wrap: 'bg-blue-100 text-blue-700' },
  { icon: Droplets, label: 'Food-safe drinking water', wrap: 'bg-cyan-100 text-cyan-700' },
  { icon: Sun, label: 'UV-stabilised for outdoor use', wrap: 'bg-amber-100 text-amber-700' },
  { icon: Truck, label: 'Free delivery nationwide', wrap: 'bg-emerald-100 text-emerald-700' },
]

const faqs = [
  {
    q: 'Are these genuine Roto tanks?',
    a: 'Yes. Every tank is a Roto Moulders product, made in Kenya, with the Roto mark moulded into the wall. Check the logo, ribs and finish on delivery.',
  },
  {
    q: 'Are the prices current?',
    a: 'Yes. Prices match the current Roto Tanks Kenya shop, VAT included. Confirm stock on WhatsApp before paying, as lists can move.',
  },
  {
    q: 'Do you charge for delivery?',
    a: 'No. Delivery is free to all 47 counties. The price on the tank is what you pay.',
  },
]

export default function Home() {
  const featured = products.filter((p) => p.featured)

  useEffect(() => {
    if (window.location.hash === '#delivery') {
      document.getElementById('delivery')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <main>
      <section className="relative isolate min-h-[34rem] overflow-hidden sm:min-h-[40rem]">
        <img
          src="/images/farm.jpeg"
          alt="Roto tank on a Kenyan farm"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-cyan-800/50 to-amber-500/25" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sun">
              Genuine Roto · Kenya
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.08]">
              Water tanks built for this country.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-white/80">
            Genuine Roto prices, VAT included, with free delivery across Kenya. Vertical,
              underground, loft and septic tanks. Pay with M-Pesa or WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-bold text-ink hover:bg-sun-dark"
              >
                Shop tanks
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                About Roto
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm rounded-[2rem] bg-gradient-to-br from-sun via-white to-cyan-100 p-1 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
            <div className="rounded-[1.85rem] bg-white p-6">
            <img src="/images/vertical.png" alt="Roto water tank" className="mx-auto h-56 w-auto object-contain" />
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="font-semibold text-ink">5,000 litre Roto</p>
                <p className="text-sm text-mute">Kenya’s most ordered size</p>
              </div>
              <p className="text-lg font-bold text-flame">{kes(24500)}</p>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-4 sm:px-6">
          {trust.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-4 shadow-sm">
              <span className={`grid size-9 shrink-0 place-items-center rounded-full ${item.wrap}`}>
                <item.icon className="size-4" />
              </span>
              <p className="text-xs font-medium leading-5 sm:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
            <p className="mt-1 text-sm text-mute">Real Roto tanks. Pick the shape that fits the site.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className={`grid h-40 place-items-center p-5 ${TINTS[cat.id].panel}`}>
                <img src={cat.image} alt="" className="max-h-full max-w-[70%] object-contain" />
              </div>
              <div className="p-5 pt-4">
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="mt-1 text-sm leading-6 text-mute">{cat.blurb}</p>
                <p className={`mt-3 text-xs font-semibold ${TINTS[cat.id].text}`}>{cat.range}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Shop by size</h2>
              <p className="mt-1 text-sm text-white/80">Current shop prices, VAT included.</p>
            </div>
            <Link to="/shop" className="hidden text-sm font-bold text-sun sm:inline">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-flame via-orange-500 to-sun lg:grid-cols-2">
          <img src="/images/factory.png" alt="Roto septic tanks at the yard" className="h-full min-h-72 w-full object-cover" />
          <div className="px-8 py-10 text-white sm:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yellow-200">About Roto</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Made in Kenya since 1991.</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Roto Moulders builds food-grade tanks at Enterprise Road, Industrial Area,
              Nairobi. One-piece rotomoulded polyethylene, UV-stabilised for Kenyan sun,
              trusted on homes, farms and institutions across East Africa.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Read our story
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="delivery" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 sm:px-6">
        <DeliveryWidget />
      </section>

      <section className="bg-gradient-to-r from-violet-100 via-white to-amber-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Questions</h2>
            <p className="mt-2 text-sm text-mute">Short answers before you order.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className={`rounded-2xl px-5 py-4 ${
                  ['bg-blue-50', 'bg-emerald-50', 'bg-amber-50'][i]
                }`}
              >
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-mute">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
