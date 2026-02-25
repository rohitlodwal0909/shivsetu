import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: 'Orders & Shipping',
            questions: [
                {
                    q: 'How long does shipping take?',
                    a: 'Standard shipping: 5-7 business days. Express shipping: 2-3 business days. Delivery times may vary based on your location.'
                },
                {
                    q: 'Do you ship internationally?',
                    a: 'Yes! We ship to over 100 countries worldwide. International shipping times vary by destination, typically taking 7-14 business days.'
                },
                {
                    q: 'How can I track my order?',
                    a: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in the "Order History" section of your account.'
                }
            ]
        },
        {
            category: 'Returns & Refunds',
            questions: [
                {
                    q: 'What is your return policy?',
                    a: 'We offer a 30-day return policy. Items must be unused, in original packaging, and with tags attached. Some exclusions apply.'
                },
                {
                    q: 'How do I initiate a return?',
                    a: 'Log into your account, go to Order History, select the order, and click "Return Item". Follow the instructions to complete your return.'
                },
                {
                    q: 'When will I receive my refund?',
                    a: 'Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method.'
                }
            ]
        },
        {
            category: 'Account & Payment',
            questions: [
                {
                    q: 'Is it safe to use my credit card?',
                    a: 'Absolutely! We use industry-standard SSL encryption to protect your payment information. All transactions are secure and encrypted.'
                },
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various digital payment methods.'
                },
                {
                    q: 'Can I change my shipping address?',
                    a: 'Yes, you can update your shipping address in your account settings. However, once an order is shipped, the address cannot be changed.'
                }
            ]
        },
        {
            category: 'Products & Stock',
            questions: [
                {
                    q: 'Are the products authentic?',
                    a: 'Yes! We only sell 100% authentic products from verified brands and authorized distributors.'
                },
                {
                    q: 'What if an item is out of stock?',
                    a: 'You can sign up for email notifications when the item is back in stock. We restock popular items regularly.'
                },
                {
                    q: 'Do you offer warranties?',
                    a: 'Yes, many products come with manufacturer warranties. Details are listed on each product page.'
                }
            ]
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-100 to-white border-b border-gray-200 py-16">
                <div className="container max-w-4xl text-center">
                    <h1 className="text-5xl font-bold gradient-text mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-600">Find answers to common questions about our products and services</p>
                </div>
            </div>

            <div className="container max-w-4xl py-16">
                {faqs.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">{category.category}</h2>
                        <div className="space-y-4">
                            {category.questions.map((faq, qIndex) => {
                                const globalIndex = `${categoryIndex}-${qIndex}`;
                                const isOpen = openIndex === globalIndex;

                                return (
                                    <div
                                        key={qIndex}
                                        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all"
                                    >
                                        <button
                                            onClick={() => toggleFAQ(globalIndex)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-lg font-bold text-gray-900 pr-4">{faq.q}</span>
                                            <div className="flex-shrink-0">
                                                {isOpen ? (
                                                    <FaChevronUp className="text-[#e14503] text-xl" />
                                                ) : (
                                                    <FaChevronDown className="text-gray-400 text-xl" />
                                                )}
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-6 pb-6 pt-2 border-t border-gray-200 animate-fade-in">
                                                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Still Have Questions */}
                <div className="bg-gradient-to-r from-[#e14503] to-[#c23a02] rounded-2xl p-12 text-center text-white mt-16">
                    <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                    <p className="text-lg mb-6 text-white/90">Our customer support team is here to help you 24/7</p>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-8 py-4 bg-white text-[#e14503] rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
