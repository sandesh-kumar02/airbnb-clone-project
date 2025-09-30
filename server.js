import express from "express";
import mongoose from "mongoose";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import engine from "ejs-mate";
import methodOverride from "method-override";
const app = express();
// importing file
import listingController from "./controllers/listingController.js";
import listingRoutes from "./Routes/listingRoutes.js";
import { ExpressError } from "./utils/ExpressError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// calling the importing file

app.use("/", listingController);
app.use("/", listingRoutes);
// end

// Agar koi bhi route match nahi hua
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Oh no, something went wrong!" } = err;
//   res.status(statusCode).render('error.ejs', {message})
//   // res.status(statusCode).send(message);
// });

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Oh no, something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { statusCode, message });
});

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust-Project");
}
connectDB()
  .then(() => {
    console.log("database are connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("server is starting on port no 3000");
});
