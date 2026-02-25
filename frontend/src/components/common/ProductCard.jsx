import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEye, FaStar } from 'react-icons/fa';
import SafeImage from './SafeImage';

const ProductCard = ({ product, isHindi, addToCart, toggleWishlist, isInWishlist }) => {
    return (
        <div className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
            <Link to={`/product/${product.slug}`} className="block h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <SafeImage
                        src={product.image}
                        type={"products/"}
                        alt={product.product_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Discount Badge */}
                    {product.discount_percent && (
                        <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#e14503] text-white px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold shadow-md z-10">
                            -{product.discount_percent}%
                        </div>
                    )}

                    {/* Mobile Wishlist Button - Visible ONLY on Mobile */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                        }}
                        className="lg:hidden absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-gray-600 shadow-sm z-30 transition-colors active:scale-95"
                    >
                        <FaHeart className={isInWishlist(product.id) ? "text-[#e14503]" : ""} />
                    </button>

                    {/* Desktop Hover Overlay - Hidden on Mobile */}
                    <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                        {/* Product Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-[#e14503] text-sm font-semibold mb-1">
                                {product.category.name}
                            </p>
                            <h3 className="text-white text-xl font-bold mb-3">
                                {product.product_name}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-sm ${i < Math.floor(product?.rating || 5) ? 'text-yellow-400' : 'text-gray-400'}`}
                                    />
                                ))}
                                <span className="text-white text-sm ml-1">({product?.rating|| 5})</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-white text-2xl font-bold">₹{product.price}</span>
                                {product.mrp && (
                                    <span className="text-gray-300 text-lg line-through">₹{product.mrp}</span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleWishlist(product);
                                    }}
                                    className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${isInWishlist(product.id)
                                        ? 'bg-[#e14503] text-white'
                                        : 'bg-white/20 text-white hover:bg-white hover:text-[#e14503]'
                                        } backdrop-blur-sm`}
                                >
                                    <FaHeart className="inline mr-2" />
                                    {isInWishlist(product.id)
                                        ? (isHindi ? 'सेव्ड' : 'Saved')
                                        : (isHindi ? 'सेव करें' : 'Save')}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToCart(product);
                                    }}
                                    className="flex-1 bg-[#e14503] text-white py-3 rounded-lg font-semibold hover:bg-[#c23a02] transition-colors duration-300"
                                >
                                    <FaShoppingCart className="inline mr-2" />
                                    {isHindi ? 'कार्ट में जोड़ें' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>

                        {/* Quick View Icon */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 p-4 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#e14503] hover:text-white shadow-xl">
                            <FaEye className="text-xl" />
                        </div>
                    </div>
                </div>

                {/* Mobile Details - Visible ONLY on Mobile */}
                <div className="block lg:hidden p-2 md:p-3 bg-white">
                    <p className="text-gray-500 text-[9px] md:text-[10px] font-medium mb-0.5 uppercase tracking-wide truncate">
                        {product.category.name}
                    </p>
                    <h3 className="text-gray-900 text-xs md:text-sm font-semibold mb-1 line-clamp-2 leading-tight min-h-[2rem] md:min-h-[2.5rem]">
                        {product.product_name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5 mb-1.5">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`text-[8px] md:text-[10px] ${i < Math.floor(product?.rating || 5) ? 'text-yellow-400' : 'text-gray-200'}`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-400 text-[9px] md:text-[10px] ml-0.5">({product?.rating || 5})</span>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                        <div className="flex flex-col">
                            <span className="text-gray-900 text-sm md:text-lg font-bold">₹{product?.price}</span>
                            {product.mrp && (
                                <span className="text-gray-400 text-[10px] md:text-xs line-through">₹{product.mrp}</span>
                            )}
                        </div>

                        {/* Add to Cart Icon for Mobile */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-[#e14503]/10 text-[#e14503] hover:bg-[#e14503] hover:text-white transition-all active:scale-95"
                        >
                            <FaShoppingCart className="text-xs md:text-sm" />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
