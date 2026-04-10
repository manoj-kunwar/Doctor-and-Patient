// videoRoute.js  —  Backend
import express from "express";
import {
  getUserVideoToken,
  getDoctorVideoToken,
  logCallHistory,
  getCallHistory,
} from "../controllers/videoController.js";
import authUser from "../middlewares/authUser.js";
import authDoctor from "../middlewares/authDoctor.js";

const videoRouter = express.Router();

// Patient gets a token
videoRouter.post("/token/user", authUser, getUserVideoToken);

// Doctor gets a token
videoRouter.post("/token/doctor", authDoctor, getDoctorVideoToken);

// Log call after it ends (either side can call this)
videoRouter.post("/log", logCallHistory);

// Get call history for an appointment
videoRouter.get("/history/:appointmentId", getCallHistory);

export default videoRouter;