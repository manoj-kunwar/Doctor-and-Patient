import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="px-6 md:px-12 bg-gray-50 min-h-screen">

      {/* ===== Heading ===== */}
        <div className="text-center pt-12">
          <p className="text-3xl font-semibold text-gray-700">
            ABOUT <span className="text-indigo-600">US</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Connecting patients with trusted doctors — simply and efficiently
          </p>
        </div>

      {/* ===== About Section ===== */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">

        {/* Image */}
        <img
          className="w-full md:max-w-[420px] rounded-xl shadow-sm"
          src={assets.about_image}
          alt="About"
        />

        {/* Content */}
        <div className="flex flex-col gap-5 text-gray-600 text-sm leading-relaxed md:w-1/2">
        <p> Welcome to CareOS — a modern healthcare platform designed to connect patients 
          with qualified doctors in a simple and reliable way. We make it easy to discover 
          the right specialist, book appointments, and manage your healthcare journey in one place.
        </p>

        <p>At CareOS, we understand the challenges both patients and doctors face — from 
          finding the right care to managing schedules efficiently. Our platform bridges 
          this gap by offering a seamless experience for patients while helping doctors 
          connect with and manage their patients more effectively.
        </p>

        <div>
          <p className="font-semibold text-lg text-gray-800 mb-1">
            Our Vision
          </p>
          <p>
            Our vision is to create a connected healthcare ecosystem where patients can 
            access quality care and doctors can provide their services efficiently. 
            We aim to make healthcare more accessible, transparent, and user-friendly for everyone.
          </p>
        </div>
      </div>

    </div>
          

      {/* ===== Why Choose Us ===== */}
      <div className="mt-16 max-w-6xl mx-auto">
        <p className="text-2xl font-semibold text-gray-700 mb-8 text-center">
          WHY <span className="text-indigo-600">CHOOSE US</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <p className="font-semibold text-lg text-gray-800 mb-2">
              Efficient Booking
            </p>
            <p className="text-gray-500 text-sm">
              Book appointments quickly without long waits or complicated processes.
            </p>
          </div>


          {/* Card 2 */}

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <p className="font-semibold text-lg text-gray-800 mb-2">
              Easy Access
            </p>
            <p className="text-gray-500 text-sm">
             Find and connect with trusted doctors across multiple specialities — all in one place.
            </p>
          </div>

        {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
             <p className="font-semibold text-lg text-gray-800 mb-2">
              Smart Experience
            </p>
            <p className="text-gray-500 text-sm">
              Get relevant recommendations and manage your appointments with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;