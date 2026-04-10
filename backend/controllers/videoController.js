import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

// ─── Patient Token ────────────────────────────────────────────────────────────
export const getUserVideoToken = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    if (!appointmentId) return res.json({ success: false, message: "appointmentId is required" });

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) return res.json({ success: false, message: "Appointment not found" });
    if (appointment.userId.toString() !== userId) return res.json({ success: false, message: "Not authorized" });
    if (appointment.cancelled) return res.json({ success: false, message: "Appointment is cancelled" });

    const user = await userModel.findById(userId).select("name");

    if (!process.env.ZEGO_APP_ID || !process.env.ZEGO_SERVER_SECRET) {
      return res.json({ success: false, message: "ZEGO credentials not configured" });
    }

    res.json({
      success: true,
      appId: parseInt(process.env.ZEGO_APP_ID),
      serverSecret: process.env.ZEGO_SERVER_SECRET,
      roomId: `appointment_${appointmentId}`,
      userId: `patient_${userId}`,
      userName: user.name,
      role: "patient",
      appointmentId,
      docName: appointment.docData?.name || "Doctor",
    });

  } catch (error) {
    console.error("getUserVideoToken error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Doctor Token ─────────────────────────────────────────────────────────────
export const getDoctorVideoToken = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    if (!appointmentId) return res.json({ success: false, message: "appointmentId is required" });

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) return res.json({ success: false, message: "Appointment not found" });
    if (appointment.docId.toString() !== docId) return res.json({ success: false, message: "Not authorized" });
    if (appointment.cancelled) return res.json({ success: false, message: "Appointment is cancelled" });

    const doctor = await doctorModel.findById(docId).select("name");

    if (!process.env.ZEGO_APP_ID || !process.env.ZEGO_SERVER_SECRET) {
      return res.json({ success: false, message: "ZEGO credentials not configured" });
    }

    res.json({
      success: true,
      appId: parseInt(process.env.ZEGO_APP_ID),
      serverSecret: process.env.ZEGO_SERVER_SECRET,
      roomId: `appointment_${appointmentId}`,
      userId: `doctor_${docId}`,
      userName: doctor.name,
      role: "doctor",
      appointmentId,
      patientName: appointment.userData?.name || "Patient",
    });

  } catch (error) {
    console.error("getDoctorVideoToken error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Log Call ─────────────────────────────────────────────────────────────────
export const logCallHistory = async (req, res) => {
  try {
    const { appointmentId, duration, startedAt, endedAt, initiatedBy } = req.body;

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      $push: {
        callHistory: {
          startedAt: new Date(startedAt),
          endedAt: new Date(endedAt),
          duration,
          initiatedBy,
        },
      },
      lastCallAt: new Date(endedAt),
    });

    res.json({ success: true, message: "Call logged" });
  } catch (error) {
    console.error("logCallHistory error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Get Call History ─────────────────────────────────────────────────────────
export const getCallHistory = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await appointmentModel
      .findById(appointmentId)
      .select("callHistory lastCallAt userData docData slotDate slotTime");

    if (!appointment) return res.json({ success: false, message: "Appointment not found" });

    res.json({
      success: true,
      callHistory: appointment.callHistory || [],
      appointment,
    });
  } catch (error) {
    console.error("getCallHistory error:", error);
    res.json({ success: false, message: error.message });
  }
};