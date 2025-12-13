import Listing from "../models/listings.js";
import Review from "../models/reviews.js";

export const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!res.locals.currUser) {
    req.flash("errors", "You must be logged in");
    return res.redirect("/login");
  }

  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("errors", "You don't have permission to do that");
    return res.redirect(`/listings/${id}`);
  }

  next();
};



export const isReviewAuthor = async (req, res, next) => {
  const { id,reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!res.locals.currUser) {
    req.flash("errors", "You must be logged in");
    return res.redirect("/login");
  }

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("errors", "You don't have permission to do that");
    return res.redirect(`/listings/${id}`);
  }

  next();
};