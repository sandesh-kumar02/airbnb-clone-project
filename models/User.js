import mongoose from "mongoose";
import pkg from "passport-local-mongoose";
const passportLocalMongoose = pkg;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
});

const plugin = passportLocalMongoose.default || passportLocalMongoose;
userSchema.plugin(plugin);

const User = mongoose.model("User", userSchema);

export default User;
