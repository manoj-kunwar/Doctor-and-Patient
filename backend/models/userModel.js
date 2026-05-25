import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  image: String,

  address: {
    line1: String,
    line2: String,
  },

  phone: String,
  gender: String,
  dob: String,

 
  
});

const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;