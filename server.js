import express from "express";
import mongoose from "mongoose";
const app = express();

// importing file
import Listing from "./models/listings.js";

// app.get("/", async (req, res) => {
//   const newListing = new Listing({
//     titlt: "this is first listing",
//     description: "this is listing description",
//     price: 18000,
//     location: "Goa",
//     country: "India",
//   });
//   await newListing.save();
//   console.log("listing saved");
//   res.send("successfully saved");
// });

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust-Project");
}
connectDB()
  .then(() => {
    console.log("database are connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("server is starting on port no 3000");
});
