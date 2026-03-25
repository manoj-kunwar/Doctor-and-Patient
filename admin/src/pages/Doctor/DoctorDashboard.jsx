import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  return (
    dashData && (
      <div className="p-6 bg-gray-50 min-h-screen">

        {/* 🔹 Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Earnings */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <img className="w-12" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {currency}{dashData.earnings}
              </p>
              <p className="text-gray-400 text-sm">Total Earnings</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <img className="w-12" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-gray-400 text-sm">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <img className="w-12" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {dashData.patients}
              </p>
              <p className="text-gray-400 text-sm">Patients</p>
            </div>
          </div>

        </div>

        {/* 🔹 Latest Bookings */}
        <div className="mt-10 bg-white rounded-xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-100">
            <img className="w-5" src={assets.list_icon} alt="" />
            <p className="font-semibold text-gray-700">Latest Bookings</p>
          </div>

          {/* List */}
          <div>
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-4 border-b last:border-none hover:bg-gray-50 transition"
              >
                {/* Profile */}
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={item.userData.image}
                  alt=""
                />

                {/* Info */}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {item.userData.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Status */}
                {item.cancelled ? (
                  <span className="text-xs px-3 py-1 bg-red-100 text-red-500 rounded-full">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="p-2 rounded-full hover:bg-red-100 transition"
                  >
                    <img className="w-6" src={assets.cancel_icon} alt="" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    )
  );
};

export default DoctorDashboard;