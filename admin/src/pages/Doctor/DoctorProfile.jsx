import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const {
    dToken,
    profileData,
    setProfileData,
    getProfileData,
    backendUrl,
  } = useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  if (!profileData) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8 p-6">

          {/* Image */}
          <img
            className="w-full md:w-64 h-100 object-cover rounded-xl border"
            src={profileData.image}
            alt=""
          />

          {/* Info */}
          <div className="flex-1">

            {/* Name */}
            <p className="text-3xl font-semibold text-gray-800">
              {profileData.name}
            </p>

            {/* Degree + Speciality */}
            <p className="text-gray-500 mt-1">
              {profileData.degree} • {profileData.speciality}
            </p>

            {/* Experience */}
            <span className="inline-block mt-2 px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full">
              {profileData.experience}
            </span>

            {/* About */}
            <div className="mt-4">
              <p className="font-medium text-gray-700 mb-1">About</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {profileData.about}
              </p>
            </div>

            {/* Fees */}
            <div className="mt-4">
              <p className="font-medium text-gray-700">
                Appointment Fee
              </p>
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  className="mt-1 px-3 py-2 border rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              ) : (
                <p className="text-gray-800 mt-1">
                  {currency}{profileData.fees}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mt-4">
              <p className="font-medium text-gray-700">Address</p>

              {isEdit ? (
                <div className="flex flex-col gap-2 mt-1">
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                    className="px-3 py-2 border rounded-lg"
                  />

                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                    className="px-3 py-2 border rounded-lg"
                  />
                </div>
              ) : (
                <p className="text-gray-600 text-sm mt-1">
                  {profileData.address.line1} <br />
                  {profileData.address.line2}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 mt-5">
              <label className="text-gray-700">Available</label>
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                className="w-4 h-4"
              />
            </div>

            {/* Buttons */}
            <div className="mt-6">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;