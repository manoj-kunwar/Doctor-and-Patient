
// import doctorModel from "../models/doctorModel.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import appointmentModel from "../models/appointmentModel.js";

// // Change availability
// const changeAvailability = async (req, res) => {
//   try {
//     const { docId } = req.body;
//     const docData = await doctorModel.findById(docId);
//     if (!docData) return res.json({ success: false, message: "Doctor not found" });

//     await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
//     res.json({ success: true, message: 'Availability Changed' });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Doctor list
// const doctorList = async (req, res) => {
//   try {
//     const doctors = await doctorModel.find({}).select(['-password', '-email']);
//     res.json({ success: true, doctors });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Doctor login
// const loginDoctor = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const doctor = await doctorModel.findOne({ email });
//     if (!doctor) return res.json({ success: false, message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, doctor.password);
//     if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

//     const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ success: true, token });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Auth middleware
// export const authDoctor = (req, res, next) => {
//   try {
//     const { dtoken } = req.headers;
//     if (!dtoken) return res.json({ success: false, message: "Not Authorized" });

//     const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
//     req.docId = decoded.id;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Not Authorized" });
//   }
// };

// // Get appointments for doctor
// const appointmentsDoctor = async (req, res) => {
//   try {
//     const appointments = await appointmentModel.find({ docId: req.docId });
//     res.json({ success: true, appointments });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Complete appointment
// const appointmentComplete = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);
//     if (!appointmentData || appointmentData.docId.toString() !== req.docId) {
//       return res.json({ success: false, message: 'Mark Failed' });
//     }

//     await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
//     res.json({ success: true, message: 'Appointment Completed' });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Cancel appointment
// const appointmentCancel = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);
//     if (!appointmentData || appointmentData.docId.toString() !== req.docId) {
//       return res.json({ success: false, message: 'Cancellation Failed' });
//     }

//     await appointmentModel.findByIdAndUpdate(appointmentId, { isCancelled: true });
//     res.json({ success: true, message: 'Appointment Cancelled' });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Dashboard data
// const doctorDashboard = async (req, res) => {
//   try {
//     const appointments = await appointmentModel.find({ docId: req.docId });
//     let earnings = 0;
//     let patients = new Set();

//     appointments.forEach(item => {
//       if (item.isCompleted || item.payment) earnings += item.amount;
//       patients.add(item.userId.toString());
//     });

//     const dashData = {
//       earnings,
//       appointments: appointments.length,
//       patients: patients.size,
//       latestAppointments: appointments.reverse().slice(0, 5)
//     };

//     res.json({ success: true, dashData });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Doctor profile
// const doctorProfile = async (req, res) => {
//   try {
//     const profileData = await doctorModel.findById(req.docId).select('-password');
//     res.json({ success: true, profileData });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Update doctor profile
// const updatedoctorProfile = async (req, res) => {
//   try {
//     const { fees, address, available } = req.body;
//     await doctorModel.findByIdAndUpdate(req.docId, { fees, address, available });
//     res.json({ success: true, message: 'Profile Updated' });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export {
//   changeAvailability,
//   doctorList,
//   loginDoctor,
//   appointmentsDoctor,
//   appointmentCancel,
//   appointmentComplete,
//   doctorDashboard,
//   doctorProfile,
//   updatedoctorProfile
// };

import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ─── Auth middleware ───────────────────────────────────────────────────────────
export const authDoctor = (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken)
      return res.json({ success: false, message: "Not Authorized. Login Again" });

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.docId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Not Authorized. Login Again" });
  }
};

// ─── Change availability ───────────────────────────────────────────────────────
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    if (!docData)
      return res.json({ success: false, message: "Doctor not found" });

    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Doctor list ───────────────────────────────────────────────────────────────
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Doctor login ──────────────────────────────────────────────────────────────
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor)
      return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Get appointments for doctor ──────────────────────────────────────────────
const appointmentsDoctor = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ docId: req.docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Complete appointment ──────────────────────────────────────────────────────
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.docId.toString() !== req.docId)
      return res.json({ success: false, message: "Mark Failed" });

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
    res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Cancel appointment ────────────────────────────────────────────────────────
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.docId.toString() !== req.docId)
      return res.json({ success: false, message: "Cancellation Failed" });

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCancelled: true });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Dashboard data ────────────────────────────────────────────────────────────
const doctorDashboard = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ docId: req.docId });
    let earnings = 0;
    let patients = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) earnings += item.amount;
      patients.add(item.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.size,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Get doctor profile ────────────────────────────────────────────────────────
const doctorProfile = async (req, res) => {
  try {
    const profileData = await doctorModel.findById(req.docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Upload doctor image to Cloudinary ────────────────────────────────────────
// POST /api/doctor/upload-image   (multer runs before this)
const uploadDoctorImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No image file provided" });
    }

    // Upload local file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "doctors",
      resource_type: "image",
    });

    // Delete the temp file from disk after upload
    fs.unlink(req.file.path, () => {});

    res.json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    // Clean up temp file on error too
    if (req.file?.path) fs.unlink(req.file.path, () => {});
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── Update doctor profile ─────────────────────────────────────────────────────
// POST /api/doctor/update-profile
const updatedoctorProfile = async (req, res) => {
  try {
    const {
      fees,
      address,
      available,
      name,
      about,
      degree,
      speciality,
      experience,
      licenceNo,
      image,        // new Cloudinary URL sent from frontend after upload
    } = req.body;

    const updateData = {
      fees,
      address,
      available,
      name,
      about,
      degree,
      speciality,
      experience,
      licenceNo: licenceNo || "",
    };

    // Only overwrite image if a new URL was provided
    if (image) updateData.image = image;

    await doctorModel.findByIdAndUpdate(req.docId, updateData);
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updatedoctorProfile,
  uploadDoctorImage,   // ✅ export new handler
};