// models/review.model.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);