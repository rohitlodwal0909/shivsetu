import React from 'react';

const Filters = ({ selectedCategory, onCategoryChange, priceRange, onPriceChange }) => {
    const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty'];

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Filters</h3>

            {/* Category Filter */}
            <div className="mb-8">
                <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase">Category</h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center cursor-pointer group">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={() => onCategoryChange(category)}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-3 text-slate-400 group-hover:text-white transition-colors">
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase">Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange}
                    onChange={(e) => onPriceChange(e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2">
                    <span className="text-slate-400 text-sm">$0</span>
                    <span className="text-white font-semibold">${priceRange}</span>
                </div>
            </div>
        </div>
    );
};

export default Filters;
