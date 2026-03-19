import { User } from "../models/user.model.js"

const getUserWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            return res.status(200).json({message: 'Request successful',watchlist: user.watchlist})
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

const addUserWatchlist = async (req, res) => {
    try {
    const { movieId } = req.body
    const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {$addToSet: {watchlist: movieId}},
            {new: true}
        )
        return res.status(201).json({message: 'Added successfully', watchlist: updatedUser.watchlist})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

const deleteUserWatchlist = async (req, res) => {
    try {
        const movieId = Number(req.params.movieId)
        const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: {watchlist: movieId} },
        { new: true }
    )

    return res.status(200).json({
        message: "Deleted successfully",
        watchlist: updatedUser.watchlist
    })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server error", error: error.message, params: req.params, body: req.body})
    }
}

export {
    getUserWatchlist,
    addUserWatchlist,
    deleteUserWatchlist
}