import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import religiousProducts from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useLanguage } from '../../../context/LanguageContext';
import SafeImage from '../../../components/common/SafeImage';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    const [isTouch, setIsTouch] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const touch =
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0;
            setIsTouch(touch);
        }
    }, []);

    const handleCardClick = () => {
        if (isTouch) {
            setIsOverlayOpen(prev => !prev);
        }
    };

    const handleViewDetails = (e) => {
        e.stopPropagation();
        if (isTouch) {
            navigate(`/product/${product.id}`);
        }
    };

    return (
        <div
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            onClick={handleCardClick}
        >
            {/* Product Image */}
            <div className="relative h-72 overflow-hidden bg-gray-100">
                <SafeImage
                    src={product.image}
                    alt={product.nameEn || product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Discount Badge */}
                {product.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-[#e14503] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{product.discount}%
                    </div>
                )}

                {/* Hover / Tap Overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isOverlayOpen ? 'opacity-100' : ''
                        }`}
                >
                    {/* Product Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-[#e14503] text-sm font-semibold mb-1">{product.category}</p>
                        <h3 className="text-white text-lg font-bold mb-2 line-clamp-1">{product.nameEn || product.name}</h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                                />
                            ))}
                            <span className="text-white text-xs ml-1">({product.rating})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-white text-xl font-bold">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-gray-300 text-sm line-through">₹{product.originalPrice}</span>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWishlist(product);
                                }}
                                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${isInWishlist(product.id)
                                    ? 'bg-[#e14503] text-white'
                                    : 'bg-white/20 text-white hover:bg-white hover:text-[#e14503]'
                                    } backdrop-blur-sm`}
                            >
                                <FaHeart className="inline mr-1" />
                                {isInWishlist(product.id) ? 'Saved' : 'Save'}
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                                className="flex-1 bg-[#e14503] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#c23a02] transition-colors duration-300"
                            >
                                <FaShoppingCart className="inline mr-1" />
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Quick View / Details Icon */}
                    {isTouch ? (
                        <button
                            onClick={handleViewDetails}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 p-3 rounded-full font-semibold opacity-100 transition-all duration-500 hover:bg-[#e14503] hover:text-white shadow-xl"
                        >
                            <FaEye className="text-lg" />
                        </button>
                    ) : (
                        <Link
                            to={`/product/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 p-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#e14503] hover:text-white shadow-xl"
                        >
                            <FaEye className="text-lg" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

const FeaturedProducts = () => {
    const { t, isHindi } = useLanguage();
    // Use first 4 products from religious products data
    const products = religiousProducts.slice(0, 4);

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        {t('home.featuredProducts')}
                    </h2>
                </div>

                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible sm:pb-0">
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[45%] snap-center sm:min-w-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        to="/shop"
                        className="inline-block bg-[#e14503] hover:bg-[#c23a02] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                    >
                        {isHindi ? 'सभी उत्पाद देखें' : 'View All Products'}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
