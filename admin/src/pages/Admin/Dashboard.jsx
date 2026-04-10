// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const Dashboard = () => {
//   const {
//     aToken,
//     getDashData,
//     cancelAppointment,
//     completeAppointment,
//     dashData,
//   } = useContext(AdminContext);

//   const { slotDateFormat } = useContext(AppContext);

//   useEffect(() => {
//     if (aToken) {
//       getDashData();
//     }
//   }, [aToken]);

//   if (!dashData) {
//     return (
//       <div className="p-6 text-gray-500 text-center">Loading dashboard...</div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">

//       {/* ===== Top Stats Cards ===== */}
//       <div className="flex flex-wrap gap-5">

//         {/* Doctors */}
//         <div className="flex items-center gap-4 bg-white p-5 min-w-[220px] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
//           <img className="w-12" src={assets.doctor_icon} alt="Doctors" />
//           <div>
//             <p className="text-2xl font-bold text-gray-700">
//               {dashData.doctors}
//             </p>
//             <p className="text-gray-400 text-sm">Doctors</p>
//           </div>
//         </div>

//         {/* Appointments */}
//         <div className="flex items-center gap-4 bg-white p-5 min-w-[220px] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
//           <img
//             className="w-12"
//             src={assets.appointments_icon}
//             alt="Appointments"
//           />
//           <div>
//             <p className="text-2xl font-bold text-gray-700">
//               {dashData.appointments}
//             </p>
//             <p className="text-gray-400 text-sm">Appointments</p>
//           </div>
//         </div>

//         {/* Patients */}
//         <div className="flex items-center gap-4 bg-white p-5 min-w-[220px] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
//           <img className="w-12" src={assets.patients_icon} alt="Patients" />
//           <div>
//             <p className="text-2xl font-bold text-gray-700">
//               {dashData.patients}
//             </p>
//             <p className="text-gray-400 text-sm">Patients</p>
//           </div>
//         </div>
//       </div>

//       {/* ===== Latest Bookings ===== */}
//       <div className="bg-white mt-8 rounded-xl shadow-sm overflow-hidden">

//         {/* Header */}
//         <div className="flex items-center gap-3 px-5 py-4 border-b bg-gray-50">
//           <img className="w-5" src={assets.list_icon} alt="List" />
//           <p className="font-semibold text-gray-700">Latest Bookings</p>
//         </div>

//         {/* List */}
//         <div>
//           {dashData.latestAppointments.length > 0 ? (
//             dashData.latestAppointments.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center px-5 py-4 gap-4 border-b last:border-none hover:bg-gray-50 transition"
//               >
//                 {/* Doctor Image */}
//                 <img
//                   className="rounded-full w-11 h-11 object-cover border"
//                   src={item.docData.image}
//                   alt={item.docData.name}
//                 />

//                 {/* Info */}
//                 <div className="flex-1">
//                   <p className="text-gray-800 font-semibold">
//                     {item.docData.name}
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     {slotDateFormat(item.slotDate)}
//                   </p>
//                 </div>

//                 {/* Status / Actions */}
//                 {item.cancelled ? (
//                   <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-500 rounded-full">
//                     Cancelled
//                   </span>
//                 ) : item.isCompleted ? (
//                   <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
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
//             <p className="text-center text-gray-400 py-6">
//               No appointments found
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ── helpers ──────────────────────────────────────────────────────────────────

const getLast6Months = (appointments = []) => {
  const map = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString("default", { month: "short" });
    map[key] = { month: key, revenue: 0, patients: 0 };
  }
  appointments.forEach((a) => {
    const d = new Date(parseInt(a.slotDate?.split("_").reverse().join("-")) || a.date);
    const key = d.toLocaleString("default", { month: "short" });
    if (map[key]) {
      if (a.isCompleted && a.amount) map[key].revenue += a.amount;
      map[key].patients += 1;
    }
  });
  return Object.values(map);
};

const getPieData = (appointments = []) => {
  let scheduled = 0, completed = 0, cancelled = 0, inProgress = 0;
  appointments.forEach((a) => {
    if (a.cancelled) cancelled++;
    else if (a.isCompleted) completed++;
    else inProgress++;
    scheduled++;
  });
  const total = appointments.length || 1;
  return [
    { name: "Scheduled",  value: Math.round((scheduled / total) * 100),  color: "#f97316" },
    { name: "Completed",  value: Math.round((completed / total) * 100),  color: "#10b981" },
    { name: "Cancelled",  value: Math.round((cancelled / total) * 100),  color: "#f59e0b" },
    { name: "In Progress",value: Math.round((inProgress / total) * 100), color: "#3b82f6" },
  ].filter((d) => d.value > 0);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md px-4 py-3 text-xs">
      <p className="font-bold text-slate-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name} : {p.name === "Revenue" ? `₹${p.value}` : p.value}
        </p>
      ))}
    </div>
  );
};

