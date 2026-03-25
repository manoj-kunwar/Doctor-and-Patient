import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
  };

  // Fetch appointments
  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3">
        My Appointments
      </h2>

      {/* States */}
      {loading ? (
        <p className="mt-6 text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="mt-6 text-gray-500">No appointments found.</p>
      ) : (

        <div className="mt-6 space-y-5">

          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 p-5 flex flex-col md:flex-row gap-5"
            >

              {/* Doctor Image */}
              <img
                className="w-60 h-60 rounded-lg object-cover bg-indigo-50"
                src={item.docData.image}
                alt={item.docData.name}
              />

              {/* Info */}
              <div className="flex-1 text-sm">
                <p className="text-lg font-semibold text-gray-800">
                  {item.docData.name}
                </p>
                <p className="text-indigo-500 font-medium">
                  {item.docData.speciality}
                </p>

                <div className="mt-2 text-gray-600">
                  <p className="font-medium text-gray-700">Address:</p>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs">{item.docData.address.line2}</p>
                </div>

                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-medium">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 justify-center">

                {!item.cancelled && (
                  <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:opacity-90 transition">
                    Pay Online
                  </button>
                )}

                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && (
                  <span className="px-4 py-2 text-sm bg-red-100 text-red-500 rounded-lg text-center">
                    Appointment Cancelled
                  </span>
                )}

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyAppointments;