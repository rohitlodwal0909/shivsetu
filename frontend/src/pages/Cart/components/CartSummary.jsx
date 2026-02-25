import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';

const CartSummary = ({ items }) => {
    const navigate = useNavigate();

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                    <span>Shipping</span>
                    <span className="font-semibold">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-slate-300">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700 pt-4">
                    <div className="flex justify-between text-white text-xl font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {subtotal < 50 && (
                <p className="text-sm text-yellow-400 mb-4">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
            )}

            <Button
                size="lg"
                className="w-full"
                onClick={() => navigate('/checkout')}
            >
                Proceed to Checkout
            </Button>

            <Button
                variant="outline"
                size="lg"
                className="w-full mt-3"
                onClick={() => navigate('/shop')}
            >
                Continue Shopping
            </Button>
        </div>
    );
};

export default CartSummary;
