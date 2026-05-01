// controllers/review.controller.js
import Review from "../models/review.model.js";
import { User } from "../models/user.model.js";

const createReview = async (req, res) => {
  try {
    const { movieId, comment, rating } = req.body;

    const review = await Review.create({
      movieId,
      userId: req.user._id,
      username: req.user.username,
      comment,
      rating
    });

    res.status(201).json(review);
  } catch (error) {
    console.log(req.body);
console.log(req.user);
    res.status(500).json({ message: error.message });
  }
};

const getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createReview, getMovieReviews };