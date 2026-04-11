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
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
    "Cardiologist",
    "Ophthalmologist",
    "Orthopedic",
    "Pathologist",
    "Pulmonologist",
    "Urologist",
  ];

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;

    // If query matches a speciality, go to that speciality route
    const matchedSpec = specialities.find((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedSpec) {
      navigate(`/doctors/${matchedSpec}`);
    } else {
      // Otherwise pass as ?search= so Doctors page can pick it up
      navigate(`/doctors?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="w-full bg-gradient-to-br from-[#f0f7ff] via-[#edf4f7] to-[#e8f5f0] relative overflow-hidden">
        <div className="min-h-[80vh] max-w-screen-xl mx-auto flex flex-col md:flex-row items-center mt-16 px-6 md:px-12 lg:px-20 gap-8">

          {/* ── Left ── */}
          <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 py-12">

            {/* Badge */}
            <div className="flex items-center gap-2 bg-white text-gray-600 text-xs font-semibold px-4 py-2 rounded-full border border-gray-100 shadow-sm w-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Now available worldwide
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.15] tracking-tight text-slate-900">
              The place where <br />
              <span className="text-blue-600">doctors listen</span> —{" "}
              <br className="hidden md:block" />
              to you
            </h1>

            {/* Subtext */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                className="w-24 drop-shadow-sm flex-shrink-0"
                src={assets.group_profiles}
                alt="profiles"
              />
              <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                Connect with top-rated doctors through video consultations,
                instant appointment booking, and digital prescriptions — all in
                one place. Trusted healthcare, available anytime.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-xl mt-1">
              <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm px-5 py-1.5 gap-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <svg
                  className="w-4 h-4 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search doctors, specialties, symptoms..."
                  className="flex-1 outline-none text-sm text-gray-700 py-2 bg-transparent placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-300 hover:text-gray-500 text-xl leading-none mr-1 transition"
                  >
                    ×
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200"
                >
                  Search
                </button>
              </div>

              {/* Quick suggestion pills */}
              <div className="flex flex-wrap gap-2 mt-3 px-1">
                {["Cardiologist", "Dermatologist", "Neurologist", "Pediatricians"].map((s) => (
                  <button
                    key={s}
                    onClick={() => navigate(`/doctors/${s}`)}
                    className="text-xs text-gray-500 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 px-3 py-1 rounded-full transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={() => navigate(token && userData ? "/doctors" : "/login")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  token && userData
                    ? "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 shadow-sm"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                }`}
              >
                {token && userData ? "Book Appointment" : "Create Account"}
                <img className="w-3" src={assets.arrow_icon} alt="arrow" />
              </button>

              {!(token && userData) && (
                <button
                  onClick={() => navigate("/doctors")}
                  className="text-sm text-gray-500 hover:text-blue-600 font-medium underline underline-offset-2 transition"
                >
                  Browse doctors →
                </button>
              )}
            </div>
          </div>

          {/* ── Right ── */}
          <div className="md:w-1/2 flex justify-center items-end h-[440px] md:h-[520px]">
            <img
              className="w-full max-w-[640px] h-full object-contain object-bottom select-none"
              src={assets.header_img}
              alt="Doctor"
            />
          </div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </section>

      {/* ── Stats Bar ── */}
      <section className="w-full bg-blue-600 py-5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-12">
          {[
            { icon: "🩺", value: "500+", label: "Specialist Doctors" },
            { icon: "😊", value: "50K+", label: "Happy Patients" },
            { icon: "⭐", value: "4.8", label: "Average Rating" },
            { icon: "🕒", value: "24/7", label: "Support Available" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 justify-center">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-white font-bold text-lg leading-tight">{stat.value}</p>
                <p className="text-blue-100 text-xs font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Header;