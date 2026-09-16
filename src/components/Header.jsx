import { Menu, MessageCircle, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { WHATSAPP_NUMBER } from '../data/counties'
import { CATEGORIES } from '../data/products'

const nav = [
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/#delivery', label: 'Delivery' },
]

export default function Header() {
  const { count, setOpen } = useCart()
  const [menu, setMenu] = useState(false)

  return (
    <header className="sticky top-0 z-40">
      <div className="h-1.5 bg-gradient-to-r from-sun via-flame to-brand" />
      <div className="border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex items-baseline gap-1.5" onClick={() => setMenu(false)}>
          <span className="text-[1.15rem] font-extrabold tracking-tight text-ink">Roto</span>
          <span className="text-[1.15rem] font-semibold tracking-tight text-flame">Tanks</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-mute md:flex">
          {nav.map((item) =>
            item.to.startsWith('/#') ? (
              <a key={item.to} href={item.to} className="hover:text-brand">
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'font-semibold text-flame' : 'hover:text-brand')}
              >
                {item.label}
              </NavLink>
            ),
          )}
          <div className="group relative">
            <span className="cursor-default hover:text-ink">Categories</span>
            <div className="invisible absolute left-1/2 top-full z-20 w-56 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-line bg-white p-2 shadow-lg shadow-ink/5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.id}`}
                    className="block rounded-xl px-3 py-2.5 text-ink hover:bg-ice"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-mpesa px-3 py-2 text-sm font-semibold text-white hover:bg-mpesa-dark sm:inline-flex"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative inline-flex size-10 items-center justify-center rounded-full hover:bg-ice"
            aria-label="Open cart"
          >
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-flame px-1 text-[10px] font-bold leading-4 text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-ice md:hidden"
            onClick={() => setMenu((v) => !v)}
            aria-label="Menu"
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      </div>

      {menu && (
        <div className="border-t border-line bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1 text-sm font-medium">
            {nav.map((item) =>
              item.to.startsWith('/#') ? (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setMenu(false)}
                  className="rounded-xl px-3 py-3 hover:bg-ice"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenu(false)}
                  className="rounded-xl px-3 py-3 hover:bg-ice"
                >
                  {item.label}
                </Link>
              ),
            )}
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                onClick={() => setMenu(false)}
                className="rounded-xl px-3 py-3 text-mute hover:bg-ice"
              >
                {cat.name} tanks
              </Link>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-3 py-3 font-semibold text-mpesa"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
