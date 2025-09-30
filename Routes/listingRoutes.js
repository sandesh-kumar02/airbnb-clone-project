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
router.get("/listing/new", newListings);

router.post("/listings", validateListing, AddListing);
router.get("/listings/:id/edit", EditListings);
router.put("/listings/:id", validateListing, updateListing);
router.delete("/listings/:id", deleteListing);

// Review route
router.post("/listing/:id/reviews", validateReview, reviewRoute);
router.delete('/listing/:id/reviews/:reviewId', deleteComment);

export default router;
