import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Contact = () => {
  const navigate = useNavigate();
  const { sendMessage, userData } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ SEND TO BACKEND WITH USER
    await sendMessage({
      ...form,
      userId: userData?._id,
      senderType: "user",
    });

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* ===== Heading ===== */}
      <div className="text-center pt-14">
        <h1 className="text-4xl font-bold text-gray-800">
          Contact <span className="text-primary">CareOS</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Have questions? We’re here to help you.
        </p>
      </div>

      {/* ===== Content Section ===== */}
      <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">

        {/* Image */}
        <img
          className="w-full md:max-w-[440px] rounded-2xl shadow-lg hover:scale-105 transition duration-500"
          src={assets.contact_image}
          alt="Contact"
        />

        {/* Info Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col gap-6 w-full md:max-w-[500px]">

          <div>
            <p className="font-semibold text-lg text-gray-800">Our Office</p>
            <p className="text-gray-500 text-sm">
              54709 Williams Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Contact Details</p>
            <p className="text-gray-500 text-sm">📞 +91 98765 43210</p>
            <p className="text-gray-500 text-sm">✉️ support@careos.com</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Working Hours</p>
            <p className="text-gray-500 text-sm">
              Monday - Saturday: 9:00 AM – 7:00 PM
            </p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-800">
              Careers at CareOS
            </p>
            <p className="text-gray-500 text-sm">
              Join our team and build the future of healthcare.
            </p>
          </div>

          <button
            onClick={() => navigate("/careers")}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            Explore Opportunities
          </button>

        </div>
      </div>

    </div>
  );
};

export default Contact;