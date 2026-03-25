import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const {
    aToken,
    getDashData,
    cancelAppointment,
    completeAppointment,
    dashData,
  } = useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return (
      <div className="p-6 text-gray-500 text-center">Loading dashboard...</div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ===== Top Stats Cards ===== */}
      <div className="flex flex-wrap gap-5">

        {/* Doctors */}
        <div className="flex items-center gap-4 bg-white p-5 min-w-[220px] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <img className="w-12" src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className="text-2xl font-bold text-gray-700">
              {dashData.doctors}
            </p>
            <p className="text-gray-400 text-sm">Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-4 bg-white p-5 min-w-[220px] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <img
            className="w-12"
            src={assets.appointments_icon}
            alt="Appointments"
          />
          <div>
            <p className="text-2xl font-bold text-gray-700">
              {dashData.appointments}
            </p>
            <p className="text-gray-400 text-sm">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-4 bg-white p-5 min-w-[220px] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <img className="w-12" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-2xl font-bold text-gray-700">
              {dashData.patients}
            </p>
            <p className="text-gray-400 text-sm">Patients</p>
          </div>
        </div>
      </div>

      {/* ===== Latest Bookings ===== */}
      <div className="bg-white mt-8 rounded-xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b bg-gray-50">
          <img className="w-5" src={assets.list_icon} alt="List" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div>

        {/* List */}
        <div>
          {dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-5 py-4 gap-4 border-b last:border-none hover:bg-gray-50 transition"
              >
                {/* Doctor Image */}
                <img
                  className="rounded-full w-11 h-11 object-cover border"
                  src={item.docData.image}
                  alt={item.docData.name}
                />

                {/* Info */}
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Status / Actions */}
                {item.cancelled ? (
                  <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-500 rounded-full">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
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
            <p className="text-center text-gray-400 py-6">
              No appointments found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;