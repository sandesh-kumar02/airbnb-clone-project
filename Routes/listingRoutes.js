import express from "express";
import {
  AddListing,
  allListings,
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

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

router.get("/listings", allListings);
router.get("/listings/:id", showListings);
router.get("/listing/new", newListings);
router.post("/listings", validateListing, AddListing);
router.get("/listings/:id/edit", EditListings);
router.put("/listings/:id", validateListing, updateListing);
router.delete("/listings/:id", deleteListing);
router.post("/listing/:id/reviews", validateReview, reviewRoute);
export default router;
