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


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">

      {/* Section Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Book Appointments with Top Doctors</h1>
        <p className="sm:w-1/2 text-center text-sm text-gray-400 mt-2 mx-auto">
          Discover highly-rated doctors near you, check availability in real time, 
          and secure your appointment instantly — no waiting, no hassle.
       </p>
      </div>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-auto gap-5 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            className="border border-gray-100 rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-md hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 group"
            key={index}
          >
            {/* Doctor Image */}
            <div className="bg-primary/5 overflow-hidden">
              <img
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Info */}
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-xs text-green-500 font-semibold mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available
              </div>
              <p className="text-gray-800 font-semibold text-base leading-tight">{item.name}</p>
              <p className="text-primary text-xs font-medium mt-0.5">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => { navigate("/doctors"); scrollTo(0, 0); }}
        className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-10 py-3 rounded-full mt-6 text-sm font-semibold hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/20"
      >
        View All Doctors
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
    </div>
  );
};

export default TopDoctors;