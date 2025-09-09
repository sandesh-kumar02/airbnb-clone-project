import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  titlt: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    set: (v) => {
      return v === ""
        ? "https://www.istockphoto.com/photo/woman-exploring-on-tea-plantation-in-sri-lanka-gm2183673991-602547445?searchscope=image%2Cfilm"
        : v;
    },
    default:
      "https://www.istockphoto.com/photo/view-of-historic-building-against-clear-sky-gm2171677871-591487123?searchscope=image%2Cfilm",
  },
  price: {
    type: Number,
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
