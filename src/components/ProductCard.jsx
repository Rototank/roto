import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { kes, litresLabel } from '../lib/money'
import { TINTS } from '../lib/tints'
import ProductPhoto from './ProductPhoto'

export default function ProductCard({ product }) {
  const { add } = useCart()
  const tint = TINTS[product.category] || TINTS.vertical

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_8px_30px_rgba(10,37,64,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(10,37,64,0.12)]">
      <Link
        to={`/product/${product.id}`}
        className={`grid aspect-[4/3] place-items-center p-6 ${tint.panel}`}
      >
        <ProductPhoto
          product={product}
          className="max-h-full max-w-[80%] object-contain transition duration-300 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 pt-3">
        <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${tint.text}`}>
          {product.category}
        </p>
        <Link to={`/product/${product.id}`} className="mt-1 text-[15px] font-semibold leading-snug">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-mute">{litresLabel(product.litres)}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-base font-bold">{kes(product.price)}</p>
            <p className="text-[11px] text-mute">VAT included</p>
          </div>
          <button
            type="button"
            onClick={() => add(product.id)}
            className="rounded-full bg-flame px-3.5 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
