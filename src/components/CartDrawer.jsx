import { Minus, Plus, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { kes } from '../lib/money'
import ProductPhoto from './ProductPhoto'

export default function CartDrawer() {
  const { items, subtotal, open, setOpen, setQty, remove } = useCart()

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="absolute inset-0 bg-ink/30"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-line bg-gradient-to-r from-sun/40 via-white to-cyan-100 px-5 py-4">
          <h2 className="text-base font-semibold">Cart</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-full hover:bg-ice"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="pt-8 text-sm text-mute">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-ice p-1">
                    <ProductPhoto product={item.product} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-mute hover:text-ink"
                        aria-label="Remove"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-sm text-mute">{kes(item.product.price)}</p>
                    <div className="mt-2 inline-flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        className="grid size-8 place-items-center"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        className="grid size-8 place-items-center"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line p-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-mute">Subtotal</span>
            <span className="font-semibold">{kes(subtotal)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            className={`block rounded-full bg-flame py-3 text-center text-sm font-semibold text-white hover:bg-red-700 ${
              items.length === 0 ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>,
    document.body,
  )
}
