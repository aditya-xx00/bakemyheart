import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
    return (
        <>
            <style>{`
                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                @media (min-width: 769px) {
                    .products-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 2rem;
                    }
                }
            `}</style>
            <div className="container" style={{ padding: '2rem 2rem 1rem' }}>
                <header style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    padding: '2rem 0'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        marginBottom: '1rem',
                        color: 'var(--color-secondary)'
                    }}>
                        Handcrafted Happiness
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--color-text-light)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Premium cakes baked with love and the finest ingredients for your special moments.
                    </p>
                </header>

                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
