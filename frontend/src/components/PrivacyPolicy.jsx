// import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect various types of information to provide and improve our service to you,
              including personal data such as your name, email, and usage data.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              Your information is used to operate, maintain, and improve the features and
              functionality of our service. We may also use your information to communicate with
              you.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">3. Sharing Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not share your personal information with third parties except to comply with
              the law, protect our rights, or with your consent.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">4. Security of Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We take security seriously and use reasonable measures to protect your information.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">5. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new policy on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
