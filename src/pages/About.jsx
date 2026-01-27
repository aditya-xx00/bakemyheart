import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
    return (
        <div style={{
            backgroundColor: '#fff',
            minHeight: 'calc(80vh - 70px - 250px)', // Precise adjustment for navbar and slim footer
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontFamily: 'var(--font-body)'
        }}>
            <div className="container" style={{ padding: ' 2rem' }}>
                <p >Passion se shuru kiya gaya ek brand — jahan fresh cakes aur beautiful mehndi designs banaye jaate hain with care and quality.
                </p>
            </div>
            <div className="container" style={{ padding: ' 1rem 2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '0.75rem',
                    marginTop: '1rem',
                    fontFamily: 'var(--font-heading)',                    
                    color: 'var(--color-secondary)',
                    textAlign: 'center'
                }}>
                Pure Veg Cakes
                </h1>

                <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: '#4b5563',
                    maxWidth: '850px',
                    margin: '0 auto 1rem',
                    textAlign: 'center'
                }}>
                    BakeMyHeart Prayagraj – Where Every Cake Tells a Sweet Story!
Pure Veg | Freshly Baked | Custom Designs | Best Prices
<br/>📍 Kalindipuram, Prayagraj
                </p>

            </div>
            <div className="container" style={{ padding: '0 2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '0.75rem',
                    fontFamily: 'var(--font-heading)',                    
                    color: 'var(--color-secondary)',
                    textAlign: 'center'
                }}>
                Designer Mehndi
                </h1>

                <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: '#4b5563',
                    maxWidth: '850px',
                    margin: '0 auto 1.5rem',
                    textAlign: 'center'
                }}>
                    Designer Mehndi Prayagraj – Art on Hands, Sweetness in Every Celebration ✨
                    <br/>• Different Designs • Event Specials • Best Prices
                </p>

            </div>
        </div>
    );
};
export default About;
