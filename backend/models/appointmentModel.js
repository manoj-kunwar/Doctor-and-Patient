// import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   docId: { type: String, required: true },
//   slotDate: { type: String, required: true },
//   slotTime: { type: String, required: true },
//   userData: { type: Object, required: true },
//   docData: { type: Object, required: true },
//   amount: { type: Number, required: true },
//   date: { type: Number, required: true },
//   isCompleted: { type: Boolean, default: false },
//   payment: { type: Boolean, default: false },
// });

// const appointmentModel =
//   mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);

// export default appointmentModel;


// appointmentModel.js  —  Updated with callHistory field


import mongoose from "mongoose";

const callHistorySchema = new mongoose.Schema({
  startedAt:   { type: Date },
  endedAt:     { type: Date },
  duration:    { type: Number, default: 0 },   // seconds
  initiatedBy: { type: String, enum: ["doctor", "patient"] },
});

const appointmentSchema = new mongoose.Schema({
  userId:      { type: String, required: true },
  docId:       { type: String, required: true },
  slotDate:    { type: String, required: true },
  slotTime:    { type: String, required: true },
  userData:    { type: Object, required: true },
  docData:     { type: Object, required: true },
  amount:      { type: Number, required: true },
  date:        { type: Number, required: true },
  isCompleted: { type: Boolean, default: false },
  payment:     { type: Boolean, default: false },
  cancelled:   { type: Boolean, default: false },

  // ── New video call fields ──
  callHistory: { type: [callHistorySchema], default: [] },
  lastCallAt:  { type: Date },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;