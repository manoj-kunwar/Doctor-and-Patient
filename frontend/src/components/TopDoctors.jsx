// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const TopDoctors = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);

//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
//       <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Browse through our extensive list of trusted doctors
//       </p>

//       <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {doctors.map((item, index) => (
//           <div
//             onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
//             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
//             key={index}
//           >
//             <img className="bg-blue-50 w-full h-40 object-cover" src={item.image} alt={item.name} />
//             <div className="p-4">
//               <div className="flex items-center gap-2 text-sm text-green-500">
//                 <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
//                 <span>Available</span>
//               </div>
//               <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//               <p className="text-gray-600 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => { navigate("/doctors"); scrollTo(0, 0); }}
//         className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
//       >
//         more
//       </button>
//     </div>
//   );
// };

// export default TopDoctors;


// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const TopDoctors = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);

//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">

//       {/* Section Header */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-800">Book Appointments with Top Doctors</h1>
//         <p className="sm:w-1/2 text-center text-sm text-gray-400 mt-2 mx-auto">
//           Discover highly-rated doctors near you, check availability in real time, 
//           and secure your appointment instantly — no waiting, no hassle.
//        </p>
//       </div>

//       {/* Doctors Grid */}
//       <div className="w-full grid grid-cols-auto gap-5 pt-5 px-3 sm:px-0">
//         {doctors.slice(0, 10).map((item, index) => (
//           <div
//             onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
//             className="border border-gray-100 rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-md hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 group"
//             key={index}
//           >
//             {/* Doctor Image */}
//             <div className="bg-primary/5 overflow-hidden">
//               <img
//                 className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
//                 src={item.image}
//                 alt={item.name}
//               />
//             </div>

//             {/* Doctor Info */}
//             <div className="p-4">
//               <div className="flex items-center gap-1.5 text-xs text-green-500 font-semibold mb-2">
//                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                 Available
//               </div>
//               <p className="text-gray-800 font-semibold text-base leading-tight">{item.name}</p>
//               <p className="text-primary text-xs font-medium mt-0.5">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* More Button */}
//       <button
//         onClick={() => { navigate("/doctors"); scrollTo(0, 0); }}
//         className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-10 py-3 rounded-full mt-6 text-sm font-semibold hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/20"
//       >
//         View All Doctors
//         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//           <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default TopDoctors;


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-4">
          Top Rated
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Book Appointments with <br className="hidden sm:block" />
          <span className="text-primary">Top Doctors</span>
        </h2>
        <p className="mt-4 text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Discover highly-rated doctors near you, check availability in real
          time, and secure your appointment instantly — no waiting, no hassle.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:border-primary/30 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-primary/5 aspect-square">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Availability badge */}
              <div className="absolute top-2 left-2">
                {item.available ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-gray-100 border border-gray-200 text-gray-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    Unavailable
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-3 sm:p-4">
              <p className="text-gray-900 font-semibold text-sm leading-tight truncate">
                {item.name}
              </p>
              <p className="text-primary text-xs font-medium mt-0.5 truncate">
                {item.speciality}
              </p>

              {/* Experience if available */}
              {item.experience && (
                <p className="text-gray-400 text-[11px] mt-1">
                  {item.experience} exp.
                </p>
              )}

              {/* Fee */}
              {item.fees && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Fee</span>
                  <span className="text-xs font-bold text-gray-800">
                    ₹{item.fees}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => { navigate("/doctors"); scrollTo(0, 0); }}
          className="group inline-flex items-center gap-2.5 bg-white border border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary px-8 py-3 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-primary/20 active:scale-95 transition-all duration-200"
        >
          View All Doctors
          <svg
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;