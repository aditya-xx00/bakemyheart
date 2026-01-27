import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Package, Clock, Calendar } from 'lucide-react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('bakemyheart_orders') || '[]');
        setOrders(savedOrders);
    }, []);

    if (orders.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <Package size={64} color="#ddd" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ marginBottom: '1rem' }}>No Orders Yet</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                    Your order history is currently empty. Start shopping to see your orders here!
                </p>
                <Link to="/" className="btn-primary">Explore Cakes</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 2rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                <ArrowLeft size={20} /> Back to Home
            </Link>

            <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Order History</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {orders.map((order, index) => (
                    <div key={index} style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow-md)',
                        padding: '0.75rem',
                        borderLeft: '4px solid var(--color-primary)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.1rem' }}>Order #{order.orderId}</h3>
                                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--color-text-light)', fontSize: '0.75rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                        <Calendar size={12} /> {new Date(order.timestamp).toLocaleDateString()}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                        <Clock size={12} /> {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{
                                    backgroundColor: '#e0f2fe',
                                    color: '#0369a1',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.65rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>
                                    Confirmed
                                </span>
                                <div style={{ marginTop: '0.25rem', fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                                    ₹{order.total}
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#f9fafb', borderRadius: '6px', padding: '0.5rem 0.75rem', marginBottom: '0.5rem' }}>
                            <h4 style={{ fontSize: '0.75rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280' }}>Items</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                {order.cartItems.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span>{item.name} <span style={{ color: '#9ca3af' }}>x{item.qty}</span></span>
                                        <span>₹{item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ fontSize: '0.8rem' }}>
                            <h4 style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '0.1rem' }}>Delivery Info</h4>
                            <p style={{ color: '#4b5563' }}>{order.deliveryDate} at {order.deliveryTime}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
