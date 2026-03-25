import React, { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getMessages = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/contact/list`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        backendUrl + `/api/contact/delete/${id}`,
      );

      if (data.success) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ===== Header ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📩 Messages</h1>
        <p className="text-gray-500 text-sm mt-1">
          View all user inquiries and messages
        </p>
      </div>

      {/* ===== Messages List ===== */}
      {messages.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No messages found</div>
      ) : (
        <div className="grid gap-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Top Section */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {msg.name}
                  </h3>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>

                {/* Date */}
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Subject */}
              <p className="text-primary font-medium mb-2">{msg.subject}</p>

              {/* Message */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {msg.message}
              </p>
              <button
                onClick={() => handleDelete(msg._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
