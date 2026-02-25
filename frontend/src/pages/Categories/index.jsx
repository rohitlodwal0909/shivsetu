import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: 'Electronics',
            description: 'Latest gadgets and tech accessories',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
            productCount: 124,
            color: 'from-blue-500 to-indigo-600'
        },
        {
            id: 2,
            name: 'Fashion',
            description: 'Trending styles and accessories',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
            productCount: 256,
            color: 'from-pink-500 to-rose-600'
        },
        {
            id: 3,
            name: 'Sports & Fitness',
            description: 'Gear up for your workouts',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
            productCount: 85,
            color: 'from-green-500 to-emerald-600'
        },
        {
            id: 4,
            name: 'Home & Living',
            description: 'Beautiful decor and essentials',
            image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80',
            productCount: 178,
            color: 'from-orange-500 to-red-600'
        },
        {
            id: 5,
            name: 'Beauty & Care',
            description: 'Skincare and cosmetics',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
            productCount: 143,
            color: 'from-purple-500 to-violet-600'
        },
        {
            id: 6,
            name: 'Books & Media',
            description: 'Knowledge and entertainment',
            image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
            productCount: 267,
            color: 'from-yellow-500 to-amber-600'
        }
    ];

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
                            to={`/shop?category=${category.name}`}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#e14503] hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={category.image}
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
                                        <p className="text-2xl font-bold text-gray-900">{category.productCount}</p>
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
