// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const DoctorProfile = () => {
//   const {
//     dToken,
//     profileData,
//     setProfileData,
//     getProfileData,
//     backendUrl,
//   } = useContext(DoctorContext);

//   const { currency } = useContext(AppContext);

//   const [isEdit, setIsEdit] = useState(false);

//   const updateProfile = async () => {
//     try {
//       const updateData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         available: profileData.available,
//       };

//       const { data } = await axios.post(
//         backendUrl + "/api/doctor/update-profile",
//         updateData,
//         { headers: { dtoken: dToken } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         setIsEdit(false);
//         getProfileData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (dToken) getProfileData();
//   }, [dToken]);

//   if (!profileData) return null;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">

//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">

//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row gap-8 p-6">

//           {/* Image */}
//           <img
//             className="w-full md:w-64 h-100 object-cover rounded-xl border"
//             src={profileData.image}
//             alt=""
//           />

//           {/* Info */}
//           <div className="flex-1">

//             {/* Name */}
//             <p className="text-3xl font-semibold text-gray-800">
//               {profileData.name}
//             </p>

//             {/* Degree + Speciality */}
//             <p className="text-gray-500 mt-1">
//               {profileData.degree} • {profileData.speciality}
//             </p>

//             {/* Experience */}
//             <span className="inline-block mt-2 px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full">
//               {profileData.experience}
//             </span>

//             {/* About */}
//             <div className="mt-4">
//               <p className="font-medium text-gray-700 mb-1">About</p>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {profileData.about}
//               </p>
//             </div>

//             {/* Fees */}
//             <div className="mt-4">
//               <p className="font-medium text-gray-700">
//                 Appointment Fee
//               </p>
//               {isEdit ? (
//                 <input
//                   type="number"
//                   value={profileData.fees}
//                   onChange={(e) =>
//                     setProfileData((prev) => ({
//                       ...prev,
//                       fees: e.target.value,
//                     }))
//                   }
//                   className="mt-1 px-3 py-2 border rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               ) : (
//                 <p className="text-gray-800 mt-1">
//                   {currency}{profileData.fees}
//                 </p>
//               )}
//             </div>

//             {/* Address */}
//             <div className="mt-4">
//               <p className="font-medium text-gray-700">Address</p>

//               {isEdit ? (
//                 <div className="flex flex-col gap-2 mt-1">
//                   <input
//                     type="text"
//                     value={profileData.address.line1}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         address: {
//                           ...prev.address,
//                           line1: e.target.value,
//                         },
//                       }))
//                     }
//                     className="px-3 py-2 border rounded-lg"
//                   />

//                   <input
//                     type="text"
//                     value={profileData.address.line2}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         address: {
//                           ...prev.address,
//                           line2: e.target.value,
//                         },
//                       }))
//                     }
//                     className="px-3 py-2 border rounded-lg"
//                   />
//                 </div>
//               ) : (
//                 <p className="text-gray-600 text-sm mt-1">
//                   {profileData.address.line1} <br />
//                   {profileData.address.line2}
//                 </p>
//               )}
//             </div>

//             {/* Availability */}
//             <div className="flex items-center gap-3 mt-5">
//               <label className="text-gray-700">Available</label>
//               <input
//                 type="checkbox"
//                 checked={profileData.available}
//                 onChange={() =>
//                   isEdit &&
//                   setProfileData((prev) => ({
//                     ...prev,
//                     available: !prev.available,
//                   }))
//                 }
//                 className="w-4 h-4"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="mt-6">
//               {isEdit ? (
//                 <button
//                   onClick={updateProfile}
//                   className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
//                 >
//                   Save Changes
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setIsEdit(true)}
//                   className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition"
//                 >
//                   Edit Profile
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;



