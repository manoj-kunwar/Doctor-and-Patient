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