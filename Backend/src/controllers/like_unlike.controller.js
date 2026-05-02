export const toggleLikeReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  const review = await Review.findById(reviewId);

  if (!review) return res.status(404).json({ message: "Review not found" });

  const alreadyLiked = review.likes.includes(userId);

  if (alreadyLiked) {
    review.likes.pull(userId);
  } else {
    review.likes.push(userId);
  }

  await review.save();

  res.json(review);
};