const movieModel = require('../../../DB/models/Movies')

const updateMovie = async(req, res) => {
    const {movieId} = req.params
    const {title, description, poster_image, backdrop_image, genre, year, rate} = req.body

    const movie = await movieModel.findOne({_id: movieId})

    if(movie){
        const updatedMovie = await movieModel.findOneAndUpdate({_id: movieId}, {title, description, poster_image, backdrop_image, genre, year, rate}, {new: true})
        res.status(200).json({message: "Movie updated successfully", movie: updatedMovie})
    }else{
        res.status(400).json({message: "invalid movie"})
    }

}

module.exports = updateMovie