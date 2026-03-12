import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProductFilters = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange
}) => {
    const { isHindi } = useLanguage();


    return (
        <div>
            {/* Categories */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    {isHindi ? "श्रेणियाँ" : "Categories"}
                </h4>
                <div className="space-y-2">
                    {categories.map((category) => {
                        // Handle both object (Shop page) and string (other pages) formats
                        const categoryId = typeof category === 'object' ? category.id : category;
                        const categoryName = typeof category === 'object' ? category.name : category;
                        const slug = typeof category === 'object' ? category.slug : category;

                        return (
                            <button
                                key={slug}
                                onClick={() => setSelectedCategory(slug)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === slug
                                        ? 'bg-[#e14503] text-white'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {categoryName}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    {isHindi ? "मूल्य सीमा" : "Price Range"}
                </h4>
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#e14503]"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹0</span>
                    <span className="font-semibold text-[#e14503]">₹{priceRange}</span>
                    <span>₹{priceRange}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;
