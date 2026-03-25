import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center px-5 py-2 rounded-full bg-primary text-white font-semibold text-sm shadow-md shadow-primary/30 scale-105 transition-all duration-200"
      : "flex items-center px-5 py-2 rounded-full text-gray-600 font-medium text-sm hover:bg-primary/10 hover:text-primary hover:scale-105 transition-all duration-200";

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-between text-sm py-3 mb-5 border-b border-gray-100 shadow-sm px-6">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="h-20 w-auto cursor-pointer object-contain hover:opacity-80 transition-opacity"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-2 font-medium">
        <NavLink to="/" className={navLinkClass}>
          <li className="list-none">Home</li>
        </NavLink>

        <NavLink to="/doctors" className={navLinkClass}>
          <li className="list-none">All Doctors</li>
        </NavLink>

        <NavLink to="/about" className={navLinkClass}>
          <li className="list-none">About</li>
        </NavLink>

        <NavLink to="/contact" className={navLinkClass}>
          <li className="list-none">Contact</li>
        </NavLink>

        <NavLink to="/my-messages" className={navLinkClass}>
          <li className="list-none">Messages</li>
        </NavLink>

        {/* Admin Button */}
        <li
          onClick={() => window.open("http://localhost:5174", "_blank")}
          className="list-none cursor-pointer flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold text-sm shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 hover:scale-105 hover:from-red-600 hover:to-rose-600 active:scale-95 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Admin Panel
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer relative group">
            <img
              className="w-9 h-9 rounded-full object-cover border-2 border-primary hover:scale-105 transition-transform"
              src={userData.image}
              alt=""
            />
            <img
              className="w-2.5 group-hover:rotate-180 transition-transform duration-300"
              src={assets.dropdown_icon}
              alt=""
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded-2xl shadow-xl flex flex-col gap-1 p-2 border border-gray-100">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:bg-primary/5 hover:text-primary px-4 py-2.5 rounded-xl cursor-pointer transition-all text-sm"
                >
                  👤 My Profile
                </p>

                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:bg-primary/5 hover:text-primary px-4 py-2.5 rounded-xl cursor-pointer transition-all text-sm"
                >
                  📅 My Appointments
                </p>

                {/*  NEW */}
                <p
                  onClick={() => navigate("/my-messages")}
                  className="hover:bg-primary/5 hover:text-primary px-4 py-2.5 rounded-xl cursor-pointer transition-all text-sm"
                >
                  💬 My Messages
                </p>

                <hr className="my-1 border-gray-100" />

                <p
                  onClick={logout}
                  className="hover:bg-red-50 hover:text-red-500 px-4 py-2.5 rounded-xl cursor-pointer transition-all text-sm"
                >
                  🚪 Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hidden md:block hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 text-sm"
          >
            Create Account
          </button>
        )}

        {/* Mobile menu icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer hover:opacity-70 transition-opacity"
          src={assets.menu_icon}
          alt=""
        />

        {/* Mobile Menu */}
        <div
          className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <img
              className="h-10 w-auto object-contain"
              src={assets.logo}
              alt=""
            />
            <img
              className="w-7 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-3 mt-8 px-6">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
              className="w-full"
            >
              <p className="px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 active:scale-95 transition-all duration-200 text-center font-semibold text-sm">
                Home
              </p>
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
              className="w-full"
            >
              <p className="px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 active:scale-95 transition-all duration-200 text-center font-semibold text-sm">
                All Doctors
              </p>
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
              className="w-full"
            >
              <p className="px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 active:scale-95 transition-all duration-200 text-center font-semibold text-sm">
                About
              </p>
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
              className="w-full"
            >
              <p className="px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 active:scale-95 transition-all duration-200 text-center font-semibold text-sm">
                Contact
              </p>
            </NavLink>

            {/* Admin Button - Mobile */}
            <p
              onClick={() => {
                window.open("http://localhost:5174", "_blank");
                setShowMenu(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold text-sm shadow-md shadow-red-200 hover:shadow-lg hover:from-red-600 hover:to-rose-600 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin Panel
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
