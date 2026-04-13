import reviewModel from "../models/reviewModel.js";
import doctorModel from "../models/doctorModel.js";

const syncDoctorRating = async (doctorId) => {
  const reviews = await reviewModel.find({ doctorId, isVisible: true });
  const total = reviews.length;
  const avg = total
    ? parseFloat((reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1))
    : 0;
  await doctorModel.findByIdAndUpdate(doctorId, {
    averageRating: avg,
    totalReviews: total,
  });
};

export const addReview = async (req, res) => {
  try {
    const { doctorId, rating, comment, patientName, patientImage } = req.body;
    const patientId = req.userId;
    if (!doctorId || !rating || !comment)
      return res.json({ success: false, message: "All fields are required" });
    const review = await reviewModel.create({
      doctorId, patientId,
      patientName: patientName || "Patient",
      patientImage: patientImage || "",
      rating: Number(rating), comment,
    });
    await syncDoctorRating(doctorId);
    res.json({ success: true, message: "Review added successfully", review });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ doctorId: req.params.doctorId, isVisible: true })
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (!review) return res.json({ success: false, message: "Review not found" });
    if (review.patientId.toString() !== req.userId)
      return res.json({ success: false, message: "Not authorized" });
    review.rating = Number(req.body.rating);
    review.comment = req.body.comment;
    await review.save();
    await syncDoctorRating(review.doctorId);
    res.json({ success: true, message: "Review updated", review });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (!review) return res.json({ success: false, message: "Review not found" });
    if (review.patientId.toString() !== req.userId)
      return res.json({ success: false, message: "Not authorized" });
    const doctorId = review.doctorId;
    await reviewModel.findByIdAndDelete(req.params.id);
    await syncDoctorRating(doctorId);
    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const adminGetAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const adminToggleReview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.body.reviewId);
    if (!review) return res.json({ success: false, message: "Not found" });
    review.isVisible = !review.isVisible;
    await review.save();
    await syncDoctorRating(review.doctorId);
    res.json({ success: true, message: review.isVisible ? "Restored" : "Hidden", review });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const adminDeleteReview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (!review) return res.json({ success: false, message: "Not found" });
    const doctorId = review.doctorId;
    await reviewModel.findByIdAndDelete(req.params.id);
    await syncDoctorRating(doctorId);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};