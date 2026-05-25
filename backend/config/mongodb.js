 import mongoose from "mongoose";

 const connectDb = async () => {
   try {
     mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
     mongoose.connection.on("error", (err) => console.log("MongoDB Error:", err));

     await mongoose.connect(process.env.MONGODB_URI);
   } catch (error) {
     console.error("MongoDB connection failed:", error.message);
     process.exit(1);
   }
 };

 export default connectDb;
