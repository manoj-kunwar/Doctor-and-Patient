import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRouter.js";
import contactRoutes from "./routes/contactRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary 
connectDb();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is WORKING");
});

// Start server
app.listen(port, () => console.log("Server Started on port", port));