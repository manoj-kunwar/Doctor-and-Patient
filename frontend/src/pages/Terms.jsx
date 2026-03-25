import React from "react";

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">

      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-8 md:p-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Last updated: {new Date().getFullYear()}
        </p>

        {/* Intro */}
        <p className="text-gray-600 leading-relaxed mb-6">
          By accessing and using <span className="font-semibold text-gray-800">CareOS</span>, 
          you agree to comply with the following terms and conditions. Please read them carefully.
        </p>

        {/* Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Usage of the Platform
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to use this platform only for lawful purposes and in a way that does not infringe 
            the rights of others or restrict their use of the service.
          </p>
        </div>

        {/* Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Appointments & Services
          </h2>
          <p className="text-gray-600 leading-relaxed">
            CareOS facilitates appointment booking between patients and doctors. 
            We are not responsible for doctor availability, cancellations, or outcomes of consultations.
          </p>
        </div>

        {/* Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            User Responsibilities
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You are responsible for providing accurate information and maintaining the confidentiality 
            of your account details.
          </p>
        </div>

        {/* Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Changes to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these terms from time to time. Continued use of the platform indicates your 
            acceptance of the updated terms.
          </p>
        </div>

        {/* Footer Note */}
        <div className="border-t pt-4 mt-6 text-sm text-gray-500">
          If you have any questions about these terms, please contact us at{" "}
          <span className="text-primary font-medium">support@careos.com</span>.
        </div>

      </div>
    </div>
  );
};

export default Terms;