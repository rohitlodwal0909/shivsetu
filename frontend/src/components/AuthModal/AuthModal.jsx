import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ children, title, leftContent }) => {
    const { hideAuthModal } = useAuth();

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                hideAuthModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [hideAuthModal]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in"
            onClick={hideAuthModal}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden modal-scale-in flex"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={hideAuthModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg z-10"
                >
                    <FaTimes size={20} />
                </button>

                {/* Left Panel - Black */}
                <div className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-between">
                    {leftContent}
                </div>

                {/* Right Panel - White */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
