import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);

  // ================= DOCTORS =================
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= USER =================
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/get-profile",
        { headers: { token } }
      );
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= CONTACT =================

  // SEND MESSAGE
  const sendMessage = async (formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/contact/send",
        formData
      );

      if (data.success) {
        toast.success("Message sent successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ADMIN: GET ALL MESSAGES
  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/contact/list"
      );

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // USER: GET OWN MESSAGES
  const getUserMessages = async (userId) => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/contact/user/" + userId
      );

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // DOCTOR: GET MESSAGES
  const getDoctorMessages = async (doctorId) => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/contact/doctor/" + doctorId
      );

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= EFFECTS =================
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  // ================= CONTEXT VALUE =================
  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    messages,
    setMessages,
    sendMessage,
    getMessages,
    getUserMessages,
    getDoctorMessages,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;