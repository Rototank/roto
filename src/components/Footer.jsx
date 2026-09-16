import { Link } from 'react-router-dom'
import { SHOP_PHONE, WHATSAPP_NUMBER } from '../data/counties'
import { CATEGORIES } from '../data/products'

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="h-1.5 bg-gradient-to-r from-sun via-flame to-brand" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-extrabold tracking-tight">
            Roto <span className="font-semibold text-sun">Tanks</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Food-grade, UV-stabilised water and septic tanks delivered across Kenya.
            Enterprise Road, Industrial Area, Nairobi.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-sun">Shop</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/shop?category=${cat.id}`} className="hover:text-white">
                {cat.name}
              </Link>
            ))}
            <Link to="/shop" className="hover:text-white">
              All tanks
            </Link>
            <Link to="/about" className="hover:text-white">
              About
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-sun">Contact</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white">
              {SHOP_PHONE}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              WhatsApp orders
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/50 sm:px-6">
          Prices include VAT and free nationwide delivery. Confirm stock before payment.
          Plumbing and installation are not included.
        </p>
      </div>
    </footer>
  )
}
