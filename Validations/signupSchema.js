import Joi from "joi";

export const signupSchema = Joi.object({
  username: Joi.string().trim().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});
