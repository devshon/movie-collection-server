import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: String,
  title: String,
  rating: Number,
  description_intro: String,
  language: String,
  medium_cover_image: String,
  genres: [String],
  postedAt: String,
  updatedAt: String,
});

export default mongoose.model("Movie", movieSchema);
