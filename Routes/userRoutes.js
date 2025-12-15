import express from "express";
import {
  login,
  loginUser,
  logoutUser,
  registerUser,
  signupUser,
} from "../controllers/userController.js";
import passport from "passport";
import { signupSchema } from "../Validations/signupSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { saveRedirectUrl } from "../middleware.js";
import { wrapAsync } from "../utils/WrapAsync.js";

const router = express.Router();

router
  .route("/signup")
  .get(signupUser)
  .post(validateRequest(signupSchema), wrapAsync(registerUser));

router
  .route("/login")
  .get(loginUser)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
  );

router.get("/logout", logoutUser);

export default router;
