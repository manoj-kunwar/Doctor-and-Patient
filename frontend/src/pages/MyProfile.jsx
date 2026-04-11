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
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";


const MyProfile = () => {
  const {
    userData,
    setUserData,
    token,
    backendUrl,
  } = useContext(AppContext);

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
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("REAL LOCATION:", lat, lng);

        setLocation({ lat, lng });
      },
      (err) => {
        console.log(err);
        setLocationError("Please allow location access");
      }
    );
  }, []);

  // ✅ UPDATE PROFILE
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name || "");
      formData.append("phone", userData.phone || "");
      formData.append(
        "address",
        JSON.stringify(userData.address || {})
      );
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");

      // ✅ SAVE LOCATION
      if (location) {
        formData.append("location", JSON.stringify(location));
      }

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setUserData(data.userData);
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    userData && (
      <div className="min-h-screen bg-gray-50 flex justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">
            {isEdit ? (
              <label className="cursor-pointer relative">
                <img
                  className="w-32 h-32 rounded-full object-cover opacity-80"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img
                  className="w-8 absolute bottom-2 right-2"
                  src={assets.upload_icon}
                  alt=""
                />
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            ) : (
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={userData.image}
                alt=""
              />
            )}

            {/* NAME */}
            {isEdit ? (
              <input
                className="mt-4 text-xl border px-2 py-1 rounded"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            ) : (
              <h2 className="mt-4 text-2xl font-semibold">
                {userData.name}
              </h2>
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-500 border-b pb-2">
              Contact Information
            </h3>

            <div className="mt-3 space-y-3">
              <p>Email: {userData.email}</p>

              <div>
                <p>Phone:</p>
                {isEdit ? (
                  <input
                    className="border px-2 py-1 w-full"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p>{userData.phone}</p>
                )}
              </div>

              <div>
                <p>Address:</p>
                {isEdit ? (
                  <>
                    <input
                      className="border px-2 py-1 w-full mb-2"
                      value={userData.address?.line1 || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      className="border px-2 py-1 w-full"
                      value={userData.address?.line2 || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value,
                          },
                        }))
                      }
                    />
                  </>
                ) : (
                  <p>
                    {userData.address?.line1}
                    <br />
                    {userData.address?.line2}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-500 border-b pb-2">
              Basic Information
            </h3>

            <div className="mt-3 space-y-3">
              <div>
                <p>Gender:</p>
                {isEdit ? (
                  <select
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                ) : (
                  <p>{userData.gender}</p>
                )}
              </div>

              <div>
                <p>Birthday:</p>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p>{userData.dob}</p>
                )}
              </div>
            </div>
          </div>

         

          {/* BUTTON */}
          <div className="mt-6 text-center">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="border px-6 py-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>

        </div>
      </div>
    )
  );
};

export default MyProfile;