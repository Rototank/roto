import { Link } from 'react-router-dom'
import { SHOP_PHONE, TEL_HREF, whatsappHref } from '../data/counties'
import { kes } from '../lib/money'

export default function OrderSuccess() {
  const raw = sessionStorage.getItem('roto-last-order')
  const order = raw ? JSON.parse(raw) : null

  if (!order) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-mute">No recent order on this device.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-brand">
          Shop tanks
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">Inquiry sent</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Finish on a call or WhatsApp</h1>
      <p className="mt-3 text-sm leading-6 text-mute">
        We confirm stock and delivery on {SHOP_PHONE}. Keep the chat open or call if we have not
        replied.
      </p>

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-5 text-left text-sm shadow-sm">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between gap-3 py-1.5">
            <span>
              {item.qty} × {item.name}
            </span>
            <span className="font-medium">{kes(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="flex justify-between gap-3 py-1.5 text-mute">
          <span>Delivery</span>
          <span>Free</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-line pt-3 font-bold">
          <span>Total</span>
          <span>{kes(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={TEL_HREF}
          className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Call us
        </a>
        <a
          href={whatsappHref()}
          className="rounded-full bg-mpesa px-5 py-3 text-sm font-semibold text-white hover:bg-mpesa-dark"
        >
          WhatsApp us
        </a>
      </div>
    </main>
  )
}
