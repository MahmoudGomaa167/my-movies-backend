const movieModel = require('../../../DB/models/Movies')
const userModel = require('../../../DB/models/User')


const removeFromFavourites = async(req, res) => {
    const {movieId} = req.params

    const user = await userModel.findOne({_id: req.user._id}).select('-password -code')

    if(user){
        const movie = await movieModel.findOne({_id: movieId})
        if(movie){
            const favouriteMovie = user.favourites.find(fav => fav == movieId)
            if(favouriteMovie){
                const newFavourites = user.favourites.filter(fav => fav != movieId)
                const updatedUser = await userModel.findOneAndUpdate({_id: user._id}, {favourites: newFavourites}, {new: true}).select('-password -code').populate({
                    path: 'favourites',
                    select: 'title poster_image'
                });
                res.status(200).json({message: "Movie removed from favourites successfully", user: updatedUser})

            }else{
                res.status(400).json({message: 'invalid movie'})
            }
        }else{

        }
    }else{
        res.status(400).json({message: 'invalid user'})
    }
}

module.exports = removeFromFavourites