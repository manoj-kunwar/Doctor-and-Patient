// import React, { useContext, useState, useEffect } from "react";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";


// const MyProfile = () => {
//   const {
//     userData,
//     setUserData,
//     token,
//     backendUrl,
//   } = useContext(AppContext);

//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);


//   const [location, setLocation] = useState(null);
//   const [locationError, setLocationError] = useState("");

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;

//         console.log("REAL LOCATION:", lat, lng);

//         setLocation({ lat, lng });
//       },
//       (err) => {
//         console.log(err);
//         setLocationError("Please allow location access");
//       }
//     );
//   }, []);

//   // ✅ UPDATE PROFILE
//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("name", userData.name || "");
//       formData.append("phone", userData.phone || "");
//       formData.append(
//         "address",
//         JSON.stringify(userData.address || {})
//       );
//       formData.append("gender", userData.gender || "");
//       formData.append("dob", userData.dob || "");

//       // ✅ SAVE LOCATION
//       if (location) {
//         formData.append("location", JSON.stringify(location));
//       }

//       if (image) {
//         formData.append("image", image);
//       }

//       const { data } = await axios.post(
//         `${backendUrl}/api/user/update-profile`,
//         formData,
//         {
//           headers: { token },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         setUserData(data.userData);
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message);
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     userData && (
//       <div className="min-h-screen bg-gray-50 flex justify-center p-6">
//         <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">

//           {/* PROFILE IMAGE */}
//           <div className="flex flex-col items-center">
//             {isEdit ? (
//               <label className="cursor-pointer relative">
//                 <img
//                   className="w-32 h-32 rounded-full object-cover opacity-80"
//                   src={image ? URL.createObjectURL(image) : userData.image}
//                   alt=""
//                 />
//                 <img
//                   className="w-8 absolute bottom-2 right-2"
//                   src={assets.upload_icon}
//                   alt=""
//                 />
//                 <input
//                   type="file"
//                   hidden
//                   onChange={(e) => setImage(e.target.files[0])}
//                 />
//               </label>
//             ) : (
//               <img
//                 className="w-32 h-32 rounded-full object-cover"
//                 src={userData.image}
//                 alt=""
//               />
//             )}

//             {/* NAME */}
//             {isEdit ? (
//               <input
//                 className="mt-4 text-xl border px-2 py-1 rounded"
//                 value={userData.name}
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     name: e.target.value,
//                   }))
//                 }
//               />
//             ) : (
//               <h2 className="mt-4 text-2xl font-semibold">
//                 {userData.name}
//               </h2>
//             )}
//           </div>

//           {/* CONTACT INFO */}
//           <div className="mt-6">
//             <h3 className="font-semibold text-gray-500 border-b pb-2">
//               Contact Information
//             </h3>

//             <div className="mt-3 space-y-3">
//               <p>Email: {userData.email}</p>

//               <div>
//                 <p>Phone:</p>
//                 {isEdit ? (
//                   <input
//                     className="border px-2 py-1 w-full"
//                     value={userData.phone}
//                     onChange={(e) =>
//                       setUserData((prev) => ({
//                         ...prev,
//                         phone: e.target.value,
//                       }))
//                     }
//                   />
//                 ) : (
//                   <p>{userData.phone}</p>
//                 )}
//               </div>

//               <div>
//                 <p>Address:</p>
//                 {isEdit ? (
//                   <>
//                     <input
//                       className="border px-2 py-1 w-full mb-2"
//                       value={userData.address?.line1 || ""}
//                       onChange={(e) =>
//                         setUserData((prev) => ({
//                           ...prev,
//                           address: {
//                             ...prev.address,
//                             line1: e.target.value,
//                           },
//                         }))
//                       }
//                     />
//                     <input
//                       className="border px-2 py-1 w-full"
//                       value={userData.address?.line2 || ""}
//                       onChange={(e) =>
//                         setUserData((prev) => ({
//                           ...prev,
//                           address: {
//                             ...prev.address,
//                             line2: e.target.value,
//                           },
//                         }))
//                       }
//                     />
//                   </>
//                 ) : (
//                   <p>
//                     {userData.address?.line1}
//                     <br />
//                     {userData.address?.line2}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* BASIC INFO */}
//           <div className="mt-6">
//             <h3 className="font-semibold text-gray-500 border-b pb-2">
//               Basic Information
//             </h3>

//             <div className="mt-3 space-y-3">
//               <div>
//                 <p>Gender:</p>
//                 {isEdit ? (
//                   <select
//                     value={userData.gender}
//                     onChange={(e) =>
//                       setUserData((prev) => ({
//                         ...prev,
//                         gender: e.target.value,
//                       }))
//                     }
//                   >
//                     <option>Male</option>
//                     <option>Female</option>
//                   </select>
//                 ) : (
//                   <p>{userData.gender}</p>
//                 )}
//               </div>

//               <div>
//                 <p>Birthday:</p>
//                 {isEdit ? (
//                   <input
//                     type="date"
//                     value={userData.dob}
//                     onChange={(e) =>
//                       setUserData((prev) => ({
//                         ...prev,
//                         dob: e.target.value,
//                       }))
//                     }
//                   />
//                 ) : (
//                   <p>{userData.dob}</p>
//                 )}
//               </div>
//             </div>
//           </div>

         

//           {/* BUTTON */}
//           <div className="mt-6 text-center">
//             {isEdit ? (
//               <button
//                 onClick={updateUserProfileData}
//                 className="bg-blue-500 text-white px-6 py-2 rounded"
//               >
//                 Save
//               </button>
//             ) : (
//               <button
//                 onClick={() => setIsEdit(true)}
//                 className="border px-6 py-2 rounded"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>

//         </div>
//       </div>
//     )
//   );
// };

// export default MyProfile;
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => { console.log(err); setLocationError("Please allow location access"); }
    );
  }, []);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name || "");
      formData.append("phone", userData.phone || "");
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");
      if (location) formData.append("location", JSON.stringify(location));
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message || "Profile updated successfully");
        setUserData({
          ...data.userData,
          image: data.userData.image
            ? `${data.userData.image}?t=${Date.now()}`
            : "",
        });
        setIsEdit(false);
        setImage(false);
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-blue-50 mt-20 flex justify-center items-start p-6">
  <div className="w-full max-w-2xl bg-white border border-blue-100 rounded-2xl p-8 shadow-lg">
        {/* ── Avatar ── */}
        <div className="flex flex-col items-center pb-6 border-b border-slate-100 mb-6">
          {isEdit ? (
            <label className="cursor-pointer relative inline-block">
              {image || userData.image ? (
                <img
                  className="w-24 h-24 rounded-full object-cover opacity-80 ring-2 ring-blue-100"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl font-medium text-blue-600">
                  {getInitials(userData.name)}
                </div>
              )}
              <div className="absolute bottom-1 right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          ) : userData.image ? (
            <img
              className="w-24 h-24 rounded-full object-cover ring-2 ring-slate-100"
              src={userData.image}
              alt=""
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl font-medium text-blue-600">
              {getInitials(userData.name)}
            </div>
          )}

          {isEdit ? (
            <input
              className="mt-3 text-lg font-medium text-center border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              value={userData.name}
              onChange={(e) => setUserData((p) => ({ ...p, name: e.target.value }))}
            />
          ) : (
            <p className="mt-3 text-xl font-medium text-slate-800">{userData.name}</p>
          )}
          <p className="text-sm text-slate-400 mt-0.5">Patient</p>
        </div>

        {/* ── Contact Information ── */}
        <div className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-3">
            Contact information
          </p>

          <div className="grid grid-cols-[150px_1fr] items-center gap-2 py-2.5 border-b border-slate-100">
            <span className="text-sm text-slate-500">Email</span>
            <span className="text-sm text-slate-800">{userData.email}</span>
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-2 py-2.5 border-b border-slate-100">
            <span className="text-sm text-slate-500">Phone</span>
            {isEdit ? (
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                value={userData.phone || ""}
                onChange={(e) => setUserData((p) => ({ ...p, phone: e.target.value }))}
                placeholder="Phone number"
              />
            ) : (
              <span className="text-sm text-slate-800">{userData.phone || "—"}</span>
            )}
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-2 py-2.5 border-b border-slate-100">
            <span className="text-sm text-slate-500">Address line 1</span>
            {isEdit ? (
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                value={userData.address?.line1 || ""}
                onChange={(e) => setUserData((p) => ({ ...p, address: { ...p.address, line1: e.target.value } }))}
                placeholder="Street address"
              />
            ) : (
              <span className="text-sm text-slate-800">{userData.address?.line1 || "—"}</span>
            )}
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-2 py-2.5 border-b border-slate-100">
            <span className="text-sm text-slate-500">Address line 2</span>
            {isEdit ? (
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                value={userData.address?.line2 || ""}
                onChange={(e) => setUserData((p) => ({ ...p, address: { ...p.address, line2: e.target.value } }))}
                placeholder="City, State"
              />
            ) : (
              <span className="text-sm text-slate-800">{userData.address?.line2 || "—"}</span>
            )}
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-2 py-2.5">
            <span className="text-sm text-slate-500">Location</span>
            {location ? (
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg px-2.5 py-1 text-xs font-medium w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                GPS detected · {location.lat.toFixed(2)}°N {location.lng.toFixed(2)}°E
              </span>
            ) : (
              <span className="text-xs text-red-400">{locationError || "Detecting…"}</span>
            )}
          </div>
        </div>

        {/* ── Basic Information ── */}
        <div className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-3">
            Basic information
          </p>

          <div className="grid grid-cols-[150px_1fr] items-center gap-2 py-2.5 border-b border-slate-100">
            <span className="text-sm text-slate-500">Gender</span>
            {isEdit ? (
              <select
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                value={userData.gender || ""}
                onChange={(e) => setUserData((p) => ({ ...p, gender: e.target.value }))}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <span className="text-sm text-slate-800">{userData.gender || "—"}</span>
            )}
          </div>

          <div className="grid grid-cols-[150px_1fr] items-center gap-2 py-2.5">
            <span className="text-sm text-slate-500">Date of birth</span>
            {isEdit ? (
              <input
                type="date"
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                value={userData.dob || ""}
                onChange={(e) => setUserData((p) => ({ ...p, dob: e.target.value }))}
              />
            ) : (
              <span className="text-sm text-slate-800">{userData.dob || "—"}</span>
            )}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex justify-end gap-2 pt-5 border-t border-slate-100">
          {isEdit ? (
            <>
              <button
                onClick={() => { setIsEdit(false); setImage(false); }}
                className="px-5 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={updateUserProfileData}
                className="px-5 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 active:scale-95 transition-all"
              >
                Save changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-5 py-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 active:scale-95 transition-all"
            >
              Edit profile
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyProfile;