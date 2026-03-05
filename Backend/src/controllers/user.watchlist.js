import { User } from "../models/user.model.js"

const getUserWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            return res.status(200).json({watchlist: user.watchlist})
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

const addUserWatchlist = async (req, res) => {
    try {
    const { movieId } = req.body;
    const user = await User.findById(req.user.id)
    if(!user.watchlist.includes(movieId)) {
        user.watchlist.push(movieId)
        await user.save()
        return res.status(201).json({watchlist: user.watchlist})
    }
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

const deleteUserWatchlist = async (req, res) => {
    try {
        const { movieId } = req.body;
        const user = await User.findById(req.user.id)
        user.watchlist.filter(id => id !== movieId)
        await user.save()
        return res.status(200).json(user.watchlist)
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

export {
    getUserWatchlist,
    addUserWatchlist,
    deleteUserWatchlist
}