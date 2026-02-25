import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
    return (
        <div className={`bg-slate-800 border border-slate-700 rounded-xl overflow-hidden ${hover ? 'card-hover' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
