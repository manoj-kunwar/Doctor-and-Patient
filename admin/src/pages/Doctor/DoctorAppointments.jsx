import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormate, currency } =
    useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Heading */}
      <p className="text-2xl font-semibold text-gray-700 mb-6">
        All Appointments
      </p>

      {/* Container */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] px-6 py-4 border-b bg-gray-50 text-gray-600 text-sm font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* List */}
        <div className="max-h-[75vh] overflow-y-auto">

          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center px-6 py-4 border-b text-sm hover:bg-gray-50 transition"
              >
                {/* Index */}
                <p className="hidden md:block text-gray-500">
                  {index + 1}
                </p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border"
                    src={item.userData.image}
                    alt=""
                  />
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                </div>

                {/* Payment */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                    item.payment
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.payment ? "Online" : "Cash"}
                </span>

                {/* Age */}
                <p className="hidden md:block text-gray-600">
                  {calculateAge(item.userData.dob)}
                </p>

                {/* Date */}
                <p className="text-gray-600">
                  {slotDateFormate(item.slotDate)}, {item.slotTime}
                </p>

                {/* Fees */}
                <p className="font-medium text-gray-800">
                  {currency}
                  {item.amount}
                </p>

                {/* Status / Actions */}
                {item.cancelled ? (
                  <span className="px-3 py-1 text-xs bg-red-100 text-red-500 rounded-full w-fit">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full w-fit">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-2 rounded-lg hover:bg-red-100 transition"
                    >
                      <img
                        className="w-5"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                    </button>

                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="p-2 rounded-lg hover:bg-green-100 transition"
                    >
                      <img
                        className="w-5"
                        src={assets.tick_icon}
                        alt="Complete"
                      />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">
              No appointments found
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;