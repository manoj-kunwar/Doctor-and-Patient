// import React from 'react'
// import { assets } from '../assets/assets'

// const Header = () => {
//   return (
//     <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>

//       {/* ------ left side-------- */}
//       <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10  m-auto md:py-[10vw] md:mb-[-30px]'>
//      <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading:tight'>
//         Book Appointment <br /> with Truested Doctors
//      </p>
//       <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
//         <img className='w-28' src={assets.group_profiles} alt="" />
//         <p>Simply browse through our extensive list of truested doctors,<br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
//       </div>
//       <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 '>
//         Book appointment <img  className='w-3' src={assets.arrow_icon} alt="" />
//       </a>
//         </div>
//         {/* ------ right side-------- */}
//         <div className='md:w-1/2 relative'>
//         <img  className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
//         </div>
//     </div>
//   )
// }

// export default Header

// import React from 'react'
// import { assets } from '../assets/assets'

// const Header = () => {
//   return (
//     <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden'>

//       {/* Left Side */}
//       <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[10vw] md:mb-[-30px]'>

//         {/* Badge */}
//         <div className='flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full w-fit'>
//           <span className='w-4 h-4 bg-green-400 rounded-full animate-pulse'></span>
//           Trusted by 10,000+ patients
//         </div>

//         {/* Heading */}
//         <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight'>
//           Find the Right Doctor <br />
//           and Book Your Appointment <br className='hidden lg:block' />
//           in Minutes
//         </p>

//         {/* Sub text */}
//         <div className='flex flex-col md:flex-row items-center gap-3 text-white/80 text-sm font-light'>
//           <img className='w-28 drop-shadow-md' src={assets.group_profiles} alt="" />
//           <p> Browse top doctors, view availability in real time, and book your visit — fast, easy, and reliable.<br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
//         </div>

//         {/* CTA Button */}
//         <a
//           href="#speciality"
//           className='flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full text-sm font-semibold m-auto md:m-0 shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 hover:gap-3 active:scale-95 transition-all duration-300'
//         >
//           Book Appointment
//           <img className='w-3' src={assets.arrow_icon} alt="" />
//         </a>
//       </div>

//       {/* Right Side */}
//       <div className='md:w-1/2 relative flex items-end justify-center'>
//         <img
//           className='w-full md:absolute bottom-0 h-auto rounded-lg object-cover drop-shadow-xl'
//           src={assets.header_img}
//           alt="Doctor"
//         />
//       </div>
//     </div>
//   )
// }

// export default Header

// import React, { useContext } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const { token, userData } = useContext(AppContext);
//   const navigate = useNavigate();

//   return (
//     <section className="w-full bg-[#edf4f7] relative overflow-hidden shadow-inner">
//       <div className="min-h-[92vh] w-full flex flex-col md:flex-row items-center mt-20 px-6 md:px-12 lg:px-24 gap-10">
//         {/* Left Side */}
//         <div className="md:w-1/2 flex flex-col items-start justify-center gap-8 py-16">
//           {/* Badge */}
//           <div className="flex items-center gap-2 bg-white text-gray-700 text-sm font-semibold px-5 py-2 rounded-full shadow-md border border-gray-100 backdrop-blur-sm">
//             <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
//             Now available worldwide
//           </div>

//           {/* Heading */}
//           <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
//             The place where <br />
//             <span className="text-emerald-600">doctors listen</span> — to <br />
//             you
//           </h1>

//           {/* Sub text */}
//           <div className="flex flex-col md:flex-row items-center gap-4">
//             <img
//               className="w-28 drop-shadow-md"
//               src={assets.group_profiles}
//               alt=""
//             />

//             <p className="text-lg md:text-xl text-gray-600 leading-8 max-w-xl font-medium">
//               Connect with top-rated doctors online through video consultations,
//               instant appointment booking, and digital prescriptions — all in
//               one place.
//               <br />
//               Trusted healthcare, available anytime and anywhere.
//             </p>
//           </div>

//           {/* CTA Button */}
//           <button
//             onClick={() => navigate(token && userData ? "/doctors" : "/login")}
//             className={`flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ${
//               token && userData
//                 ? "bg-white text-primary border border-gray-200"
//                 : "bg-primary text-white"
//             }`}
//           >
//             {token && userData ? "Book Appointment" : "Create Account"}
//             <img className="w-3" src={assets.arrow_icon} alt="arrow" />
//           </button>

//           {/* Stats */}
//           {/* <div className="grid grid-cols-3 gap-6 pt-8">
//             <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-3 text-center border border-gray-100">
//               <h2 className="text-4xl font-extrabold text-slate-900">500+</h2>
//               <p className="text-gray-600 mt-1 text-sm">Certified Doctors</p>
//             </div>

//             <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-3 text-center border border-gray-100">
//               <h2 className="text-4xl font-extrabold text-slate-900">50K+</h2>
//               <p className="text-gray-600 mt-1 text-sm">
//                 Trusted by 10,000+ patients
//               </p>
//             </div>

//             <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-3 text-center border border-gray-100">
//               <h2 className="text-4xl font-extrabold text-slate-900">24/7</h2>
//               <p className="text-gray-600 mt-1 text-sm">Support Available</p>
//             </div>
//           </div> */}

//           {/* Search Bar */}
//           <div className="w-full max-w-2xl mt-2">
//             <div className="flex items-center bg-white rounded-full shadow-md border border-gray-100 px-6 py-2">
//               <span className="text-xl mr-3">🔍</span>

//               <input
//                 type="text"
//                 placeholder="Search doctors, specialties, symptoms..."
//                 className="flex-1 outline-none text-gray-600 text-base bg-transparent"
//               />

//               <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
//                 Search
//               </button>
//             </div>
//           </div>
          
//         </div>
        

//         {/* Right Side */}

//         <div className="md:w-1/2 flex justify-center items-end h-[700px]">
//           <img
//             className="w-full max-w-[720px] h-full object-contain drop-shadow-2xl"
//             src={assets.header_img}
//             alt="Doctor"
//           />
//         </div>
//       </div>
//     </section>
    
    
//   );
// };

// export default Header;


import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { token, userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-[#edf4f7] relative overflow-hidden shadow-inner">
      <div className="min-h-[20vh] w-full flex flex-col md:flex-row items-center mt-20 px-6 md:px-12 lg:px-24 gap-10">
          {/* Left Side */}
         <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10">
            
            {/* Badge */}
            <div className="flex items-center gap-2 bg-white text-gray-700 text-sm font-semibold px-5 py-2 rounded-full shadow-md border border-gray-100">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              Now available worldwide
            </div>

            {/* Heading */}
           <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
              The place where <br />
              <span className="text-emerald-600">doctors listen</span> — to <br />
              you
            </h1>

            {/* Sub text */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                className="w-28 drop-shadow-md"
                src={assets.group_profiles}
                alt="profiles"
              />

              <p className="text-base md:text-lg text-gray-600 leading-6 max-w-lg font-medium">
                Connect with top-rated doctors online through video consultations,
                instant appointment booking, and digital prescriptions — all in
                one place.
                <br />
                Trusted healthcare, available anytime and anywhere.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl mt-2">
              <div className="flex items-center bg-white rounded-full shadow-md border border-gray-100 px-6 py-2">
                <span className="text-xl mr-3">🔍</span>

                <input
                  type="text"
                  placeholder="Search doctors, specialties, symptoms..."
                  className="flex-1 outline-none text-gray-600 text-base bg-transparent"
                />

                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300">
                  Search
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() =>
                navigate(token && userData ? "/doctors" : "/login")
              }
              className={`flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ${
                token && userData
                  ? "bg-white text-primary border border-gray-200"
                  : "bg-primary text-white"
              }`}
            >
              {token && userData ? "Book Appointment" : "Create Account"}
              <img
                className="w-3"
                src={assets.arrow_icon}
                alt="arrow"
              />
            </button>
          </div>

          {/* Right Side */}
         <div className="md:w-1/2 flex justify-center items-end h-[420px]">
            <img
              className="w-full max-w-[720px] h-full object-contain drop-shadow-2xl"
              src={assets.header_img}
              alt="Doctor"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
     <section className="w-full bg-[#0d6efd] py-1 mt-2 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white px-6">
          
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-3">🩺</span>
            <h2 className="text-2xl font-extrabold">500+</h2>
            <p className="text-lg mt-2 font-medium">Specialist Doctors</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl mb-3">😊</span>
            <h2 className="text-2xl font-extrabold">50K+</h2>
            <p className="text-lg mt-2 font-medium">Happy Patients</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl mb-3">⭐</span>
            <h2 className="text-2xl font-extrabold">4.8★</h2>
            <p className="text-lg mt-2 font-medium">Average Rating</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl mb-3">🕒</span>
            <h2 className="text-2xl font-extrabold">24/7</h2>
            <p className="text-lg mt-2 font-medium">Support Available</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;