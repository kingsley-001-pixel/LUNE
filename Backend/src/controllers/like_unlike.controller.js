export const toggleLikeReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  const userId = req.user._id;

  if (!review) return res.status(404).json({ message: "Not found" });

  const alreadyLiked = review.likes.includes(userId);

  if (alreadyLiked) {
    review.likes = review.likes.filter(id => id.toString() !== userId.toString());
  } else {
    review.likes.push(userId);
  }

  await review.save();
  res.json(review);
};