// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";

// const MyMessages = () => {
//   const { userData, messages, getUserMessages, sendMessage, backendUrl } =
//     useContext(AppContext);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({
//     subject: "",
//     message: "",
//   });

//   // Load messages
//   useEffect(() => {
//     if (userData) {
//       getUserMessages(userData._id);
//     }
//   }, [userData]);

//   // Input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Send message
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userData) {
//       alert("Please login first");
//       return;
//     }

//     await sendMessage({
//       ...form,
//       userId: userData._id,
//       senderType: "user",
//     });

//     getUserMessages(userData._id);

//     setForm({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     });
//   };

//   // DELETE
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/api/contact/delete/${id}`);
//       getUserMessages(userData._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // UPDATE
//   const handleUpdate = async (id) => {
//     try {
//       await axios.put(`${backendUrl}/api/contact/update/${id}`, editData);
//       setEditId(null);
//       getUserMessages(userData._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="px-6 md:px-12 py-10 bg-gray-50 min-h-screen">
//       <div className="mb-8 flex items-center justify-between">
//         {/* LEFT SIDE */}
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
//             Messages
//           </h1>

//           <p className="text-gray-500 text-sm mt-1">
//             Manage your conversations, view updates, and stay connected
//           </p>
//         </div>

//         {/* OPTIONAL RIGHT SIDE (BADGE) */}
//         <div className="hidden md:flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
//           {messages.length} Messages
//         </div>
//       </div>
//       {/* ===== FORM ===== */}
//       <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md border mb-10">
//         <h2 className="text-2xl font-semibold mb-2">Send a New Message</h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-5"
//         >
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary"
//             required
//           />

//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary"
//             required
//           />

//           <input
//             name="subject"
//             value={form.subject}
//             onChange={handleChange}
//             placeholder="Subject"
//             className="border px-4 py-3 rounded-lg md:col-span-2"
//             required
//           />

//           <textarea
//             name="message"
//             value={form.message}
//             onChange={handleChange}
//             rows="5"
//             placeholder="Your Message"
//             className="border px-4 py-3 rounded-lg md:col-span-2"
//             required
//           />

//           <button
//             type="submit"
//             className="md:col-span-2 bg-primary text-white py-3 rounded-lg"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>

//       {/* ===== MESSAGES ===== */}
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-semibold mb-6"> My Messages</h1>

//         {messages.length === 0 ? (
//           <p className="text-gray-400 text-center">No messages found</p>
//         ) : (
//           <div className="grid gap-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg._id}
//                 className="bg-white p-5 rounded-xl shadow border"
//               >
//                 {editId === msg._id ? (
//                   <>
//                     <input
//                       value={editData.subject}
//                       onChange={(e) =>
//                         setEditData({ ...editData, subject: e.target.value })
//                       }
//                       className="border px-2 py-1 w-full mb-2"
//                     />

//                     <textarea
//                       value={editData.message}
//                       onChange={(e) =>
//                         setEditData({ ...editData, message: e.target.value })
//                       }
//                       className="border px-2 py-1 w-full"
//                     />

//                     <div className="flex gap-2 mt-2">
//                       <button
//                         onClick={() => handleUpdate(msg._id)}
//                         className="bg-green-500 text-white px-3 py-1 rounded"
//                       >
//                         Save
//                       </button>

//                       <button
//                         onClick={() => setEditId(null)}
//                         className="bg-gray-400 text-white px-3 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <p className="font-semibold">{msg.name}</p>
//                     <p className="text-sm text-gray-500">{msg.email}</p>
//                     <p className="font-semibold">{msg.subject}</p>
//                     <p>{msg.message}</p>

//                     <div className="flex gap-3 mt-4">
//                       {/* EDIT BUTTON */}
//                       <button
//                         onClick={() => {
//                           setEditId(msg._id);
//                           setEditData({
//                             subject: msg.subject,
//                             message: msg.message,
//                           });
//                         }}
//                         className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 
//                                         border border-blue-200 hover:bg-blue-100 hover:scale-105 
//                                         active:scale-95 transition-all duration-200 text-sm font-medium"
//                       >
//                         Edit Message
//                       </button>

//                       {/* DELETE BUTTON */}
//                       <button
//                         onClick={() => handleDelete(msg._id)}
//                         className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 
//                                 border border-red-200 hover:bg-red-100 hover:scale-105 
//                                 active:scale-95 transition-all duration-200 text-sm font-medium"
//                       >
//                         Delete Message
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyMessages;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const AVATAR_COLORS = [
  "bg-blue-50 text-blue-600",
  "bg-green-50 text-green-700",
  "bg-amber-50 text-amber-600",
  "bg-purple-50 text-purple-600",
  "bg-orange-50 text-orange-600",
];

const MyMessages = () => {
  const { userData, messages, getUserMessages, sendMessage, backendUrl } =
    useContext(AppContext);

  const [form, setForm]         = useState({ name: "", email: "", subject: "", message: "" });
  const [editId, setEditId]     = useState(null);
  const [editData, setEditData] = useState({ subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (userData) getUserMessages(userData._id);
  }, [userData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData) { alert("Please login first"); return; }
    setSubmitting(true);
    await sendMessage({ ...form, userId: userData._id, senderType: "user" });
    getUserMessages(userData._id);
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/contact/delete/${id}`);
      getUserMessages(userData._id);
    } catch (error) { console.log(error); }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/contact/update/${id}`, editData);
      setEditId(null);
      getUserMessages(userData._id);
    } catch (error) { console.log(error); }
  };

  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-medium text-slate-800">Messages</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage your conversations and stay connected</p>
        </div>
        <span className="bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-3.5 py-1 text-xs font-medium whitespace-nowrap">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Send Form ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <p className="text-[15px] font-medium text-slate-800 mb-4">Send a new message</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition mb-3"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Your message…"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none mb-3"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-50 border border-blue-200 text-blue-600 font-medium text-sm py-2.5 rounded-lg hover:bg-blue-100 active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>

      {/* ── Messages List ── */}
      <p className="text-[15px] font-medium text-slate-800 mb-3">My messages</p>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl py-16 text-slate-400 shadow-sm">
          <svg className="w-9 h-9 opacity-25 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div key={msg._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              {editId === msg._id ? (
                /* ── Edit mode ── */
                <div>
                  <input
                    value={editData.subject}
                    onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                    placeholder="Subject"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition mb-3"
                  />
                  <textarea
                    value={editData.message}
                    onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                    rows={4}
                    placeholder="Message"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(msg._id)}
                      className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-green-100 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-xs font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ── View mode ── */
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                      {getInitials(msg.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{msg.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{msg.email}</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-800 mb-1.5">{msg.subject}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{msg.message}</p>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => { setEditId(msg._id); setEditData({ subject: msg.subject, message: msg.message }); }}
                      className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-600 text-xs font-medium px-3.5 py-1.5 rounded-lg hover:bg-blue-100 active:scale-95 transition-all"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-3.5 py-1.5 rounded-lg hover:bg-red-100 active:scale-95 transition-all"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" strokeLinecap="round" />
                        <path d="M10 11v6M14 11v6" strokeLinecap="round" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyMessages;