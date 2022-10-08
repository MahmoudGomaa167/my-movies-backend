const auth = require('../../middleware/auth')
const handleValidation = require('../../middleware/handleValidation')
const addMovie = require('./controller/addMovie')
const deleteMovie = require('./controller/deleteMovie')
const getMovie = require('./controller/getMovieById')
const getMovies = require('./controller/getMovies')
const updateMovie = require('./controller/updateMovie')
const { addMovieValidation, updateMovieValidation, deleteMovieValidation } = require('./movie.validation')
const router = require('express').Router()

router.get('/movies/:type', auth(['user']), getMovies)
router.post('/addMovie', handleValidation(addMovieValidation), addMovie)
router.get('/movie/:movieId', getMovie)
router.put('/updateMovie/:movieId', handleValidation(updateMovieValidation), updateMovie)
router.delete('/deleteMovie/:movieId', handleValidation(deleteMovieValidation), deleteMovie)

module.exports = router