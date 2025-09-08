import express from "express";
import mongoose from "mongoose";
const app = express();

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
