import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import Button from '../../../components/common/Button';

const EmptyCart = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShoppingBag className="text-5xl text-slate-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Button size="lg" onClick={() => navigate('/shop')}>
                Start Shopping
            </Button>
        </div>
    );
};

export default EmptyCart;
