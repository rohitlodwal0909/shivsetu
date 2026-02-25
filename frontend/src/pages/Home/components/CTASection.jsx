import React from 'react';
import { Link } from 'react-router-dom';
import SafeImage from '../../../components/common/SafeImage';

const CTASection = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-content">
                    <h2 className="cta-title">Get 20% Off Your First Order</h2>
                    <p className="cta-description">
                        Join our newsletter and receive exclusive offers, fashion tips, and early access to new collections
                    </p>

                    <div className="cta-form">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="cta-input"
                        />
                        <button className="cta-button">
                            Subscribe Now
                        </button>
                    </div>

                    <p className="cta-note">
                        *Offer valid on orders above $50. Terms and conditions apply.
                    </p>
                </div>

                <div className="cta-image-wrapper">
                    <SafeImage
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80"
                        alt="Fashion Collection"
                        className="cta-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default CTASection;
