import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import CustomToastContainer from './components/Toast/ToastContainer';


const AppContent = () => {

    useEffect(() => {
      const initializeGoogleTranslate = () => {
        if (window.google?.translate?.TranslateElement && !window.translateElementInitialized) {
          window.translateElementInitialized = true;
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              layout: window.google.translate.TranslateElement.InlineLayout.LIST,
            },
            'google_translate_element',
          );
        }
      };
  
      const addGoogleTranslateScript = () => {
        const existingScript = document.querySelector("script[src*='translate_a/element.js']");
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          script.async = true;
          document.body.appendChild(script);
        } else {
          initializeGoogleTranslate();
        }
      };
  
      window.googleTranslateElementInit = () => initializeGoogleTranslate();
  
      addGoogleTranslateScript();
    }, []);
  return (
    <>
      <AppRoutes />
      <CustomToastContainer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
              <div id="google_translate_element" style={{ display: 'none' }}></div>
                <AppContent />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
