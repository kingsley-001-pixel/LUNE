import {User} from "../models/user.model.js"
const dashboard = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        res.status(201).json({message: "Welcome to your dashboard", user: {
            username: user.username,
            email: user.email.toLowerCase(),
            id: user._id
        }})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

export {dashboard}