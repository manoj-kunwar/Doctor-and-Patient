import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { aToken, logout: adminLogout } = useContext(AdminContext);
  const { dToken, logout: doctorLogout } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (aToken) adminLogout();
    if (dToken) doctorLogout();
    navigate("/login");
  };

  const isAdmin = Boolean(aToken);
  const isDoctor = Boolean(dToken);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="flex justify-between items-center px-6 py-3 max-w-screen-2xl mx-auto">

        {/* Left — Logo + context label */}
        <div className="flex items-center gap-4">
          <img
            onClick={() => window.open("http://localhost:5173", "_blank")}
            className="h-14 w-auto cursor-pointer object-contain opacity-90 hover:opacity-100 transition-opacity duration-150"
            src={assets.admin_logo}
            alt="CareOS"
          />
          <div className="hidden sm:block h-6 w-px bg-slate-200" />
          <span className="hidden sm:block text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {isAdmin ? "Admin Panel" : isDoctor ? "Doctor Portal" : "Dashboard"}
          </span>
        </div>

        {/* Right — role badge + actions */}
        <div className="flex items-center gap-3">

          {/* Role badge */}
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
            isAdmin
              ? "bg-sky-50 border-sky-200 text-sky-700"
              : isDoctor
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-slate-100 border-slate-200 text-slate-500"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isAdmin ? "bg-sky-500" : isDoctor ? "bg-emerald-500" : "bg-slate-400"
            }`} />
            {isAdmin ? "Administrator" : isDoctor ? "Doctor" : "Guest"}
          </div>

          {/* Divider */}
          {(isAdmin || isDoctor) && (
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          )}

          {/* Logout */}
          {(isAdmin || isDoctor) && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-600 text-xs font-semibold transition-all duration-150 active:scale-95 group"
            >
              <svg
                className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors duration-150"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;