import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const steps = [
  {
    icon: "🔍",
    step: "STEP 01",
    title: "Search a Doctor",
    desc: "Find verified specialists by specialty, location, or availability.",
  },
  {
    icon: "📅",
    step: "STEP 02",
    title: "Book Appointment",
    desc: "Choose your preferred time slot and book in under 60 seconds.",
  },
  {
    icon: "💬",
    step: "STEP 03",
    title: "Consult & Get Rx",
    desc: "Chat or video call your doctor and receive your digital prescription.",
  },
];

  return (
  <>
    <section className="w-full bg-[#edf4f7] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-2xl font-extrabold text-slate-900 mb-16">
          How CareOS Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-4xl shadow-md mb-6">
                {item.icon}
              </div>

              <p className="text-blue-600 font-bold tracking-wide text-sm">
                {item.step}
              </p>

              <h3 className="text-1 font-bold text-slate-900 mt-4">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-4 max-w-sm leading-6 text-lg">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="relative w-full min-h-[35vh] flex flex-col md:flex-row items-center justify-between bg-gradient-to-br bg-[#0d6efd] via-emerald-500 to-teal-500 px-6 sm:px-8 md:px-12 lg:px-16 py-4 overflow-hidden shadow-2xl">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-16 w-36 h-36 bg-white/10 rounded-full translate-y-1/2 blur-2xl"></div>

      {/* LEFT SIDE */}
      <div className="flex-1 relative z-10 py-2 md:py-4">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-4 shadow-md">
          <span className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse"></span>
          100+ Verified Doctors Available
        </div>

        {/* Heading */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          <p>Find the Right Doctor</p>
          <p className="mt-1 text-white/95">
            and Book Your Appointment Easily
          </p>
        </div>

        {/* Description */}
        <p className="text-white/85 text-sm mt-3 max-w-lg leading-6">
          Fast, simple, and reliable — connect with trusted doctors and
          book your visit in minutes with expert healthcare professionals.
        </p>

        {/* CTA BUTTON */}
        <button
          onClick={() => {
            navigate(token ? "/doctors" : "/login");
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-2.5 rounded-full mt-4 text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          {token ? "Book Now" : "Create Account"}
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-1 justify-end relative z-10">
        <img
          className="w-full max-w-[360px] object-contain drop-shadow-2xl"
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>
    </section>
  </>
);
};

export default Banner;