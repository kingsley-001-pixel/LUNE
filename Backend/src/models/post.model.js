import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  username: String,
  userAvatar: String,

  movieId: String,
  movieTitle: String,
  moviePoster: String,

  rating: Number,
  comment: String,

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  type: { type: String, enum: ["review", "text", "rating"] },
  content: String,

  comments: [
    {
      userId: String,
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.model("Post", postSchema);