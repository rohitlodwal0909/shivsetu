import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';
import MobileBanner from './mobile/MobileBanner';

const BannerSlider = ({ sliders = [] }) => {
    const localSliders = [
        {
            id: 1,
            image: '/banners/banner1.jpeg',
            title: 'Banner 1',
            ctaLink: '/shop'
        },
        {
            id: 2,
            image: '/banners/banner2.jpeg',
            title: 'Banner 2',
            ctaLink: '/puja'
        },
        {
            id: 3,
            image: '/banners/banner3.jpeg',
            title: 'Banner 3',
            ctaLink: '/darshan'
        }
    ];

    const slidesToRender = localSliders;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesToRender.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slidesToRender.length) % slidesToRender.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (!isAutoPlaying || slidesToRender.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesToRender.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slidesToRender.length]);

    if (!slidesToRender.length) return null;

    return (
        <>
            {/* Mobile Banner */}
            <MobileBanner slides={slidesToRender} />

            {/* Desktop Banner */}
            <div
                className="banner-slider hidden md:block"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                <div className="slider-wrapper">
                    {slidesToRender.map((slide, index) => {
                        const isActive = index === currentSlide;
                        const slideClass = isActive
                            ? 'slide active'
                            : `slide ${index < currentSlide ? 'prev' : 'next'}`;

                        return (
                            <div key={slide.id || index} className={slideClass}>
                                <div className="slide-image">
                                    <SafeImage
                                        src={slide.image}
                                        type="sliders/"
                                        alt="banner"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <button
                    type="button"
                    className="slider-nav prev hidden md:flex"
                    onClick={prevSlide}
                >
                    <FaChevronLeft />
                </button>

                <button
                    type="button"
                    className="slider-nav next hidden md:flex"
                    onClick={nextSlide}
                >
                    <FaChevronRight />
                </button>

                {/* Dots */}
                <div className="slider-dots">
                    {slidesToRender.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default BannerSlider;