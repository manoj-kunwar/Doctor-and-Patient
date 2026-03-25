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

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center px-8 py-3 bg-white border-b border-gray-100 shadow-sm">

      {/* Logo - clicks to user frontend */}
      <img
        onClick={() => window.open('http://localhost:5173', '_blank')}
        className="h-20 w-auto cursor-pointer object-contain hover:opacity-80 transition-opacity"
        src={assets.admin_logo}
        alt="Logo"
      />

      {/* Role Badge + Logout */}
      <div className="flex items-center gap-4">

        {/* Role Badge */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${aToken ? 'bg-primary' : dToken ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border
            ${aToken
              ? 'bg-primary/10 text-primary border-primary/30'
              : dToken
              ? 'bg-green-50 text-green-600 border-green-200'
              : 'bg-gray-100 text-gray-500 border-gray-200'
            }`}>
            {aToken ? '🛡️ Admin' : dToken ? '🩺 Doctor' : 'Guest'}
          </span>
        </div>

        {/* Logout Button */}
        {(aToken || dToken) && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-semibold shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 hover:from-red-600 hover:to-rose-600 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;