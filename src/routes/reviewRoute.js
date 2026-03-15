import express from "express";
import { protect, adminProtect } from "../middlewares/authMiddleware.js";
import {
  createReview,
  getReviewsByRoom,
  getFeaturedReviews,
  getAllReviews,
  toggleReviewVisibility,
  deleteReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

// Public: get reviews for a specific room
reviewRouter.get("/room/:roomId", getReviewsByRoom);

// Public: get recent featured reviews for homepage
reviewRouter.get("/featured", getFeaturedReviews);

// Protected: create a review (authenticated users only)
reviewRouter.post("/create", protect, createReview);

// Admin: get all reviews, toggle visibility, delete
reviewRouter.get("/all", protect, adminProtect, getAllReviews);
reviewRouter.patch("/:reviewId/toggle", protect, adminProtect, toggleReviewVisibility);
reviewRouter.delete("/:reviewId", protect, adminProtect, deleteReview);

export default reviewRouter;
