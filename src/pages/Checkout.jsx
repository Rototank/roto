import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import { useCart } from '../context/CartContext'
import { COUNTIES, SHOP_PHONE, TEL_HREF, whatsappHref } from '../data/counties'
import { quoteDelivery } from '../lib/delivery'
import { kes } from '../lib/money'
import { prettyPhone, normalizeKePhone } from '../lib/phone'

function Field({ label, children }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

const inputClass =
  'w-full rounded-2xl border border-line bg-white px-3 py-3 outline-none focus:border-brand'

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    county: 'Nairobi',
    town: '',
    notes: '',
  })

  const quote = useMemo(
    () => quoteDelivery({ county: form.county }),
    [form.county],
  )
  const total = subtotal

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function inquiryText() {
    const lines = ['Hello Roto Tanks Kenya, I would like to inquire and place an order.']
    if (items.length > 0) {
      lines.push('', ...items.map((item) => `• ${item.qty} × ${item.product.name} — ${kes(item.lineTotal)}`))
      lines.push('', `Total: ${kes(total)}`, `Delivery to ${form.town || form.county}: Free`)
    }
    if (form.name.trim()) lines.push('', `Name: ${form.name.trim()}`)
    const phone = normalizeKePhone(form.phone)
    if (phone) lines.push(`Phone: ${prettyPhone(phone)}`)
    if (form.town.trim()) lines.push(`Town: ${form.town.trim()}, ${form.county}`)
    if (form.notes.trim()) lines.push(`Notes: ${form.notes.trim()}`)
    return lines.join('\n')
  }

  function onWhatsApp() {
    const text = inquiryText()
    if (items.length > 0) {
      sessionStorage.setItem(
        'roto-last-order',
        JSON.stringify({
          id: `RT-${Date.now().toString().slice(-8)}`,
          name: form.name.trim(),
          phone: normalizeKePhone(form.phone) || '',
          county: form.county,
          town: form.town.trim(),
          method: 'whatsapp',
          items: items.map((item) => ({
            id: item.id,
            name: item.product.name,
            qty: item.qty,
            price: item.product.price,
          })),
          subtotal,
          delivery: 0,
          eta: quote?.eta,
          total,
        }),
      )
      clear()
    }
    window.location.assign(whatsappHref(text))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Place an order</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-mute">
        Call or WhatsApp {SHOP_PHONE} to inquire and place your order. We confirm stock
        and delivery on that number.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={TEL_HREF}
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Call {SHOP_PHONE}
        </a>
        <button
          type="button"
          onClick={onWhatsApp}
          className="inline-flex items-center justify-center rounded-full bg-mpesa px-6 py-3.5 text-sm font-semibold text-white hover:bg-mpesa-dark"
        >
          WhatsApp {SHOP_PHONE}
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold">Your details (optional)</h2>
          <p className="mt-1 text-sm text-mute">Added to the WhatsApp message if you fill them in.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                autoComplete="name"
              />
            </Field>
            <Field label="Your phone">
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="07xx xxx xxx"
                inputMode="tel"
                autoComplete="tel"
              />
            </Field>
            <Field label="County">
              <select
                className={inputClass}
                value={form.county}
                onChange={(e) => set('county', e.target.value)}
              >
                {COUNTIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Town / estate">
              <input
                className={inputClass}
                value={form.town}
                onChange={(e) => set('town', e.target.value)}
                placeholder="e.g. Ruiru, Nyali, Milimani"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes (optional)">
                <textarea
                  className={`${inputClass} min-h-24 resize-y`}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Gate, plot number, questions"
                />
              </Field>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white shadow-lg sm:p-6">
          <h2 className="font-semibold">Order</h2>
          {items.length === 0 ? (
            <p className="mt-4 text-sm text-white/80">
              Your cart is empty. Call or WhatsApp to inquire, or{' '}
              <Link to="/shop" className="font-semibold text-sun underline">
                browse tanks
              </Link>
              .
            </p>
          ) : (
            <>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center overflow-hidden rounded-xl bg-white p-1">
                      <ProductPhoto product={item.product} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-white/70">× {item.qty}</p>
                    </div>
                    <p className="text-sm font-medium">{kes(item.lineTotal)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-white/20 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/75">Subtotal</span>
                  <span>{kes(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/75">Delivery · {form.county}</span>
                  <span className="font-semibold text-sun">Free</span>
                </div>
                <p className="text-xs text-white/70">{quote?.eta}</p>
                <div className="flex justify-between pt-2 text-base font-bold">
                  <span>Total</span>
                  <span>{kes(total)}</span>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </main>
  )
}
