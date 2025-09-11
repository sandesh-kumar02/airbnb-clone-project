import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
});

const Listing = mongoose.model("Listing", userSchema);

export default Listing;
