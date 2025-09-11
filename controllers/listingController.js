import express from "express";
import Listing from "../models/listings.js";
const router = express.Router();

export const allListings = async (req, res) => {
  let alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
};

export const showListings = async (req, res) => {
  const { id } = req.params;
  let showListing = await Listing.findById(id);
  res.render("listings/show.ejs", { showListing });
};

export const newListings = (req, res) => {
  res.render("listings/newListings.ejs");
};

export const AddListing = async (req, res) => {
  const { title, description, price, country, location } = req.body;
  const newListings = new Listing({
    title: title,
    description: description,
    price:Number(price),
    country: country,
    location: location,
  });
  let result = await newListings.save();
  res.redirect("/listings");
};

export const EditListings = async (req, res) => {
  const { id } = req.params;
  let listings = await Listing.findById(id);
  res.render("listings/edit.ejs", { listings });
};

export const updateListing = async (req, res) => {
    const {title, description, price, location, country} = req.body;
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
};

export const deleteListing = async (req, res)=>{
    const {id} = req.params;
    const result = await Listing.findByIdAndDelete(id, {new : true});
    res.redirect(`/listings`);
}
export default router;
