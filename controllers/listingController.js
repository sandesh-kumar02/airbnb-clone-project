import express from "express";
import Listing from "../models/listings.js";
import { wrapAsync } from "../utils/WrapAsync.js";
const router = express.Router();

export const allListings = async (req, res) => {
  let alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
};

export const showListings = async (req, res) => {
  const { id } = req.params;

  let showListing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  console.log(showListing);
  if (!showListing) {
    req.flash("errors", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { showListing });
};

export const newListings = (req, res) => {
  res.render("listings/newListings.ejs");
};

export const AddListing = async (req, res) => {
  let url = req.file.path;
  let fileName = req.file.filename;
  console.log(url, "...", fileName);
  const { title, description, price, country, location, image } =
    req.body.listing;
  const newListings = new Listing({
    title: title,
    description: description,
    price: Number(price),
    country: country,
    location: location,
    image: { url: image },
    owner: req.user._id,
  });
  newListings.image = { url, fileName };
  await newListings.save();
  newListings.owner = req.user._id;
  req.flash("success", "new Listing created");
  res.redirect("/listings");
};

export const EditListings = wrapAsync(async (req, res) => {
  const { id } = req.params;
  let listings = await Listing.findById(id);
  if (!listings) {
    req.flash("errors", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  let originalImageUrl = listings.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listings, originalImageUrl });
});

export const updateListing = async (req, res) => {
  const { title, description, price, location, country } = req.body.listing;
  const { id } = req.params;
  let listing = await Listing.findById(id);
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
  //lskgf
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let fileName = req.file.filename;
    listing.image = { url, fileName };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

export const deleteListing = async (req, res) => {
  const { id } = req.params;
  const result = await Listing.findByIdAndDelete(id, { new: true });
  console.log(result);
  req.flash("success", "Listing Deleted");
  res.redirect(`/listings`);
};

export default router;
