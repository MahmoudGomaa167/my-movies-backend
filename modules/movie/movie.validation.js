const joi = require('joi')

const addMovieValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        title: joi.string().required().min(2).max(50),
        description: joi.string().required(),
        poster_image: joi.string().required(),
        backdrop_image: joi.string().required(),
        genre: joi.array().items(joi.string()).required(),
        year: joi.number().required(),
        rate: joi.number().required(),
        type: joi.string().required()
    })
}

const updateMovieValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        title: joi.string().required().min(2).max(50),
        description: joi.string().required(),
        poster_image: joi.string().required(),
        backdrop_image: joi.string().required(),
        genre: joi.array().items(joi.string()).required(),
        year: joi.number().required(),
        rate: joi.number().required(),
        type: joi.string().required()
    }),
    params: joi.object().required().options({abortEarly: false}).keys({
        movieId: joi.string().required().min(24).max(24)
    })
}

const deleteMovieValidation = {
    params: joi.object().required().options({abortEarly: false}).keys({
        movieId: joi.string().required().min(24).max(24)
    })
}

module.exports = {
    addMovieValidation,
    updateMovieValidation,
    deleteMovieValidation
}