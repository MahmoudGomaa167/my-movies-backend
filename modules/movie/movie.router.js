const auth = require('../../middleware/auth')
const handleValidation = require('../../middleware/handleValidation')
const addMovie = require('./controller/addMovie')
const deleteMovie = require('./controller/deleteMovie')
const getMovie = require('./controller/getMovieById')
const getMovies = require('./controller/getMovies')
const updateMovie = require('./controller/updateMovie')
const { addMovieValidation, updateMovieValidation, deleteMovieValidation, getMoviesValidation, getMovieByIdValidation } = require('./movie.validation')
const router = require('express').Router()

router.get('/movies/:type', handleValidation(getMoviesValidation), auth(['user', 'admin']), getMovies)
router.post('/addMovie',auth(['admin']), handleValidation(addMovieValidation), addMovie)
router.get('/movie/:movieId', handleValidation(getMovieByIdValidation), auth(['admin', 'user']), getMovie)
router.put('/updateMovie/:movieId',auth(['admin']), handleValidation(updateMovieValidation), updateMovie)
router.delete('/deleteMovie/:movieId',auth(['admin']), handleValidation(deleteMovieValidation), deleteMovie)

module.exports = router