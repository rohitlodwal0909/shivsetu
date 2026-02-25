import React, { useEffect, useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import PageHeader from '../../components/common/PageHeader';
import ProductFilters from '../../components/common/ProductFilters';
import MobileFilterDrawer from '../../components/common/MobileFilterDrawer';
import ProductCard from '../../components/common/ProductCard';
import Pagination from '../../components/common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../features/shop/ProductSlice';

const Shop = () => {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(5000);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 9;

    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const dispatch = useDispatch();
    const data = useSelector((state) => state.product.shop);
    const category = data?.category || [];
    const products = data?.products || [];

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    // Dynamic Categories
    const categories = [
        { id: 'All', name: 'All' },
        ...category.map((cat) => ({
            id: cat.name,
            name: cat.name
        }))
    ];

    // Filter Logic
    const filteredProducts = products.filter((product) => {
        const categoryMatch =
            selectedCategory === 'All' ||
            product.category?.name === selectedCategory;

        const priceMatch = product.price <= priceRange;

        return categoryMatch && priceMatch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, priceRange]);

    return (
        <div className="min-h-screen bg-gray-50">

            <PageHeader
                title="Shop All Products"
                subtitle="Discover our complete collection"
                breadcrumb={[{ label: "Shop", link: "/shop" }]}
            />

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Mobile Filter */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-[#e14503] hover:text-[#e14503] transition-colors shadow-sm"
                    >
                        <FaList /> Filters & Categories
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Filters
                            </h3>

                            <ProductFilters
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                            />
                        </div>
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-3">

                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{currentProducts.length}</span> of <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                            </p>
                        </div>

                        <div className="grid gap-3 md:gap-6 grid-cols-2 xl:grid-cols-3">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    addToCart={addToCart}
                                    toggleWishlist={toggleWishlist}
                                    isInWishlist={isInWishlist}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                                <p className="text-gray-600 text-lg">
                                    No products found matching your filters.
                                </p>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Shop;