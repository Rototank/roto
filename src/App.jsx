import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollTop from './components/ScrollTop'
import { CartProvider } from './context/CartContext'
import About from './pages/About'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import OrderSuccess from './pages/OrderSuccess'
import Product from './pages/Product'
import Shop from './pages/Shop'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex min-h-svh flex-col overflow-x-hidden">
          <ScrollTop />
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<OrderSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}
