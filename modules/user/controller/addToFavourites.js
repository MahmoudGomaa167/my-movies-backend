const movieModel = require('../../../DB/models/Movies')
const userModel = require('../../../DB/models/User')

const addToFavourites = async (req, res) => {
    try {
        const { movieId } = req.params

        const user = await userModel.findOne({ _id: req.user._id })

        if (user) {
            const movie = await movieModel.findOne({ _id: movieId })
            if (movie) {
                const favourites = user.favourites.find(fav => fav == movieId)
                if (favourites) {
                    res.status(400).json({ message: "Movie already exists in your favourites list" })
                } else {
                    user.favourites.push(movie._id)
                    const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { favourites: user.favourites }, { new: true }).select('-password -code').populate({
                        path: 'favourites',
                        select: 'title poster_image'
                    })
                    res.status(200).json({ message: "movie added to favourites successfully", user: updatedUser })
                }

            } else {
                res.status(400).json({ message: "invalid movie" })
            }
        } else {
            res.status(400).json({ message: "invalid user" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}


module.exports = addToFavourites