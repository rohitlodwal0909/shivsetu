import React from 'react';
import { Link } from 'react-router-dom';
import SafeImage from './SafeImage';

const CategoryCard = ({ image, title, productCount, link }) => {
    return (
        <Link to={link} className="block">
            <div className="card-hover bg-slate-800 border border-slate-700 rounded-xl overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                    <SafeImage
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                    <p className="text-sm text-slate-400">{productCount} Products</p>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
