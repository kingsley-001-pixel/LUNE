import { User } from "../models/user.model.js"

const getUserFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            return res.status(200).json({message: 'Request successful',favorites: user.favorites})
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

const addUserFavorites = async (req, res) => {
    try {
    const { movieId } = req.body
    const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {$addToSet: {favorites: movieId}},
            {new: true}
        )
        return res.status(201).json({message: 'Added successfully', favorites: updatedUser.favorites})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

const deleteUserFavorites = async (req, res) => {
    try {
        const movieId = Number(req.params.movieId)
        const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: {favorites: movieId} },
        { new: true }
    )

    return res.status(200).json({
        message: "Deleted successfully",
        favorites: updatedUser.favorites
    })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

export {
    getUserFavorites,
    addUserFavorites,
    deleteUserFavorites
}