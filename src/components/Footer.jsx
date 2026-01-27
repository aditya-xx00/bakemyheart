import { Instagram, MapPin, Phone, Mail, Cake } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <style>{`
                .footer-social-mobile {
                    display: none;
                }
                @media (max-width: 768px) {
                    .footer-brand-section {
                        display: none;
                    }
                    .footer-social-mobile {
                        display: flex !important;
                    }
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                        margin-bottom: 2rem !important;
                    }
                    .footer-main {
                        padding: 3rem 1.5rem 1.5rem !important;
                    }
                }
            `}</style>
            <footer className="footer-main" style={{
                backgroundColor: '#fff',
                color: '#333',
                padding: '0.5rem 2rem 0.75rem',
                borderTop: '1px solid #eee',
                marginTop: 'auto',
                fontFamily: 'var(--font-body)'
            }}>
                <div className="container footer-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                }}>
                    {/* Brand Section - Hidden on Mobile */}
                    <div className="footer-brand-section">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'var(--color-secondary)',
                            marginBottom: '1rem'
                        }}>
                            <Cake color="var(--color-primary)" size={28} />
                            BakeMyHeart
                        </div>
                        <p style={{
                            color: '#666',
                            lineHeight: '1.6',
                            marginBottom: '1rem',
                            maxWidth: '400px',
                            fontSize: '0.95rem'
                        }}>
                            Transforming your vision into unforgettable celebrations. We create memories that last a lifetime with elegance and creativity.
                        </p>
                        <div style={{ display: 'flex', gap: '1.25rem', color: '#888' }}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                                <Instagram size={24} />
                            </a>
                            <a href="https://wa.me/919044201220" target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#25D366'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.01 12.039a11.777 11.777 0 001.517 5.753L0 24l6.377-1.673a11.8 11.8 0 005.666 1.458h.005c6.636 0 12.039-5.403 12.04-12.039a11.761 11.761 0 00-3.418-8.475z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Contact Us Section - Always Visible */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-secondary)'
                        }}>
                            Contact Us
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#555', fontSize: '0.95rem' }}>
                            <a
                                href="https://maps.app.goo.gl/XiVQXq3Kgtasdygk8"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', textDecoration: 'none', color: 'inherit', transition: 'color 0.3s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
                            >
                                <MapPin size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>IIIT Road Kalindipuram, Prayagraj

Uttar Pradesh, India</span>
                            </a>
                            <a
                                href="tel:+919044201220"
                                style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none', color: 'inherit', transition: 'color 0.3s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
                            >
                                <Phone size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                <span>+91-9044201220</span>
                            </a>
                            <a
                                href="mailto:bakemyheart00@gmail.com"
                                style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none', color: 'inherit', transition: 'color 0.3s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
                            >
                                <Mail size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                <span>bakemyheart00@gmail.com</span>
                            </a>
                            {/* Social Icons in Contact Us - Mobile Only */}
                            <div className="footer-social-mobile" style={{ gap: '1.5rem', marginTop: '0.5rem' }}>
                                <a href="https://www.instagram.com/funzio_vibes/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#888', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                                    <Instagram size={20} />
                                    {/* <span>Instagram</span> */}
                                </a>
                                <a href="https://wa.me/919044201220" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#888', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#25D366'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.01 12.039a11.777 11.777 0 001.517 5.753L0 24l6.377-1.673a11.8 11.8 0 005.666 1.458h.005c6.636 0 12.039-5.403 12.04-12.039a11.761 11.761 0 00-3.418-8.475z" /></svg>
                                    {/* <span>WhatsApp</span> */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section accounts */}
                <div style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid #eee',
                    textAlign: 'center',
                    color: '#888',
                    fontSize: '0.85rem'
                }}>
                    &copy; {new Date().getFullYear()}  Aditya Kushwaha. All rights reserved.
                </div>
            </footer>
        </>
    );
};

export default Footer;
