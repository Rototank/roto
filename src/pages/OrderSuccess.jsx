import { Link } from 'react-router-dom'
import { whatsappHref } from '../data/counties'
import { kes } from '../lib/money'
import { prettyPhone } from '../lib/phone'

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

  const paid = order.method === 'mpesa'

  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${paid ? 'text-mpesa' : 'text-teal'}`}>
        {paid ? 'Paid' : 'Order sent'}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        {paid ? 'Thank you' : 'We have your order'}
      </h1>
      <p className="mt-3 text-sm leading-6 text-mute">
        {paid
          ? `M-Pesa receipt ${order.id}. We will call ${prettyPhone(order.phone)} to confirm delivery to ${order.town}, ${order.county}.`
          : `Finish the WhatsApp chat so we can confirm stock and delivery to ${order.town}, ${order.county}.`}
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
        <p className="mt-2 text-xs text-mute">Delivery {order.eta?.toLowerCase()}.</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-mpesa px-5 py-3 text-sm font-semibold text-white hover:bg-mpesa-dark"
        >
          Message us
        </a>
        <Link
          to="/shop"
          className="rounded-full border border-line px-5 py-3 text-sm font-semibold hover:bg-ice"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  )
}
