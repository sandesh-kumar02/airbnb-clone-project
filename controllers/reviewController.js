import Listing from "../models/listings.js";
import Review from "../models/reviews.js";
import { wrapAsync } from "../utils/WrapAsync.js";

export const reviewRoute = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
   if (!listing) {
    req.flash("errors", "Listing not found");
    return res.redirect("/listings"); // 🔥 return important
  }
  let newReviews = new Review(req.body.review);
  newReviews.author = req.user._id;
  console.log(newReviews);
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
