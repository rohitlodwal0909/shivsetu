import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext();

let toastIdCounter = 0;

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const MAX_TOASTS = 3;
const AUTO_CLOSE_MS = 800;
const EXIT_ANIMATION_MS = 300;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({});

    const removeToast = useCallback((id) => {
        // Mark as exiting (triggers CSS exit animation)
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));

        // Actually remove after exit animation completes
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
            if (timersRef.current[id]) {
                clearTimeout(timersRef.current[id]);
                delete timersRef.current[id];
            }
        }, EXIT_ANIMATION_MS);
    }, []);

    const showToast = useCallback((message, options = {}) => {
        const { type = 'success', icon } = options;
        const id = ++toastIdCounter;

        setToasts(prev => {
            let updated = [...prev];

            // If at max, force-exit the oldest non-exiting toast
            const activeToasts = updated.filter(t => !t.exiting);
            if (activeToasts.length >= MAX_TOASTS) {
                const oldest = activeToasts[0];
                // Mark oldest as exiting
                updated = updated.map(t => t.id === oldest.id ? { ...t, exiting: true } : t);

                // Schedule removal of the oldest after animation
                setTimeout(() => {
                    setToasts(p => p.filter(t => t.id !== oldest.id));
                    if (timersRef.current[oldest.id]) {
                        clearTimeout(timersRef.current[oldest.id]);
                        delete timersRef.current[oldest.id];
                    }
                }, EXIT_ANIMATION_MS);
            }

            // Add new toast
            updated.push({ id, message, type, icon, exiting: false });
            return updated;
        });

        // Auto-close after AUTO_CLOSE_MS
        timersRef.current[id] = setTimeout(() => {
            removeToast(id);
        }, AUTO_CLOSE_MS);

        return id;
    }, [removeToast]);

    const value = { showToast, removeToast, toasts };

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export default ToastContext;
