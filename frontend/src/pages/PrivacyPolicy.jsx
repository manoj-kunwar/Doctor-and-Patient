// import React from "react";

// const PrivacyPolicy = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen py-12 px-4">

//       <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-8 md:p-10">

//         {/* Title */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Privacy Policy
//         </h1>

//         <p className="text-sm text-gray-500 mb-6">
//           Last updated: {new Date().getFullYear()}
//         </p>

//         {/* Intro */}
//         <p className="text-gray-600 leading-relaxed mb-6">
//           At <span className="font-semibold text-gray-800">CareOS</span>, we value your privacy and are committed to protecting your personal information. 
//           This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
//         </p>

//         {/* Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">
//             Information We Collect
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             We may collect personal information such as your name, contact details, and relevant health data when you use our services or book appointments.
//           </p>
//         </div>

//         {/* Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">
//             How We Use Your Information
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             Your information is used to provide and improve our services, manage appointments, and enhance your overall experience on our platform.
//           </p>
//         </div>

//         {/* Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">
//             Data Protection
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             We implement strict security measures to protect your data. Your personal information is stored securely and is never shared without your consent.
//           </p>
//         </div>

//         {/* Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">
//             Your Rights
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             You have the right to access, update, or request deletion of your personal information at any time.
//           </p>
//         </div>

//         {/* Footer Note */}
//         <div className="border-t pt-4 mt-6 text-sm text-gray-500">
//           If you have any questions about this policy, please contact us at{" "}
//           <span className="text-primary font-medium">support@careos.com</span>.
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;


import React, { useState } from "react";

const sections = [
  {
    id: "collect",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" />
      </svg>
    ),
    title: "Information We Collect",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-4">
          When you use CareOS, we collect information necessary to deliver safe and personalised healthcare services. This includes:
        </p>
        <ul className="space-y-2">
          {[
            "Full name, phone number, and email address",
            "Age, gender, and date of birth",
            "Medical history and existing conditions",
            "Appointment preferences and consultation records",
            "Payment and billing information (encrypted)",
            "Device and usage data for platform improvement",
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
    id: "use",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeLinecap="round" />
      </svg>
    ),
    title: "How We Use Your Information",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-4">
          Your information is used strictly to operate, improve, and personalise your CareOS experience:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { t: "Appointment Booking", d: "Schedule and manage doctor visits seamlessly." },
            { t: "Doctor Matching", d: "Connect you with the most suitable specialists." },
            { t: "Health Records", d: "Maintain secure, accessible consultation history." },
            { t: "Notifications", d: "Send reminders, updates, and health alerts." },
            { t: "Service Improvement", d: "Analyse usage to enhance platform performance." },
            { t: "Personalised Care", d: "Tailor recommendations to your health profile." },
          ].map((item) => (
            <div key={item.t} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-700 mb-0.5">{item.t}</p>
              <p className="text-xs text-slate-400 leading-5">{item.d}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "security",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Data Security",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-5">
          Protecting your medical and personal data is our highest priority. CareOS employs industry-standard safeguards at every level:
        </p>
        <div className="space-y-3">
          {[
            { icon: "🔐", t: "End-to-End Encryption", d: "All data in transit and at rest is encrypted using AES-256." },
            { icon: "🛡️", t: "Access Controls", d: "Role-based permissions ensure only authorised personnel can access sensitive records." },
            { icon: "🔍", t: "Regular Audits", d: "Our infrastructure undergoes periodic third-party security assessments." },
            { icon: "☁️", t: "Secure Cloud Storage", d: "Data is stored on HIPAA-compliant cloud infrastructure with redundancy." },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
              <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
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
    id: "rights",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
    title: "Your Rights",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-7 mb-4">
          You are in full control of your data. At any time, you may exercise the following rights by contacting our support team:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: "Access", desc: "Request a full copy of your stored data." },
            { label: "Correction", desc: "Update inaccurate or incomplete records." },
            { label: "Deletion", desc: "Permanently remove your account and data." },
          ].map((r) => (
            <div key={r.label} className="border border-slate-200 rounded-xl p-4 text-center bg-white">
              <p className="text-sm font-bold text-emerald-600 mb-1">{r.label}</p>
              <p className="text-xs text-slate-400 leading-5">{r.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3.5">
          <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-emerald-700 leading-5">
            To exercise any of these rights, email us at{" "}
            <span className="font-semibold">privacy@careos.com</span>. We will respond within 7 business days.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="14" cy="14" r="1" fill="currentColor" />
        <circle cx="15" cy="9" r="0.8" fill="currentColor" />
      </svg>
    ),
    title: "Cookies & Tracking",
    content: (
      <p className="text-slate-600 text-sm leading-7">
        CareOS uses cookies and similar tracking technologies to keep you signed in, remember your preferences, and analyse traffic patterns. You can manage cookie preferences at any time through your browser settings. Disabling cookies may affect some platform features.
      </p>
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
    title: "Policy Updates",
    content: (
      <p className="text-slate-600 text-sm leading-7">
        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will notify you via email or a prominent notice on our platform. We encourage you to review this page periodically.
      </p>
    ),
  },
];

const PrivacyPolicy = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 mt-10">

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-slate-100 px-6 pt-16 pb-14 text-center">
        <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase mb-4">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
          Privacy <span className="text-emerald-600">Policy</span>
        </h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
          We take your privacy seriously. This policy explains what data we collect, how we use it, and the rights you hold.
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

      {/* Content */}
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

        {/* Sections */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {sections.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Section header */}
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

              {/* Collapsible body */}
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
              Questions about this policy? Contact our Data Protection Officer at{" "}
              <span className="font-semibold text-slate-700">privacy@careos.com</span> or write to us at our registered office address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;