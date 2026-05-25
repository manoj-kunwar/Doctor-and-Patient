import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData, setUserData } =
    useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center px-5 py-2 rounded-full bg-primary text-white font-semibold text-sm shadow-md shadow-primary/30 transition-all duration-200"
      : "flex items-center px-5 py-2 rounded-full text-gray-600 font-medium text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200";

  return (
    <div className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-between text-[11px] py-0.5 px-2 border-b border-gray-100 shadow-sm">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="h-20 w-auto cursor-pointer object-contain hover:opacity-80 transition-opacity"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-2 font-medium">
        <li>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/doctors" className={navLinkClass}>
            All Doctors
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {token ? (
          <div className="flex items-center gap-2 cursor-pointer relative group">

            <img
              className="w-9 h-9 rounded-full object-cover border-2 border-primary"
              src={userData?.image || assets.profile_pic}
              alt="User"
            />

            <img
              className="w-2.5 group-hover:rotate-180 transition-transform duration-300"
              src={assets.dropdown_icon}
              alt="Dropdown"
            />

            {/* Dropdown */}
            <div className="absolute top-0 right-0 pt-14 hidden group-hover:block z-20">
              <div className="min-w-48 bg-white rounded-2xl shadow-xl flex flex-col gap-1 p-2 border border-gray-100">

                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:bg-primary/5 hover:text-primary px-4 py-2.5 rounded-xl cursor-pointer text-sm"
                >
                  👤 My Profile
                </p>

                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:bg-primary/5 hover:text-primary px-4 py-2.5 rounded-xl cursor-pointer text-sm"
                >
                  📅 My Appointments
                </p>

                <p
                  onClick={() => navigate("/my-messages")}
                  className="hover:bg-primary/5 hover:text-primary px-4 py-2.5 rounded-xl cursor-pointer text-sm"
                >
                  💬 My Messages
                </p>

                <hr className="my-1 border-gray-100" />

                <p
                  onClick={logout}
                  className="hover:bg-red-50 hover:text-red-500 px-4 py-2.5 rounded-xl cursor-pointer text-sm"
                >
                  🚪 Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hidden md:block hover:bg-primary/90 transition-all duration-200 shadow-md"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <img
              className="h-10 w-auto"
              src={assets.logo}
              alt="Logo"
            />

            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          <ul className="flex flex-col items-center gap-3 mt-8 px-6">
            <li className="w-full">
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/"
                className="block px-6 py-3 rounded-full bg-primary/10 text-primary text-center font-semibold text-sm"
              >
                Home
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/doctors"
                className="block px-6 py-3 rounded-full bg-primary/10 text-primary text-center font-semibold text-sm"
              >
                All Doctors
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/about"
                className="block px-6 py-3 rounded-full bg-primary/10 text-primary text-center font-semibold text-sm"
              >
                About
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/contact"
                className="block px-6 py-3 rounded-full bg-primary/10 text-primary text-center font-semibold text-sm"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

