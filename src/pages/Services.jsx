import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { mehandiDesigns } from '../data/mehndi';

const Services = () => {
    const navigate = useNavigate();

    const handleBookCall = (designName) => {
        navigate('/booking', { state: { serviceName: `Mehndi Design - ${designName}` } });
    };

    return (
        <>
            <style>{`
                .mehandi-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                @media (min-width: 769px) {
                    .mehandi-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 2rem;
                    }
                }
                @media (max-width: 768px) {
                    .services-header {
                        margin-bottom: 2rem !important;
                    }
                    .service-categories {
                        gap: 1rem !important;
                        margin-bottom: 2.5rem !important;
                    }
                    .mehandi-header {
                        margin-bottom: 1.25rem !important;
                    }
                }
            `}</style>
            <div className="container" style={{ padding: '2rem 2rem 1rem' }}>
                <h1 className="services-header" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Our Services</h1>

                {/* Top Section: Service Categories */}
                <div className="service-categories" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {/* Mehndi Design Card */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FFF5E1', border: '1px solid #FFE4B5' }}>
                        <h2 style={{ marginBottom: '1rem', color: '#8B4513' }}>Mehndi Design</h2>
                        <p style={{ marginBottom: '1.5rem' }}>Exquisite patterns for your special occasions.</p>
                        <button
                            className="btn-primary"
                            style={{ backgroundColor: '#8B4513', color: 'white' }}
                            onClick={() => {
                                document.getElementById('mehandi-section').scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explore Designs
                        </button>
                    </div>

                    {/* Customized Cakes Card */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FFF0F5', border: '1px solid #FFC0CB' }}>
                        <h2 style={{ marginBottom: '1rem', color: '#C71585' }}>Customized Cakes</h2>
                        <p style={{ marginBottom: '1.5rem' }}>Delicious cakes tailored to your taste and theme.</p>
                        <button
                            className="btn-primary"
                            style={{ backgroundColor: '#C71585', color: 'white' }}
                            onClick={() => navigate('/')}
                        >
                            Order Cakes
                        </button>
                    </div>
                </div>

                {/* Bottom Section: Mehndi Design Grid */}
                <div id="mehandi-section">
                    <h2 className="mehandi-header" style={{ marginBottom: '2rem', textAlign: 'center', color: '#8B4513' }}>Mehndi Patterns</h2>
                    <div className="mehandi-grid">
                        {mehandiDesigns.map(design => (
                            <div key={design.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ height: '250px', overflow: 'hidden' }}>
                                    <img
                                        src={design.image}
                                        alt={design.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{design.name}</h3>
                                    <p style={{
                                        color: 'var(--color-text-light)',
                                        fontSize: '0.9rem',
                                        marginBottom: '1rem',
                                        flex: 1
                                    }}>
                                        {design.description}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 'auto'
                                    }}>
                                        <span style={{
                                            color: 'var(--color-primary-dark)',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold'
                                        }}>
                                            ₹{design.price}
                                        </span>
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleBookCall(design.name)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                backgroundColor: '#25D366', // WhatsApp/Phone Green
                                                color: 'white',
                                                padding: '0.75rem 1rem'
                                            }}
                                        >
                                            <Phone size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
