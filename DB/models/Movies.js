const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    poster_image: {type: String, required: true},
    backdrop_image: {type: String, required: true},
    genre: {type: Array, required: true},
    year: {type: Number, required: true},
    rate: {type: Number, required: true},
    type: {type: String, required: true}
}, {
    timestamps: true
})

const movieModel = mongoose.model('Movie', movieSchema)

module.exports = movieModel


