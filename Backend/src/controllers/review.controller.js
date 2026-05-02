// controllers/review.controller.js
import { Review } from "../models/review.model.js";
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

const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) return res.status(404).json({ message: "Not found" });

  if (review.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await review.deleteOne();

  res.json({ message: "Deleted" });
};

export { createReview, getMovieReviews, deleteReview };