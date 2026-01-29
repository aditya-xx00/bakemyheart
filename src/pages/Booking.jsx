import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitToWeb3Forms } from '../utils/web3forms';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialService = location.state?.serviceName || "Birthday Party Planning";
    const serviceImage = location.state?.serviceImage || "https://images.unsplash.com/photo-1544161515-4ab6ce6db48c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('bakemyheart_booking');
        return saved ? JSON.parse(saved) : {
            service: initialService,
            name: '',
            phone: '',
            date: '',
            details: ''
        };
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle, success, error

    // Persist form data to localStorage
    useEffect(() => {
        localStorage.setItem('bakemyheart_booking', JSON.stringify(formData));
    }, [formData]);

    // Update service if it comes from navigation later
    useEffect(() => {
        if (location.state?.serviceName) {
            setFormData(prev => ({ ...prev, service: location.state.serviceName }));
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const result = await submitToWeb3Forms(formData);
            if (result.success) {
                setSubmitStatus('success');
                localStorage.removeItem('bakemyheart_booking'); // Clear saved data
                setTimeout(() => {
                    navigate('/');
                }, 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <style>{`
                .booking-container {
                    padding: 4rem 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .booking-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 4rem;
                    align-items: start;
                }
                @media (max-width: 768px) {
                    .booking-container {
                        padding: 2rem 1rem !important;
                    }
                    .booking-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .booking-image-container {
                        display: none !important;
                    }
                }
            `}</style>
            <div className="booking-container">
                <div className="booking-grid">

                    {/* Left Column: Form */}
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>Book Appointment</h1>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                            Request an appointment to get a call back from our expert designers to discuss mehndi design.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Service Required</label>
                                <select
                                    value={formData.service}
                                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid #ddd', fontFamily: 'inherit' }}
                                >
                                    {/* If the current service is a specific Mehndi pattern not in the standard list, show it as the first option */}
                                    {!["Mehndi Design", "Customized Cakes", "Event Planning", "Birthday Party Planning"].includes(formData.service) && (
                                        <option value={formData.service}>{formData.service}</option>
                                    )}
                                    <option value="Birthday Party Planning">Birthday Party Planning</option>
                                    <option value="Mehndi Design">Mehndi Design</option>
                                    <option value="Customized Cakes">Customized Cakes</option>
                                    <option value="Event Planning">Event Planning</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid #ddd', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Contact</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 1234567890"
                                        required
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid #ddd', fontFamily: 'inherit' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Mehndi Date</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid #ddd', fontFamily: 'inherit' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Additional Details</label>
                                <textarea
                                    rows="4"
                                    placeholder="Any specific requirements?"
                                    value={formData.details}
                                    onChange={e => setFormData({ ...formData, details: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid #ddd', fontFamily: 'inherit', resize: 'vertical' }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || submitStatus === 'success'}
                                style={{
                                    backgroundColor: submitStatus === 'error' ? '#ef4444' : submitStatus === 'success' ? '#25D366' : '#f87171',
                                    color: 'white',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius)',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    marginTop: '1rem',
                                    opacity: (isSubmitting || submitStatus === 'success') ? 0.7 : 1,
                                    cursor: (isSubmitting || submitStatus === 'success') ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isSubmitting ? 'Requesting...' :
                                    submitStatus === 'success' ? 'Request Sent ✅' :
                                        submitStatus === 'error' ? 'Request Failed ❌' : 'Request Appointment'}
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
                                    Appointment Request Sent! We will contact you shortly. Redirecting to home...
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
                                    <p style={{ marginBottom: '0.5rem' }}>Failed to send request. Please check your connection and try again.</p>
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

                    {/* Right Column: Image */}
                    <div className="booking-image-container" style={{ height: '700px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                        <img
                            src={serviceImage}
                            alt={formData.service}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default Booking;
