import React from 'react';
import { useToast } from '../../context/ToastContext';
import './Toast.css';

const typeIcons = {
    success: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#10b981" />
            <path d="M6 10.5L8.5 13L14 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    error: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#ef4444" />
            <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    info: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#3b82f6" />
            <path d="M10 9V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="6.5" r="1.2" fill="white" />
        </svg>
    ),
    warning: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#f59e0b" />
            <path d="M10 6V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="13.5" r="1.2" fill="white" />
        </svg>
    ),
};

const CustomToastContainer = () => {
    const { toasts } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="custom-toast-container">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`custom-toast custom-toast--${toast.type} ${toast.exiting ? 'toast-exit' : 'toast-enter'}`}
                >
                    <span className="custom-toast__icon">
                        {toast.icon || typeIcons[toast.type] || typeIcons.success}
                    </span>
                    <span className="custom-toast__message">{toast.message}</span>
                </div>
            ))}
        </div>
    );
};

export default CustomToastContainer;
