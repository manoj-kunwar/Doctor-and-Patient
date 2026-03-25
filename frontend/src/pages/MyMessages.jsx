import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const MyMessages = () => {
  const { userData, messages, getUserMessages, sendMessage, backendUrl } =
    useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    subject: "",
    message: "",
  });

  // Load messages
  useEffect(() => {
    if (userData) {
      getUserMessages(userData._id);
    }
  }, [userData]);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send message
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData) {
      alert("Please login first");
      return;
    }

    await sendMessage({
      ...form,
      userId: userData._id,
      senderType: "user",
    });

    getUserMessages(userData._id);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/contact/delete/${id}`);
      getUserMessages(userData._id);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE
  const handleUpdate = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/contact/update/${id}`, editData);
      setEditId(null);
      getUserMessages(userData._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 md:px-12 py-10 bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Messages
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage your conversations, view updates, and stay connected
          </p>
        </div>

        {/* OPTIONAL RIGHT SIDE (BADGE) */}
        <div className="hidden md:flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
          {messages.length} Messages
        </div>
      </div>
      {/* ===== FORM ===== */}
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md border mb-10">
        <h2 className="text-2xl font-semibold mb-2">Send a New Message</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary"
            required
          />

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border px-4 py-3 rounded-lg md:col-span-2"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            className="border px-4 py-3 rounded-lg md:col-span-2"
            required
          />

          <button
            type="submit"
            className="md:col-span-2 bg-primary text-white py-3 rounded-lg"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* ===== MESSAGES ===== */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6"> My Messages</h1>

        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages found</p>
        ) : (
          <div className="grid gap-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white p-5 rounded-xl shadow border"
              >
                {editId === msg._id ? (
                  <>
                    <input
                      value={editData.subject}
                      onChange={(e) =>
                        setEditData({ ...editData, subject: e.target.value })
                      }
                      className="border px-2 py-1 w-full mb-2"
                    />

                    <textarea
                      value={editData.message}
                      onChange={(e) =>
                        setEditData({ ...editData, message: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleUpdate(msg._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">{msg.name}</p>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                    <p className="font-semibold">{msg.subject}</p>
                    <p>{msg.message}</p>

                    <div className="flex gap-3 mt-4">
                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => {
                          setEditId(msg._id);
                          setEditData({
                            subject: msg.subject,
                            message: msg.message,
                          });
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 
                                        border border-blue-200 hover:bg-blue-100 hover:scale-105 
                                        active:scale-95 transition-all duration-200 text-sm font-medium"
                      >
                        Edit Message
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 
                                border border-red-200 hover:bg-red-100 hover:scale-105 
                                active:scale-95 transition-all duration-200 text-sm font-medium"
                      >
                        Delete Message
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMessages;
