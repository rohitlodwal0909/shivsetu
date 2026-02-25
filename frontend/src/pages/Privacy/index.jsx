import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-100 to-white border-b border-gray-200 py-16">
                <div className="container max-w-4xl text-center">
                    <h1 className="text-5xl font-bold gradient-text mb-4">Privacy Policy</h1>
                    <p className="text-lg text-gray-600">Last updated: January 14, 2024</p>
                </div>
            </div>

            <div className="container max-w-4xl py-16">
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200">
                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We collect information that you provide directly to us, including:
                            </p>
                            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
                                <li>Name, email address, and contact information</li>
                                <li>Billing and shipping addresses</li>
                                <li>Payment information (processed securely through third-party payment processors)</li>
                                <li>Purchase history and preferences</li>
                                <li>Communications with our customer service team</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
                                <li>Process and fulfill your orders</li>
                                <li>Communicate with you about your orders and our services</li>
                                <li>Send marketing communications (with your consent)</li>
                                <li>Improve our products and services</li>
                                <li>Detect and prevent fraud</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We do not sell your personal information. We may share your information with:
                            </p>
                            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
                                <li>Service providers who help us operate our business</li>
                                <li>Payment processors for secure transaction processing</li>
                                <li>Shipping companies to deliver your orders</li>
                                <li>Law enforcement when required by law</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                            </p>
                            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
                                <li>SSL encryption for all data transmission</li>
                                <li>Secure servers and databases</li>
                                <li>Regular security assessments</li>
                                <li>Limited access to personal information</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Object to certain data processing activities</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <p className="text-gray-700"><strong>Email:</strong> privacy@ecommerce.com</p>
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

export default Privacy;
