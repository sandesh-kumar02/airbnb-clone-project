import express from "express";
import {
  AddListing,
  allListings,
  deleteListing,
  EditListings,
  newListings,
  showListings,
  updateListing,
} from "../controllers/listingController.js";

import { isLoggedin } from "../middleware.js";
import { isOwner } from "../middlewares/isOwner.js";
import { validateListing } from "../middlewares/validateRequest.js";
import { wrapAsync } from "../utils/WrapAsync.js";

const router = express.Router();

// multer

import multer from "multer";
import { storage } from "../cloudConfig.js";
const upload = multer({ storage });

router
  .route("/listings")
  .get(wrapAsync(allListings))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(AddListing)
  );

router.get("/listing/new", isLoggedin, newListings);

router
  .route("/listings/:id")
  .get(wrapAsync(showListings))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updateListing)
  )
  .delete(isLoggedin, isOwner, wrapAsync(deleteListing));

// Routes

router.get("/listings/:id/edit", isLoggedin, isOwner, EditListings);

export default router;
