import express from "express";
import {
  AddListing,
  allListings,
  deleteComment,
  deleteListing,
  EditListings,
  newListings,
  reviewRoute,
  showListings,
  updateListing,
} from "../controllers/listingController.js";

import { listingSchema, reviewSchema } from "../schema.js";
import { ExpressError } from "../utils/ExpressError.js";

import { isLoggedin } from "../middleware.js";
import { isOwner, isReviewAuthor } from "../middlewares/isOwner.js";

const router = express.Router();

// Validate Listing Middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// Validate Review Middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// Routes
router.get("/listings", allListings);
router.get("/listings/:id", showListings);
router.get("/listing/new", isLoggedin, newListings);

router.post("/listings", isLoggedin, validateListing, AddListing);
router.get("/listings/:id/edit", isLoggedin, isOwner, EditListings);
router.put(
  "/listings/:id",
  isLoggedin,
  isOwner,
  validateListing,
  updateListing
);
router.delete("/listings/:id", isLoggedin, isOwner, deleteListing);

// Review route
router.post("/listing/:id/reviews", isLoggedin, validateReview, reviewRoute);
router.delete(
  "/listing/:id/reviews/:reviewId",
  isLoggedin,
  isReviewAuthor,
  deleteComment
);

export default router;
