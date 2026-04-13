// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import RelatedDoctor from "../components/RelatedDoctor";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
//     useContext(AppContext);
//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   const navigate = useNavigate();

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");

//   const fetchDocInfo = async () => {
//     const doc = doctors.find((doc) => doc._id === docId || doc.id === docId);
//     setDocInfo(doc);
//   };

//   // Always show all slots for today (from 10:00 to 21:00)
//   const getAvaliableSlots = async () => {
//     setDocSlots([]);
//     const today = new Date();
//     let slotsArr = [];

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);
//       currentDate.setHours(10, 0, 0, 0); // Always start at 10:00 AM

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0, 0); // 9 PM

//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         let day = currentDate.getDate();
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();

//         const slotDate = day + "_" + month + "_" + year;
//         const slotTime = formattedTime;

//         const isSlotAvailable =
//           docInfo.slots_booked[slotDate] &&
//           docInfo.slots_booked[slotDate].includes(slotTime)
//             ? false
//             : true;

//         if (isSlotAvailable) {
//           timeSlots.push({
//             datetime: new Date(currentDate),
//             time: formattedTime,
//           });
//         }

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       setDocSlots((prev) => [...prev, timeSlots]);
//     }
//   };

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warm("Login to book appointment");
//       return navigate("/login");
//     }
//     try {
//       const date = docSlots[slotIndex][0].datetime;
//       let day = date.getDate();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();

//       const slotDate = day + "_" + month + "_" + year;

//       const { data } = await axios.post(
//         backendUrl + "/api/user/book-appointment",
//         { docId, slotDate, slotTime },
//         { headers: { token } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getDoctorsData();
//         navigate("/my-appointments");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(() => {
//     if (docInfo) getAvaliableSlots();
//   }, [docInfo]);

//   if (!docInfo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {/* ------------------ Doctor Details -------------- */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div>
//           <img
//             className="bg-primary w-full sm:max-w-72 rounded-lg"
//             src={docInfo.image}
//             alt={docInfo.name}
//           />
//         </div>
//         <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//           <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//             {docInfo.name}
//             <img className="w-5" src={assets.verified_icon} alt="Verified" />
//           </p>
//           <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//             <p>
//               {docInfo.degree} - {docInfo.speciality}
//             </p>
//             <button className="py-0.5 px-2 border text-xs rounded-full">
//               {docInfo.experience}
//             </button>
//           </div>
//           <div>
//             <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//               About <img src={assets.info_icon} alt="" />
//             </p>
//             <p className="text-sm text-gray-500 max-w-[700px] mt-1">
//               {docInfo.about}
//             </p>
//           </div>
//           <p className="text-gray-500 font-medium mt-4">
//             Appointment fee:{" "}
//             <span className="text-gray-600">
//               {" "}
//               {currencySymbol}
//               {docInfo.fees}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* ----------------------- Booking Slots ------------------------ */}
//       <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700">
//         <p>Booking Slots</p>
//         <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//           {docSlots.length > 0 &&
//             docSlots.map((item, index) => (
//               <div
//                 onClick={() => setSlotIndex(index)}
//                 className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                   slotIndex === index
//                     ? "bg-primary text-white"
//                     : "border border-gray-200"
//                 }`}
//                 key={index}
//               >
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                 <p>{item[0] && item[0].datetime.getDate()}</p>
//               </div>
//             ))}
//         </div>

//         <div className="flex items-center gap-3 w-full overflow-x-scroll">
//           {docSlots.length > 0 &&
//             docSlots[slotIndex].map((item, index) => (
//               <p
//                 onClick={() => setSlotTime(item.time)}
//                 className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                   item.time === slotTime
//                     ? "bg-primary text-white"
//                     : "text-gray-400 border border-gray-300"
//                 }`}
//                 key={index}
//               >
//                 {item.time.toLowerCase()}
//               </p>
//             ))}
//         </div>

//         <button
//           onClick={bookAppointment}
//           className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
//         >
//           Book an appointment
//         </button>
//       </div>

//       {/* ------------------------Listing related Doctors------------------------------ */}
//       <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
//     </div>
//   );
// };

// export default Appointment;


// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import RelatedDoctor from "../components/RelatedDoctor";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { IoLocationOutline } from "react-icons/io5";

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
//     useContext(AppContext);
//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   const navigate = useNavigate();

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");

//   const fetchDocInfo = async () => {
//     const doc = doctors.find((doc) => doc._id === docId || doc.id === docId);
//     setDocInfo(doc);
//   };

//   // Always show all slots for today (from 10:00 to 21:00)
//   const getAvaliableSlots = async () => {
//     setDocSlots([]);
//     const today = new Date();
//     let slotsArr = [];

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);
//       currentDate.setHours(10, 0, 0, 0); // Always start at 10:00 AM

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0, 0); // 9 PM

