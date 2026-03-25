// import React from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="md:mx-10 mt-20">
//       <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm border-t pt-10">

//         {/* --------- Left Section ----------- */}
//         <div>
//           <img
//             onClick={() => navigate('/')}
//             className="mb-5 h-20 w-auto cursor-pointer object-contain"
//             src={assets.logo}
//             alt="Company Logo"
//           />
//           <p className="w-full md:w-2/3 text-gray-600 leading-6">
//             CareOS is a smart healthcare appointment platform designed to connect patients with licensed medical professionals quickly and efficiently. From booking consultations to managing prescriptions and health records, CareOS simplifies the entire healthcare experience with secure, user-friendly tools for both doctors and patients.
//           </p>

//           {/* Social Icons */}
//           <div className="flex items-center gap-3 mt-6">

//             {/* Instagram */}
//             <div className="p-2 rounded-full hover:bg-pink-100 transition cursor-pointer">
//               <img src={assets.instagramIcon} alt="instagram" className="w-6 h-6" />
//             </div>

//             {/* Facebook */}
//             <div
//               className="p-2 rounded-full hover:bg-blue-100 transition cursor-pointer">
//               <img src={assets.facebookIcon} alt="facebook" className="w-6 h-6" />
//             </div>

//             {/* Twitter */}
//             <div className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
//               <img src={assets.twitterIcon} alt="twitter" className="w-6 h-6" />
//             </div>

//             {/* LinkedIn */}
//             <div className="p-2 rounded-full hover:bg-blue-100 transition cursor-pointer">
//               <img src={assets.linkendinIcon} alt="linkedin" className="w-6 h-6" />
//             </div>

//           </div>
//         </div>

//         {/* --------- Center Section ----------- */}
//         <div>
//           <p className="text-xl font-semibold mb-5 text-gray-800">COMPANY</p>
//           <ul className="flex flex-col gap-3 text-gray-600">
//             <li
//               onClick={() => navigate('/')}
//               className="hover:text-primary cursor-pointer transition-colors"
//             >Home</li>
//             <li
//               onClick={() => navigate('/about')}
//               className="hover:text-primary cursor-pointer transition-colors"
//             >About us</li>
//             <li
//               onClick={() => navigate('/contact')}
//               className="hover:text-primary cursor-pointer transition-colors"
//             >Contact us</li>
//             <li className="hover:text-primary cursor-pointer transition-colors">
//               Privacy policy
//             </li>
//           </ul>
//         </div>

//         {/* --------- Right Section ----------- */}
//         <div>
//           <p className="text-xl font-semibold mb-5 text-gray-800">GET IN TOUCH</p>
//           <ul className="flex flex-col gap-3 text-gray-600">
//             <li className="flex items-center gap-2">
//               📞 <span>+91 123 456 7890</span>
//             </li>
//             <li className="flex items-center gap-2">
//               ✉️ <span>support@CareOS.com</span>
//             </li>

//           </ul>
//         </div>

//       </div>

//       {/* --------- Bottom Bar ----------- */}
//       <div className="border-t py-5 text-center text-sm text-gray-500">
//         <p>© {new Date().getFullYear()} CareOS. All rights reserved. </p>
//       </div>

//     </div>
//   );
// };

// export default Footer;

// import React from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();

//   return (
//     <footer className="bg-white border-t mt-20">

//       <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid gap-10 md:grid-cols-3">

//         {/* ===== Left Section ===== */}
//         <div>
//           <img
//             onClick={() => navigate("/")}
//             className="h-20 mb-5 cursor-pointer object-contain"
//             src={assets.logo}
//             alt="CareOS Logo"
//           />

//           <p className="text-gray-1200 text-sm-100 leading-relaxed max-w-md">
//             CareOS is a smart healthcare platform that connects patients with
//             trusted doctors. Book appointments, manage prescriptions, and
//             simplify your healthcare journey — all in one place.
//           </p>

//           {/* Social Icons */}
//           <div className="flex gap-3 mt-6">
//             {[assets.instagram, assets.facebook, assets.x, assets.linked,assets.youtube].map((icon, i) => (
//               <div
//                 key={i}
//                 className="p-2 bg-gray-100 rounded-full hover:bg-indigo-100 hover:scale-110 transition cursor-pointer"
//               >
//                 <img src={icon} alt="social" className="w-7 h-7" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ===== Company Links ===== */}
//         <div>
//           <p className="text-lg font-semibold text-gray-800 mb-4">
//             Company
//           </p>

//           <ul className="flex flex-col gap-3 text-gray-600 text-sm">
//             <li
//               onClick={() => navigate("/")}
//               className="hover:text-indigo-600 cursor-pointer transition"
//             >
//               Home
//             </li>

//             <li
//               onClick={() => navigate("/about")}
//               className="hover:text-indigo-600 cursor-pointer transition"
//             >
//               About Us
//             </li>

//             <li
//               onClick={() => navigate("/contact")}
//               className="hover:text-indigo-600 cursor-pointer transition"
//             >
//               Contact Us
//             </li>

//             <li className="hover:text-indigo-600 cursor-pointer transition">
//               Privacy Policy
//             </li>
//           </ul>
//         </div>

//         {/* ===== Contact Info ===== */}
//         <div>
//           <p className="text-lg font-semibold text-gray-800 mb-4">
//             Get in Touch
//           </p>

//           <ul className="flex flex-col gap-3 text-gray-600 text-sm">
//             <li className="flex items-center gap-2">
//               <span>📞</span> +91 123 456 7890
//             </li>

//             <li className="flex items-center gap-2">
//               <span>✉️</span> support@careos.com
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* ===== Bottom Bar ===== */}
//       <div className="border-t text-center py-4 text-sm text-gray-500 bg-gray-50">
//         © {new Date().getFullYear()} CareOS. All rights reserved.
//       </div>

//     </footer>
//   );
// };

// export default Footer;

// import React from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();

//   return (
//     <footer className="bg-white border-t mt-20">
//       {/* MAIN */}
//       <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid gap-10 md:grid-cols-3">
//         {/* LEFT */}
//         <div>
//           <img
//             src={assets.logo}
//             alt="logo"
//             onClick={() => navigate("/")}
//             className="h-20 mb-5 cursor-pointer"
//           />

//           <p className="text-gray-900 text-sm leading-relaxed max-w-md">
//             CareOS is a smart healthcare platform that connects patients with
//             trusted doctors. Book appointments, manage prescriptions, and
//             simplify your healthcare journey.
//           </p>

//           {/* ✅ SOCIAL ICONS WITH BRAND COLORS */}
//           <div className="flex gap-3 mt-6">
//             {/* Instagram */}
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               className="p-2 bg-gray-100 rounded-full group hover:bg-[#FF0069] hover:scale-110 transition"
//             >
//               <img
//                 src={assets.instagram}
//                 className="w-5 h-5 group-hover:invert"
//               />
//             </a>

//             {/* Facebook */}
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               className="p-2 bg-gray-100 rounded-full group hover:bg-[#0866FF] hover:scale-110 transition"
//             >
//               <img
//                 src={assets.facebook}
//                 className="w-5 h-5 group-hover:invert"
//               />
//             </a>

//             {/* X */}
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               className="p-2 bg-gray-100 rounded-full group hover:bg-black hover:scale-110 transition"
//             >
//               <img src={assets.x} className="w-5 h-5 group-hover:invert" />
//             </a>

//             {/* LinkedIn */}
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               className="p-2 bg-gray-100 rounded-full group hover:bg-[#0A66C2] hover:scale-110 transition"
//             >
//               <img src={assets.linked} className="w-5 h-5 group-hover:invert" />
//             </a>

//             {/* YouTube */}
//             <a
//               href="https://youtube.com"
//               target="_blank"
//               className="p-2 bg-gray-100 rounded-full group hover:bg-[#FF0000] hover:scale-110 transition"
//             >
//               <img
//                 src={assets.youtube}
//                 className="w-5 h-5 group-hover:invert"
//               />
//             </a>
//           </div>
//         </div>

//         {/* COMPANY */}
//         <div>
//           <p className="text-lg font-semibold text-gray-800 mb-4">Company</p>

//           <ul className="flex flex-col gap-3 text-gray-600 text-sm">
//             <li
//               onClick={() => navigate("/")}
//               className="cursor-pointer hover:text-indigo-600 transition"
//             >
//               Home
//             </li>
//             <li
//               onClick={() => navigate("/about")}
//               className="cursor-pointer hover:text-indigo-600 transition"
//             >
//               About Us
//             </li>
//             <li
//               onClick={() => navigate("/contact")}
//               className="cursor-pointer hover:text-indigo-600 transition"
//             >
//               Contact Us
//             </li>
//             <li className="cursor-pointer hover:text-indigo-600 transition">
//               Privacy Policy
//             </li>
//           </ul>
//         </div>

//         {/* CONTACT */}
//         <div>
//           <p className="text-lg font-semibold text-gray-800 mb-4">
//             Get in Touch
//           </p>

//           <ul className="flex flex-col gap-3 text-gray-600 text-sm">
//             <li className="flex items-center gap-2">📞 +91 123 456 7890</li>
//             <li className="flex items-center gap-2">✉️ support@careos.com</li>
//           </ul>
//         </div>
//       </div>

//       {/* BOTTOM */}
//       <div className="border-t text-center py-4 text-sm text-gray-500 bg-gray-50">
//         © {new Date().getFullYear()} CareOS. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { assets } from "../assets/assets";
import { useNavigate,Link } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t mt-20">

    

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid gap-10 md:grid-cols-4">

        {/* LEFT */}
        <div>
          <img
            src={assets.logo}
            alt="logo"
            onClick={() => navigate("/")}
            className="h-20 mb-5 cursor-pointer"
          />

          <p className="text-gray-900 text-sm leading-relaxed max-w-md">
            CareOS is a modern healthcare platform that connects patients with trusted doctors. 
            Find the right specialist, book appointments easily, and manage your healthcare — all in one place.
          </p>

          {/* TRUST LINE */}
          <p className="text-xs text-gray-400 mt-3">
            Trusted by patients and healthcare professionals.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-6">
            <a href="https://instagram.com" target="_blank" className="p-2 bg-gray-100 rounded-full group hover:bg-[#FF0069] hover:scale-110 transition">
              <img src={assets.instagram} className="w-5 h-5 group-hover:invert" />
            </a>

            <a href="https://facebook.com" target="_blank" className="p-2 bg-gray-100 rounded-full group hover:bg-[#0866FF] hover:scale-110 transition">
              <img src={assets.facebook} className="w-5 h-5 group-hover:invert" />
            </a>

            <a href="https://twitter.com" target="_blank" className="p-2 bg-gray-100 rounded-full group hover:bg-black hover:scale-110 transition">
              <img src={assets.x} className="w-5 h-5 group-hover:invert" />
            </a>

            <a href="https://linkedin.com" target="_blank" className="p-2 bg-gray-100 rounded-full group hover:bg-[#0A66C2] hover:scale-110 transition">
              <img src={assets.linked} className="w-5 h-5 group-hover:invert" />
            </a>
            
            <a href="https://youtube.com" target="_blank" className="p-2 bg-gray-100 rounded-full group hover:bg-[#FF0000] hover:scale-110 transition">
              <img src={assets.youtube} className="w-5 h-5 group-hover:invert"/>
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <p className="text-lg font-semibold text-gray-800 ml-20 mb-4">Quick Links</p>

          <ul className="flex flex-col gap-3 text-gray-1200 ml-20 text-sm">
            <li onClick={() => navigate("/")} className="cursor-pointer hover:text-primary">Home</li>
            <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-primary">About CareOS</li>
            <li onClick={() => navigate("/doctors")} className="cursor-pointer hover:text-primary">Find Doctors</li>
            <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-primary">Contact</li>
            <li onClick={() => navigate("/my-messages")} className="cursor-pointer hover:text-primary">Messages</li>
          </ul>
        </div>

        {/* SERVICES (NEW 🔥) */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-4">Services</p>

          <ul className="flex flex-col gap-3 text-gray-1200 text-sm">
            <li>Doctor Appointments</li>
            <li>Online Consultations</li>
            <li>Health Records</li>
            <li>Patient Support</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Contact Us
          </p>

          <ul className="flex flex-col gap-3 text-gray-1200 text-sm">
            <li>📞 +91 1234567890 </li>
            <li>✉️ support@careos.com</li>
          </ul>

          <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Legal
              </h4>
              <ul ul className="flex flex-col gap-3 text-gray-1200 text-sm">
                <li>
                  <Link to="/privacy-policy" className="cursor-pointer hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="cursor-pointer hover:text-primary">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t text-center py-4 text-sm text-gray-500 bg-gray-50">
        © {new Date().getFullYear()} CareOS. All rights reserved.
        <span className="block text-xs mt-1">
          Designed to make healthcare simple and accessible.
        </span>
      </div>
    </footer>
  );
};

export default Footer;