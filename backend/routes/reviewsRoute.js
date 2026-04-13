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

const reviersRouter = express.Router();

reviersRouter.post("/add",          authUser,  addReview);
reviersRouter.get("/:doctorId",               getReviews);
reviersRouter.put("/:id",           authUser,  editReview);
reviersRouter.delete("/:id",        authUser,  deleteReview);

reviersRouter.get("/admin/all",     authAdmin, adminGetAllReviews);
reviersRouter.post("/admin/toggle", authAdmin, adminToggleReview);
reviersRouter.delete("/admin/:id",  authAdmin, adminDeleteReview);

export default reviersRouter;