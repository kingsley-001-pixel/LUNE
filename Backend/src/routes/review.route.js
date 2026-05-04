import express from "express";
import { Router } from "express";
import { createReview, getMovieReviews,toggleLikeReview, addReply, deleteReview } from "../controllers/review.controller.js";
import authmiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.route("/:movieId").get(getMovieReviews);
router.route('/').post(authmiddleware, createReview)
router.route("/like/:reviewId").put(authmiddleware, toggleLikeReview);
router.route("/:id").delete(authmiddleware, deleteReview);
router.route("/reply/:reviewId").post(authmiddleware, addReply);

export default router;