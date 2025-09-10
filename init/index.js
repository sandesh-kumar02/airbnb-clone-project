import mongoose from "mongoose";
import initdata from "./data.js";
import Listing from "../models/listings.js";

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

const initDB = async (req, res) => {
   await Listing.insertMany(initdata.data);
  console.log('data was initialized');
};

initDB();

// 