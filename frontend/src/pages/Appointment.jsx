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

  // Fetch doctor directly from API so averageRating is always fresh
  const fetchDocInfo = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        const doc = data.doctors.find(d => d._id === docId || d.id === docId);
        setDocInfo(doc);
      }
    } catch (err) {
      // fallback to context cache
      const doc = doctors.find(d => d._id === docId || d.id === docId);
      setDocInfo(doc);
    }
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

  useEffect(() => { fetchDocInfo(); }, [docId]);
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

      {/* Reviews Section — individual per doctor, above Related Doctors */}
      <ReviewSection doctorId={docId} onReviewChange={fetchDocInfo} />

      {/* Related Doctors */}
      <div className="mt-10">
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>

    </div>
  );
};

export default Appointment;