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

const router = express.Router();

router.get("/signup", signupUser);
router.post("/signup", validateRequest(signupSchema), registerUser);
router.get("/login", loginUser);
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login
);
router.get("/logout", logoutUser);

export default router;
