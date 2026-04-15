import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { getCategory } from '../../features/shop/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_URL } from '../../utils/constants';

const Categories = () => {

     const dispatch = useDispatch();

    const categories = useSelector((state) => state.product.category) || [];
 
    useEffect(() => {
    dispatch(getCategory())
    },[dispatch])

    console.log(categories)

    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">Shop by Category</h1>
                    <p className="text-xl text-gray-600">Explore our wide range of products</p>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/shop?category=${category.slug}`}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#e14503] hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={IMAGE_URL + "categories/" + category.icon}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                                {/* Overlay Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h2 className="text-3xl font-bold text-white mb-2">{category.name}</h2>
                                    <p className="text-white/90 text-sm">{category.description}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">Available Products</p>
                                        <p className="text-2xl font-bold text-gray-900">{category.product_count}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-[#e14503] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FaArrowRight className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
