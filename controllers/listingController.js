import express from "express";
import Listing from "../models/listings.js";
import { wrapAsync } from "../utils/WrapAsync.js";

import Review from "../models/reviews.js";
const router = express.Router();

export const allListings = wrapAsync(async (req, res) => {
  let alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
});

export const showListings = wrapAsync(async (req, res) => {
  const { id } = req.params;

  let showListing = await Listing.findById(id).populate("reviews");
  if (!showListing) {
    req.flash("errors", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { showListing });
});

export const newListings = (req, res) => {
  res.render("listings/newListings.ejs");
};

export const AddListing = wrapAsync(async (req, res) => {
  const { title, description, price, country, location } = req.body.listing;
  const newListings = new Listing({
    title: title,
    description: description,
    price: Number(price),
    country: country,
    location: location,
  });
  await newListings.save();
  req.flash("success", "new Listing created");
  res.redirect("/listings");
});

export const EditListings = wrapAsync(async (req, res) => {
  const { id } = req.params;
  let listings = await Listing.findById(id);
  if (!listings) {
    req.flash("errors", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listings });
});

export const updateListing = wrapAsync(async (req, res) => {
  const { title, description, price, location, country } = req.body.listing;
  const { id } = req.params;
  const result = await Listing.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      location,
      country,
    },
    { new: true }
  );
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
});

export const deleteListing = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Listing.findByIdAndDelete(id, { new: true });
  console.log(result);
  req.flash("success", "Listing Deleted");
  res.redirect(`/listings`);
});

// post route

export const reviewRoute = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  let newReviews = new Review(req.body.review);
  await newReviews.save();
  listing.reviews.push(newReviews);
  await listing.save();
  req.flash("success", "new Review Created");
  console.log("new review saved");
  res.redirect(`/listings/${listing._id}`);
});

// delete routr
export const deleteComment = wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  const deletedReview = await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  console.log("Deleted Review:", deletedReview);
  res.redirect(`/listings/${id}`);
});
export default router;
