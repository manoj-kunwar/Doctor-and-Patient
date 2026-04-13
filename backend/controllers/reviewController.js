import doctorModel  from "../models/doctorModel.js";
import reviewModel from "../models/reviewModel.js";

// ── helper: recalculate average rating on doctor document ────────────────────
const syncDoctorRating = async (doctorId) => {
  const reviews = await reviewModel.find({ doctorId, isVisible: true });
  const total   = reviews.length;
  const avg     = total
    ? parseFloat((reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1))
    : 0;
  await doctorModel.findByIdAndUpdate(doctorId, {
    averageRating: avg,
    totalReviews:  total,
  });
};

// POST /api/reviews/add
export const addReview = async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;
    const patientId   = req.userId;
    const patientName = req.body.patientName || "Patient";
    const patientImage = req.body.patientImage || "";

    if (!doctorId || !rating || !comment) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const review = await reviewModel.create({
      doctorId, patientId, patientName, patientImage,
      rating: Number(rating), comment,
    });

    await syncDoctorRating(doctorId);
    res.json({ success: true, message: "Review added successfully", review });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// GET /api/reviews/:doctorId
export const getReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const reviews = await reviewModel
      .find({ doctorId, isVisible: true })
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// PUT /api/reviews/:id
export const editReview = async (req, res) => {
  try {
    const { id }  = req.params;
    const { rating, comment } = req.body;
    const patientId = req.userId;

    const review = await reviewModel.findById(id);
    if (!review) return res.json({ success: false, message: "Review not found" });
    if (review.patientId.toString() !== patientId)
      return res.json({ success: false, message: "Not authorized" });

    review.rating  = Number(rating);
    review.comment = comment;
    await review.save();
    await syncDoctorRating(review.doctorId);

    res.json({ success: true, message: "Review updated", review });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.userId;

    const review = await reviewModel.findById(id);
    if (!review) return res.json({ success: false, message: "Review not found" });
    if (review.patientId.toString() !== patientId)
      return res.json({ success: false, message: "Not authorized" });

    const doctorId = review.doctorId;
    await reviewModel.findByIdAndDelete(id);
    await syncDoctorRating(doctorId);

    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// ── Admin only ───────────────────────────────────────────────────────────────

// GET /api/reviews/admin/all
export const adminGetAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// POST /api/reviews/admin/toggle  { reviewId }
export const adminToggleReview = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const review = await reviewModel.findById(reviewId);
    if (!review) return res.json({ success: false, message: "Not found" });
    review.isVisible = !review.isVisible;
    await review.save();
    await syncDoctorRating(review.doctorId);
    res.json({ success: true, message: review.isVisible ? "Review restored" : "Review hidden", review });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// DELETE /api/reviews/admin/:id
export const adminDeleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewModel.findById(id);
    if (!review) return res.json({ success: false, message: "Not found" });
    const doctorId = review.doctorId;
    await reviewModel.findByIdAndDelete(id);
    await syncDoctorRating(doctorId);
    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};