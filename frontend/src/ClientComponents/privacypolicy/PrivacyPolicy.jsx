import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PrivacyPolicy = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center border-b pb-4">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 bg-white p-8 rounded-lg shadow-md">
          <section className="hover:bg-gray-50 p-4 rounded-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to ShantiPatra's Privacy Policy. At ShantiPatra, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or interact with our business.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-4 rounded-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">We may collect the following types of information:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-600">
              <li>Contact information (name, email address, phone number, company name)</li>
              <li>Business information for order processing</li>
              <li>Technical data (IP address, browser type, device information)</li>
              <li>Usage data (how you interact with our website)</li>
            </ul>
          </section>

          <section className="hover:bg-gray-50 p-4 rounded-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">We use your information to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-600">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about products and services</li>
              <li>Improve our website and customer service</li>
              <li>Send you technical notices and updates</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="hover:bg-gray-50 p-4 rounded-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              4. Information Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-4 rounded-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              5. Third-Party Disclosure
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or transfer your personally identifiable information to third parties without your consent, except to trusted partners who assist us in operating our website and serving our customers.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-4 rounded-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              6. Cookies Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may affect some website functionality.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-4 rounded-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              7. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">You have the right to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-600">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to our processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="hover:bg-gray-50 p-4 rounded-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              8. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:<br />
              Email: info@shantipatra.com<br />
            Phone: +91 937-700-1064<br />
            Address: Plot No - C/5, OIDC Industrial Estate, Ringanwada, Daman - 396210, Gujarat-India

            </p>
          </section>

          <section className="mt-12 border-t pt-6">
            <p className="text-gray-500 text-sm text-right italic">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
