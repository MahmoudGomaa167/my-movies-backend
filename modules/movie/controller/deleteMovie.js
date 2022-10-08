const movieModel = require('../../../DB/models/Movies')

const deleteMovie = async(req, res) => {
    const {movieId} = req.params

    const movie = await movieModel.findOne({_id: movieId})

    if(movie){
        const deletedMovie = await movieModel.findOneAndDelete({_id: movieId}, {new: true})
        res.status(200).json({message: "Movie Deleted Successfully"})
    }else{
        res.status(400).json({message: "invalid movie"})
    }
     
}

module.exports = deleteMovie