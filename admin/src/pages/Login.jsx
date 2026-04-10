// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [state, setState] = useState("Admin"); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { setAToken, backendUrl } = useContext(AdminContext);
//   const { setDToken } = useContext(DoctorContext);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
//           email,
//           password,
//         });

//         if (data.success) {
//           localStorage.setItem("aToken", data.token);
//           setAToken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
//           email,
//           password,
//         });

//         if (data.success) {
//           localStorage.setItem("dToken", data.token);
//           setDToken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-[80vh] flex items-center justify-center"
//     >
//       <div className="flex flex-col gap-3 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
//         <p className="text-2xl font-semibold text-center">
//           <span className="text-primary">{state}</span> Login
//         </p>

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="email"
//             required
//           />
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="password"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-primary text-white w-full py-2 rounded-md text-base"
//         >
//           Login
//         </button>

//         {state === "Admin" ? (
//           <p>
//             Doctor Login?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Doctor")}
//             >
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Admin Login?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Admin")}
//             >
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;


// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [state, setState] = useState("Admin"); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { setAToken, backendUrl } = useContext(AdminContext);
//   const { setDToken } = useContext(DoctorContext);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
//           email,
//           password,
//         });

//         if (data.success) {
//           localStorage.setItem("aToken", data.token);
//           setAToken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
//           email,
//           password,
//         });

//         if (data.success) {
//           localStorage.setItem("dToken", data.token);
//           setDToken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-[80vh] flex items-center justify-center"
//     >
//       <div className="flex flex-col gap-3 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
//         <p className="text-2xl font-semibold text-center">
//           <span className="text-primary">{state}</span> Login
//         </p>

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="email"
//             required
//           />
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="password"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-primary text-white w-full py-2 rounded-md text-base"
//         >
//           Login
//         </button>

//         {state === "Admin" ? (
//           <p>
//             Doctor Login?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Doctor")}
//             >
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Admin Login?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Admin")}
//             >
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;


import React, { useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        state === "Admin"
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;

      const { data } = await axios.post(endpoint, { email, password });

      if (data.success) {
        if (state === "Admin") {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = state === "Admin";

  return (
    <div className="min-h-screen flex">

      {/* ── Left — Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">

        {/* Logo */}
        <div className="mb-10 self-start w-full max-w-sm mx-auto">
          <img src={assets.admin_logo} alt="CareOS" className="h-10 w-auto object-contain" />
        </div>

        <div className="w-full max-w-sm mx-auto">

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Sign in to CareOS
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            Access your {isAdmin ? "admin panel" : "doctor portal"} below.
          </p>

          {/* Role toggle */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 mb-7 gap-1">
            {["Admin", "Doctor"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => { setState(role); setEmail(""); setPassword(""); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${
                  state === role
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {role === "Admin" ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
                    </svg>
                    Admin
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
                      <path d="M12 14c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
                    </svg>
                    Doctor
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M2 8l10 6 10-6" strokeLinecap="round" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={isAdmin ? "admin@careos.com" : "doctor@careos.com"}
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-9 pr-10 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" strokeLinecap="round" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" strokeLinecap="round" />
                      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-1 w-full py-3 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 ${
                isAdmin
                  ? "bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400"
                  : "bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400"
              } disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                  Signing in...
                </>
              ) : (
                `Sign in as ${state}`
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-xs text-center text-slate-400 mt-6">
            {isAdmin ? "Doctor?" : "Admin?"}{" "}
            <button
              type="button"
              onClick={() => { setState(isAdmin ? "Doctor" : "Admin"); setEmail(""); setPassword(""); }}
              className={`font-semibold hover:underline ${isAdmin ? "text-emerald-600" : "text-sky-600"}`}
            >
              Sign in as {isAdmin ? "Doctor" : "Admin"} instead
            </button>
          </p>
        </div>
      </div>

      {/* ── Right — Brand panel ── */}
      <div className={`hidden lg:flex flex-1 flex-col items-center justify-center px-12 text-white relative overflow-hidden ${
        isAdmin ? "bg-sky-600" : "bg-emerald-600"
      } transition-colors duration-300`}>

        {/* Background circles */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-[-40px] w-32 h-32 rounded-full bg-white/5" />

        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl bg-white/15 border border-white/20 flex items-center justify-center mb-8">
          {isAdmin ? (
            <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <h2 className="text-3xl font-extrabold text-center leading-tight mb-3">
          {isAdmin ? "Admin Control\nCenter" : "Doctor\nPortal"}
        </h2>
        <p className="text-white/70 text-sm text-center max-w-xs leading-relaxed mb-10">
          {isAdmin
            ? "Manage doctors, appointments, and platform operations from one powerful dashboard."
            : "View your schedule, manage patient appointments, and update your profile with ease."}
        </p>

        {/* Feature pills */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {(isAdmin
            ? ["Manage all doctors & patients", "Monitor appointments in real-time", "Full platform analytics"]
            : ["View upcoming appointments", "Update availability instantly", "Access patient consultation history"]
          ).map((item) => (
            <div key={item} className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-white/80 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-white/90 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;