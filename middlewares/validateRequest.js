import { Schema } from "mongoose";
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
