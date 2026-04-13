import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    doctorId:      { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
    patientId:     { type: mongoose.Schema.Types.ObjectId, ref: "user",   required: true },
    patientName:   { type: String,  required: true },
    patientImage:  { type: String,  default: "" },
    rating:        { type: Number,  required: true, min: 1, max: 5 },
    comment:       { type: String,  required: true, maxlength: 1000 },
    isVisible:     { type: Boolean, default: true },
  },
  { timestamps: true }
);

const reviewModel =
  mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;