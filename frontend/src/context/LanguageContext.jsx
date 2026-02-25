import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Get from localStorage or default to English
        return localStorage.getItem('language') || 'en';
    });

    useEffect(() => {
        // Save to localStorage whenever language changes
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'hi' : 'en');
    };

    const t = (path) => {
        return getTranslation(language, path);
    };

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        t,
        isHindi: language === 'hi',
        isEnglish: language === 'en'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
