// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const MyAppointments = () => {
//   const { backendUrl, token, getDoctorsData } = useContext(AppContext);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split("_");
//     return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
//   };

//   // Fetch appointments
//   const getUserAppointments = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
//         headers: { token },
//       });

//       if (data.success) {
//         setAppointments(data.appointments.reverse());
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//     setLoading(false);
//   };

//   // Cancel appointment
//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/user/cancel-appointment`,
//         { appointmentId },
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getUserAppointments();
//         getDoctorsData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) getUserAppointments();
//   }, [token]);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">

//       {/* Header */}
//       <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3">
//         My Appointments
//       </h2>

//       {/* States */}
//       {loading ? (
//         <p className="mt-6 text-gray-500">Loading appointments...</p>
//       ) : appointments.length === 0 ? (
//         <p className="mt-6 text-gray-500">No appointments found.</p>
//       ) : (

//         <div className="mt-6 space-y-5">

//           {appointments.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 p-5 flex flex-col md:flex-row gap-5"
//             >

//               {/* Doctor Image */}
//               <img
//                 className="w-60 h-60 rounded-lg object-cover bg-indigo-50"
//                 src={item.docData.image}
//                 alt={item.docData.name}
//               />

//               {/* Info */}
//               <div className="flex-1 text-sm">
//                 <p className="text-lg font-semibold text-gray-800">
//                   {item.docData.name}
//                 </p>
//                 <p className="text-indigo-500 font-medium">
//                   {item.docData.speciality}
//                 </p>

//                 <div className="mt-2 text-gray-600">
//                   <p className="font-medium text-gray-700">Address:</p>
//                   <p className="text-xs">{item.docData.address.line1}</p>
//                   <p className="text-xs">{item.docData.address.line2}</p>
//                 </div>

//                 <p className="mt-2 text-sm text-gray-700">
//                   <span className="font-medium">Date & Time:</span>{" "}
//                   {slotDateFormat(item.slotDate)} | {item.slotTime}
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="flex flex-col gap-3 justify-center">

//                 {!item.cancelled && (
//                   <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:opacity-90 transition">
//                     Pay Online
//                   </button>
//                 )}

//                 {!item.cancelled && (
//                   <button
//                     onClick={() => cancelAppointment(item._id)}
//                     className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
//                   >
//                     Cancel Appointment
//                   </button>
//                 )}

//                 {item.cancelled && (
//                   <span className="px-4 py-2 text-sm bg-red-100 text-red-500 rounded-lg text-center">
//                     Appointment Cancelled
//                   </span>
//                 )}

//               </div>
//             </div>
//           ))}

//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAppointments;


// MyAppointments.jsx  —  Patient frontend  (replaces your existing file)
// Adds "Start Video Call" button and call history per appointment.



// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import VideoCallRoom from "../components/VideoCallRoom";

// const MyAppointments = () => {
//   const { backendUrl, token, getDoctorsData } = useContext(AppContext);

//   const [appointments, setAppointments] = useState([]);
//   const [loading,      setLoading]      = useState(false);
//   const [callData,     setCallData]     = useState(null);   // active call token data
//   const [historyMap,   setHistoryMap]   = useState({});     // appointmentId → history[]
//   const [openHistory,  setOpenHistory]  = useState(null);   // appointmentId shown

//   const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//   const slotDateFormat = (d) => {
//     const [day, m, yr] = d.split("_");
//     return `${day} ${months[Number(m) - 1]} ${yr}`;
//   };
//   const fmtDuration = (s) => `${Math.floor(s/60)}m ${s%60}s`;

//   // ── Fetch appointments ──
//   const getUserAppointments = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
//       if (data.success) setAppointments(data.appointments.reverse());
//     } catch (e) { toast.error(e.message); }
//     setLoading(false);
//   };

