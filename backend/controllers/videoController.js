import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";

// ─── ZEGOCLOUD Token04 Generator ─────────────────────────────────────────────
function generateToken04(appId, userId, serverSecret, effectiveTimeInSeconds, payload = "") {
  const createTime = Math.floor(Date.now() / 1000);
  const expireTime = createTime + effectiveTimeInSeconds;
  const nonce = Math.floor(Math.random() * 2147483647);

  // Build the string to sign
  const signContent = `${appId}${userId}${nonce}${createTime}${expireTime}${payload}`;
  
  // HMAC-SHA256
  const hmac = crypto.createHmac("sha256", serverSecret);
  hmac.update(signContent);
  const signature = hmac.digest("hex");

  const tokenInfo = {
    app_id: appId,
    user_id: userId,
    nonce,
    ctime: createTime,
    expire: expireTime,
    payload,
    signature,
  };

  // Base64 encode
  const tokenStr = Buffer.from(JSON.stringify(tokenInfo)).toString("base64");
  return `04${tokenStr}`;
}

// ─── Patient Token ────────────────────────────────────────────────────────────
export const getUserVideoToken = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    if (!appointmentId) {
      return res.json({ success: false, message: "appointmentId is required" });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== userId) {
      return res.json({ success: false, message: "Not authorized for this appointment" });
    }

    if (appointment.cancelled) {
      return res.json({ success: false, message: "Appointment is cancelled" });
    }

    const user = await userModel.findById(userId).select("name");

    const appId = parseInt(process.env.ZEGO_APP_ID);
    const serverSecret = process.env.ZEGO_SERVER_SECRET;

    if (!appId || !serverSecret) {
      return res.json({ success: false, message: "ZEGO credentials not configured" });
    }

    const roomId = `appointment_${appointmentId}`;
    const zegoUserId = `patient_${userId}`;

    const token = generateToken04(appId, zegoUserId, serverSecret, 3600);

    res.json({
      success: true,
      token,
      roomId,
      userId: zegoUserId,
      userName: user.name,
      appId,
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

    if (!appointmentId) {
      return res.json({ success: false, message: "appointmentId is required" });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId.toString() !== docId) {
      return res.json({ success: false, message: "Not authorized for this appointment" });
    }

    if (appointment.cancelled) {
      return res.json({ success: false, message: "Appointment is cancelled" });
    }

    const doctor = await doctorModel.findById(docId).select("name");

    const appId = parseInt(process.env.ZEGO_APP_ID);
    const serverSecret = process.env.ZEGO_SERVER_SECRET;

    if (!appId || !serverSecret) {
      return res.json({ success: false, message: "ZEGO credentials not configured" });
    }

    const roomId = `appointment_${appointmentId}`;
    const zegoUserId = `doctor_${docId}`;

    const token = generateToken04(appId, zegoUserId, serverSecret, 3600);

    res.json({
      success: true,
      token,
      roomId,
      userId: zegoUserId,
      userName: doctor.name,
      appId,
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

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

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