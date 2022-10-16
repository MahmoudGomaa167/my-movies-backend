const movieModel = require('../../../DB/models/Movies')

const addMovie = async (req, res) => {
    try {
        const {title, description, poster_image, backdrop_image, genre, year, rate, type} = req.body

    const movie = await movieModel.findOne({title, year, type})

    if(movie){
        res.status(400).json({message: "movie already exists"})
    }else{
        const newMovie = new movieModel({title, description, poster_image, backdrop_image, genre, year, rate, type})
        const savedMovie = await newMovie.save()
        res.status(201).json({message: "Movie added successfully", movie: savedMovie})
    }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }
    
}

module.exports = addMovie