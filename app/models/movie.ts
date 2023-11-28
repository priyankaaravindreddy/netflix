import mongoose, { Schema } from "mongoose";


const movieSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema,"movie");

export default Movie;