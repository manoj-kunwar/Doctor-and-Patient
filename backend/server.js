// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDb from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import adminRouter from "./routes/adminRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/userRouter.js";
// import contactRoutes from "./routes/contactRoutes.js";

// // App config
// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to DB and Cloudinary 
// connectDb();
// connectCloudinary();

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // API endpoints
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);
// app.use("/api/contact", contactRoutes);

// // Health check
// app.get("/", (req, res) => {
//   res.send("API is WORKING");
// });

// // Start server
// app.listen(port, () => console.log("Server Started on port", port));

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDb from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import adminRouter from "./routes/adminRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/userRouter.js";
// import contactRoutes from "./routes/contactRoutes.js";

// const app = express();
// const port = process.env.PORT || 4000;

// // Connect services
// connectDb();
// connectCloudinary();

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);
// app.use("/api/contact", contactRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is WORKING");
// });

// app.listen(port, () => {
//   console.log(`Server Started on port ${port}`);
// });

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

const app = express();
const port = process.env.PORT || 4000;

// Middlewares (must come BEFORE routes)
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is WORKING");
});

app.use("/api/video", videoRouter);


// Start server only after DB and Cloudinary are connected
const startServer = async () => {
  try {
    await connectDb();
    await connectCloudinary();

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();