import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import AddDoctor from "./pages/Admin/AddDoctor";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import Messages from "./pages/Admin/Messages";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      <ToastContainer />
      {aToken ? (
        // 🔹 Admin Layout
        <div className="bg-[#F8F9FD] min-h-screen">
          <Navbar />
          <div className="flex items-start">
            <Sidebar role="admin" />
            <div className="flex-1 p-4">
              <Routes>
                {/* Redirect / → /admin-dashboard */}
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllApointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />
                <Route path="/messages" element={<Messages />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : dToken ? (
        // 🔹 Doctor Layout
        <div className="bg-[#F8F9FD] min-h-screen">
          <Navbar />
          <div className="flex items-start">
            <Sidebar role="doctor" />
            <div className="flex-1 p-4">
              <Routes>
                {/* Redirect / → /doctor-dashboard */}
                <Route path="/" element={<Navigate to="/doctor-dashboard" />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
       
        <Routes>
          {/* Redirect any route to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;


