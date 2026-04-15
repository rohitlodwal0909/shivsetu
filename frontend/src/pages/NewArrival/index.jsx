import React, { useEffect, useState } from 'react';
import { FaThLarge, FaList, FaHeart, FaShoppingCart, FaEye, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import religiousProducts from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import PageHeader from '../../components/common/PageHeader';
import ProductFilters from '../../components/common/ProductFilters';
import MobileFilterDrawer from '../../components/common/MobileFilterDrawer';
import ProductCard from '../../components/common/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../features/shop/ProductSlice';

const NewArrival = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(5000);
    const [viewMode, setViewMode] = useState('grid');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { isHindi } = useLanguage();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

  const dispatch = useDispatch();
    const data = useSelector((state) => state.product.shop);
    const category = data?.category || [];
    const products = data?.products || [];

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);


    // const products = religiousProducts;


   const categories = [
        { id: 'All', name: 'All', slug: "all",
 },
        ...category.map((cat) => ({
            id: cat.name,
            name: cat.name,
            slug: cat.slug,
        }))
    ];

    const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategory == 'all' || product.category === selectedCategory;
        const priceMatch = product.price <= priceRange;
        return categoryMatch && priceMatch;
    });

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleToggleWishlist = (product) => {
        toggleWishlist(product);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            {/* Header */}
            <PageHeader
                title={isHindi ? 'नए आगमन' : 'New Arrivals'}
                subtitle={isHindi ? 'हमारे आध्यात्मिक संग्रह में नवीनतम जोड़' : 'The latest additions to our spiritual collection'}
                breadcrumb={[{ label: isHindi ? 'नए आगमन' : 'New Arrival', link: "/new-arrival" }]}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-[#e14503] hover:text-[#e14503] transition-colors shadow-sm"
                    >
                        <FaList /> {isHindi ? "फ़िल्टर और श्रेणियाँ" : "Filters & Categories"}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
                            <ProductFilters
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                            />
                        </div>
                    </div>

                    {/* Mobile Filter Drawer */}
                    <MobileFilterDrawer
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        title={isHindi ? "फ़िल्टर" : "Filters"}
                    >
                        <ProductFilters
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setPriceRange(5000);
                                    setIsFilterOpen(false);
                                }}
                                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold mb-3 hover:bg-gray-200 transition-colors"
                            >
                                {isHindi ? "साफ़ करें" : "Clear All"}
                            </button>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-[#e14503] text-white py-3 rounded-xl font-semibold hover:bg-[#c23a02] transition-colors shadow-lg shadow-orange-200"
                            >
                                {isHindi ? "परिणाम देखें" : "Show Results"}
                            </button>
                        </div>
                    </MobileFilterDrawer>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of <span className="font-semibold text-gray-900">{products.length}</span> products
                            </p>

                            {/* View Mode Toggle */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-3 rounded-lg transition-colors ${viewMode === 'grid'
                                        ? 'bg-[#e14503] text-white'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-[#e14503]'
                                        }`}
                                >
                                    <FaThLarge />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-3 rounded-lg transition-colors ${viewMode === 'list'
                                        ? 'bg-[#e14503] text-white'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-[#e14503]'
                                        }`}
                                >
                                    <FaList />
                                </button>
                            </div>
                        </div>

                        {/* Products - Matching Home Page Card Style */}
                        <div className={`grid gap-3 md:gap-6 ${viewMode === 'grid'
                            ? 'grid-cols-2 xl:grid-cols-3'
                            : 'grid-cols-1'
                            }`}>
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isHindi={isHindi}
                                    addToCart={handleAddToCart}
                                    toggleWishlist={handleToggleWishlist}
                                    isInWishlist={isInWishlist}
                                />
                            ))}
                        </div>

                        {/* No Products Found */}
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setPriceRange(5000);
                                    }}
                                    className="mt-4 bg-[#e14503] hover:bg-[#c23a02] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrival;
