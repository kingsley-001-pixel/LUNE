import { Review } from "../models/review.model.js";

/* CREATE REVIEW */
export const createReview = async (req, res) => {
  try {
    const { movieId, comment, rating } = req.body;

    const review = await Review.create({
      movieId,
      userId: req.user._id,
      username: req.user.username,
      comment,
      rating,
      type: "review"
    });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET MOVIE REVIEWS */
export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId })
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* LIKE TOGGLE */
export const toggleLikeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Not found" });

    const userId = req.user._id;

    const hasLiked = review.likes.some(
  id => id.toString() === userId.toString()
);

    if (hasLiked) {
      review.likes = review.likes.filter(
        id => id.toString() !== userId.toString()
      );
    } else {
      review.likes.push(userId);
    }

    await review.save();

    res.json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* REPLY */
export const addReply = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Not found" });

    review.replies.push({
      userId: req.user._id,
      username: req.user.username,
      comment: req.body.comment
    });

    await review.save();

    res.json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // ❌ Not found
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // ❌ Not owner
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};