const PieLabel = ({ cx, cy, midAngle, outerRadius, name, value }) => {
  const RADIAN = Math.PI / 180;
  const x = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
  const y = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central" className="text-xs fill-slate-500 font-medium" fontSize={11}>
      {name} {value}%
    </text>
  );
};

// ── component ─────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const {
    aToken, getDashData, cancelAppointment,
    completeAppointment, dashData,
  } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => { if (aToken) getDashData(); }, [aToken]);

  if (!dashData) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex items-center gap-3 text-slate-400 text-sm">
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
        </svg>
        Loading dashboard...
      </div>
    </div>
  );

  const allAppointments = dashData.latestAppointments || [];
  const chartData = getLast6Months(allAppointments);
  const pieData  = getPieData(allAppointments);

  const totalRevenue = allAppointments
    .filter((a) => a.isCompleted)
    .reduce((s, a) => s + (a.amount || 0), 0);

  const statCards = [
    {
      label: "Total Patients",
      sub: "Registered patients",
      value: dashData.patients,
      icon: assets.patients_icon,
      bg: "bg-sky-50", border: "border-sky-100", num: "text-sky-700",
    },
    {
      label: "Total Doctors",
      sub: "Registered doctors",
      value: dashData.doctors,
      icon: assets.doctor_icon,
      bg: "bg-violet-50", border: "border-violet-100", num: "text-violet-700",
    },
    {
      label: "Total Appointments",
      sub: `${allAppointments.filter(a => a.isCompleted).length} completed`,
      value: dashData.appointments,
      icon: assets.appointments_icon,
      bg: "bg-emerald-50", border: "border-emerald-100", num: "text-emerald-700",
    },
    {
      label: "Total Revenue",
      sub: "From completed consultations",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: null,
      rupee: true,
      bg: "bg-amber-50", border: "border-amber-100", num: "text-amber-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back — here's what's happening today.</p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c) => (
          <div key={c.label}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start justify-between hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            <div>
              <p className="text-xs text-slate-400 font-medium">{c.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${c.num}`}>{c.value}</p>
              <p className="text-[11px] text-slate-400 mt-1">{c.sub}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
              {c.rupee ? (
                <span className={`text-base font-bold ${c.num}`}>₹</span>
              ) : (
                <img src={c.icon} alt="" className="w-5 h-5 object-contain" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Monthly Revenue line chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-700">Monthly Revenue</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">
            Revenue from completed consultations over the past six months
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" name="Revenue"
                stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1" }}
                activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status pie chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-700">Appointment Status</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">Distribution of appointment statuses</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80}
                dataKey="value" labelLine={false}
                label={<PieLabel />}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── User Growth + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* User growth bar chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-700">User Growth</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">New user registrations over the last 6 months</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="patients" name="Patients" fill="#818cf8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-700">Quick Actions</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">Common administrative tasks</p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Manage Users", icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                  <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
                </svg>
              )},
              { label: "Process Payments", icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <path d="M1 10h22" strokeLinecap="round"/>
                </svg>
              )},
              { label: "Add New Doctor", icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
              )},
              { label: "View All Appointments", icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="3"/>
                  <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
                </svg>
              )},
            ].map((action) => (
              <button key={action.label}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150">
                <span className="text-slate-400">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Latest Bookings ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img src={assets.list_icon} alt="" className="w-4 h-4 opacity-60" />
            <h2 className="text-sm font-bold text-slate-700">Latest Bookings</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {allAppointments.length} records
          </span>
        </div>

        <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 px-6 py-2.5 bg-slate-50 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</span>
        </div>

        {allAppointments.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {allAppointments.map((item, index) => (
              <div key={index}
                className="grid grid-cols-[2fr_2fr_1fr] gap-4 items-center px-6 py-3.5 hover:bg-slate-50 transition-colors duration-100">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={item.docData.image} alt={item.docData.name}
                    className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.docData.name}</p>
                    <p className="text-xs text-slate-400 truncate">{item.docData.speciality}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="3"/>
                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm text-slate-600">{slotDateFormat(item.slotDate)}</span>
                </div>
                <div className="flex justify-end">
                  {item.cancelled ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-600 border border-red-100 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />Completed
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => cancelAppointment(item._id)} title="Cancel"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all duration-150 group">
                        <img src={assets.cancel_icon} alt="Cancel" className="w-4 h-4 group-hover:opacity-80" />
                      </button>
                      <button onClick={() => completeAppointment(item._id)} title="Complete"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-150 group">
                        <img src={assets.tick_icon} alt="Complete" className="w-4 h-4 group-hover:opacity-80" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="3"/>
                <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-600">No appointments yet</p>
            <p className="text-xs text-slate-400 mt-1">New bookings will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;