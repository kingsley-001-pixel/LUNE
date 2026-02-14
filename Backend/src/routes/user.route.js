import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import authmiddleware from "../middleware/authmiddleware.js";
import { dashboard } from "../posts/dashboard.post.js";

const router = Router()

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/dashboard').get(authmiddleware, dashboard);

export default router;

