import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Careers = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-12 py-12">

      {/* ===== Heading ===== */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Careers at <span className="text-primary">CareOS</span>
        </h1>

        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Join our team and help us improve how patients connect with doctors. 
          Be part of building a simple, reliable, and modern healthcare platform.
        </p>
      </div>

      {/* ===== Job Cards ===== */}
      <div className="mt-12 max-w-4xl mx-auto flex flex-col gap-8">

        {/* ===== Job Card 1 ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          {/* Badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Hiring Now
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800">
            Medical Coordinator
          </h2>

          {/* Info */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">📍 India / Remote</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">🕒 Full-time</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            Manage patient appointments and coordinate between patients and doctors 
            to ensure a smooth and efficient healthcare experience.
          </p>

          {/* Responsibilities */}
          <ul className="text-gray-600 text-sm list-disc pl-5 space-y-2">
            <li>Manage and schedule patient appointments</li>
            <li>Coordinate between doctors and patients</li>
            <li>Provide user support</li>
            <li>Ensure smooth communication</li>
          </ul>

          {/* Button */}
          <button
            onClick={() => toast.success("Application feature coming soon 🚀")}
            className="mt-4 w-fit bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            Apply Now
          </button>
        </div>

        {/* ===== Job Card 2 ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          {/* Badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Hiring Now
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800">
            Patient Support Executive
          </h2>

          {/* Info */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">📍 India / Remote</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">🕒 Full-time</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            Assist patients with booking appointments, resolve queries, and provide 
            a seamless and friendly healthcare experience.
          </p>

          {/* Responsibilities */}
          <ul className="text-gray-600 text-sm list-disc pl-5 space-y-2">
            <li>Assist patients with bookings</li>
            <li>Respond to queries</li>
            <li>Guide users on platform</li>
            <li>Provide quick support</li>
          </ul>

          {/* Button */}
          <button
            onClick={() => toast.success("Application feature coming soon 🚀")}
            className="mt-4 w-fit bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            Apply Now
          </button>
        </div>

      </div>

      {/* ===== Bottom CTA Section ===== */}
      <div className="mt-16 text-center">

        <h2 className="text-2xl font-semibold text-gray-800">
          Want to Work With Us?
        </h2>

        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          We are always looking for passionate individuals who want to improve healthcare experiences.
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="mt-6 bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:scale-105 transition"
        >
          Contact Us
        </button>

      </div>

    </div>
  );
};

export default Careers;