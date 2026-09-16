import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import { useCart } from '../context/CartContext'
import { COUNTIES, whatsappHref } from '../data/counties'
import { quoteDelivery } from '../lib/delivery'
import { kes } from '../lib/money'
import { normalizeKePhone, prettyPhone } from '../lib/phone'

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
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    county: 'Nairobi',
    town: '',
    notes: '',
    method: 'mpesa',
  })
  const [error, setError] = useState('')
  const [stk, setStk] = useState(null)

  const quote = useMemo(
    () => quoteDelivery({ county: form.county }),
    [form.county],
  )
  const total = subtotal

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError('')
  }

  function validate() {
    if (items.length === 0) return 'Your cart is empty.'
    if (!form.name.trim()) return 'Enter your name.'
    if (!normalizeKePhone(form.phone)) return 'Enter a valid Kenyan phone number.'
    if (!form.town.trim()) return 'Enter your town or estate.'
    return ''
  }

  function orderPayload(method, extra = {}) {
    const phone = normalizeKePhone(form.phone)
    return {
      id: extra.receipt || `RT-${Date.now().toString().slice(-8)}`,
      name: form.name.trim(),
      phone,
      county: form.county,
      town: form.town.trim(),
      notes: form.notes.trim(),
      method,
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
      ...extra,
    }
  }

  function saveAndGo(order) {
    sessionStorage.setItem('roto-last-order', JSON.stringify(order))
    clear()
    navigate('/order')
  }

  function whatsappText(order) {
    const lines = [
      `Hello Roto Tanks Kenya, I would like to order:`,
      '',
      ...order.items.map(
        (item) => `• ${item.qty} × ${item.name} — ${kes(item.price * item.qty)}`,
      ),
      '',
      `Subtotal: ${kes(order.subtotal)}`,
      `Delivery to ${order.town}, ${order.county}: Free`,
      `Total: ${kes(order.total)}`,
      '',
      `Name: ${order.name}`,
      `Phone: ${prettyPhone(order.phone)}`,
    ]
    if (order.notes) lines.push(`Notes: ${order.notes}`)
    return lines.join('\n')
  }

  function onWhatsApp(e) {
    e.preventDefault()
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    const order = orderPayload('whatsapp')
    const url = whatsappHref(whatsappText(order))
    const opened = window.open(url, '_blank', 'noopener')
    if (!opened) window.location.assign(url)
    saveAndGo(order)
  }

  function onMpesa(e) {
    e.preventDefault()
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    const phone = normalizeKePhone(form.phone)
    setStk({ status: 'sending', phone })
    window.setTimeout(() => {
      const receipt = `QK${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      setStk({ status: 'paid', phone, receipt })
      window.setTimeout(() => {
        saveAndGo(orderPayload('mpesa', { receipt }))
      }, 900)
    }, 2200)
  }

  if (items.length === 0 && !stk) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold">Cart is empty</h1>
        <p className="mt-2 text-sm text-mute">Add a tank before checking out.</p>
        <Link to="/shop" className="mt-6 inline-block text-sm font-semibold text-brand">
          Browse tanks
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <p className="mt-2 text-sm text-mute">Pay with M-Pesa or send the order on WhatsApp.</p>

      <form className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]" onSubmit={form.method === 'mpesa' ? onMpesa : onWhatsApp}>
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold">Your details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="Phone (M-Pesa / WhatsApp)">
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
                <Field label="Delivery notes (optional)">
                  <textarea
                    className={`${inputClass} min-h-24 resize-y`}
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Gate, plot number, offloading notes"
                  />
                </Field>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  id: 'mpesa',
                  title: 'M-Pesa',
                  body: 'We send an STK prompt to your phone.',
                  selected: 'border-mpesa bg-emerald-50',
                },
                {
                  id: 'whatsapp',
                  title: 'WhatsApp',
                  body: 'Send the order and we confirm on chat.',
                  selected: 'border-teal bg-cyan-50',
                },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => set('method', method.id)}
                  className={`rounded-2xl border px-4 py-4 text-left ${
                    form.method === method.id ? method.selected : 'border-line bg-white'
                  }`}
                >
                  <p className={`font-semibold ${form.method === method.id && method.id === 'mpesa' ? 'text-mpesa' : ''}`}>
                    {method.title}
                  </p>
                  <p className="mt-1 text-sm text-mute">{method.body}</p>
                </button>
              ))}
            </div>
            {form.method === 'mpesa' && (
              <p className="mt-4 text-sm leading-6 text-mute">
                A prompt will go to your phone for {kes(total)}. Enter your M-Pesa PIN to complete.
              </p>
            )}
          </section>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            className={`w-full rounded-full py-3.5 text-sm font-semibold text-white sm:w-auto sm:px-8 ${
              form.method === 'mpesa' ? 'bg-mpesa hover:bg-mpesa-dark' : 'bg-teal hover:opacity-90'
            }`}
          >
            {form.method === 'mpesa' ? 'Pay with M-Pesa' : 'Send on WhatsApp'}
          </button>
        </div>

        <aside className="h-fit rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white shadow-lg sm:p-6">
          <h2 className="font-semibold">Order</h2>
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
        </aside>
      </form>

      {stk &&
        createPortal(
          <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/40 px-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center">
              {stk.status === 'sending' ? (
                <>
                  <div className="mx-auto size-12 animate-spin rounded-full border-2 border-line border-t-mpesa" />
                  <h2 className="mt-5 text-lg font-semibold">Sending M-Pesa prompt</h2>
                  <p className="mt-2 text-sm text-mute">
                    Check {prettyPhone(stk.phone)} and enter your PIN.
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto grid size-12 place-items-center rounded-full bg-mpesa text-lg text-white">
                    ✓
                  </div>
                  <h2 className="mt-5 text-lg font-semibold">Payment received</h2>
                  <p className="mt-2 text-sm text-mute">Receipt {stk.receipt}</p>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </main>
  )
}