//   // ── Cancel ──
//   const cancelAppointment = async (id) => {
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId: id }, { headers: { token } });
//       if (data.success) { toast.success(data.message); getUserAppointments(); getDoctorsData(); }
//       else toast.error(data.message);
//     } catch (e) { toast.error(e.message); }
//   };

//   // ── Start video call ──
//   const startCall = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/video/token/user`,
//         { appointmentId },
//         { headers: { token } }
//       );
//       if (data.success) {
//         setCallData(data);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (e) { toast.error(e.message); }
//   };

//   // ── Load call history ──
//   const loadHistory = async (appointmentId) => {
//     if (openHistory === appointmentId) { setOpenHistory(null); return; }
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/video/history/${appointmentId}`);
//       if (data.success) {
//         setHistoryMap((prev) => ({ ...prev, [appointmentId]: data.callHistory }));
//         setOpenHistory(appointmentId);
//       }
//     } catch (_) {}
//   };

//   // ── Call ended callback ──
//   const handleCallEnd = ({ duration }) => {
//     setCallData(null);
//     toast.success(`Call ended — ${fmtDuration(duration)}`);
//     getUserAppointments();
//   };

//   useEffect(() => { if (token) getUserAppointments(); }, [token]);

//   // ── If in a call, show the full-screen call room ──
//   if (callData) {
//     return (
//       <VideoCallRoom
//         tokenData={callData}
//         role="patient"
//         backendUrl={backendUrl}
//         authToken={token}
//         onEnd={handleCallEnd}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">

//       {/* Header */}
//       <div className="mb-7">
//         <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
//         <p className="text-xs text-slate-400 mt-0.5">Manage your upcoming & past consultations.</p>
//       </div>

//       {loading ? (
//         <div className="flex items-center gap-2 text-slate-400 text-sm">
//           <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
//             <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
//           </svg>
//           Loading…
//         </div>
//       ) : appointments.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-24 text-slate-400">
//           <svg className="w-12 h-12 mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             <rect x="3" y="4" width="18" height="18" rx="3"/>
//             <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
//           </svg>
//           <p className="font-semibold text-sm">No appointments yet.</p>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-5">
//           {appointments.map((item, idx) => (
//             <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

//               {/* Main row */}
//               <div className="flex flex-col md:flex-row gap-5 p-5">

//                 {/* Doctor image */}
//                 <img
//                   className="w-48 h-48 rounded-xl object-cover bg-primary/5 shrink-0"
//                   src={item.docData.image}
//                   alt={item.docData.name}
//                 />

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                   <p className="text-lg font-bold text-slate-800">{item.docData.name}</p>
//                   <p className="text-primary text-sm font-medium">{item.docData.speciality}</p>

//                   <div className="mt-3 text-xs text-slate-500 space-y-1">
//                     <p>📍 {item.docData.address?.line1}{item.docData.address?.line2 ? `, ${item.docData.address.line2}` : ""}</p>
//                     <p>📅 {slotDateFormat(item.slotDate)} &nbsp;|&nbsp; {item.slotTime}</p>
//                     <p>💰 ₹{item.amount}</p>
//                   </div>

//                   {/* Status badge */}
//                   <div className="mt-3">
//                     {item.cancelled ? (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-600 border border-red-100 rounded-lg">
//                         <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />Cancelled
//                       </span>
//                     ) : item.isCompleted ? (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
//                         <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />Completed
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-100 rounded-lg">
//                         <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />Upcoming
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-col gap-2 justify-start shrink-0 min-w-[160px]">

//                   {/* ── Video Call button ── */}
//                   {!item.cancelled && (
//                     <button
//                       onClick={() => startCall(item._id)}
//                       className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 transition-all duration-150"
//                     >
//                       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                         <polygon points="23 7 16 12 23 17 23 7"/>
//                         <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
//                       </svg>
//                       Start Video Call
//                     </button>
//                   )}

//                   {/* ── Pay button ── */}
//                   {!item.cancelled && !item.payment && (
//                     <button className="flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white active:scale-95 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150">
//                       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <rect x="1" y="4" width="22" height="16" rx="2"/>
//                         <path d="M1 10h22" strokeLinecap="round"/>
//                       </svg>
//                       Pay Online
//                     </button>
//                   )}

//                   {/* ── Cancel button ── */}
//                   {!item.cancelled && (
//                     <button
//                       onClick={() => cancelAppointment(item._id)}
//                       className="flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 active:scale-95 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150"
//                     >
//                       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <circle cx="12" cy="12" r="9"/>
//                         <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/>
//                       </svg>
//                       Cancel
//                     </button>
//                   )}

//                   {/* ── Call history toggle ── */}
//                   <button
//                     onClick={() => loadHistory(item._id)}
//                     className="flex items-center justify-center gap-2 border border-slate-200 text-slate-500 hover:bg-slate-50 active:scale-95 text-xs font-semibold px-5 py-2 rounded-xl transition-all duration-150"
//                   >
//                     <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <circle cx="12" cy="12" r="9"/>
//                       <path d="M12 7v5l3 3" strokeLinecap="round"/>
//                     </svg>
//                     {openHistory === item._id ? "Hide History" : "Call History"}
//                   </button>
//                 </div>
//               </div>

//               {/* ── Call History panel ── */}
//               {openHistory === item._id && (
//                 <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
//                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Call History</p>
//                   {(historyMap[item._id] || []).length === 0 ? (
//                     <p className="text-xs text-slate-400">No calls recorded for this appointment.</p>
//                   ) : (
//                     <div className="flex flex-col gap-2">
//                       {(historyMap[item._id] || []).map((call, ci) => (
//                         <div key={ci} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5">
//                           <div className="flex items-center gap-3">
//                             <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center">
//                               <svg className="w-3.5 h-3.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                 <polygon points="23 7 16 12 23 17 23 7"/>
//                                 <rect x="1" y="5" width="15" height="14" rx="2"/>
//                               </svg>
//                             </div>
//                             <div>
//                               <p className="text-xs font-semibold text-slate-700">
//                                 {new Date(call.startedAt).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}
//                                 {" — "}
//                                 {new Date(call.startedAt).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" })}
//                               </p>
//                               <p className="text-xs text-slate-400">Initiated by {call.initiatedBy}</p>
//                             </div>
//                           </div>
//                           <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-lg">
//                             {fmtDuration(call.duration)}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAppointments;


import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import VideoCallRoom from "../components/VideoCallRoom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [callData, setCallData]         = useState(null);
  const [historyMap, setHistoryMap]     = useState({});
  const [openHistory, setOpenHistory]   = useState(null);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const slotDateFormat = (d) => {
    const [day, m, yr] = d.split("_");
    return `${day} ${months[Number(m) - 1]} ${yr}`;
  };

  const fmtDuration = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;

  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (e) { toast.error(e.message); }
    setLoading(false);
  };

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId: id },
        { headers: { token } }
      );
      if (data.success) { toast.success(data.message); getUserAppointments(); getDoctorsData(); }
      else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
  };

  const startCall = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/video/token/user`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) setCallData(data);
      else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
  };

  const loadHistory = async (appointmentId) => {
    if (openHistory === appointmentId) { setOpenHistory(null); return; }
    try {
      const { data } = await axios.get(`${backendUrl}/api/video/history/${appointmentId}`);
      if (data.success) {
        setHistoryMap((prev) => ({ ...prev, [appointmentId]: data.callHistory }));
        setOpenHistory(appointmentId);
      }
    } catch (_) {}
  };

  const handleCallEnd = ({ duration }) => {
    setCallData(null);
    toast.success(`Call ended — ${fmtDuration(duration)}`);
    getUserAppointments();
  };

  useEffect(() => { if (token) getUserAppointments(); }, [token]);

  if (callData) {
    return (
      <VideoCallRoom
        tokenData={callData}
        role="patient"
        backendUrl={backendUrl}
        authToken={token}
        onEnd={handleCallEnd}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium text-slate-800">My appointments</h1>
        <p className="text-sm text-slate-400 mt-0.5">Manage your upcoming and past consultations</p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
          </svg>
          Loading…
        </div>
      ) : appointments.length === 0 ? (

        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <svg className="w-10 h-10 opacity-25 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="3" />
            <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
          </svg>
          <p className="text-sm">No appointments yet.</p>
        </div>

      ) : (
        <div className="flex flex-col gap-3">
          {appointments.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

              {/* Main row */}
              <div className="grid grid-cols-[88px_1fr_auto] gap-4 p-4 items-start">

                {/* Doctor image / initials */}
                {item.docData.image ? (
                  <img
                    className="w-[88px] h-[88px] rounded-xl object-cover"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                ) : (
                  <div className="w-[88px] h-[88px] rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-xl font-medium text-blue-600">
                    {getInitials(item.docData.name)}
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0">
                  <p className="text-[15px] font-medium text-slate-800">{item.docData.name}</p>
                  <p className="text-sm text-blue-600 mt-0.5">{item.docData.speciality}</p>

                  <div className="mt-2.5 flex flex-col gap-1">
                    <span className="text-xs text-slate-500">
                      📍 {item.docData.address?.line1}
                      {item.docData.address?.line2 ? `, ${item.docData.address.line2}` : ""}
                    </span>
                    <span className="text-xs text-slate-500">
                      📅 {slotDateFormat(item.slotDate)} &nbsp;·&nbsp; {item.slotTime}
                    </span>
                    <span className="text-xs text-slate-500">💰 ₹{item.amount}</span>
                  </div>

                  <div className="mt-2.5">
                    {item.cancelled ? (
                      <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg px-2.5 py-1 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg px-2.5 py-1 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg px-2.5 py-1 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Upcoming
                      </span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-1.5 min-w-[130px]">

                  {!item.cancelled && (
                    <button
                      onClick={() => startCall(item._id)}
                      className="flex items-center justify-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 active:scale-95 text-sm font-medium px-3 py-2 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" />
                      </svg>
                      Video call
                    </button>
                  )}

                  {!item.cancelled && !item.payment && (
                    <button className="flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 active:scale-95 text-sm font-medium px-3 py-2 rounded-lg transition-all">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" />
                        <path d="M1 10h22" strokeLinecap="round" />
                      </svg>
                      Pay online
                    </button>
                  )}

                  {!item.cancelled && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="flex items-center justify-center gap-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 active:scale-95 text-sm font-medium px-3 py-2 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
                      </svg>
                      Cancel
                    </button>
                  )}

                  <button
                    onClick={() => loadHistory(item._id)}
                    className={`flex items-center justify-center gap-1.5 border text-xs font-medium px-3 py-2 rounded-lg active:scale-95 transition-all ${
                      openHistory === item._id
                        ? "bg-blue-50 border-blue-200 text-blue-600"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" strokeLinecap="round" />
                    </svg>
                    {openHistory === item._id ? "Hide history" : "Call history"}
                  </button>
                </div>
              </div>

              {/* Call history panel */}
              {openHistory === item._id && (
                <div className="border-t border-slate-100 bg-slate-50 px-4 py-3.5">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-2.5">
                    Call history
                  </p>
                  {(historyMap[item._id] || []).length === 0 ? (
                    <p className="text-xs text-slate-400">No calls recorded for this appointment.</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {(historyMap[item._id] || []).map((call, ci) => (
                        <div key={ci} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect x="1" y="5" width="15" height="14" rx="2" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-700">
                                {new Date(call.startedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                {" — "}
                                {new Date(call.startedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5">Initiated by {call.initiatedBy}</p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-lg">
                            {fmtDuration(call.duration)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;