import express from "express";
import authUser  from "../middlewares/authUser.js";
import authAdmin from "../middlewares/authAdmin.js";
import {
  addReview,
  getReviews,
  editReview,
  deleteReview,
  adminGetAllReviews,
  adminToggleReview,
  adminDeleteReview,
} from "../controllers/reviewController.js"

const reviewRoute = express.Router();

// ── Patient routes ───────────────────────────────────────────────────────────
reviewRoute.post("/add",            authUser,  addReview);    // POST /api/reviews/add
reviewRoute.get("/:doctorId",                  getReviews);   // GET  /api/reviews/:doctorId
reviewRoute.put("/:id",             authUser,  editReview);   // PUT  /api/reviews/:id
reviewRoute.delete("/:id",          authUser,  deleteReview); // DELETE /api/reviews/:id

// ── Admin routes ─────────────────────────────────────────────────────────────
reviewRoute.get("/admin/all",       authAdmin, adminGetAllReviews);
reviewRoute.post("/admin/toggle",   authAdmin, adminToggleReview);
reviewRoute.delete("/admin/:id",    authAdmin, adminDeleteReview);

export default reviewRoute;