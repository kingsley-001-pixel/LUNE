import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authmiddleware = async (req, res, next) => {
    try {
    const authHeader = req.headers.authorization;

    // 🔒 Check token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 🔓 Verify token
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 🔥 Fetch full user from DB
    const user = await User.findById(decodedInfo.id).select("-password");

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    // ✅ Attach full user
    req.user = user;

    next();
    } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authmiddleware;