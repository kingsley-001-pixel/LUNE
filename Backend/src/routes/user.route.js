import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import authmiddleware from "../middleware/authmiddleware.js";
import { dashboard } from "../posts/dashboard.post.js";
import { getUserFavorites, addUserFavorites, deleteUserFavorites } from "../controllers/user.favorites.js";
import { getUserWatchlist, addUserWatchlist, deleteUserWatchlist } from "../controllers/user.watchlist.js";

const router = Router()

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/dashboard').get(authmiddleware, dashboard);
router.route('/favorites').get(authmiddleware, getUserFavorites)
router.route('/favorites/add').post(authmiddleware, addUserFavorites)
router.route('/favorites/remove/:movieId').delete(authmiddleware, deleteUserFavorites)
router.route('/watchlist').get(authmiddleware, getUserWatchlist)
router.route('/watchlist/add').post(authmiddleware, addUserWatchlist)
router.route('/watchlist/remove/:movieId').delete(authmiddleware, deleteUserWatchlist)

export default router;