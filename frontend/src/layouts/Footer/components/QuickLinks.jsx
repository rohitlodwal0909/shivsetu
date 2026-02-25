import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

const QuickLinks = () => {
    const { isHindi } = useLanguage();

    const links = {
        company: [
            { name: isHindi ? 'हमारे बारे में' : 'About Us', path: '/about' },
            { name: isHindi ? 'संपर्क करें' : 'Contact', path: '/contact' },
            { name: isHindi ? 'करियर' : 'Careers', path: '/careers' },
            { name: isHindi ? 'ब्लॉग' : 'Blog', path: '/blog' }
        ],
        shop: [
            { name: isHindi ? 'सभी उत्पाद' : 'All Products', path: '/shop' },
            { name: isHindi ? 'नए आगमन' : 'New Arrivals', path: '/shop?filter=new' },
            { name: isHindi ? 'बेस्ट सेलर' : 'Best Sellers', path: '/shop?filter=bestsellers' },
            { name: isHindi ? 'सेल' : 'Sale', path: '/shop?filter=sale' }
        ],
        support: [
            { name: isHindi ? 'सामान्य प्रश्न' : 'FAQ', path: '/faq' },
            { name: isHindi ? 'शिपिंग' : 'Shipping', path: '/shipping' },
            { name: isHindi ? 'रिटर्न' : 'Returns', path: '/returns' },
            { name: isHindi ? 'ऑर्डर ट्रैक करें' : 'Track Order', path: '/track-order' }
        ]
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                    {isHindi ? 'कंपनी' : 'Company'}
                </h3>
                <ul className="space-y-2">
                    {links.company.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className="text-slate-400 hover:text-white transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                    {isHindi ? 'शॉप' : 'Shop'}
                </h3>
                <ul className="space-y-2">
                    {links.shop.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className="text-slate-400 hover:text-white transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                    {isHindi ? 'सपोर्ट' : 'Support'}
                </h3>
                <ul className="space-y-2">
                    {links.support.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className="text-slate-400 hover:text-white transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuickLinks;
