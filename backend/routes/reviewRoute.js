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
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/add",          authUser,  addReview);
reviewRouter.get("/:doctorId",               getReviews);
reviewRouter.put("/:id",           authUser,  editReview);
reviewRouter.delete("/:id",        authUser,  deleteReview);

reviewRouter.get("/admin/all",     authAdmin, adminGetAllReviews);
reviewRouter.post("/admin/toggle", authAdmin, adminToggleReview);
reviewRouter.delete("/admin/:id",  authAdmin, adminDeleteReview);

export default reviewRouter;