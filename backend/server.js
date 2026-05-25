import express from "express";
import cors from "cors";
import "dotenv/config";
 
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
 
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRouter.js";
import contactRoutes from "./routes/contactRoutes.js";
import videoRouter from "./routes/videoRoute.js";
import reviewRouter from "./routes/reviewsRoute.js";

 
const app = express();
const port = process.env.PORT || 4000;
 
app.use(express.json());
app.use(cors());
 
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/video", videoRouter);
app.use("/api/reviews", reviewRouter);

 
app.get("/", (req, res) => res.send("API is WORKING"));
 
const startServer = async () => {
  try {
    await connectDb();
    await connectCloudinary();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};
 
startServer();