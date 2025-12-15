import express from "express";
// import { isReviewAuthor } from "../middlewares/isOwner";
import { deleteComment } from "../controllers/reviewController.js";
import { isLoggedin } from "../middleware.js";
import { isReviewAuthor } from "../middlewares/isOwner.js";
import { validateReview } from "../middlewares/validateRequest.js";
import { reviewRoute } from "../controllers/reviewController.js";
const router = express.Router();

// Review route
router.post("/listings/:id/reviews", isLoggedin, validateReview, reviewRoute);
router.delete(
  "/listing/:id/reviews/:reviewId",
  isLoggedin,
  isReviewAuthor,
  deleteComment
);

export default router;