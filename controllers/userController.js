import User from "../models/User.js";
import { wrapAsync } from "../utils/WrapAsync.js";

// Signup functionality
export const signupUser = (req, res) => {
  res.render("users/signup", { errors: {}, oldData: {} });
};

export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({
      email,
      username,
    });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "user Registered!");
      res.redirect("listings");
    });
  } catch (error) {
    req.flash("errors", error.message);
    res.redirect("/signup");
  }
};

// Login Functionality

export const loginUser = (req, res) => {
  res.render("users/login");
};

export const login = async (req, res) => {
  req.flash("success", "Welcome to wonderlust you are logged in!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

export const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out now!");
    res.redirect("/listings")
  });
};
