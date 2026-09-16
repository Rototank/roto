import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products'

const STORAGE_KEY = 'roto-cart-v1'
const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadCart)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = getProduct(line.id)
          if (!product) return null
          return { ...line, product, lineTotal: product.price * line.qty }
        })
        .filter(Boolean),
    [lines],
  )

  const count = items.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)
  const litres = items.reduce((sum, item) => sum + item.product.litres * item.qty, 0)

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      litres,
      open,
      setOpen,
      add(id, qty = 1) {
        setLines((prev) => {
          const found = prev.find((line) => line.id === id)
          if (found) {
            return prev.map((line) =>
              line.id === id ? { ...line, qty: Math.min(10, line.qty + qty) } : line,
            )
          }
          return [...prev, { id, qty: Math.min(10, qty) }]
        })
        setOpen(true)
      },
      setQty(id, qty) {
        const next = Math.max(0, Math.min(10, qty))
        setLines((prev) =>
          next === 0
            ? prev.filter((line) => line.id !== id)
            : prev.map((line) => (line.id === id ? { ...line, qty: next } : line)),
        )
      },
      remove(id) {
        setLines((prev) => prev.filter((line) => line.id !== id))
      },
      clear() {
        setLines([])
      },
    }),
    [items, count, subtotal, litres, open],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
