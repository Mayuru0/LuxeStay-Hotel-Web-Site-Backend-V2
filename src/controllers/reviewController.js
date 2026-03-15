import Review from "../models/reviewModel.js";
import Booking from "../models/bookingModel.js";

export const createReview = async (req, res) => {
  try {
    const { bookingId, roomId, rating, comment } = req.body;
    const userId = req.user._id;

    // Verify the booking belongs to the user and is confirmed
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to review this booking",
      });
    }

    if (booking.status !== "confirmed") {
      return res.status(400).json({
        success: false,
        message: "You can only review confirmed bookings",
      });
    }

    // Check if review already exists for this booking
    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this booking",
      });
    }

    const review = await Review.create({
      userId,
      bookingId,
      roomId,
      rating,
      comment,
    });

    await review.populate("userId", "firstName lastName profilePic");

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

export const getReviewsByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const reviews = await Review.find({ roomId, isVisible: true })
      .populate("userId", "firstName lastName profilePic")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    return res.status(200).json({
      success: true,
      data: reviews,
      stats: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Public: get recent visible reviews for homepage (across all rooms)
export const getFeaturedReviews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const reviews = await Review.find({ isVisible: true })
      .populate("userId", "firstName lastName profilePic")
      .populate({ path: "roomId", select: "roomID", populate: { path: "category", select: "name" } })
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "firstName lastName profilePic email")
      .populate("roomId", "roomID description")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

export const toggleReviewVisibility = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.isVisible = !review.isVisible;
    await review.save();

    return res.status(200).json({
      success: true,
      message: `Review ${review.isVisible ? "made visible" : "hidden"} successfully`,
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to toggle review visibility",
      error: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};
