import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { submitToWeb3Forms } from '../utils/web3forms';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('bakemyheart_checkout');
        return saved ? JSON.parse(saved) : {
            name: user?.name || '',
            phone: user?.phone || '',
            address: user?.address || '',
            deliveryDate: '',
            deliveryTime: ''
        };
    });

    // Persist form data to localStorage
    useEffect(() => {
        localStorage.setItem('bakemyheart_checkout', JSON.stringify(formData));
    }, [formData]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Persist Guest Details
        login(formData);

        const orderData = {
            ...formData,
            cartItems: cart.map(item => ({
                id: item.id,
                name: item.name,
                qty: item.quantity,
                price: item.price
            })),
            total: cartTotal
        };

        try {
            const result = await submitToWeb3Forms({
                ...orderData,
                subject: `New Order - ${formData.name}`,
                cartItems: JSON.stringify(orderData.cartItems) // Convert to string for better display in email
            });

            if (result.success) {
                setSubmitStatus('success');

                // Save order to history
                const orders = JSON.parse(localStorage.getItem('bakemyheart_orders') || '[]');
                orders.unshift({
                    ...orderData,
                    orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('bakemyheart_orders', JSON.stringify(orders));

                localStorage.removeItem('bakemyheart_checkout'); // Clear saved data
                setTimeout(() => {
                    clearCart();
                    navigate('/orders');
                }, 4000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                    Looks like you haven't added any delicious cakes yet.
                </p>
                <Link to="/" className="btn-primary">Browse Cakes</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 2rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                <ArrowLeft size={20} /> Continue Shopping
            </Link>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '3rem'
            }}>
                {/* Cart Items */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Your Selection</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1rem'
                    }}>
                        {cart.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '1rem',
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius)',
                                boxShadow: 'var(--shadow-sm)',
                                position: 'relative'
                            }}>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        color: '#ef4444',
                                        padding: '4px',
                                        background: 'white',
                                        borderRadius: '50%',
                                        border: 'none',
                                        cursor: 'pointer',
                                        zIndex: 1
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '120px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        marginBottom: '0.75rem'
                                    }}
                                />
                                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>{item.name}</h4>
                                <p style={{ color: 'var(--color-primary-dark)', fontWeight: 'bold', marginBottom: '0.75rem' }}>₹{item.price}</p>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: 'rgba(231, 231, 207, 0.56)',
                                    borderRadius: '20px',
                                    padding: '4px 8px',
                                    marginTop: 'auto'
                                }}>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'var(--color-primary)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '1rem'
                                        }}
                                    >-</button>
                                    <span style={{ fontSize: '0.9rem', minWidth: '20px', textAlign: 'center', color: 'var(--color-primary)', fontWeight: 'bold' }}>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'var(--color-primary)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '1rem'
                                        }}
                                    >+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span>₹{cartTotal}</span>
                    </div>
                </div>

                {/* Guest Form */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Contact Details</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid #ddd',
                                    fontFamily: 'inherit'
                                }}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid #ddd',
                                    fontFamily: 'inherit'
                                }}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.deliveryDate}
                                    onChange={e => setFormData({ ...formData, deliveryDate: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius)',
                                        border: '1px solid #ddd',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Time</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.deliveryTime}
                                    onChange={e => setFormData({ ...formData, deliveryTime: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius)',
                                        border: '1px solid #ddd',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ color: 'var(--color-text-light)', fontSize: '0.85rem', marginTop: '-1rem' }}>
                            Date & Time when you want the order
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Delivery Address</label>
                            <textarea
                                required
                                rows="3"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid #ddd',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                                placeholder="Enter full address"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSubmitting || submitStatus === 'success'}
                            style={{
                                padding: '1.25rem',
                                marginTop: '1rem',
                                opacity: (isSubmitting || submitStatus === 'success') ? 0.7 : 1,
                                backgroundColor: submitStatus === 'error' ? '#ef4444' : submitStatus === 'success' ? '#25D366' : 'var(--color-secondary)',
                                color: submitStatus === 'error' ? 'white' : 'var(--color-primary)',
                                cursor: (isSubmitting || submitStatus === 'success') ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSubmitting ? 'Placing Order...' :
                                submitStatus === 'success' ? 'Order Confirmed ✅' :
                                    submitStatus === 'error' ? 'Order Failed ❌' : 'Confirm Order'}
                        </button>

                        {submitStatus === 'success' && (
                            <div style={{
                                backgroundColor: '#ecfdf5',
                                color: '#065f46',
                                padding: '1rem',
                                borderRadius: '8px',
                                textAlign: 'center',
                                marginTop: '1rem',
                                fontWeight: '500',
                                border: '1px solid #a7f3d0'
                            }}>
                                Order placed successfully! Redirecting to orders...
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div style={{
                                backgroundColor: '#fef2f2',
                                color: '#991b1b',
                                padding: '1rem',
                                borderRadius: '8px',
                                textAlign: 'center',
                                marginTop: '1rem',
                                fontWeight: '500',
                                border: '1px solid #fecaca'
                            }}>
                                <p style={{ marginBottom: '0.5rem' }}>Order is failed ! Please check your connection and try again.</p>
                                <button
                                    type="button"
                                    onClick={() => setSubmitStatus('idle')}
                                    style={{
                                        backgroundColor: '#991b1b',
                                        color: 'white',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
