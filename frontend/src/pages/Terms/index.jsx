import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-100 to-white border-b border-gray-200 py-16">
                <div className="container max-w-4xl text-center">
                    <h1 className="text-5xl font-bold gradient-text mb-4">Terms & Conditions</h1>
                    <p className="text-lg text-gray-600">Last updated: January 14, 2024</p>
                </div>
            </div>

            <div className="container max-w-4xl py-16">
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200">
                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Use License</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose</li>
                                <li>Attempt to decompile or reverse engineer any software</li>
                                <li>Remove any copyright or proprietary notations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Product Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Pricing and Payment</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time. Payment must be received by us before your order is processed.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We will make every effort to deliver products within the estimated delivery times, but delays are occasionally unavoidable. We are not responsible for delays caused by shipping carriers or customs.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Please refer to our Returns Policy for detailed information on returns, exchanges, and refunds. We reserve the right to refuse returns that do not meet our return criteria.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. User Accounts</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you create an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use our products or services, even if we have been notified of the possibility of such damages.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about these Terms and Conditions, please contact us at:
                            </p>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <p className="text-gray-700"><strong>Email:</strong> legal@ecommerce.com</p>
                                <p className="text-gray-700"><strong>Phone:</strong> +1-987-654-3210</p>
                                <p className="text-gray-700"><strong>Address:</strong> 123 Business Street, New York, NY 10001</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
