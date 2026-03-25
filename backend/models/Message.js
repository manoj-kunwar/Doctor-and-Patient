import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,

   
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
    },

    senderType: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