//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         let day = currentDate.getDate();
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();

//         const slotDate = day + "_" + month + "_" + year;
//         const slotTime = formattedTime;

//         const isSlotAvailable =
//           docInfo.slots_booked[slotDate] &&
//           docInfo.slots_booked[slotDate].includes(slotTime)
//             ? false
//             : true;

//         if (isSlotAvailable) {
//           timeSlots.push({
//             datetime: new Date(currentDate),
//             time: formattedTime,
//           });
//         }

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       setDocSlots((prev) => [...prev, timeSlots]);
//     }
//   };

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warm("Login to book appointment");
//       return navigate("/login");
//     }
//     try {
//       const date = docSlots[slotIndex][0].datetime;
//       let day = date.getDate();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();

//       const slotDate = day + "_" + month + "_" + year;

//       const { data } = await axios.post(
//         backendUrl + "/api/user/book-appointment",
//         { docId, slotDate, slotTime },
//         { headers: { token } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getDoctorsData();
//         navigate("/my-appointments");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(() => {
//     if (docInfo) getAvaliableSlots();
//   }, [docInfo]);

//   if (!docInfo) {
//     return <div>Loading...</div>;
//   }
// return (
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10 bg-[#f6f9fc] min-h-screen">
    
//     {/* Doctor Details */}
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
//       {/* Left Doctor Card */}
//       <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
//         <div className="flex flex-col md:flex-row gap-6">
          
//           {/* Image */}
//           <div className="w-full md:w-72 flex-shrink-0">
//             <img
//               className="w-full h-80 object-cover rounded-2xl bg-primary/5"
//               src={docInfo.image}
//               alt={docInfo.name}
//             />
//           </div>

//           {/* Info */}
//           <div className="flex-1">
//             <div className="flex items-center gap-2">
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {docInfo.name}
//               </h1>
//               <img
//                 className="w-5 h-5"
//                 src={assets.verified_icon}
//                 alt="Verified"
//               />
//             </div>

//             <p className="text-gray-500 mt-2">
//               {docInfo.degree} • {docInfo.speciality}
//             </p>

//             <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
//               {docInfo.experience}
//             </div>

//             <div className="mt-6">
//               <h3 className="font-semibold text-gray-900 text-lg">
//                 About Doctor
//               </h3>
//               <p className="text-gray-500 mt-2 leading-relaxed">
//                 {docInfo.about}
//               </p>
//             </div>

//             <div className="mt-6 text-lg font-semibold text-gray-900">
//               Consultation Fee:
//               <span className="text-primary ml-2">
//                 {currencySymbol}{docInfo.fees}
//               </span>
//             </div>
//    <div className="flex flex-wrap gap-3 mt-4">
//   {docInfo.available ? (
//     <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium border border-emerald-100">
//       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
//       Available Today
//     </span>
//   ) : (
//     <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium border border-red-100">
//       <span className="w-2 h-2 bg-red-500 rounded-full"></span>
//       Unavailable
//     </span>
//   )}
// <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100">
//   <IoLocationOutline className="text-base" />
//   {docInfo.address?.line1}
//   {docInfo.address?.line2 && `, ${docInfo.address.line2}`}
// </span>
// </div>

//           </div>
//         </div>
//       </div>

//       {/* Right Booking Card */}
//       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-fit sticky top-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-5">
//           Book Appointment
//         </h2>

//         {/* Days */}
//         <p className="text-sm font-medium text-gray-600 mb-3">
//           Select Day
//         </p>

//         <div className="flex gap-3 overflow-x-auto pb-2">
//           {docSlots.length > 0 &&
//             docSlots.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSlotIndex(index)}
//                 className={`min-w-[70px] py-3 rounded-2xl text-sm font-medium transition-all ${
//                   slotIndex === index
//                     ? "bg-primary text-white shadow-md"
//                     : "bg-gray-50 text-gray-600 border border-gray-200"
//                 }`}
//               >
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                 <p>{item[0] && item[0].datetime.getDate()}</p>
//               </button>
//             ))}
//         </div>

//         {/* Time */}
//         <p className="text-sm font-medium text-gray-600 mt-6 mb-3">
//           Select Time
//         </p>

//         <div className="flex flex-wrap gap-3">
//           {docSlots.length > 0 &&
//             docSlots[slotIndex].map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSlotTime(item.time)}
//                 className={`px-4 py-2 rounded-full text-sm transition-all ${
//                   item.time === slotTime
//                     ? "bg-primary text-white"
//                     : "border border-gray-300 text-gray-500 hover:border-primary"
//                 }`}
//               >
//                 {item.time.toLowerCase()}
//               </button>
//             ))}
//         </div>

//         {/* CTA */}
//         <button
//           onClick={bookAppointment}
//           className="w-full mt-8 bg-primary text-white py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
//         >
//           Confirm Appointment
//         </button>
//       </div>
//     </div>

//     {/* Related Doctors */}
//     <div className="mt-20">
//       <RelatedDoctor
//         docId={docId}
//         speciality={docInfo.speciality}
//       />
//     </div>
//   </div>
// )
// };

// export default Appointment;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import ReviewSection from "../components/ReviewSection";
import { toast } from "react-toastify";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo,   setDocInfo]   = useState(null);
  const [docSlots,  setDocSlots]  = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime,  setSlotTime]  = useState("");

  const fetchDocInfo = () => {
    const doc = doctors.find(d => d._id === docId || d.id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = () => {
    setDocSlots([]);
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let cur = new Date(today);
      cur.setDate(today.getDate() + i);
      cur.setHours(10, 0, 0, 0);
      const end = new Date(cur);
      end.setHours(21, 0, 0, 0);
      const slots = [];
      while (cur < end) {
        const time = cur.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
        const key  = `${cur.getDate()}_${cur.getMonth()+1}_${cur.getFullYear()}`;
        const booked = docInfo.slots_booked[key]?.includes(time);
        if (!booked) slots.push({ datetime: new Date(cur), time });
        cur.setMinutes(cur.getMinutes() + 30);
      }
      setDocSlots(prev => [...prev, slots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) { toast.warn("Login to book appointment"); return navigate("/login"); }
    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}`;
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) { toast.success(data.message); getDoctorsData(); navigate("/my-appointments"); }
      else toast.error(data.message);
    } catch (err) { toast.error(err.message); }
  };

  useEffect(() => { fetchDocInfo(); },           [doctors, docId]);
  useEffect(() => { if (docInfo) getAvailableSlots(); }, [docInfo]);

  if (!docInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f9fc]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10 bg-[#f6f9fc] min-h-screen">

      {/* Doctor Details + Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Doctor Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">

            <div className="w-full md:w-72 flex-shrink-0">
              <img
                className="w-full h-80 object-cover rounded-2xl bg-primary/5"
                src={docInfo.image} alt={docInfo.name}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900">{docInfo.name}</h1>
                <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
              </div>

              <p className="text-gray-500 mt-2">{docInfo.degree} • {docInfo.speciality}</p>

              <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {docInfo.experience}
              </div>

              {/* Average rating badge */}
              {docInfo.averageRating > 0 && (
                <div className="flex items-center gap-1.5 mt-3">
                  <FaStar className="text-amber-400 text-sm" />
                  <span className="text-sm font-semibold text-gray-700">{docInfo.averageRating}</span>
                  <span className="text-xs text-gray-400">({docInfo.totalReviews} reviews)</span>
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 text-lg">About Doctor</h3>
                <p className="text-gray-500 mt-2 leading-relaxed">{docInfo.about}</p>
              </div>

              <div className="mt-6 text-lg font-semibold text-gray-900">
                Consultation Fee:
                <span className="text-primary ml-2">{currencySymbol}{docInfo.fees}</span>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {docInfo.available ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium border border-emerald-100">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Available Today
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Unavailable
                  </span>
                )}
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100">
                  <IoLocationOutline className="text-base" />
                  {docInfo.address?.line1}{docInfo.address?.line2 && `, ${docInfo.address.line2}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Booking Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Book Appointment</h2>

          <p className="text-sm font-medium text-gray-600 mb-3">Select Day</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.map((item, index) => (
              <button key={index} onClick={() => setSlotIndex(index)}
                className={`min-w-[70px] py-3 rounded-2xl text-sm font-medium transition-all ${
                  slotIndex === index ? "bg-primary text-white shadow-md" : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </button>
            ))}
          </div>

          <p className="text-sm font-medium text-gray-600 mt-6 mb-3">Select Time</p>
          <div className="flex flex-wrap gap-3">
            {docSlots[slotIndex]?.map((item, index) => (
              <button key={index} onClick={() => setSlotTime(item.time)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  item.time === slotTime ? "bg-primary text-white" : "border border-gray-300 text-gray-500 hover:border-primary"
                }`}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
          </div>

          <button
            onClick={bookAppointment}
            className="w-full mt-8 bg-primary text-white py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            Confirm Appointment
          </button>
        </div>
      </div>

      {/* Related Doctors */}
      <div className="mt-20">
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>

      {/* Reviews Section — any logged-in patient can review */}
      <ReviewSection doctorId={docId} />

    </div>
  );
};

export default Appointment;