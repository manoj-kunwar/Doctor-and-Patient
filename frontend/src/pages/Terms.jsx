// import React from "react";

// const Terms = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen py-12 px-4">

//       <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-8 md:p-10">

//         {/* Title */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Terms & Conditions
//         </h1>

//         <p className="text-sm text-gray-500 mb-6">
//           Last updated: {new Date().getFullYear()}
//         </p>

//         {/* Intro */}
//         <p className="text-gray-600 leading-relaxed mb-6">
//           By accessing and using <span className="font-semibold text-gray-800">CareOS</span>, 
//           you agree to comply with the following terms and conditions. Please read them carefully.
//         </p>

//         {/* Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">
//             Usage of the Platform
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             You agree to use this platform only for lawful purposes and in a way that does not infringe 
//             the rights of others or restrict their use of the service.
//           </p>
//         </div>

//         {/* Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">
//             Appointments & Services
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             CareOS facilitates appointment booking between patients and doctors. 
//             We are not responsible for doctor availability, cancellations, or outcomes of consultations.
//           </p>
//         </div>

//         {/* Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">
//             User Responsibilities
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             You are responsible for providing accurate information and maintaining the confidentiality 
//             of your account details.
//           </p>
//         </div>

//         {/* Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">
//             Changes to Terms
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             We may update these terms from time to time. Continued use of the platform indicates your 
//             acceptance of the updated terms.
//           </p>
//         </div>

//         {/* Footer Note */}
//         <div className="border-t pt-4 mt-6 text-sm text-gray-500">
//           If you have any questions about these terms, please contact us at{" "}
//           <span className="text-primary font-medium">support@careos.com</span>.
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Terms;


import React, { useState } from "react";

const sections = [
  {
    id: "services",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Use of Services",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-4">
          CareOS provides an online platform for appointment booking, teleconsultations, and healthcare support. By using our services, you agree to:
        </p>
        <ul className="space-y-2">
          {[
            "Use the platform solely for lawful healthcare-related purposes",
            "Not misuse, reverse-engineer, or attempt to disrupt the platform",
            "Comply with all applicable local, state, and national laws",
            "Refrain from sharing account credentials with third parties",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "appointments",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "Doctor Appointments",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-4">
          CareOS facilitates appointment booking but does not directly employ or control doctors. Please note the following:
        </p>
        <div className="space-y-3">
          {[
            { t: "Availability", d: "Appointment slots depend entirely on individual doctor schedules and may change without notice." },
            { t: "Cancellations", d: "CareOS is not liable for last-minute cancellations or delays caused by the doctor or clinic." },
            { t: "Treatment Outcomes", d: "CareOS does not guarantee any specific medical outcome or advice quality from consultations." },
            { t: "Emergency Care", d: "CareOS is not a substitute for emergency medical services. Call your local emergency number in urgent cases." },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-700">{item.t}</p>
                <p className="text-xs text-slate-400 leading-5 mt-0.5">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "responsibilities",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
    title: "User Responsibilities",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-4">
          As a CareOS user, you are responsible for maintaining the accuracy and integrity of the information you provide:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {[
            { label: "Accurate Info", desc: "Provide truthful personal and medical details at all times." },
            { label: "Account Security", desc: "Keep your login credentials private and secure." },
            { label: "Timely Updates", desc: "Update your profile if your health information changes." },
            { label: "Respectful Conduct", desc: "Interact respectfully with doctors and platform staff." },
          ].map((r) => (
            <div key={r.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-700 mb-0.5">{r.label}</p>
              <p className="text-xs text-slate-400 leading-5">{r.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-red-600 leading-5">
            Providing false or misleading information may result in immediate suspension or permanent termination of your account.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "payments",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M2 10h20" strokeLinecap="round" />
        <circle cx="7" cy="15" r="1.2" fill="currentColor" />
      </svg>
    ),
    title: "Payments & Refunds",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-4">
          Consultation fees are charged at the time of booking. Our payment and refund policy is as follows:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Full Refund", desc: "Cancellations made 24+ hours before the appointment." },
            { label: "Partial Refund", desc: "Cancellations within 12–24 hours of the appointment." },
            { label: "No Refund", desc: "No-shows or cancellations less than 12 hours prior." },
          ].map((r) => (
            <div key={r.label} className="border border-slate-200 rounded-xl p-4 text-center bg-white">
              <p className="text-sm font-bold text-emerald-600 mb-1">{r.label}</p>
              <p className="text-xs text-slate-400 leading-5">{r.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "ip",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
      </svg>
    ),
    title: "Intellectual Property",
    content: (
      <p className="text-slate-600 text-sm leading-7">
        All content on the CareOS platform — including logos, interface designs, text, software, and data — is the exclusive property of CareOS or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
      </p>
    ),
  },
  {
    id: "liability",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeWidth="2" />
      </svg>
    ),
    title: "Limitation of Liability",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-3">
          To the maximum extent permitted by law, CareOS shall not be liable for any indirect, incidental, or consequential damages arising from:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            "Use of or inability to access the platform",
            "Medical decisions made based on platform content",
            "Unauthorised access to your personal data",
            "Service interruptions or technical errors",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20h9" strokeLinecap="round" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" strokeLinejoin="round" />
      </svg>
    ),
    title: "Changes to Terms",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-3">
          CareOS reserves the right to modify these Terms & Conditions at any time. When material changes are made, we will notify users via email or an in-app notification at least 7 days in advance.
        </p>
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-emerald-700 leading-5">
            Continued use of the platform after changes take effect constitutes your acceptance of the updated terms.
          </p>
        </div>
      </>
    ),
  },
];

const Terms = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 mt-10">

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-slate-100 px-6 pt-16 pb-14 text-center">
        <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase mb-4">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
          Terms & <span className="text-emerald-600">Conditions</span>
        </h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
          Please read these terms carefully before using CareOS. They govern your use of our platform and services.
        </p>
        <div className="inline-flex items-center gap-2 mt-5 bg-white border border-slate-200 rounded-full px-5 py-2 shadow-sm">
          <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" strokeLinecap="round" />
          </svg>
          <span className="text-xs text-slate-500 font-medium">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        {/* Sticky nav */}
        <nav className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm lg:sticky lg:top-6 hidden lg:block">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Contents</p>
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-150"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Accordion sections */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {sections.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setActive(active === s.id ? null : s.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    {s.icon}
                  </div>
                  <h2 className="text-sm font-bold text-slate-800">{s.title}</h2>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${active === s.id ? "rotate-180" : ""}`}
                  viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                >
                  <path d="M1 1l5 5 5-5" />
                </svg>
              </button>

              {active === s.id && (
                <div className="px-6 pb-6 pt-1 border-t border-slate-100">
                  {s.content}
                </div>
              )}
            </div>
          ))}

          {/* Footer note */}
          <div className="flex items-start gap-3 bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 mt-2">
            <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-slate-500 leading-5">
              For legal enquiries, contact us at{" "}
              <span className="font-semibold text-slate-700">legal@careos.com</span>. These terms are governed by the laws of the jurisdiction in which CareOS operates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;