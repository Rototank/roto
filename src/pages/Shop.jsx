import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, LITRE_FILTERS, filterProducts } from '../data/products'
import { TINTS } from '../lib/tints'

function Chip({ active, children, onClick, activeClass = 'bg-ink text-white' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
        active ? activeClass : 'border border-white/80 bg-white/80 text-mute shadow-sm hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''
  const litres = params.get('litres') || ''

  const list = useMemo(() => filterProducts({ category, litres }), [category, litres])

  function update(next) {
    const merged = { category, litres, ...next }
    const search = new URLSearchParams()
    if (merged.category) search.set('category', merged.category)
    if (merged.litres) search.set('litres', String(merged.litres))
    setParams(search)
  }

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Shop tanks</h1>
      <p className="mt-2 text-sm text-mute">Filter by type or capacity. Prices in Kenya Shillings.</p>

      <div className="mt-8 min-w-0 space-y-3">
        <div className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-full sm:px-0">
          <Chip
            active={!category}
            onClick={() => update({ category: '' })}
            activeClass="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          >
            All types
          </Chip>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.id}
              active={category === cat.id}
              onClick={() => update({ category: cat.id })}
              activeClass={TINTS[cat.id].chip}
            >
              {cat.name}
            </Chip>
          ))}
        </div>
        <div className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-full sm:px-0">
          <Chip
            active={!litres}
            onClick={() => update({ litres: '' })}
            activeClass="bg-gradient-to-r from-flame to-orange-500 text-white"
          >
            All sizes
          </Chip>
          {LITRE_FILTERS.map((size) => (
            <Chip
              key={size}
              active={Number(litres) === size}
              onClick={() => update({ litres: size })}
              activeClass="bg-sun text-ink"
            >
              {size.toLocaleString('en-KE')}L
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-mute">{list.length} tank{list.length === 1 ? '' : 's'}</p>

      {list.length === 0 ? (
        <p className="mt-10 text-sm text-mute">No tanks match those filters.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}
