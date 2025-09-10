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
const router = express.Router();

router.get("/listings", allListings);
router.get("/listings/:id", showListings);
router.get("/listing/new", newListings);
router.post("/listings", AddListing);
router.get("/listings/:id/edit", EditListings);
router.put("/listings/:id", updateListing);
router.delete("/listings/:id", deleteListing);
export default router;
