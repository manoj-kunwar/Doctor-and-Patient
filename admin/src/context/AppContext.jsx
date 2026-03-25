import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "₹";

  const calculateAge = (dob) => {
    if (!dob || dob === "Not Selected") return "N/A";
    const today = new Date();
    const birthDate = new Date(dob);
    return today.getFullYear() - birthDate.getFullYear();
  };

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // Used in Admin & DoctorDashboard
  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
  };

  // Alias used in DoctorAppointments (typo in original code)
  const slotDateFormate = slotDateFormat;

  const value = { calculateAge, slotDateFormat, slotDateFormate, currency };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;