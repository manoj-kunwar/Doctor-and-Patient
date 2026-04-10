// import React, { useState, useContext } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Contact = () => {
//   const navigate = useNavigate();
//   const { sendMessage, userData } = useContext(AppContext);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

    
//     await sendMessage({
//       ...form,
//       userId: userData?._id,
//       senderType: "user",
//     });

//     setForm({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     });
//   };

//   return (
//     <div className="px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">

//       {/* ===== Heading ===== */}
//       <div className="text-center pt-14">
//         <h1 className="text-4xl font-bold text-gray-800">
//           Contact <span className="text-primary">CareOS</span>
//         </h1>
//         <p className="text-gray-500 mt-2 text-sm">
//           Have questions? We’re here to help you.
//         </p>
//       </div>

//       {/* ===== Content Section ===== */}
//       <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">

//         {/* Image */}
//         <img
//           className="w-full md:max-w-[440px] rounded-2xl shadow-lg hover:scale-105 transition duration-500"
//           src={assets.contact_image}
//           alt="Contact"
//         />

//         {/* Info Card */}
//         <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col gap-6 w-full md:max-w-[500px]">

//           <div>
//             <p className="font-semibold text-lg text-gray-800">Our Office</p>
//             <p className="text-gray-500 text-sm">
//               54709 Williams Station <br />
//               Suite 350, Washington, USA
//             </p>
//           </div>

//           <div>
//             <p className="font-semibold text-gray-800">Contact Details</p>
//             <p className="text-gray-500 text-sm">📞 +91 98765 43210</p>
//             <p className="text-gray-500 text-sm">✉️ support@careos.com</p>
//           </div>

//           <div>
//             <p className="font-semibold text-gray-800">Working Hours</p>
//             <p className="text-gray-500 text-sm">
//               Monday - Saturday: 9:00 AM – 7:00 PM
//             </p>
//           </div>

//           <div>
//             <p className="font-semibold text-lg text-gray-800">
//               Careers at CareOS
//             </p>
//             <p className="text-gray-500 text-sm">
//               Join our team and build the future of healthcare.
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/careers")}
//             className="bg-primary text-white px-6 py-3 rounded-lg hover:scale-105 transition"
//           >
//             Explore Opportunities
//           </button>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default Contact;

import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    label: "Our Office",
    value: "54709 Williams Station, Suite 350",
    sub: "Washington, D.C., USA",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19a19.5 19.5 0 0 1-5.33-5.33 19.79 19.79 0 0 1-2.92-8.21A2 2 0 0 1 5.18 3.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 11.1A16 16 0 0 0 14.9 16.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinejoin="round" />
      </svg>
    ),
    label: "Phone",
    value: "+91 98765 43210",
    sub: "Mon – Sat, 9 AM – 7 PM",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 8l10 6 10-6" strokeLinecap="round" />
      </svg>
    ),
    label: "Email",
    value: "support@careos.com",
    sub: "We reply within 24 hours",
  },
];

const subjectOptions = [
  "Appointment Issue",
  "Doctor Verification",
  "Billing & Payments",
  "Technical Support",
  "Partnership",
  "Other",
];

const Contact = () => {
  const navigate = useNavigate();
  const { sendMessage, userData } = useContext(AppContext);

  const [form, setForm] = useState({ name: "", email: "", subject: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendMessage({ ...form, userId: userData?._id, senderType: "user" });
    setForm({ name: "", email: "", subject: "" });
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="mt-10 min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-slate-100 px-6 pt-16 pb-14 text-center">
        <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase mb-4">
          Get in touch
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
          Contact <span className="text-emerald-600">CareOS</span>
        </h1>
        <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
          Have a question, concern, or just want to say hello? Our team is ready to help — reach out any time.
        </p>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

        {/* ── Left panel (2 cols) ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <img
              src={assets.contact_image}
              alt="Contact CareOS"
              className="w-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 shadow border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Support team online</span>
            </div>
          </div>

          {/* Contact info rows */}
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors duration-150">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Careers banner */}
          <div className="bg-emerald-600 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-sm">Careers at CareOS</p>
              <p className="text-emerald-200 text-xs mt-1 leading-5">
                Help build the future of digital healthcare.
              </p>
            </div>
            <button
              onClick={() => navigate("/careers")}
              className="shrink-0 bg-white text-emerald-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-50 active:scale-95 transition-all duration-150 whitespace-nowrap"
            >
              Explore →
            </button>
          </div>
        </div>

        {/* ── Right panel — form (3 cols) ── */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Form header */}
          <div className="px-8 py-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Send us a message</h2>
            <p className="text-slate-400 text-sm mt-1">Fill in the details below and we'll get back to you shortly.</p>
          </div>

          <div className="px-8 py-7">

            {/* Success banner */}
            {submitted && (
              <div className="mb-6 flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-4 rounded-xl">
                <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">Message sent successfully!</p>
                  <p className="text-emerald-600 text-xs mt-0.5">Our team will reach out to {form.email || "you"} within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
                    </svg>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="M2 8l10 6 10-6" strokeLinecap="round" />
                    </svg>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Subject dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Subject <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
                  </svg>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none border border-slate-200 bg-slate-50 rounded-xl pl-9 pr-10 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition cursor-pointer"
                  >
                    <option value="">Select a topic...</option>
                    {subjectOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M1 1l5 5 5-5" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinejoin="round" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                By submitting, you agree to our{" "}
                <span className="text-emerald-600 cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;