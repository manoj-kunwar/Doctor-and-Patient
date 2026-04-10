// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const DoctorAppointments = () => {
//   const {
//     dToken,
//     appointments,
//     getAppointments,
//     completeAppointment,
//     cancelAppointment,
//   } = useContext(DoctorContext);

//   const { calculateAge, slotDateFormate, currency } =
//     useContext(AppContext);

//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken]);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">

//       {/* Heading */}
//       <p className="text-2xl font-semibold text-gray-700 mb-6">
//         All Appointments
//       </p>

//       {/* Container */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">

//         {/* Header */}
//         <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] px-6 py-4 border-b bg-gray-50 text-gray-600 text-sm font-medium">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {/* List */}
//         <div className="max-h-[75vh] overflow-y-auto">

//           {appointments.length > 0 ? (
//             appointments.map((item, index) => (
//               <div
//                 key={index}
//                 className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center px-6 py-4 border-b text-sm hover:bg-gray-50 transition"
//               >
//                 {/* Index */}
//                 <p className="hidden md:block text-gray-500">
//                   {index + 1}
//                 </p>

//                 {/* Patient */}
//                 <div className="flex items-center gap-3">
//                   <img
//                     className="w-10 h-10 rounded-full object-cover border"
//                     src={item.userData.image}
//                     alt=""
//                   />
//                   <p className="text-gray-800 font-medium">
//                     {item.userData.name}
//                   </p>
//                 </div>

//                 {/* Payment */}
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
//                     item.payment
//                       ? "bg-green-100 text-green-600"
//                       : "bg-yellow-100 text-yellow-600"
//                   }`}
//                 >
//                   {item.payment ? "Online" : "Cash"}
//                 </span>

//                 {/* Age */}
//                 <p className="hidden md:block text-gray-600">
//                   {calculateAge(item.userData.dob)}
//                 </p>

//                 {/* Date */}
//                 <p className="text-gray-600">
//                   {slotDateFormate(item.slotDate)}, {item.slotTime}
//                 </p>

//                 {/* Fees */}
//                 <p className="font-medium text-gray-800">
//                   {currency}
//                   {item.amount}
//                 </p>

//                 {/* Status / Actions */}
//                 {item.cancelled ? (
//                   <span className="px-3 py-1 text-xs bg-red-100 text-red-500 rounded-full w-fit">
//                     Cancelled
//                   </span>
//                 ) : item.isCompleted ? (
//                   <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full w-fit">
//                     Completed
//                   </span>
//                 ) : (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => cancelAppointment(item._id)}
//                       className="p-2 rounded-lg hover:bg-red-100 transition"
//                     >
//                       <img
//                         className="w-5"
//                         src={assets.cancel_icon}
//                         alt="Cancel"
//                       />
//                     </button>

//                     <button
//                       onClick={() => completeAppointment(item._id)}
//                       className="p-2 rounded-lg hover:bg-green-100 transition"
//                     >
//                       <img
//                         className="w-5"
//                         src={assets.tick_icon}
//                         alt="Complete"
//                       />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400 py-10">
//               No appointments found
//             </p>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;


// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const DoctorAppointments = () => {
//   const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } =
//     useContext(DoctorContext);
//   const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) getAppointments();
//   }, [dToken]);

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">

//       {/* Page header */}
//       <div className="mb-6">
//         <h1 className="text-xl font-bold text-slate-800">All Appointments</h1>
//         <p className="text-xs text-slate-400 mt-0.5">{appointments.length} total records</p>
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

//         {/* Column headers */}
//         <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100">
//           {["#", "Patient", "Payment", "Age", "Date & Time", "Fees", "Action"].map((h) => (
//             <span key={h} className="text-xs font-bold text-slate-400 uppercase tracking-widest">{h}</span>
//           ))}
//         </div>

//         {/* Rows */}
//         <div className="max-h-[75vh] overflow-y-auto divide-y divide-slate-100">
//           {appointments.length > 0 ? (
//             appointments.map((item, index) => (
//               <div
//                 key={index}
//                 className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center px-6 py-3.5 hover:bg-slate-50 transition-colors duration-100"
//               >
//                 {/* # */}
//                 <span className="hidden md:block text-xs text-slate-400 font-medium">{index + 1}</span>

