import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TermsAndConditions = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="container mx-auto px-4 mb-10 py-8 max-w-4xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Terms and Conditions</h1>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to ShantiPatra. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website and/or purchasing our products, you accept these terms and conditions in full.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">2. Product Information</h2>
          <p className="text-gray-700">
            All products displayed on our website are subject to availability. We reserve the right to modify or discontinue any product without notice. Prices are subject to change without notice. Product images are for illustrative purposes only and may vary from the actual product.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">3. Order and Payment Terms</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>All orders are subject to acceptance and availability</li>
            <li>Prices are in Indian Rupees unless otherwise stated</li>
            <li>Payment terms for bulk orders will be as per agreed terms</li>
            <li>We reserve the right to refuse service to anyone for any reason</li>
            <li>Minimum order quantities may apply for certain products</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">4. Product Quality and Warranty</h2>
          <p className="text-gray-700">
            All our products are manufactured to meet high-quality standards and come with applicable warranties. Specific warranty terms vary by product and are provided with the product documentation. Our products comply with relevant Indian manufacturing standards and regulations.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">5. Shipping and Delivery</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Delivery timeframes are estimates only</li>
            <li>Shipping costs are calculated based on order size and destination</li>
            <li>Risk of loss transfers upon delivery to the carrier</li>
            <li>International shipping terms are subject to Incoterms 2020</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">6. Returns and Refunds</h2>
          <p className="text-gray-700">
            Returns are accepted within 7 days of delivery for defective products only. Custom-made products are non-returnable unless defective. All returns must be in original packaging with documentation.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">7. Intellectual Property</h2>
          <p className="text-gray-700">
            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of ShantiPatra and is protected by intellectual property laws.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">8. Limitation of Liability</h2>
          <p className="text-gray-700">
            ShantiPatra shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use or inability to use our products or services.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">9. Force Majeure</h2>
          <p className="text-gray-700">
            We shall not be liable for any delay or failure to perform due to causes beyond our reasonable control, including natural disasters, war, strikes, or governmental actions.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">10. Dispute Resolution</h2>
          <p className="text-gray-700">
            Any disputes arising from these terms shall be governed by Indian law. The courts of [Your City] shall have exclusive jurisdiction over any disputes.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">11. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">12. Contact Information</h2>
          <p className="text-gray-700">
            For questions about these terms, please contact us at:<br />
            Email: info@shantipatra.com<br />
            Phone: +91 937-700-1064<br />
            Address: Plot No - C/5, OIDC Industrial Estate, Ringanwada, Daman - 396210, Gujarat-India

          </p>
        </section>

        <section className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-700 italic">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
