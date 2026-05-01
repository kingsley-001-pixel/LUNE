import express from "express";
import { Router } from "express";
import { createReview, getMovieReviews } from "../controllers/review.controller.js";
import authmiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.route("/:movieId").get(getMovieReviews);
router.route('/').post(authmiddleware, createReview)

export default router;