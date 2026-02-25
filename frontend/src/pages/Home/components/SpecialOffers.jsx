import React from 'react';
import { FaShippingFast, FaTag, FaHeadset } from 'react-icons/fa';
import Button from '../../../components/common/Button';

const SpecialOffers = () => {
    const features = [
        {
            icon: <FaShippingFast className="text-4xl" />,
            title: 'Free Shipping',
            description: 'On orders over $50'
        },
        {
            icon: <FaTag className="text-4xl" />,
            title: 'Best Prices',
            description: 'Price match guarantee'
        },
        {
            icon: <FaHeadset className="text-4xl" />,
            title: '24/7 Support',
            description: 'Always here to help'
        }
    ];

    return (
        <section className="section-padding bg-slate-900">
            <div className="container">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="text-center p-8 bg-slate-800 border border-slate-700 rounded-xl hover:border-indigo-500 transition-all duration-300 card-hover"
                        >
                            <div className="text-indigo-500 mb-4 flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Special Offer Banner */}
                <div className="relative overflow-hidden rounded-2xl glass-effect p-12 text-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

                    <div className="relative z-10">
                        <h2 className="text-5xl font-bold gradient-text mb-4">
                            Season Sale!
                        </h2>
                        <p className="text-2xl text-white mb-2">Up to 50% Off</p>
                        <p className="text-slate-300 mb-8">Limited time offer on selected items</p>
                        <Button size="lg" variant="secondary">
                            Shop Sale
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
