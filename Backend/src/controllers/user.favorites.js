import { User } from "../models/user.model.js"

const getUserFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            return res.status(200).json({favorites: user.favorites})
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

const addUserFavorites = async (req, res) => {
    try {
    const { movieId } = req.body;
    const user = await User.findById(req.user.id)
    if(!user.favorites.includes(movieId)) {
        user.favorites.push(movieId)
        await user.save()
        return res.status(201).json({favorites: user.favorites})
    }
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

const deleteUserFavorites = async (req, res) => {
    try {
        const { movieId } = req.body;
        const user = await User.findById(req.user.id)
        user.favorites.filter(id => id !== movieId)
        await user.save()
        return res.status(200).json(user.favorites)
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

export {
    getUserFavorites,
    addUserFavorites,
    deleteUserFavorites
}