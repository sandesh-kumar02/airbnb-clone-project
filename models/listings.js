import mongoose from "mongoose";
import Review from "./reviews.js";
import { Schema } from "mongoose";

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://www.istockphoto.com/photo/view-of-historic-building-against-clear-sky-gm2171677871-591487123?searchscope=image%2Cfilm",
      set: (v) =>
        v === ""
          ? "https://www.istockphoto.com/photo/woman-exploring-on-tea-plantation-in-sri-lanka-gm2183673991-602547445?searchscope=image%2Cfilm"
          : v,
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
