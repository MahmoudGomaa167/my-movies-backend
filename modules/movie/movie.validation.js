const Joi = require('joi')
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

const getMovieByIdValidation = {
    params: joi.object().required().options({abortEarly: false}).keys({
        movieId: joi.string().required().min(24).max(24)
    })
}

const getMoviesValidation = {
    params: joi.object().required().options({abortEarly: false}).keys({
        type: joi.string().required().pattern(/^(movie|tv){1}$/)
    }),
    query: Joi.object().options({abortEarly: false}).keys({
        pageNumber: joi.number(),
        size: joi.number(),
        searchKey: joi.string(),
        genre: joi.string().pattern(/^(Action|Adventure|Animation|Biography|Comedy|Crime|Drama|Documentary|Fantasy|Family|Historical|Horror|Musical|Mystrey|Romance|Sci-Fi|Thriller|War|Western){1}$/)
    })
}

module.exports = {
    addMovieValidation,
    updateMovieValidation,
    deleteMovieValidation,
    getMovieByIdValidation,
    getMoviesValidation
}