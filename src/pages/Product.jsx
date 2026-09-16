import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductPhoto from '../components/ProductPhoto'
import { useCart } from '../context/CartContext'
import { categoryById, getProduct, relatedProducts } from '../data/products'
import { kes, litresLabel } from '../lib/money'
import { TINTS } from '../lib/tints'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-mute">That tank is not in the catalogue.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-brand">
          Back to shop
        </Link>
      </main>
    )
  }

  const related = relatedProducts(product)
  const category = categoryById[product.category]
  const tint = TINTS[product.category] || TINTS.vertical

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-mute">
        <Link to="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-ink">
          {category?.name}
        </Link>
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className={`grid aspect-square place-items-center overflow-hidden rounded-[2rem] p-8 ${tint.panel}`}>
          <ProductPhoto product={product} className="max-h-full max-w-[85%] object-contain" />
        </div>
        <div className="lg:pt-6">
          <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${tint.text}`}>
            {category?.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold text-flame">{kes(product.price)}</p>
          <p className="mt-1 text-xs text-mute">VAT included. Free delivery nationwide.</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-mute">
            Genuine Roto tank, rotomoulded in Kenya. Food-grade, UV-stabilised polyethylene
            built for local sun, soil and water. {product.bestFor}.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-blue-100 px-4 py-3">
              <dt className="text-blue-800">Capacity</dt>
              <dd className="mt-1 font-semibold">{litresLabel(product.litres)}</dd>
            </div>
            <div className="rounded-2xl bg-amber-100 px-4 py-3">
              <dt className="text-amber-800">Footprint</dt>
              <dd className="mt-1 font-semibold">{product.diameter}</dd>
            </div>
            <div className="rounded-2xl bg-teal-100 px-4 py-3">
              <dt className="text-teal-800">Height</dt>
              <dd className="mt-1 font-semibold">{product.height}</dd>
            </div>
            <div className="rounded-2xl bg-violet-100 px-4 py-3">
              <dt className="text-violet-800">Best for</dt>
              <dd className="mt-1 font-semibold">{product.bestFor}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-line">
              <button
                type="button"
                className="grid size-11 place-items-center"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                className="grid size-11 place-items-center"
                onClick={() => setQty((n) => Math.min(10, n + 1))}
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => add(product.id, qty)}
              className="rounded-full bg-flame px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight">More {category?.name.toLowerCase()} tanks</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
