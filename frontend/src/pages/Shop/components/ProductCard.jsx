import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import Button from '../../../components/common/Button';
import SafeImage from '../../../components/common/SafeImage';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="card-hover bg-slate-800 border border-slate-700 rounded-xl overflow-hidden group relative">
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-900/80 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors">
                    <FaHeart className="text-white" />
                </button>

                <div className="relative h-64 overflow-hidden">
                    <SafeImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.discount && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            -{product.discount}%
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-slate-600'}
                                    size={14}
                                />
                            ))}
                        </div>
                        <span className="text-slate-400 text-sm ml-2">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="text-2xl font-bold text-white">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-slate-500 line-through ml-2 text-sm">
                                    ${product.originalPrice}
                                </span>
                            )}
                        </div>
                    </div>

                    <Button size="sm" className="w-full">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Link >
    );
};

export default ProductCard;