import React, { useContext, useEffect, useRef, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Validate file type and size (max 5MB)
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const uploadImageToCloudinary = async (file) => {
    const imgData = new FormData();
    imgData.append("image", file);
    const { data } = await axios.post(
      backendUrl + "/api/doctor/upload-image",
      imgData,
      { headers: { dtoken: dToken, "Content-Type": "multipart/form-data" } }
    );
    if (data.success) return data.imageUrl;
    throw new Error(data.message || "Image upload failed");
  };

  const updateProfile = async () => {
    try {
      setUploading(true);

      let imageUrl = profileData.image;

      // Step 1: Upload image separately if changed
      if (imageFile) {
        try {
          imageUrl = await uploadImageToCloudinary(imageFile);
        } catch {
          // Fallback: send as FormData in single request if separate upload not available
          const formData = new FormData();
          formData.append("image", imageFile);
          formData.append("address", JSON.stringify(profileData.address));
          formData.append("fees", profileData.fees);
          formData.append("available", profileData.available);
          formData.append("name", profileData.name);
          formData.append("about", profileData.about);
          formData.append("degree", profileData.degree);
          formData.append("speciality", profileData.speciality);
          formData.append("experience", profileData.experience);
          formData.append("licenceNo", profileData.licenceNo || "");

          const { data } = await axios.post(
            backendUrl + "/api/doctor/update-profile",
            formData,
            { headers: { dtoken: dToken } }
          );
          if (data.success) {
            toast.success("Profile updated successfully!");
            setIsEdit(false);
            setPreviewImage(null);
            setImageFile(null);
            getProfileData();
          } else {
            toast.error(data.message);
          }
          setUploading(false);
          return;
        }
      }

      // Step 2: Send JSON with updated image URL
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        {
          address: profileData.address,
          fees: profileData.fees,
          available: profileData.available,
          name: profileData.name,
          about: profileData.about,
          degree: profileData.degree,
          speciality: profileData.speciality,
          experience: profileData.experience,
          licenceNo: profileData.licenceNo || "",
          image: imageUrl,
        },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        setIsEdit(false);
        setPreviewImage(null);
        setImageFile(null);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setPreviewImage(null);
    setImageFile(null);
    getProfileData();
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  if (!profileData) return null;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">My Profile</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage your public profile and availability.</p>
        </div>
        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 px-4 py-2 rounded-xl transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              disabled={uploading}
              className="text-xs font-semibold text-slate-500 border border-slate-200 hover:bg-slate-50 disabled:opacity-50 px-4 py-2 rounded-xl transition-all duration-150"
            >
              Cancel
            </button>
            <button
              onClick={updateProfile}
              disabled={uploading}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150"
            >
              {uploading ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Photo */}
            <div className="relative group">
              <img
                src={previewImage || profileData.image}
                alt={profileData.name}
                className="w-full aspect-square object-cover"
              />
              {isEdit && (
                <>
                  <div
                    onClick={() => fileRef.current.click()}
                    className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 border border-white/40 flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinejoin="round" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <span className="text-white text-xs font-semibold">Change Photo</span>
                    <span className="text-white/70 text-xs mt-0.5">JPG, PNG up to 5MB</span>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </>
              )}
              {/* New image indicator */}
              {imageFile && (
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
                  New
                </div>
              )}
            </div>

            <div className="p-4">
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full text-sm font-bold text-slate-800 border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 outline-none focus:border-emerald-400 focus:bg-white transition"
                />
              ) : (
                <p className="text-base font-bold text-slate-800">{profileData.name}</p>
              )}
              <p className="text-xs text-slate-400 mt-1">{profileData.speciality}</p>

              {/* Availability toggle */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available</span>
                <button
                  onClick={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                    profileData.available ? "bg-emerald-500" : "bg-slate-300"
                  } ${!isEdit ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                    profileData.available ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </div>
              <div className="mt-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border ${
                  profileData.available
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${profileData.available ? "bg-emerald-400 animate-pulse" : "bg-slate-400"}`} />
                  {profileData.available ? "Accepting patients" : "Not available"}
                </span>
              </div>
            </div>
          </div>

          {/* Licence card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                  <path d="M7 8h4M7 11h2" strokeLinecap="round" />
                  <circle cx="16" cy="9.5" r="2.5" />
                </svg>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Licence No.</p>
            </div>
            {isEdit ? (
              <input
                type="text"
                value={profileData.licenceNo || ""}
                onChange={(e) => setProfileData((prev) => ({ ...prev, licenceNo: e.target.value }))}
                placeholder="e.g. MCI-12345-2019"
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400 font-mono"
              />
            ) : (
              <p className={`text-sm font-mono font-semibold ${profileData.licenceNo ? "text-slate-800" : "text-slate-400 italic"}`}>
                {profileData.licenceNo || "Not provided"}
              </p>
            )}
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Professional Info */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-slate-700">Professional Info</h2>
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.experience}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g. 3 Year"
                  className="w-28 text-xs font-semibold text-violet-600 border border-violet-200 bg-violet-50 rounded-lg px-2.5 py-1 outline-none focus:border-violet-400 focus:bg-white transition placeholder:text-violet-300 text-center"
                />
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-violet-50 border border-violet-100 text-violet-600 rounded-lg">
                  {profileData.experience}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Degree</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.degree}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, degree: e.target.value }))}
                    placeholder="e.g. MBBS"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400"
                  />
                ) : (
                  <p className="text-sm font-medium text-slate-700">{profileData.degree}</p>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Speciality</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.speciality}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, speciality: e.target.value }))}
                    placeholder="e.g. Gynecologist"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400"
                  />
                ) : (
                  <p className="text-sm font-medium text-slate-700">{profileData.speciality}</p>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">About</p>
              {isEdit ? (
                <textarea
                  rows={4}
                  value={profileData.about}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition resize-none placeholder:text-slate-400"
                />
              ) : (
                <p className="text-sm text-slate-600 leading-7">{profileData.about}</p>
              )}
            </div>
          </div>

          {/* Practice Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-700 mb-5">Practice Details</h2>

            <div className="mb-5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Appointment Fee</p>
              {isEdit ? (
                <div className="relative w-44">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">{currency}</span>
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-7 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition"
                  />
                </div>
              ) : (
                <p className="text-lg font-extrabold text-slate-800">{currency}{profileData.fees}</p>
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Clinic Address</p>
              {isEdit ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={profileData.address.line1}
                    placeholder="Street address, clinic name..."
                    onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    placeholder="City, state, pin code..."
                    onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition placeholder:text-slate-400"
                  />
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-slate-400 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <p className="text-sm text-slate-600 leading-6">
                    {profileData.address.line1}<br />{profileData.address.line2}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Edit info note */}
          {isEdit && (
            <div className="flex items-start gap-2.5 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-sky-700 leading-5">
                Hover over your photo to change it (JPG/PNG, max 5MB). All changes go live immediately after saving.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;