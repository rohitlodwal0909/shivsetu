import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';
import MobileBanner from './mobile/MobileBanner';

const BannerSlider = ({ sliders = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (!isAutoPlaying || sliders.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliders.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, sliders.length]);

    if (!sliders.length) return null;

    return (
        <>
            {/* Mobile Banner */}
            <MobileBanner slides={sliders} />

            {/* Desktop Banner */}
            <div
                className="banner-slider hidden md:block"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                <div className="slider-wrapper">
                    {sliders.map((slide, index) => {
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
                    {sliders.map((_, index) => (
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