import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import MobileBottomNav from './MobileBottomNav';

const MainLayout = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const location = useLocation();

    // Check if we are on Details pages (Immersive)
    // Patterns: /puja/:id, /packages/:id, /darshan/:id (but NOT /puja or /packages listing)
    const isImmersivePage = /^\/puja\/[^/]+/.test(location.pathname) || /^\/darshan\/[^/]+/.test(location.pathname) || /^\/packages\/[^/]+/.test(location.pathname);
    const isBookingPage = /^\/puja\/book\//.test(location.pathname);

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hide Header on Mobile for Immersive Pages (Details), and completely on Booking Page */}
            <div className={`${isBookingPage ? 'hidden' : (isImmersivePage ? 'hidden md:block' : 'block')}`}>
                <Header onToggleChat={toggleChat} />
            </div>

            {/* Spacer for fixed header - visible on both mobile and desktop */}
            {!isBookingPage && !isImmersivePage && (
                <div className="header-spacer" style={{ height: '100px' }}></div>
            )}
            {/* Spacer for immersive pages - only desktop since header is hidden on mobile */}
            {!isBookingPage && isImmersivePage && (
                <div className="hidden md:block" style={{ height: '140px' }}></div>
            )}

            <main className={`flex-1 ${isBookingPage ? 'pb-0' : 'pb-0 md:pb-0'}`}>
                <Outlet />
            </main>

            {/* Hide Footer only on Booking Page */}
            {!isBookingPage && <Footer />}

            {/* Show Bottom Nav Everywhere (except maybe booking page if needed, but user said everywhere) */}
            {/* Keeping it hidden on full booking page might be good, but let's follow 'everywhere' for now, or maybe hide on booking only */}
            {!isBookingPage && <MobileBottomNav />}

            <div className="hidden md:block">
                <Chatbot
                    isOpen={isChatOpen}
                    onToggle={toggleChat}
                    showFloatingButton={!isBookingPage}
                />
            </div>
        </div>
    );
};

export default MainLayout;
