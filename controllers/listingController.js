import express from "express";
import Listing from "../models/listings.js";
import { wrapAsync } from "../utils/WrapAsync.js";
const router = express.Router();

export const allListings = wrapAsync(async (req, res) => {
  let alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
});

export const showListings = wrapAsync(async (req, res) => {
  const { id } = req.params;
  let showListing = await Listing.findById(id);
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
  res.redirect("/listings");
});

export const EditListings = wrapAsync(async (req, res) => {
  const { id } = req.params;
  let listings = await Listing.findById(id);
  res.render("listings/edit.ejs", { listings });
});

export const updateListing = wrapAsync(async (req, res) => {
  const { title, description, price, location, country } = req.body;
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
  res.redirect(`/listings/${id}`);
});

export const deleteListing = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Listing.findByIdAndDelete(id, { new: true });
  res.redirect(`/listings`);
});

export default router;
