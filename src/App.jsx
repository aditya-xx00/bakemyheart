import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import About from './pages/About';
import PolicyPage from './pages/PolicyPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const location = useLocation();
  const showFooter = location.pathname === '/' || location.pathname === '/about';

  return (
    <AuthProvider>
      <CartProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1, paddingBottom: '0rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<PolicyPage />} />
              <Route path="/privacy" element={<PolicyPage />} />
              <Route path="/refunds" element={<PolicyPage />} />
            </Routes>
          </main>
          {showFooter && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
