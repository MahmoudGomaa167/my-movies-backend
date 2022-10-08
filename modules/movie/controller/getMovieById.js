const movieModel = require('../../../DB/models/Movies')

const getMovie = async(req, res) => {
    const {movieId} = req.params

    const movie = await movieModel.findOne({_id: movieId}).populate([
        {
            path: 'genre',
            select: 'name'
        }
    ])

    if(movie){
        res.status(200).json({message: "Done", movie})
    }else{
        res.status(400).json({message: "invalid movie"})
    }
}

module.exports = getMovie