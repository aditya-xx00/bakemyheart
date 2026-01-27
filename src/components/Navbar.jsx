import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Cake, ChevronDown, Phone, Menu, X, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleMehndiClick = (e) => {
        e.preventDefault();
        navigate('/services');
        setTimeout(() => {
            const element = document.getElementById('mehandi-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
        setShowDropdown(false);
        setMobileMenuOpen(false);
    };



    return (
        <>
            <nav style={{
                backgroundColor: 'var(--color-surface)',
                padding: '0.5rem 0',
                boxShadow: 'var(--shadow-sm)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--color-secondary)'
                    }}>
                        <Cake color="var(--color-primary)" size={28} />
                        BakeMyHeart
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="desktop-nav" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} style={{ fontWeight: 500 }}>Home</Link>
                        <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`} style={{ fontWeight: 500 }}>Services</Link>
                        <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'active' : ''}`} style={{ fontWeight: 500 }}>My Orders</Link>
                        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} style={{ fontWeight: 500 }}>About Us</Link>
                        <Link to="/checkout" className={`nav-link ${isActive('/checkout') ? 'active' : ''}`} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <ShoppingBag size={24} color="var(--color-text)" />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Icons */}
                    <div className="mobile-nav-icons" style={{ display: 'none', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/checkout" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <ShoppingBag size={24} color="var(--color-text)" />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Menu size={28} color="var(--color-text)" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Menu */}
            {mobileMenuOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999
                        }}
                    />

                    {/* Sidebar */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: '280px',
                        backgroundColor: 'white',
                        zIndex: 1000,
                        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
                        overflowY: 'auto',
                        animation: 'slideIn 0.3s ease-out'
                    }}>
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.5rem',
                            borderBottom: '1px solid #f3f4f6'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                color: 'var(--color-secondary)'
                            }}>
                                <Cake color="var(--color-primary)" size={24} />
                                BakeMyHeart
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.5rem'
                                }}
                            >
                                <X size={24} color="#6b7280" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div style={{ padding: '1rem 0' }}>
                            <Link
                                to="/"
                                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    display: 'block',
                                    padding: '1rem 1.5rem',
                                    color: isActive('/') ? 'var(--color-primary)' : '#1f2937',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    fontSize: '1rem',
                                    borderBottom: '1px solid #f3f4f6'
                                }}
                            >
                                Home
                            </Link>

                            <Link
                                to="/services"
                                className={`mobile-nav-link ${isActive('/services') ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    display: 'block',
                                    padding: '1rem 1.5rem',
                                    color: isActive('/services') ? 'var(--color-primary)' : '#1f2937',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    fontSize: '1rem',
                                    borderBottom: '1px solid #f3f4f6'
                                }}
                            >
                                Services
                            </Link>

                            <Link
                                to="/services#mehandi-section"
                                className="mobile-nav-link"
                                onClick={handleMehndiClick}
                                style={{
                                    display: 'block',
                                    padding: '1rem 1.5rem',
                                    color: '#1f2937',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    fontSize: '1rem',
                                    borderBottom: '1px solid #f3f4f6'
                                }}
                            >
                                Mehndi Design
                            </Link>

                            <Link
                                to="/orders"
                                className={`mobile-nav-link ${isActive('/orders') ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    display: 'block',
                                    padding: '1rem 1.5rem',
                                    color: isActive('/orders') ? 'var(--color-primary)' : '#1f2937',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    fontSize: '1rem',
                                    borderBottom: '1px solid #f3f4f6'
                                }}
                            >
                                My Orders
                            </Link>

                            <Link
                                to="/about"
                                className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '1rem 1.5rem',
                                    color: isActive('/about') ? 'var(--color-primary)' : '#1f2937',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    fontSize: '1rem',
                                    borderBottom: '1px solid #f3f4f6'
                                }}
                            >
                                <Info size={18} color={isActive('/about') ? 'var(--color-primary)' : 'var(--color-primary)'} />
                                About Us
                            </Link>
                        </div>
                    </div>
                </>
            )}

            {/* CSS for animations and responsive behavior */}
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-nav-icons {
                        display: flex !important;
                    }
                }

                @media (min-width: 769px) {
                    .desktop-nav {
                        display: flex !important;
                    }
                    .mobile-nav-icons {
                        display: none !important;
                    }
                }

                .nav-link {
                    transition: all 0.3s ease;
                    color: var(--color-text);
                }

                .nav-link:hover, .nav-link.active {
                    color: var(--color-primary) !important;
                    transform: translateY(-2px);
                }

                .mobile-nav-link {
                    transition: all 0.2s ease;
                }

                .mobile-nav-link:hover {
                    background-color: #f9fafb !important;
                    color: var(--color-primary) !important;
                    padding-left: 1.25rem !important;
                }
            `}</style>
        </>
    );
};

export default Navbar;
