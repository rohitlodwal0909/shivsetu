import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ShippingForm from './components/ShippingForm';
import PaymentMethod from './components/PaymentMethod';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { FaShoppingBag, FaChevronLeft, FaLock, FaCheck } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../features/order/OrderSlice';

const Checkout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [activeStep, setActiveStep] = useState(0); // Mobile stepper: 0=Shipping, 1=Payment, 2=Review

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

   useEffect(() => {
    if (user) {

        const fullName = user.name || "";
        const nameParts = fullName.trim().split(" ");

        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setFormData({
            firstName: firstName,
            lastName: lastName,
            email: user.email || '',
            phone: user.mobile || '',
            address: user.address || '',
            city: user.city || '',
            state: user.state || '',
            zipCode: user.zipCode || ''
        });
    }
}, [user]);

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [errors, setErrors] = useState({});

    const handleFormChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone number is invalid (10 digits)';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP Code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

const handlePlaceOrder = async () => {
    if (!validateForm()) {
        setActiveStep(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Please fix the errors in the form', { type: 'error' });
        return;
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.1;
    const total = (subtotal + shipping + tax).toFixed(2);

    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')}`;

    const orderData = {
        order_number: orderNumber,
        user_id: user?.id,
        items: cartItems,
        shipping_address: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
    },
        payment_method: paymentMethod,
        total_amount: total,
    };

    try {
        const result = await dispatch(createOrder(orderData)).unwrap();

        setOrderDetails({
            orderNumber,
            customerName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            total,
            items: cartItems
        });

        clearCart();
        setShowConfirmation(true);
        showToast("Order placed successfully", { type: "success" });

    } catch (error) {
        showToast(error || "Order failed", { type: "error" });
    }
};

    const handleNextStep = () => {
        if (activeStep === 0) {
            if (!validateForm()) {
                showToast('Please fill all required fields', { type: 'error' });
                return;
            }
        }
        setActiveStep(prev => Math.min(prev + 1, 2));
    };

    const steps = [
        { label: 'Address', shortLabel: 'Address' },
        { label:'Payment', shortLabel:'Pay' },
        { label: 'Review', shortLabel: 'Review' },
    ];

    if (cartItems.length === 0 && !showConfirmation) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaShoppingBag className="text-gray-300 text-4xl" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        { 'Your cart is empty'}
                    </h2>
                    <p className="text-gray-500 mb-8 text-sm">
                        {'Add some products before checking out!'}
                    </p>
                    <Link to="/shop" className="inline-block bg-[#e14503] hover:bg-[#c23a02] text-white px-8 py-3 rounded-full font-semibold transition-colors text-sm">
                        {'Continue Shopping'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
            {/* Mobile Header with Stepper */}
            <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-100">
                <div className="flex items-center px-4 h-14">
                    <button onClick={() => activeStep > 0 ? setActiveStep(activeStep - 1) : navigate('/cart')} className="p-1 mr-3">
                        <FaChevronLeft className="text-gray-700 text-sm" />
                    </button>
                    <h1 className="text-base font-bold text-gray-900 flex-1">{'Checkout'}</h1>
                    <div className="flex items-center gap-1">
                        <FaLock className="text-green-600 text-[10px]" />
                        <span className="text-[10px] text-green-600 font-medium">{'Secure'}</span>
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="px-4 pb-3">
                    <div className="flex items-center justify-between">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex items-center flex-1">
                                <button
                                    onClick={() => idx < activeStep && setActiveStep(idx)}
                                    className={`flex items-center gap-1.5 ${idx <= activeStep ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${idx < activeStep
                                        ? 'bg-green-500 text-white'
                                        : idx === activeStep
                                            ? 'bg-[#e14503] text-white'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {idx < activeStep ? <FaCheck className="text-[8px]" /> : idx + 1}
                                    </div>
                                    <span className={`text-[11px] font-semibold ${idx === activeStep ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {step.shortLabel}
                                    </span>
                                </button>
                                {idx < steps.length - 1 && (
                                    <div className={`flex-1 h-[2px] mx-2 rounded ${idx < activeStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block">
                <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {'Checkout'}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {'Complete your order securely'}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto md:px-4">
                {/* Desktop: Side-by-side layout */}
                <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <ShippingForm formData={formData} onChange={handleFormChange} errors={errors} />
                        <PaymentMethod selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />
                    </div>
                    <div className="lg:col-span-1">
                        <OrderSummary items={cartItems} onPlaceOrder={handlePlaceOrder} />
                    </div>
                </div>

                {/* Mobile: Step-by-step flow */}
                <div className="md:hidden">
                    {activeStep === 0 && (
                        <div className="px-4 py-4">
                            <ShippingForm formData={formData} onChange={handleFormChange} errors={errors} isMobile={true} />
                        </div>
                    )}
                    {activeStep === 1 && (
                        <div className="px-4 py-4">
                            <PaymentMethod selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} isMobile={true} />
                        </div>
                    )}
                    {activeStep === 2 && (
                        <div className="px-4 py-4">
                            <OrderSummary items={cartItems} onPlaceOrder={handlePlaceOrder} isMobile={true} />
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{'Total'}</p>
                        <p className="text-lg font-bold text-gray-900">₹{(getCartTotal() + getCartTotal() * 0.1).toFixed(2)}</p>
                    </div>
                    {activeStep < 2 ? (
                        <button
                            onClick={handleNextStep}
                            className="bg-[#e14503] hover:bg-[#c23a02] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors"
                        >
                            {'Continue'}
                        </button>
                    ) : (
                        <button
                            onClick={handlePlaceOrder}
                            className="bg-[#e14503] hover:bg-[#c23a02] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                        >
                            <FaLock className="text-xs" />
                            {'Place Order'}
                        </button>
                    )}
                </div>
            </div>

            <OrderConfirmation
                isOpen={showConfirmation}
                onClose={() => {
                    setShowConfirmation(false);
                    navigate('/');
                }}
                orderDetails={orderDetails}
            />
        </div>
    );
};

export default Checkout;
