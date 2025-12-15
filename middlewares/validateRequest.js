
import { listingSchema, reviewSchema } from "../schema.js";
import {ExpressError} from "../utils/ExpressError.js";





export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = {};

      error.details.forEach((err) => {
        errors[err.context.key] = err.message;
      });

      return res.render("users/signup.ejs", {
        errors,
        oldData: req.body,
      });
    }

    next();
  };
};

// Validate Review Middleware
export const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// Validate Listing Middleware
export const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};