//                 {/* Patient */}
//                 <div className="flex items-center gap-3 min-w-0">
//                   <img
//                     src={item.userData.image}
//                     alt={item.userData.name}
//                     className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
//                   />
//                   <p className="text-sm font-semibold text-slate-800 truncate">{item.userData.name}</p>
//                 </div>

//                 {/* Payment */}
//                 <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg w-fit border ${
//                   item.payment
//                     ? "bg-emerald-50 text-emerald-700 border-emerald-100"
//                     : "bg-amber-50 text-amber-700 border-amber-100"
//                 }`}>
//                   <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.payment ? "bg-emerald-400" : "bg-amber-400"}`} />
//                   {item.payment ? "Online" : "Cash"}
//                 </span>

//                 {/* Age */}
//                 <span className="hidden md:block text-sm text-slate-600">
//                   {calculateAge(item.userData.dob)} yrs
//                 </span>

//                 {/* Date & Time */}
//                 <div className="flex items-center gap-2">
//                   <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                     <rect x="3" y="4" width="18" height="18" rx="3" />
//                     <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
//                   </svg>
//                   <span className="text-sm text-slate-600">{slotDateFormate(item.slotDate)}, {item.slotTime}</span>
//                 </div>

//                 {/* Fees */}
//                 <span className="text-sm font-bold text-slate-800">{currency}{item.amount}</span>

//                 {/* Status / Actions */}
//                 {item.cancelled ? (
//                   <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-600 border border-red-100 rounded-lg w-fit">
//                     <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
//                     Cancelled
//                   </span>
//                 ) : item.isCompleted ? (
//                   <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg w-fit">
//                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
//                     Completed
//                   </span>
//                 ) : (
//                   <div className="flex items-center gap-1.5">
//                     <button
//                       onClick={() => cancelAppointment(item._id)}
//                       title="Cancel"
//                       className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all duration-150"
//                     >
//                       <img src={assets.cancel_icon} alt="Cancel" className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => completeAppointment(item._id)}
//                       title="Complete"
//                       className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-150"
//                     >
//                       <img src={assets.tick_icon} alt="Complete" className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
//                 <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <rect x="3" y="4" width="18" height="18" rx="3" />
//                   <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
//                 </svg>
//               </div>
//               <p className="text-sm font-semibold text-slate-600">No appointments found</p>
//               <p className="text-xs text-slate-400 mt-1">Bookings will appear here once patients schedule</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;

// DoctorAppointments.jsx  —  Admin/Doctor panel (replaces existing file)
// Full table with "Start Call" button and call history drawer.

import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import VideoCallRoom from "../../components/VideoCallRoom";

const fmtDuration = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;

