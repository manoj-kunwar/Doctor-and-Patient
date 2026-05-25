import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [Speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const clearForm = () => {
    setDocImg(false); setName(""); setPassword(""); setEmail("");
    setAddress1(""); setAddress2(""); setAbout(""); setDegree(""); setFees("");
    setExperience("1 Year"); setSpeciality("General physician");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!docImg) return toast.error("Image Not Selected");
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", Speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor", formData, { headers: { aToken } }
      );
      if (data.success) { toast.success(data.message); clearForm(); }
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const field = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-slate-300";
  const label = "block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5";

  const specialities = [
    "General physician", "Gynecologist", "Dermatologist", "Pediatricians",
    "Neurologist", "Gastroenterologist", "Cardiologist", "Ophthalmologist",
    "Orthopedic", "Pathologist", "Pulmonologist", "Urologist",
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-7">
        <h1 className="text-xl font-bold text-slate-800">Add New Doctor</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Fill in the details below to register a new doctor to the platform.
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="max-w-4xl">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* ── Photo upload strip ── */}
          <div className="flex items-center gap-5 px-8 py-5 border-b border-slate-100 bg-slate-50">
            <label htmlFor="doc-img" className="relative cursor-pointer group shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow ring-2 ring-slate-200 group-hover:ring-primary/40 transition-all duration-200">
                <img
                  className="w-full h-full object-cover"
                  src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                  alt="Upload"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
            </label>
            <input type="file" id="doc-img" accept="image/*" hidden onChange={(e) => setDocImg(e.target.files[0])} />
            <div>
              <p className="text-sm font-semibold text-slate-700">Doctor Photo</p>
              <p className="text-xs text-slate-400 mt-0.5">JPG or PNG, max 5MB. Click the image to upload.</p>
              {docImg && (
                <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Image selected
                </span>
              )}
            </div>
          </div>

          {/* ── Form body ── */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Left column */}
              <div className="flex flex-col gap-4">

                <div>
                  <label className={label}>Doctor Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    className={field} type="text" placeholder="Dr. John Smith" required />
                </div>

                <div>
                  <label className={label}>Email Address</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)}
                    className={field} type="email" placeholder="doctor@example.com" required />
                </div>

                <div>
                  <label className={label}>Password</label>
                  <div className="relative">
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                      className={`${field} pr-10`} type={showPass ? "text" : "password"}
                      placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showPass ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" strokeLinecap="round"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" strokeLinecap="round"/>
                          <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={label}>Experience</label>
                  <select value={experience} onChange={(e) => setExperience(e.target.value)} className={field}>
                    {Array.from({ length: 50 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year{i > 0 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={label}>Consultation Fees (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">₹</span>
                    <input value={fees} onChange={(e) => setFees(e.target.value)}
                      className={`${field} pl-8`} type="number" placeholder="500" required />
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">

                <div>
                  <label className={label}>Speciality</label>
                  <select value={Speciality} onChange={(e) => setSpeciality(e.target.value)} className={field}>
                    {specialities.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={label}>Education / Degree</label>
                  <input value={degree} onChange={(e) => setDegree(e.target.value)}
                    className={field} type="text" placeholder="MBBS, MD" required />
                </div>

                <div>
                  <label className={label}>Clinic Address</label>
                  <input value={address1} onChange={(e) => setAddress1(e.target.value)}
                    className={field} type="text" placeholder="Street address, clinic name..." required />
                  <input value={address2} onChange={(e) => setAddress2(e.target.value)}
                    className={`${field} mt-2`} type="text" placeholder="City, state, pin code..." required />
                </div>

                {/* Summary card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-auto">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Summary</p>
                  <div className="space-y-2">
                    {[
                      { label: "Name",       value: name        || "—" },
                      { label: "Speciality", value: Speciality  || "—" },
                      { label: "Experience", value: experience  || "—" },
                      { label: "Fees",       value: fees ? `₹${fees}` : "—" },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{r.label}</span>
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[55%] text-right">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="mt-6">
              <label className={label}>About Doctor</label>
              <textarea value={about} onChange={(e) => setAbout(e.target.value)}
                className={`${field} resize-none`} rows={4} required
                placeholder="Write a brief description about the doctor's expertise, achievements, and specializations..." />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mt-6 pt-6 flex items-center gap-3">
              <button type="submit" disabled={submitting}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-7 py-2.5 rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all duration-150">
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <line x1="19" y1="8" x2="19" y2="14"/>
                      <line x1="22" y1="11" x2="16" y2="11"/>
                    </svg>
                    Add Doctor
                  </>
                )}
              </button>

              <button type="button" onClick={clearForm}
                className="text-sm font-semibold text-slate-500 border border-slate-200 hover:bg-slate-50 px-7 py-2.5 rounded-xl transition-all duration-150 active:scale-95">
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;