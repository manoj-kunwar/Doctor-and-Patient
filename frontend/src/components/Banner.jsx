// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Banner = () => {
//   const navigate = useNavigate();
//   const { token } = useContext(AppContext)

//   return (
//     <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

//       {/* ----------------- Left Side ----------------- */}
//       <div className='flex-1 py-8 sm:py-16 lg:py-24 lg:pl-5'>
//         <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
//           <p>Book Appointment</p>
//           <p className='mt-4'>With 100+ Trusted Doctors</p>
//         </div>

//         {/* Show "Create account" if not logged in, else "Book Now" */}
//         {!token
//           ? <button
//               onClick={() => { navigate('/login'); scrollTo(0, 0); }}
//               className='bg-white text-gray-600 px-8 py-3 rounded-full mt-6 text-sm sm:text-base hover:scale-105 transition-all'
//             >
//               Create account
//             </button>
//           : <button
//               onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
//               className='bg-white text-gray-600 px-8 py-3 rounded-full mt-6 text-sm sm:text-base hover:scale-105 transition-all'
//             >
//               Book Now
//             </button>
//         }
//       </div>

//       {/* ----------------- Right Side ----------------- */}
//       <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
//         <img
//           className='w-full absolute bottom-0 right-0 max-w-md'
//           src={assets.appointment_img}
//           alt=""
//         />
//       </div>

//     </div>
//   )
// }

// export default Banner


// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Banner = () => {
//   const navigate = useNavigate();
//   const { token } = useContext(AppContext)

//   return (
//     <div className='flex bg-primary rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden relative'>

//       {/* Decorative circles */}
//       <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4'></div>
//       <div className='absolute bottom-0 left-20 w-32 h-32 bg-white/5 rounded-full translate-y-1/2'></div>

//       {/* Left Side */}
//       <div className='flex-1 py-10 sm:py-16 lg:py-24 lg:pl-5 relative z-10'>

//         {/* Badge */}
//         <div className='flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full w-fit mb-5'>
//           <span className='w-4 h-4 bg-green-400 rounded-full animate-pulse'></span>
//           100+ Verified Doctors Available
//         </div>

//         {/* Heading */}
//         <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
//            <p>Find the Right Doctor</p>
//           <p className='mt-2 text-white/90'>and Book Your Appointment Easily</p>
//         </div>

//         <p className='text-white/70 text-sm mt-4 max-w-xs hidden sm:block'>
//         Fast, simple, and reliable — connect with trusted doctors and book your visit in minutes.
//         </p>

//         {/* CTA Button */}
//         {!token
//           ? <button
//               onClick={() => { navigate('/login'); scrollTo(0, 0); }}
//               className='flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full mt-6 text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 hover:gap-3 active:scale-95 transition-all duration-300'
//             >
//               Create Account
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                 <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//               </svg>
//             </button>
//           : <button
//               onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
//               className='flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full mt-6 text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 hover:gap-3 active:scale-95 transition-all duration-300'
//             >
//               Book Now
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                 <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//               </svg>
//             </button>
//         }
//       </div>

//       {/* Right Side */}
//       <div className='hidden md:block md:w-1/2 lg:w-[370px] relative z-10'>
//         <img
//           className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl'
//           src={assets.appointment_img}
//           alt="Appointment"
//         />
//       </div>

//     </div>
//   )
// }

// export default Banner

import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const steps = [
  {
    icon: "🔍",
    step: "STEP 01",
    title: "Search a Doctor",
    desc: "Find verified specialists by specialty, location, or availability.",
  },
  {
    icon: "📅",
    step: "STEP 02",
    title: "Book Appointment",
    desc: "Choose your preferred time slot and book in under 60 seconds.",
  },
  {
    icon: "💬",
    step: "STEP 03",
    title: "Consult & Get Rx",
    desc: "Chat or video call your doctor and receive your digital prescription.",
  },
];

  return (
  <>
    <section className="w-full bg-[#edf4f7] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-2xl font-extrabold text-slate-900 mb-16">
          How CareOS Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-4xl shadow-md mb-6">
                {item.icon}
              </div>

              <p className="text-blue-600 font-bold tracking-wide text-sm">
                {item.step}
              </p>

              <h3 className="text-1 font-bold text-slate-900 mt-4">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-4 max-w-sm leading-6 text-lg">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="relative w-full min-h-[35vh] flex flex-col md:flex-row items-center justify-between bg-gradient-to-br bg-[#0d6efd] via-emerald-500 to-teal-500 px-6 sm:px-8 md:px-12 lg:px-16 py-4 overflow-hidden shadow-2xl">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-16 w-36 h-36 bg-white/10 rounded-full translate-y-1/2 blur-2xl"></div>

      {/* LEFT SIDE */}
      <div className="flex-1 relative z-10 py-2 md:py-4">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-4 shadow-md">
          <span className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse"></span>
          100+ Verified Doctors Available
        </div>

        {/* Heading */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          <p>Find the Right Doctor</p>
          <p className="mt-1 text-white/95">
            and Book Your Appointment Easily
          </p>
        </div>

        {/* Description */}
        <p className="text-white/85 text-sm mt-3 max-w-lg leading-6">
          Fast, simple, and reliable — connect with trusted doctors and
          book your visit in minutes with expert healthcare professionals.
        </p>

        {/* CTA BUTTON */}
        <button
          onClick={() => {
            navigate(token ? "/doctors" : "/login");
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-2.5 rounded-full mt-4 text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          {token ? "Book Now" : "Create Account"}
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-1 justify-end relative z-10">
        <img
          className="w-full max-w-[360px] object-contain drop-shadow-2xl"
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>
    </section>
  </>
);
};

export default Banner;