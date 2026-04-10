// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";

// const DoctorDashboard = () => {
//   const { dToken, dashData, getDashData, cancelAppointment } = useContext(DoctorContext);
//   const { currency, slotDateFormat } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) getDashData();
//   }, [dToken]);

//   return (
//     dashData && (
//       <div className="p-6 bg-gray-50 min-h-screen">

//         {/* 🔹 Dashboard Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* Earnings */}
//           <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300">
//             <img className="w-12" src={assets.earning_icon} alt="" />
//             <div>
//               <p className="text-2xl font-bold text-gray-700">
//                 {currency}{dashData.earnings}
//               </p>
//               <p className="text-gray-400 text-sm">Total Earnings</p>
//             </div>
//           </div>

//           {/* Appointments */}
//           <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300">
//             <img className="w-12" src={assets.appointments_icon} alt="" />
//             <div>
//               <p className="text-2xl font-bold text-gray-700">
//                 {dashData.appointments}
//               </p>
//               <p className="text-gray-400 text-sm">Appointments</p>
//             </div>
//           </div>

//           {/* Patients */}
//           <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300">
//             <img className="w-12" src={assets.patients_icon} alt="" />
//             <div>
//               <p className="text-2xl font-bold text-gray-700">
//                 {dashData.patients}
//               </p>
//               <p className="text-gray-400 text-sm">Patients</p>
//             </div>
//           </div>

//         </div>

//         {/* 🔹 Latest Bookings */}
//         <div className="mt-10 bg-white rounded-xl shadow-sm overflow-hidden">

//           {/* Header */}
//           <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-100">
//             <img className="w-5" src={assets.list_icon} alt="" />
//             <p className="font-semibold text-gray-700">Latest Bookings</p>
//           </div>

//           {/* List */}
//           <div>
//             {dashData.latestAppointments.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 px-6 py-4 border-b last:border-none hover:bg-gray-50 transition"
//               >
//                 {/* Profile */}
//                 <img
//                   className="w-12 h-12 rounded-full object-cover"
//                   src={item.userData.image}
//                   alt=""
//                 />

//                 {/* Info */}
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-800">
//                     {item.userData.name}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {slotDateFormat(item.slotDate)}
//                   </p>
//                 </div>

//                 {/* Status */}
//                 {item.cancelled ? (
//                   <span className="text-xs px-3 py-1 bg-red-100 text-red-500 rounded-full">
//                     Cancelled
//                   </span>
//                 ) : item.isCompleted ? (
//                   <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
//                     Completed
//                   </span>
//                 ) : (
//                   <button
//                     onClick={() => cancelAppointment(item._id)}
//                     className="p-2 rounded-full hover:bg-red-100 transition"
//                   >
//                     <img className="w-6" src={assets.cancel_icon} alt="" />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     )
//   );
// };

// export default DoctorDashboard;


import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  if (!dashData) return null;

  const cards = [
    { label: "Total Earnings", value: `${currency}${dashData.earnings}`, icon: assets.earning_icon, accent: "emerald" },
    { label: "Appointments",   value: dashData.appointments,             icon: assets.appointments_icon, accent: "violet" },
    { label: "Patients",       value: dashData.patients,                 icon: assets.patients_icon, accent: "sky" },
  ];

  const accentMap = {
    emerald: { bg: "bg-emerald-50", border: "border-emerald-100", num: "text-emerald-700" },
    violet:  { bg: "bg-violet-50",  border: "border-violet-100",  num: "text-violet-700" },
    sky:     { bg: "bg-sky-50",     border: "border-sky-100",     num: "text-sky-700" },
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-xs text-slate-400 mt-0.5">Your practice overview for today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => {
          const a = accentMap[card.accent];
          return (
            <div key={card.label} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className={`w-12 h-12 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center shrink-0`}>
                <img src={card.icon} alt={card.label} className="w-6 h-6 object-contain" />
              </div>
              <div>
                <p className={`text-2xl font-extrabold ${a.num}`}>{card.value}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Latest bookings */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img src={assets.list_icon} alt="" className="w-4 h-4 opacity-60" />
            <h2 className="text-sm font-bold text-slate-700">Latest Bookings</h2>
          </div>
          <span className="text-xs text-slate-400">{dashData.latestAppointments.length} records</span>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 px-6 py-2.5 bg-slate-50 border-b border-slate-100">
          {["Patient", "Date", "Status"].map((h) => (
            <span key={h} className={`text-xs font-bold text-slate-400 uppercase tracking-widest ${h === "Status" ? "text-right" : ""}`}>{h}</span>
          ))}
        </div>

        <div className="divide-y divide-slate-100">
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="grid grid-cols-[2fr_2fr_1fr] gap-4 items-center px-6 py-3.5 hover:bg-slate-50 transition-colors duration-100">

              {/* Patient */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{item.userData.name}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="3" />
                  <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                </svg>
                <span className="text-sm text-slate-600">{slotDateFormat(item.slotDate)}</span>
              </div>

              {/* Status */}
              <div className="flex justify-end">
                {item.cancelled ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-600 border border-red-100 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    title="Cancel"
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all duration-150"
                  >
                    <img src={assets.cancel_icon} alt="Cancel" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;