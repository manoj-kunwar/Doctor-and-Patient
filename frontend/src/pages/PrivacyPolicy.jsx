import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">

      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-8 md:p-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Last updated: {new Date().getFullYear()}
        </p>

        {/* Intro */}
        <p className="text-gray-600 leading-relaxed mb-6">
          At <span className="font-semibold text-gray-800">CareOS</span>, we value your privacy and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
        </p>

        {/* Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may collect personal information such as your name, contact details, and relevant health data when you use our services or book appointments.
          </p>
        </div>

        {/* Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your information is used to provide and improve our services, manage appointments, and enhance your overall experience on our platform.
          </p>
        </div>

        {/* Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Data Protection
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement strict security measures to protect your data. Your personal information is stored securely and is never shared without your consent.
          </p>
        </div>

        {/* Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to access, update, or request deletion of your personal information at any time.
          </p>
        </div>

        {/* Footer Note */}
        <div className="border-t pt-4 mt-6 text-sm text-gray-500">
          If you have any questions about this policy, please contact us at{" "}
          <span className="text-primary font-medium">support@careos.com</span>.
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;