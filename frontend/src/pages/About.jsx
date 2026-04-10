// import React from "react";
// import { assets } from "../assets/assets";

// const About = () => {
//   return (
//     <div className="px-6 md:px-12 bg-gray-50 min-h-screen">

//       {/* ===== Heading ===== */}
//         <div className="text-center pt-12">
//           <p className="text-3xl font-semibold text-gray-700">
//             ABOUT <span className="text-indigo-600">US</span>
//           </p>
//           <p className="text-gray-500 text-sm mt-2">
//             Connecting patients with trusted doctors — simply and efficiently
//           </p>
//         </div>

//       {/* ===== About Section ===== */}
//       <div className="mt-12 flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">

//         {/* Image */}
//         <img
//           className="w-full md:max-w-[420px] rounded-xl shadow-sm"
//           src={assets.about_image}
//           alt="About"
//         />

//         {/* Content */}
//         <div className="flex flex-col gap-5 text-gray-600 text-sm leading-relaxed md:w-1/2">
//         <p> Welcome to CareOS — a modern healthcare platform designed to connect patients 
//           with qualified doctors in a simple and reliable way. We make it easy to discover 
//           the right specialist, book appointments, and manage your healthcare journey in one place.
//         </p>

//         <p>At CareOS, we understand the challenges both patients and doctors face — from 
//           finding the right care to managing schedules efficiently. Our platform bridges 
//           this gap by offering a seamless experience for patients while helping doctors 
//           connect with and manage their patients more effectively.
//         </p>

//         <div>
//           <p className="font-semibold text-lg text-gray-800 mb-1">
//             Our Vision
//           </p>
//           <p>
//             Our vision is to create a connected healthcare ecosystem where patients can 
//             access quality care and doctors can provide their services efficiently. 
//             We aim to make healthcare more accessible, transparent, and user-friendly for everyone.
//           </p>
//         </div>
//       </div>

//     </div>
          

//       {/* ===== Why Choose Us ===== */}
//       <div className="mt-16 max-w-6xl mx-auto">
//         <p className="text-2xl font-semibold text-gray-700 mb-8 text-center">
//           WHY <span className="text-indigo-600">CHOOSE US</span>
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           {/* Card 1 */}
//           <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
//             <p className="font-semibold text-lg text-gray-800 mb-2">
//               Efficient Booking
//             </p>
//             <p className="text-gray-500 text-sm">
//               Book appointments quickly without long waits or complicated processes.
//             </p>
//           </div>


//           {/* Card 2 */}

//           <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
//             <p className="font-semibold text-lg text-gray-800 mb-2">
//               Easy Access
//             </p>
//             <p className="text-gray-500 text-sm">
//              Find and connect with trusted doctors across multiple specialities — all in one place.
//             </p>
//           </div>

//         {/* Card 3 */}
//           <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
//              <p className="font-semibold text-lg text-gray-800 mb-2">
//               Smart Experience
//             </p>
//             <p className="text-gray-500 text-sm">
//               Get relevant recommendations and manage your appointments with ease.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from "react";
import { assets } from "../assets/assets";

const stats = [
  { value: "50K+", label: "Patients Served" },
  { value: "1,200+", label: "Verified Doctors" },
  { value: "40+", label: "Specialties" },
  { value: "4.9★", label: "Average Rating" },
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    ),
    title: "Efficient Booking",
    desc: "Book appointments in under 60 seconds — no queues, no calls, no hassle.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
        <path d="M18 3l1.5 1.5L22 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Verified Doctors",
    desc: "Every doctor on CareOS is background-checked, licensed, and reviewed by real patients.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.8l-4.9 2.4.9-5.5L4 7.8l5.5-.8z" strokeLinejoin="round" />
      </svg>
    ),
    title: "Smart Experience",
    desc: "Personalised recommendations, reminders, and a health dashboard — all in one place.",
  },
];

const About = () => {
  return (
    <section className="mt-10 min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-slate-100 px-6 pt-16 pb-14 text-center">
        <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase mb-4">
          Who we are
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          About <span className="text-emerald-600">CareOS</span>
        </h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
          Connecting patients with trusted doctors — simply, securely, and efficiently.
        </p>
      </div>

      {/* Story + Image */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="md:w-2/5 w-full shrink-0">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img
              src={assets.about_image}
              alt="About CareOS"
              className="w-full object-cover"
            />
            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2.5 shadow-md border border-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Live appointments available</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="md:w-3/5 space-y-5 text-slate-600 text-sm md:text-base leading-8">
          <h2 className="text-2xl font-bold text-slate-900">
            A platform built around you
          </h2>
          <p>
            Welcome to <span className="font-semibold text-slate-800">CareOS</span> — a modern healthcare platform designed to connect patients with qualified doctors in a simple and reliable way. We make it easy to discover the right specialist, book appointments, and manage your healthcare journey in one place.
          </p>
          <p>
            We understand the challenges both patients and doctors face — from finding the right care to managing schedules efficiently. Our platform bridges this gap by offering a seamless experience for everyone involved.
          </p>

          {/* Vision card */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
              </svg>
              <p className="font-bold text-sm text-emerald-700 uppercase tracking-wider">Our Vision</p>
            </div>
            <p className="text-slate-600 text-sm leading-7">
              To create a connected healthcare ecosystem where patients access quality care and doctors provide their services efficiently — making healthcare more accessible and transparent for all.
            </p>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-emerald-600 px-6 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-emerald-100 text-xs font-medium mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Benefits</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
            Why <span className="text-emerald-600">Choose Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-200">
                {f.icon}
              </div>
              <p className="font-bold text-slate-900 text-base mb-2">{f.title}</p>
              <p className="text-slate-500 text-sm leading-7">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default About;