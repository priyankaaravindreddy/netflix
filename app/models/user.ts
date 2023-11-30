import mongoose, { Schema } from "mongoose";
mongoose.connect('mongodb+srv://priyankaaravindreddy:HAel4GgURkSbvAEI@cluster0.y0zq20h.mongodb.net/AppDB');
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;