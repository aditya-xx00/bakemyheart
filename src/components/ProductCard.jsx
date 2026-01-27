import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, cart, updateQuantity } = useCart();

    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ marginBottom: '0.4rem', fontSize: '1.1rem' }}>{product.name}</h3>
                <p style={{
                    color: 'var(--color-text-light)',
                    fontSize: '0.85rem',
                    marginBottom: '0.75rem',
                    flex: 1
                }}>
                    {product.description}
                </p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    gap: '0.5rem'
                }}>
                    <span style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: 'var(--color-primary-dark)'
                    }}>
                        {product.currency}{product.price}
                    </span>

                    {quantity > 0 ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-primary)',
                            padding: '0.4rem 0.6rem',
                            borderRadius: 'var(--radius)'
                        }}>
                            <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                style={{
                                    background: 'none',
                                    color: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 2px'
                                }}
                            >
                                <Minus size={14} />
                            </button>
                            <span style={{ fontWeight: 'bold', minWidth: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{quantity}</span>
                            <button
                                onClick={() => addToCart(product)}
                                style={{
                                    background: 'none',
                                    color: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 2px'
                                }}
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn-primary"
                            onClick={() => addToCart(product)}
                            style={{
                                padding: '0.4rem 0.75rem',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}
                        >
                            <Plus size={14} /> ADD
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