const DoctorAppointments = () => {
  const {
    dToken, appointments, getAppointments,
    completeAppointment, cancelAppointment, backendUrl,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

  const [callData,    setCallData]    = useState(null);
  const [historyMap,  setHistoryMap]  = useState({});
  const [openHistory, setOpenHistory] = useState(null);
  const [search,      setSearch]      = useState("");

  useEffect(() => { if (dToken) getAppointments(); }, [dToken]);

  // ── Start call ──
  const startCall = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/video/token/doctor`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );
      if (data.success) setCallData(data);
      else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
  };

  // ── Load call history ──
  const loadHistory = async (appointmentId) => {
    if (openHistory === appointmentId) { setOpenHistory(null); return; }
    try {
      const { data } = await axios.get(`${backendUrl}/api/video/history/${appointmentId}`);
      if (data.success) {
        setHistoryMap((p) => ({ ...p, [appointmentId]: data.callHistory }));
        setOpenHistory(appointmentId);
      }
    } catch (_) {}
  };

  const handleCallEnd = ({ duration }) => {
    setCallData(null);
    toast.success(`Call ended — ${fmtDuration(duration)}`);
    getAppointments();
  };

  // ── Filter ──
  const filtered = appointments.filter((a) =>
    a.userData?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Full-screen call ──
  if (callData) {
    return (
      <VideoCallRoom
        tokenData={callData}
        role="doctor"
        backendUrl={backendUrl}
        authToken={dToken}
        onEnd={handleCallEnd}
      />
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">All Appointments</h1>
          <p className="text-xs text-slate-400 mt-0.5">{filtered.length} records</p>
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search patient…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary bg-white w-56"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Column headers */}
        <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_1fr_2fr_1fr_1.8fr] gap-3 px-5 py-3 bg-slate-50 border-b border-slate-100">
          {["#", "Patient", "Payment", "Age", "Date & Time", "Fees", "Actions"].map((h) => (
            <span key={h} className="text-xs font-bold text-slate-400 uppercase tracking-widest">{h}</span>
          ))}
        </div>

        <div className="max-h-[74vh] overflow-y-auto divide-y divide-slate-100">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <React.Fragment key={idx}>
                {/* Main row */}
                <div className="grid md:grid-cols-[0.4fr_2fr_1fr_1fr_2fr_1fr_1.8fr] gap-3 items-center px-5 py-3.5 hover:bg-slate-50 transition-colors duration-100">

                  <span className="hidden md:block text-xs text-slate-400 font-medium">{idx + 1}</span>

                  {/* Patient */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.userData.image} alt={item.userData.name}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"/>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.userData.name}</p>
                    </div>
                  </div>

                  {/* Payment */}
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-lg border w-fit ${
                    item.payment
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-amber-50 text-amber-700 border-amber-100"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.payment ? "bg-emerald-400" : "bg-amber-400"}`}/>
                    {item.payment ? "Online" : "Cash"}
                  </span>

                  {/* Age */}
                  <span className="hidden md:block text-sm text-slate-600">
                    {calculateAge(item.userData.dob)} yrs
                  </span>

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="4" width="18" height="18" rx="3"/>
                      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm text-slate-600">{slotDateFormate(item.slotDate)}, {item.slotTime}</span>
                  </div>

                  {/* Fees */}
                  <span className="text-sm font-bold text-slate-800">{currency}{item.amount}</span>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.cancelled ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-red-50 text-red-600 border border-red-100 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"/>Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>Completed
                      </span>
                    ) : (
                      <>
                        {/* ── Video Call ── */}
                        <button
                          onClick={() => startCall(item._id)}
                          title="Start Video Call"
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white text-xs font-bold rounded-lg transition-all duration-150 shadow-sm shadow-sky-200"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7"/>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                          </svg>
                          Call
                        </button>

                        {/* ── Complete ── */}
                        <button onClick={() => completeAppointment(item._id)} title="Complete"
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-150">
                          <img src={assets.tick_icon} alt="Complete" className="w-4 h-4"/>
                        </button>

                        {/* ── Cancel ── */}
                        <button onClick={() => cancelAppointment(item._id)} title="Cancel"
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all duration-150">
                          <img src={assets.cancel_icon} alt="Cancel" className="w-4 h-4"/>
                        </button>
                      </>
                    )}

                    {/* ── History ── */}
                    <button onClick={() => loadHistory(item._id)} title="Call History"
                      className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all duration-150 ${
                        openHistory === item._id
                          ? "bg-violet-50 border-violet-200 text-violet-500"
                          : "border-slate-200 hover:bg-violet-50 hover:border-violet-200 text-slate-400 hover:text-violet-500"
                      }`}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ── History panel ── */}
                {openHistory === item._id && (
                  <div className="bg-slate-50 border-t border-slate-100 px-5 py-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Call History</p>
                    {(historyMap[item._id] || []).length === 0 ? (
                      <p className="text-xs text-slate-400">No calls recorded.</p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {(historyMap[item._id] || []).map((call, ci) => (
                          <div key={ci} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polygon points="23 7 16 12 23 17 23 7"/>
                                  <rect x="1" y="5" width="15" height="14" rx="2"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-700">
                                  {new Date(call.startedAt).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}
                                  {" "}{new Date(call.startedAt).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" })}
                                </p>
                                <p className="text-xs text-slate-400">Initiated by {call.initiatedBy}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-lg">
                              {fmtDuration(call.duration)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <p className="text-sm font-semibold">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;