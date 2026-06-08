import React from "react";
import { assets } from "../assets/assets";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#071426] text-white">
      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid gap-10 md:grid-cols-4">
        {/* LEFT */}
        <div>
          <img
            src={assets.logo}
            alt="logo"
            onClick={() => navigate("/")}
            className="h-20 w-20 mb-5 cursor-pointer rounded-full"
          />

          <p className="text-white-900 text-sm leading-relaxed max-w-md">
            CareOS is a modern healthcare platform that connects patients with
            trusted doctors. Find the right specialist, book appointments
            easily, and manage your healthcare — all in one place.
          </p>

          {/* TRUST LINE */}
          <p className="text-xs text-gray-400 mt-3">
            Trusted by patients and healthcare professionals.
          </p>
        </div>

        {/* QUICK LINKS */}
        {/* RIGHT SIDE LINKS IN ONE LINE */}
        <div className="md:col-span-3 flex flex-wrap justify-between gap-8">
          {/* COMPANY */}
          <div>
            <p className="text-lg font-semibold mb-4">Company</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li
                onClick={() => navigate("/")}
                className="cursor-pointer hover:text-green-400"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/about")}
                className="cursor-pointer hover:text-green-400"
              >
                About CareOS
              </li>
              <li
                onClick={() => navigate("/doctors")}
                className="cursor-pointer hover:text-green-400"
              >
                Find Doctors
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="cursor-pointer hover:text-green-400"
              >
                Contact
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <p className="text-lg font-semibold mb-4">Services</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Doctor Appointments</li>
              <li>Join as Doctor</li>
              <li>Health Records</li>
              <li>Patient Support</li>
          
              <li>
                <a
                  href="https://doctor-and-patient-admin.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-lg font-semibold mb-4">Contact Us</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📞 +91 1234567890</li>
              <li>✉️ support@careos.com</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <p className="text-lg font-semibold mb-4">Legal</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-green-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-green-400">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            {/* SOCIAL */}
            <div className="flex gap-3 mt-[130px]">
              <a
                href="https://instagram.com"
                target="_blank"
                className="p-2 bg-gray-100 rounded-full group hover:bg-[#FF0069] hover:scale-110 transition"
              >
                <img
                  src={assets.instagram}
                  className="w-5 h-5 group-hover:invert"
                />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                className="p-2 bg-gray-100 rounded-full group hover:bg-[#0866FF] hover:scale-110 transition"
              >
                <img
                  src={assets.facebook}
                  className="w-5 h-5 group-hover:invert"
                />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                className="p-2 bg-gray-100 rounded-full group hover:bg-black hover:scale-110 transition"
              >
                <img src={assets.x} className="w-5 h-5 group-hover:invert" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                className="p-2 bg-gray-100 rounded-full group hover:bg-[#0A66C2] hover:scale-110 transition"
              >
                <img
                  src={assets.linked}
                  className="w-5 h-5 group-hover:invert"
                />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                className="p-2 bg-gray-100 rounded-full group hover:bg-[#FF0000] hover:scale-110 transition"
              >
                <img
                  src={assets.youtube}
                  className="w-5 h-5 group-hover:invert"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="  border-t text-center py-4 text-smbg-[#071426] text-white mt-20">
        © {new Date().getFullYear()} CareOS. All rights reserved.
        <span className="block text-xs mt-0">
          Designed to make healthcare simple and accessible.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
