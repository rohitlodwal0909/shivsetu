import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';
import { IMAGE_URL } from '../../../utils/constants';

const PremiumCategories = ({categories}) => {
    const [startIndex, setStartIndex] = useState(0);

    // const categories = [
    //     {
    //         id: 1,
    //         name: "Women's Fashion",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=women",
    //     },
    //     {
    //         id: 2,
    //         name: "Men's Collection",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=men",
    //     },
    //     {
    //         id: 3,
    //         name: "Accessories",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=accessories",
    //     },
    //     {
    //         id: 4,
    //         name: "Footwear",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=footwear",
    //     },
    //     {
    //         id: 5,
    //         name: "Ethnic Wear",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=ethnic",
    //     },
    //     {
    //         id: 6,
    //         name: "Jewelry",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=jewelry",
    //     },
    //     {
    //         id: 7,
    //         name: "Home Decor",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=decor",
    //     },
    //     {
    //         id: 8,
    //         name: "Spiritual",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=spiritual",
    //     },
    //     {
    //         id: 9,
    //         name: "Beauty & Care",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=beauty",
    //     },
    //     {
    //         id: 10,
    //         name: "Kids Fashion",
    //         image: '/Images/Product/Placeholder.jpg',
    //         link: "/shop?category=kids",
    //     }
    // ];


    const [itemsVisible, setItemsVisible] = useState(8);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsVisible(3);
            } else if (window.innerWidth < 1024) {
                setItemsVisible(5);
            } else {
                setItemsVisible(8);
            }
        };


        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setStartIndex((prev) => (prev + 1) % categories.length);
    };

    const prevSlide = () => {
        setStartIndex((prev) => (prev - 1 + categories.length) % categories.length);
    };

    return (

        <section className="premium-categories bg-gradient-to-b from-white to-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-6 font-ibm">
                 
                   <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                        Shop by Category
                    </h2>
                   
                </div>

                <div className="relative">
                    {/* Desktop Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-800 hover:bg-[#e14503] hover:text-white transition-all transform hover:scale-110"
                        aria-label="Previous category"
                    >
                        <FaChevronLeft className="text-lg" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-800 hover:bg-[#e14503] hover:text-white transition-all transform hover:scale-110"
                        aria-label="Next category"
                    >
                        <FaChevronRight className="text-lg" />
                    </button>


                    {/* Mobile View: Native Scroll */}
                    <div className="md:hidden flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
                        {categories?.map((category) => (
                            <Link
                                key={category.id}
                                to={`/shop?category=${encodeURIComponent(category.slug)}`}                               
                                className="flex-shrink-0
                                 w-24 flex flex-col items-center gap-2 snap-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                                    <SafeImage
                                        src={category.icon}
                                        type="categories/"
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop View: Carousel */}
                    <div className="hidden md:block overflow-hidden">
                        <div
                            className="flex gap-6 transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${(startIndex * (100 / itemsVisible))}%)`
                            }}
                        >
                            {categories?.map((category, index) => (
                                <Link
                                    key={`${category.id}-${index}`}
                                to={`/shop?category=${encodeURIComponent(category.slug)}`}                               
                                    className="group flex-shrink-0"
                                    style={{ width: `calc((100% - ${(itemsVisible - 1)} * 1.5rem) / ${itemsVisible})` }}
                                >
                                    <div className="flex flex-col items-center gap-3">

                                        <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300">
                                            <SafeImage
                                                src={category.icon}
                                                type={'categories/'}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                        </div>


                                        <h3 className="text-center text-sm font-semibold text-gray-800 group-hover:text-[#e14503] transition-colors duration-300">
                                            {category.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PremiumCategories;
