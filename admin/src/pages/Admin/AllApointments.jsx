import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl p-6 bg-gray-50 rounded-xl shadow-sm">
      
      <p className="mb-5 text-2xl font-semibold text-gray-800">
        All Appointments
      </p>

      <div className="bg-white border border-gray-200 rounded-xl text-sm max-h-[80vh] overflow-y-auto">
        
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-4 px-6 border-b bg-gray-100 text-gray-700 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center gap-3 py-4 px-6 border-b hover:bg-gray-50 transition"
          >
            
            <p className="max-sm:hidden text-gray-600">
              {index + 1}
            </p>

            {/* Patient */}
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover border"
                src={item.userData.image}
                alt=""
              />
              <p className="font-medium text-gray-800">
                {item.userData.name}
              </p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden text-gray-600">
              {calculateAge(item.userData.dob)}
            </p>

            {/* Date */}
            <p className="text-gray-600">
              {slotDateFormat(item.slotDate)},{" "}
              <span className="text-indigo-600 font-medium">
                {item.slotTime}
              </span>
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover bg-gray-200 border"
                src={item.docData.image}
                alt=""
              />
              <p className="text-gray-800 font-medium">
                {item.docData.name}
              </p>
            </div>

            {/* Fees */}
            <p className="text-gray-700 font-semibold">
              {currency}{item.amount}
            </p>

            {/* Actions */}
            {
              item.cancelled ? (
                <span className="text-xs px-3 py-1 bg-red-100 text-red-500 rounded-full font-medium">
                  Cancelled
                </span>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-red-100 transition"
                >
                  <img
                    className="w-5"
                    src={assets.cancel_icon}
                    alt=""
                  />
                </button>
              )
            }

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments;