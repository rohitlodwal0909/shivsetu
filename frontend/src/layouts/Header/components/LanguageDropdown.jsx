import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import './LanguageDropdown.css';

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  ];

  /* -------- Close Dropdown When Click Outside -------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* -------- Change Language -------- */
  const handleLanguageChange = (code) => {
    setLanguage(code);
    setIsOpen(false);

    const tryUpdateLang = () => {
      const select = document.querySelector(
        '#google_translate_element select'
      );

      if (select) {
        select.value = code;
        select.dispatchEvent(new Event('change'));
      } else {
        setTimeout(tryUpdateLang, 500);
      }
    };

    tryUpdateLang();
  };

  /* -------- Google Translate Setup -------- */
  useEffect(() => {
    const initializeGoogleTranslate = () => {
      if (
        window.google &&
        window.google.translate &&
        !window.translateElementInitialized
      ) {
        window.translateElementInitialized = true;
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi',
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      }
    };

    const addScript = () => {
      if (!document.querySelector("script[src*='translate_a/element.js']")) {
        const script = document.createElement('script');
        script.src =
          '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      } else {
        initializeGoogleTranslate();
      }
    };

    window.googleTranslateElementInit = initializeGoogleTranslate;
    addScript();
  }, []);

  const currentLanguage = languages.find(
    (lang) => lang.code === language
  );

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="language-dropdown" ref={dropdownRef}>
        <button
          className="language-dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaGlobe className="language-icon" />
          <span className="language-name">
            {currentLanguage?.nativeName}
          </span>
          <FaChevronDown
            className={`chevron-icon ${isOpen ? 'rotate' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="language-dropdown-menu">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-option ${
                  language === lang.code ? 'active' : ''
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageDropdown;