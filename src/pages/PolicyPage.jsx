import React from 'react';
import { useLocation } from 'react-router-dom';

const PolicyPage = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);
    const title = path.charAt(0).toUpperCase() + path.slice(1);

    return (
        <div className="container" style={{ padding: '4rem 2rem', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-secondary)' }}>{title}</h1>
            <div style={{ lineHeight: '1.8', color: '#4b5563' }}>
                <p style={{ marginBottom: '1rem' }}>
                    Welcome to the {title} page for BakeMyHeart. This is a placeholder for our official {title.toLowerCase()} document.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                    At BakeMyHeart, we are committed to transparency and providing clear information to our customers. Our actual {title.toLowerCase()} policy will be detailed here shortly.
                </p>
                <p>
                    If you have any immediate questions regarding our {title.toLowerCase()}, please feel free to contact us via the information provided on our About Us page.
                </p>
            </div>
        </div>
    );
};

export default PolicyPage;
